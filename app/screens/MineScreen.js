import React, {Component} from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import FooterTabs from '../components/FooterTabs';
import {height, width} from 'react-native-dimension';
import ClockScreen from './ClockScreen';
import AcionScreen from './AcionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

type MineScreenProps = {
  navigation: any,
};
type MineScreenState = {
  selectedFooterIndex: number,
};

class MineScreen extends Component<MineScreenProps, MineScreenState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    selectedFooterIndex: 0,
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: height(10),
          width: width(100),
        }}>
        <View
          style={{
            height: height(90),
          }}>
          {this._renderContent()}
        </View>

        <FooterTabs
          containerStyle={{
            borderTopLeftRadius: width(10),
            borderTopRightRadius: width(10),
            height: height(10),
          }}
          selectionHandler={selectedFooterIndex => {
            const selectionIndex = selectedFooterIndex;
            this.setState({selectedFooterIndex: selectionIndex});
          }}
          selectedIndex={this.state.selectedFooterIndex}
        />
      </View>
    );
  }

  _renderContent = () => {
    switch (this.state.selectedFooterIndex) {
      case 0:
        return <ClockScreen navigation={this.props.navigation} />;
      case 1:
        return <AcionScreen navigation={this.props.navigation} />;
      case 2:
        return <SettingsScreen navigation={this.props.navigation} />;
      case 3:
        return <ProfileScreen navigation={this.props.navigation} />;
      default:
        break;
    }
  };
}

export default MineScreen;
