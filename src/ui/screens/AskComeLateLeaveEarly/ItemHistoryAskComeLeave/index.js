import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment/min/moment-with-locales';
import commons from '../../../commons';
import baseStyles from '../../../../baseStyles';
moment.locale(commons.getDeviceLanguage(false));

const HEIGHT_MORE_INFO = 100;
let TYPE = {
  comeLateAsk: 'Đi muộn',
  leaveEarlyAsk: 'Về sớm',
  getType: function (type) {
    if (type) {
      return this[type];
    } else return this.comeLateAsk + '\n' + this.leaveEarlyAsk;
  },
};

const ItemHistoryAskComeLate = (props) => {
  const {item, style} = props;
  console.log('ItemHistoryAskComeLate -> item', item);
  let {day, month, year} = item;
  let dayName = moment(item?.dayWork).format('dddd');
  dayName = commons.uppercaseFirstLetter(dayName, true);
  let type = ['comeLateAsk'];
  if (item?.leaveEarlyAsk?.time && item?.comeLateAsk?.time) {
    type = ['comeLateAsk', 'leaveEarlyAsk'];
  } else if (item?.leaveEarlyAsk?.time) {
    type = ['leaveEarlyAsk'];
  }

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
  return (
    <View
      style={{
        flexDirection: 'row',
        // minHeight: '20%',
        // borderWidth: 1,
        // borderColor: 'lightgrey',
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 5,
        overflow: 'hidden',
        // flexGrow: 0,
        ...style,
      }}>
      <DateBlock />
      <View style={{flex: 3}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // flexShrink: 1,
            // flexWrap: 'wrap',
          }}>
          <Text style={[styles.title, {flexWrap: 'wrap', flex: 1}]}>
            {type.length > 1
              ? [item[type[0]].title, item[type[1]].title].join(', ')
              : item[type[0]].title}{' '}
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </Text>
          <View style={styles.type}>
            <Text style={{color: 'white', fontSize: 12}}>
              {type.length > 1 ? TYPE.getType() : TYPE.getType(type[0])}
            </Text>
          </View>
        </View>
        <Text>x</Text>
        <Text>x</Text>
        <Text>x</Text>
        <Text>x</Text>
        <Text>x</Text>
        <Text>x</Text>
        <Text>x</Text>
        <Text>x</Text>
      </View>
    </View>
  );
};

export default ItemHistoryAskComeLate;

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
    height: '100%',
  },
  type: {
    width: 70,
    maxHeight: 35,
    backgroundColor: commons.colorMainCustom(0.5),
    borderBottomStartRadius: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
