import React, { useState } from 'react';
import './styles/JLevel.scss';
import back from '../assets/JLevelAssets/liminalback.png';
import lhall from '../assets/JLevelAssets/liminaldoorway.png';
import rhall from '../assets/JLevelAssets/rhall.png';
import ldoor from '../assets/JLevelAssets/liminaldoor.png';
import rdoor from '../assets/JLevelAssets/liminaldoorr.png';

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
  switch(props.sprite) {
    case d:
      return <img className='leftImg' src={ldoor} />;
    case h:
      return <img className='leftImg' src={lhall} />;
  }
}

function RenderRight(props): JSX.Element {
  switch(props.sprite) {
    case d:
      return <img className='rightImg' src={rdoor} />;
    case h:
      return <img className='rightImg' src={rhall} />;
  }
}

function RenderFront(): JSX.Element {
  return <img className='back' src={back} />;
}

function RenderSpace(space): JSX.Element {
  return (
    <div>
     <RenderFront />
      {space.left != 'w' && RenderLeft(space.left)}
      {space.right != 'w' && RenderRight(space.right)}
    </div>
  );
}

function View(props): JSX.Element {
  return (
    <div className='imgCont'>
      <img className='back' src={back} />
      <div className='cont2'>
        <img className='back' src={back} />
	<div className='cont2'>
	  <img className='back' src={back} />
	  <img className='leftImg' src={lhall} />
	  <img className='rightImg' src={rhall} />
	  <div className='cont2'>
	    <img className='back' src={back} />
	    <div className='cont2'>
	      <img className='back' src={back} />
	      <img className='leftImg' src={lhall} />
	      <img className='rightImg' src={rhall} />
	    </div>
	  </div>
	</div>
      </div>
      <img className='leftImg' src={lhall} />
      <img className='rightImg' src={rhall} />
    </div>
  );
}

export default View;