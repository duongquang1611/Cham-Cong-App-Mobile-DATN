import {StyleSheet} from 'react-native';
import baseStyles from '../../../../baseStyles';
import commons from '../../../commons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: commons.padding5,
  },
  containerBlock: {
    paddingHorizontal: commons.padding15,
  },
  ...baseStyles,
  textSubInfo: {
    fontSize: commons.fontSize12,
  },
  containerDate: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: commons.padding5,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    width: '90%',
  },
  textHeader: {fontSize: commons.fontSize16, fontWeight: 'bold'},
  containerRowBaseInfo: {
    marginHorizontal: commons.margin10,
    padding: commons.padding10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    marginVertical: commons.margin,
  },
  titleCheckin: {
    fontSize: commons.fontSizeHeader,
    fontWeight: 'bold',
    marginTop: commons.margin,
    paddingVertical: commons.padding5,
  },

  customBlockCheckin: {
    borderTopWidth: 0.5,
    borderColor: 'lightgray',
    marginTop: commons.margin5,
  },
  containerSubRowBaseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: commons.padding5,
    paddingHorizontal: commons.padding,
    borderBottomColor: 'lightgray',
  },
});

export default styles;
