import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  HeaderMenuDrawer,
  TextView,
  RadioGroup,
  BlockView,
  InputView,
} from 'cc-components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import commons from '../../commons';
import moment from 'moment';
import {COME_LEAVE_DATA} from './COME_LEAVE_DATA';

let dataAsk = {};
const LabelView = (props) => {
  const {title = ''} = props;
  return (
    <Text
      style={{
        fontStyle: 'normal',
        fontSize: commons.fontSize,
        fontWeight: 'bold',
      }}>
      {title}
    </Text>
  );
};
const AskComeLateLeaveEarly = () => {
  const [state, setState] = useState({
    isDatePickerVisible: false,
    isTimePickerVisible: false,
  });

  let refInput = {};
  const focusTheField = (id) => {
    refInput[id].focus();
  };
  const handleDateConfirm = useCallback((date) => {
    console.log('handleConfirm -> date', date, moment().toISOString());
    hideDatePicker();
  }, []);

  const handleTimeConfirm = useCallback((date) => {
    console.log('handleConfirm -> date', date);
    hideTimePicker();
  }, []);

  const showDatePicker = ({id}) => {
    if (id === 'date') {
      setState({
        ...state,
        isDatePickerVisible: true,
      });
    } else {
      setState({
        ...state,
        isTimePickerVisible: true,
      });
    }
  };

  const hideDatePicker = () => {
    setState({
      ...state,
      isDatePickerVisible: false,
    });
  };
  const hideTimePicker = () => {
    setState({
      ...state,
      isTimePickerVisible: false,
    });
  };
  const onChangeText = ({id, data}) => {
    console.log('onChangeText -> {id, data}', {id, data});
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Xin đi muộn, về sớm'} />
      {/* ngay xin, gio xin
      title
      reason */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        // }
      >
        <DateTimePickerModal
          mode={'date'}
          isVisible={state.isDatePickerVisible}
          date={new Date()}
          locale="vi"
          confirmTextIOS="Thay Đổi"
          cancelTextIOS="Hủy"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          mode={'time'}
          isVisible={state.isTimePickerVisible}
          date={new Date()}
          locale="vi"
          confirmTextIOS="Thay Đổi"
          cancelTextIOS="Hủy"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

        <BlockView title="Thông tin chính">
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              ...styles.center,
              marginVertical: commons.margin5,
            }}>
            <Text style={{flex: 0.5, ...styles.title}}>Loại xin</Text>
            <RadioGroup
              id={'typeAsk'}
              data={COME_LEAVE_DATA}
              currentIndex={0}
              isWrap={true}
              colorButton={commons.colorMain}
              onSelected={onChangeText}
              style={{
                marginLeft: commons.margin25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}
              styleLabel={{marginLeft: 10}}
            />
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <TextView
              id="date"
              style={styles.buttonPicker}
              styleValue={{color: 'black', fontSize: commons.fontSize}}
              value={'Ngày xin'}
              onPress={showDatePicker}
            />
            <View style={{width: 5}} />
            <TextView
              id="time"
              style={styles.buttonPicker}
              value={'Giờ xin'}
              onPress={showDatePicker}
            />
          </View>
        </BlockView>
        <BlockView title="Thông tin chi tiết">
          <InputView
            id="title"
            ref={(input) => (refInput['title'] = input)}
            style={{
              ...styles.containerInput,
              marginTop: 25,
            }}
            label={<LabelView title={'Tiêu đề'} />}
            placeholder="Nhập tiêu đề ..."
            // value={ noData}
            returnKeyType="next"
            onSubmitEditing={() => focusTheField('reason')}
          />
          <InputView
            id="reason"
            ref={(input) => (refInput['reason'] = input)}
            style={{
              ...styles.containerInput,
            }}
            label={<LabelView title={'Lý do'} />}
            placeholder="Nhập lý do .."
            // value={ noData}
            returnKeyType="next"
          />
        </BlockView>
      </ScrollView>
    </>
  );
};

export default AskComeLateLeaveEarly;
