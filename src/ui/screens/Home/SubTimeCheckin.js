import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import commons from '../../commons';
import {IconView} from 'cc-components';

const DEFAULT_TIME = '--h : --p : --s';

const SubTimeCheckin = (props) => {
  const {time, subTime, title, subTitle, type = 'checkin'} = props;

  return type === 'checkin' ? (
    <View style={styles.container}>
      <IconView
        name={'ios-arrow-redo-sharp'}
        type="Ionicons"
        size={commons.sizeIcon18}
      />
      <View style={{marginHorizontal: commons.margin}}>
        <Text style={{fontSize: commons.fontSize12}}>
          {title || `Thời gian checkin`}
        </Text>
        <Text style={{fontSize: commons.fontSize16, color: commons.colorMain}}>
          {time || DEFAULT_TIME}
        </Text>
        <Text style={{marginVertical: 3, fontSize: commons.fontSize12}}>
          {subTitle || 'Muộn'}:{' '}
          <Text style={{color: 'orange', fontSize: commons.fontSize}}>
            {subTime || DEFAULT_TIME}
          </Text>
        </Text>
      </View>
    </View>
  ) : (
    <View style={{...styles.container, justifyContent: 'flex-end'}}>
      <View style={{marginHorizontal: commons.margin}}>
        <Text style={{fontSize: commons.fontSize12}}>
          {title || `Thời gian checkout`}
        </Text>
        <Text style={{fontSize: commons.fontSize16, color: 'red'}}>
          {time || DEFAULT_TIME}
        </Text>
        <Text style={{marginVertical: 3, fontSize: commons.fontSize12}}>
          {subTitle || 'Sớm'}:{' '}
          <Text style={{color: 'orange', fontSize: commons.fontSize}}>
            {subTime || DEFAULT_TIME}
          </Text>
        </Text>
      </View>
      <IconView
        name={'ios-arrow-undo-sharp'}
        type="Ionicons"
        size={commons.sizeIcon18}
        color="red"
      />
    </View>
  );
};

export default SubTimeCheckin;
const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row', alignItems: 'center'},
});
