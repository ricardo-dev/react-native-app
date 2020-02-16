import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, Platform,TouchableOpacity, View, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content} from 'native-base';

export default class SaibaMais extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar =  ()=>{
    this.props.navigation.goBack();
  }


  render() {
    return (

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
        <Content style={{
          backgroundColor:'#f2f2f2',
        }}>
            <View style={{
            flex:1,
            backgroundColor:'#f2f2f2',
          }}>
            
          <View style={{
            backgroundColor:'#fff',
            borderColor:'#ddd',
            borderWidth:0.8,
            marginHorizontal:20,
            marginTop:40,
          }}>

            <View style={{
              alignItems:'center',
              justifyContent:'center',
            }}>
                <Text style={{
                  marginTop:10,
                  fontSize:22,
                  color:'#000',
                }}>Moedas iLumino</Text>
            </View>

            <View style={{
              marginTop:30,
              marginHorizontal:10,
              marginBottom:30,
            }}>

              <Text>
                Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit. Donec lobortis mollis sapien, 
                a ullamcorper augue varius sit amet. Vestibulum 
                tellus lorem, viverra at lacinia eu, sagittis ac nunc. 
                Sed in urna urna. Proin in nisi lacinia, euismod urna ut, 
                maximus eros. Aliquam nunc nisi, rutrum vel arcu eget, 
                luctus facilisis mi. Praesent sollicitudin non dui id 
                tristique.
              </Text>

            </View>

          </View>

          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
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
});