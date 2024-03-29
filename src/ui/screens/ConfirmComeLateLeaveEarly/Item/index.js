import moment from 'moment/min/moment-with-locales';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import baseStyles from '../../../../baseStyles';
import API from '../../../../networking';
import actions from '../../../../redux/actions';
import commons from '../../../commons';
import ConfirmButtonView from './ConfirmButtonView';

moment.locale(commons.getDeviceLanguage(false));
const STATUS = [
  {id: -1, name: 'Từ chối', color: 'red'},
  {id: 0, name: 'Chờ duyệt', color: 'orange'},
  {id: 1, name: 'Chấp nhận', color: commons.PersianGreen},
];
const HEIGHT_MORE_INFO = 60;
let TYPE = {
  comeLateAsk: 'Đi muộn',
  leaveEarlyAsk: 'Về sớm',
  getType: function (type) {
    if (type) {
      return this[type];
    } else return this.comeLateAsk + '\n' + this.leaveEarlyAsk;
  },
};

const ItemConfirmComeLeave = (props) => {
  const dispatch = useDispatch();
  const {item, index, style, typeConfirm} = props;
  let type = item?.type?.code;
  // console.log('ItemConfirmComeLeave -> item', item[type].acceptedBy);
  let {day, month, year} = item;
  let dayName = moment(item?.dayWork).format('dddd');
  dayName = commons.uppercaseFirstLetter(dayName, true);

  let statusData = STATUS.find((itemData) => itemData.id == item[type]?.status);

  const DateBlock = (props) => {
    return (
      <View style={{flex: 1, ...styles.center}}>
        <View style={styles.containerDate}>
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
        </View>
      </View>
    );
  };
  const onPressConfirm = async ({id}) => {
    try {
      let params = {
        typeAsk: type,
        time: item[type]?.time,
        title: item[type]?.title,
        reason: item[type]?.reason,
        status: id,
        userId: item?.userId?._id,
      };
      // console.log('ItemConfirmComeLeave -> params', params);
      await API.PUT(API.askComeLeave, params);
      dispatch(actions.changeListConfirmComeLeave(true));
    } catch (error) {
      console.log('ItemConfirmComeLeave -> error', error);
      // dispatch(actions.changeListConfirmComeLeave(true));
    }
  };

  return (
    <View
      style={{
        minHeight: HEIGHT_MORE_INFO,
        ...styles.containerItem,
        ...style,
      }}>
      <DateBlock />
      <View style={{flex: 3}}>
        <View style={styles.rowCenterSpaceBetween}>
          <View
            style={{
              ...styles.type,
              backgroundColor: statusData?.color,
              borderBottomEndRadius: 5,
            }}>
            <Text style={{color: 'white', fontSize: 12}}>
              {statusData?.name}
            </Text>
          </View>
          <View
            style={{
              ...styles.type,
              borderBottomStartRadius: 5,
              backgroundColor: item?.type.id
                ? 'purple'
                : commons.colorMainCustom(1),
            }}>
            <Text style={{color: 'white', fontSize: 12}}>
              {item?.type?.name}
            </Text>
          </View>
        </View>

        <View style={{padding: 10}}>
          <Text style={styles.title}>{item?.userId?.name}</Text>
          <Text style={[styles.title, {flexWrap: 'wrap', flex: 1}]}>
            {item[type]?.title}
          </Text>
          <Text>Lý do: {item[type]?.reason}</Text>
          <Text>
            Giờ xin:{' '}
            <Text style={styles.title}>
              {moment(item[type]?.time).format('HH:mm')}
            </Text>
          </Text>
          {typeConfirm ? (
            <ConfirmButtonView
              onPressAccept={onPressConfirm}
              onPressCancel={onPressConfirm}
            />
          ) : (
            <>
              <Text>
                Người duyệt:{' '}
                <Text>
                  {item[type]?.acceptedBy
                    ? item[type]?.acceptedBy?.name
                    : 'Đang cập nhật'}
                </Text>
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ItemConfirmComeLeave;

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
  containerItem: {
    flexDirection: 'row',
    // alignSelf: 'baseline',
    width: '100%',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
});
