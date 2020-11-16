import {useRoute} from '@react-navigation/native';
import {
  BlockView,
  ButtonView,
  InputView,
  RadioGroup,
  showAlert,
  TextView,
  TextWarning,
} from 'cc-components';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import API from '../../../networking';
import actions from '../../../redux/actions';
import commons from '../../commons';
import {COME_LEAVE_DATA} from './COME_LEAVE_DATA';
import styles from './styles';

let dataAsk = {
  typeAsk: COME_LEAVE_DATA[0].code,
  reason: '',
  title: '',
  time: '',
};
const LabelView = (props) => {
  const {title = '', warning} = props;
  return (
    <Text
      style={{
        fontStyle: 'normal',
        fontSize: commons.fontSize,
        fontWeight: 'bold',
      }}>
      {title}
      {warning ? <TextWarning msg={warning} /> : <Text></Text>}
    </Text>
  );
};

const AskComeLeave = (props) => {
  const [state, setState] = useState({
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    isVerified: false,
    isSending: false,
  });
  const route = useRoute();

  const dispatch = useDispatch();
  let refInput = {};
  const focusTheField = (id) => {
    refInput[id].focus();
  };

  const handleDateConfirm = useCallback((date) => {
    hideDatePicker();
    onChangeText({id: 'time', data: date.toISOString()});
  }, []);

  // const handleTimeConfirm = useCallback((date) => {
  //   console.log('handleConfirm -> date', date);
  //   hideTimePicker();
  // }, []);

  const showDatePicker = ({id}) => {
    // if (id === 'date') {
    setState({
      ...state,
      isDatePickerVisible: true,
    });
    // } else {
    //   setState({
    //     ...state,
    //     isTimePickerVisible: true,
    //   });
    // }
  };

  const hideDatePicker = () => {
    setState({
      ...state,
      isDatePickerVisible: false,
    });
  };
  // const hideTimePicker = () => {
  //   setState({
  //     ...state,
  //     isTimePickerVisible: false,
  //   });
  // };
  const onChangeText = ({id, data}) => {
    if (id === 'typeAsk') {
      dataAsk[id] = data.code;
    } else {
      dataAsk[id] = data;
    }
    checkVerification();
  };

  const checkVerification = () => {
    let check = dataAsk.title && dataAsk.reason && dataAsk.time ? true : false;
    console.log('checkVerification -> check', check, dataAsk);
    setState({...state, isVerified: check});
  };
  const onPressSend = async () => {
    try {
      let res = await API.PUT(API.askComeLeave, dataAsk);
      console.log('AskComeLeave -> res', res);
      if (res && res._id) {
        showAlert({
          msg: `Xin ${
            dataAsk.typeAsk === 'comeLateAsk' ? 'đến muộn' : 'về sớm'
          } thành công.`,
        });
        dispatch(actions.changeListAskComeLeave(true));
      }
    } catch (error) {
      console.log('AskComeLeave -> error', error);
    }
  };
  return (
    <>
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
          mode={'datetime'}
          isVisible={state.isDatePickerVisible}
          date={dataAsk?.time ? new Date(dataAsk?.time) : new Date()}
          locale="vi"
          confirmTextIOS="Thay Đổi"
          cancelTextIOS="Hủy"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        {/* <DateTimePickerModal
          mode={'time'}
          isVisible={state.isTimePickerVisible}
          date={new Date()}
          locale="vi"
          confirmTextIOS="Thay Đổi"
          cancelTextIOS="Hủy"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        /> */}

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

          <View style={{flex: 1, flexDirection: 'row', ...styles.center}}>
            <Text style={{flex: 0.5, ...styles.title}}>Thời gian</Text>
            <TextView
              id="date"
              nameIconLeft={'calendar-time'}
              colorIconLeft={commons.colorMain70}
              style={styles.buttonPicker}
              styleValue={{
                color: 'black',
                fontSize: commons.fontSize,
                marginLeft: commons.margin10,
              }}
              value={
                dataAsk?.time
                  ? moment(dataAsk?.time).format(
                      commons.FORMAT_DD_MM_YYY_HH_MM_SS,
                    )
                  : 'Thời gian xin'
              }
              onPress={showDatePicker}
            />
            {/* <View style={{width: 5}} />
            <TextView
              id="time"
              style={styles.buttonPicker}
              value={'Giờ xin'}
              onPress={showDatePicker}
            /> */}
          </View>
        </BlockView>
        <BlockView title="Thông tin chi tiết" styleChildren={{marginTop: 10}}>
          <LabelView title={'Tiêu đề'} warning="*" />
          <InputView
            id="title"
            ref={(input) => (refInput['title'] = input)}
            style={{
              marginBottom: 10,
            }}
            // label={<LabelView title={'Tiêu đề'} />}
            placeholder="Nhập tiêu đề (VD: Thai sản, hỏng xe, ...)"
            // value={ noData}
            returnKeyType="next"
            onChangeText={onChangeText}
            onSubmitEditing={() => focusTheField('reason')}
          />
          <LabelView title={'Lý do'} warning="*" />
          <InputView
            id="reason"
            height={80}
            maxLength={500}
            ref={(input) => (refInput['reason'] = input)}
            style={{
              marginBottom: 10,
            }}
            multiline={true}
            textAlignVertical="top"
            // label={<LabelView title={'Lý do'} />}
            placeholder="Nhập lý do ..."
            onChangeText={onChangeText}
            // value={ noData}
            returnKeyType="next"
          />
        </BlockView>
      </ScrollView>
      <ButtonView
        onPress={onPressSend}
        disabled={!state.isVerified}
        styleDisabled={styles.styleDisabled}
        title={'Gửi yêu cầu'}
        style={styles.styleButtonFocus}
        styleTitle={styles.styleTextButton}
      />
    </>
  );
};

export default AskComeLeave;
