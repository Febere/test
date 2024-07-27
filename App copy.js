import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { Navbar } from './src/Navbar';
import { NavbarS } from './src/NavbarS';
import { Add } from './src/add';
import { useState } from 'react';
import { Todo } from './src/Todo';
import {Box} from './src/Box';
import { Button, YellowBox } from 'react-native-web';
import { MyBox } from './src/MyBox';

export default function App() {
  const [pole, setPole] = useState ([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]);
  const [kapliSize, setKapliSize] = useState(new Animated.Value(0));
  const [mashtabAnimation] = useState(new Animated.Value(20));
  const AnIMG = () => {
    return (
      <TouchableOpacity style={styles.box} onPress={functionPressButton} >
        </TouchableOpacity>
    )
  }
  const startAnimationTest = async (newX, newY, X, Y) => {
    setKapliLeft(-25+(X)*50);
    setKapliTop(-29+(Y)*50);
    
    // Animated.timing(
    //   kapliSize,
    //   {
    //     toValue: 100,
    //     duration: 2000,
    //     useNativeDriver: false
    //   }
    // ).start(({ finished }) => {
    //   if (newY - 1 >= 0) { presBox(X, Y - 1);}
    //   if (newY + 1 <= 4) { presBox(X, Y + 1); }
    //   if (newX - 1 >= 0) { presBox(X - 1, Y); }
    //   if (newX + 1 <= 4) { presBox(X + 1, Y); }
    //   //setKapliSize(new Animated.Value(0))
    //   return finished;
    // }); 
  }  
  const presBox = async (X, Y, functionAnimation, kapliSizeTest, setKapliSize, valueCount, setValueCount) => {
    //let newPole =  pole.slice(0);
    let newX = X-1;
    let newY = Y-1;
    //let k = 1;
    //newPole[newY][newX] = newPole[newY][newX] +1;
    //setPole(newPole);
    
    
    if (valueCount > 2){
      //await functionAnimation()
      functionAnimation(kapliSizeTest, setKapliSize, valueCount, setValueCount)
      
      // //newPole[newY][newX] = 0;
      //functionAnimation(kapliSizeTest)
      // Animated.timing(
      //   kapliSize,
      //   {
      //     toValue: 100,
      //     duration: 1000,
      //     useNativeDriver: false
      //   }
      // ).start(({ finished }) => {
      //   // setKapliSize(new Animated.Value(0))
      //   // if (newY - 1 >= 0) { presBox(X, Y - 1), functionAnimation, kapliSizeTest, valueCount, setValueCount}
      //   // if (newY + 1 <= 4) { presBox(X, Y + 1, functionAnimation); }
      //   // if (newX - 1 >= 0) { presBox(X - 1, Y, functionAnimation); }
      //   // if (newX + 1 <= 4) { presBox(X + 1, Y, functionAnimation); }
        
      //   return 1
      // }); 

      
            //startAnimationTest(newX, newY, X, Y)  

          
           


          //
          console.log("++++")
      
    } 
    else{
      setValueCount(valueCount+1)
    }
    //setPole(newPole);
  }

  const [XY , setXY] = useState("");
  const BoxOne = props =>{
    const childRef = useRef(null); // Ссылка, которую передадим дочернему и через которую потом вызываем нужные функции дочернего
    const handleOpenModal = (value) => { // Функция тут, которая вызывает функцию из дочернего (можно убрать эту функцию)
      childRef.current.openModal(value);
  }




    const [kapliSizeTest, setKapliSizeTest] = useState(new Animated.Value(0));
    

    const functionAnimation = (kapliSizeTest, setKapliSizeTest, valueCount, setValueCount) => {
      console.log("Это голова")
       Animated.timing(
        kapliSizeTest,
        {
          toValue: 120,
          duration: 222,
          useNativeDriver: false
        }
      ).start(({ finished }) => {
        setValueCount(0)
        //setKapliSizeTest(new Animated.Value(0))


        // if (newY - 1 >= 0) { presBox(X, Y - 1, functionAnimation, kapliSizeTest); }
        // if (newY + 1 <= 4) { presBox(X, Y + 1, functionAnimation, kapliSizeTest); }
        // if (newX - 1 >= 0) { presBox(X - 1, Y, functionAnimation, kapliSizeTest); }
        // if (newX + 1 <= 4) { presBox(X + 1, Y, functionAnimation, kapliSizeTest); }




        return 1
      }); 
    }
    const functionPressButton = ()=>{



      //console.log("Нажал на кнопку внутри ячейки" );
      //setValueCount(2)
      //props.setValueCount(props.valueCount+1)
      //console.log(props.valueCount);
      //functionAnimation()
      props.fBut(props.X, props.Y, functionAnimation, kapliSizeTest, setKapliSizeTest, props.valueCount, props.setValueCount)
    }
    



    
    let mas
    mas = (props.valueCount)*12;
    let str = (props.X + "_" + props.Y);

    //console.log("!!!");
    let bW = 2
    if (props.valueCount==0) bW=0;
    setXY(str)
    //console.log(str);

    return(

            <TouchableOpacity style={styles.box} onPress={functionPressButton} >
              <View 
                style={{
                  borderRadius: 50, height: mas, width: mas, 
                  
                  backgroundColor: "black", color: "blue", borderWidth: bW,
                  borderStyle: "solid", borderColor: "green"
                }}>
                <Animated.Image
                  source={require("./src/img/test.png")}
                  style={{
                    transform: [{scale: kapliSizeTest}],
                    flex: 1, resizeMode: "center", position: "absolute",
                    width: 1, height: 1,
                    left: 15, top: 15
                  }}>
                </Animated.Image>
                
              </View>
            </TouchableOpacity>
       )

    }
  let Y = 0;
  const horizontalView = pole.map((boxGorizontal)=>{
    Y = Y + 1 ;
    let X = 0;
    const oneBox = boxGorizontal.map((box)=>{
      //console.log(Y);
      X=X+1;
      const [valueCount, setValueCount] = useState(1);
      return (<BoxOne count = {box} X={X} Y={Y} fBut = {presBox} setValueCount={setValueCount} valueCount={valueCount}> </BoxOne>)
    })
    
    return(<View style={styles.horizontal}>
        {oneBox}
      </View>
    )
  })


  return (
    <View style={styles.general}>
      <Navbar title='ИГРА!!!'/>
      <NavbarS title='Статус'/>
      <View  >
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
