import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment/min/moment-with-locales';
import {IconView, TextView} from 'cc-components';
import {useDispatch} from 'react-redux';
import actions from '../../../../redux/actions';
import API from '../../../../networking';
import commons from '../../../commons';
import baseStyles from '../../../../baseStyles';

moment.locale(commons.getDeviceLanguage(false));
const STATUS = [
  {id: -1, name: 'Từ chối', color: 'red'},
  {id: 0, name: 'Chờ duyệt', color: 'orange'},
  {id: 1, name: 'Chấp nhận', color: commons.PersianGreen},
];
const HEIGHT_MORE_INFO = 60;

const ItemHistoryAskDayOff = (props) => {
  const dispatch = useDispatch();
  const {item, index, style, typeConfirm} = props;
  let {day, month, year} = commons.getDayMonthYear(item?.fromDate);
  let dayName = moment(item?.fromDate).format('dddd');
  dayName = commons.uppercaseFirstLetter(dayName, true);
  let statusData = STATUS.find((itemData) => itemData.id == item.status);

  const DateBlock = (props) => {
    return (
      <View style={{flex: 1, ...styles.center}}>
        <View style={styles.containerDate}>
          {item?.type === 'day' ? (
            <>
              <Text
                style={{
                  fontSize: commons.fontSize16,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {dayName}
              </Text>
              <Text style={{fontSize: commons.fontSize12, color: 'red'}}>
                {day} Tháng {month}
              </Text>
              <Text style={{fontSize: commons.fontSize16, color: 'white'}}>
                {year}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.textDays}>
                {moment(item?.fromDate).format(commons.FORMAT_DATE_VN)}
              </Text>
              <IconView
                name="arrow-down"
                size={commons.sizeIcon12}
                color="white"
                style={{marginVertical: commons.margin}}
              />
              <Text style={styles.textDays}>
                {moment(item?.toDate).format(commons.FORMAT_DATE_VN)}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  };
  // const onPressConfirm = async ({id}) => {
  //   try {
  //     let params = {
  //       typeAsk: type,
  //       time: item[type]?.time,
  //       title: item[type]?.title,
  //       reason: item[type]?.reason,
  //       status: id,
  //       userId: item?.userId?._id,
  //     };
  //     // console.log('ItemHistoryAskDayOff -> params', params);
  //     await API.PUT(API.askComeLeave, params);
  //     dispatch(actions.changeListConfirmComeLeave(true));
  //   } catch (error) {
  //     console.log('ItemHistoryAskDayOff -> error', error);
  //     // dispatch(actions.changeListConfirmComeLeave(true));
  //   }
  // };
  return (
    <View
      style={{
        minHeight: HEIGHT_MORE_INFO,
        flexDirection: 'row',
        // alignSelf: 'baseline',
        width: '100%',
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
        ...style,
      }}>
      <DateBlock />
      <View style={{flex: 3}}>
        <View
          style={{
            ...styles.type,
            backgroundColor: statusData?.color,
            borderBottomEndRadius: 5,
          }}>
          <Text style={{color: 'white', fontSize: 12}}>{statusData?.name}</Text>
        </View>

        <View style={{padding: 10}}>
          {/* <Text style={styles.title}>{item?.userId?.name}</Text> */}
          <Text style={[styles.title, {flexWrap: 'wrap', flex: 1}]}>
            {item?.title}
          </Text>
          <Text>Lý do: {item?.reason}</Text>
          {/* {typeConfirm && (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextView
                id="1"
                value="Chấp nhận"
                onPress={onPressConfirm}
                style={{...styles.buttonConfirm}}
                styleValue={{...styles.textConfirm}}
              />
              <View style={{width: 10}} />
              <TextView
                id="-1"
                value="Từ chối"
                onPress={onPressConfirm}
                styleValue={{...styles.textConfirm}}
                style={{...styles.buttonConfirm, backgroundColor: 'red'}}
              />
            </View>
          )} */}
        </View>
      </View>
    </View>
  );
};

export default ItemHistoryAskDayOff;

const styles = StyleSheet.create({
  ...baseStyles,
  containerDate: {
    // borderWidth: 0.5,
    // borderRadius: 5,
    padding: commons.padding5,
    backgroundColor: commons.colorMainCustom(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
    width: '100%',
    flex: 1,
  },
  type: {
    width: 70,
    maxHeight: 35,
    backgroundColor: commons.colorMainCustom(0.5),
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonConfirm: {
    flex: 1,
    backgroundColor: commons.PersianGreen,
    marginTop: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textConfirm: {
    color: 'white',
  },
  textDays: {
    color: 'white',
    fontSize: commons.fontSize,
    fontWeight: 'bold',
  },
});
