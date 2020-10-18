import { useState } from "react";
const base = "http://localhost:9000";
interface Props {
    name: string;
    password: string;
    callback: Function;
}
// Checks password and returns next level if correct
export function checkPassword(input: Props) {
    var url = new URL(base + "/levels"),
        params = input;
    url.searchParams.append("name", params.name);
    url.searchParams.append("password", params.password);
    fetch(url.toString())
        .then((response) => response.json())
        .then((data) => input.callback(data.correct))
        .catch((e) => {
            console.log(e);
        });
}

export const useInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: (event: any) => {
                setValue(event.target.value);
            },
        },
    };
};
