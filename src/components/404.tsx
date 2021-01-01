import React, { useContext, useState, useEffect } from 'react';

import { FirebaseClassContext } from './App';

import './styles/404.scss';

function Error(): JSX.Element {
  const context = useContext(FirebaseClassContext);
  const score = context?.firebase.user?.score ?? 0;

  const [ input, setInput ] = useState<string>('404');
  const [ msg, setMsg ]
    = useState<string>('No, seriously, this isn\'t a puzzle. You\'re in the wrong place.');

  useEffect(() => {
    let old = '';
    for (const ch of input) {
      if (!isNaN(ch as unknown as number))
        old += ch;
    }

    if (old.length > 3)
      old = old.substring(0, 3);

    if (old !== input) {
      setInput(old.substring(0, 3));
    }

    if (old === '200') {
      if (score % 100 === 0)
        void context
          .updateFirebase({
            score: score + 99,
          })
          .then(() => {
            setMsg(';) Good one.');
          });
      else
        setMsg('Nice try, but you only get this bonus once.');
    }
  }, [ input ]);

  return (
    <div className='center'>
      <form onSubmit={(e) => e.preventDefault()}>
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
      <p>{msg}<br /><br />
      Now hit <b>Current Level</b> to get back to where you were.</p>
    </div>
  );
}

export default Error;
