import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../../redux/actions';
import {HeaderView} from '../../components';

const AccountScreen = () => {
  const dispatch = useDispatch();
  const isShowLoading = useSelector(
    (state) => state.commonReducer.isShowLoading,
  );
  const onShowLoading = () => {
    dispatch(actions.isShowLoading(!isShowLoading));
  };
  return (
    <>
      <HeaderView
        isToolbar={true}
        isStatusBar={true}
        titleScreen={'Account'}
        colorIconBack="white"
      />
      <View style={styles.container}>
        <Text>Index Account</Text>
        <TouchableOpacity onPress={onShowLoading} style={styles.button}>
          <Text>Loading: {isShowLoading ? 'true' : 'false'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
