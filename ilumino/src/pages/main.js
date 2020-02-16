import React, {Component} from 'react';
import {Text, View, Platform, AsyncStorage } from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import Principal from './principal';
import Mapas from './mapas';
import Moedas from './moedas';
import Cadastrar from './cadastrar';
import Pagina1 from './pagina1';
import Pagina2 from './pagina2';

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


const Tabs = createMaterialTopTabNavigator({
  Home: {
     screen: Principal,
 },
 Mapa: {
     screen: Mapas,
 },
 //Pagina1: {
 //    screen: Pagina1,
 //},
 //Pagina2: {
 //    screen: Pagina2,
 //}},
},{
     fontSize: 10,
     animationEnable: true,
     swipeEnabled: false,
     lazy: true,
     tabBarPosition: 'bottom',
     tabBarOptions: {
         style:{
             ...Platform.select({
                 android: {
                     backgroundColor: '#fff',
                     elevation:5,
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

Tabs.navigationOptions = ()=>({
  header:null,
});

export default Tabs;
/*
export default TabNavigator(
    {
        Inicio: {screen: Principal},
        Mapas: {screen: Mapas},
        Moedas: {screen: Moedas},
        Cadastrar: {screen: Cadastrar},
    },
    {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Inicio') {
              //iconName = `ios-information-circle${focused ? '' : '-outline'}`;
              //iconName = require('./assets/images/icon.png');
            }
            else if (routeName === 'Mapas') {
              //iconName = `ios-information-circle${focused ? '' : '-outline'}`;
              //iconName = require('./assets/images/icon.png');
            }
            else if (routeName === 'Moedas') {
              //iconName = `ios-information-circle${focused ? '' : '-outline'}`;
              //iconName = require('./assets/images/icon.png');
            } else if (routeName === 'Cadastrar') {
              //iconName = `ios-options${focused ? '' : '-outline'}`;
              //iconName = require('./assets/images/icon.png');
            }

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
           // return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarComponent: TabBarBottom,
        //tabBarComponent: BottomTabBar,
        tabBarPosition: 'bottom',
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: false,
      }
);
*/
