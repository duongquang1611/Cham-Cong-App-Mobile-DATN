import {StyleSheet} from 'react-native';
import commons from '../../commons';

const styles = StyleSheet.create({
  containerInput: {
    marginBottom: commons.margin10,
  },
  error: {
    fontStyle: 'italic',
    color: 'red',
    fontSize: commons.fontSize12,
  },
  textInput: {fontSize: commons.fontSize14, color: 'black'},
});
export default styles;
