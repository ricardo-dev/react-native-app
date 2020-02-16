import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default class NovoColaboradorContent extends Component {

    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <View style={{

                backgroundColor: 'transparent',
            }}>
                <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/bg/BG.png')}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text>
                            Novo Colaborador - Content
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
} 