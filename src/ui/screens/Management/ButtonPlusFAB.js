import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';
import AppImages from '../../../../assets/images';
import {appNavigate} from '../../../navigations';
import commons from '../../commons';

const ButtonPlusFAB = () => {
  const [state, setState] = useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  const navigation = useNavigation();
  return (
    // <Provider>
    // <Portal>
    <FAB.Group
      style={{padding: 16}}
      open={open}
      icon={open ? 'close' : 'plus'}
      color={'white'}
      actions={[
        {
          icon: ({size, color, direction}) => (
            <Image
              source={AppImages.add_user}
              style={[
                {
                  transform: [{scaleX: direction === 'rtl' ? -1 : 1}],
                },
                {
                  width: size,
                  height: size,
                  tintColor: color,
                },
              ]}
            />
          ),
          label: 'Thêm người dùng',
          onPress: () =>
            appNavigate.navToOtherScreen(navigation.dispatch, 'AddAccount'),
        },
        {
          icon: ({size, color, direction}) => (
            <Image
              source={AppImages.add_company}
              style={[
                {
                  transform: [{scaleX: direction === 'rtl' ? -1 : 1}],
                },
                {
                  width: size,
                  height: size,
                  tintColor: color,
                },
              ]}
            />
          ),
          label: 'Thêm công ty',
          onPress: () =>
            appNavigate.navToOtherScreen(navigation.dispatch, 'AddCompany'),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
    // </Portal>
    // </Provider>
  );
};

export default ButtonPlusFAB;
