import React, {Component} from 'React';
import {View, Text, StyleSheet, Platform, TouchableOpacity, ImageBackground} from 'react-native';
import {Container, Content, Header, Left, Right, Body} from 'native-base';
import MoedaContent from './moedaContent';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MoedaPag extends Component {

    static navigationOptions = {
        header:null,
    }

    Voltar = ()=>{
        this.props.navigation.goBack();
    }

    render(){
        return(
            <Container>
                {/*<Header style={styles.androidHeader} androidStatusBarColor='#15a1f8' iosBarStyle='light-content'>
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
                    </Header>*/}
                {/*<MoedaContent navigation={this.props.navigation} />*/}
                <View style={{flex:1}}>
                <ImageBackground style={{width:'100%', height:'100%',}} source={require('../assets/bg/BG.png')} >
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
                                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>iLúmino</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                height: 80,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}>
                            </View>

                        </View>
                        <MoedaContent navigation={this.props.navigation} />
                </ImageBackground>
            </View>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    androidHeader:{
        ...Platform.select({
            android:{
                backgroundColor:'#15a1f8',
                borderBottomColor:'#fff',
                borderBottomWidth:0.8,
            },
            ios:{
                backgroundColor:'#15a1f8',
                borderBottomColor:'#fff',
                borderBottomWidth:0.8,
            }
        })
    }
});