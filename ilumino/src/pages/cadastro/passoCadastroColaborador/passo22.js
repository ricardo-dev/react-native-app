import React, {Component} from 'react';
import {StyleSheet, Text, TextInput,ScrollView, Platform,TouchableOpacity, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content} from 'native-base';

export default class Passo22 extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  nextPass = ()=> {
      const {pais, estado, cidade, bairro, endereco, cep, numero, complemento, idColaborador} = this.props.navigation.state.params.data;
      const {sexo, nacionalidade} = this.state;
      this.props.navigation.navigate('Passo23',{data:{
        pais, estado, cidade, bairro, endereco, cep, numero, complemento, sexo, nacionalidade, idColaborador
      }});
  }

  state = {
    sexo:'O',
    nacionalidade:'',
    sexoF:false,
    sexoM:false,
    sexoO:true,
  }

  selectSexoF = () => {
    this.setState({
      sexo:"F",
      sexoF:true,
      sexoM:false,
      sexoO:false,
    })
  }

  selectSexoM = () => {
    this.setState({
      sexo:"M",
      sexoF:false,
      sexoM:true,
      sexoO:false,
    })
  }

  selectSexoO = () => {
    this.setState({
      sexo:"O",
      sexoF:false,
      sexoM:false,
      sexoO:true,
    })
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
            height:30, width:30, borderRadius:100, backgroundColor:'#15a1f8'
          }}>
            <Text style={{color:'#fff',fontWeight:'bold'}}>2</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>3</Text>
          </View>

        </View>

        <View style={{
          marginTop:20,
          backgroundColor:'#fff',
          borderColor:'#d2d2d2',
          borderWidth:0.8,
          marginHorizontal:20
        }}>

        <View style={{
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Text style={{
            color:'#000',
            fontSize:22,
            marginTop:10,
          }}>Qual a sua nacionalidade?</Text>
        </View>

        <TextInput style={{
          marginBottom:30,
          marginTop:10,
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20
        }}
        placeholder="Nacionalidade (Opcional)"
        onChangeText={(text)=>{
          this.setState({nacionalidade:text})
        }}
        value={this.state.nacionalidade}/>

        </View>

        <View style={{
          marginTop:20,
          backgroundColor:'#fff',
          borderColor:'#d2d2d2',
          borderWidth:0.8,
          marginHorizontal:20
        }}>

        <View style={{
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Text style={{
                      color:'#000',
                      fontSize:22,
                      marginTop:10,
                    }}>Qual o seu sexo?</Text>
        </View>

        <View style={{
          marginTop:20,
          flexDirection:'row',
          marginBottom:30,
          justifyContent:'space-around',
          marginHorizontal:20,
        }}>
          <TouchableOpacity style={[this.state.sexoF ? {
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#15a1f8',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }:{
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#d2d2d2',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }]}
          onPress={
            this.selectSexoF
          }>
            <Text style={[this.state.sexoF ? {
              color:'#15a1f8',
              fontSize:18,
            }:{
              color:'#d2d2d2',
              fontSize:18
            }]}>Fem</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[this.state.sexoM ? {
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#15a1f8',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }:{
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#d2d2d2',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }]}
          onPress={
            this.selectSexoM
          }>
            <Text style={[this.state.sexoM ? {
              color:'#15a1f8',
              fontSize:18,
            }:{
              color:'#d2d2d2',
              fontSize:18
            }]}>Masc</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[this.state.sexoO ? {
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#15a1f8',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }:{
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#d2d2d2',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }]}
           onPress={
            this.selectSexoO
          }>
            <Text style={[this.state.sexoO ? {
              color:'#15a1f8',
              fontSize:18,
            }:{
              color:'#d2d2d2',
              fontSize:18
            }]}>Outro</Text>
          </TouchableOpacity>
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