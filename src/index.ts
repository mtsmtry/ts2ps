import * as ts from 'typescript';
import * as recast from "recast";
import * as fs from 'fs';
import { threadId } from 'worker_threads';

console.log(process.argv);

interface Config {
    input: {
        endpoint: string,
        files: {
            title: string,
            path: string,
            exportType: boolean,
            exportApi: boolean
        }[]
    },
    output: {
        api: {
            module: string,
            path: string
        },
        entities: {
            module: string,
            path: string,
            prefix: string
        },
    }
}

const config = JSON.parse(fs.readFileSync(process.argv[2]).toString()) as Config;

const apiModule = config.output.api.module;
const entModule = config.output.entities.module;
const apiPath = config.output.api.path;
const entPath = config.output.entities.path;
const entAs = config.output.entities.prefix;
const entPrefix = entAs + ".";

let outputApiPs = `
module ${apiModule} where

import Prelude

import ${entModule} as ${entAs}
import Data.Maybe (Maybe(..))
import Control.Promise (Promise)


`;

let outputEntPs = `
module ${entModule} where

import Prelude

import Data.Maybe (Maybe(..))


`;

let outputJs = `
var Data_Maybe = require("../Data.Maybe/index.js");
var E = require("../${entModule}/index.js");
const endpoint = "${config.input.endpoint}";

async function fetch(method, args) {
    const response = await fetch(endpoint + method, {
        method: 'POST',
        body: args,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

`;

function sectionTemplate(title: string) {
    let code = "";
    const spl = "---------------------------------------------------------\n";
    code += spl + `--  ${title}\n` + spl + "\n";
    return code;
}

config.input.files.forEach(file => {
    const source = fs.readFileSync(file.path).toString();
    let sourceFile = ts.createSourceFile(file.path, source, ts.ScriptTarget.ES5, /*setParentNodes */ true);
    outputApiPs += file.exportApi ? sectionTemplate(file.title) : "";
    outputEntPs += file.exportType ? sectionTemplate(file.title) : "";
    ts.forEachChild(sourceFile, x => eachNode(x, file.exportType, file.exportApi));
})

console.log(outputJs);

try {
    outputJs = recast.prettyPrint(recast.parse(outputJs), { tabWidth: 4 }).code;
} catch (ex) {
    console.log(ex);
}

console.log(outputApiPs);
console.log(outputEntPs);
console.log(outputJs);

fs.writeFileSync(entPath + ".purs", outputEntPs);
fs.writeFileSync(apiPath + ".purs", outputApiPs);
fs.writeFileSync(apiPath + ".js", outputJs);

function eachNode(node: ts.Node, exportType: boolean, exportApi: boolean) {
    if (ts.isInterfaceDeclaration(node) && exportType) {
        try {
            const x = toInterfaceDeclaration(node);
            outputEntPs += writeInterfaceDeclaration(x);
            outputJs += writePsFunction(x);
            outputJs += writeJsFunction(x);
        } catch (ex) {
            console.log(ex);
        }
        return;
    }

    if (ts.isEnumDeclaration(node) && exportType) {
        try {
            const x = toEnumDeclaration(node);
            outputEntPs += writeEnumDeclaration(x);
            outputJs += writePsEnum(x);
            outputJs += writeJsEnum(x);
        } catch (ex) {
            console.log(ex);
        }
        return;
    }

    if (ts.isTypeAliasDeclaration(node) && exportType) {
        try {
            const x = toTypeAliasDeclaration(node);
            outputEntPs += writeTypeAliasDeclaration(x);
            outputJs += writePsTypeAliasDeclaration(x);
            outputJs += writeJsTypeAliasDeclaration(x);
        } catch (ex) {
            console.log(ex);
        }
        return;
    }

    if (ts.isFunctionDeclaration(node) && exportApi) {
        try {
            const x = toFunctionDeclaration(node);
            outputApiPs += writePsFunctionDeclaration(x);
            outputJs += writeJsFunctionDeclaration(x);
        } catch (ex) {
            console.log(ex);
        }
        return;
    }
}

interface InterfaceDeclaration {
    isExport: boolean;
    identifier: string;
    properties: PropertySignature[];
}

