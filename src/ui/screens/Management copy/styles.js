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
  textLabel: {fontSize: 16, marginBottom: 5},
});
export default styles;
