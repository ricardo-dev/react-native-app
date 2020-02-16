import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MoedaContent extends Component {


  redirecionarReceber = ()=>{
    //Alert.alert('Receber')
    this.props.navigation.navigate('FinanceiroReceber');
  }

  redirecionarTransferir = ()=>{
    //Alert.alert('Transferir')
    this.props.navigation.navigate('FinanceiroTransferir');
  }

  redirecionarSolicitar = () => {
    this.props.navigation.navigate('FinanceiroResgate');
    //Alert.alert('Solicitar')
  }

  redirecionarComprar = () => {
    //Alert.alert('Comprar')
    this.props.navigation.navigate('FinanceiroCompra');
  }

  redirecionarHistorico = () => {
    //Alert.alert('Historico')
    this.props.navigation.navigate('FinanceiroMovimentacao');
  }

  render() {
    return (
      <View style={{
        flex:1,
        //backgroundColor:'#1783E6'
        backgroundColor:'transparent',
      }}>
      {/*<ImageBackground style={{flex:1, width:'100%', height:'100%'}} source={require('../assets/bg/BG.png')}>*/}
        <View style={{ height: 80, backgroundColor: 'transparent',}}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:15, marginRight:0, marginLeft:5}}>
                 <View style={{flex:1, alignItems:'center'}}>
                   <Text style={{color:'white', fontSize:10, fontWeight:'bold'}}>SEU SALDO ILÙMINO</Text>
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
           backgroundColor:'transparent', borderTopColor: '#fff', borderTopWidth:0.8,
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
            borderColor:'#fff',
            borderWidth:0.5,
          }}
           onPress={
             this.redirecionarSolicitar
           }>
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
            borderColor:'#fff',
            borderWidth:0.5,
          }}
          onPress={
            this.redirecionarComprar
          }>
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
            borderColor:'#fff',
            borderWidth:0.5,
          }}
          onPress={
            this.redirecionarHistorico
          }>
            <Text style={{
              color:'#fff',
              fontSize:16
            }}>Historico de movimentações</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        {/*</ImageBackground>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
