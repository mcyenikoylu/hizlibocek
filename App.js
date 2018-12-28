/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, Dimensions, Animated, AppRegistry} from 'react-native';
import Zombie from './app/components/zombie';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
        movePlayerVal: new Animated.Value(40), //cenker başlama noktası
        playersSide: 'left',
        points: 0,

        moveEnemyVal: new Animated.Value(0),
        moveEnemyVal2: new Animated.Value(0),
        enemyStartposX: 0,
        enemyStartposX2: 0,

        enemySide: 'left',
        enemySide2: 'right',

        enemySpeed: 4200,
        enemySpeed2: 4200,

        gameOver: false,
    };
  }

  render() {



    return (

  <ImageBackground source={require('./app/img/bg.png')}
  style={{width: '100%', height: '100%'}}>

<View style={{ flex: 1, alignItems: 'center', marginTop: 80}}>
      <View style={styles.points}>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#fff'}}>
              {this.state.points}
          </Text>
      </View>
</View>

    <Animated.Image source={require('./app/img/cenker.png')}
    style={{
      width: 100,
      height: 100,
      position: 'absolute',
      zIndex: 1,
      bottom: 50,
      resizeMode: 'stretch',
      transform: [
        { translateX: this.state.movePlayerVal}
      ]
    }}>

    </Animated.Image>

  <Zombie enemyImg={require('./app/img/zombie2.png')}
            enemyStartposX={this.state.enemyStartposX}
            moveEnemyVal={this.state.moveEnemyVal}>
  </Zombie>

  <Zombie enemyImg={require('./app/img/zombie1.png')}
            enemyStartposX={this.state.enemyStartposX2}
            moveEnemyVal={this.state.moveEnemyVal2}>
  </Zombie>

    <View style={styles.controls}>
      <Text style={styles.left} onPress={()=> this.movePlayer('left')} >{'<'}</Text>
      <Text style={styles.right} onPress={()=> this.movePlayer('right')}>{'>'}</Text>
    </View>

  </ImageBackground>
    );
  }

  movePlayer(direction) {
    if(direction == 'right'){
      this.setState({playersSide:'right'});
      Animated.spring(
          this.state.movePlayerVal,
          {
            toValue: Dimensions.get('window').width = 220,
            tension: 200,
          }
      ).start();
    } else if (direction == 'left') {
      this.setState({playersSide:'left'});
      Animated.spring(
          this.state.movePlayerVal,
          {
            toValue: 40,
            tension: 200,
          }
      ).start();
    }
  }

  componentDidMount(){
    this.animateEnemy();
    this.animateEnemy2();
  }

  animateEnemy2(){
    this.state.moveEnemyVal2.setValue(-120);
    var windowH = Dimensions.get('window').height; //692
    var rx = Math.floor(Math.random() * 2) + 1;
    if(rx == 2){ //2 gelince
      rx = 40;
      this.setState({enemySide2: 'left'});
      this.setState({enemyStartposX2: rx});
    } else { //1 gelince
      rx = 220;
      this.setState({enemySide2: 'right'});
      this.setState({enemyStartposX2: rx});
    }

    var refreshIntervalId2;
    refreshIntervalId2 = setInterval(()=>{
          if(
            this.state.moveEnemyVal2._value > windowH - 280
            && this.state.playersSide == this.state.enemySide2
            ){
              clearInterval(refreshIntervalId2);
              this.setState({gameOver: true});
              this.gameOver();
            }
     
    }, 50);

    setInterval(()=>{
      this.setState({enemySpeed2: this.state.enemySpeed2 - 50})
 
    }, 20000);

    Animated.timing(
      this.state.moveEnemyVal2,{
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed2,
      }
    ).start(event => {
      if(event.finished && this.state.gameOver == false){
      clearInterval(refreshIntervalId2);
      this.setState({points: ++this.state.points});
      this.animateEnemy2();
    } 
    });


  }

  animateEnemy(){

    this.state.moveEnemyVal.setValue(-120);

    var windowH = Dimensions.get('window').height; //692
   
    var r = Math.floor(Math.random() * 2) + 1;
    if(r == 2){ //2 gelince
      r = 40;
      this.setState({enemySide: 'left'});
      this.setState({enemyStartposX: r});
    } else { //1 gelince
      r = 220;
      this.setState({enemySide: 'right'});
      this.setState({enemyStartposX: r});
    }

    var refreshIntervalId;
    refreshIntervalId = setInterval(()=>{
          if(
            this.state.moveEnemyVal._value > windowH - 280
            && this.state.playersSide == this.state.enemySide
            ){
              clearInterval(refreshIntervalId);
              this.setState({gameOver: true});
              this.gameOver();
            }
     
    }, 50);

    setInterval(()=>{
      this.setState({enemySpeed: this.state.enemySpeed - 50})
 
    }, 20000);

    Animated.timing(
      this.state.moveEnemyVal,{
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed,
      }
    ).start(event => {
      if(event.finished && this.state.gameOver == false){
      clearInterval(refreshIntervalId);
      this.setState({points: ++this.state.points});
      this.animateEnemy();
    } else {
      //alert('timing start alse');
      
    }
    });


  }

  gameOver(){
    alert('Kaybettin!! :)');
  }

}

const styles = StyleSheet.create({
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    color: '#fff',
    margin: 0,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  left: {
    flex: 1,
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  points: {
    width: 80,
    height: 80,
    backgroundColor: '#303535',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

//AppRegistry.registerComponent('mcyGame', ()=> mcyGame);