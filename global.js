const fs = require("fs");

let answerStream;

process.stdout.write("Hello   \n\n");

const questions = [
  "What is you name?",
  "What would you rather be doing?",
  "What is your preferred programming language?",
];

let answers = [];

const ask = (i = 0, input) => {
  process.stdout.write(`\n\n\n ${questions[i]}`);
  process.stdout.write(` > `);
};

process.stdin.once("data", (data) => {
  let name = data.toString().trim();
  let fileName = `./${name}.md`;
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
  answerStream = fs.createWriteStream(fileName);
  answerStream.write(`Question Answers for ${name}\n============\n`);
});

//eseguo la funzione che fa partire la prima domanda
ask();

//ascolto un evento input sul terminale
process.stdin.on("data", (data) => {
  let answer = data.toString().trim();

  answerStream.write(`Question: ${questions[answers.length]}\n`);

  answerStream.write(`Answer: ${answer}\n`, function () {
    if (answers.length < questions.length) {
      ask(answers.length, answer);
    } else {
      process.exit();
    }
  });

  answers.push(answer);
});

process.on("exit", () => {
  answerStream.close();
  process.stdout.write("\n\n\n\n");
  process.stdout.write(
    `Go ${answers[1]} ${answers[0]} you can finish writing ${answers[2]} later`
  );
});

// const waitTime = 3000;

// process.stdout.write(`setting a ${waitTime / 1000} second delay \n`);

// const timerFinished = () => {
//   process.stdout.write("done \n");
//   clearInterval(interval);
// };

// setTimeout(timerFinished, waitTime);

// const waitInterval = 500;
// let currentTime = 0;

// const incTime = () => {
//   currentTime += waitInterval;
//   process.stdout.write(`waiting ${currentTime / 1000} seconds \n`);
// };

// const interval = setInterval(incTime, waitInterval);
