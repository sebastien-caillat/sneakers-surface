import React from "react";
import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const StyledGlobalStyle = createGlobalStyle`

    body {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: auto;
        color: ${colors.text};
        background-color: ${colors.background};
    }

    h1, h2, h3 {
        font-family: 'Bree Serif', serif;
    }

    h1 {
        font-size: 64px;
    }

    h2 {
        font-size: 48px;
    }

    h3 {
        font-size: 32px;
    }

    p {
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
    }

    button {
        height: 50px;
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        background-color: ${colors.backgroundbutton};
        color: ${colors.text};
        border: none;
        border-radius: 20px;
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
    }
`

export default function GlobalStyle() {
    return <StyledGlobalStyle />
}