//@flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {StyleBar} from '../utils/common/StylesBarCommon';
import color from '../utils/common/ColorsCommon';
import {height, width} from 'react-native-dimension';
import ButtonComponent from '../components/ButtonComponent';
import {Input, Item, Textarea} from 'native-base';
import Toast from 'react-native-simple-toast';
import CacheUtil from '../utils/cache/CacheUtil';
import {resetAndNavigateTo} from '../NavigationUtil';
type NewAcionScreenProps = {
  navigation: any,
};
type NewAcionScreenState = {};

class NewAcionScreen extends Component<
  NewAcionScreenProps,
  NewAcionScreenState,
> {
  static navigationOptions = ({navigation}) => {
    return {
      ...StyleBar,
      headerTitle: (
        <View
          style={{
            backgroundColor: color.gray_ph,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text
            style={{color: color.gray, fontSize: 21, paddingHorizontal: 16}}>
            {'Nueva Acion'}
          </Text>
        </View>
      ),
    };
  };

  state = {
    titulo: '',
    descripcion: '',
    listAcions: [],
  };

  UNSAFE_componentWillMount(): void {
    CacheUtil.getListAcions().then(List => {
      if (List !== null) {
        this.setState({
          listAcions: JSON.parse(List),
        });
      } else {
        console.log('NO List Cahe');
      }
    });
  }

  componentDidMount() {};

  listExit = [];
  setList = () => {
    this.listExit = this.state.listAcions;
    console.log(this.state);
    let newItem = {
      id: this.getLastId(this.listExit) + 1,
      titulo: 'none',
      descripcion: 'none',
    };
    newItem.titulo = this.state.titulo;
    newItem.descripcion = this.state.descripcion;
    this.listExit.push(newItem);
    console.log('listExit', this.listExit);
    console.log('last id', newItem);
    CacheUtil.setListAcions(JSON.stringify(this.listExit));
  };
  getLastId = List => {
    let id = 0;
    List.map(Item => {
      if (Item.id >= id) {
        id = Item.id;
      }
    });
    return id;
  };

  validation = () => {
    console.log('state', this.state);
    if (this.state.titulo != '') {
      if (this.state.descripcion != '') {
        this.setList();
        resetAndNavigateTo(this.props.navigation, 'Mine');
      } else {
        Toast.showWithGravity(
          'Introduzca Descripcion',
          Toast.LONG,
          Toast.BOTTOM,
        );
      }
    } else {
      Toast.showWithGravity(
        'Introduzca Tilulo',
        Toast.LONG,
        Toast.BOTTOM,
      );
    }
  };

  render() {
    const {mainView} = styles;
    return (
      <View style={mainView}>
        {this._renderCard()}
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <ButtonComponent
            backgroundColor={color.red}
            title={'Cancelar'}
            width={width(40)}
          />
          <View style={{height: '100%', width: '10%'}} />
          <ButtonComponent
            backgroundColor={color.greenLight}
            title={'Crear'}
            onPress={() => this.validation()}
            width={width(40)}
          />
        </View>
      </View>
    );
  }
  _renderCard = () => {
    return (
      <View
        style={{
          width: width(90),
          height: height(70),
          alignItems: 'center',
          padding: height(1),
          backgroundColor: color.white,
          marginTop: height(1),
          borderRadius: width(3),
          marginBottom: height(2),
        }}>
        <View
          style={{
            backgroundColor: color.dark,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text
            style={{color: color.white, fontSize: 21, paddingHorizontal: 16}}>
            {'Datos Acion'}
          </Text>
        </View>
        <ScrollView>{this._renderForm()}</ScrollView>
      </View>
    );
  };

  _renderForm = () => {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View
          style={{
            width: width(80),
          }}>
          <Text
            style={{
              marginTop: height(2),
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            {'Titulo:'}
          </Text>
          <Item style={{width: '95%'}} regular>
            <Input
              onChangeText={titulo => this.setState({titulo})}
              value={this.state.titulo}
            />
          </Item>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            {'Descripcion:'}
          </Text>
          <Textarea
            onChangeText={descripcion => this.setState({descripcion})}
            value={this.state.descripcion}
            style={{width: '95%'}}
            rowSpan={10}
            bordered
          />
        </View>
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: color.dark,
  },
});

export default NewAcionScreen;
