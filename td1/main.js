const nbAlea = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function question(n1, n2) {
    const startTime = Date.now();
    let answer = prompt(`What is ${n1} * ${n2}?`);
    while (isNaN(parseInt(answer))) {
        answer = prompt(`Invalid input. Please enter an integer for ${n1} * ${n2}:`);
    }
    const endTime = Date.now();
    const correctAnswer = n1 * n2;
    const isCorrect = parseInt(answer) === correctAnswer;
    const responseTime = endTime - startTime;
    return [isCorrect, responseTime];
}

const table = () => {
    let tableNumber = parseInt(prompt("Enter a number between 1 and 10:"));
    while (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 10) {
        tableNumber = parseInt(prompt("Invalid input. Please enter a number between 1 and 10:"));
    }
    const results = [];
    for (let i = 1; i <= 10; i++) {
        const [isCorrect, responseTime] = question(tableNumber, i);
        results.push({ question: `${tableNumber} * ${i}`, isCorrect, responseTime });
    }
    return results;
}

function displayResults(score, totalTime) {
    const resultsDiv = document.getElementById('results');
    const totalTimeInSeconds = (totalTime / 1000).toFixed(2);
    resultsDiv.innerHTML = `<span>Score: ${score}/10</span><span>Total time: ${totalTimeInSeconds}s</span>`;
}

const quiz1 = () => {
    const results = table();
    let score = 0;
    let totalTime = 0;
    for (const result of results) {
        if (result.isCorrect) {
            score++;
        }
        totalTime += result.responseTime;
    }
    console.log(`Score: ${score}/${results.length}`);
    console.log(`Total time: ${totalTime}ms`);
    displayResults(score, totalTime);
}

const quiz2 = () => {
    let tableNumber = parseInt(prompt("Enter a number between 1 and 10:"));
    while (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 10) {
        tableNumber = parseInt(prompt("Invalid input. Please enter a number between 1 and 10:"));
    }
    const results = [];
    const usedQuestions = new Set();
    while (results.length < 10) {
        const n1 = nbAlea(1, 10);
        const n2 = tableNumber;
        const questionText = `${n1} * ${n2}`;
        if (!usedQuestions.has(questionText)) {
            usedQuestions.add(questionText);
            const [isCorrect, responseTime] = question(n1, n2);
            results.push({ question: questionText, isCorrect, responseTime });
        }
    }
    let score = 0;
    let totalTime = 0;
    for (const result of results) {
        if (result.isCorrect) {
            score++;
        }
        totalTime += result.responseTime;
    }
    console.log(`Score: ${score}/${results.length}`);
    console.log(`Total time: ${totalTime}ms`);
    displayResults(score, totalTime);
}

const quiz3 = () => {
    let tableNumber = parseInt(prompt("Enter a number between 1 and 10:"));
    while (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 10) {
        tableNumber = parseInt(prompt("Invalid input. Please enter a number between 1 and 10:"));
    }

    const usedQuestions = new Set(); // Pour suivre les questions déjà posées
    const results = [];
    let totalTime = 0;

    while (results.length < 10) {
        let n1;
        let questionText;
        do {
            n1 = nbAlea(1, 10);
            questionText = `${n1} * ${tableNumber}`;
        } while (!usedQuestions.has(questionText));

        usedQuestions.add(questionText);
        const [isCorrect, responseTime] = question(n1, tableNumber);

        totalTime += responseTime;

        if (!isCorrect) {
            results.push({ question: questionText, isCorrect, responseTime });
            usedQuestions.delete(questionText);
        }
    }

    let score = 10 - results.length;
    console.log(`Score: ${score}/10`);
    console.log(`Total time: ${totalTime}ms`);
};


document.getElementById('startQuiz').addEventListener('click', function() {
    let quizChoice;
    do {
        quizChoice = prompt("Which quiz do you want to start? (1, 2, or 3)");
    } while (quizChoice !== '1' && quizChoice !== '2' && quizChoice !== '3');

    if (quizChoice === '1') {
        quiz1();
    } else if (quizChoice === '2') {
        quiz2();
    } else if (quizChoice === '3') {
        quiz3();
    }
});