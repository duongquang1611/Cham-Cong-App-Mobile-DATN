import defineds from './defineds';
import utils from './utils';
import handle from './handle';
// import AppImages from '../../assets/images';
// export { AppImages, defineds,}
export {defineds};

const commons = {
  ...defineds,
  ...utils,
  ...handle,
};

export default commons;
