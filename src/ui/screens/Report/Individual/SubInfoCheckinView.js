import React from 'react';
import {Text, View} from 'react-native';
import commons from '../../../commons';
import styles from './styles';
import {IconView} from '../../../components';

const SubInfoCheckinView = (props) => {
  const {title, icon = 'info-alt', msg, typeIcon, sizeIcon, colorIcon} = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: commons.margin5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconView name={icon} size={commons.sizeIcon16} />
        <View style={{marginLeft: commons.margin5}}>
          <Text style={styles.textSubInfo}>{title}</Text>
          <Text style={styles.textSubInfo}>{msg}</Text>
        </View>
      </View>
    </View>
  );
};

export default SubInfoCheckinView;
