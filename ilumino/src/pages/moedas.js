import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, Platform, ImageBackground} from 'react-native';
import {Container, Content, Header, Left, Right, Body, Drawer} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MoedaContent from './moedaContent';

export default class Moedas extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='money' size={20}
      style={{color: tintColor}}></Icon>
    )
  };

  logoutTela = ()=> {
    Alert.alert('Sair');
  }

  menuTela = ()=>{
    Alert.alert('Menu');
  }

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
        <MoedaContent navigation={this.props.navigation} />
        </ImageBackground>
      </Container>
    );
  }
  /*
  redirecionarReceber = ()=>{
    Alert.alert('Receber')
  }

  redirecionarTransferir = ()=>{
    Alert.alert('Transferir')
  }

  redirecionarSolicitar = () => {
    Alert.alert('Solicitar')
  }

  redirecionarComprar = () => {
    Alert.alert('Comprar')
  }

  redirecionarHistorico = () => {
    Alert.alert('Historico')
  }

  render() {
    return (
      <View style={{
        flex:1,
        backgroundColor:'#1783E6'
      }}>
        <View style={{ height: 80, backgroundColor: '#1783e6',}}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:15, marginRight:0, marginLeft:5}}>
                 <View style={{flex:1, alignItems:'center'}}>
                   <Text style={{color:'white', fontSize:10, fontWeight:'bold'}}>SEU SALDO ILUMINO</Text>
                   <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:30, color:'white'}}>$</Text>
                    <Text style={{fontSize:30, color:'white'}}>00,00</Text>
                   </View>
                 </View>
                 <View style={{
                   flex:2,
                 }}/>
              </View>
        </View>
        <ScrollView>
        <View style={{
           backgroundColor:'#1783e6', borderTopColor: '#fff', borderTopWidth:0.8,
        }}>
          <View style={{
            marginTop:20,
            marginBottom:20,
            flexDirection:'row',
            justifyContent:'space-around',
          }}>
          <TouchableOpacity onPress={this.redirecionarReceber}>
            <View style={{
              alignItems:'center'
            }}>
              <Icon name='genderless' size={70} color={'#fff'} style={{
                marginBottom:10,
              }}></Icon>
              <Text style={{color:'#fff', fontSize:16}}>Receber</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={
              this.redirecionarTransferir
            }>
            <View style={{
              alignItems:'center'
            }}>
              <Icon name='genderless' size={70} color={'#fff'} style={{
                marginBottom:10,
              }}>
              </Icon>
              <Text style={{color:'#fff', fontSize:16}}>Transferir</Text>
            </View>
            </TouchableOpacity>

          </View>

        </View>

        <View style={{
          borderTopColor:'#e5e5e5',
          borderTopWidth: 0.3,
        }}>
          <TouchableOpacity style={{
            marginBottom:15,
            marginTop:15,
            marginHorizontal:20,
            borderRadius:40,
            backgroundColor:'#68D468',
            justifyContent:'center',
            alignItems:'center',
            height:45,
          }}>
            <Text style={{
              color:'#fff',
              fontSize:16
            }}>Solicitar resgate em Reais (R$)</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          borderTopColor:'#e5e5e5',
          borderTopWidth: 0.3,
        }}>
          <TouchableOpacity style={{
            marginBottom:15,
            marginTop:15,
            marginHorizontal:20,
            borderRadius:40,
            backgroundColor:'#F2C94C',
            justifyContent:'center',
            alignItems:'center',
            height:45,
          }}>
            <Text style={{
              color:'#fff',
              fontSize:16
            }}>Comprar moedas iLúmino</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          borderTopColor:'#e5e5e5',
          borderTopWidth: 0.3,
        }}>
          <TouchableOpacity style={{
            marginBottom:15,
            marginTop:15,
            marginHorizontal:20,
            borderRadius:40,
            backgroundColor:'#15A1F8',
            justifyContent:'center',
            alignItems:'center',
            height:45,
          }}>
            <Text style={{
              color:'#fff',
              fontSize:16
            }}>Historico de movimentações</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
  */
}

const styles = StyleSheet.create({
  androidHeader:{
    ...Platform.select({
      android:{
        backgroundColor:'#15a1f8',
        borderBottomColor:'#fff',
        borderBottomWidth:0.8,
      },
      ios:{
        backgroundColor:'#15a1f8',
        borderBottomColor:'#fff',
        borderBottomWidth:0.8,
      }
    })
  }
});
