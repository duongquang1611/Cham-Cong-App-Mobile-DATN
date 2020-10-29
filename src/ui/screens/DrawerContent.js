import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {Drawer, Title} from 'react-native-paper';

const DrawerContent = (props) => {
  return (
    // <View style={{flex:1}}>
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Drawer.Section style={{}}>
          <Title style={{textAlign: 'center'}}>Bộ lọc tìm kiếm</Title>
        </Drawer.Section>

        {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <IconView
                  name="account-check-outline"
                  color={color}
                  size={size}
                  type={'MaterialCommunityIcons'}
                />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
          </Drawer.Section> */}
        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
        />
        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
        />
        <Drawer.Section title="Hình thức"></Drawer.Section>
      </View>
    </DrawerContentScrollView>
    //   </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
