// Identical to level1 except function name and export.
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { Redirect } from 'react-router-dom';
import car from '../../assets/typeracercar.jpg';
import '../styles/TypeRacerLevel.scss';
import Level from '../Levels';

const prompts = [
  'All my life, my parents have told me not to open the basement door, but I got curious and disobeyed them...What is that glowing ball in the sky and why does it hurt my eyes?',
  "...she said last time, we're stuck in a time loop...Which really pisses me off because that's what...",
  "Please, take me instead! I scream, grabbing at the two men who took my child. Sorry ma'am, children only” they said, as they continue loading up the last lifeboat on the ship.",
  '"Ah, so it\'s 2020" the time traveller said. "Very early in from the looks of it," he muttered under his breath.',
  "Tinder is completely useless, and I don't have a single match. If I don't find another way to start a campfire tonight. I'll free to death.",
  "It's been almost a decade since I last saw my mother. And she still reminds me every day that if I misbehave again she'll take my hearing too.",
  "They say we have a primal sense, that we can just feel when someone is watching us. It's been a few weeks, and it's clear that you do not have that sense.",
];

const typingTime = 10;
const startingTime = 3;
interface LevelProps {
  name: string;
  nextLevel: string;
  setRedirect: React.Dispatch<React.SetStateAction<boolean>>;
  redirect: boolean;
}

interface RaceTrackProps {
  setRestart?: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeOut?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Renders the car and timer. When timer runs out, it prompts user to restart
const RaceTrack = React.memo(({ setRestart, setTimeOut }: RaceTrackProps) => {
  return (
    <div style={{ width: '75%' }}>
      <img src={car} className="carImage"></img>
      {setRestart && (
        <Countdown
          renderer={({ seconds, completed }) => {
            if (completed) {
              if (setTimeOut) setTimeOut(true);
              return (
                <span style={{ position: 'absolute', width: '100%' }}>
                  <p className="restartPrompt">
                    Too slow...
                    <button
                      className="restartButton"
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
            return <span className="typingTimer">:{seconds}</span>;
          }}
          date={Date.now() + typingTime * 1000}
        ></Countdown>
      )}
      <hr className="raceTrackLine" />
    </div>
  );
});
RaceTrack.displayName = 'Race Track';
// The text prompt. The user can change this ;)
interface PromptProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}
function TextPrompt({ prompt, setPrompt }: PromptProps): JSX.Element {
  return (
    <div>
      <form>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="textPrompt"
        />
      </form>
    </div>
  );
}

function TypeRacerLevelWrapper(): JSX.Element {
  const [redirect, setRedirect] = useState(false);
  const level = 'typeracer';
  const nextLevel = 'thegreatone';
  return (
    <Level
      isCompleted={redirect}
      levelUrl={level}
      nextLevelUrl={nextLevel}
      points={100}
    >
      <TypeRacerLevel
        redirect={redirect}
        setRedirect={setRedirect}
        name={level}
        nextLevel={nextLevel}
      />
    </Level>
  );
}
function TypeRacerLevel(props: LevelProps): JSX.Element {
  const [input, setInput] = useState('');
  const p = prompts[Math.floor(Math.random() * prompts.length)]; // Triggered weird comma dangle error
  const [prompt, setPrompt] = useState(p);
  const [restart, setRestart] = useState(true);
  const [timeOut, setTimeOut] = useState(true);
  // True at the first load up and when user clicks restart button after losing
  if (restart) {
    return (
      <div>
        <p style={{ textAlign: 'center' }}>Type Racing</p>
        <div className="raceTrackContainer">
          <RaceTrack />
          <div>
            <p className="restartContainer">Starting in{'      '}</p>
            <Countdown
              renderer={({ seconds, completed }) => {
                if (completed) {
                  const p2 =
                    prompts[Math.floor(Math.random() * prompts.length)];
                  setInput('');
                  setPrompt(p2);
                  setRestart(false);
                  setTimeOut(false);
                }
                return <span className="restartTimer">:{seconds}</span>;
              }}
              date={Date.now() + startingTime * 1000}
            ></Countdown>
          </div>
        </div>
      </div>
    );
  }
  // After finishing the game, there is a 3 second delay before going to the next level.
  // User beat the game
  if (input === prompt && !timeOut) {
    setTimeout(() => props.setRedirect(true), 3000);
    return (
      <div>
        <p style={{ textAlign: 'center' }}>Type Racing</p>
        <div className="raceTrackContainer">
          <RaceTrack />
          <p>Nice typing ;)</p>
        </div>
      </div>
    );
  }
  // User started the game. Shows the new text prompt and starts the timer.
  else {
    return (
      <div>
        <p style={{ textAlign: 'center' }}>Type Racing</p>
        <div className="raceTrackContainer">
          <RaceTrack setRestart={setRestart} setTimeOut={setTimeOut} />
          <TextPrompt prompt={prompt} setPrompt={setPrompt} />
          <form>
            <label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                placeholder="Type the text above before time runs out"
                className="inputLine"
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default TypeRacerLevelWrapper;
