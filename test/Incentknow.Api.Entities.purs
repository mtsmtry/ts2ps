
module Incentknow.Api.Entities where

import Prelude

import Data.Maybe (Maybe(..))


---------------------------------------------------------
--  Sql
---------------------------------------------------------

data MembershipMethod
  = None
  | App

data SpaceAuth
  = None
  | Visible
  | Readable
  | Writable

data ReactorState
  = Invaild

data MemberType
  = Normal
  | Owner

data FormatUsage
  = Internal
  | External

data ContentGenerator
  = Reactor
  | Crawler

data TypeName
  = Int
  | Bool
  | String
  | Format
  | Space
  | Content
  | Url
  | Object
  | Text
  | Array
  | Code

data Language
  = Python
  | Javascript

data EditingState
  = Editing
  | Committed
  | Canceld

data DraftState
  = Editing

data ChangeType
  = Initial
  | Write
  | Remove

data MaterialType
  = Folder
  | Document

---------------------------------------------------------
--  Entities
---------------------------------------------------------

newtype ContainerId = ContainerId String
derive instance eqContainerId:: Eq ContainerId
derive instance ordContainerId :: Ord ContainerId
derive instance newtypeContainerId :: Newtype ContainerId _

instance readForeignContainerId :: ReadForeign ContainerId where
  readImpl = map wrap <<< readString
instance writeForeignContainerId :: WriteForeign ContainerId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeContainerId :: Newtype ContainerId _

type IntactContainer
  = { entityId :: ContainerId
    , space :: RelatedSpace
    , format :: RelatedFormat
    , createdAt :: Number
    , updatedAt :: Number
    }

newtype SpaceId = SpaceId String
derive instance eqSpaceId:: Eq SpaceId
derive instance ordSpaceId :: Ord SpaceId
derive instance newtypeSpaceId :: Newtype SpaceId _

instance readForeignSpaceId :: ReadForeign SpaceId where
  readImpl = map wrap <<< readString
instance writeForeignSpaceId :: WriteForeign SpaceId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeSpaceId :: Newtype SpaceId _

newtype SpaceDisplayId = SpaceDisplayId String
derive instance eqSpaceDisplayId:: Eq SpaceDisplayId
derive instance ordSpaceDisplayId :: Ord SpaceDisplayId
derive instance newtypeSpaceDisplayId :: Newtype SpaceDisplayId _

instance readForeignSpaceDisplayId :: ReadForeign SpaceDisplayId where
  readImpl = map wrap <<< readString
instance writeForeignSpaceDisplayId :: WriteForeign SpaceDisplayId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeSpaceDisplayId :: Newtype SpaceDisplayId _

type RelatedSpace
  = { entityId :: SpaceId
    , displayId :: SpaceDisplayId
    , displayName :: String
    , description :: String
    , createdAt :: Number
    , homeUrl :: Maybe String
    , membershipMethod :: MembershipMethod
    , defaultAuthority :: SpaceAuth
    }

type FocusedSpace
  = { entityId :: SpaceId
    , displayId :: SpaceDisplayId
    , displayName :: String
    , description :: String
    , creatorUser :: RelatedUser
    , createdAt :: Number
    , homeUrl :: Maybe String
    , membershipMethod :: MembershipMethod
    , defaultAuthority :: SpaceAuth
    }

type FocusedSpaceMember
  = { user :: RelatedUser
    , joinedAt :: Number
    , type :: MemberType
    }

newtype UserId = UserId String
derive instance eqUserId:: Eq UserId
derive instance ordUserId :: Ord UserId
derive instance newtypeUserId :: Newtype UserId _

instance readForeignUserId :: ReadForeign UserId where
  readImpl = map wrap <<< readString
instance writeForeignUserId :: WriteForeign UserId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeUserId :: Newtype UserId _

newtype UserDisplayId = UserDisplayId String
derive instance eqUserDisplayId:: Eq UserDisplayId
derive instance ordUserDisplayId :: Ord UserDisplayId
derive instance newtypeUserDisplayId :: Newtype UserDisplayId _

instance readForeignUserDisplayId :: ReadForeign UserDisplayId where
  readImpl = map wrap <<< readString
instance writeForeignUserDisplayId :: WriteForeign UserDisplayId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeUserDisplayId :: Newtype UserDisplayId _

type RelatedUser
  = { entityId :: UserId
    , displayId :: UserDisplayId
    , displayName :: String
    , iconUrl :: Maybe String
    , createdAt :: Number
    }

type FocusedUser
  = { entityId :: UserId
    , displayId :: UserDisplayId
    , displayName :: String
    , iconUrl :: Maybe String
    , createdAt :: Number
    }

