import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class FinanceiroCompra extends Component{
    render(){
        return(
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#f2f2f2',
            }}>
                <Text>FinanceiroCompra tela</Text>
            </View>
        );
    }
}