
module Incentknow.Api.Api where

import Prelude

import Incentknow.Api.Entities as E
import Data.Maybe (Maybe(..))
import Control.Promise (Promise)


foreign import startContentEditing :: 
  { contentId :: String
  , forkedCommitId :: Maybe String
  }
  -> Promise E.RelatedContentDraft

foreign import startBlankContentEditing :: 
  { spaceId :: String
  , displayName :: String
  , type :: E.MaterialType
  }
  -> Promise E.RelatedContentDraft

foreign import getContentEditing :: 
  { editingId :: String
  }
  -> Promise E.FocusedContentEditing

foreign import createFormat :: 
  { spaceId :: String
  , displayName :: String
  , description :: String
  , usage :: E.FormatUsage
  , properties :: Array E.PropertyInfo
  }
  -> Promise E.RelatedFormat

foreign import getFormat :: 
  { formatDisplayId :: String
  }
  -> Promise E.FocusedFormat

foreign import startMaterialEditing :: 
  { materialId :: String
  , forkedCommitId :: Maybe String
  }
  -> Promise E.RelatedMaterialDraft

foreign import startBlankMaterialEditing :: 
  { space :: E.Space
  , displayName :: String
  , type :: E.MaterialType
  }
  -> Promise E.RelatedMaterialDraft

foreign import getMaterialEditing :: 
  { editingId :: String
  }
  -> Promise E.FocusedMaterialEditing

foreign import createSpace :: 
  { displayName :: String
  , description :: String
  }
  -> Promise E.FocusedSpace

foreign import getSpace :: 
  { spaceDisplayId :: String
  }
  -> Promise E.FocusedSpace

foreign import getSpaceMembers :: 
  { spaceId :: String
  }
  -> Promise (Array E.FocusedSpaceMember)

foreign import createUser :: 
  { email :: String
  , displayName :: String
  , password :: String
  }
  -> Promise E.FocusedUser

foreign import getMyUser :: 

  }
  -> Promise E.FocusedUser

foreign import getUser :: 
  { displayId :: String
  }
  -> Promise E.FocusedUser

foreign import setMyDisplayName :: 
  { displayName :: String
  }
  -> Promise {}

foreign import setMyDisplayId :: 
  { displayId :: String
  }
  -> Promise {}

