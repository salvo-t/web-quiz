const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const finalScore = document.querySelector('#score');

let currentQuestion = {}
let questionCounter = 0

let acceptingAnswers = true
let score = 0
let avaiableQuestions = []

let questions = [
    {
        question: 'What planet has the most moons?',
        choice1: 'Saturn',
        choice2: 'Jupiter',
        choice3: 'Venus',
        choice4: 'Mars',
        answer: 1,
    },
    {
        question: 'What planet is closest to the sun?',
        choice1: 'Earth',
        choice2: 'Mercury',
        choice3: 'Venus',
        choice4: 'Mars',
        answer: 2,
    },
    {
        question: 'Earth is located in what galaxy?',
        choice1: 'Black Eye',
        choice2: 'Backward Galaxy',
        choice3: 'The Milky Way',
        choice4: 'Abdromeda',
        answer: 3,
    },
    {
        question: 'What planet is known as the red planet?',
        choice1: 'Saturn',
        choice2: 'Jupiter',
        choice3: 'Venus',
        choice4: 'Mars',
        answer: 4,
    },
    {
        question: 'What is the name of saturns largest moon?',
        choice1: 'Titan',
        choice2: 'Beast',
        choice3: 'Cypher',
        choice4: 'Gnome',
        answer: 1,
    },
]

const SCORE_POINTS = 200
const MAX_QUESTIONS = 5

startGame = () => {
    score = 75
    avaiableQuestions = [...questions]
    newQuestions()
}

newQuestions = () => {
    if(avaiableQuestions.length === 0) 
    {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/highscores.html')
    }

    const questionIndex = Math.floor(Math.random() * avaiableQuestions.length)
    currentQuestion = avaiableQuestions[questionIndex]
    question.innterText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innterText = currentQuestion['choice' + number]
    })

    avaiableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswers = selectedChoice.dataset['number']

        let classApply = selectedAnswers == currentQuestion.answer ? 'correct' :
        'incorrect'
        if(classApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classApply)
            NewQuestion()
        }, 75)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innterText = score
}

startGame();
