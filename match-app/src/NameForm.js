import React, {useEffect, useState} from "react";

function NameForm({ onCreate, showForm, name }) {
    const [value, setValue] = useState("");

    function submitHandler(event) {
        event.preventDefault()
        if(value.trim()) {
            onCreate(value)
            setValue("")
        }
    }

    useEffect(() => {
       setValue("");   
     }, [setValue]);

    console.log(showForm)
    if(showForm) {
        return(
            <form style={{marginBottom: "1rem"}} onSubmit={submitHandler}>
                <div>
                Input your name to start new game
                </div>
                <div>
                <input value={value}
                onChange={event => setValue(event.target.value)}/>
                </div>
                <div>
                <button type="submit">New Game!</button>
                </div>
            </form>
        )
    }
    else {
        return(
            <div>
                Play your game, {name} !
            </div>
        )
    }
}

export default NameForm;