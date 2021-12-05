import React from "react";
import { Link } from "react-router-dom";
import ResultItem from "./ResultItem";
// import "./CardItem.css"

const styles = {
    ul: {
        listStyle: 'none',
        margin: 100,
        marginTop: 60,
        padding: 0
    }
}


function Results() {
    console.log(JSON.parse(localStorage.getItem('results')));

    return (
        <>
        <Link to="/">Go to main page</Link>
        <ul style={styles.ul}> 
        {JSON.parse(localStorage.getItem('results')).map((result, index) => {
            return <ResultItem result={result} 
            key={result.id} 
            index={index}/>
        })}
    </ul>
    </>
    )
}

export default Results;