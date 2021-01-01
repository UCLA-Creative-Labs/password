import React, { useContext, useState } from 'react';

import { FirebaseClassContext } from './App';

import './styles/404.scss';

function Error(): JSX.Element {
  const context = useContext(FirebaseClassContext);
  const score = context?.firebase.user?.score ?? 0;

  const [ input, setInput ] = useState<string>('404');
  const [ msg, setMsg ]
    = useState<string>('No, seriously, this isn\'t a puzzle. You\'re in the wrong place.');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void context.firebase
      .checkPassword('404', input)
      .then((correct: boolean | undefined) => {
        if (correct) {
          /* eslint-disable no-bitwise */
          if (!((score % 100) & 1)){
            void context.updateFirebase({ score: score + 1 });
            setMsg('😉 Good one.');
          } else {
            setMsg('Nice try, but you only get this bonus once.');
          }
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          setInput('404');
        }
      });
  };

  return (
    <div className='center'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input
            className='error-box'
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPaste={(e) => e.preventDefault()}
          />
        </label>
      </form>
      <p>
        {msg}
      </p>
    </div>
  );
}

export default Error;
