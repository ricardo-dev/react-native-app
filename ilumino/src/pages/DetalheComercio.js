import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Alert, TextInput, TouchableOpacity, Platform, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import api from '../services/api';
import * as Progress from 'react-native-progress'
import validateRouteConfigMap from 'react-navigation/src/routers/validateRouteConfigMap';
import { TextMask } from 'react-native-masked-text';
import { Item } from 'native-base';


export default class DetalheComercio extends Component {

  static navigationOptions = {
    header: null
  };

  state = {
    loading: false,
    nomeEstabelecimento: '',
    apelido: '',
    latitude: -1,
    longitude: -1,
    aglomerado: false,
    tipo: '',
    nomeAglomerado: '',
    pontoReferencia: '',
    franquia: false,
    nomeFranquia: '',
    fotoPath: '',
    horarioFuncionamentoDto: {},
    enderecoComercioDto: {},
    contato: [],
    categoria: [],
    dadoExtraDto: {},
    comodidadeDto: [],
    formaPagamentoDto: [],
    promocaoDto: [],
    redeSocialDto: [],
    produtoDto: [],

    formaPagamentoDebito: [],
    formaPagamentoCredito: [],
    formaPagamentoOutros: [],
  }

  async componentDidMount() {
    const { id } = this.props.navigation.state.params.data;
    this.buscarDetalhesEstabelecimento(id);
  }

  buscarDetalhesEstabelecimento = async (id) => {
    this.setState({ loading: true });
    const response = await api.get(`/api/estabelecimento/listar-por-estabelecimento-id/${id}`);
    if (response.ok) {
      const {
        nomeEstabelecimento,
        apelido,
        latitude,
        longitude,
        aglomerado,
        tipo,
        nomeAglomerado,
        pontoReferencia,
        franquia,
        nomeFranquia,
        fotoPath,
        horarioFuncionamentoDto,
        enderecoComercioDto,
        contato,
        categoria,
        dadoExtraDto,
        comodidadeDto,
        formaPagamentoDto,
        promocaoDto,
        redeSocialDto,
        produtoDto,
      } = response.data.data;
      this.setState({
        loading: false,
        nomeEstabelecimento,
        apelido,
        latitude,
        longitude,
        aglomerado,
        tipo,
        nomeAglomerado,
        pontoReferencia,
        franquia,
        nomeFranquia,
        fotoPath,
        horarioFuncionamentoDto,
        enderecoComercioDto,
        contato,
        categoria,
        dadoExtraDto,
        comodidadeDto,
        formaPagamentoDto,
        promocaoDto,
        redeSocialDto,
        produtoDto: [...produtoDto, ...produtoDto, ...produtoDto, ...produtoDto, ...produtoDto, ...produtoDto], //produtoDto:produtoDto,
      });
      this.getFormasDePagamento(response.data.data.formaPagamentoDto)
    } else {
      this.setState({ loading: false });
    }
  }

  getFormasDePagamento = (formaPagamento) => {
    const formDebito = formaPagamento.filter((value, index) => {
      if (value.tipoForma === 'Débito')
        return value;
    });
    const formCredito = formaPagamento.filter((value, index) => {
      if (value.tipoForma === 'Credito')
        return value;
    });
    const formOutros = formaPagamento.filter((value, index)=>{
      if(value.tipoForma === 'Outros')
      return value;
    })
    this.setState({formaPagamentoCredito:formCredito, formaPagamentoDebito:formDebito, formaPagamentoOutros:formOutros});
    /*this.setState({formaPagamentoCredito:[
      ...formCredito, ...formCredito,...formCredito, ...formCredito,...formCredito, ...formCredito, ...formCredito,...formCredito,   
      ...formCredito, ...formCredito,...formCredito, ...formCredito,...formCredito, ...formCredito, ...formCredito,...formCredito,   
      ...formCredito, ...formCredito,...formCredito, ...formCredito,...formCredito,  ...formCredito, ...formCredito,...formCredito,  
    ], 
      formaPagamentoDebito:[
        ...formDebito, ...formDebito, ...formDebito, ...formDebito, ...formDebito,...formDebito, ...formDebito, ...formDebito,
        ...formDebito, ...formDebito, ...formDebito, ...formDebito, ...formDebito,...formDebito, ...formDebito, ...formDebito,
        ...formDebito, ...formDebito, ...formDebito, ...formDebito, ...formDebito,...formDebito, ...formDebito, ...formDebito,
      ], formaPagamentoOutros:[
        ...formOutros, ...formOutros, ...formOutros, ...formOutros, ...formOutros,  ...formOutros, ...formOutros, ...formOutros, 
        ...formOutros, ...formOutros, ...formOutros, ...formOutros, ...formOutros,  ...formOutros, ...formOutros, ...formOutros, 
        ...formOutros, ...formOutros, ...formOutros, ...formOutros, ...formOutros,  ...formOutros, ...formOutros, ...formOutros, 
      ]});*/
  }

