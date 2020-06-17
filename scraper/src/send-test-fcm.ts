import { sendFcm } from "./lib/pushNotify";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "token"
    },
    {
      name: "title"
    },
    {
      name: "body"
    },
    {
      name: "data"
    }
  ])
  .then(answers => {
    sendFcm(
      answers.token,
      answers.title,
      answers.body,
      JSON.parse(answers.data),
      "TEST"
    ).then(r => process.exit());
  });
