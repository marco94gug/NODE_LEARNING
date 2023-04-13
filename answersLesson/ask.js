const collectAnswers = require("./lib/collectAnswers");

const questions = [
  "What is your name? ",
  "Where do you live? ",
  "What are you going to do with Node.js? ",
];

const answerEvents = collectAnswers(questions, (answers) => {
  process.stdout.write("Thank you for your answers! \n");
  console.log(answers);
  process.exit();
});

answerEvents.on("answer", answer => console.log(`The answer is ${answer}`))