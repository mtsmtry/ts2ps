import * as ts from 'typescript'

let source = `
 class Sample{
   constructor(){
   }

   method1(){
   }

   method2(){
   }

   method3(){
   }

 }

`;

let sourceFile = ts.createSourceFile('sample.ts', source, ts.ScriptTarget.ES5, /*setParentNodes */ true);

ts.forEachChild(sourceFile, each);
console.log(sourceFile.text);

function each(node: ts.Node): boolean | undefined{
    switch (node.kind) {
        case ts.SyntaxKind.MethodDeclaration:
            return methodDeclaration(<ts.MethodDeclaration>node);

    }
    return next();

    function next(): boolean | undefined {
        return ts.forEachChild(node, each);
    }

}

function methodDeclaration(node: ts.MethodDeclaration) {
    var text = node.getFullText(sourceFile);
    var updateText = text + 'static ' + (<ts.Identifier>node.name).text + '$name = \'' + (<ts.Identifier>node.name).text + '\';'
    sourceFile = changeText(updateText, node);
    return false;
}

function changeText(updateText: string, node: ts.Node):ts.SourceFile {

    var start = node.getFullStart();
    var end = node.getEnd();
    var oldText = sourceFile.text;
    var pre = oldText.substring(0, start);

    var post = oldText.substring(end);
    var newText = pre + updateText + post;

    var textChangeRange: ts.TextChangeRange = {
        span: {
            start: start,
            length: (end - start)
        },

        newLength: (updateText.length)
    }

    return sourceFile.update(newText, textChangeRange);

}