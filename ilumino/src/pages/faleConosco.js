import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, Platform,TouchableOpacity, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content} from 'native-base';

export default class FaleConosco extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  render() {
    return (

      <Container>
        <ImageBackground style={{width:'100%', height:'100%'}} source={require('../assets/bg/BG.png')}>
        <View style={{
          height: 80,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
          }}>
            <TouchableOpacity
              style={{ marginLeft: 20, }}
              onPress={this.Voltar}
              hitSlop={{ bottom: 15, top: 15, right: 15, left: 15 }}>
              <Icon name='angle-left' size={30} color='#fff' />
            </TouchableOpacity>
          </View>
          <View style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            alignItems: 'center',
            paddingTop: 13,
          }}>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>iLúmino</Text>
          </View>
          <View style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          </View>

        </View>
        <Content style={{
          backgroundColor:'transparent',
        }}>
            <View style={{
            flex:1,
            backgroundColor:'transparent',
          }}>
            
          <View style={{
            backgroundColor:'#fff',
            borderColor:'#ddd',
            borderWidth:0.8,
            marginHorizontal:20,
            marginTop:40,
          }}>

            <View style={{
              alignItems:'center',
              justifyContent:'center',
            }}>
                <Text style={{
                  marginTop:10,
                  fontSize:22,
                  color:'#000',
                }}>Fale Conosco</Text>
            </View>

            <View style={{
              marginTop:30,
              marginHorizontal:10,
              marginBottom:30,
            }}>

              <Text>Lorem ipsum dolor</Text>

              <Text style={{
                  marginTop:5,
              }}>Contato: (xx) xxxxx-xxxx</Text>
              <Text style={{
                  marginTop:5,
              }}>Contato: (xx) xxxxx-xxxx</Text>
              <Text style={{
                  marginTop:5,
              }}>Contato: (xx) xxxxx-xxxx</Text>
              <Text style={{
                  marginTop:5,
              }}>email  : deomnia@deomnia.com</Text>
              <Text style={{
                  marginTop:5,
              }}>Site   : www.deomnia.com.br</Text>

            </View>

          </View>

          </View>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  androidHeader:{
    ...Platform.select({
      android:{
        backgroundColor:'#15a1f8',
        //elevation:5,
      },
      ios:{
        backgroundColor:'#15a1f8'
      }
    })
  }
});