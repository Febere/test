import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { Navbar } from './src/Navbar';
import { NavbarS } from './src/NavbarS';
import { Add } from './src/add';
import { useState, useImperativeHandle, forwardRef, useRef  } from 'react';
import { Todo } from './src/Todo';
import {Box} from './src/Box';
import { Button, YellowBox } from 'react-native-web';
import { MyBox } from './src/MyBox';

export default function App() {
  const [pole, setPole] = useState ([
    [1, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]);

  let poleSecond = [
    [1, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];
  const BoxOne = forwardRef((props, ref) =>{
    const BoxOneValueCount = props.valueCount
    const BoxOneSetValueCount = props.setValueCount
    let mas = BoxOneValueCount *12;
    let bW = 2
    if (BoxOneValueCount ==0) bW=0;
    const [kapliSize, setKapliSize] = useState(new Animated.Value(0));

    useImperativeHandle(ref, () => ({ doSomething }));
    let X
    let Y
    for (i = 0; i < 5; ++i) {
      for (l = 0; l < 5; ++l) {
        if (poleSecond[i][l] === ref ) {
          X=i
          Y=l
        }
      }
    }
    const doSomething = () => {
        if (BoxOneValueCount==3){
          Animated.timing(
            kapliSize,
            {
              toValue: 120,
              duration: 1200,
              useNativeDriver: false
            }
          ).start(({ finished }) => {
            BoxOneSetValueCount(0);
            if (X<4) {poleSecond[X+1][Y].current.doSomething();}
            if (X>0) {poleSecond[X-1][Y].current.doSomething();}
            // if (Y<4) {poleSecond[X][Y+1].current.doSomething();}
            // if (Y>0) {poleSecond[X][Y-1].current.doSomething();}
            return 1
          })
        } else {
          BoxOneSetValueCount(BoxOneValueCount+1)
          
        }
    }
    const Add = () => {
      poleSecond[X][Y].current.doSomething();
      // console.log(poleSecond[2][2].current.doSomething.qwe)
    }


    
    return(
      <TouchableOpacity style={styles.box} onPress={Add} >
        <View 
          style={{
            borderRadius: 50, height: mas, width: mas, 
            backgroundColor: "black", color: "blue", borderWidth: bW,
            borderStyle: "solid", borderColor: "green"
          }}>
        <Animated.Image
          source={require("./src/img/test.png")}
          style={{
          transform: [{scale: kapliSize}],
          flex: 1, resizeMode: "center", position: "absolute",
          width: 1, height: 1,
          left: 15, top: 15
        }}>
        </Animated.Image>
        </View>
      </TouchableOpacity>
 )

}
)
  let Y = 0;
  const horizontalView = pole.map((boxGorizontal)=>{
    Y = Y + 1 ;
    let X = 0;
    const oneBox = boxGorizontal.map((box)=>{
      X=X+1;
      const [valueCount, setValueCount] = useState(pole[X-1][Y-1]);
      poleSecond[X-1][Y-1] = useRef(null);

      return (<BoxOne ref={poleSecond[X-1][Y-1]} valueCount={valueCount} setValueCount={setValueCount}></BoxOne>)
    })
    return(<View style={styles.horizontal}>
        {oneBox}
      </View>
    )
  })

  return (
    <View style={styles.general}>
      <Navbar title='Name'/>
      <View>
        {horizontalView}
      </View>
    </View> 
  );











}
  const styles = StyleSheet.create({
  general: {
    paddingBottom: 20,
    marginBottom: 20
    
  },
  box: {
    color: "#841584",
    alignItems: "center",
    justifyContent: "center",
    borderColor:"green",
    borderWidth:2,
    borderStyle:"solid",
    flexDirection:"column",
    flex: 1,
    width: 30,
    height: 50
  },
  horizontal: {
    flexDirection:"row"
  },
  animation:{
    top: 50
  }
    
});
