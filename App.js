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
  let pole = [
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  let poleSecond = [
    [1, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];
  const BoxOne = forwardRef((props, ref) =>{
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

    const BoxOneSetValueCount = props.setValueCount
    const BoxOneValueCount = props.valueCount

    
    const [imgSize, setImgSize] = useState(new Animated.Value(0));
    async function addS (Xadr, Yadr) {
      await poleSecond[Xadr][Yadr].current.doSomething();
      return 1
    }

    useImperativeHandle(ref, () => ({ 
      CountValue:  () => {
        //console.log(pole[X][Y])
        return props.valueCount;
      },
      doSomething:  async () => {
        const BoxOneValueCount =  await poleSecond[X][Y].current.CountValue();
        if (BoxOneValueCount>=3){
          Animated.timing(
            imgSize,
            {
              toValue: 120,
              duration: 1200,
              useNativeDriver: false
            }
          ).start(async ({ finished }) => {
          BoxOneSetValueCount(0);
          if (X>0) {await addS(X-1, Y)} 
          if (X<4) {await addS(X+1, Y)}
          // При вызове этих двух функций происходит увеличение значения,
          // хранимого в этих ячйках и если значение превысит 3, то соседние ячейки
          // должны также увелить свое значение
          // Вот если ячейка увеличивается до 4, то она увеличивает соседние
          // В соседних значение было 3, соответсвенно они тоже увеличивают соседние
          // И получается, что две ячейки должны два раза увеличить значение первой ячейки
          // запусившей цепочку, которая находится между ними
          // Сейчас получается что запускаются две этих функции, 
          // но увеличивают значение первой ячейки только раз.
          // Я так понимаю это происходит потому, что при вызове этих функции
          // первая еще не изменила значение ячейки как уже вторая изменяет
          })
        } else {
          await BoxOneSetValueCount(BoxOneValueCount+1)
        }
      }
     })), [];


     let mas = BoxOneValueCount *12;
     let bW = 2
     if (BoxOneValueCount ==0) bW=0;


    const Add = () => {
      poleSecond[X][Y].current.doSomething();

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
          transform: [{scale: imgSize}],
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
      <View>
        {horizontalView}
      </View>
    </View> 
  );

}
  const styles = StyleSheet.create({
  general: {
    paddingBottom: 20,
    marginBottom: 20,
    width: 300,
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