function isExport(modifiers: ts.ModifiersArray | undefined) {
    return modifiers != undefined && modifiers.filter(x => x.kind == ts.SyntaxKind.ExportKeyword).length > 0;
}

function toInterfaceDeclaration(node: ts.InterfaceDeclaration): InterfaceDeclaration {
    return {
        isExport: isExport(node.modifiers),
        identifier: node.name.getText(),
        properties: node.members.map(x => toPropertySignature(x as ts.PropertySignature))
    }
}

interface PropertySignature {
    identifier: string;
    type: Type;
}

function toPropertySignature(node: ts.PropertySignature): PropertySignature {
    return {
        identifier: node.name.getText(),
        type: toType(node.type as ts.TypeNode)
    }
}

const enum TypeKind {
    String, Number, TypeReference, Array, Nullable, Boolean, Object
}

interface Type {
    kind: TypeKind;
    typeReference?: string;
    subType?: Type;
    properties?: PropertySignature[];
}

function toType(node: ts.TypeNode): Type {
    if (ts.isArrayTypeNode(node)) {
        return {
            kind: TypeKind.Array,
            subType: toType(node.elementType)
        };
    }

    if (ts.isTypeLiteralNode(node)) {
        return {
            kind: TypeKind.Object,
            properties: node.members.map(x => toPropertySignature(x as ts.PropertySignature))
        };
    }

    if (ts.isParenthesizedTypeNode(node)) {
        return toType(node.type);
    }

    if (ts.isUnionTypeNode(node)) {
        const types: ts.TypeNode[] = [];
        let nullable = false;
        node.types.forEach(x => {
            if (ts.isLiteralTypeNode(x) && x.literal.kind == ts.SyntaxKind.NullKeyword) {
                nullable = true;
            } else {
                types.push(x);
            }
        });
        if (types.length == 1) {
            if (nullable) {
                return {
                    kind: TypeKind.Nullable,
                    subType: toType(types[0])
                };
            } else {
                return toType(types[0]);
            }
        } else {
            throw "Wrong syntax";
        }
    }

    switch (node.kind) {
        case ts.SyntaxKind.StringKeyword:
            return { kind: TypeKind.String }
        case ts.SyntaxKind.NumberKeyword:
            return { kind: TypeKind.Number };
        case ts.SyntaxKind.BooleanKeyword:
            return { kind: TypeKind.Boolean };
        case ts.SyntaxKind.TypeReference:
            return {
                kind: TypeKind.TypeReference,
                typeReference: node.getText()
            }
    }

    throw "Wrong syntax";
}

interface EnumDeclaration {
    isExport: boolean;
    identifier: string;
    members: EnumMember[];
}

function toEnumDeclaration(node: ts.EnumDeclaration): EnumDeclaration {
    return {
        isExport: isExport(node.modifiers),
        identifier: node.name.getText(),
        members: node.members.map(toEnumMember)
    }
}

interface EnumMember {
    identifier: string,
    initializer: string;
}

function toEnumMember(node: ts.EnumMember): EnumMember {
    if (node.initializer?.kind != ts.SyntaxKind.StringLiteral) {
        throw "Not StringLiteral";
    }
    function snakeToCamel(p: string) {
        //_+小文字を大文字にする(例:_a を A)
        return p[0].toUpperCase() + p.slice(1).toLowerCase().replace(/_./g, s => s.charAt(1).toUpperCase());
    };
    return {
        identifier: snakeToCamel(node.name.getText()),
        initializer: node.initializer.getText().slice(1).slice(0, -1)
    };
}

function writeInterfaceDeclaration(src: InterfaceDeclaration) {
    let code = "type " + src.identifier + "\n  = {";
    src.properties.forEach((prop, i) => {
        if (i == 0) {
            code += " " + writePropertySignature(prop, "");
        } else {
            code += "\n    , " + writePropertySignature(prop, "");
        }
    });
    code += "\n    }\n\n";
    return code;
}

function writePropertySignature(src: PropertySignature, varPrefix: string): string {
    return src.identifier + " :: " + writeType(src.type, true, varPrefix);
}

