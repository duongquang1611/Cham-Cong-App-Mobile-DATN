import {useRoute} from '@react-navigation/native';
import {HeaderView, IconView, TextView} from 'cc-components';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import baseStyles from '../../../../baseStyles';
import API from '../../../../networking';
import commons from '../../../commons';
import moment from 'moment';
import {Modal} from 'react-native';

const RowInfoModal = (props) => {
  const {title, value} = props;

  return (
    <View style={styles.containerRowInfoModal}>
      <Text style={{width: '25%', color: 'grey'}}>{title}</Text>
      <Text style={{width: '70%', fontSize: commons.fontSize15}}>
        {value || commons.noData}
      </Text>
    </View>
  );
};

const DetailCompany = (props) => {
  const route = useRoute();
  const {companyData} = route.params;
  //   console.log({companyData});
  const [state, setState] = useState({
    refreshing: true,
    detailCompany: companyData,
    expanded: true,
    isVisibleModal: false,
    userSelected: {},
  });

  const getData = async () => {
    try {
      let res = await API.GET(API.detailCompany(companyData?._id));
      // console.log({res});
      if (res) {
        setState({...state, refreshing: false, detailCompany: res});
      } else {
        setState({...state, refreshing: false});
      }
    } catch (error) {
      console.log({error});
      setState({...state, refreshing: false});
    }
  };
  useEffect(() => {
    // only run on x change
    state.refreshing && getData();
    return () => {};
  }, [state.refreshing]);

  const onRefresh = () => {
    setState({...state, refreshing: true});
  };
  const onPressExpanded = () => {
    setState({...state, expanded: !state.expanded});
  };

  const toggleModal = (isShow, user) => {
    setState({
      ...state,
      userSelected: isShow ? user : {},
      isVisibleModal: isShow,
    });
  };
  const BaseInfoCompany = useCallback(() => {
    return (
      <View style={styles.baseInfoContainer}>
        <RowInfoModal title="Tên công ty" value={state.detailCompany?.name} />
        <RowInfoModal
          title="Số điện thoại"
          value={state.detailCompany?.phoneNumber}
        />
        <RowInfoModal title="Email" value={state.detailCompany?.email} />
        <RowInfoModal title="Địa chỉ" value={state.detailCompany?.address} />
        <RowInfoModal title="Website" value={state.detailCompany?.website} />
        <RowInfoModal
          title="Người đại diện"
          value={state.detailCompany?.representativeName}
        />
      </View>
    );
  }, [state.detailCompany]);
  let isValidUsers =
    state.detailCompany?.users &&
    Array.isArray(state.detailCompany?.users) &&
    state.detailCompany?.users.length > 0;
  return (
    <>
      <HeaderView
        titleScreen={companyData?.name || 'Chi tiết công ty'}
        styleTitle={styles.titleCompany}
        isToolbar={true}
        isStatusBar={true}
        colorIconBack="white"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={state.isVisibleModal}
        onRequestClose={() => toggleModal(false)}>
        <TouchableOpacity
          onPress={() => toggleModal(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}>
          <View
            style={{
              // height: 300,
              width: commons.widthPercent(90),
              backgroundColor: 'white',
              padding: commons.padding10,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={styles.textTitleModal}>Thông tin tài khoản</Text>
            <RowInfoModal
              title="Tài khoản"
              value={state.userSelected?.username}
            />
            <RowInfoModal title="Tên" value={state.userSelected?.name} />
            <RowInfoModal
              title="Chức vụ"
              value={state.userSelected?.roleId?.name}
            />
            <RowInfoModal
              title="Quản lý trực tiếp"
              value={state.userSelected?.parentId?.name}
            />
            <RowInfoModal
              title="Công ty"
              value={state.userSelected?.companyId?.name}
            />
            <RowInfoModal
              title="Số điện thoại"
              value={state.userSelected?.phoneNumber}
            />
            <RowInfoModal title="Địa chỉ" value={state.userSelected?.address} />
            <RowInfoModal title="Email" value={state.userSelected?.email} />
            <RowInfoModal
              title="Giới tính"
              value={
                state.userSelected?.gender
                  ? state.userSelected?.gender == 1
                    ? 'Nam'
                    : 'Nữ'
                  : ''
              }
            />
            <RowInfoModal
              title="Ngày sinh"
              value={
                state.userSelected?.dateOfBirth
                  ? moment(state.userSelected?.dateOfBirth).format(
                      commons.FORMAT_DATE_VN,
                    )
                  : ''
              }
            />
            <RowInfoModal
              title="Cập nhật lần cuối"
              value={moment(state.userSelected?.updatedAt).format(
                commons.FORMAT_DATE_VN,
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }>
        <BaseInfoCompany />
        <List.Accordion
          title={`Danh sách nhân viên (${
            isValidUsers ? state.detailCompany?.users.length : 0
          })`}
          titleStyle={{color: 'black', fontWeight: 'bold'}}
          //   left={() => (
          //     <IconView
          //       //   style={{ width: size, height: size, tintColor: color }}
          //       color={'black'}
          //       name="user"
          //     />
          //   )}
          expanded={state.expanded}
          onPress={onPressExpanded}>
          {isValidUsers ? (
            state.detailCompany?.users.map((user, index) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginRight: 10,
                  ...styles.center,
                }}
                key={index}
                onPress={() => toggleModal(true, user)}>
                <List.Item
                  title={user?.name}
                  style={{flex: 1}}
                  titleStyle={{fontSize: commons.fontSize}}
                />
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: 'lightgrey',
                    padding: 3,
                    borderRadius: 3,
                  }}>
                  <Text style={{fontSize: commons.fontSize12}}>
                    {user?.roleId?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <List.Item
              title={'Chưa có nhân viên'}
              style={{flex: 1}}
              titleStyle={{fontSize: commons.fontSize}}
            />
          )}
        </List.Accordion>
      </ScrollView>
    </>
  );
};

export default memo(DetailCompany);

const styles = StyleSheet.create({
  ...baseStyles,
  titleCompany: {
    width: '80%',
    textAlign: 'center',
    color: 'white',
  },
  containerRowInfoModal: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 0,
  },
  textTitleModal: {
    ...baseStyles.title,
    padding: 5,
    width: '100%',
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    marginBottom: 10,
  },
  baseInfoContainer: {
    paddingHorizontal: commons.padding15,
    paddingTop: commons.padding,
  },
});
