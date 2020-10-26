// Identical to level1 except function name and export.
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Countdown from 'react-countdown';
import car from '../assets/typeracercar.jpg';

const prompts = [
  'All my life, my parents have told me not to open the basement door, but I got curious and disobeyed them...What is that glowing ball in the sky and why does it hurt my eyes?',
  "...she said last time, we're stuck in a time loop...Which really pisses me off because that's what...",
  "Please, take me instead! I scream, grabbing at the two men who took my child. Sorry ma'am, children only” they said, as they continue loading up the last lifeboat on the ship.",
  '"Ah, so it\'s 2020" the time traveller said. "Very early in from the looks of it," he muttered under his breath.',
  "Tinder is completely useless, and I don't have a single match. If I don't find another way to start a campfire tonight. I'll free to death.",
  "It's been almost a decade since I last saw my mother. And she still reminds me every day that if I misbehave again she'll take my hearing too.",
  "They say we have a primal sense, that we can just feel when someone is watching us. It's been a few weeks, and it's clear that you do not have that sense.",
];
interface LevelProps {
  name: string;
  nextLevel: string;
}

interface RaceTrackProps {
  setRestart?: React.Dispatch<React.SetStateAction<boolean>>;
}
const RaceTrack = React.memo(({ setRestart }: RaceTrackProps) => {
  return (
    <div id="RaceTrack">
      <img
        src={car}
        style={{
          width: '58px',
          height: '24px',
          border: '0',
          display: 'inline-block',
        }}
      ></img>
      {setRestart && (
        <Countdown
          renderer={({ seconds, completed }) => {
            if (completed) {
              return (
                <span style={{ position: 'absolute', width: '100%' }}>
                  <p
                    style={{
                      textAlign: 'center',
                      margin: '2px',
                      width: '50%',
                      color: '#3B5998',
                    }}
                  >
                    Too slow...
                    <button
                      style={{
                        borderRadius: '10px',
                        fontSize: '24px',
                        verticalAlign: 'middle',
                      }}
                      onClick={() => {
                        setRestart(true);
                      }}
                    >
                      try again?
                    </button>
                  </p>
                </span>
              );
            }
            return (
              <span style={{ right: '5vw', position: 'absolute' }}>
                :{seconds}
              </span>
            );
          }}
          date={Date.now() + 5000}
        ></Countdown>
      )}
      <hr
        style={{ borderTop: 'dashed 2px', color: '#FFA500', marginTop: '2px' }}
      />
    </div>
  );
});

interface PromptProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}
function TextPrompt({ prompt, setPrompt }: PromptProps): JSX.Element {
  return (
    <div>
      <form>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            fontFamily: 'Arial,serif',
            fontSize: '20px',
            border: 'none',
            outline: 'none',
          }}
        />
      </form>
    </div>
  );
}
function Level2(props: LevelProps): JSX.Element {
  const [redirect, setRedirect] = useState(false);
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('hello sirr');
  const [restart, setRestart] = useState(true);
  if (restart) {
    return (
      <div>
        <p style={{ textAlign: 'center' }}>Type Racing</p>

        <RaceTrack />
        <div style={{ margin: 'auto', width: '50%' }}>
          <p
            style={{
              display: 'inline-block',
              width: 'max-content',
              margin: 'auto',
              marginRight: '10px',
            }}
          >
            Starting in{'      '}
          </p>
          <Countdown
            renderer={({ seconds, completed }) => {
              if (completed) {
                setInput('');
                setPrompt(String(Math.random()));
                setRestart(false);
              }
              return (
                <span style={{ display: 'inline-block' }}>:{seconds}</span>
              );
            }}
            date={Date.now() + 5000}
          ></Countdown>
        </div>
      </div>
    );
  }
  if (redirect) {
    return <Redirect to={props.nextLevel} />;
  } else if (input === prompt) {
    setTimeout(() => setRedirect(true), 3000);
    return (
      <div>
        <p>Type Racing</p>
        <RaceTrack />
        <p>Nice typing ;)</p>
      </div>
    );
  } else {
    return (
      <div>
        <p style={{ textAlign: 'center' }}>Type Racing</p>
        <RaceTrack setRestart={setRestart} />
        <TextPrompt prompt={prompt} setPrompt={setPrompt} />
        <form>
          <label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              placeholder="Type the text above before time runs out"
              style={{ width: '75%', height: '3vw', fontSize: '20px' }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Level2;
