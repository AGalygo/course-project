import { useContext } from "react";
import React from "react";

const styles = {
    li: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: ".5rem"
    },
    a: {
        margin: 10
    }
}

function ResultItem({ result, index }) {
    
    return <li style={styles.li}>
        <span>
            <strong>{index+1}</strong>
            &nbsp;
            <a style={styles.a}>{result.player}</a>
            <a style={styles.a}>{result.score}</a>
            <a style={styles.a}>{result.date}</a>
        </span>
        </li>
}

export default ResultItem