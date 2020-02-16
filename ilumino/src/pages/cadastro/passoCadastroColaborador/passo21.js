import React, {Component} from 'react';
import {StyleSheet, Text, TextInput,ScrollView, Platform,TouchableOpacity, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content} from 'native-base';

export default class Passo21 extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  nextPass = ()=> {
      const {idColaborador} = this.props.navigation.state.params.data;
      const {pais, estado, cidade, bairro, endereco, cep, numero, complemento} = this.state;
      this.props.navigation.navigate('Passo22',{data:{
        pais, estado, cidade, bairro, endereco, cep, numero, complemento, idColaborador
      }});
  }

  state = {
    pais:'Brasil',
    estado:'Goiás',
    cidade:'',
    bairro:'',
    endereco:'',
    cep:'',
    numero:'',
    complemento:'',
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

        </View>


        <View style={{
          backgroundColor:'#fff',
          marginHorizontal:20,
          borderColor:'#d2d2d2',
          borderWidth:0.8,
          marginTop:20,
        }}>

          <View style={{
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              fontSize:22,
              color:'#000',
              marginTop:10
            }}>Informe o teu endereco:</Text>
          </View>

          <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="CEP"
            onChangeText={(text)=>{
              this.setState({cep:text})
              //this.obterDadosViaCep()
            }}
            value={this.state.cep}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="País"
            onChangeText={(text)=>{
              this.setState({pais:text})
            }}
            value={this.state.pais}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="Estado"
            onChangeText={(text)=>{
              this.setState({estado:text})
            }}
            value={this.state.estado}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="Cidade"
            onChangeText={(text)=>{
              this.setState({cidade:text})
            }}
            value={this.state.cidade}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="Bairro"
            onChangeText={(text)=>{
              this.setState({bairro:text})
            }}
            value={this.state.bairro}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="Endereço"
            onChangeText={(text)=>{
              this.setState({endereco:text})
            }}
            value={this.state.endereco}
            />

            <View style={{
              flexDirection:'row',
              marginBottom:30,
            }}>
              <TextInput
              style={{
                flex:1,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                marginHorizontal:20,
                marginTop:10,
              }} 
                    placeholder="Núm. (Opc)"
              onChangeText={(text)=>{
                this.setState({numero:text})
              }}
              value={this.state.numero}
              />

              <TextInput
              style={{
                flex:2,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                marginHorizontal:20,
                marginTop:10,
              }} 
              placeholder="Compl. (Opcional)"
              onChangeText={(text)=>{
                this.setState({complemento:text})
              }}
              value={this.state.complemento}
              />

            </View>
            

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