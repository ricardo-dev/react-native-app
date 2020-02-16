import React, { Component } from 'react';
import { Text, View, ActivityIndicator, AsyncStorage, ImageBackground, StatusBar, LinearGradient, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';

class LoadingPage extends Component {

    constructor(props) {
        super(props);
        this.initApp();
    }

    static navigationOptions = {
        header: null,
    }

    redirecionarColaborador = () => {
        //this.props.navigation.navigate('TabsColaborador');
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'TabsColaborador' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    redirecionarUsuario = () => {
        //this.props.navigation.navigate('TabsUsuario');
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'TabsUsuario' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    redirecionarPublico = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Tabs' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    initApp = async () => {
        const token = await AsyncStorage.getItem("@iLuminoApi:token");
        const tipo = await AsyncStorage.getItem("@iLuminoApi:tipo");
        const nome =  await AsyncStorage.getItem("@iLuminoApi:nomeUsuario")
        const fotoPath = await AsyncStorage.getItem("@iLuminoApi:fotoPath")
        const id = await AsyncStorage.getItem("@iLuminoApi:id")

        setTimeout(() => {
            if (token) {
                this.props.initApp(obj={token, nome, tipo, fotoPath, id});
                if (tipo === 'ROLE_USER'){
                    this.redirecionarUsuario();
                }
                else if (tipo === 'ROLE_COL'){
                    this.redirecionarColaborador();
                }
            } else
                this.redirecionarPublico();
        }, 1500);
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('../assets/bg/BG.png')} style={{ width: '100%', height: '100%' }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/icon/ilumino.png')} />
                        {/*<ActivityIndicator size={'large'} color="#fff" />*/}
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        initApp : (obj)=> dispatch({type:'LOGIN', payload:obj})
    }
}

export default connect(null, mapDispatchToProps) (LoadingPage);