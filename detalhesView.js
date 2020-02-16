import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground,ScrollView, Alert, TextInput, TouchableOpacity} from 'react-native';
//import MapView from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//import {Rating} from 'react-native-elements';
//import {MapView} from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
//import MapboxGL from '@mapbox/react-native-mapbox-gl';
//import { Rating, AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';

const STAR_IMG = require('../assets/star.png')
const LOGO_IMG = require('../assets/logo2.png')

export default class DetalheComercio extends Component {

  static navigationOptions = {
    header:null
  };

  state = {
    imagemPrincipal : this.props.navigation.state.params.comercio.imagemPath,
    nomeEstabelecimento : this.props.navigation.state.params.comercio.nomeEstabelecimento,
    //nomeEstabelecimento: 'Supermercado Zé',
    apelido: this.props.navigation.state.params.comercio.apelido,
    /*categoria: [
      {
        tipoCategoria: 'Mercado',
      },{
        tipoCategoria: 'Supermercado',
      },{
        tipoCategoria: 'Comércio',
      }
    ],*/
    categoria:this.props.navigation.state.params.comercio.categoria,
    distancia: this.props.navigation.state.params.comercio.distancia,
    aberto: this.props.navigation.state.params.comercio.aberto,
    promoMoeda: this.props.navigation.state.params.comercio.promoMoeda,
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id tellus non nibh tempus fermentum. Quisque egestas purus at nunc pretium luctus. Nunc luctus sapien ac sollicitudin fermentum. Aenean venenatis, purus ac molestie commodo, erat elit luctus lorem, vel scelerisque lectus ante et sem. Vestibulum id erat in neque efficitur lobortis a a ipsum. ',
    pontos: {
      lat: this.props.navigation.state.params.comercio.latitude,
      lng: this.props.navigation.state.params.comercio.longitude,
    },
    endereco: {
    rua:'Rua Maria de Nazaré', bairro:'Setor Estrela do Sul',cidade:'Senador Canedo',estado:'Goiás', pais:'Brasil',
    },
    pontoReferencia: 'de frente da Mata',
    aglomerado: 'não possui aglomerado',
    horarioFuncionamento: [
      {
        dia:'Domingo',
        horario: 'fechado',
      },
      {
        dia:'Segunda',
        horario: '06:00 - 00:00',
      },
      {
        dia:'Terca',
        horario: '06:00 - 00:00',
      },
      {
        dia:'Quarta',
        horario: '06:00 - 00:00',
      },
      {
        dia:'Quinta',
        horario: '06:00 - 00:00',
      },
      {
        dia:'Sexta',
        horario: '06:00 - 00:00',
      },
      {
        dia:'Sabado',
        horario: '06:00 - 00:00',
      },
    ],
    telefone:[
      {
        numero: '0800-5020', tipo:'Principal'
      },
      {
        numero: '3203-3136', tipo:'Fixo'
      },
      {
        numero: '99112-6893', tipo:'Delivery'
      },
    ],
    email:[
      {
        endereco: 'ricardoengdepc@gmail.com',
      },
      {
        endereco: 'email@gmail.com',
      }
    ],
    webSite: 'www.endereco.com.br/endereco',
    redeSocial: [

    ],
    precoMinimo: 0.00,
    precoMax: 0.00,
    formaPagamento: [

    ],
    moedasiLumino: {
      saldo: 10.00,
      modoEntrega: 'Entrega 1 ao usuário mediante compra minima de R$ 10.00 reais ',
    },
    promocaoDesconto:[

    ],
    comodidade: [

    ],
    palavraChave: [

    ],    // falta dados de comentarios e resultado de avaliacoes
    avaliacao: 2.5,
    comentario: '',
  }

  ratingCompleted(rating){
    //console.log("Rating is: " + rating)
    //Alert.alert('Rating is: '+rating)
    this.setState({avaliacao: rating})
    Alert.alert('Avaliacao: '+rating)
    //<Image source={LOGO_IMG} style={{ width: 50, height:80 }}/> trecho dentro do <Marker></Marker>
  }

