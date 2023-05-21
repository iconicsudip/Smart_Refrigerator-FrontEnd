import React,{ useEffect, useState} from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { useParams } from "react-router-dom";
import RecipeCall from "./RecipeCall";
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
            id: "new",
            message: `Hello! ${props.username.username}. How can I help you ?`,
            trigger: "options",
        },
        {
            id: "options",
            options:  [
                { value: 1, label: "Top 3 recipes", end: true },
                { value: 2, label: "Want to get recipes ?",  end: true}
            ]
        },

       
    ];
    return (
        <>
        <ThemeProvider theme={CHATBOT_THEME}>
            <ChatBot steps={loggedsteps} floating={true} headerTitle={"RefriBot"} userAvatar={"/assets/images/avatar.png"} botAvatar={"/logo_fp.png"} />
        </ThemeProvider>
        </>
    );
}
