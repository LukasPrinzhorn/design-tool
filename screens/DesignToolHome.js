import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { designToolConfig } from '../configs/designConfigs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
});

const Tabs = createBottomTabNavigator();

const keyCreator = (item) => (`${item.toString}`);

export const DesignToolHomeScreen = () => (
  <View style={styles.container}>
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          designToolConfig.forEach((config) => {
            if (route.name === config.name) {
              iconName = focused ? config.iconFocused : config.iconUnfocused;
            }
          });
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        style: {
          height: 50,
          // backgroundColor: 'rgba(52, 52, 255, 0.8)',
          backgroundColor: '#6E95AD',
        },
      }}
    >
      { designToolConfig.map((config) => (<Tabs.Screen key={keyCreator(config)} name={config.name} component={config.component} options={{ title: `${config.title}` }} />))}
    </Tabs.Navigator>
  </View>
);
