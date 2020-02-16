import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Right, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import NovoColaboradorContent from './novoColaboradorContent';

export default class NovoColaboradorPag extends Component {

    static navigationOptions = {
        header:null,
    }

    Voltar = ()=>{
        this.props.navigation.goBack();
    }
    render(){
        return(
            <Container>
                <Header style={styles.androidHeader} androidStatusBarColor='#15a1f8' iosBarStyle='light-content'>
                <Left style={{flex:1, marginRight:2}}>
                        <TouchableOpacity onPress={this.Voltar} hitSlop={{top:20, bottom:20, right:20, left:20}}><Icon name="angle-left" color="#fff" size={30} 
                         onPress={
                            this.Voltar
                         }/></TouchableOpacity>
                    </Left>
                    <Body style={{flex:2,}}>
                        <Text style={{
                            color:'#fff',
                            fontSize:20,
                            fontWeight:'bold'
                        }}>iLúmino</Text>
                    </Body>
                </Header>
                <NovoColaboradorContent navigation={this.props.navigation} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    androidHeader:{
        ...Platform.select({
            android:{
                backgroundColor:'#15a1f8'
            },
            ios:{
                backgroundColor:'#15a1f8'
            }
        })
    }
})