import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, Platform, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Content, Header, Left, Body, Right} from 'native-base';

export default class EditarColaboradorP2 extends Component {

  static navigationOptions = {
    header:null,
  }

  componentDidMount(){
    const dados = this.props.navigation.state.params.dados;
    
    this.setState({
      id:dados.id,
      sexo:dados.sexo,
      nacionalidade:dados.nacionalidade,
      fotoPath:dados.fotoPath,
      endereco:dados.endereco,
    })
  }

  state = {
    id:0,
    sexo:'',
    nacionalidade:'',
    dataNascimento:'',
    fotoPath:'',
    endereco:{},
  }

  voltar = ()=>{
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <Header style={styles.androidHeader} 
          androidStatusBarColor="#15A1F8" iosBarStyle="light-content">
          <Left style={{flex:1, marginRight:2}}>
            <TouchableOpacity onPress={this.voltar} hitSlop={{top:20, bottom:20, right:20, left:20}}><Icon name='angle-left' color='white' size={30}
              onPress={
                  this.voltar
              }></Icon></TouchableOpacity>
          </Left>
          <Body style={{flex:2}}>
            <Text style={{
              fontSize:20,
              fontWeight:'bold',
              color:'white'
            }}>iLúmino</Text>
          </Body>

        </Header>
        <Content style={{
          backgroundColor:'#f2f2f2',
          flex:1,
        }}>
        <ScrollView style={{
          marginBottom:20,
        }}>
          <View style={{
            marginHorizontal:20,
          }}>
            <Text style={{
              marginTop:20,
              fontSize:40,
              color:'#000'
            }}>Qual</Text>
            <Text style={{
              fontSize:40,
              color:'#000'
            }}>Informação você</Text>
            <Text style={{
              fontSize:40,
              color:'#000'
            }}>Quer editar?</Text>
          </View>
        <View style={{
        }}>
          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:20,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            backgroundColor:'#f2f2f2',
            justifyContent:'center',
          }}>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Endereço</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:10,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            backgroundColor:'#f2f2f2',
            justifyContent:'center',
          }}>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Data de nascimento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:10,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            backgroundColor:'#f2f2f2',
            justifyContent:'center',
          }}>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Sexo e nacionalidade</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:10,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            backgroundColor:'#f2f2f2',
            justifyContent:'center',
          }}>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Foto</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{
          backgroundColor:'#15a1f8',
          borderRadius:40,
          marginHorizontal:20,
          marginTop:20,
          alignItems:'center',
          justifyContent:'center',
          height:42,
        }}
        onPress={
          this.voltar
        }>
            <Text style={{
              fontSize:18,
              color:'#fff'
            }}>CONCLUIR EDIÇÃO</Text>
        </TouchableOpacity>

        </ScrollView>
        </Content>
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
  androidHeader: { 
    ...Platform.select({ 
    android: { 
      //marginTop: StatusBar.currentHeight,
      //StatusBarsetBackgroundColor("#D3D3D3"),
      //StatusBarsetBarStyle("dark-content"),
      backgroundColor: '#15A1F8',
      //StatusBarColor
      //StatusBar
     } 
    }) },
  androidHeaderTitle: { 
    ...Platform.select({ 
      android: { 
        alignItems: 'flex-end',
        //textAlign: 'center',
        //flex: 1
       } 
      }) 
  },
});