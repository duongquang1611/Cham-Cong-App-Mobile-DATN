import {useRoute} from '@react-navigation/native';
import {
  BlockView,
  ButtonView,
  IconView,
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
import {isPastTime} from '../../commons/utils/DateUtils';
import {DAY_OFF_DATA} from './DAY_OFF_DATA';
import styles from './styles';
let currentPicker;
let dataAsk = {
  typeAsk: DAY_OFF_DATA[0].code,
  reason: '',
  title: '',
  fromDate: '',
  toDate: '',
  status: 0,
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

const AskDayOff = (props) => {
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
    date.setSeconds(0);
    date.setMilliseconds(0);
    hideDatePicker();
    if (commons.isPreviousDay(date)) {
      showAlert({msg: 'Không thể chọn mốc thời gian trong quá khứ !'});
      return;
    } else if (dataAsk?.toDate && currentPicker === 'fromDate') {
      // check from -> to
      if (commons.isPastTime(new Date(dataAsk.toDate), date)) {
        showAlert({msg: 'Ngày bắt đầu không được lớn hơn ngày kết thúc !'});
        return;
      }
    } else if (dataAsk?.fromDate && currentPicker === 'toDate') {
      // check from -> to
      if (commons.isPastTime(date, new Date(dataAsk.fromDate))) {
        showAlert({msg: 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu !'});
        return;
      }
    }
    onChangeText({id: currentPicker, data: date.toISOString()});
  }, []);

  // const handleTimeConfirm = useCallback((date) => {
  //   console.log('handleConfirm -> date', date);
  //   hideTimePicker();
  // }, []);

  const showDatePicker = ({id}) => {
    currentPicker = id;
    console.log('showDatePicker -> currentPicker', currentPicker);
    setState({
      ...state,
      isDatePickerVisible: true,
    });
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
    let check = dataAsk.title && dataAsk.reason && dataAsk.fromDate;
    if (dataAsk.typeAsk === 'days') {
      check = check && dataAsk.toDate;
    }
    check = check ? true : false;
    // console.log('checkVerification -> check', check, dataAsk);
    setState({...state, isVerified: check});
  };
  const onPressSend = async () => {
    try {
      let newDataAsk = {...dataAsk};
      if (dataAsk.typeAsk === 'day') {
        newDataAsk.toDate = newDataAsk.fromDate;
      }
      // console.log('AskDayOff -> dataAsk', newDataAsk);
      let res = await API.PUT(API.dayOff, newDataAsk);
      // console.log('AskDayOff -> res', res);
      if (res && res._id) {
        showAlert({
          msg: `Xin nghỉ thành công.`,
        });
        dispatch(actions.changeListAskDayOff(true));
      }
    } catch (error) {
      console.log('AskDayOff -> error', error);
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
          mode={'date'}
          isVisible={state.isDatePickerVisible}
          date={
            currentPicker && dataAsk[currentPicker]
              ? new Date(dataAsk[currentPicker])
              : new Date()
          }
          locale="vi"
          confirmTextIOS="Thay Đổi"
          cancelTextIOS="Hủy"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
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
              data={DAY_OFF_DATA}
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

          <Text style={{flex: 0.5, ...styles.title, marginBottom: 10}}>
            Thời gian
          </Text>

          <View style={{flex: 1, flexDirection: 'row', ...styles.center}}>
            <TextView
              id="fromDate"
              nameIconLeft={'calendar-time'}
              colorIconLeft={commons.colorMain70}
              style={styles.buttonPicker}
              styleValue={{
                color: 'black',
                fontSize: commons.fontSize,
                marginLeft: commons.margin10,
              }}
              value={
                dataAsk?.fromDate
                  ? moment(dataAsk?.fromDate).format(commons.FORMAT_DATE_VN)
                  : dataAsk.typeAsk === 'days'
                  ? 'Từ ngày'
                  : 'Thời gian xin'
              }
              onPress={showDatePicker}
            />
            {dataAsk.typeAsk === 'days' && (
              <>
                <IconView
                  name="arrow-right"
                  size={20}
                  style={{marginHorizontal: 10}}
                />
                <TextView
                  id="toDate"
                  nameIconLeft={'calendar-time'}
                  colorIconLeft={commons.colorMain70}
                  style={styles.buttonPicker}
                  styleValue={{
                    color: 'black',
                    fontSize: commons.fontSize,
                    marginLeft: commons.margin10,
                  }}
                  value={
                    dataAsk?.toDate
                      ? moment(dataAsk?.toDate).format(commons.FORMAT_DATE_VN)
                      : 'Đến ngày'
                  }
                  onPress={showDatePicker}
                />
              </>
            )}
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
            // value={ commons.noData}
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
            // value={ commons.noData}
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

export default AskDayOff;
