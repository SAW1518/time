//@flow
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {height, width} from 'react-native-dimension';
import color from '../utils/common/ColorsCommon';
import CacheUtil from '../utils/cache/CacheUtil';
type AcionComponentProps = {
  title: string,
  description: string,
};
type AcionComponentState = {};

class AcionComponent extends Component<
  AcionComponentProps,
  AcionComponentState,
> {
  state = {};

  UNSAFE_componentWillMount(): void {

  }

  componentDidMount() {}

  render() {
    const {title, description} = this.props;
    return (
      <View
        style={{
          height: height(10),
          width: width(95),
          backgroundColor: color.gray_ph,
          borderRadius: width(3),
      }}>
        <View
          style={{
            width: '75%',
            height: '100%',
            padding: '2%',
          }}>
          <Text style={{color: color.dark, fontWeight: 'bold', fontSize: 16}}>
            {title}
          </Text>
          <Text style={{color: color.dark, fontWeight: 'bold', fontSize: 14}}>
            {description}
          </Text>
        </View>
      </View>
    );
  }
};


export default AcionComponent;