type PropertyInfo
  = { displayName :: String
    , fieldName :: Maybe String
    , id :: String
    , optional :: Boolean
    , semantic :: Maybe String
    , type :: Type
    }

type TypeArguments
  = { format :: String
    , type :: Type
    , language :: Language
    , properties :: Array PropertyInfo
    }

type Type
  = { name :: TypeName
    , arguments :: TypeArguments
    }

newtype StructureId = StructureId String
derive instance eqStructureId:: Eq StructureId
derive instance ordStructureId :: Ord StructureId
derive instance newtypeStructureId :: Newtype StructureId _

instance readForeignStructureId :: ReadForeign StructureId where
  readImpl = map wrap <<< readString
instance writeForeignStructureId :: WriteForeign StructureId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeStructureId :: Newtype StructureId _

type FocusedStructure
  = { entityId :: StructureId
    , properties :: Array PropertyInfo
    , createdAt :: Number
    }

newtype FormatId = FormatId String
derive instance eqFormatId:: Eq FormatId
derive instance ordFormatId :: Ord FormatId
derive instance newtypeFormatId :: Newtype FormatId _

instance readForeignFormatId :: ReadForeign FormatId where
  readImpl = map wrap <<< readString
instance writeForeignFormatId :: WriteForeign FormatId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeFormatId :: Newtype FormatId _

newtype FormatDisplayId = FormatDisplayId String
derive instance eqFormatDisplayId:: Eq FormatDisplayId
derive instance ordFormatDisplayId :: Ord FormatDisplayId
derive instance newtypeFormatDisplayId :: Newtype FormatDisplayId _

instance readForeignFormatDisplayId :: ReadForeign FormatDisplayId where
  readImpl = map wrap <<< readString
instance writeForeignFormatDisplayId :: WriteForeign FormatDisplayId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeFormatDisplayId :: Newtype FormatDisplayId _

type RelatedFormat
  = { entityId :: FormatId
    , displayId :: FormatDisplayId
    , displayName :: String
    , description :: String
    , space :: RelatedSpace
    , generator :: ContentGenerator
    , usage :: FormatUsage
    , createdAt :: Number
    , creatorUser :: RelatedUser
    , updatedAt :: Number
    , updaterUser :: RelatedUser
    }

type FocusedFormat
  = { entityId :: FormatId
    , displayId :: FormatDisplayId
    , displayName :: String
    , description :: String
    , space :: RelatedSpace
    , generator :: ContentGenerator
    , usage :: FormatUsage
    , createdAt :: Number
    , creatorUser :: RelatedUser
    , updatedAt :: Number
    , updaterUser :: RelatedUser
    , structure :: FocusedStructure
    }

newtype ContentId = ContentId String
derive instance eqContentId:: Eq ContentId
derive instance ordContentId :: Ord ContentId
derive instance newtypeContentId :: Newtype ContentId _

instance readForeignContentId :: ReadForeign ContentId where
  readImpl = map wrap <<< readString
instance writeForeignContentId :: WriteForeign ContentId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeContentId :: Newtype ContentId _

newtype ContentCommitId = ContentCommitId String
derive instance eqContentCommitId:: Eq ContentCommitId
derive instance ordContentCommitId :: Ord ContentCommitId
derive instance newtypeContentCommitId :: Newtype ContentCommitId _

instance readForeignContentCommitId :: ReadForeign ContentCommitId where
  readImpl = map wrap <<< readString
instance writeForeignContentCommitId :: WriteForeign ContentCommitId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeContentCommitId :: Newtype ContentCommitId _

type RelatedContentCommit
  = { entityId :: ContentCommitId
    , timestamp :: Number
    , forkedCommitId :: String
    , committerUser :: RelatedUser
    }

type FocusedContentCommit
  = { entityId :: ContentCommitId
    , timestamp :: Number
    , forkedCommitId :: String
    , committerUser :: RelatedUser
    }

newtype ContentDraftId = ContentDraftId String
derive instance eqContentDraftId:: Eq ContentDraftId
derive instance ordContentDraftId :: Ord ContentDraftId
derive instance newtypeContentDraftId :: Newtype ContentDraftId _

instance readForeignContentDraftId :: ReadForeign ContentDraftId where
  readImpl = map wrap <<< readString
instance writeForeignContentDraftId :: WriteForeign ContentDraftId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeContentDraftId :: Newtype ContentDraftId _

type RelatedContentDraft
  = { entityId :: ContentDraftId
    , createdAt :: Number
    , updatedAt :: Number
    , forkedCommitId :: String
    }

type FocusedContentDraft
  = { entityId :: ContentDraftId
    , createdAt :: Number
    , updatedAt :: Number
    , forkedCommitId :: String
    , data :: String
    , materialDrafts :: Array FocusedMaterialDraft
    }

