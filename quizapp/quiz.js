const firebaseConfig = {
    apiKey: "AIzaSyDwronP6l3fV2igcRqz0zvckz-XuTSycuo",
    authDomain: "authclass-aef15.firebaseapp.com",
    databaseURL: "https://authclass-aef15-default-rtdb.firebaseio.com",
    projectId: "authclass-aef15",
    storageBucket: "authclass-aef15.appspot.com",
    messagingSenderId: "998318861781",
    appId: "1:998318861781:web:751bb1b23d5253453e615c",
    measurementId: "G-MLCNSCTY13"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var quizRef = database.ref("quiz");

function saveScore(score) {
    try {
        var userRef = quizRef.push();
        userRef.set({
            score: score,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        }, function (error) {
            if (error) {
                console.error("Error saving score:", error);
            } else {
                console.log("Score saved successfully!");
            }
        });
    } catch (error) {
        console.error("Error saving score:", error);
    }
}

function getScores() {
    try {
        quizRef.once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                console.log("Score: " + data.score + ", Timestamp: " + data.timestamp);
            });
        }, function (error) {
            console.error("Error getting scores:", error);
        });
    } catch (error) {
        console.error("Error getting scores:", error);
    }
}

// =======================================
var questions = [
    {
        question: "What is the study of the use of microorganisms to produce useful products, such as antibiotics and vaccines?",
        option1: "Microbiology",
        option2: "Biotechnology",
        option3: "Genetics",
        corrAnswer: "Biotechnology",
    },

    {
        question: "Which process involves the transfer of genes from one organism to another to improve characteristics or traits?",
        option1: "Cloning",
        option2: "Crossbreeding",
        option3: "Genetic Engineering",
        corrAnswer: "Genetic Engineering",
    },

    {
        question: "What is the name of the technique that separates DNA fragments based on their size using an electric field?",
        option1: "Polymerase Chain Reaction (PCR)",
        option2: "Gel Electrophoresis",
        option3: "DNA Sequencing",
        corrAnswer: "Gel Electrophoresis",
    },

    {
        question: "Which biotechnological process involves the production of identical copies of DNA?",
        option1: "DNA Cloning",
        option2: "Gene Expression",
        option3: "RNA Splicing",
        corrAnswer: "DNA Cloning",
    },

    {
        question: "In biotechnology, what is the purpose of a plasmid in genetic engineering?",
        option1: "Energy production",
        option2: "Gene delivery",
        option3: "Cell structure",
        corrAnswer: "Gene delivery",
    },

    {
        question: "Which enzyme is commonly used in biotechnology to create complementary DNA (cDNA) from messenger RNA (mRNA)?",
        option1: "RNA Polymerase",
        option2: "DNA Ligase",
        option3: "Reverse Transcriptase",
        corrAnswer: "Reverse Transcriptase",
    },

    {
        question: "What is the name of the process by which cells differentiate into specific cell types during development?",
        option1: "Cellular Respiration",
        option2: "Cell Division",
        option3: "Cell Differentiation",
        corrAnswer: "Cell Differentiation",
    },

    {
        question: "Which biotechnological technique allows scientists to determine the sequence of nucleotides in a DNA molecule?",
        option1: "Polymerase Chain Reaction (PCR)",
        option2: "DNA Sequencing",
        option3: "Gene Expression",
        corrAnswer: "DNA Sequencing",
    },

    {
        question: "What is the role of restriction enzymes in genetic engineering?",
        option1: "To join DNA fragments together",
        option2: "To cut DNA at specific sequences",
        option3: "To amplify DNA segments",
        corrAnswer: "To cut DNA at specific sequences",
    },

    {
        question: "In biotechnology, what does the term ",
        option1: "Clustered Regularly Interspaced Short Palindromic Repeats",
        option2: "Chemical Reaction Involving Sequences of Proteins",
        option3: "Cellular Regulation of Internal Synthesis Processes",
        corrAnswer: "Clustered Regularly Interspaced Short Palindromic Repeats",
    },
    // ... more questions ...
];



var questionElement = document.getElementById("ques");
var option1Element = document.getElementById("opt1");
var option2Element = document.getElementById("opt2");
var option3Element = document.getElementById("opt3");
var buttonElement = document.getElementById("btn1");
var options = document.getElementsByName("options");
var timerElement = document.getElementById("timer");
var questionNumberElement = document.getElementById("ques1");

var currentQuestion = 0;
var score = 0;
var seconds = 120;

function startQuiz() {
    nextQuestion();
    startTimer();
}

function startTimer() {
    setInterval(function () {
        timerElement.innerHTML = `Time Left: ${Math.floor(seconds / 60)}:${seconds % 60}`;
        seconds--;

        if (seconds < 0) {
            endQuiz();
        }
    }, 1000);
}

function clicked() {
    buttonElement.disabled = false;
}

function nextQuestion() {
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            var selectedOption = options[i].value;
            var selectedAnswer = questions[currentQuestion - 1][`option${selectedOption}`];
            var correctAnswer = questions[currentQuestion - 1].corrAnswer;

            if (correctAnswer === selectedAnswer) {
                score++;
            }
        }
        options[i].checked = false;
    }

    if (currentQuestion >= questions.length) {
        endQuiz();
    } else {
        questionNumberElement.innerHTML = `Question: ${currentQuestion + 1} / ${questions.length}`;

        var currentQues = questions[currentQuestion];
        questionElement.innerHTML = currentQues.question;
        option1Element.innerText = currentQues.option1;
        option2Element.innerText = currentQues.option2;
        option3Element.innerText = currentQues.option3;

        buttonElement.disabled = true;
        seconds = 120;

        currentQuestion++;
    }
}
function endQuiz() {
    buttonElement.disabled = true;
     
    saveScore(score);

    if (score >= 7) {
        Swal.fire('Very Good job!', `Your percentage is ${(score / questions.length * 100).toFixed(2)}%`, 'success');
    } else if (score >= 5 && score < 7) {
        Swal.fire('Good job!', `Your percentage is ${(score / questions.length * 100).toFixed(2)}%`, 'success');
    } else {
        Swal.fire('Sorry!', `Your percentage is ${(score / questions.length * 100).toFixed(2)}%`, 'warning');
    }

    // Show the "Get Scores" button
    document.getElementById('getScoresBtn').style.display = 'block';
   window.location.href  = 'final.html'
}
