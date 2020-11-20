import defineds from './defineds';
import utils from './utils';
import handle from './handle';
import * as location from './location';
// import AppImages from '../../assets/images';
// export { AppImages, defineds,}
export {defineds};

const commons = {
  ...defineds,
  ...utils,
  ...handle,
  ...location,
};

export default commons;
