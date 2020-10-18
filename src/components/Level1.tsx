// Template for levels that uses passwords and is linked to the next level.
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useInput, checkPassword } from "./Utils";

interface props {
    name: string;
    nextLevel: string;
}

function Level1(props: props): JSX.Element {
    const [redirect, setRedirect] = useState(false);
    const { value, bind, reset } = useInput("");

    // Uses checkPassword function which passes in true or false to callback
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        checkPassword({
            name: props.name,
            password: value,
            callback: (val: boolean) => {
                setRedirect(val);
                if (!val) alert("incorrect");
            },
        });
        reset();
    };

    // Redirect if user inputted password correctly
    if (redirect) {
        return <Redirect to={props.nextLevel} />;
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Password:
                    <input type="text" {...bind} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Level1;
