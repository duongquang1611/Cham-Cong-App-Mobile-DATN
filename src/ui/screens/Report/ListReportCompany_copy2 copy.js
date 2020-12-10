import React, {useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import commons from '../../commons';
import EmptyList from '../../components/CustomFlatList/EmptyList';
import SeparatorView from '../../components/CustomFlatList/SeparatorView';
import styles from './styles';
import {TypeTabReport} from './TypeTabReport';
const sumComeLeave = (accumulator, currentValue, key) => {
  return accumulator + currentValue[key];
};
const ItemInfoRow = ({value, title, first = false, end = false}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        borderColor: 'lightgrey',
        borderTopWidth: first ? 0 : 0.5,
        paddingTop: first ? 0 : commons.padding5,
        paddingBottom: end ? 0 : commons.padding5,
        justifyContent: 'space-between',
        paddingLeft: commons.padding,
        paddingRight: commons.padding,
      }}>
      <Text>{title || ''}</Text>
      <Text style={{fontWeight: 'bold'}}>{value || ''}</Text>
    </View>
  );
};
const ListReportCompany = (props) => {
  const reportReducer = useSelector((state) => state.reportReducer);
  const {
    workDaysCompany,
    askDayOffInCompany,
    askComeLeaveInCompany,
  } = reportReducer;

  const {usersInCompany} = reportReducer;

  const findDetailDataByUserId = useCallback((userId, data) => {
    let detail = data.find((item) => item._id === userId);
    return detail || {};
  });
  const filterData = useCallback((data, key, value, type) => {
    // console.log(
    //   '🚀 ~ file: ListReportCompany.js ~ line 20 ~ filterData ~ data',
    //   data,
    // );
    switch (type) {
      case 'COME_LEAVE':
        return data.filter(
          (item) =>
            item['minutesComeLate'] > 0 || item['minutesLeaveEarly'] > 0,
        ).length;
      case 'COME_LATE':
        return data.filter((item) => item['minutesComeLate'] > 0).length;
      case 'LEAVE_EARLY':
        return data.filter((item) => item['minutesLeaveEarly'] > 0).length;
      case 'MINUTES_COME_LATE':
        return data.reduce(
          (accumulator, currentValue) =>
            sumComeLeave(accumulator, currentValue, key),
          0,
        );
      case 'MINUTES_LEAVE_EARLY':
        return data.reduce(
          (accumulator, currentValue) =>
            sumComeLeave(accumulator, currentValue, key),
          0,
        );
      default:
        return data.filter((item) => item[key] === value);
    }
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{...styles.containerItemUser, flexDirection: 'row'}}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 2,
          }}>
          <Text style={{fontSize: commons.fontSize, fontWeight: 'bold'}}>
            {item?.name}
          </Text>
          <View>
            <Text style={{fontSize: commons.fontSize12, color: 'gray'}}>
              {item?.roleId?.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 3,
            marginLeft: commons.margin15,
          }}>
          <ItemInfoRow
            first={true}
            title={'Ngày công'}
            value={`${
              filterData(
                findDetailDataByUserId(item._id, workDaysCompany).results || [],
                'isSuccessDay',
                true,
              ).length
            }`}
          />
          <ItemInfoRow
            title={'Đi muộn'}
            value={`${filterData(
              findDetailDataByUserId(item._id, askComeLeaveInCompany).results ||
                [],
              undefined,
              undefined,
              'COME_LATE',
            )}`}
          />
          <ItemInfoRow
            end={true}
            title={'Về sớm'}
            value={`${filterData(
              findDetailDataByUserId(item._id, askComeLeaveInCompany).results ||
                [],
              undefined,
              undefined,
              'LEAVE_EARLY',
            )}`}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 3}} />
        <Text style={{flex: 1}}>Ngày công</Text>
        <Text style={{flex: 1}} />
        <Text style={{flex: 1}} />
      </View>
    );
  };
  return (
    <FlatList
      data={usersInCompany}
      ListHeaderComponent={renderHeader}
      renderItem={renderItem}
      keyExtractor={(item, index) => {
        // return item.toString() + index.toString();
        return index.toString();
      }}
      extraData={usersInCompany}
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{
        paddingTop: commons.margin5,
        paddingHorizontal: commons.margin,
      }}
      ListEmptyComponent={EmptyList}
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      ItemSeparatorComponent={SeparatorView}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};

export default ListReportCompany;
