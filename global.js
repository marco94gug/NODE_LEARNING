process.stdout.write("Hello   \n\n");

const questions = [
  "What is you name?",
  "What would you rather be doing?",
  "What is your preferred programming language?",
];

const answers = [];

const ask = (i = 0, input) => {
  process.stdout.write(`\n\n\n ${questions[i]}`);
  process.stdout.write(` > `);
};

//eseguo la funzione che fa partire la prima domanda
ask();

//ascolto un evento input sul terminale
process.stdin.on("data", (data) => {
  const inputValue = data.toString().trim();
  answers.push(inputValue);

  if (answers.length < questions.length) {
    ask(answers.length, inputValue);
  } else {
    process.exit();
  }
});

process.on("exit", () => {
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