newtype MaterialId = MaterialId String
derive instance eqMaterialId:: Eq MaterialId
derive instance ordMaterialId :: Ord MaterialId
derive instance newtypeMaterialId :: Newtype MaterialId _

instance readForeignMaterialId :: ReadForeign MaterialId where
  readImpl = map wrap <<< readString
instance writeForeignMaterialId :: WriteForeign MaterialId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeMaterialId :: Newtype MaterialId _

type RelatedMaterial
  = { entityId :: MaterialId
    , contentId :: String
    , displayName :: String
    , materialType :: MaterialType
    , createdAt :: Number
    , creatorUser :: RelatedUser
    , updatedAt :: Number
    , updaterUser :: RelatedUser
    }

type FocusedMaterial
  = { entityId :: MaterialId
    , contentId :: String
    , displayName :: String
    , materialType :: MaterialType
    , createdAt :: Number
    , creatorUser :: RelatedUser
    , updatedAt :: Number
    , updaterUser :: RelatedUser
    , data :: String
    , draft :: RelatedMaterialDraft
    }

newtype MaterialCommitId = MaterialCommitId String
derive instance eqMaterialCommitId:: Eq MaterialCommitId
derive instance ordMaterialCommitId :: Ord MaterialCommitId
derive instance newtypeMaterialCommitId :: Newtype MaterialCommitId _

instance readForeignMaterialCommitId :: ReadForeign MaterialCommitId where
  readImpl = map wrap <<< readString
instance writeForeignMaterialCommitId :: WriteForeign MaterialCommitId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeMaterialCommitId :: Newtype MaterialCommitId _

type RelatedMaterialCommit
  = { entityId :: MaterialCommitId
    , timestamp :: Number
    , dataSize :: Number
    , forkedCommitId :: String
    , committerUser :: RelatedUser
    }

type FocusedMaterialCommit
  = { entityId :: MaterialCommitId
    , timestamp :: Number
    , data :: String
    , dataSize :: Number
    }

newtype MaterialDraftId = MaterialDraftId String
derive instance eqMaterialDraftId:: Eq MaterialDraftId
derive instance ordMaterialDraftId :: Ord MaterialDraftId
derive instance newtypeMaterialDraftId :: Newtype MaterialDraftId _

instance readForeignMaterialDraftId :: ReadForeign MaterialDraftId where
  readImpl = map wrap <<< readString
instance writeForeignMaterialDraftId :: WriteForeign MaterialDraftId where
  writeImpl = writeImpl <<< unwrap
derive instance newtypeMaterialDraftId :: Newtype MaterialDraftId _

type RelatedMaterialDraft
  = { entityId :: MaterialDraftId
    , displayName :: String
    , createdAt :: Number
    , updatedAt :: Number
    }

type FocusedMaterialDraft
  = { entityId :: MaterialDraftId
    , displayName :: String
    , createdAt :: Number
    , updatedAt :: Number
    , contentDraftId :: String
    , material :: RelatedMaterial
    , forkedCommitId :: String
    , data :: String
    }

data SnapshotSource
  = Commit
  | Snapshot
  | Editing
  | Draft

data NodeType
  = Committed
  | Present
  | Canceld

type RelatedMaterialSnapshot
  = { source :: SnapshotSource
    , entityId :: String
    , timestamp :: Number
    , dataSize :: Number
    }

type FocusedMaterialSnapshot
  = { timestamp :: Number
    , data :: String
    }

type MaterialNode
  = { type :: NodeType
    , user :: RelatedUser
    , editingId :: Maybe String
    , snapshot :: RelatedMaterialSnapshot
    }

data NodeTarget
  = Content
  | Material
  | Whole

type ContentNode
  = { type :: NodeType
    , target :: NodeTarget
    , user :: RelatedUser
    , editingId :: Maybe String
    , snapshot :: RelatedContentSnapshot
    }

type RelatedContentSnapshot
  = { source :: SnapshotSource
    , entityId :: String
    , timestamp :: Number
    , materials :: Array RelatedMaterialSnapshot
    }

type FocusedContentSnapshot
  = { timestamp :: Number
    , data :: String
    , materials :: Array FocusedMaterialSnapshot
    }

---------------------------------------------------------
--  Container
---------------------------------------------------------

---------------------------------------------------------
--  Content
---------------------------------------------------------

---------------------------------------------------------
--  Format
---------------------------------------------------------

---------------------------------------------------------
--  Material
---------------------------------------------------------

---------------------------------------------------------
--  Space
---------------------------------------------------------

---------------------------------------------------------
--  User
---------------------------------------------------------

