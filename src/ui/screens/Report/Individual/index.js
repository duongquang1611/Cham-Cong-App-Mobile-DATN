import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import commons from '../../../commons';
import {HeaderMenuDrawer, IconView, LoadingView} from '../../../components';
import SubInfoCheckinView from './SubInfoCheckinView';
import styles from './styles';
import ColumnBaseView from './ColumnBaseView';
import {useDispatch, useSelector} from 'react-redux';
import API from '../../../../networking';
import moment from 'moment/min/moment-with-locales';
moment.locale(commons.getDeviceLanguage(false));

const HEIGHT_MORE_INFO = 120;

let filterMonthYear = commons.getDayMonthYear(undefined, false);
const BlockView = (props) => {
  const {style, children} = props;
  return <View style={[styles.containerBlock, style]}>{children}</View>;
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
  const dispatch = useDispatch();
  const listDayWork = useSelector((state) => state.dayWorkReducer.listDayWork);
  const detailDayWork = useSelector(
    (state) => state.dayWorkReducer.detailDayWork,
  );
  // console.log('ReportIndividual -> listDayWork', listDayWork);
  const [state, setState] = useState({
    markedDates: {
      dateString: moment().format('YYYY-MM-DD'),
      day: moment().format('D'),
      month: moment().format('M'),
      year: moment().format('YYYY'),
    },
    refreshing: false,
  });

  useEffect(() => {
    getData(filterMonthYear);
  }, [detailDayWork]);

  useEffect(() => {
    state.refreshing && getData(filterMonthYear);
  }, [state.refreshing]);

  const getData = async (newFilter = {}) => {
    console.log('newFilter', newFilter);
    try {
      // get list day work of me
      API.getListDayWork(dispatch, {
        me: true,
        ...newFilter,
      });
    } catch (error) {}
  };

  const filterListDayWork = (key, value, type) => {
    switch (type) {
      case 'COME_LEAVE':
        return listDayWork.filter(
          (item) =>
            item['minutesComeLate'] > 0 || item['minutesLeaveEarly'] > 0,
        ).length;
        break;

      default:
        return listDayWork.filter((item) => item[key] === value);
        break;
    }
  };
  const onMonthChange = (month) => {
    filterMonthYear = {month: month.month, year: month.year};
    // getData(filterMonthYear);
    onRefresh();
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
  const onRefresh = React.useCallback(() => {
    setState({...state, refreshing: true});
    commons.wait(2000).then(() => setState({...state, refreshing: false}));
  }, []);

  const BaseInfoCheckinView = (props) => {
    return (
      <View>
        <View style={styles.containerRowBaseInfo}>
          <ColumnBaseView
            title="Ngày Công"
            msg={`${filterListDayWork('isSuccessDay', true).length}`}
            colorMsg="green"
          />
          <ColumnBaseView
            title="Đi muộn"
            msg={filterListDayWork(undefined, undefined, 'COME_LEAVE')}
            colorMsg="orange"
          />
          <ColumnBaseView
            title="Nghỉ làm"
            msg={filterListDayWork('isDayOff', true).length}
            colorMsg="blue"
            end={true}
          />
        </View>
        <View
          style={{
            ...styles.containerRowBaseInfo,
            flexDirection: 'column',
          }}>
          {/* <RowBaseView title="Số ngày phép còn trong năm" msg={0} /> */}
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
  const formatTimeCheck = (time) => {
    return moment(time).format(commons.FORMAT_TIME_DIFF);
  };

  const MoreInfoCheckinView = (props) => {
    let {day, month, year} = state.markedDates;
    let dayName = moment(state.markedDates.dateString).format('dddd');
    dayName = commons.uppercaseFirstLetter(dayName, true);
    let dataSelected = listDayWork.filter(
      (data) => data.dayWork === state.markedDates.dateString,
    );
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
          <SubInfoCheckinView
            title="Giờ Checkin"
            msg={
              dataSelected[0]?.checkin
                ? formatTimeCheck(dataSelected[0]?.checkin)
                : commons.FORMAT_NONE_TIME_HHMMSS
            }
          />
          <SubInfoCheckinView
            title="Số phút đi muộn"
            msg={(dataSelected[0]?.minutesComeLate || 0) + ' ph'}
          />
        </View>
        <View style={{flex: 3}}>
          <SubInfoCheckinView
            title="Giờ Checkout"
            msg={
              dataSelected[0]?.checkout
                ? formatTimeCheck(dataSelected[0]?.checkout)
                : commons.FORMAT_NONE_TIME_HHMMSS
            }
          />
          <SubInfoCheckinView
            title="Số phút về sớm"
            msg={(dataSelected[0]?.minutesLeaveEarly || 0) + ' ph'}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <HeaderMenuDrawer titleScreen={'Chi tiết chấm công'} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }>
        {state.refreshing && <LoadingView />}

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
