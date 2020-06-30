import { sendFcm } from "./lib/pushNotify";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "token",
      default: "eApZz22RE7g:APA91bGKdvMydSTv6BxYLgS6dC-fjVnhfFegPlNTHSfNwPHqggjtOaeY8SyyaMOtgmuTHlNTLd6lLTTifIE8RlhnNfIl8Wc0cJqBSXXISzh1M5rOTIsBFVKooeS-XIcsQ_PF-jsZUmss"
    },
    {
      name: "title",
      default: "Test"
    },
    {
      name: "body",
      default: "Test desc"
    },
    {
      name: "data",
      default: '{"newPaIds": "[\\"126774/wibble\\",\\"CDN/20/ooo\\"]"}'
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
