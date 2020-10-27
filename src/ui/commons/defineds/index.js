import colors from './Colors';
import dimensions, {
  scale,
  verticalScale,
  heightPercent,
  widthPercent,
  heightLocationProject,
  moderateScale,
} from './Dimensions';
import fonts from './Fonts';
// import t from './Translation';
const NAME_APP = 'Chấm công App';
const textM2 = 'm\u00B2';

const defineds = {
  NAME_APP,
  textM2,
  ...colors,
  ...dimensions,
  ...fonts,
  scale,
  verticalScale,
  heightPercent,
  widthPercent,
  heightLocationProject,
  moderateScale,
};

export default defineds;
