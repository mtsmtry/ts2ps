var Data_Maybe = require("../Data.Maybe/index.js");
var E = require("../Incentknow.Api.Entities/index.js");
const endpoint = "https://api.incentknow.com";

async function fetch(method, args) {
    const response = await fetch(endpoint + method, {
        method: "POST",
        body: args,

        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

function psMembershipMethod(str) {
    switch (str) {
    case "E.none":
        return MembershipMethod.None.value;
    case "E.app":
        return MembershipMethod.App.value;
    }
}

function jsMembershipMethod(obj) {
    if (obj instanceof E.MembershipMethod.None) {
        return "none";
    }

    if (obj instanceof E.MembershipMethod.App) {
        return "app";
    }
}

function psSpaceAuth(str) {
    switch (str) {
    case "E.none":
        return SpaceAuth.None.value;
    case "E.visible":
        return SpaceAuth.Visible.value;
    case "E.readable":
        return SpaceAuth.Readable.value;
    case "E.writable":
        return SpaceAuth.Writable.value;
    }
}

function jsSpaceAuth(obj) {
    if (obj instanceof E.SpaceAuth.None) {
        return "none";
    }

    if (obj instanceof E.SpaceAuth.Visible) {
        return "visible";
    }

    if (obj instanceof E.SpaceAuth.Readable) {
        return "readable";
    }

    if (obj instanceof E.SpaceAuth.Writable) {
        return "writable";
    }
}

function psReactorState(str) {
    switch (str) {
    case "E.invaild":
        return ReactorState.Invaild.value;
    }
}

function jsReactorState(obj) {
    if (obj instanceof E.ReactorState.Invaild) {
        return "invaild";
    }
}

function psMemberType(str) {
    switch (str) {
    case "E.normal":
        return MemberType.Normal.value;
    case "E.owner":
        return MemberType.Owner.value;
    }
}

function jsMemberType(obj) {
    if (obj instanceof E.MemberType.Normal) {
        return "normal";
    }

    if (obj instanceof E.MemberType.Owner) {
        return "owner";
    }
}

function psFormatUsage(str) {
    switch (str) {
    case "E.internal":
        return FormatUsage.Internal.value;
    case "E.external":
        return FormatUsage.External.value;
    }
}

function jsFormatUsage(obj) {
    if (obj instanceof E.FormatUsage.Internal) {
        return "internal";
    }

    if (obj instanceof E.FormatUsage.External) {
        return "external";
    }
}

function psContentGenerator(str) {
    switch (str) {
    case "E.reactor":
        return ContentGenerator.Reactor.value;
    case "E.crawler":
        return ContentGenerator.Crawler.value;
    }
}

function jsContentGenerator(obj) {
    if (obj instanceof E.ContentGenerator.Reactor) {
        return "reactor";
    }

    if (obj instanceof E.ContentGenerator.Crawler) {
        return "crawler";
    }
}

function psTypeName(str) {
    switch (str) {
    case "E.integer":
        return TypeName.Int.value;
    case "E.boolean":
        return TypeName.Bool.value;
    case "E.string":
        return TypeName.String.value;
    case "E.format":
        return TypeName.Format.value;
    case "E.space":
        return TypeName.Space.value;
    case "E.content":
        return TypeName.Content.value;
    case "E.url":
        return TypeName.Url.value;
    case "E.object":
        return TypeName.Object.value;
    case "E.text":
        return TypeName.Text.value;
    case "E.array":
        return TypeName.Array.value;
    case "E.code":
        return TypeName.Code.value;
    }
}

function jsTypeName(obj) {
    if (obj instanceof E.TypeName.Int) {
        return "integer";
    }

    if (obj instanceof E.TypeName.Bool) {
        return "boolean";
    }

    if (obj instanceof E.TypeName.String) {
        return "string";
    }

    if (obj instanceof E.TypeName.Format) {
        return "format";
    }

    if (obj instanceof E.TypeName.Space) {
        return "space";
    }

    if (obj instanceof E.TypeName.Content) {
        return "content";
    }

    if (obj instanceof E.TypeName.Url) {
        return "url";
    }

    if (obj instanceof E.TypeName.Object) {
        return "object";
    }

    if (obj instanceof E.TypeName.Text) {
        return "text";
    }

    if (obj instanceof E.TypeName.Array) {
        return "array";
    }

    if (obj instanceof E.TypeName.Code) {
        return "code";
    }
}

function psLanguage(str) {
    switch (str) {
    case "E.python":
        return Language.Python.value;
    case "E.javascript":
        return Language.Javascript.value;
    }
}

function jsLanguage(obj) {
    if (obj instanceof E.Language.Python) {
        return "python";
    }

    if (obj instanceof E.Language.Javascript) {
        return "javascript";
    }
}

function psEditingState(str) {
    switch (str) {
    case "E.editing":
        return EditingState.Editing.value;
    case "E.committed":
        return EditingState.Committed.value;
    case "E.canceled":
        return EditingState.Canceld.value;
    }
}

function jsEditingState(obj) {
    if (obj instanceof E.EditingState.Editing) {
        return "editing";
    }

    if (obj instanceof E.EditingState.Committed) {
        return "committed";
    }

    if (obj instanceof E.EditingState.Canceld) {
        return "canceled";
    }
}

function psDraftState(str) {
    switch (str) {
    case "E.editing":
        return DraftState.Editing.value;
    }
}

function jsDraftState(obj) {
    if (obj instanceof E.DraftState.Editing) {
        return "editing";
    }
}

function psChangeType(str) {
    switch (str) {
    case "E.initial":
        return ChangeType.Initial.value;
    case "E.write":
        return ChangeType.Write.value;
    case "E.remove":
        return ChangeType.Remove.value;
    }
}

function jsChangeType(obj) {
    if (obj instanceof E.ChangeType.Initial) {
        return "initial";
    }

    if (obj instanceof E.ChangeType.Write) {
        return "write";
    }

    if (obj instanceof E.ChangeType.Remove) {
        return "remove";
    }
}

function psMaterialType(str) {
    switch (str) {
    case "E.folder":
        return MaterialType.Folder.value;
    case "E.document":
        return MaterialType.Document.value;
    }
}

function jsMaterialType(obj) {
    if (obj instanceof E.MaterialType.Folder) {
        return "folder";
    }

    if (obj instanceof E.MaterialType.Document) {
        return "document";
    }
}

const psContainerId = x => x;
const jsContainerId = x => x;

function psIntactContainer(obj) {
    obj.entityId = psContainerId(obj.entityId);
    obj.space = psRelatedSpace(obj.space);
    obj.format = psRelatedFormat(obj.format);
    return obj;
}

function jsIntactContainer(obj) {
    obj.entityId = jsContainerId(obj.entityId);
    obj.space = jsRelatedSpace(obj.space);
    obj.format = jsRelatedFormat(obj.format);
    return obj;
}

const psSpaceId = x => x;
const jsSpaceId = x => x;
const psSpaceDisplayId = x => x;
const jsSpaceDisplayId = x => x;

function psRelatedSpace(obj) {
    obj.entityId = psSpaceId(obj.entityId);
    obj.displayId = psSpaceDisplayId(obj.displayId);

    if (obj.homeUrl) {
        obj.homeUrl = new Data_Maybe.Just(obj.homeUrl);
    } else {
        obj.homeUrl = Data_Maybe.Nothing.value;
    }

    obj.membershipMethod = psMembershipMethod(obj.membershipMethod);
    obj.defaultAuthority = psSpaceAuth(obj.defaultAuthority);
    return obj;
}

function jsRelatedSpace(obj) {
    obj.entityId = jsSpaceId(obj.entityId);
    obj.displayId = jsSpaceDisplayId(obj.displayId);

    if (obj.homeUrl instanceof Data_Maybe.Just) {
        obj.homeUrl = obj.homeUrl.value;
    } else {
        obj.homeUrl = null;
    }

    obj.membershipMethod = jsMembershipMethod(obj.membershipMethod);
    obj.defaultAuthority = jsSpaceAuth(obj.defaultAuthority);
    return obj;
}

function psFocusedSpace(obj) {
    obj.entityId = psSpaceId(obj.entityId);
    obj.displayId = psSpaceDisplayId(obj.displayId);
    obj.creatorUser = psRelatedUser(obj.creatorUser);

    if (obj.homeUrl) {
        obj.homeUrl = new Data_Maybe.Just(obj.homeUrl);
    } else {
        obj.homeUrl = Data_Maybe.Nothing.value;
    }

    obj.membershipMethod = psMembershipMethod(obj.membershipMethod);
    obj.defaultAuthority = psSpaceAuth(obj.defaultAuthority);
    return obj;
}

function jsFocusedSpace(obj) {
    obj.entityId = jsSpaceId(obj.entityId);
    obj.displayId = jsSpaceDisplayId(obj.displayId);
    obj.creatorUser = jsRelatedUser(obj.creatorUser);

    if (obj.homeUrl instanceof Data_Maybe.Just) {
        obj.homeUrl = obj.homeUrl.value;
    } else {
        obj.homeUrl = null;
    }

    obj.membershipMethod = jsMembershipMethod(obj.membershipMethod);
    obj.defaultAuthority = jsSpaceAuth(obj.defaultAuthority);
    return obj;
}

function psFocusedSpaceMember(obj) {
    obj.user = psRelatedUser(obj.user);
    obj.type = psMemberType(obj.type);
    return obj;
}

function jsFocusedSpaceMember(obj) {
    obj.user = jsRelatedUser(obj.user);
    obj.type = jsMemberType(obj.type);
    return obj;
}

const psUserId = x => x;
const jsUserId = x => x;
const psUserDisplayId = x => x;
const jsUserDisplayId = x => x;

function psRelatedUser(obj) {
    obj.entityId = psUserId(obj.entityId);
    obj.displayId = psUserDisplayId(obj.displayId);

    if (obj.iconUrl) {
        obj.iconUrl = new Data_Maybe.Just(obj.iconUrl);
    } else {
        obj.iconUrl = Data_Maybe.Nothing.value;
    }

    return obj;
}

function jsRelatedUser(obj) {
    obj.entityId = jsUserId(obj.entityId);
    obj.displayId = jsUserDisplayId(obj.displayId);

    if (obj.iconUrl instanceof Data_Maybe.Just) {
        obj.iconUrl = obj.iconUrl.value;
    } else {
        obj.iconUrl = null;
    }

    return obj;
}

function psFocusedUser(obj) {
    obj.entityId = psUserId(obj.entityId);
    obj.displayId = psUserDisplayId(obj.displayId);

    if (obj.iconUrl) {
        obj.iconUrl = new Data_Maybe.Just(obj.iconUrl);
    } else {
        obj.iconUrl = Data_Maybe.Nothing.value;
    }

    return obj;
}

function jsFocusedUser(obj) {
    obj.entityId = jsUserId(obj.entityId);
    obj.displayId = jsUserDisplayId(obj.displayId);

    if (obj.iconUrl instanceof Data_Maybe.Just) {
        obj.iconUrl = obj.iconUrl.value;
    } else {
        obj.iconUrl = null;
    }

    return obj;
}

function psPropertyInfo(obj) {
    if (obj.fieldName) {
        obj.fieldName = new Data_Maybe.Just(obj.fieldName);
    } else {
        obj.fieldName = Data_Maybe.Nothing.value;
    }

    if (obj.semantic) {
        obj.semantic = new Data_Maybe.Just(obj.semantic);
    } else {
        obj.semantic = Data_Maybe.Nothing.value;
    }

    obj.type = psType(obj.type);
    return obj;
}

function jsPropertyInfo(obj) {
    if (obj.fieldName instanceof Data_Maybe.Just) {
        obj.fieldName = obj.fieldName.value;
    } else {
        obj.fieldName = null;
    }

    if (obj.semantic instanceof Data_Maybe.Just) {
        obj.semantic = obj.semantic.value;
    } else {
        obj.semantic = null;
    }

    obj.type = jsType(obj.type);
    return obj;
}

function psTypeArguments(obj) {
    obj.type = psType(obj.type);
    obj.language = psLanguage(obj.language);

    obj.properties = obj.properties.map(x => {
        x = psPropertyInfo(x);
        return x;
    });

    return obj;
}

function jsTypeArguments(obj) {
    obj.type = jsType(obj.type);
    obj.language = jsLanguage(obj.language);

    obj.properties = obj.properties.map(x => {
        x = jsPropertyInfo(x);
        return x;
    });

    return obj;
}

function psType(obj) {
    obj.name = psTypeName(obj.name);
    obj.arguments = psTypeArguments(obj.arguments);
    return obj;
}

function jsType(obj) {
    obj.name = jsTypeName(obj.name);
    obj.arguments = jsTypeArguments(obj.arguments);
    return obj;
}

const psStructureId = x => x;
const jsStructureId = x => x;

function psFocusedStructure(obj) {
    obj.entityId = psStructureId(obj.entityId);

    obj.properties = obj.properties.map(x => {
        x = psPropertyInfo(x);
        return x;
    });

    return obj;
}

function jsFocusedStructure(obj) {
    obj.entityId = jsStructureId(obj.entityId);

    obj.properties = obj.properties.map(x => {
        x = jsPropertyInfo(x);
        return x;
    });

    return obj;
}

const psFormatId = x => x;
const jsFormatId = x => x;
const psFormatDisplayId = x => x;
const jsFormatDisplayId = x => x;

function psRelatedFormat(obj) {
    obj.entityId = psFormatId(obj.entityId);
    obj.displayId = psFormatDisplayId(obj.displayId);
    obj.space = psRelatedSpace(obj.space);
    obj.generator = psContentGenerator(obj.generator);
    obj.usage = psFormatUsage(obj.usage);
    obj.creatorUser = psRelatedUser(obj.creatorUser);
    obj.updaterUser = psRelatedUser(obj.updaterUser);
    return obj;
}

function jsRelatedFormat(obj) {
    obj.entityId = jsFormatId(obj.entityId);
    obj.displayId = jsFormatDisplayId(obj.displayId);
    obj.space = jsRelatedSpace(obj.space);
    obj.generator = jsContentGenerator(obj.generator);
    obj.usage = jsFormatUsage(obj.usage);
    obj.creatorUser = jsRelatedUser(obj.creatorUser);
    obj.updaterUser = jsRelatedUser(obj.updaterUser);
    return obj;
}

function psFocusedFormat(obj) {
    obj.entityId = psFormatId(obj.entityId);
    obj.displayId = psFormatDisplayId(obj.displayId);
    obj.space = psRelatedSpace(obj.space);
    obj.generator = psContentGenerator(obj.generator);
    obj.usage = psFormatUsage(obj.usage);
    obj.creatorUser = psRelatedUser(obj.creatorUser);
    obj.updaterUser = psRelatedUser(obj.updaterUser);
    obj.structure = psFocusedStructure(obj.structure);
    return obj;
}

function jsFocusedFormat(obj) {
    obj.entityId = jsFormatId(obj.entityId);
    obj.displayId = jsFormatDisplayId(obj.displayId);
    obj.space = jsRelatedSpace(obj.space);
    obj.generator = jsContentGenerator(obj.generator);
    obj.usage = jsFormatUsage(obj.usage);
    obj.creatorUser = jsRelatedUser(obj.creatorUser);
    obj.updaterUser = jsRelatedUser(obj.updaterUser);
    obj.structure = jsFocusedStructure(obj.structure);
    return obj;
}

const psContentId = x => x;
const jsContentId = x => x;
const psContentCommitId = x => x;
const jsContentCommitId = x => x;

function psRelatedContentCommit(obj) {
    obj.entityId = psContentCommitId(obj.entityId);
    obj.committerUser = psRelatedUser(obj.committerUser);
    return obj;
}

function jsRelatedContentCommit(obj) {
    obj.entityId = jsContentCommitId(obj.entityId);
    obj.committerUser = jsRelatedUser(obj.committerUser);
    return obj;
}

function psFocusedContentCommit(obj) {
    obj.entityId = psContentCommitId(obj.entityId);
    obj.committerUser = psRelatedUser(obj.committerUser);
    return obj;
}

function jsFocusedContentCommit(obj) {
    obj.entityId = jsContentCommitId(obj.entityId);
    obj.committerUser = jsRelatedUser(obj.committerUser);
    return obj;
}

const psContentDraftId = x => x;
const jsContentDraftId = x => x;

function psRelatedContentDraft(obj) {
    obj.entityId = psContentDraftId(obj.entityId);
    return obj;
}

function jsRelatedContentDraft(obj) {
    obj.entityId = jsContentDraftId(obj.entityId);
    return obj;
}

function psFocusedContentDraft(obj) {
    obj.entityId = psContentDraftId(obj.entityId);

    obj.materialDrafts = obj.materialDrafts.map(x => {
        x = psFocusedMaterialDraft(x);
        return x;
    });

    return obj;
}

function jsFocusedContentDraft(obj) {
    obj.entityId = jsContentDraftId(obj.entityId);

    obj.materialDrafts = obj.materialDrafts.map(x => {
        x = jsFocusedMaterialDraft(x);
        return x;
    });

    return obj;
}

const psMaterialId = x => x;
const jsMaterialId = x => x;

function psRelatedMaterial(obj) {
    obj.entityId = psMaterialId(obj.entityId);
    obj.materialType = psMaterialType(obj.materialType);
    obj.creatorUser = psRelatedUser(obj.creatorUser);
    obj.updaterUser = psRelatedUser(obj.updaterUser);
    return obj;
}

function jsRelatedMaterial(obj) {
    obj.entityId = jsMaterialId(obj.entityId);
    obj.materialType = jsMaterialType(obj.materialType);
    obj.creatorUser = jsRelatedUser(obj.creatorUser);
    obj.updaterUser = jsRelatedUser(obj.updaterUser);
    return obj;
}

function psFocusedMaterial(obj) {
    obj.entityId = psMaterialId(obj.entityId);
    obj.materialType = psMaterialType(obj.materialType);
    obj.creatorUser = psRelatedUser(obj.creatorUser);
    obj.updaterUser = psRelatedUser(obj.updaterUser);
    obj.draft = psRelatedMaterialDraft(obj.draft);
    return obj;
}

function jsFocusedMaterial(obj) {
    obj.entityId = jsMaterialId(obj.entityId);
    obj.materialType = jsMaterialType(obj.materialType);
    obj.creatorUser = jsRelatedUser(obj.creatorUser);
    obj.updaterUser = jsRelatedUser(obj.updaterUser);
    obj.draft = jsRelatedMaterialDraft(obj.draft);
    return obj;
}

const psMaterialCommitId = x => x;
const jsMaterialCommitId = x => x;

function psRelatedMaterialCommit(obj) {
    obj.entityId = psMaterialCommitId(obj.entityId);
    obj.committerUser = psRelatedUser(obj.committerUser);
    return obj;
}

function jsRelatedMaterialCommit(obj) {
    obj.entityId = jsMaterialCommitId(obj.entityId);
    obj.committerUser = jsRelatedUser(obj.committerUser);
    return obj;
}

function psFocusedMaterialCommit(obj) {
    obj.entityId = psMaterialCommitId(obj.entityId);
    return obj;
}

function jsFocusedMaterialCommit(obj) {
    obj.entityId = jsMaterialCommitId(obj.entityId);
    return obj;
}

const psMaterialDraftId = x => x;
const jsMaterialDraftId = x => x;

function psRelatedMaterialDraft(obj) {
    obj.entityId = psMaterialDraftId(obj.entityId);
    return obj;
}

function jsRelatedMaterialDraft(obj) {
    obj.entityId = jsMaterialDraftId(obj.entityId);
    return obj;
}

function psFocusedMaterialDraft(obj) {
    obj.entityId = psMaterialDraftId(obj.entityId);
    obj.material = psRelatedMaterial(obj.material);
    return obj;
}

function jsFocusedMaterialDraft(obj) {
    obj.entityId = jsMaterialDraftId(obj.entityId);
    obj.material = jsRelatedMaterial(obj.material);
    return obj;
}

function psSnapshotSource(str) {
    switch (str) {
    case "E.commit":
        return SnapshotSource.Commit.value;
    case "E.snapshot":
        return SnapshotSource.Snapshot.value;
    case "E.editing":
        return SnapshotSource.Editing.value;
    case "E.draft":
        return SnapshotSource.Draft.value;
    }
}

function jsSnapshotSource(obj) {
    if (obj instanceof E.SnapshotSource.Commit) {
        return "commit";
    }

    if (obj instanceof E.SnapshotSource.Snapshot) {
        return "snapshot";
    }

    if (obj instanceof E.SnapshotSource.Editing) {
        return "editing";
    }

    if (obj instanceof E.SnapshotSource.Draft) {
        return "draft";
    }
}

function psNodeType(str) {
    switch (str) {
    case "E.committed":
        return NodeType.Committed.value;
    case "E.present":
        return NodeType.Present.value;
    case "E.canceled":
        return NodeType.Canceld.value;
    }
}

function jsNodeType(obj) {
    if (obj instanceof E.NodeType.Committed) {
        return "committed";
    }

    if (obj instanceof E.NodeType.Present) {
        return "present";
    }

    if (obj instanceof E.NodeType.Canceld) {
        return "canceled";
    }
}

function psRelatedMaterialSnapshot(obj) {
    obj.source = psSnapshotSource(obj.source);
    return obj;
}

function jsRelatedMaterialSnapshot(obj) {
    obj.source = jsSnapshotSource(obj.source);
    return obj;
}

function psFocusedMaterialSnapshot(obj) {
    return obj;
}

function jsFocusedMaterialSnapshot(obj) {
    return obj;
}

function psMaterialNode(obj) {
    obj.type = psNodeType(obj.type);
    obj.user = psRelatedUser(obj.user);

    if (obj.editingId) {
        obj.editingId = new Data_Maybe.Just(obj.editingId);
    } else {
        obj.editingId = Data_Maybe.Nothing.value;
    }

    obj.snapshot = psRelatedMaterialSnapshot(obj.snapshot);
    return obj;
}

function jsMaterialNode(obj) {
    obj.type = jsNodeType(obj.type);
    obj.user = jsRelatedUser(obj.user);

    if (obj.editingId instanceof Data_Maybe.Just) {
        obj.editingId = obj.editingId.value;
    } else {
        obj.editingId = null;
    }

    obj.snapshot = jsRelatedMaterialSnapshot(obj.snapshot);
    return obj;
}

function psNodeTarget(str) {
    switch (str) {
    case "E.content":
        return NodeTarget.Content.value;
    case "E.material":
        return NodeTarget.Material.value;
    case "E.whole":
        return NodeTarget.Whole.value;
    }
}

function jsNodeTarget(obj) {
    if (obj instanceof E.NodeTarget.Content) {
        return "content";
    }

    if (obj instanceof E.NodeTarget.Material) {
        return "material";
    }

    if (obj instanceof E.NodeTarget.Whole) {
        return "whole";
    }
}

function psContentNode(obj) {
    obj.type = psNodeType(obj.type);
    obj.target = psNodeTarget(obj.target);
    obj.user = psRelatedUser(obj.user);

    if (obj.editingId) {
        obj.editingId = new Data_Maybe.Just(obj.editingId);
    } else {
        obj.editingId = Data_Maybe.Nothing.value;
    }

    obj.snapshot = psRelatedContentSnapshot(obj.snapshot);
    return obj;
}

function jsContentNode(obj) {
    obj.type = jsNodeType(obj.type);
    obj.target = jsNodeTarget(obj.target);
    obj.user = jsRelatedUser(obj.user);

    if (obj.editingId instanceof Data_Maybe.Just) {
        obj.editingId = obj.editingId.value;
    } else {
        obj.editingId = null;
    }

    obj.snapshot = jsRelatedContentSnapshot(obj.snapshot);
    return obj;
}

function psRelatedContentSnapshot(obj) {
    obj.source = psSnapshotSource(obj.source);

    obj.materials = obj.materials.map(x => {
        x = psRelatedMaterialSnapshot(x);
        return x;
    });

    return obj;
}

function jsRelatedContentSnapshot(obj) {
    obj.source = jsSnapshotSource(obj.source);

    obj.materials = obj.materials.map(x => {
        x = jsRelatedMaterialSnapshot(x);
        return x;
    });

    return obj;
}

function psFocusedContentSnapshot(obj) {
    obj.materials = obj.materials.map(x => {
        x = psFocusedMaterialSnapshot(x);
        return x;
    });

    return obj;
}

function jsFocusedContentSnapshot(obj) {
    obj.materials = obj.materials.map(x => {
        x = jsFocusedMaterialSnapshot(x);
        return x;
    });

    return obj;
}

exports.startContentEditing = async args => {
    args.contentId = jsContentId(args.contentId);

    if (args.forkedCommitId instanceof Data_Maybe.Just) {
        args.forkedCommitId = args.forkedCommitId.value;
    } else {
        args.forkedCommitId = null;
    }

    let result = await fetch("startContentEditing", args);
    result = psRelatedContentDraft(result);
    return result;
};

exports.startBlankContentEditing = async args => {
    args.spaceId = jsSpaceId(args.spaceId);
    args.type = jsMaterialType(args.type);
    let result = await fetch("startBlankContentEditing", args);
    result = psRelatedContentDraft(result);
    return result;
};

exports.getContent = async contentId => {
    let args = {
        contentId
    };

    args.contentId = jsContentId(args.contentId);
    let result = await fetch("getContent", args);
    result = psFocusedContent(result);
    return result;
};

exports.getContentDraft = async draftId => {
    let args = {
        draftId
    };

    args.draftId = jsContentDraftId(args.draftId);
    let result = await fetch("getContentDraft", args);
    result = psFocusedContentDraft(result);
    return result;
};

exports.getContentCommits = async contentId => {
    let args = {
        contentId
    };

    args.contentId = jsContentId(args.contentId);
    let result = await fetch("getContentCommits", args);

    result = result.map(x => {
        x = psRelatedContentCommit(x);
        return x;
    });

    return result;
};

exports.getContentEditingNodes = async draftId => {
    let args = {
        draftId
    };

    args.draftId = jsContentDraftId(args.draftId);
    let result = await fetch("getContentEditingNodes", args);

    result = result.map(x => {
        x = psContentNode(x);
        return x;
    });

    return result;
};

exports.getContentSnapshot = async args => {
    args.source = jsSnapshotSource(args.source);
    let result = await fetch("getContentSnapshot", args);
    result = psFocusedContentSnapshot(result);
    return result;
};

exports.getContentCommit = async commitId => {
    let args = {
        commitId
    };

    args.commitId = jsContentCommitId(args.commitId);
    let result = await fetch("getContentCommit", args);
    result = psFocusedContentSnapshot(result);
    return result;
};

exports.createFormat = async args => {
    args.spaceId = jsSpaceId(args.spaceId);
    args.usage = jsFormatUsage(args.usage);

    args.properties = args.properties.map(x => {
        x = jsPropertyInfo(x);
        return x;
    });

    let result = await fetch("createFormat", args);
    result = psRelatedFormat(result);
    return result;
};

exports.getFormat = async formatDisplayId => {
    let args = {
        formatDisplayId
    };

    args.formatDisplayId = jsFormatDisplayId(args.formatDisplayId);
    let result = await fetch("getFormat", args);
    result = psFocusedFormat(result);
    return result;
};

exports.startMaterialEditing = async args => {
    args.materialId = jsMaterialId(args.materialId);

    if (args.forkedCommitId instanceof Data_Maybe.Just) {
        args.forkedCommitId = args.forkedCommitId.value;
    } else {
        args.forkedCommitId = null;
    }

    let result = await fetch("startMaterialEditing", args);
    result = psRelatedMaterialDraft(result);
    return result;
};

exports.startBlankMaterialEditing = async args => {
    args.spaceId = jsSpaceId(args.spaceId);
    args.type = jsMaterialType(args.type);
    let result = await fetch("startBlankMaterialEditing", args);
    result = psRelatedMaterialDraft(result);
    return result;
};

exports.editMaterial = async args => {
    args.materialDraftId = jsMaterialDraftId(args.materialDraftId);
    let result = await fetch("editMaterial", args);

    if (result) {
        result = new Data_Maybe.Just(result);
    } else {
        result = Data_Maybe.Nothing.value;
    }

    return result;
};

exports.commitMaterial = async args => {
    args.materialDraftId = jsMaterialDraftId(args.materialDraftId);
    let result = await fetch("commitMaterial", args);

    if (result) {
        result = new Data_Maybe.Just(result);
    } else {
        result = Data_Maybe.Nothing.value;
    }

    return result;
};

exports.getMaterial = async materialId => {
    let args = {
        materialId
    };

    args.materialId = jsMaterialId(args.materialId);
    let result = await fetch("getMaterial", args);
    result = psFocusedMaterial(result);
    return result;
};

exports.getMaterialDraft = async draftId => {
    let args = {
        draftId
    };

    args.draftId = jsMaterialDraftId(args.draftId);
    let result = await fetch("getMaterialDraft", args);
    result = psFocusedMaterialDraft(result);
    return result;
};

exports.getMaterialCommits = async materialId => {
    let args = {
        materialId
    };

    args.materialId = jsMaterialId(args.materialId);
    let result = await fetch("getMaterialCommits", args);

    result = result.map(x => {
        x = psRelatedMaterialCommit(x);
        return x;
    });

    return result;
};

exports.getMaterialEditingNodes = async draftId => {
    let args = {
        draftId
    };

    args.draftId = jsMaterialDraftId(args.draftId);
    let result = await fetch("getMaterialEditingNodes", args);

    result = result.map(x => {
        x = psMaterialNode(x);
        return x;
    });

    return result;
};

exports.getMaterialSnapshot = async args => {
    args.source = jsSnapshotSource(args.source);
    let result = await fetch("getMaterialSnapshot", args);
    result = psFocusedMaterialSnapshot(result);
    return result;
};

exports.getMaterialCommit = async commitId => {
    let args = {
        commitId
    };

    args.commitId = jsMaterialCommitId(args.commitId);
    let result = await fetch("getMaterialCommit", args);
    result = psFocusedMaterialCommit(result);
    return result;
};

exports.createSpace = async args => {
    let result = await fetch("createSpace", args);
    result = psFocusedSpace(result);
    return result;
};

exports.getSpace = async spaceDisplayId => {
    let args = {
        spaceDisplayId
    };

    args.spaceDisplayId = jsSpaceDisplayId(args.spaceDisplayId);
    let result = await fetch("getSpace", args);
    result = psFocusedSpace(result);
    return result;
};

exports.getSpaceMembers = async spaceId => {
    let args = {
        spaceId
    };

    args.spaceId = jsSpaceId(args.spaceId);
    let result = await fetch("getSpaceMembers", args);

    result = result.map(x => {
        x = psFocusedSpaceMember(x);
        return x;
    });

    return result;
};

exports.createUser = async args => {
    let result = await fetch("createUser", args);
    result = psFocusedUser(result);
    return result;
};

exports.getMyUser = (async () => {
    let result = await fetch("getMyUser", args);
    result = psFocusedUser(result);
    return result;
})();

exports.getUser = async displayId => {
    let args = {
        displayId
    };

    args.displayId = jsUserDisplayId(args.displayId);
    let result = await fetch("getUser", args);
    result = psFocusedUser(result);
    return result;
};

exports.setMyDisplayName = async displayName => {
    let args = {
        displayName
    };

    let result = await fetch("setMyDisplayName", args);
    return result;
};

exports.setMyDisplayId = async displayId => {
    let args = {
        displayId
    };

    args.displayId = jsUserDisplayId(args.displayId);
    let result = await fetch("setMyDisplayId", args);
    return result;
};