import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import commons from '../../commons';
import EmptyList from '../../components/CustomFlatList/EmptyList';
import SeparatorView from '../../components/CustomFlatList/SeparatorView';
import styles from './styles';
import {TypeTabReport} from './TypeTabReport';
const ListUserCompany = (props) => {
  const reportReducer = useSelector((state) => state.reportReducer);
  const {detailData = [], typeTab = TypeTabReport.work_day} = props;
  //   console.log({detailData, typeTab});

  const {usersInCompany} = reportReducer;
  const findDetailDataByUserId = (userId) => {
    let detail = detailData.find((item) => item._id === userId);
    return detail || {};
  };
  const filterData = (data, key, value, type) => {
    // console.log(
    //   '🚀 ~ file: ListUserCompany.js ~ line 20 ~ filterData ~ data',
    //   data,
    // );
    switch (type) {
      case 'COME_LEAVE':
        return data.filter(
          (item) =>
            item['minutesComeLate'] > 0 || item['minutesLeaveEarly'] > 0,
        ).length;
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
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.containerItemUser}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: commons.fontSize, fontWeight: 'bold'}}>
            {item?.name}
          </Text>
          <View>
            <Text style={{fontSize: commons.fontSize12}}>
              {item?.roleId?.name}
            </Text>
          </View>
        </View>
        {typeTab === 0 ? (
          <>
            <Text>
              Ngày công:{' '}
              <Text style={{fontWeight: 'bold'}}>
                {`${
                  filterData(
                    findDetailDataByUserId(item._id).results || [],
                    'isSuccessDay',
                    true,
                  ).length
                }`}
              </Text>
            </Text>
          </>
        ) : typeTab === 1 ? (
          <></>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={usersInCompany}
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

export default ListUserCompany;