  voltar = () => {
    this.props.navigation.goBack();
  }

  mapStyleRetro = [
    { "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817c" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b076" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#447530" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fdfcf8" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#f8c967" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#e9bc62" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#e98d58" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#db8555" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#806b63" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [{ "color": "#8f7d77" }] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ebe3cd" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b9d3c2" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#92998d" }] }
  ]

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f5fcff' }}>
        {
          this.state.loading &&
          <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center'
          }}>
            <Progress.CircleSnail size={60} color={'#15A1F8'}></Progress.CircleSnail>
          </View>
        }
        {
          !this.state.loading &&
          <View style={styles.container}>
            <ScrollView>
              <ImageBackground source={{ uri: this.state.fotoPath }} style={{
                height: 250,
              }}>
                <TouchableOpacity onPress={this.voltar}
                  hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                  style={{
                    marginLeft: 10,
                    ...Platform.select({
                      android: {
                        marginTop: 20,
                      },
                      ios: {
                        marginTop: 40,
                      }
                    })
                  }}>
                  <Icon name='angle-left' size={50} color={'#15a1f8'} />
                </TouchableOpacity>
              </ImageBackground>
              <Text style={{
                marginTop: 5,
                justifyContent: 'center',
                fontSize: 35,
                color: '#000',
                fontWeight: 'bold',
                marginLeft: 15,
                marginRight: 10,
              }}>
                {this.state.nomeEstabelecimento}
              </Text>
              <Text style={{
                marginTop: 10,
                marginLeft: 15,
                fontWeight: '100',
                fontSize: 20,
                color: '#000'
              }}>
                "{this.state.apelido}"
              </Text>
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  height: 200, width: 200, justifyContent: 'flex-end', alignItems: 'center', marginTop: 20,
                }}
              />
              <View style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 15,
              }}>
                {this.state.categoria.map((value, index) => {
                  return (
                    <View key={index}>
                      <Text style={{ color: 'gray', marginLeft: 3, fontSize: 12 }}>- {value.tipoCategoria}</Text>
                    </View>
                  )
                })}
              </View>
              {
                // TODO - distancia, aberto e infoMoeda
              }
              <View style={{
                marginLeft: 15,
                marginRight: 15,
                marginTop: 20,
                marginBottom: 5,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  color: '#000',
                  marginTop: 10,
                  fontSize: 14
                }}>Descrição</Text>
                <Text style={{
                  fontWeight: '100',
                  fontSize: 14,
                  marginTop: 10,
                }}>
                  {this.state.dadoExtraDto.diferencial}
                </Text>
              </View>

              <View style={{ marginBottom: 10 }}>
                <View style={{
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 20,
                  //marginBottom: 10,
                  borderTopWidth: 1,
                  borderTopColor: '#e5e5e5',
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: '#000',
                    marginTop: 10,
                    fontSize: 14
                  }}>Como Chegar</Text>
                </View>
                <View style={{
                  marginTop: 10,
                  height: 200,
                  flex: 1
                  // *
                }}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1 }}
                    region={{
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                      latitudeDelta: 0.009,
                      longitudeDelta: 0.009
                    }}
                    customMapStyle={this.mapStyleRetro}
                    showsUserLocation={false}>
                    <MapView.Marker
                      coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                      }}
                      //title={this.state.nomeEstabelecimento}
                      //description={this.state.dadoExtraDto.diferencial}
                    >
                                    <View style={{
                                        paddingHorizontal:10,
                                        paddingVertical:10,
                                    }}>
                                        
                                        <View style={{
                                            backgroundColor:'#fff', borderRadius:2, justifyContent:'center',
                                            paddingHorizontal:20, paddingVertical:10,
                                        }}>
                                            <Text style={{color:'#000'}}>{this.state.nomeEstabelecimento}</Text>
                                        </View>
                                        <View style={{
                                            width:0, height:0, backgroundColor:'transparent', borderStyle:'solid',
                                            borderLeftWidth:10, borderRightWidth:10, borderBottomWidth:10, borderLeftColor:'transparent',
                                            borderRightColor:'transparent', borderBottomColor:'#fff',alignSelf:'center',transform:[{rotate:'-180deg'}]
                                        }}/>

                                    </View>
                    </MapView.Marker>
                  </MapView>
                </View>
                <View style={{
                  marginTop: 15, marginBottom: 15,
                  marginLeft: 15, marginRight: 15,
                }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10
                    }}>
                    <Text style={{ fontWeight: '100', fontSize: 14 }}>
                      {this.state.enderecoComercioDto.endereco} - {this.state.enderecoComercioDto.bairro} - {this.state.enderecoComercioDto.cidade} - {this.state.enderecoComercioDto.estado} - {this.state.enderecoComercioDto.pais}</Text>
                  </View>
                </View>
                {this.state.aglomerado &&
                  <View style={{ marginHorizontal: 15, marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000', marginBottom: 10 }}>Aglomerado comercial </Text>
                    <Text>{this.state.tipo}</Text>
                    <Text>{this.state.nomeAglomerado}</Text>
                    <Text>{this.state.pontoReferencia}</Text>
                  </View>
                }
              </View>
              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                //marginBottom: 20
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                  Horario de Funcionamento
                </Text>
                <View style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}>

                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                      <Text style={{
                        fontWeight: 'bold',
                        color: '#000'
                      }}>{this.state.horarioFuncionamentoDto.dia}</Text>
                    </View>
                    {
                      this.state.horarioFuncionamentoDto.horaInicio === 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>Fechado</Text>
                      </View>
                    }
                    {
                      this.state.horarioFuncionamentoDto.horaInicio !== 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>{this.state.horarioFuncionamentoDto.horaInicio} - {this.state.horarioFuncionamentoDto.horaFim}</Text>
                      </View>
                    }
                  </View>

                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                      <Text style={{
                        fontWeight: 'bold',
                        color: '#000'
                      }}>{this.state.horarioFuncionamentoDto.dia2}</Text>
                    </View>
                    {
                      this.state.horarioFuncionamentoDto.horaInicio2 === 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>Fechado</Text>
                      </View>
                    }
                    {
                      this.state.horarioFuncionamentoDto.horaInicio2 !== 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>{this.state.horarioFuncionamentoDto.horaInicio2} - {this.state.horarioFuncionamentoDto.horaFim2}</Text>
                      </View>
                    }
                  </View>


                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                      <Text style={{
                        fontWeight: 'bold',
                        color: '#000'
                      }}>{this.state.horarioFuncionamentoDto.dia3}</Text>
                    </View>
                    {
                      this.state.horarioFuncionamentoDto.horaInicio3 === 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>Fechado</Text>
                      </View>
                    }
                    {
                      this.state.horarioFuncionamentoDto.horaInicio3 !== 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>{this.state.horarioFuncionamentoDto.horaInicio3} - {this.state.horarioFuncionamentoDto.horaFim3}</Text>
                      </View>
                    }
                  </View>


                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                      <Text style={{
                        fontWeight: 'bold',
                        color: '#000'
                      }}>{this.state.horarioFuncionamentoDto.dia4}</Text>
                    </View>
                    {
                      this.state.horarioFuncionamentoDto.horaInicio4 === 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>Fechado</Text>
                      </View>
                    }
                    {
                      this.state.horarioFuncionamentoDto.horaInicio4 !== 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>{this.state.horarioFuncionamentoDto.horaInicio4} - {this.state.horarioFuncionamentoDto.horaFim4}</Text>
                      </View>
                    }
                  </View>

                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                      <Text style={{
                        fontWeight: 'bold',
                        color: '#000'
                      }}>{this.state.horarioFuncionamentoDto.dia5}</Text>
                    </View>
                    {
                      this.state.horarioFuncionamentoDto.horaInicio5 === 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>Fechado</Text>
                      </View>
                    }
                    {
                      this.state.horarioFuncionamentoDto.horaInicio5 !== 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>{this.state.horarioFuncionamentoDto.horaInicio5} - {this.state.horarioFuncionamentoDto.horaFim5}</Text>
                      </View>
                    }
                  </View>

                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                      <Text style={{
                        fontWeight: 'bold',
                        color: '#000'
                      }}>{this.state.horarioFuncionamentoDto.dia6}</Text>
                    </View>
                    {
                      this.state.horarioFuncionamentoDto.horaInicio6 === 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>Fechado</Text>
                      </View>
                    }
                    {
                      this.state.horarioFuncionamentoDto.horaInicio6 !== 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>{this.state.horarioFuncionamentoDto.horaInicio6} - {this.state.horarioFuncionamentoDto.horaFim6}</Text>
                      </View>
                    }
                  </View>

                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                      <Text style={{
                        fontWeight: 'bold',
                        color: '#000'
                      }}>{this.state.horarioFuncionamentoDto.dia7}</Text>
                    </View>
                    {
                      this.state.horarioFuncionamentoDto.horaInicio7 === 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>Fechado</Text>
                      </View>
                    }
                    {
                      this.state.horarioFuncionamentoDto.horaInicio7 !== 'fechado' &&
                      <View style={{
                        flex: 1,
                        justifyContent: 'center'
                      }} >
                        <Text>{this.state.horarioFuncionamentoDto.horaInicio7} - {this.state.horarioFuncionamentoDto.horaFim7}</Text>
                      </View>
                    }
                  </View>
                  <Text style={{ fontSize: 10, color: 'gray', marginTop: 20 }}>* Os horarios são de total responsabilidade do Estabelecimento.</Text>
                </View>
              </View>


              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                //marginBottom: 20
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                  Telefones
                </Text>
                <View style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}>

                  {
                    this.state.contato.map(
                      (value, index) => {
                        return (
                          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>

                            <View style={{
                              flex: 1,
                              justifyContent: 'center',
                            }}>
                              <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 14 }}>{value.numero}</Text>
                            </View>

                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center'
                              }}>
                              <Text>{value.tipoContato}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                            </View>

                          </View>
                        );
                      }
                    )}
                </View>
                <View style={{ marginTop: 10, }}>
                  <Text style={{
                    fontSize: 14, fontWeight: 'bold', color: '#000', marginTop: 10,
                  }}>Email</Text>
                  <Text>{this.state.dadoExtraDto.email}</Text>
                </View>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Text style={{
                    fontSize: 14, fontWeight: 'bold', color: '#000', marginTop: 10,
                  }}>Site</Text>
                  <Text>{this.state.dadoExtraDto.site}</Text>
                </View>
              </View>

              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                // marginBottom: 20
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                  Rede Sociais
                </Text>

                <View style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>

                  {
                    this.state.redeSocialDto.map(
                      (value, index) => {
                        return (
                          <View key={index} style={{ marginRight: 15 }}>
                            <TouchableOpacity onPress={() => { Alert.alert(value.endereco) }}>
                              <Image source={{ uri: value.iconePath }} style={{ width: 40, height: 40, }} />
                            </TouchableOpacity>
                          </View>
                        );
                      }
                    )
                  }

                </View>
              </View>

              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                // marginBottom: 20
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                  Faixa de Preços
                </Text>

                <Text style={{
                  marginTop: 10,
                  fontSize: 14
                }}>
                  O estabelecimento comercializa produtos e/ou serviços na sequinte faixa de preço:
                </Text>

                <View style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TextMask
                    style={{
                      color: '#15a1f8',
                      fontWeight: 'bold',
                      fontSize: 22
                    }}
                    value={this.state.dadoExtraDto.precoMin}
                    type={'money'} />
                  <Text style={{ fontSize: 18 }}> até </Text>
                  <TextMask
                    style={{
                      color: '#15a1f8',
                      fontWeight: 'bold',
                      fontSize: 22
                    }}
                    value={this.state.dadoExtraDto.precoMax}
                    type={'money'}
                  />
                </View>
              </View>

              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                // marginBottom: 20
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                Formas de Pagamento
                </Text>
                <View style={{
                  flexDirection:'row'
                }}>
                  <View style={{
                    flex:1
                  }}>
                      <Text style={{marginTop:10}}>Crédito</Text>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                          <FlatList 
                            data={this.state.formaPagamentoCredito}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={8}
                            renderItem={({item})=>{
                                return(
                                  <View style={{marginRight:15, marginTop:5}}>
                                    <Image source={{uri:item.iconePath}} style={{width:40, height:40}}/>
                                  </View>
                                );
                            }}
                          />
                        {/*
                          this.state.formaPagamentoCredito.map((value, index)=>{
                            return(
                              <View key={index} style={{marginRight:15, marginTop:5}}>
                                <Image source={{uri:value.iconePath}} style={{width:40, height:40}}/>
                              </View>
                            );

                          })
                        */}
                      </ScrollView>
                      <Text style={{marginTop:10}}>Débito</Text>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <FlatList 
                            data={this.state.formaPagamentoDebito}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={8}
                            renderItem={({item})=>{
                                return(
                                  <View style={{marginRight:15, marginTop:5}}>
                                    <Image source={{uri:item.iconePath}} style={{width:40, height:40}}/>
                                  </View>
                                );
                            }}
                          />
                      {/*
                        this.state.formaPagamentoDebito.map((value, index)=>{
                          return(
                            <View key={index} style={{marginRight:15, marginTop:5}}>
                              <Image source={{uri:value.iconePath}} style={{width:40, height:40}}/>
                            </View>
                          );

                        })
                      */}
                      </ScrollView>

                      <Text style={{marginTop:10}}>Outros</Text>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <FlatList 
                            data={this.state.formaPagamentoOutros}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={8}
                            renderItem={({item})=>{
                                return(
                                  <View style={{marginRight:15, marginTop:5}}>
                                    <Image source={{uri:item.iconePath}} style={{width:40, height:40}}/>
                                  </View>
                                );
                            }}
                          />
                      {/*
                        this.state.formaPagamentoOutros.map((value, index)=>{
                          return(
                            <View key={index} style={{marginRight:15, marginTop:5}}>
                              <Image source={{uri:value.iconePath}} style={{width:40, height:40}}/>
                            </View>
                          );

                        })
                      */}
                      </ScrollView>
                  </View>
                  <View>

                  </View>
                  <View>

                  </View>
                </View>
              </View>

