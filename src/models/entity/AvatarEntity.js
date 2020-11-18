import {AVATAR_TABLE} from './Schema';

const AvatarEntity = {
  name: AVATAR_TABLE,
  properties: {
    thumb200: {type: 'string?', default: null},
    thumb300: {type: 'string?', default: null},
    thumb500: {type: 'string?', default: null},
    original: {type: 'string?', default: null},
  },
};

export default AvatarEntity;
