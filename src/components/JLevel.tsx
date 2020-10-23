import React, { useState } from 'react';
import './styles/JLevel.scss';
import back from '../assets/JLevelAssets/back.png';
import lhall from '../assets/JLevelAssets/halll.png';
import rhall from '../assets/JLevelAssets/hallr.png';
import ldoor from '../assets/JLevelAssets/doorl.png';
import rdoor from '../assets/JLevelAssets/doorr.png';
import ghost from '../assets/JLevelAssets/ghost.png';

interface Space {
  front: string;
  left: string;
  right: string;
  floor: string;
}

class JLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      px: 0,
      py: 0,
      pdir: 1, // 0 north, 1 east, 2 south, 3 west
    };
  }
}

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

function RenderFront(): JSX.Element {
  return <img className='back' src={back} />;
}

function RenderGhost(): JSX.Element {
  return <img className='leftImg' src={ghost} />;
}

function RenderSpace(space): JSX.Element {
  return (
    <div className='cont2'>
      <RenderFront />
      {space.left != 'w' && RenderLeft(space.left)}
      {space.right != 'w' && RenderRight(space.right)}
    </div>
  );
}

function RenderHallHelper(spaces): JSX.Element {
  return (
    <div className='cont2'>
      {RenderFront()}
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
      {RenderFront()}
      {RenderLeft(spaces[0])}
      {RenderRight(spaces[0])}
      {(spaces.length != 1) && RenderHallHelper(spaces.slice(1))}
      {(spaces[0].floor == 'g') && RenderGhost()}
    </div>
  );
}

function View(): JSX.Element {
  var space1 = {front:'', left:'h', right:'d', floor:''};
  var space2 = {front:'', left:'d', right:'h', floor:'g'};
  var space3 = {front:'', left:'h', right:'d', floor:''};
  var space4 = {front:'', left:'d', right:'h', floor:''};
  var spaces = [space1, space2, space3, space4];
  return (
    RenderHall(spaces)
  );
}

export default View;