{/*
              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                  Moedas iLúmino
                </Text>

                <View>

                </View>
              </View>
              */}


              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                //marginBottom: 20
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                  Promoções & Descontos
                </Text>

                <View style={{
                  marginTop:10
                }}>
                  {
                    this.state.promocaoDto.map((value, index)=>{
                      return(
                        <View key={index} style={{marginTop:5}}>
                          <Text>* {value.promocao}</Text>
                        </View>
                      );
                    })
                  }
                </View>
              </View>

              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                // marginBottom: 20
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                  Comodidades Oferecidas
                </Text>

                <View style={{
                  marginTop:10,
                }}>
                    {
                      this.state.comodidadeDto.map((value, index)=>{
                        return(
                          <View key={index} style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
                              <Image source={{uri:value.iconePath}} style={{width:40, height:40, borderRadius:40 }}/>
                              <Text style={{marginLeft:5, fontSize:14}}>{value.tipoComodidade}</Text>
                          </View>
                        );
                      })
                    }
                </View>
              </View>

              <View style={{
                marginTop: 20,
                marginHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                marginBottom: 20
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                  Produtos e Serviços Oferecidos
                </Text>

                <View style={{
                  marginTop:10,
                }}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      <FlatList 
                        data={this.state.produtoDto}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={5}
                        renderItem={({item})=>(
                          <View style={{
                            marginTop:10,
                            flexBasis:0,
                            marginHorizontal:5,
                          }}>
                            <Text>{item.palavraChave}</Text>
                          </View>
                        )}
                        />
                      </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});