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
const noData = 'Chưa có dữ liệu';

const defineds = {
  NAME_APP,
  textM2,
  ...colors,
  ...dimensions,
  ...fonts,
  noData,
  scale,
  verticalScale,
  heightPercent,
  widthPercent,
  heightLocationProject,
  moderateScale,
};

export default defineds;
