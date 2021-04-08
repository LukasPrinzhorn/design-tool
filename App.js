import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HOME } from './configs';
import { homeConfig } from './configs/homeConfigs';

export default function App() {
  const AuthStack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={HOME.name}
            title={HOME.title}
            component={HOME.component}
            options={{ title: HOME.title }}
          />
          {homeConfig.map((element) => (
            <AuthStack.Screen
              name={element.name}
              title={element.title}
              component={element.component}
              options={{ title: element.title }}
            />
          ))}
        </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
