import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, Platform, ImageBackground} from 'react-native';
import {Container, Content, Header, Left, Right, Body, Drawer} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListaCategoriaContent from './listaCategoriaContent';

export default class ListaCategoriaContentMainUser extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
          <Icon name="th-large" size={20}
          style={{color: tintColor}}></Icon>
        )
      };

      render(){
          return(
            <Container>
            <ImageBackground source={require('../assets/bg/BG.png')} style={{width:'100%', height:'100%'}}>
            {/*<Header style={styles.androidHeader} androidStatusBarColor="#15a1f8" iosBarStyle="light-content">
            <Left style={{flex:1, marginRight:2}}>
                  <TouchableOpacity onPress={this.menuTela} hitSlop={{top:20, bottom:20, right:20, left:20}}><Icon name='navicon' color='white' size={23} onPress={
                    this.menuTela
                  }></Icon></TouchableOpacity>
                </Left>
                <Body style={{flex:1}}>
                  <Text style={{
                    fontSize:20,
                    fontWeight:'bold',
                    color:'white'
                  }}>iLúmino</Text>
                </Body>
                <Right style={{flex:1}}>
                  <TouchableOpacity onPress={this.logoutTela} hitSlop={{top:20, bottom:20, right:20, left:20}} ><Icon name="sign-out" color="white" size={23} onPress={
                    this.logoutTela
                  }></Icon></TouchableOpacity>
                </Right>
                </Header>*/}
            <ListaCategoriaContent navigation={this.props.navigation} />
            </ImageBackground>
          </Container>
          );
      }


}