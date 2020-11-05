import baseStyles from '../../../baseStyles';

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
});
export default styles;