  mapStyleRetro=[
    { "elementType": "geometry", "stylers": [ { "color": "#ebe3cd" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#523735" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#c9b2a6" } ] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [ { "color": "#dcd2be" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#ae9e90" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#93817c" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#a5b076" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#447530" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#fdfcf8" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#f8c967" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#e9bc62" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "color": "#e98d58" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [ { "color": "#db8555" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#806b63" } ] }, { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [ { "color": "#8f7d77" } ] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ebe3cd" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#b9d3c2" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#92998d" } ] }
]

  render() {
    return (
      <ScrollView style={{backgroundColor:"#fff"}}>
        <View style={{flex:1}}>
          <ImageBackground  style={{
            height: 250,
          }} 
          source={{uri: this.state.imagemPrincipal}}>

          <TouchableOpacity onPress={
            ()=>{
              this.props.navigation.goBack();
            }
          }
          hitSlop={{top:20, bottom:20, right:20, left:20}}
          style={{
            marginLeft:10,
          }}>
            <Icon name='angle-left' size={50} color={'#15a1f8'}/>
          </TouchableOpacity>
          
          </ImageBackground>
          <Text style={{
            justifyContent:'center',
            fontSize:35,
            color: '#000',
            fontWeight: 'bold',
            marginLeft: 15,
            marginTop: 10,
          }}>
            {this.state.nomeEstabelecimento}
          </Text>
          
          <Text style={{
            marginTop:10,
            marginLeft: 15,
            fontWeight: '100',
            fontSize: 20,
            color:'#000',
          }}>
            "{this.state.apelido}"
          </Text>
          <View style={{
            ...StyleSheet.absoluteFillObject,
            height: 200, width: 200, justifyContent:'flex-end', alignItems:'center', marginTop:20
          }}>
          </View>
          <View style={{
            flexDirection:'row',
            marginTop:10,
            marginLeft:15,
          }}>
            {this.state.categoria.map((value, index) => {
              return(
                <View key={index}>
                  <Text style={{color: 'gray', marginLeft:3, fontSize:12}}>- {value.tipoCategoria}</Text>
                </View>
              )
            })}
          </View>
          <View style={{
            flexDirection:'row',
            marginTop:10,
            marginLeft:15,
            marginBottom: 20,
          }}>
              <Text style={{marginLeft:3, color:"#15a1f8", fontSize:14}}>{this.state.distancia} * </Text>
              <Text style={{marginLeft:3, color:"#15a1f8", fontSize:14}}>{this.state.aberto} * </Text>
              <Text style={{marginLeft:3, color:"#15a1f8", fontSize:14}}>{this.state.promoMoeda}</Text>
          </View>

          <View
            style={{
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
            }}
          />

          <View style={{
            marginLeft:15,
            marginRight: 15,
            marginTop:20,
            marginBottom:5,
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
          }}>
            <Text style={{
              fontWeight:'bold',
              color: '#000',
              marginTop:10,
              fontSize:14
            }}>Descrição</Text>
              <Text style={{
                fontWeight:'100',
                fontSize:14,
                marginTop:10,
              }}>
                {this.state.descricao}
              </Text>
          </View>
              
        <View style={{marginBottom:10}}>
          <View style={{
            marginLeft:15,
            marginRight: 15,
            marginTop:20,
            marginBottom:10,
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
          }}>
          <Text style={{
              fontWeight:'bold',
              color: '#000',
              marginTop:10,
              fontSize:14
            }}>Como Chegar</Text>
          </View>
          <View style={{
            marginTop:10,
            height: 200,
            flex:1
             // *
          }}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex:1}}
            region={{
              latitude: this.state.pontos.lat,
              longitude: this.state.pontos.lng,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009
            }}
            customMapStyle={this.mapStyleRetro}
            showsUserLocation={false}>
              <MapView.Marker
              coordinate={{
                latitude: this.state.pontos.lat,
                longitude: this.state.pontos.lng}}
                title={this.state.nomeEstabelecimento}
                description={this.state.descricao}
            >
              
            </MapView.Marker>
            </MapView>
          </View>
          <View style={{
            marginTop: 15, marginBottom:15,
            marginLeft:15, marginRight:15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom:10
            }}>
            <Text style={{fontWeight:'100', fontSize:14}}>{this.state.endereco.rua} - {this.state.endereco.bairro} - {this.state.endereco.cidade} - {this.state.endereco.estado} - {this.state.endereco.pais}</Text>
          </View>
          <Text style={{fontSize:12}}>* {this.state.pontoReferencia}</Text>
          <Text style={{fontSize:12}}>* {this.state.aglomerado}</Text>
          </View>  
        </View>

        <View style={{
          marginTop:20,
          marginHorizontal: 15,
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
          marginBottom:20
        }}>

          <Text style={{
            fontWeight: 'bold',
            fontSize:14,
            color:'#000',
            marginTop: 10,
            marginBottom:5,
          }}>
            Horario de Funcionamento
          </Text>
          <View style={{
            marginTop: 10,
          }}>
            {this.state.horarioFuncionamento.map((value, index)=>{
              return(<View key={index} style={{
                flexDirection:'row',
                marginTop:10,
              }}>
                <Text style={{fontSize:14, color:'#000'}}>{value.dia}</Text>
                <Text style={{fontSize:14, fontWeight:'100', marginLeft: 20}}>{value.horario}</Text>
              </View>)
            })}
            <Text style={{fontSize:10, color:'gray', marginTop:10}}>* Os horarios são de total responsabilidade do Estabelecimento.</Text>
          </View>

        </View>
        {// Telefones
        }

        <View
          style={{
            backgroundColor:'#15a1f8'
          }}>
          <Text style={{fontSize:14, color:'#fff', marginLeft:15, marginTop:15, fontWeight:'bold'}}>Moedas iLumino</Text>
          <View style={{
            alignItems:'center', justifyContent:'center', marginBottom: 20, marginHorizontal: 15, marginTop:10
          }}>
              <Text style={{color:'#fff'}}>Temos:</Text>
              <Text style={{color:'#fff', fontSize:16, fontWeight:'bold', marginTop:10}}>{this.state.moedasiLumino.saldo} Moeda(s) iLúmino</Text>
              <Text style={{color:'#fff', marginTop:5}}>{this.state.moedasiLumino.modoEntrega}</Text>
          </View>
        </View>
      
      <View style={{
        flex:1, 
        backgroundColor:"#f2f2f2"
        }}>
        {// promocoes e descontos
        }


        <View style={{
            marginTop:20,
            borderTopColor: "#e5e5e5",
            borderTopWidth:1,
            marginLeft: 15, marginRight: 15,
            }}>
            <Text style={{
              marginTop: 20,fontWeight: 'bold', color: '#000', fontSize: 14
            }}>Avaliar e Comentar:</Text>
            <View style={{
              marginTop: 20, borderWidth: 1, borderColor: '#e5e5e5', marginBottom: 20, backgroundColor:'#fff'
            }}>
            <View style={{alignItems:'center', marginTop:10}}>
              <StarRating 
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating = {this.state.avaliacao}
                selectedStar={(rating)=>this.ratingCompleted(rating)}
                fullStarColor={'#15a1f8'}
                starSize={70}/>
            </View>

              <TextInput
                style={{
                  marginLeft:15,
                  marginRight:15,
                  marginTop:10,
                  paddingBottom:0,
                  borderBottomColor:'#d2d2d2',
                  borderBottomWidth:1,
                }}
                placeholder="Nome de usuario aqui..."/>

              <TextInput
              style={{
                marginLeft:10,
                marginRight:10,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:1,
              }}
              placeholder="Seu e-mail aqui..."/>

              <TextInput
              onChangeText={(text)=>{
                  this.setState({comentario:text})
              }}
              style={{
                marginLeft:10,
                marginRight:10,
                marginBottom:20,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:1,
              }}
              placeholder="Escreva comentário aqui.."/>

              <TouchableOpacity
                  onPress={()=>{
                      const nota = this.state.avaliacao;
                      const comentario = this.state.comentario;
                      Alert.alert(`N: ${nota} C: ${comentario}`);
                  }}>
                  <View style={{
                  backgroundColor:'#15A1F8',
                  borderRadius:5,
                  marginVertical:15,
                  marginHorizontal:10,
                  height:50,
                  alignItems:'center',
                  justifyContent:'center',
                  }}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>COMENTAR</Text>
                  </View>
                          
              </TouchableOpacity>

          </View>
        </View>
      </View>

        </View>
      </ScrollView>
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
});
