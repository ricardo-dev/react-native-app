import React, {Component} from 'react';
import {StyleSheet, Text, TextInput,TouchableOpacity, ImageBackground,Image,FlatList,View, Alert, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class ListaCategoriaContent extends Component{

    static navigationOptions = {
        header:null,
        tabBarIcon: ({tintColor}) => (
            <Icon name="th-large" size={20}
            style={{color:tintColor}}/>
          )
    }

    state = {
        categoriasGlobal: [
            {
                id:1,
                imagem:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/Carrinho-Supermercado.jpg',
                categoria:'Supermercado',
            },
            {
              id:2,
              imagem:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/acougue-original.jpg',
              categoria:'Açouque',
          },
          {
              id:3,
              imagem:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/850_400_comprar-roupa-online_1510143822.jpg',
              categoria:'Roupas',
          },
          {
              id:4,
              imagem:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/carro-em-manutencao.jpg',
              categoria:'Oficina',
          },
          {
              id:5,
              imagem:'https://s3.amazonaws.com/imagem-ilumino-comercio/categorias/yescert_certificacao-de-brinquedos-importar.jpg',
              categoria:'Brinquedos',
          },
        ],

        categorias : [],

        palavraChave:'',
        empty:false,
    }

    componentDidMount(){
        this.setState({categorias: this.state.categoriasGlobal});
    }

      buscarPorCategoria = (item) => {
          Alert.alert('new '+item.categoria);
      }

      searchCategoria = (text) => {
            if(text.length === 0)
                this.setState({categorias: this.state.categoriasGlobal});
            else{
                const newCategoria = this.state.categoriasGlobal.filter(
                    (item) => {
                      const itemData = item.categoria ? item.categoria.toUpperCase() : ''.toUpperCase();
                      const textData = text.toUpperCase();
                      return itemData.indexOf(textData) > -1;  
                    });
                this.setState({categorias: newCategoria});
            }
            this.setState({palavraChave: text});
      }

      renderItem = ({item})=>{
        return(
        <TouchableOpacity
            onPress={()=>this.buscarPorCategoria(item)
            }>
            <View style={{
                backgroundColor:'#fff',
                borderColor:'#ddd',
                borderWidth:1,
                marginBottom:20,
                height:130,
            }}>
                <ImageBackground style={{
                    //flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width:'100%',
                    height:'100%',
                }}
    
                source={{uri:item.imagem}}>
                    <View style={{
                        backgroundColor:'rgba(0,0,0,0.8)',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            color:'#fff',
                            fontWeight:'bold',
                            fontSize:22,
                        }}>{item.categoria}</Text>
                    </View>
                </ImageBackground>
            </View>
            </TouchableOpacity>
        );
      }

    render(){
        return(
            <View style={{
                flex:1, backgroundColor:'transparent',
            }}>
            {/*<ImageBackground style={{width:'100%', height:'100%'}} source={require('../assets/bg/BG.png')}>*/}
                <View style={{
                      marginTop:20,
                      flexDirection:'row',
                      marginHorizontal:20,
                      marginBottom:15,
                      backgroundColor:'#fff', borderRadius:30,
                      borderWidth:1, borderColor:'#ddd',
                      height:42,
                      alignItems:'center',
                    }}>
                    <TextInput style={{
                        justifyContent:'flex-start',
                        paddingHorizontal:15,
                        alignSelf:'stretch', flex:2,
                    }} 
                    placeholder="Qual categoria está procurando?"
                    onChangeText={(text) => this.searchCategoria(text)}
                    //returnKeyType='send'
                    //onSubmitEditing={this.buscarCategoria}
                    />

                    <Icon name="search" size={20} color='#15a1f8'
                        style={{
                            alignItems:'center', marginRight:20,
                    }}/>

                </View>
                {
                    this.state.categorias.length === 0 &&
                    <Text style={{
                        marginHorizontal:20,
                        marginTop:10,
                    }}>Desculpe, nada foi encontrado!</Text>
                }
                {
                    this.state.categorias.length !== 0 &&
                    <FlatList
                        contentContainerStyle={{
                            padding:25,
                            backgroundColor:'transparent',
                        }}
                        data={this.state.categorias}
                        keyExtractor={item => item.id.toString()} // Add toString()
                        renderItem={this.renderItem}
                    />
                }
                {/*</ImageBackground>*/}
             </View>
        );
    }
}