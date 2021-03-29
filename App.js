import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomeScreen from './screens/Home';
import { DesignToolHomeScreen } from './screens/DesignToolHome';
import Configuration from './screens/Configuration';
import AccordionScreen from './screens/AccordionScreen';
import SwipeTool from './screens/SwipeTool';
import store from './redux/store';
import {
  HOME, DESIGN_TOOL_HOME, CONFIGURATION, ACCORDION, SWIPE_TOOL,
} from './configs';

export default function App() {
  const AuthStack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name={HOME.name} component={HomeScreen} />
          <AuthStack.Screen name={DESIGN_TOOL_HOME.name} component={DesignToolHomeScreen} options={{ title: 'Design Tool Home' }} />
          <AuthStack.Screen name={CONFIGURATION.name} component={Configuration} />
          <AuthStack.Screen name={ACCORDION.name} component={AccordionScreen} />
          <AuthStack.Screen name={SWIPE_TOOL.name} component={SwipeTool} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
