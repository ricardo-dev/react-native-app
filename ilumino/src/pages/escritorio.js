import React, {Component} from 'react';
import {StyleSheet,Alert,Text, View, AsyncStorage, ScrollView, FlatList, Image, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'native-base';
import api from '../services/api';

export default class Escritorio extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='briefcase' size={20}
      style={{color: tintColor}}></Icon>
    )
  };

  state = {
    activeIndex:0,
    id:0,
    dataEstabelecimento:[
     /* {
        id:1,
        nome:'supermercado A',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },
      {
        id:2,
        nome:'supermercado B',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },
      {
        id:3,
        nome:'supermercado C',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },
      {
        id:4,
        nome:'supermercado A',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },
      {
        id:5,
        nome:'supermercado B',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },
      {
        id:6,
        nome:'supermercado C',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },
      {
        id:7,
        nome:'supermercado A',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },
      {
        id:8,
        nome:'supermercado B',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },
      {
        id:9,
        nome:'supermercado C',
        foto:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
      },*/
    ],
    dataSubColaborador:[
      /*{
        id:1,
        nome:'Joaozinho',
        foto:"https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png",
      },
      {
        id:2,
        nome:'Marcos',
        foto:"https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png",
      },*/
    ]
  }

  capturarSubColaboradores = async (id)=> {
    //const id = this.state.id;
    const response = await api.get(
      `/api/colaborador/colaborador-subcolaborador/${id}`,
      Headers={
        "Content-Type":"application/json",
      }
    );
    if(response.ok){
      this.setState({dataSubColaborador:response.data.data});
    }else{

    }
  }

  capturarEstabelecimentos = async (id) => {
    //Alert.alert('Ha!');
    const response = await api.get(
      `/api/estabelecimento/listar-por-colaborador-id/${id}`,
      Headers={
        "Content-Type":"application/json",
      }
    );
    if(response.ok){
      this.setState({dataEstabelecimento: response.data.data});
    }else{

    }
  }

  
  async componentDidMount(){
    const id = await AsyncStorage.getItem('@iLuminoApi:id');
    if(id){
      this.setState({id:id});
      this.capturarSubColaboradores(id);
      this.capturarEstabelecimentos(id);
    }
  }

  renderItemEstabelecimento = ({item}) => (
    <View style={{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      marginBottom:10,
    }}>

      <Image style={{
        width:50, height:50, borderColor:'#d2d2d2', borderWidth:1
      }}
      source={{uri:item.fotoPath}} />
      <Text style={{
         marginLeft:10,
         fontSize:18,
         color:'#fff'
      }}>{item.nomeEstabelecimento}</Text>

    </View>
  );

  renderItemSubcolaborador = ({item}) => (
    <View style={{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      marginBottom:10,
    }}>

      <Image style={{
        width:50, height:50, borderColor:'#d2d2d2', borderWidth:1, borderRadius:100,
      }}
      source={{uri:item.fotoPath}} />
      <Text style={{
         marginLeft:10,
         fontSize:18,
         color:'#fff'
      }}>{item.nome}</Text>

    </View>
  );

  update = async ()=>{
    //Alert.alert('update!');
    const id = this.state.id;
    this.capturarSubColaboradores(id);
    this.capturarEstabelecimentos(id);
  }

  renderSectionOne = ()=>{
    return(
    <View style={{paddingBottom:150}}>
      <FlatList
        contentContainerStyle={{padding:25, marginBottom:80}}
        data={this.state.dataEstabelecimento}
        keyExtractor={item => item.id.toString()} // Add toString()
        renderItem={this.renderItemEstabelecimento}
      />
    </View>
    );
  }

  renderSectionTwo = ()=>{
    return(
      <View style={{paddingBottom:150}}>
      <FlatList
        contentContainerStyle={{padding:25, marginBottom:80}}
        data={this.state.dataSubColaborador}
        keyExtractor={item => item.id.toString()} // Add toString()
        renderItem={this.renderItemSubcolaborador}
      />
    </View>
    );
  }

  renderSection = ()=> {
    if(this.state.activeIndex == 0){
      return(
        <View>
          {this.renderSectionOne()}
        </View>
      );
    } else if(this.state.activeIndex == 1){
      return(
        <View>
          {this.renderSectionTwo()}
        </View>
      );
    }
  }

  segmentCliked = (value) => {
    this.setState({activeIndex:value});
  }

  render() {
    return (
      <View style={{
        flex:1,
        backgroundColor:'transparent',
        //paddingBottom:100,
      }}>
      <ImageBackground style={{width:'100%', height:'100%'}} source={require('../assets/bg/BG.png')}>
      <View style={{
        marginTop:20,
        marginBottom:20,
      }}>

        <View style={{
          flexDirection:'row',
          alignItems:'center',
        }}>
          <Text style={{
            fontWeight:'bold',
            fontSize:22,
            marginLeft:20,
            flex:4,
            color:'#fff'
          }}>Meu ID: {this.state.id}</Text>

          <TouchableOpacity style={{
            justifyContent:'center',
            marginRight:20,
          }}
          onPress={
            this.update
          }
          hitSlop={{top:20, bottom:20, right:20, bottom:20,}}>
            <Icon name='refresh' size={20} color={'#fff'}/>
          </TouchableOpacity>
        </View>

      </View>
      <View style={{
        paddingTop:10,
        paddingButtom:10,
        flexDirection:'row',
        justifyContent:'space-around',
        borderTopWidth:1, borderTopColor:'#d2d2d2'
      }}>
        <Button transparent 
          onPress={()=>this.segmentCliked(0)}
          active={this.state.activeIndex == 0}>
         <Text style={[
           this.state.activeIndex == 0 ? {
            fontSize:16, color:'#fff'
           }:{
            fontSize:16, color:'#e9e9e9'
           }
         ]}>Estabelecimentos</Text>
        </Button>
        <Button transparent
          onPress={()=>this.segmentCliked(1)}
          active={this.state.activeIndex == 1} >
          <Text style={[
            this.state.activeIndex == 1?{
              fontSize:16, color:'#fff'
            }:{fontSize:16,color:'#e9e9e9' }
          ]}>Subcolaboradores</Text>
        </Button>
      </View>
      {this.renderSection()}
      </ImageBackground>
      </View>
    );
  }
}


