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
    const [apiResponse, setApiResponse] = useState(null);
    const [top3Response, setTop3Response] = useState(null);
    const makeApiCall = (userInput) => {
        console.log(userInput)
    };
    useEffect(() => {
    
        // Trigger the API call when apiResponse changes
        if (apiResponse) {
            makeApiCall(apiResponse);
        }
    }, [apiResponse]);
    useEffect(() => {
        const makeApiCall = async (userInput) => {
            console.log(userInput)
        };
    
        // Trigger the API call when apiResponse changes
        if (top3Response) {
            makeApiCall();
        }
    }, [top3Response]);

    const handleUserInput = (input) => {
        console.log(typeof input)
        // Access user input from step
        if (input) {
            // const userInput = input?.value ? input?.value?.trim() : '';
            setApiResponse(input)
            // Clear the input value
            return true
        }
        // return false
        // return true
    };
    const handleApi = () =>{
        console.log(3)
        setTop3Response(3)
    }
    const loggedsteps = [
        {
            id: "new",
            message: `Hello! ${props.username.username}. How can I help you ?`,
            trigger: "options",
        },
        {
            id: "options",
            options:  [
                { value: 1, label: "Top 3 recipes", trigger: "top3" },
                { value: 2, label: "Want to get recipes ?", trigger: "userqs" }
            ]
        },

        
        {
            id: 'userqs',
            message: 'Please enter your recipe name.',
            trigger: 'userInput',
        },
        {
            id: 'userInput',
            user: true,
            validator:handleUserInput,
            waitAction: true,
            trigger: 'userInput',
        },
        {
            id: 'apiCall',
            message: 'Loading...',
            trigger: (apiResponse) => {
              // Conditionally trigger the next step based on the API response
              console.log(apiResponse)
                return apiResponse ? 'displayResponse' : 'apiCall';
            },
        },
        {
            id: 'displayResponse',
            component:<RecipeCall value={"h"}/>,
            end: true,
        },


        {
            id:"top3",
            message: 'Loading...',
            validator:handleApi,
            trigger: 'call3'
        },
        {
            id:"call3",
            message:"hhl",
            end:true
        }
    ];
    console.log(apiResponse)
    return (
        <>
        <ThemeProvider theme={CHATBOT_THEME}>
            <ChatBot steps={loggedsteps} floating={true} headerTitle={"RefriBot"} userAvatar={"/assets/images/avatar.png"} botAvatar={"/logo_fp.png"} />
        </ThemeProvider>
        </>
    );
}
