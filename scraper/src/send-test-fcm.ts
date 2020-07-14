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
      default: "ejA5zNqFRG2TviUftK-Ase:APA91bFl6zUaevB-q_nbC09FdBpXyweziM25EWJs-J8Jmt1e3To21RWVqi-dDnn0ao6PzAP4RKJe3GV_LSCJHn--ntFIruerZtJ7jmsDxIHXRmVaf5ZysLDsHPUfK_ein1tXbFtE8U__"
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
