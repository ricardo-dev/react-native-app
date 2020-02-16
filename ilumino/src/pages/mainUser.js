import React, {Component} from 'react';
import {Text, View, Platform, AsyncStorage } from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import Principal from './principal';
import PrincipalUser from './principalUser';
import Mapas from './mapas';
import Moedas from './moedas';
import Cadastrar from './cadastrar';
import MeusDadosContentUser from './atividadeUsuario/meusDadosContent';
import ListaCategoriaContent from './listaCategoriaContentMainUser';


/*
export default class Main extends Component {


    static navigationOptions = {
        title: 'iLumino',
        headerTitleStyle: {
            textAlign: 'center',
            flex: 1,
        },
    };

    render(){
        return (
                <View>
                    <Text>Main</Text>
                </View>
        );
    }
}
*/


const TabsUsuario = createMaterialTopTabNavigator({
  Home: {
     screen: PrincipalUser,
 },
 Mapa: {
     screen: Mapas,
 },
 Moedas: {
     screen: Moedas,
 },
 Cadastrar: {
     screen: ListaCategoriaContent,
     navigationOptions:{
         tabBarLabel:'CATEGORIAS',
     }
 }},
 {
     fontSize: 10,
     animationEnable: true,
     swipeEnabled: false,
     lazy: true,
     tabBarPosition: 'bottom',
     tabBarOptions: {
         style:{
             ...Platform.select({
                 android: {
                     backgroundColor: 'white',
                     height:60,
                 }
             })
         },
         indicatorStyle: {
             backgroundColor: 'white',
         },
         activeTintColor: '#15A1F8',
         inactiveTintColor: '#d1cece',
         showLabel: true,
         showIcon: true,
         labelStyle: {
             fontSize: 8,
         },
     }
   }
);

TabsUsuario.navigationOptions = ()=>({
  header:null,
});

export default TabsUsuario;