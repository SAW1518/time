//@flow
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {View, StatusBar} from 'react-native';
import color from './utils/common/ColorsCommon';

//signIn
import MineScreen from './screens/MineScreen';
import NewClockRegisterScreen from './screens/NewClockRegisterScreen';
import NoteViewScreen from './screens/NoteViewScreen';
import NewAcionScreen from './screens/NewAcionScreen';

export const Navigator = createStackNavigator({
  //Mine
  Mine: {screen: MineScreen},
  NewClockRegister: {screen: NewClockRegisterScreen},
  NoteView: {screen: NoteViewScreen},
  NewAcion: {screen: NewAcionScreen},
});

const App = createAppContainer(Navigator);

const AppNavigator = () => (
  <View style={{flex: 1, backgroundColor: color.dark}}>
    <StatusBar
      tintColor="#ef5350"
      backgroundColor={'transparent'}
      translucent
    />
    <App />
  </View>
);

export default AppNavigator;
