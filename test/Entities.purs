
module Incentknow.Api.Entities where

import Prelude

import Data.Maybe (Maybe(..))


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

type IntactContainer
  = { entityId :: String
    , space :: RelatedSpace
    , format :: RelatedFormat
    , createdAt :: Number
    , updatedAt :: Number
    }

type RelatedSpace
  = { entityId :: String
    , displayId :: String
    , displayName :: String
    , description :: String
    , createdAt :: Number
    , homeUrl :: Maybe String
    , membershipMethod :: MembershipMethod
    , defaultAuthority :: SpaceAuth
    }

type FocusedSpace
  = { entityId :: String
    , displayId :: String
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

type RelatedUser
  = { entityId :: String
    , displayId :: String
    , displayName :: String
    , iconUrl :: Maybe String
    , createdAt :: Number
    }

type FocusedUser
  = { entityId :: String
    , displayId :: String
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

type FocusedStructure
  = { entityId :: String
    , properties :: Array PropertyInfo
    , createdAt :: Number
    }

type RelatedFormat
  = { entityId :: String
    , displayId :: String
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
  = { entityId :: String
    , displayId :: String
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

type RelatedContentCommit
  = { entityId :: String
    , timestamp :: Number
    , forkedCommitId :: String
    , committerUser :: RelatedUser
    }

type FocusedContentCommit
  = { entityId :: String
    , timestamp :: Number
    , forkedCommitId :: String
    , committerUser :: RelatedUser
    }

type RelatedContentDraft
  = { entityId :: String
    , createdAt :: Number
    , updatedAt :: Number
    , forkedCommitId :: String
    }

type FocusedContentDraft
  = { entityId :: String
    , createdAt :: Number
    , updatedAt :: Number
    , forkedCommitId :: String
    , data :: String
    , materialDrafts :: Array FocusedMaterialDraft
    }

type RelatedMaterial
  = { entityId :: String
    , contentId :: String
    , displayName :: String
    , materialType :: MaterialType
    , createdAt :: Number
    , creatorUser :: RelatedUser
    , updatedAt :: Number
    , updaterUser :: RelatedUser
    }

type FocusedMaterial
  = { entityId :: String
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

type RelatedMaterialCommit
  = { entityId :: String
    , timestamp :: Number
    , dataSize :: Number
    , forkedCommitId :: String
    , committerUser :: RelatedUser
    }

type FocusedMaterialCommit
  = { entityId :: String
    , timestamp :: Number
    , data :: String
    , dataSize :: Number
    }

type RelatedMaterialDraft
  = { entityId :: String
    , displayName :: String
    , createdAt :: Number
    , updatedAt :: Number
    }

type FocusedMaterialDraft
  = { entityId :: String
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
    , dataSize :: Number
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

type MaterialNode
  = { type :: NodeType
    , timestamp :: Number
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
    , timestamp :: Number
    , user :: RelatedUser
    , editingId :: Maybe String
    , snapshot :: RelatedContentSnapshot
    }

