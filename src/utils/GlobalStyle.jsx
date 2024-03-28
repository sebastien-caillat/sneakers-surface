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
        @media(max-width: 768px) {
            font-size: 40px;
        }
    }

    h2 {
        font-size: 48px;
        @media(max-width: 768px) {
            font-size: 32px;
        }
    }

    h3 {
        font-size: 24px;
        @media(max-width: 1024px) {
            font-size: 20px;
            line-height: 1.4;
            margin-right: 1%;
        }
    }

    p, label {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        @media(max-width: 768px) {
            font-size: 16px;
        }
    }

    button {
        height: 50px;
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        background-color: ${colors.backgroundbutton};
        color: ${colors.text};
        border: none;
        border-radius: 35px;
        padding: 10px;
        cursor: pointer;
        @media(max-width: 768px) {
            height: 40px;
            font-size: 16px;
        }
        &:hover {
            transform: scale(1.1);
    }
`

export default function GlobalStyle() {
    return <StyledGlobalStyle />
}