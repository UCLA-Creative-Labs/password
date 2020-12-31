import React, { useState } from 'react';
import '../styles/JLevel.scss';
import back from '../../assets/JLevelAssets/back.png';
import fdoor from '../../assets/JLevelAssets/doorf.png';
import ldoor from '../../assets/JLevelAssets/doorl.png';
import rdoor from '../../assets/JLevelAssets/doorr.png';
import ghost from '../../assets/JLevelAssets/ghost.png';
import lhall from '../../assets/JLevelAssets/halll.png';
import rhall from '../../assets/JLevelAssets/hallr.png';
import Level from '../Levels';

interface Space {
  up: string;
  left: string;
  right: string;
  down: string;
  floor: string;
}

export default function JLevel(): JSX.Element {
  const room1 = { up: 'w', left: 'w', right: 'h', down: 'h', floor: 'e' };
  const room2 = { up: 'w', left: 'h', right: 'h', down: 'w', floor: 'e' };
  const room3 = { up: 'w', left: 'h', right: 'h', down: 'h', floor: 'e' };
  const room4 = { up: 'w', left: 'h', right: 'w', down: 'h', floor: 'e' };
  const room5 = { up: 'w', left: 'w', right: 'w', down: 'w', floor: 'e' };
  const room6 = { up: 'h', left: 'w', right: 'w', down: 'h', floor: 'e' };
  const room7 = { up: 'w', left: 'w', right: 'h', down: 'h', floor: 'e' };
  const room8 = { up: 'h', left: 'h', right: 'w', down: 'w', floor: 'e' };
  const room9 = { up: 'h', left: 'w', right: 'h', down: 'w', floor: 'e' };
  const room10 = { up: 'd', left: 'h', right: 'd', down: 'd', floor: 'g' };
  const room11 = { up: 'h', left: 'w', right: 'h', down: 'h', floor: 'e' };
  const room12 = { up: 'w', left: 'h', right: 'h', down: 'w', floor: 'e' };
  const room13 = { up: 'w', left: 'h', right: 'w', down: 'h', floor: 'e' };
  const room14 = { up: 'w', left: 'w', right: 'w', down: 'w', floor: 'e' };
  const room15 = { up: 'w', left: 'w', right: 'w', down: 'w', floor: 'e' };
  const room16 = { up: 'h', left: 'w', right: 'w', down: 'h', floor: 'e' };
  const room17 = { up: 'w', left: 'w', right: 'w', down: 'w', floor: 'e' };
  const room18 = { up: 'h', left: 'w', right: 'w', down: 'h', floor: 'e' };
  const room19 = { up: 'w', left: 'w', right: 'w', down: 'w', floor: 'e' };
  const room20 = { up: 'w', left: 'w', right: 'w', down: 'h', floor: 'e' };
  const room21 = { up: 'h', left: 'w', right: 'h', down: 'w', floor: 'p' };
  const room22 = { up: 'w', left: 'h', right: 'h', down: 'w', floor: 'e' };
  const room23 = { up: 'h', left: 'h', right: 'h', down: 'w', floor: 'e' };
  const room24 = { up: 'w', left: 'h', right: 'h', down: 'w', floor: 'e' };
  const room25 = { up: 'h', left: 'h', right: 'w', down: 'w', floor: 'e' };
  const map = [
    [room1, room2, room3, room4, room5],
    [room6, room7, room8, room9, room10],
    [room11, room12, room13, room14, room15],
    [room16, room17, room18, room19, room20],
    [room21, room22, room23, room24, room25],
  ];
  const [board, setBoard] = useState(map);
  const [hall, setHall] = useState(GetHall(map, 'l'));
  const [dir, setDir] = useState('l');
  const [isCompleted, setIsCompleted] = useState(false);

  function RenderLeft(props: space): JSX.Element {
    switch (props.left) {
      case 'd':
        return <img className="leftImg" src={ldoor} />;
      case 'h':
        return <img className="leftImg" src={lhall} />;
    }
  }

  function RenderRight(props: space): JSX.Element {
    switch (props.right) {
      case 'd':
        return <img className="rightImg" src={rdoor} />;
      case 'h':
        return <img className="rightImg" src={rhall} />;
    }
  }

  function RenderUp(): JSX.Element {
    return <img className="back" src={back} />;
  }

  function RenderFront(space): JSX.Element {
    if (space.up == 'd') {
      return <img className="leftImg" src={fdoor} />;
    }
  }

  function RenderGhost(): JSX.Element {
    return <img className="leftImg" src={ghost} />;
  }

  function RenderHallHelper(spaces): JSX.Element {
    return (
      <div className="cont2">
        {RenderUp()}
        {RenderFront(spaces[0])}
        {RenderLeft(spaces[0])}
        {RenderRight(spaces[0])}
        {spaces.length != 1 && RenderHallHelper(spaces.slice(1))}
        {spaces[0].floor == 'g' && RenderGhost()}
      </div>
    );
  }

  function RenderHall(spaces): JSX.Element {
    return (
      <div className="imgCont">
        {RenderUp()}
        {RenderLeft(spaces[0])}
        {RenderRight(spaces[0])}
        {spaces.length != 1 && RenderHallHelper(spaces.slice(1))}
        {spaces[0].floor == 'g' && RenderGhost()}
      </div>
    );
  }

  function FlipSpace(space, dr) {
    let spacef = space;
    switch (dr) {
      case 'd':
        spacef = {
          up: space.down,
          left: space.right,
          right: space.left,
          down: space.up,
          floor: space.floor,
        };
        break;
      case 'u':
        spacef = space;
        break;
      case 'l':
        spacef = {
          up: space.left,
          left: space.down,
          right: space.up,
          down: space.right,
          floor: space.floor,
        };
        break;
      case 'r':
        spacef = {
          up: space.right,
          left: space.up,
          right: space.down,
          down: space.left,
          floor: space.floor,
        };
        break;
    }
    return spacef;
  }

  function GetHall(m, direction) {
    let pr = 0;
    let pc = 0;
    // tslint:disable-next-line
    let h = [];
    h = [];
    const b = CopyMap(m);

    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < b[i].length; j++) {
        if (b[i][j].floor == 'p') {
          pr = i;
          pc = j;
        }
      }
    }

    if (direction == 'd') {
      h.push(FlipSpace(b[pr][pc], direction));
      for (let i = pr + 1; i < b.length; i++) {
        const square = b[i][pc];
        if (square.up == 'h') {
          h.push(FlipSpace(square, direction));
        } else {
          break;
        }
      }
    } else if (direction == 'u') {
      h.push(board[pr][pc]);
      for (let i = pr - 1; i > -1; i--) {
        const square = b[i][pc];
        if (square.down == 'h') {
          h.push(square);
        } else {
          break;
        }
      }
    } else if (direction == 'r') {
      h.push(FlipSpace(b[pr][pc], direction));
      for (let j = pc + 1; j < b[pr].length; j++) {
        const square = b[pr][j];
        if (square.left == 'h') {
          h.push(FlipSpace(square, direction));
        } else {
          break;
        }
      }
    } else if (direction == 'l') {
      h.push(FlipSpace(b[pr][pc], direction));
      for (let j = pc - 1; j > -1; j--) {
        const square = b[pr][j];
        if (square.right == 'h') {
          h.push(FlipSpace(square, direction));
        } else {
          break;
        }
      }
    }
    return h;
  }

  function GetPlayerPos(b) {
    let r = 0;
    let c = 0;
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < b[i].length; j++) {
        if (b[i][j].floor == 'p') {
          r = i;
          c = j;
        }
      }
    }
    return { r: r, c: c };
  }

  function MoveGhost(m) {
    const b = CopyMap(m);
    if (Math.floor(Math.random() * 2) == 1) {
      const r = Math.floor(Math.random() * 5);
      const c = Math.floor(Math.random() * 5);
      if (b[r][c].floor == 'e') {
        b[r][c].floor = 'g';
      }
    }
    return b;
  }

  function MovePlayer(m, dr) {
    const pr = GetPlayerPos(m).r;
    const pc = GetPlayerPos(m).c;
    // tslint:disable-next-line
    let b = CopyMap(m);
    b = CopyMap(m);
    switch (dr) {
      case 'l':
        if (b[pr][pc].left == 'h') {
          b[pr][pc - 1].floor = 'p';
          b[pr][pc].floor = 'e';
        } else if (b[pr][pc].left == 'd') {
          Win();
        }
        return b;
      case 'r':
        if (b[pr][pc].right == 'h') {
          b[pr][pc + 1].floor = 'p';
          b[pr][pc].floor = 'e';
        } else if (b[pr][pc].right == 'd') {
          Win();
        }
        return b;
      case 'u':
        if (b[pr][pc].up == 'h') {
          b[pr - 1][pc].floor = 'p';
          b[pr][pc].floor = 'e';
        } else if (b[pr][pc].up == 'd') {
          Win();
        }
        return b;
      case 'd':
        if (b[pr][pc].down == 'h') {
          b[pr + 1][pc].floor = 'p';
          b[pr][pc].floor = 'e';
        } else if (b[pr][pc].down == 'd') {
          Win();
        }
        return b;
    }
  }

  function Win() {
    setIsCompleted(true);
  }

  function GetLeft(old) {
    switch (old) {
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

  function GetRight(old) {
    switch (old) {
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

  function GetBehind(old) {
    switch (old) {
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

  function GetDir(old, d) {
    switch (d) {
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

  function CopySpace(space) {
    return {
      up: space.up,
      left: space.left,
      right: space.right,
      down: space.down,
      floor: space.floor,
    };
  }

  function CopyMap(m) {
    // tslint:disable-next-line
    let newMap = [];
    newMap = [];
    for (let i = 0; i < m.length; i++) {
      // tslint:disable-next-line
      let row = [];
      row = [];
      for (let j = 0; j < m[i].length; j++) {
        row.push(CopySpace(m[i][j]));
      }
      newMap.push(row);
    }
    return newMap;
  }

  function CanMoveDir(space, dr) {
    switch (dr) {
      case 'l':
        return space.left == 'h';
      case 'r':
        return space.right == 'h';
      case 'u':
        return space.up == 'h';
      case 'd':
        return space.down == 'h';
      default:
        false;
    }
  }

  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'maze'}
      nextLevelUrl={'maze'}
    >
      <div>
        {RenderHall(hall)}
        <button
          className="walkBtn"
          onClick={() => {
            const r = GetPlayerPos(board).r;
            const c = GetPlayerPos(board).c;
            if (CanMoveDir(board[r][c], dir)) {
              const b = MovePlayer(board, dir);
              setHall(GetHall(b, dir));
              setBoard(b);
            }
          }}
        >
          Walk Forward
        </button>
        <button
          className="walkLeftBtn"
          onClick={() => {
            const r = GetPlayerPos(board).r;
            const c = GetPlayerPos(board).c;
            if (c == 5 && r == 1) {
              Win();
            }
            const d = GetDir(dir, 'l');
            if (CanMoveDir(board[r][c], d)) {
              const b = MoveGhost(MovePlayer(board, d));
              setHall(GetHall(b, d));
              setDir(d);
              setBoard(b);
            }
          }}
        >
          Walk Left
        </button>
        <button
          className="walkRightBtn"
          onClick={() => {
            const r = GetPlayerPos(board).r;
            const c = GetPlayerPos(board).c;
            if (c == 5 && r == 1) {
              Win();
            }
            const d = GetDir(dir, 'r');
            if (CanMoveDir(board[r][c], d)) {
              const b = MoveGhost(MovePlayer(board, d));
              setHall(GetHall(b, d));
              setDir(d);
              setBoard(b);
            }
          }}
        >
          Walk Right
        </button>
        <button
          className="turnAroundBtn"
          onClick={() => {
            const d = GetDir(dir, 'd');
            setHall(GetHall(board, d));
            setDir(d);
          }}
        >
          Turn Around
        </button>
      </div>
    </Level>
  );
}
