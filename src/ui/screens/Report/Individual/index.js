import moment from 'moment/min/moment-with-locales';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import commons from '../../../commons';
import {HeaderMenuDrawer, IconView} from '../../../components';
import SubInfoCheckinView from './SubInfoCheckinView';
import styles from './styles';
moment.locale(commons.getDeviceLanguage(false));

const HEIGHT_MORE_INFO = 120;
const BlockView = (props) => {
  const {style, children} = props;
  return <View style={[styles.containerBlock, style]}>{children}</View>;
};

const ColumnBaseView = (props) => {
  const {title, msg, colorMsg = 'black', end = false} = props;
  return (
    <View
      style={{
        ...styles.center,
        flex: 1,
        borderRightWidth: end ? 0 : 1,
        borderRightColor: 'lightgray',
      }}>
      <Text
        style={{
          color: colorMsg,
          fontWeight: 'bold',
          fontSize: commons.fontSizeHeader,
        }}>
        {msg}
      </Text>
      <Text>{title}</Text>
    </View>
  );
};
const RowBaseView = (props) => {
  const {title, msg, colorMsg = 'black', end = false} = props;
  return (
    <View
      style={{
        ...styles.center,
        ...styles.containerSubRowBaseInfo,
        borderBottomWidth: end ? 0 : 0.5,
      }}>
      <Text>{title}</Text>
      <Text
        style={{
          color: colorMsg,
          fontWeight: 'bold',
          fontSize: commons.fontSizeHeader,
        }}>
        {msg}
      </Text>
    </View>
  );
};
const ReportIndividual = () => {
  const [state, setState] = useState({
    markedDates: {
      dateString: moment().format('YYYY-MM-DD'),
      day: moment().format('D'),
      month: moment().format('M'),
      year: moment().format('YYYY'),
    },
  });

  const onMonthChange = (month) => {
    // console.log('onMonthChange -> month', month);
  };

  const renderHeader = (date) => {
    return (
      <Text style={styles.textHeader}>
        Tháng {moment(new Date(date)).format('MM - YYYY')}
      </Text>
    );
  };
  const onDayPress = (day) => {
    console.log('onDayPress -> day', day);
    if (state.markedDates !== day.dateString)
      setState({
        ...state,
        markedDates: day,
      });
  };

  const BaseInfoCheckinView = (props) => {
    return (
      <View>
        <View style={styles.containerRowBaseInfo}>
          <ColumnBaseView title="Ngày Công" msg="10/24" colorMsg="green" />
          <ColumnBaseView title="Đi muộn, Về sớm" msg="4" colorMsg="orange" />
          <ColumnBaseView title="Nghỉ làm" msg="1" colorMsg="blue" end={true} />
        </View>
        <View
          style={{
            ...styles.containerRowBaseInfo,
            flexDirection: 'column',
          }}>
          <RowBaseView title="Số ngày phép còn trong năm" msg={0} />
          <RowBaseView title="Tổng số phút đi muộn trong tháng" msg={0} />
          <RowBaseView
            title="Tổng số phút về sớm trong tháng"
            end={true}
            msg={0}
          />
        </View>
      </View>
    );
  };

  const MoreInfoCheckinView = (props) => {
    let {day, month, year} = state.markedDates;
    let dayName = moment(state.markedDates.dateString).format('dddd');
    dayName = commons.uppercaseFirstLetter(dayName, true);
    return (
      <View
        style={{
          flexDirection: 'row',
          height: HEIGHT_MORE_INFO,
          ...styles.bottomBlock,
        }}>
        <View style={{flex: 2, ...styles.center}}>
          <View style={styles.containerDate}>
            <Text style={{fontSize: commons.fontSize16, fontWeight: 'bold'}}>
              {dayName}
            </Text>
            <Text style={{fontSize: commons.fontSize12, color: 'red'}}>
              {day} Tháng {month}
            </Text>
            <Text style={{fontSize: commons.fontSize16}}>{year}</Text>
          </View>
        </View>
        <View style={{flex: 3}}>
          <SubInfoCheckinView title="Giờ Checkin" msg={' ' + '-- : --'} />
          <SubInfoCheckinView title="Số phút đi muộn" msg={'' + '0 ph'} />
        </View>
        <View style={{flex: 3}}>
          <SubInfoCheckinView title="Giờ Checkout" msg={' ' + '-- : --'} />
          <SubInfoCheckinView title="Số phút về sớm" msg={'' + '0 ph'} />
        </View>
      </View>
    );
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Báo cáo'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BaseInfoCheckinView />
        <BlockView style={styles.customBlockCheckin}>
          <Text style={styles.titleCheckin}>Lịch Chấm Công</Text>
          <Text style={{color: commons.subtitle, fontSize: commons.fontSize16}}>
            Chọn ngày để xem chi tiết chấm công
          </Text>
          <Calendar
            style={{
              width: commons.widthPercent(100),
              alignSelf: 'center',
              ...styles.bottomBlock,
            }}
            markingType={'custom'}
            markedDates={{
              // '2020-11-04': {
              //   customStyles: {
              //     container: {
              //       backgroundColor: 'green',
              //     },
              //     text: {
              //       color: 'white',
              //       fontWeight: 'bold',
              //     },
              //   },
              // },

              [state.markedDates.dateString]: {
                selected: true,
                // marked: true,
                selectedColor: commons.colorMain70,
                customStyles: {
                  container: {
                    elevation: 2,
                  },
                  text: {
                    color: 'white',
                    fontWeight: 'bold',
                  },
                },
              },
            }}
            // current={'2012-01-01'}
            minDate={'2012-01-01'}
            maxDate={'2100-12-31'}
            onDayPress={onDayPress}
            onDayLongPress={(day) => {
              console.log('selected day', day);
            }}
            monthFormat={'yyyy MM'}
            onMonthChange={onMonthChange}
            // dayComponent={({date, state}) => {
            //   return (
            //     <View>
            //       <Text
            //         style={{
            //           textAlign: 'center',
            //           color: state === 'disabled' ? 'gray' : 'black',
            //         }}>
            //         {date.day}
            //       </Text>
            //     </View>
            //   );
            // }}
            // hideArrows={true}
            // renderArrow={(direction) => <Arrow />}
            // hideExtraDays={true}
            // disableMonthChange={true}
            firstDay={1}
            // hideDayNames={true}
            // showWeekNumbers={true}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            // disableArrowLeft={true}
            // disableArrowRight={true}
            // disableAllTouchEventsForDisabledDays={true}
            renderHeader={renderHeader}
            // enableSwipeMonths={true}
          />
        </BlockView>
        <MoreInfoCheckinView />
      </ScrollView>
    </>
  );
};

export default ReportIndividual;
