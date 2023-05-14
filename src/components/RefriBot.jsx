import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
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
    background: "#C9FF8F",
    headerBgColor: "#ff7d5f",
    headerFontSize: "20px",
    botBubbleColor: "#ff7d5f",
    headerFontColor: "white",
    botFontColor: "white",
    userBubbleColor: "#FF5733",
    userFontColor: "white",
};

export default function RefriBot() {
    const steps = [
        {
            id: "0",
            message: "Hello!",
            trigger: "1",
        },
        {
            id: "1",
            message: "Please write your user name",
            trigger: "2",
        },
        {
            id: "2",
            user: true,
            trigger: "3",
        },
        {
            id: "3",
            message: " hi {previousValue}, how can I help you?",
            trigger: "4",
        },
        {
            id: "4",
            message: "Choose courses",
            trigger: "5",
        },
        {
            id: "5",
            options: [
                { value: 1, label: "Python", trigger: "6" },
                { value: 2, label: "Java", trigger: "7" },
                { value: 3, label: "french toast Recipe", trigger: "8" },
                { value: 3, label: "aloo matar", trigger: "8" },
                { value: 3, label: "Pizza", trigger: "8" },
                { value: 3, label: "Idli", trigger: "8" },
            ],
        },
        {
            id: "6",
            component: (
                <div>
                {" "}
                click this link for learning
                <a href="https://www.javatpoint.com/python-tutorial">python</a>{" "}
                </div>
            ),
            asMessage: true,
        },
        {
            id: "7",
            component: (
                <div>
                {" "}
                click this link for learning
                <a href="https://www.javatpoint.com/java-tutorial">Java</a>{" "}
                </div>
            ),
            asMessage: true,
        },
        {
            id: "8",
            component: (
                <div>
                <p>
                    To make this easy French toast recipe:
                    <br />
                    1.Beat egg, vanilla and cinnamon in shallow dish with wire whisk.
                    Stir in milk.
                    <br />
                    2.Dip bread in egg mixture, turning to coat both sides evenly.
                    <br />
                    3.Cook bread slices on lightly greased nonstick griddle or skillet
                    on medium heat until browned on both sides. Serve with Easy Spiced
                    Syrup (recipe follows), if desired. Voila, easy French toast.
                    <br />
                    4.Easy Spiced Syrup: Add 1 teaspoon McCormick® Pure Vanilla Extract
                    and 1/4 teaspoon McCormick® Ground Cinnamon to 1 cup pancake syrup;
                    stir well to mix. Serve warm, if desired.
                    <br />
                    <a href="https://www.simplyrecipes.com/recipes/french_toast/">
                    click this link to know others recipes
                    </a>{" "}
                </p>
                </div>
            ),
            asMessage: true,
        },
        {
        id: "30",
        component: (
            <BotRedirect
            message="See chatbot API here"
            url="<https://lucasbassetti.com.br/react-simple-chatbot/#/docs/chatbot>"
            />
        ),
        trigger: "2",
        },
    ];
    return (
        <>
        <ThemeProvider theme={CHATBOT_THEME}>
            <ChatBot steps={steps} floating={true} />
        </ThemeProvider>
        </>
    );
}
