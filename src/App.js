import {useState, useEffect} from "react"
import Cube from "./components/Cube.js"
import Header from "./components/Header.js"

function App() {
  const min = 1;
  const max = 6;
  const numDice = 10;
  const [cubeArr, changeCubes] = useState([])
  const [boardClear, boardStatus] = useState(false) 
  
  function lockValue(cubeId){
    let newArr = cubeArr.map(x => {
      if(x.cubeId === cubeId){
        let val = x.set;
        x.set = !val;
      }
      return x;
    })
    changeCubes(newArr);
    if(checkWin()){
      boardStatus(true);
    }
  }

  function rollDice(){
    if(boardClear){
      resetBoard();
    }
    let newArr = cubeArr.map(x => {
      if(!x.set){
        x.number = Math.floor(Math.random() * (max - min) + min);
      }
      return x;
    })
    changeCubes(newArr);
  }
  function resetBoard(){
    let newArr = cubeArr.map(x => {
      x.set = !x.set;
      return x;
    })
    changeCubes(newArr);
    boardStatus(false);
  }

  function checkWin(){
    let prev = cubeArr[0];
    for(let i = 0; i < cubeArr.length; i++){
      if(!cubeArr[i].set){
        return false;
      }
      if(prev.number !== cubeArr[i].number){
        return false;
      }
      prev = cubeArr[i];
    }
    return true;
  }

  useEffect(()=>{
    let initialCubes = [];
    for(let i=0; i < numDice; i++){
      initialCubes.push({number:(Math.floor(Math.random() * (max - min) + min)),cubeId:i,set:false});
    }
    
     changeCubes(initialCubes)
  },[])
  
  let cubes = cubeArr.map(x => {
    return <Cube number={x.number} cubeId={x.cubeId} lock={lockValue} isLocked={x.set} key={x.cubeId}/>
  })
  return (
    <div className='main'>
      <Header />
       
       <div className='diceHolder'>
        {cubes}
       </div>
       <div className='btn-div'>
       <button className='btn' onClick={rollDice}>
        {boardClear ? `Play Again` : `Roll Dice!` }</button>
       </div>
    </div>
  );
}

export default App;
