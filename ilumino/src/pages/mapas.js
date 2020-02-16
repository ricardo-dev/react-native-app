import React, {Component} from 'react';
import {PermissionsAndroid,View, Alert, TextInput, Platform, Text, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class Mapa extends Component{
    static navigationOptions={
        tabBarIcon:({tintColor}) => (
            <Icon name='map-marker' size={20}
                color={tintColor} />
        )
    }

    state = {
        loading:false,
        searchFocused:false,
        maps:true,
        region:null,
        endereco:'',
        //permission:false,
    }
    // https://github.com/Richou/react-native-android-location-enabler
    dialogoCheckGps = ()=>{
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({})
            .then(data=>{
                //Alert.alert(data)
                this.capturarPosicao();
            })
            .catch(error => {
                Alert.alert(`Error: ${error.message} - Code: ${error.error}`);
            })
    }

    permissaoGps = async ()=>{
        try{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title:'Utilizar GPS',
                    message:'Podemos saber sua lozalização?',
                    buttonNeutral:'Mais tarde!',
                    buttonNegative:'Cancelar',
                    buttonPositive:'Sim :)',
                },
            );
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
                Alert.alert('ok!');
                this.capturarPosicao();
                //this.setState({permission:true});
            }else{
                Alert.alert(':/');
                //this.setState({permission:false});
            }
        }catch(error){
            Alert.alert(`Error Message: ${error}`);
        }
    }

    capturarPosicao = ()=>{
        this.setState({loading:true});
        
        navigator.geolocation.getCurrentPosition(
            ({coords:{latitude, longitude}})=>{
                this.setState({
                    maps:true,
                    region:{
                        latitude,
                        longitude,
                        latitudeDelta:0.0143,
                        longitudeDelta:0.0134,
                    },
                    endereco:'Meu local',
                    loading:false,
                })
            },
            error => { Alert.alert(error.message);
                        this.setState({loading:false})},
            {
                enableHighAccuracy:true, timeout:20000,
                maximumAge:1000,
            },
        );
    }

    pegarDados = async (latitude, longitude, endereco)=>{
        this.setState({
            region:{
                latitude,
                longitude,
                latitudeDelta:0.0143,
                longitudeDelta:0.0134,
            },
            endereco
        })
    }

    componentDidMount(){
        this.dialogoCheckGps();
        //this.capturarPosicao();
        //this.permissaoGps();
    }

    mapStyleRetro=[
        { "elementType": "geometry", "stylers": [ { "color": "#ebe3cd" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#523735" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#c9b2a6" } ] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [ { "color": "#dcd2be" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#ae9e90" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#93817c" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#a5b076" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#447530" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#fdfcf8" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#f8c967" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#e9bc62" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "color": "#e98d58" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [ { "color": "#db8555" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#806b63" } ] }, { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [ { "color": "#8f7d77" } ] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ebe3cd" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#b9d3c2" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#92998d" } ] }
    ]

    render(){
         const {region} = this.state;
        return(
            <View style={{
                flex:1, backgroundColor:'#f2f2f2',
            }}>


                    <MapView style={{
                    flex:1, 
                    }}
                    region={region}
                    showsUserLocation={false}
                    loadingEnabled={true}
                    customMapStyle={this.mapStyleRetro} >
                        {/* TODO - inserir resultado da busca aqui! */}
                    </MapView>

                    {this.state.loading && <View style={{
                        flex:1,
                        position:'absolute',
                        justifyContent:'center',
                        alignItems:'center',
                        marginLeft:20,
                        marginTop:30,
                    }}>
                        <Text style={{
                            fontSize:14,
                            color:'#000',
                        }}>Aguarde... estamos te procurando...</Text>
                    </View>}

                   <GooglePlacesAutocomplete 
                        placeholder='Onde estou?'
                        placeholderTextColor='#d2d2d2'
                        onPress={(data, details)=>{
                            const endereco=data.structured_formatting.main_text;
                            const {lat, lng} = details.geometry.location;
                            this.pegarDados(lat,lng, endereco);
                            //Alert.alert(`${lat}, ${lng}`);
                        }}
                        query={{
                            key:'AIzaSyBmwkzGIrq_PNZu99cfc4G1o-6Zt8600K8',
                            language:'pt',
                        }}
                        textInputProps={{
                            onFocus: ()=>{this.setState({
                                searchFocused:true,
                            })},
                            onBlur: ()=>{this.setState({
                                searchFocused:false,
                            })},
                            autoCapitalize:'none',
                            autoCorrect:false,
                        }}
                        listViewDisplayed={this.state.searchFocused}
                        fetchDetails
                        enablePoweredByContainer={false}
                        styles={{
                            container:{
                                position:"absolute",
                                top:50,
                                width:'100%',
                            },
                            textInputContainer:{
                                flex:1,
                                backgroundColor:'transparent',
                                height:54,
                                marginHorizontal:20,
                                borderTopWidth:0,
                                borderBottomWidth:0,
                            },
                            textInput:{
                                color:'#333',
                                height:54,
                                margin:0,
                                borderRadius:0,
                                paddingTop:0,
                                paddingBottom:0,
                                paddingLeft:20,
                                paddingRight:20,
                                marginTop:0,
                                marginLeft:0,
                                marginRight:0,
                                elevation:5, // sombra no android
                                shadowColor:'#000',
                                shadowOpacity:0.1,
                                shadowOffset:{x:0, y:0},
                                shadowRadius:15,
                                borderWidth:1,
                                borderColor:'#ddd',
                                fontSize:18,
                            },
                            listView:{
                                borderWidth:1,
                                borderColor:'#ddd',
                                backgroundColor:'#fff',
                                marginHorizontal:20,
                                elevation:5, // sombra no android
                                shadowColor:'#000',
                                shadowOpacity:0.1,
                                shadowOffset:{x:0, y:0},
                                shadowRadius:15,
                                marginTop:10,
                            },
                            description:{
                                fontSize:16,
                            },
                            row:{
                                padding:20,
                                height:58,
                            }
                        }}
                   />

                   <TouchableOpacity style={{
                       position:'absolute',
                       flex:1,
                       height:60,
                       backgroundColor:'#fff',
                       borderRadius:100,
                       bottom:10,
                       left:10,
                       alignItems:'center',
                       justifyContent:'center',
                       elevation:5,
                       shadowColor:'#000',
                       shadowOpacity:0.1,
                       shadowOffset:{x:0, y:0},
                       shadowRadius:15,
                       paddingHorizontal:10,
                   }}
                   onPress={
                    this.dialogoCheckGps
                   } >
                       <Text style={{
                           fontSize:14,
                           color:'#000'
                       }}>Local</Text>
                   </TouchableOpacity>
                

            </View>
        );
    }
}