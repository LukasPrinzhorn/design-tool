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

function DesignToolHomeScreen() {
  return (
    <View style={styles.container}>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/prop-types
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
            backgroundColor: '#6E95AD',
          },
        }}
      >
        { designToolConfig.map((config) => (<Tabs.Screen key={keyCreator(config)} name={config.name} component={config.component} options={{ title: `${config.title}` }} />))}
      </Tabs.Navigator>
    </View>
  );
}

export default DesignToolHomeScreen;
