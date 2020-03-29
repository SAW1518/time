//@flow
import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import color from '../utils/common/ColorsCommon';
import {height, width} from 'react-native-dimension';
import {Body, Button, Fab, Header, Icon, Title} from 'native-base';
import AcionComponent from '../components/AcionComponent';
import {goAndNavigateTowParams} from '../NavigationUtil';
import CacheUtil from '../utils/cache/CacheUtil';
type AcionScreenScreenProps = {
  navigation: any,
};
type AcionScreenScreenState = {};

class AcionScreen extends Component<
  AcionScreenScreenProps,
  AcionScreenScreenState,
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    ListAcions: [],
  };

  UNSAFE_componentWillMount(): void {
    CacheUtil.getListAcions().then(list => {
      if (list !== null) {
        console.log('CacheUtil', JSON.parse(list));
        this.setState({
          ListAcions: JSON.parse(list),
        });
      }
    });
  }

  render() {
    return this._renderEmpty();
  }
  _renderEmpty = () => (
    <SafeAreaView
      style={{flex: 1, marginTop: height(3), backgroundColor: color.dark}}>
      <Header
        androidStatusBarColor={color.dark}
        style={{backgroundColor: color.dark}}>
        <Body>
          <Title style={{marginVertical: height(3)}}> Lista de Aciones</Title>
        </Body>
      </Header>
      {this._renderList()}
      <Fab
        active={this.state.active}
        direction="up"
        onPress={() =>
          goAndNavigateTowParams(this.props.navigation, 'NewAcion', {})
        }
        style={{backgroundColor: color.greenLime}}
        position="bottomRight">
        <Icon type="Feather" name="plus" style={{color: color.white}} />
      </Fab>
    </SafeAreaView>
  );

  _renderList = () => {
    return (
      <View
        style={{
          width: width(100),
          height: height(78),
          alignItems: 'center',
          padding: height(1),
          backgroundColor: color.white,
          borderRadius: width(3),
        }}>
        <ScrollView style={{width: '100%', height: '89%'}}>
          {this.state.ListAcions.map((item, key) => {
            return (
              <View key={key}>
                {
                  <AcionComponent
                    title={item.titulo}
                    description={item.descripcion}
                  />
                }
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };
}

export default AcionScreen;
