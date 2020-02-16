import React, { Component } from 'react';
import { Text, Alert, View, ToastAndroid, ImageBackground, FlatList, Platform, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Button } from 'native-base';
import api from '../services/api';
import Shimmer from '../services/Shimmer';
import * as Progress from 'react-native-progress'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { Header, Body, Right, Left } from 'native-base';

var { width, height } = Dimensions.get('window');

export default class Comercio extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {

        modal: false,

        activeIndex: 0,
        region: null,

        lastPage: false,
        numberPage: 0,

        progress: false,
        docs: [],
        latitude: 0.00,
        longitude: 0.00,
        nomeBusca: '',
        palavraChave: '',
        data: [],
        productInfo: {},
        isVisible: false,
        voltar: false,
    }

    setModalVisible = () => {
        this.setState({ modal: !this.state.modal });
    }

    exibirMapa = () => {
        const { latitude, longitude } = this.state;
        Alert.alert(`Lat: ${latitude}, lng: ${longitude}`);
    }

    Voltar = () => {
        this.props.navigation.goBack();
    }

    async componentDidMount() {
        const { palavraChave, latitude, longitude, categoria } = this.props.navigation.state.params.palavra;
        this.setState({
            palavraChave, latitude, longitude, region: {
                latitude, longitude, latitudeDelta: 0.2, longitudeDelta: 0.2
            }
        });

        this.buscarNaApi(palavraChave);
    }

    buscarNaApi = async (palavraChave, page = 0) => {
        this.setState({ progress: true });
        const response = await api.get(`/api/estabelecimento/listar-por-palavra-chave/${palavraChave}?pag=${page}`);
        if (response.ok) {
            this.setState({ data: [...this.state.data, ...response.data.data.content], lastPage: response.data.data.last, numberPage: response.data.data.number });
            this.setState({ progress: false });
        } else {
            this.setState({ progress: false });
        }
    }

    loadMore = async () => {
        const { palavraChave, lastPage, numberPage } = this.state;
        if (lastPage) {
            return
        }
        else {
            this.buscarNaApi(palavraChave, numberPage + 1);
        }
    }

    // 
    componentWillMount() {
        setTimeout(() => {
            this.setState({
                isVisible: false,
            })
        }, 2000)
        this.setState({ isVisible: false });
    }

    detalhesView = (item) => {
        this.props.navigation.navigate('DetalheComercio', { data: item })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => this.detalhesView(item)}>
            <View style={{
                backgroundColor: '#FFF',
                borderWidth: 1,
                borderColor: '#DDD',
                borderRadius: 5,
                padding: 20,
                marginBottom: 20,
                flexDirection: 'row',
                height: 170
            }}>
                <Image style={{
                    width: 100, height: 100, marginTop: 1
                }}
                    source={{ uri: item.fotoPath }} />

                <View style={{ marginTop: 1, flex: 2 }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: '#333',
                        marginLeft: 10,
                    }}>
                        {item.nomeEstabelecimento}
                    </Text>
                    <Text style={{
                        marginLeft: 10,
                        marginTop: 5,
                    }}>
                        {item.apelido}
                    </Text>

                </View>
            </View>
        </TouchableOpacity>
    );

    renderSectionList = () => {
        return (
            <View >
                <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../assets/bg/BG.png')}>
                    <View style={{ width: '100%', height: '100%' }}>
                        {/*<Header style={styles.androidHeader} androidStatusBarColor='#15a1f8' iosBarStyle='light-content'>
                        <Left style={{ flex: 1, marginRight: 2 }}>
                            <TouchableOpacity onPress={this.Voltar} hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}><Icon name="angle-left" color="#fff" size={30}
                                onPress={
                                    this.Voltar
                                } /></TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 2, }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>{this.state.palavraChave}</Text>
                        </Body>
                        </Header>*/}
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
                                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>{this.state.palavraChave}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                height: 80,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}>
                            </View>

                        </View>
                        {this.state.progress && <View style={{
                            flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Progress.CircleSnail size={60} color={'#FFF'}></Progress.CircleSnail>
                        </View>}
                        {
                            !this.state.progress && this.state.data.length === 0 &&
                            <Text style={{
                                marginHorizontal: 20,
                                marginTop: 30,
                                color:'#fff'
                            }}>Desculpe, nada foi encontrado!</Text>
                        }

                        {
                            this.state.data.lenght !== 0 &&
                            <FlatList
                                contentContainerStyle={styles.list}
                                data={this.state.data}
                                keyExtractor={item => item.id.toString()} // Add toString()
                                renderItem={this.renderItem}
                                onEndReached={this.loadMore}
                                onEndReachedThreshold={0.1}
                            />}



                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            bottom: 20,
                            right: 20,
                        }}>
                            <TouchableOpacity style={{
                                height: 50, width: 50, borderRadius: 100,
                                position: 'absolute',
                                backgroundColor: '#fff',
                                borderColor: '#d2d2d2',
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                                onPress={this.direcionarMapa}>
                                <Icon name='map-marker' size={20} color={'#000'} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>
            </View>
        );
    }

    mapStyleRetro = [
        { "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817c" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b076" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#447530" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fdfcf8" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#f8c967" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#e9bc62" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#e98d58" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#db8555" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#806b63" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [{ "color": "#8f7d77" }] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ebe3cd" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b9d3c2" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#92998d" }] }
    ]

    renderSectionMap = () => {
        return (
            <View style={{ height: '100%', width: '100%', }}>
                <MapView style={{ flex: 1, height: '100%', width: '100%', }}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                    loadingEnable={true}
                    customMapStyle={this.mapStyleRetro}>

                    {this.state.data.map((value, index) => {
                        return (
                            <View key={index}>
                                <MapView.Marker
                                    onPress={() => {
                                        //Alert.alert('*');
                                        //this.detalhesView(value)
                                    }}
                                    coordinate={{
                                        latitude: value.latitude,
                                        longitude: value.longitude,
                                    }}
                                        
                                    //image={{uri:value.imagemPath}}
                                    //title={value.nomeEstabelecimento}
                                    //pinColor='blue'
                                >
                                    <View style={{
                                        paddingHorizontal:5,
                                        paddingVertical:3,
                                    }}>
                                        
                                        <View style={{
                                            backgroundColor:'#fff', borderRadius:2, justifyContent:'center',
                                            paddingHorizontal:10, paddingVertical:3,
                                        }}>
                                            <Text>{value.id}</Text>
                                        </View>
                                        <View style={{
                                            width:0, height:0, backgroundColor:'transparent', borderStyle:'solid',
                                            borderLeftWidth:10, borderRightWidth:10, borderBottomWidth:10, borderLeftColor:'transparent',
                                            borderRightColor:'transparent', borderBottomColor:'#fff',alignSelf:'center',transform:[{rotate:'-180deg'}]
                                        }}/>

                                    </View>
                                </MapView.Marker> 
                            </View>
                        );
                    })}

                </MapView>

                <View style={{
                    //marginHorizontal:20,
                    //borderColor:'#ddd',
                    //height:50,
                    // borderWidth:1,
                    //backgroundColor:'#fff',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    bottom: Platform.select({
                        ios: 80, android: 80,
                    }),
                    right: 20,
                    //width:50,
                }}>
                    <TouchableOpacity style={{
                        //position:'absolute',
                        height: 50,
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 80,
                        borderColor: '#d2d2d2',
                        borderWidth: 0.3,
                    }} onPress={
                        this.setModalVisible
                    }>
                        <Text>Filtros</Text>
                    </TouchableOpacity>
                </View>


                <View style={{
                    //flex:1,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    //top:80,
                    bottom: 20,
                    right: 20,
                    //marginBottom:20,
                    //paddingBottom:20,
                    //marginRight:20,
                    //position:'absolute',
                }}>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        height: 50,
                        width: 50,
                        borderRadius: 100,
                        borderColor: '#d2d2d2',
                        backgroundColor: '#fff',
                        marginBottom: 20,
                        marginLeft: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                        onPress={this.direcionarList}>
                        <Icon name='th-large' size={20} color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    segmentCliked = (index) => {
        this.setState({ activeIndex: index });
    }

    direcionarFiltro = () => {
        Alert.alert('Filtro!');
    }

    direcionarMapa = () => {
        this.segmentCliked(1);
    }

    direcionarList = () => {
        this.segmentCliked(0);
    }

    renderPass = () => {
        if (this.state.activeIndex === 0) {
            return (
                <View>
                    {this.renderSectionList()}
                </View>
            );
        } else if (this.state.activeIndex === 1) {
            return (
                <View >
                    {this.renderSectionMap()}
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>

                {this.renderPass()}

                <Modal
                    isVisible={this.state.modal}
                    //animationIn="zoomInDown"
                    //animationOut="zoomOutUp"
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={500}
                    animationOutTiming={500}
                    //backdropColor={'red'}
                    backdropOpacity={0.5}
                    backdropTransitionInTiming={2500}
                    backdropTransitionOutTiming={2500}
                    scrollOffsetMax={500 - 200}
                    onBackdropPress={
                        () => {
                            this.setState({ modal: !this.state.modal })
                        }
                    } >

                    <View style={{
                        backgroundColor: '#fff',
                        paddingBottom: 5,
                        paddingTop: 20,
                        borderRadius: 5,
                        justifyContent: 'center',
                        //alignItems:'center'
                    }}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                fontWeight: 'bold',
                            }}>Filtros</Text>
                        </View>

                        <View style={{
                            marginTop: 20,
                            marginBottom: 10,
                            marginHorizontal: 20,
                        }}>
                            <Text>
                                Seus sonhos profissionais quando colocados no papel,
                                te fazem enxergar o melhor caminho profissional
                                a percorrer e a traçar metas e objetivos concretos
                                para que se alcance o resultado esperado. Neste painel,
                                traremos dicas rápidas e eficientes para que você estabeleça
                                um planejamento de carreira e atinja o tão desejado sucesso.
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={
                                this.setModalVisible
                            }
                            style={{
                                backgroundColor: "#15a1f8",
                                margin: 30,
                                heigth: 42,
                                padding: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 4,
                                borderColor: "rgba(0, 0, 0, 0.1)"
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 14,
                            }}>Retornar</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>
            </View>
        );
    }

}


const styles = StyleSheet.create(
    {
        container: {
            //flex:1,
            backgroundColor: "#fafafa",
        },
        list: {
            padding: 25,
        },
        productContainer: {
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 5,
            padding: 20,
            marginBottom: 20,
            flexDirection: 'row'
        },
        productTitle: {
            fontSize: 18,
            fontWeight: "bold",
            color: '#333',
            marginLeft: 10,
        },
        productDescription: {
            fontSize: 16,
            color: '#999',
            marginTop: 5,
            lineHeight: 24,
        },
        productButton: {
            height: 42,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#DA552F',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        productButtonText: {
            fontSize: 16,
            color: '#DA552F',
            fontWeight: 'bold',
        },
        androidHeader: {
            ...Platform.select({
                android: {
                    //backgroundColor: '#15a1f8'
                    backgroundColor: 'transparent'
                },
                ios: {
                    backgroundColor: '#15a1f8'
                }
            })
        }
    }
);