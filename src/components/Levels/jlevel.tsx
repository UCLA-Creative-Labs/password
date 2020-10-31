import React, { useState } from 'react';
import Level from '../Levels';
import '../styles/JLevel.scss';
import back from '../../assets/JLevelAssets/back.png';
import lhall from '../../assets/JLevelAssets/halll.png';
import rhall from '../../assets/JLevelAssets/hallr.png';
import ldoor from '../../assets/JLevelAssets/doorl.png';
import rdoor from '../../assets/JLevelAssets/doorr.png';
import fdoor from '../../assets/JLevelAssets/doorf.png';
import ghost from '../../assets/JLevelAssets/ghost.png';
import key from '../../assets/JLevelAssets/key.png';

interface Space {
  up: string;
  left: string;
  right: string;
  down: string;
  floor: string;
}


export default function JLevel(): JSX.Element {
  
  var room1 = {up:'w', left:'w', right:'h', down:'h', floor:'e'};
  var room2 = {up:'w', left:'h', right:'h', down:'w', floor:'e'};
  var room3 = {up:'w', left:'h', right:'h', down:'h', floor:'e'};
  var room4 = {up:'w', left:'h', right:'w', down:'h', floor:'e'};
  var room5 = {up:'w', left:'w', right:'w', down:'w', floor:'e'};
  var room6 = {up:'h', left:'w', right:'w', down:'h', floor:'e'};
  var room7 = {up:'w', left:'w', right:'h', down:'h', floor:'e'};
  var room8 = {up:'h', left:'h', right:'w', down:'w', floor:'e'};
  var room9 = {up:'h', left:'w', right:'h', down:'w', floor:'e'};
  var room10 = {up:'d', left:'h', right:'d', down:'d', floor:'g'};
  var room11 = {up:'h', left:'w', right:'h', down:'h', floor:'e'};
  var room12 = {up:'w', left:'h', right:'h', down:'w', floor:'e'};
  var room13 = {up:'w', left:'h', right:'w', down:'h', floor:'e'};
  var room14 = {up:'w', left:'w', right:'w', down:'w', floor:'e'};
  var room15 = {up:'w', left:'w', right:'w', down:'w', floor:'e'};
  var room16 = {up:'h', left:'w', right:'w', down:'h', floor:'e'};
  var room17 = {up:'w', left:'w', right:'w', down:'w', floor:'e'};
  var room18 = {up:'h', left:'w', right:'w', down:'h', floor:'e'};
  var room19 = {up:'w', left:'w', right:'w', down:'w', floor:'e'};
  var room20 = {up:'w', left:'w', right:'w', down:'h', floor:'e'};
  var room21 = {up:'h', left:'w', right:'h', down:'w', floor:'p'};
  var room22 = {up:'w', left:'h', right:'h', down:'w', floor:'e'};
  var room23 = {up:'h', left:'h', right:'h', down:'w', floor:'e'};
  var room24 = {up:'w', left:'h', right:'h', down:'w', floor:'e'};
  var room25 = {up:'h', left:'h', right:'w', down:'w', floor:'e'};
  var map = [[room1,  room2,  room3,  room4,  room5 ],
      	     [room6,  room7,  room8,  room9,  room10],
	     [room11, room12, room13, room14, room15],
	     [room16, room17, room18, room19, room20],
	     [room21, room22, room23, room24, room25]];
  const [board, setBoard] = useState(map);
  const [hall, setHall] = useState(GetHall(map, 'l'));
  const [dir, setDir] = useState('l');
  const [isCompleted, setIsCompleted] = useState(false);

function RenderLeft(props): JSX.Element {
  switch(props.left) {
    case 'd':
      return <img className='leftImg' src={ldoor} />;
    case 'h':
      return <img className='leftImg' src={lhall} />;
  }
}

function RenderRight(props): JSX.Element {
  switch(props.right) {
    case 'd':
      return <img className='rightImg' src={rdoor} />;
    case 'h':
      return <img className='rightImg' src={rhall} />;
  }
}

function RenderUp(): JSX.Element {
  return <img className='back' src={back} />;
}

function RenderFront(space): JSX.Element {
  if(space.up == 'd'){
    return <img className='leftImg' src={fdoor} />;
  } else if(space.floor == 'k'){
    return <img className='leftImg' src={key} />;
  }
}

function RenderGhost(): JSX.Element {
  return <img className='leftImg' src={ghost} />;
}

function RenderBanner(): JSX.Element {
  switch(banner){
  case 'k':
    return <img className='leftImg' src={keyBanner} />;
  case 'g':
    return 
  }
}

function RenderSpace(space): JSX.Element {
  return (
    <div className='cont2'>
      <RenderUp />
      {space.left != 'w' && RenderLeft(space.left)}
      {space.right != 'w' && RenderRight(space.right)}
    </div>
  );
}

function RenderHallHelper(spaces): JSX.Element {
  return (
    <div className='cont2'>
      {RenderUp()}
      {RenderFront(spaces[0])}
      {RenderLeft(spaces[0])}
      {RenderRight(spaces[0])}
      {(spaces.length != 1) && RenderHallHelper(spaces.slice(1))}
      {(spaces[0].floor == 'g') && RenderGhost()}
    </div>
  );
}

function RenderHall(spaces): JSX.Element {
  return (
    <div className='imgCont'>
      {RenderUp()}
      {RenderLeft(spaces[0])}
      {RenderRight(spaces[0])}
      {(spaces.length != 1) && RenderHallHelper(spaces.slice(1))}
      {(spaces[0].floor == 'g') && RenderGhost()}
    </div>
  );
}

function FlipSpace(space, dir){
  var spacef;
  switch(dir){
    case 'd':
      spacef = {up: space.down, left: space.right, right: space.left,
       down: space.up, floor: space.floor};
      break;
    case 'u':
      spacef = space;
      break;
    case 'l':
      spacef = {up: space.left, left: space.down, right: space.up,
       down: space.right, floor: space.floor};
      break;
    case 'r':
      spacef = {up: space.right, left: space.up, right: space.down,
       down: space.left, floor: space.floor};
      break;
  }
  return spacef;
}

function GetHall(m, direction){
  var pr = 0;
  var pc = 0;
  var hall = [];
  var board = CopyMap(m);

  for(var i=0; i<board.length; i++){
    for(var j=0; j<board[i].length; j++){
      if(board[i][j].floor == 'p'){
        pr = i;
	pc = j;
      }
    }
  }

  if(direction == 'd'){
    hall.push(FlipSpace(board[pr][pc], direction));
    for(var i=pr+1; i<board.length; i++){
      var square = board[i][pc];
      if(square.up == 'h'){   
        hall.push(FlipSpace(square, direction));
      } else {
        break;
      }
    }
  }else if(direction =='u'){
    hall.push(board[pr][pc]);
    for(var i=pr-1; i>-1; i--){
      var square = board[i][pc];
      if(square.down == 'h'){
        hall.push(square);
      } else {
        break;
      }
    }
  }else if(direction =='r'){
    hall.push(FlipSpace(board[pr][pc], direction));
    for(var j=pc+1; j<board[pr].length; j++){
      var square = board[pr][j];
      if(square.left == 'h'){
        hall.push(FlipSpace(square, direction));
      } else {
        break;
      }
    }
  }else if(direction == 'l'){
    hall.push(FlipSpace(board[pr][pc], direction));
    for(var j=pc-1; j>-1; j--){
      var square = board[pr][j];
      if(square.right == 'h'){
        hall.push(FlipSpace(square, direction));
      } else {
        break;
      }
    }
  }
  return hall;
}

function ClearSpace(space){
  var nspace = {up: space.up, left: space.left, right: space.right,
    down: space.down, floor: 'e'};
  return nspace;
}

function PutPlayer(space){
  var nspace = {up: space.up, left: space.left, right: space.right,
    down: space.down, floor: 'p'};
  return nspace;
}

function PutGhost(space){
  var nspace = {up: space.up, left: space.left, right: space.right,
    down: space.down, floor: 'g'};
  return nspace;
}

function PutAt(put, at){
  var space = at;
  space.floor = put;
  return space;
}

function GetPlayerPos(board){
  var r,c;
  for(var i=0; i<board.length; i++){
    for(var j=0; j<board[i].length; j++){
      if(board[i][j].floor == 'p'){
        r = i;
	c = j;
      }
    }
  }
  return {r:r, c:c};
}

function GetGhostPos(board){
  var r,c;
  for(var i=0; i<board.length; i++){
    for(var j=0; j<board[i].length; j++){
      if(board[i][j].floor == 'g'){
        r = i;
	c = j;
      }
    }
  }
  return {r:r, c:c};
}

function MoveGhost(m){
  var moves = [];
  var map = CopyMap(m);
  
  if(Math.floor(Math.random()*2) == 1){
    var r = Math.floor(Math.random()*5);
    var c = Math.floor(Math.random()*5);
    if(map[r][c].floor == 'e'){
      map[r][c].floor = 'g';
    }
  }

  return map;
}

function MovePlayer(m, dir){
  var pr = GetPlayerPos(m).r;
  var pc = GetPlayerPos(m).c;
  var map = CopyMap(m);

  switch(dir){
  case 'l':
    if(map[pr][pc].left == 'h'){
      map[pr][pc-1].floor = 'p';
      map[pr][pc].floor = 'e';
    } else if(map[pr][pc].left == 'd'){
      Win();
    }
    return map;
  case 'r':
    if(map[pr][pc].right == 'h'){
      map[pr][pc+1].floor = 'p';
      map[pr][pc].floor = 'e';
    } else if(map[pr][pc].right == 'd'){
      Win();
    }
    return map;
  case 'u':
    if(map[pr][pc].up == 'h'){
      map[pr-1][pc].floor = 'p';
      map[pr][pc].floor = 'e';
    } else if(map[pr][pc].up == 'd'){
      Win();
    }
    return map;
  case 'd':
    if(map[pr][pc].down == 'h'){
      map[pr+1][pc].floor = 'p';
      map[pr][pc].floor = 'e';
    } else if(map[pr][pc].down == 'd'){
      Win();
    }
    return map;
  }
}

function Win(){
  this.setIsCompleted(true);
}

function GetLeft(old){
  switch(old){
    case 'l':
      return 'd';
    case 'd':
      return 'r';
    case 'r':
      return 'u';
    case 'u':
      return 'l';
    default:
      return 'l';
  }
}

function GetRight(old){
  switch(old){
    case 'l':
      return 'u';
    case 'd':
      return 'l';
    case 'r':
      return 'd';
    case 'u':
      return 'r';
    default:
      return 'l';
  }
}

function GetBehind(old){
  switch(old){
    case 'l':
      return 'r';
    case 'd':
      return 'u';
    case 'r':
      return 'l';
    case 'u':
      return 'd';
    default:
      return 'l';
  }
}


function GetDir(old, d){
  switch(d){
  case 'l':
    return GetLeft(old);
  case 'r':
    return GetRight(old);
  case 'd':
    return GetBehind(old);
  default:
    return 'l';
  }
}

function CopySpace(space){
  return {up:space.up, left:space.left, right:space.right, down:space.down, floor:space.floor};
}

function CopyMap(map){
  var newMap = [];
  for(var i = 0; i < map.length; i++){
  var row = [];
    for(var j = 0; j < map[i].length; j++){
      row.push(CopySpace(map[i][j]));
    }
    newMap.push(row);
  }

  return newMap;
}

function CanMoveDir(space, dir) {
  switch(dir){
  case 'l':
    return (space.left == 'h');
  case 'r':
    return (space.right == 'h');
  case 'u':
    return (space.up == 'h');
  case 'd':
    return (space.down == 'h');
  default:
    false;
  }
}


  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'maze'}
      nextLevelUrl={'level1'}>
    <div>
      {RenderHall(hall)}
      <button className='walkBtn' onClick={()=>{
        var r = GetPlayerPos(board).r;
	var c = GetPlayerPos(board).c;
	if(CanMoveDir(board[r][c], dir)){
          var b = MovePlayer(board, dir);
          setHall(GetHall(b, dir));
	  setBoard(b);
	}
      }}>
        Walk Forward
      </button>
      <button className='walkLeftBtn' onClick={()=>{
        var r = GetPlayerPos(board).r;
	var c = GetPlayerPos(board).c;
        var d = GetDir(dir, 'l');
	if(CanMoveDir(board[r][c], d)){
          var b = MoveGhost(MovePlayer(board, d));
          setHall(GetHall(b, d));
	  setDir(d);
	  setBoard(b);
	}
      }}>
        Walk Left
      </button>
      <button className='walkRightBtn' onClick={()=>{
        var r = GetPlayerPos(board).r;
	var c = GetPlayerPos(board).c;
	if(c == 5 && r == 1){
	  
        }
        var d = GetDir(dir, 'r');
	if(CanMoveDir(board[r][c], d)){
	  var b = MoveGhost(MovePlayer(board, d));
          setHall(GetHall(b, d));
	  setDir(d);
	  setBoard(b);
	}
      }}>
        Walk Right
      </button>
      <button className='turnAroundBtn' onClick={()=>{
        var d = GetDir(dir, 'd');
	setHall(GetHall(board, d));
	setDir(d);
      }}>
        Turn Around
      </button>
    </div>
    </Level>
  );
}