function writeType(type: Type, isRoot: boolean, varPrefix: string): string {
    function brackets(code: string) {
        if (isRoot) {
            return code;
        } else {
            return "(" + code + ")";
        }
    }
    switch (type.kind) {
        case TypeKind.String:
            return "String";
        case TypeKind.Number:
            return "Number";
        case TypeKind.Nullable:
            return brackets("Maybe " + writeType(type.subType as Type, false, varPrefix));
        case TypeKind.Array:
            return brackets("Array " + writeType(type.subType as Type, false, varPrefix));
        case TypeKind.TypeReference:
            return varPrefix + type.typeReference as string;
        case TypeKind.Boolean:
            return "Boolean";
        case TypeKind.Object:
            return type.properties?.length == 0 ? "{}" : "{ " + type.properties?.map(x => writePropertySignature(x, varPrefix)).join(", ") + " }";
    }
}

function writeEnumMember(src: EnumMember): string {
    return src.identifier;
}

function writeEnumDeclaration(src: EnumDeclaration): string {
    let code = "data " + src.identifier + "\n";
    src.members.forEach((member, i) => {
        if (i == 0) {
            code += "  = " + writeEnumMember(member) + "\n";
        } else {
            code += "  | " + writeEnumMember(member) + "\n";
        }
    });
    code += "\n";
    return code;
}

function writePsFunction(src: InterfaceDeclaration) {
    let code = "function ps" + src.identifier + "(obj){";
    code += src.properties.map(x => writePsStatement("obj", x)).join("");
    code += "return obj;";
    code += "}";
    return code;
}

function writePsStatement(objName: string, prop: PropertySignature): string {
    let name = objName == "" ? prop.identifier : objName + "." + prop.identifier;
    switch (prop.type.kind) {
        case TypeKind.Nullable:
            return `
                if (${name}) {
                    ${name} = new Data_Maybe.Just(${name});
                } else {
                    ${name} = Data_Maybe.Nothing.value;
                }
            `;
        case TypeKind.Array:
            let subStm = writePsStatement("", { identifier: "x", type: prop.type.subType as Type });
            if (subStm != "\n") {
                return `
                    ${name} = ${name}.map(x => {
                        ${subStm}
                        return x;
                    });
                `;
            }
        case TypeKind.TypeReference:
            return `${name} = ps${prop.type.typeReference}(${name});`
        case TypeKind.Object:
            return prop.type.properties?.map(x => writePsStatement(name, x)).join("") as string;
    }
    return "";
}

function writePsEnum(src: EnumDeclaration) {
    let code = `function ps${src.identifier}(str) {`;
    code += "switch(str){";
    src.members.forEach(member => {
        code += `case \"${entPrefix + member.initializer}\":`;
        code += `return ${src.identifier}.${member.identifier}.value;`;
    });
    code += "}}";
    return code;
}

function writeJsFunction(src: InterfaceDeclaration) {
    let code = `function js${src.identifier}(obj){`;
    code += src.properties.map(x => writeJsStatement("obj", x)).join("");
    code += "return obj;";
    code += "}";
    return code;
}

function writeJsStatement(objName: string, prop: PropertySignature): string {
    let name = objName == "" ? prop.identifier : objName + "." + prop.identifier;
    switch (prop.type.kind) {
        case TypeKind.Nullable:
            return `
                if (${name} instanceof Data_Maybe.Just) {
                    ${name} = ${name}.value; 
                } else {
                    ${name} = null;
                }
            `;
        case TypeKind.Array:
            let subStm = writeJsStatement("", { identifier: "x", type: prop.type.subType as Type });
            if (subStm != "\n") {
                return `
                    ${name} = ${name}.map(x => {
                        ${subStm}
                        return x;
                    });
                `;
            }
            break;
        case TypeKind.TypeReference:
            return `${name} = js${prop.type.typeReference}(${name});`
        case TypeKind.Object:
            return prop.type.properties?.map(x => writeJsStatement(name, x)).join("") as string;
    }
    return "";
}

function writeJsEnum(src: EnumDeclaration) {
    let code = `function js${src.identifier}(obj) {`;
    src.members.forEach(member => {
        code += `
            if(obj instanceof ${entPrefix}${src.identifier}.${member.identifier}) {
                return \"${member.initializer}\";
            }
        `;
    });
    code += "}";
    return code;
}

