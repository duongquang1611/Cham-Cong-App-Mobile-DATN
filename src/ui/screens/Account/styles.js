import {StyleSheet} from 'react-native';
import baseStyles from '../../../styles';
import commons from '../../commons';

export default StyleSheet.create({
  styleImgeLogo: {
    width: '60%',
    height: 80,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginBottom: 10,
    tintColor: 'white',
  },

  styleMessageForm: {
    fontSize: commons.fontSizeHeader,
    fontStyle: 'italic',
    color: commons.WildWatermelon,
    alignSelf: 'center',
    textAlign: 'center',
  },

  styleBodyForm: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: commons.margin20,
    marginBottom: commons.margin10,
  },

  styleContainerHeader: {
    minHeight: 80,
    backgroundColor: commons.colorMain,
    borderBottomRightRadius: 70,
  },

  containerFormInput: {
    backgroundColor: 'white',
    // marginTop: commons.margin,
    paddingVertical: 25,
    paddingHorizontal: commons.margin10,
    // elevation: 2,
    borderRadius: commons.borderRadius4,
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '95%',
  },

  styleTextTitle: {
    color: 'white',
    fontStyle: 'italic',
    fontWeight: '700',
    marginHorizontal: commons.margin,
    lineHeight: 16,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 3,
    right: 20,
    left: 0,
    fontSize: commons.fontSize14,
  },

  styleTextMess: {
    color: commons.colorMain,
    fontStyle: 'italic',
    lineHeight: 18,
    alignSelf: 'center',
    fontSize: commons.fontSize12,
    marginHorizontal: commons.margin10,
  },

  styleButtonFocus: {
    ...baseStyles.buttonFilledFocus,
    marginTop: commons.margin20,
    marginBottom: commons.margin8,
  },

  styleDisabled: {
    ...baseStyles.buttonFilledDisable,
    marginTop: commons.margin20,
    marginBottom: commons.margin15,
  },

  styleTextButton: {
    fontSize: commons.fontSizeHeader,
    margin: 3,
    color: 'white',
    fontWeight: '700',
  },

  styleContainrTextLink: {
    alignSelf: 'flex-end',
    height: 30,
    flex: 1,
  },

  styleTextLink: {
    fontStyle: 'italic',
    color: commons.colorButtonArrow,
  },

  ////////
  footer: {
    backgroundColor: 'white',
    position: 'relative',
    bottom: 2,
  },

  ////FromLogin
  containerAuthVia: {
    flexDirection: 'row',
    marginVertical: commons.margin15,
    paddingHorizontal: commons.margin15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  styleViewLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: commons.margin20,
    marginHorizontal: commons.margin20,
  },

  styleTextLoginVia: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: -5,
    fontSize: commons.fontSize15,
    color: '#456',
    textAlign: 'center',
  },

  styleButtonSocialLogin: {
    ...baseStyles.buttonFilledFocus,
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 20,
  },

  styleTextButtonSocial: {
    fontSize: commons.fontSize,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 3,
    color: 'white',
    fontWeight: '700',
  },

  styleViewOrLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: commons.margin20,
    marginHorizontal: commons.margin20,
  },

  styleTextOr: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: commons.fontSize15,
    color: '#456',
    textAlign: 'center',
  },

  ////Quẻn mat khau

  styleBodyFPassword: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: commons.margin20,
  },

  styleButtonSendDisabled: {
    backgroundColor: commons.bgButtonDisable,
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 20,
  },

  styleButtonSend: {
    backgroundColor: commons.colorMain,
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 3,
    marginVertical: 20,
  },

  // register enter otp
  textCongratulations: {
    fontSize: commons.fontSize16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: commons.margin10,
  },
  textCheckMail: {
    fontSize: commons.fontSize14,
    color: 'black',
    fontWeight: 'bold',
  },
  textNotes: {
    fontStyle: 'italic',
    fontSize: commons.fontSize14,
    marginVertical: commons.margin15,
  },
});
