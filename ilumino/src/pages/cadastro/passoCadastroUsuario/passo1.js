import React, {Component} from 'react';
import {StyleSheet, Text, TextInput,ScrollView, Platform,TouchableOpacity, View, ImageBackground, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content} from 'native-base';
import {TextInputMask} from 'react-native-masked-text';

export default class Passo1 extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  nextPass = ()=> {
      const {nome, sobreNome, cpf, nickname} = this.state;
      if(nome.length === 0 || sobreNome.length === 0 || cpf.length === 0)
        Alert.alert('Erro - campos vazios!');
      else  {
        let Cpf = cpf;
        Cpf = Cpf.replace('.','');
        Cpf = Cpf.replace('.','');
        Cpf = Cpf.replace('-','')
        this.props.navigation.navigate('Passo2',{data:{nome, sobreNome, cpf:Cpf, nickname}});
      }
  }

  state = {
    nome:'',
    sobreNome:'',
    cpf:'',
    nickname:'',
  }

  render() {
    return (

      <Container>
        <ImageBackground style={{width:'100%', height:'100%'}} source={require('../../../assets/bg/BG.png')}>
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

        <ScrollView contentContainerStyle={{
          paddingBottom:50,
        }}>

        <View style={{
          height:60,
          marginTop:10,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          marginHorizontal:20,
        }}>

          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#15a1f8'
          }}>
            <Text style={{color:'#fff', fontWeight:'bold'}}>1</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>2</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>3</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>4</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>5</Text>
          </View>

        </View>

        <View style={{
          backgroundColor:'#fff',
          marginTop:10,
          marginHorizontal:20,
          borderWidth:0.8,
          borderColor:'#d2d2d2',
        }}>
          <View style={{
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Text style={{
              marginTop:10,
              color:'#000',
              fontSize:22,
            }}>Dados para login:</Text>
          </View>
          <TextInput 
            style={{
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              paddingBottom:0,
              marginTop:5,
              marginHorizontal:20,
            }}
            placeholder = "Nome" 
            onChangeText={(text)=>{
              this.setState({nome:text})
            }}
            value={this.state.nome} />

          <TextInput 
            style={{
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              paddingBottom:0,
              marginTop:10,
              marginHorizontal:20,
            }}
            placeholder = "Sobrenome completo" 
            onChangeText={(text)=>{
              this.setState({sobreNome:text})
            }}
            value={this.state.sobreNome}/>

            <TextInputMask 
              style={{
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                paddingBottom:0,
                marginBottom:20,
                marginTop:10,
                marginHorizontal:20,
              }}
              placeholder="CPF"
              onChangeText={(text)=>{
                //text = text.replace('.','');
                //text = text.replace('.','');
                //text = text.replace('-','');
                this.setState({cpf:text})
              }}
              value={this.state.cpf}
              type={'cpf'}
            />

          {/*<TextInput 
            style={{
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              paddingBottom:0,
              marginBottom:20,
              marginTop:10,
              marginHorizontal:20,
            }}
            placeholder = "CPF"
            onChangeText={(text)=>{
              this.setState({cpf:text})
            }}
            value={this.state.cpf}
          keyboardType="phone-pad"/>*/}
        </View>

        <View style={{
          marginTop:10,
          backgroundColor:'#fff',
          marginHorizontal:20,
          borderWidth:0.8,
          borderColor:'#d2d2d2',
        }}>
          <View style={{
            marginTop:10,
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              color:'#d2d2d2',
              fontSize:18,
            }}>Crie um apelido</Text>
            <Text style={{
              color:'#d2d2d2',
              fontSize:20,
            }}>(nickname)</Text>
            <Text style={{
              color:'#d2d2d2',
              fontSize:14,
            }}>O apelido estará visível para todos</Text>
          </View>
          <TextInput 
            style={{
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              paddingBottom:0,
              marginBottom:30,
              marginTop:10,
              marginHorizontal:20,
            }}
            placeholder="Apelido (Opcional)"
            onChangeText={(text)=>{
              this.setState({nickname:text});
            }}
            value={this.state.nickname}/>
        </View>

        
        <TouchableOpacity onPress={this.nextPass} style={{justifyContent:'center', alignItems:'center', borderRadius:20, marginTop:10, marginRight:20, marginLeft:'50%', height:42, backgroundColor:'#68D468'}}>
            <Text style={{color:'#fff'}}>AVANÇAR</Text>
        </TouchableOpacity>
        
        
        </ScrollView>
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