interface FunctionDeclaration {
    identifier: string;
    parameterType: Type;
    returnType: Type;
}

function toFunctionDeclaration(node: ts.FunctionDeclaration): FunctionDeclaration {
    const args = node.parameters[0]?.type;
    if (isExport(node.modifiers)
        && node.name
        && args && ts.isTypeLiteralNode(args)
        && node.type && ts.isTypeReferenceNode(node.type)
        && node.type.typeArguments) {
        return {
            identifier: node.name.getText(),
            parameterType: toType(args),
            returnType: toType(node.type.typeArguments[0])
        }
    }
    throw "";
}

function writeJsFunctionDeclaration(src: FunctionDeclaration) {
    const jsStm = writeJsStatement("", {
        identifier: "args",
        type: src.parameterType
    });
    const psStm = writePsStatement("", {
        identifier: "result",
        type: src.returnType
    });
    if (src.parameterType.properties && src.parameterType.properties.length == 0) {
        return `
        exports.${src.identifier} = (async () => {
            ${jsStm}
            let result = await fetch("${src.identifier}", args);
            ${psStm}
            return result;
        })();
    `;
    }
    if (src.parameterType.properties && src.parameterType.properties.length == 1) {
        const argName = src.parameterType.properties[0].identifier;
        return `
        exports.${src.identifier} = async ${argName} => {
            let args = { ${argName} };
            ${jsStm}
            let result = await fetch("${src.identifier}", args);
            ${psStm}
            return result;
        };
    `;
    }
    return `
        exports.${src.identifier} = async args => {
            ${jsStm}
            let result = await fetch("${src.identifier}", args);
            ${psStm}
            return result;
        };
    `;
}

function writePsFunctionDeclaration(src: FunctionDeclaration) {
    let code = `foreign import ${src.identifier} :: \n`;

    if (src.parameterType.properties) {
        if (src.parameterType.properties.length == 0) {
            code += "  Promise " + writeType(src.returnType, false, entPrefix);
        } else if (src.parameterType.properties.length == 1) {
            code += "  " + writeType(src.parameterType.properties[0].type, true, entPrefix);
            code += " -> Promise " + writeType(src.returnType, false, entPrefix);
        } else {
            src.parameterType.properties.forEach((prop, i) => {
                if (i == 0) {
                    code += "  { " + writePropertySignature(prop, entPrefix);
                } else {
                    code += "\n  , " + writePropertySignature(prop, entPrefix);
                }
            });
            code += "\n  }";
            code += "\n  -> Promise " + writeType(src.returnType, false, entPrefix);
        }
    } else {
        code += "  " + writeType(src.parameterType, true, entPrefix);
        code += " -> Promise " + writeType(src.returnType, false, entPrefix);
    }

    code += "\n\n";
    return code;
}

interface TypeAliasDeclaration {
    identifier: string;
    type: Type;
}

function toTypeAliasDeclaration(src: ts.TypeAliasDeclaration) {
    return {
        identifier: src.name.getText(),
        type: toType(src.type)
    }
}

function writeJsTypeAliasDeclaration(src: TypeAliasDeclaration) {
    return `const js${src.identifier} = x => x;\n`;
}

function writePsTypeAliasDeclaration(src: TypeAliasDeclaration) {
    return `const ps${src.identifier} = x => x;\n`;
}

function writeTypeAliasDeclaration(src: TypeAliasDeclaration) {
    return `newtype ${src.identifier} = ${src.identifier} ${writeType(src.type, false, "")}
derive instance eq${src.identifier}:: Eq ${src.identifier}
derive instance ord${src.identifier} :: Ord ${src.identifier}
derive instance newtype${src.identifier} :: Newtype ${src.identifier} _

instance readForeign${src.identifier} :: ReadForeign ${src.identifier} where
  readImpl = map wrap <<< readString
instance writeForeign${src.identifier} :: WriteForeign ${src.identifier} where
  writeImpl = writeImpl <<< unwrap
derive instance newtype${src.identifier} :: Newtype ${src.identifier} _

`;
}