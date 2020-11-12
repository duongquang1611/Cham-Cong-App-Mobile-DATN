import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import commons from '../commons';

const BlockView = (props) => {
  const {title, children, styleChildren, style} = props;
  return (
    <View style={[styles.containerBlock, style]}>
      {title && (
        <>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>{title}</Text>
          </View>
          <View style={{height: 1, backgroundColor: commons.colorMain70}} />
        </>
      )}
      <View style={{...styles.styleChildren, ...styleChildren}}>
        {children}
      </View>
    </View>
  );
};
export default BlockView;

const styles = StyleSheet.create({
  containerBlock: {
    backgroundColor: 'white',
    paddingTop: 10,
    elevation: 3,
    borderRadius: 6,
    marginVertical: 10,
    width: '96%',
    alignSelf: 'center',
  },
  containerTitle: {
    backgroundColor: commons.colorMain70,
    alignSelf: 'flex-start',
    padding: commons.padding5,
    paddingRight: 30,
    borderTopRightRadius: 100,
  },
  textTitle: {
    color: 'white',
    fontSize: commons.fontSize16,
  },
  styleChildren: {
    paddingHorizontal: commons.padding10,
    marginBottom: commons.margin10,
  },
});
