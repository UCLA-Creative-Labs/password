import React from 'react';
import './styles/Header.scss';

interface HeaderProps {
  signOut: () => void;
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <div id='header'>
      <button id='signout' onClick={props.signOut}>Sign Out</button>
    </div>
  );
}

export default Header;
