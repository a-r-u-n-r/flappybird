import styled from 'styled-components'
import "./App.css"
import { useState,useEffect } from 'react';
import bgimg from './asset/flappybg.png';
import brdimg from './asset/newbirdd.png';

const BIRD_HEIGHT=60;
const GAME_WIDTH=900;
const GAME_HEIGHT=900;
const GRAVITY=10;
const JUMP_HEIGHT=70;
const OBSTACLE_WIDTH=80;
const OBSTACLE_GAP=400;

export const App = () => {
  const [birdPosition,setBirdPosition] = useState(300)
  const [birdVerticalPosition,setBirdVerticalPosition] = useState(1300)
  const [gameHasStarted,setGameHasStarted]=useState(false);
  const [obstacleHeight,setObstacleHeigh] = useState(100)
  const [obstacleLeft,setObstacleLeft] = useState(GAME_WIDTH-OBSTACLE_WIDTH)
  const [score,setScore] = useState(0)

const bottomObstacleHeight=GAME_HEIGHT-OBSTACLE_GAP-obstacleHeight;



  useEffect(() => {
let timeId;
if(birdPosition<GAME_HEIGHT-BIRD_HEIGHT){
  timeId=setInterval(()=>{
    setBirdPosition((birdPosition)=>birdPosition+GRAVITY);
  },24)
}

    return () => {
     clearInterval(timeId);
    };
  },[birdPosition,gameHasStarted]);

  useEffect(()=>{
    let  obstacleId;
    if(gameHasStarted && obstacleLeft>=-OBSTACLE_WIDTH){
      obstacleId=setInterval(()=>{
        setObstacleLeft((obstacleLeft)=>obstacleLeft-20)
      },24);

      return()=>{
        clearInterval(obstacleId);
      };
    }
    else{
      setObstacleLeft(GAME_WIDTH-OBSTACLE_WIDTH);
      setObstacleHeigh(Math.floor(Math.random()  *             (GAME_HEIGHT-OBSTACLE_GAP)));
if(gameHasStarted){
      setScore(score=>score+1)
    }}
  },[gameHasStarted,obstacleLeft],24);

  useEffect(()=>{
    const hasCollideWithTopObstacle=birdPosition>=0 && birdPosition < obstacleHeight;
    const hasCollideWithBottomObstacle= birdPosition <=900 && birdPosition >=900- bottomObstacleHeight;
    if(
      obstacleLeft>=0 && obstacleLeft<=260 && 
      
      (hasCollideWithTopObstacle || hasCollideWithBottomObstacle)){
      setGameHasStarted(false);  
    }
  },[birdPosition,obstacleHeight,bottomObstacleHeight,obstacleLeft],1);

  useEffect(()=>{
    const roofhit =  birdPosition===60;
    const bottomhit = birdPosition===840;

    if(
     obstacleLeft>400 && 
      
      (roofhit||
        bottomhit)){
      setGameHasStarted(false);
    }
  },[birdPosition,obstacleLeft],24);

  
 
  const handleClick=()=>{
    let newBirdPosition=birdPosition-JUMP_HEIGHT;
   
    if(newBirdPosition<0){
      setBirdPosition(0);
    }else{
      setBirdPosition(newBirdPosition)
    };
  };
  
  const restart=()=>{
    if(!gameHasStarted){
      setBirdPosition(300);
      setGameHasStarted(true);
      setScore(0);
    }
  }

  return (
    <div className='App'>
      
      <Div onClick={handleClick}>
      <a className='lquote'>Lets Pass Through The Way</a>
      <h1>Flappy Bird</h1>
        
        <GameBox height={GAME_HEIGHT} width={GAME_WIDTH}>
 
          <Obstacle
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
          />
           <Obstacle
          top={GAME_HEIGHT-(obstacleHeight+bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
          />
          {gameHasStarted &&
          <h3>Score:{score}</h3>}
          {!gameHasStarted  &&
        <h2>
         GAME OVER
         <br></br>
        
         <h2>score : {score}</h2>
       
         
        </h2>       
      }
        <Bird top={birdPosition} right={birdVerticalPosition}></Bird>
        </GameBox>
        <p>make your free time Engaged</p>
        <p className='quote'>Break Your Record !</p>
       
      </Div>
      
      <button onClick={restart}>START</button>
    </div>
 
  )
}
export default App;

const Bird= styled.div`
position: absolute;
background:url(${brdimg});
height:60px;
width:100px;
backgroung-color:red;
top:${(props)=>props.top}px;
right:${(props)=>props.right}px;
border-radius:50%;
`;


const Div=styled.div`
display:flex;
width:100%;
justify-content:center;
`;

const GameBox=styled.div`
height:${(props)=>props.height}px;
width:${(props)=>props.width}px;
background:url(${bgimg});
overflow:hidden;
`;
const Obstacle=styled.div`
position:relative;
top:${(props)=>props.top}px;
width:${(props)=>props.width}px;
height:${(props)=>props.height}px;
left:${(props)=>props.left}px;
background-color:green;

`

