import baseStyles from '../../../baseStyles';
import commons from '../../commons';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     marginVertical: 5,
  //     marginHorizontal: 10,
  //   },
  //   bottomBlock: {
  //     borderBottomWidth: 1,
  //     borderColor: 'lightgray',
  //   },
  ...baseStyles,
  button: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  containerTimeAllow: {
    marginHorizontal: commons.margin10,
    padding: commons.padding10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    marginVertical: commons.margin,
  },
  buttonCheckTime: {
    marginVertical: 20,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 200,
    width: 200,
    ...baseStyles.center,
    alignSelf: 'center',
    elevation: 10,
  },
});
export default styles;
