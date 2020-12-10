import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';
import AppImages from '../../../../assets/images';
import commons from '../../commons';

const ButtonExportFAB = (props) => {
  const {exportExcel} = props;
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  const navigation = useNavigation();
  return (
    <FAB.Group
      style={{padding: 16}}
      open={open}
      // fabStyle={{backgroundColor: 'black'}}
      icon={open ? 'close' : AppImages.excel_02}
      color={'white'}
      actions={[
        {
          icon: ({size, color, direction}) => (
            <Image
              source={AppImages.excel_02}
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

          // style: {
          //   height: 60,
          //   width: 60,
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   borderRadius: 100,
          // },
          label: 'Xuất báo cáo chấm công',
          onPress: () => exportExcel('workDay'),
        },
        {
          icon: ({size, color, direction}) => (
            <Image
              source={AppImages.excel_02}
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
          label: 'Xuất báo cáo đi muộn',
          onPress: () => exportExcel('comeLate'),
        },
        {
          icon: ({size, color, direction}) => (
            <Image
              source={AppImages.excel_02}
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
          label: 'Xuất báo cáo về sớm',
          onPress: () => exportExcel('leaveEarly'),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  );
};

export default ButtonExportFAB;
