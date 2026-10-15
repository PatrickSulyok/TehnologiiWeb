
let questions = [
    {
        question: "Te-ai apucat de ideea de proiect?",
        options: {
            a: "Da, am deja o schiță!",
            b: "Nu încă, dar mă gândesc la ceva",
            c: "Nu prea știu ce să fac..."
        },
        correctAnswer: "a",
        correctResponse: "Excelent! Abia aștept să văd ce iese!",
        incorrectResponse: "Nu-i nimic! Discutăm idei împreună"
    },
    {
        question: "Cum merge echipa ta la proiect?",
        options: {
            a: "Ne organizăm bine!",
            b: "Mai greu cu sincronizarea...",
            c: "Sunt singur"
        },
        correctAnswer: "a",
        correctResponse: "Foarte tare! Munca în echipă e cheia succesului!",
        incorrectResponse: "O să găsim soluții împreună, nu-ți face griji"
    },
    {
        question: "Ce tehnologie folosești pentru structura unei pagini web?",
        options: {
            a: "CSS",
            b: "HTML",
            c: "JavaScript"
        },
        correctAnswer: "b",
        correctResponse: "Corect! HTML definește structura paginii.",
        incorrectResponse: "Răspunsul corect este HTML."
    },
    {
        question: "Ce limbaj folosim pentru stilizarea paginilor web?",
        options: {
            a: "CSS",
            b: "Python",
            c: "Java"
        },
        correctAnswer: "a",
        correctResponse: "Corect! CSS controlează aspectul vizual.",
        incorrectResponse: "Răspunsul corect este CSS."
    },
    {
        question: "Ce limbaj folosim pentru interactivitate în browser?",
        options: {
            a: "SQL",
            b: "HTML",
            c: "JavaScript"
        },
        correctAnswer: "c",
        correctResponse: "Corect! JavaScript permite interactivitatea.",
        incorrectResponse: "Răspunsul corect este JavaScript."
    }
];

let currentQuestionIndex = 0;
let chatContainer = document.getElementById("chat-container");
let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");
let waitingForNextQuestion = false;

displayQuestion();

function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];

    let optionsHTML = Object.keys(currentQuestion.options)
        .map(key => `${key}. ${currentQuestion.options[key]}`)
        .join("<br>");

    let botResponse = document.createElement("div");
    botResponse.classList.add("message");

    botResponse.innerHTML =
        `<strong>Bot:</strong> ${currentQuestion.question}<br>${optionsHTML}`;

    chatContainer.appendChild(botResponse);
    scrollChatContainerToBottom();
}

function scrollChatContainerToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (waitingForNextQuestion) {
        return;
    }

    let userResponse = userInput.value.toLowerCase().trim();

    if (userResponse === "") {
        return;
    }

    if (!["a", "b", "c"].includes(userResponse)) {
        alert("Introdu doar a, b sau c!");
        return;
    }

    let userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.innerHTML = `<strong>You:</strong> ${userResponse}`;
    chatContainer.appendChild(userMessage);

    let currentQuestion = questions[currentQuestionIndex];

    let botResponse = document.createElement("div");
    botResponse.classList.add("message");

    if (userResponse === currentQuestion.correctAnswer) {
        botResponse.innerHTML =
            `<strong>Bot:</strong> ${currentQuestion.correctResponse}`;
    } else {
        botResponse.innerHTML =
            `<strong>Bot:</strong> ${currentQuestion.incorrectResponse}`;
    }

    chatContainer.appendChild(botResponse);
    scrollChatContainerToBottom();

    currentQuestionIndex =
        (currentQuestionIndex + 1) % questions.length;

    userInput.value = "";
    waitingForNextQuestion = true;

    setTimeout(() => {
        displayQuestion();
        waitingForNextQuestion = false;
    }, 800);
});
