import React,{ useEffect, useState} from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { useParams } from "react-router-dom";
import RecipeCall from "./RecipeCall";
const BotRedirect = ({ url, message }) => {
    return (
        <div>
            <a href={url} target="blank">
                {message}
            </a>
        </div>
    );
};
const CHATBOT_THEME = {
    background: "#faf3f1",
    botBackground:"white",
    headerBgColor: "#ff7d5f",
    headerFontSize: "20px",
    botBubbleColor: "#ff7d5f",
    headerFontColor: "white",
    botFontColor: "white",
    userBubbleColor: "#FF5733",
    userFontColor: "white",
};

export default function RefriBot(props) {
    const loggedsteps = [
        {
            id: "0",
            message: `Hello! ${props.username.username}. How can I help you ?`,
            trigger: "1",
        },
        {
            id: "1",
            options:  [
                { value: 1, label: "Top 3 recipes", trigger: "2" },
                { value: 2, label: "Want to get recipes", trigger: "3" }
            ]
        },
        {
            id: "2",
            user: true,
            trigger: "3",
        },
        {
            id: "3",
            message: " Give me a recipe name",
            trigger:"4"
        },
        {
            id: "4",
            message: "Choose courses",
            user:true,
            trigger:"5"
        },
        {
            id:"5",
            message:({ previousValue, steps }) => {
                <RecipeCall value= {previousValue}/>
            },
            waitAction:true,
        }
    ];
    return (
        <>
        <ThemeProvider theme={CHATBOT_THEME}>
            <ChatBot steps={loggedsteps} floating={true} headerTitle={"RefriBot"} userAvatar={"/assets/images/avatar.png"} botAvatar={"/logo_fp.png"} />
        </ThemeProvider>
        </>
    );
}
