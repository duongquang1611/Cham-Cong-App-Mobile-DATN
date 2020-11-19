import {Alert, Linking, Platform} from 'react-native';
import models from '../../../models';
// import {AppNavigate} from '../../navigations';
// import api from '../../networking';
// import images from '../../../assets/images';
// import Share from 'react-native-share';
import commons from '..';
import Toast from 'react-native-root-toast';

// async function handleShare(pathInWeb) {
//   let url = api.BASE_URL;
//   if (pathInWeb) {
//     url += `${pathInWeb}`;
//   }
//   const title = 'Chia sẻ bất động sản';
//   const message = 'Mua bán nhà đất với Vlands.';
//   const icon = images.logo;
//   const options = Platform.select({
//     ios: {
//       activityItemSources: [
//         {
//           // For sharing url with custom title.
//           placeholderItem: {type: 'url', content: url},
//           item: {
//             default: {type: 'url', content: url},
//           },
//           subject: {
//             default: title,
//           },
//           linkMetadata: {originalUrl: url, url, title},
//         },
//         {
//           // For sharing text.
//           placeholderItem: {type: 'text', content: message},
//           item: {
//             default: {type: 'text', content: message},
//             message: null, // Specify no text to share via Messages app.
//           },
//           linkMetadata: {
//             // For showing app icon on share preview.
//             title: message,
//           },
//         },
//         {
//           // For using custom icon instead of default text icon at share preview when sharing with message.
//           placeholderItem: {
//             type: 'url',
//             content: icon,
//           },
//           item: {
//             default: {
//               type: 'text',
//               content: `${message} ${url}`,
//             },
//           },
//           linkMetadata: {
//             title: message,
//             icon: icon,
//           },
//         },
//       ],
//     },
//     default: {
//       title,
//       subject: title,
//       message: `${message} ${url}`,
//     },
//   });

//   try {
//     await Share.open(options);
//   } catch (error) {
//     console.log('handleShare -> error', error);
//   }
// }

function handleClickPhoneNumber(phoneNumber) {
  let linkingPhone = '';
  if (Platform.OS === 'android') {
    linkingPhone = `tel:${phoneNumber}`;
  } else {
    linkingPhone = `telprompt:${phoneNumber}`;
  }
  let check = commons.isValidPhoneNumber(phoneNumber);
  if (check) {
    Linking.openURL(linkingPhone);
  } else {
    Toast.show(`Số điện thoại ${phoneNumber} không hợp lệ. Kiểm tra lại.`);
  }
  // Linking.canOpenURL(linkingPhone)
  //   .then((supported) => {
  //     console.log('handleClickPhoneNumber -> supported', supported);
  //     if (!supported) {
  //       Alert.alert(`Số điện thoại ${phoneNumber} không hợp lệ!`);
  //     } else {
  //       return Linking.openURL(linkingPhone);
  //     }
  //   })
  //   .catch((err) => console.log(err));
}

function handleClickEmail(email) {
  let linkingEmail = '';
  let subject = 'Chấm công';
  let body = 'Tôi muốn biết thêm thông tin chi tiết về ...';
  try {
    let check = commons.isValidEmail(email);
    linkingEmail = `mailto:${email}?subject=${subject}&body=${body}`;
    if (check) {
      Linking.openURL(linkingEmail);
    } else {
      Toast.show(`Địa chỉ Email ${email} không hợp lệ. Kiểm tra lại.`);
    }
  } catch (error) {
    console.log('handleClickEmail -> error', error);
  }
}
const handleButton = {
  // handleShare,
  handleClickPhoneNumber,
  handleClickEmail,
};

export default handleButton;
