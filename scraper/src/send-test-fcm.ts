import { sendFcm, setUserAlerts } from "./lib/pushNotify";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "userId",
      default: "google-oauth2|106338154655396411233"
    },
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
      name: "paIds",
      message: "PA IDs (comma separated)",
      default: "126106/TPO/2020,127288/FH/2020"
    }
  ])
  .then(async answers => {
    const paIds = answers.paIds.split(",");
    console.log(await setUserAlerts(paIds, answers.userId));
    sendFcm(
      answers.token,
      answers.title,
      answers.body,
      {newPaIds: JSON.stringify(paIds)},
      "TEST"
    ).then(r => process.exit());
  });
