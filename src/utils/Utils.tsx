import { useState } from 'react';
const base = 'http://localhost:9000';
interface Props {
  name: string;
  password: string;
  callback: (x: boolean) => void;
}
// Checks password and returns next level if correct
export function checkPassword(input: Props): void {
  const url = new URL(base + '/levels'),
    params = input;
  url.searchParams.append('name', params.name);
  url.searchParams.append('password', params.password);
  fetch(url.toString())
    .then((response) => response.json())
    .then((data) => input.callback(data.correct))
    .catch((e) => {
      e; // Do nothing
    });
}

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.target.value);
      },
    },
  };
};

/**
 * Obtain a random element in an array
 *
 * @param arr an input array
 */
export function randomElement(arr: any[], ...avoid: any[]): any {
  if(avoid.length !== 0) {
    arr = arr.filter(v => !avoid.includes(v));
  }
  return arr[Math.floor(Math.random() * arr.length)];
}