import React, {Component} from 'react';
import {Text, View, Platform, AsyncStorage } from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import PrincipalCol from './principalCol';
import Escritorio from './escritorio';
import NovoComercio from './novoComercio';
import NovoColaborador from './novoColaborador';

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

const TabsColaborador = createMaterialTopTabNavigator({
  Home: {
     screen: PrincipalCol,
 },
 Escritorio: {
     screen: Escritorio,
 },
 Ponto: {
    screen: NovoComercio,
},
 Colaborador: {
     screen: NovoColaborador,
     navigationOptions:{
         tabBarLabel:'COLABORADOR'
     }
 },
 },
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

TabsColaborador.navigationOptions = ()=>({
  header:null,
});

export default TabsColaborador;