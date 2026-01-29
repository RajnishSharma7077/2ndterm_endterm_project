/* =======================
   QUESTION DATABASE
======================= */
const quizData = {
    beginner: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyperlinks Text Mark Language",
                "Home Tool Markup Language"
            ],
            answer: 0,
            wiki: "HTML (HyperText Markup Language) is the standard language for creating web pages."
        },
        {
            question: "Which tag is used for the largest heading?",
            options: ["<h6>", "<h1>", "<head>", "<title>"],
            answer: 1,
            wiki: "The <h1> tag represents the most important heading."
        },
        {
            question: "Which CSS property changes text color?",
            options: ["font-color", "color", "background", "text-style"],
            answer: 1,
            wiki: "The CSS color property defines the color of text."
        },
        {
            question: "Which symbol is used for JS comments?",
            options: ["<!-- -->", "//", "#", "**"],
            answer: 1,
            wiki: "JavaScript uses // for single-line comments."
        },
        {
            question: "Which tag creates a link?",
            options: ["<a>", "<link>", "<href>", "<url>"],
            answer: 0,
            wiki: "The <a> tag defines a hyperlink."
        }
    ],

    intermediate: [
        {
            question: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Creative Style Sheets",
                "Color Style Sheets",
                "Computer Style Sheets"
            ],
            answer: 0,
            wiki: "CSS controls the layout and design of web pages."
        },
        {
            question: "Which keyword creates a block-scoped variable?",
            options: ["var", "let", "const", "static"],
            answer: 1,
            wiki: "let creates variables limited to block scope."
        },
        {
            question: "Which layout system is one-dimensional?",
            options: ["Grid", "Flexbox", "Table", "Float"],
            answer: 1,
            wiki: "Flexbox is designed for one-dimensional layouts."
        },
        {
            question: "What does DOM stand for?",
            options: [
                "Document Object Model",
                "Display Object Model",
                "Data Object Model",
                "Digital Object Model"
            ],
            answer: 0,
            wiki: "DOM represents HTML as a tree structure."
        },
        {
            question: "Which event runs on click?",
            options: ["onload", "onclick", "onhover", "onchange"],
            answer: 1,
            wiki: "onclick fires when a user clicks an element."
        }
    ],

    advanced: [
        {
            question: "What is event delegation?",
            options: [
                "Multiple listeners",
                "Parent handling child events",
                "Stopping bubbling",
                "Inline events"
            ],
            answer: 1,
            wiki: "Event delegation uses bubbling to handle events efficiently."
        },
        {
            question: "Which CSS enables depth perception?",
            options: ["z-index", "perspective", "transform", "opacity"],
            answer: 1,
            wiki: "CSS perspective adds depth to 3D elements."
        },
        {
            question: "What is a closure?",
            options: [
                "Function inside function",
                "Preserved outer scope",
                "Loop reference",
                "Temporary variable"
            ],
            answer: 1,
            wiki: "Closures allow access to outer function variables."
        },
        {
            question: "Which method parses JSON?",
            options: [
                "JSON.parse()",
                "JSON.stringify()",
                "JSON.read()",
                "JSON.convert()"
            ],
            answer: 0,
            wiki: "JSON.parse converts JSON text into objects."
        },
        {
            question: "What does 'this' refer to?",
            options: [
                "Current object",
                "Global object",
                "Parent function",
                "Window always"
            ],
            answer: 0,
            wiki: "'this' refers to the object calling the function."
        }
    ]
};

/* =======================
   STATE
======================= */
let currentLevel = "";
let currentIndex = 0;
let score = 0;

/* =======================
   ELEMENTS
======================= */
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const finalScoreEl = document.getElementById("finalScore");

/* =======================
   START QUIZ
======================= */
function startQuiz(level) {
    currentLevel = level;
    currentIndex = 0;
    score = 0;

    home.classList.add("hide");
    result.classList.add("hide");
    quiz.classList.remove("hide");

    loadQuestion();
}

/* =======================
   LOAD QUESTION
======================= */
function loadQuestion() {
    const q = quizData[currentLevel][currentIndex];

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i);
        optionsEl.appendChild(btn);
    });

    progressEl.style.width =
        (currentIndex / quizData[currentLevel].length) * 100 + "%";
}

/* =======================
   CHECK ANSWER
======================= */
function checkAnswer(selected) {
    if (selected === quizData[currentLevel][currentIndex].answer) {
        score++;
    }

    currentIndex++;

    if (currentIndex < quizData[currentLevel].length) {
        loadQuestion();
    } else {
        showResult();
    }
}

/* =======================
   SHOW RESULT
======================= */
function showResult() {
    quiz.classList.add("hide");
    result.classList.remove("hide");

    progressEl.style.width = "100%";

    let html = `<h3>Your Score: ${score} / ${quizData[currentLevel].length}</h3>`;
    html += `<h3>Learn More</h3><ul>`;

    quizData[currentLevel].forEach(q => {
        html += `<li><strong>${q.question}</strong><br>${q.wiki}</li>`;
    });

    html += "</ul>";

    finalScoreEl.innerHTML = html;
}

/* =======================
   RESTART
======================= */
function restart() {
    result.classList.add("hide");
    home.classList.remove("hide");
}
