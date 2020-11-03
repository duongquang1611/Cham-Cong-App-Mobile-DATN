import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {HeaderMenuDrawer} from '../../../components';
import moment from 'moment';
import commons from '../../../commons';
const ReportIndividual = () => {
  const [state, setState] = useState({
    monthChange: moment().format('YYYY-MM-DD'),
  });

  const onMonthChange = (month) => {
    // console.log('onMonthChange -> month', month);
  };

  const renderHeader = (date) => {
    return <Text>Tháng {moment(new Date(date)).format('MM - YYYY')}</Text>;
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Báo cáo'} />
      <ScrollView>
        <Calendar
          // Initially visible month. Default = Date()
          // current={'2012-03-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2012-01-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2100-12-31'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log('selected day', day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
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
          // Hide month navigation arrows. Default = false
          // hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // renderArrow={(direction) => <Arrow />}

          // Do not show days of other months in month page. Default = false
          // hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out

          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false, day name in the top calendars
          // hideDayNames={true}
          // Show week numbers to the left. Default = false
          // showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          // disableArrowLeft={true}

          // Disable right arrow. Default = false
          // disableArrowRight={true}

          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.
          renderHeader={renderHeader}
          // Enable the option to swipe between months. Default = false
          // enableSwipeMonths={true}
        />
      </ScrollView>
    </>
  );
};

export default ReportIndividual;

const styles = StyleSheet.create({});
