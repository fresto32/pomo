import chalk = require("chalk");
import { readFileSync } from "fs";
import { getConfiguration } from "../utils/get-config";
import { Options } from "../utils/setup-options";
import { AbstractAction } from "./abstract.action";

const homedir = require("os").homedir();

export interface Status {
  startTime: Date;
  type: Options;
  history: Options[];
}

export const statusFilePath = homedir + "/.pomo-status.json";
export class StatusAction extends AbstractAction {
  public async handle() {
    this.getStatus();
  }

  private getStatus() {
    let status: Status;

    try {
      status = JSON.parse(readFileSync(statusFilePath).toString());
    } catch {
      console.log(chalk.red("Start Pomo First"));
      process.exit(0);
    }

    status.startTime = new Date(status.startTime);

    switch (status.type) {
      case Options.workTime: {
        handleOption(status, "START BREAK", "WORK");
      }

      case Options.breakTime: {
        handleOption(status, "START WORK", "BREAK");
      }

      case Options.longBreakTime: {
        handleOption(status, "START WORK", "BREAK");
      }
    }
  }
}

function handleOption(status: Status, finishedMessage: string, name: string) {
  const config = getConfiguration();
  const elapsed = new Date().getTime() - status.startTime.getTime();

  if (elapsed / 1000 / 60 > config[status.type]) {
    console.log(chalk.red(finishedMessage));
    process.exit(0);
  } else {
    const totalTimeLeft = config[status.type] - elapsed / 1000 / 60;
    const minutes = Math.floor(totalTimeLeft);
    const seconds = (totalTimeLeft - minutes) * 60;

    const displayMinutes = minutes.toFixed(0).padStart(2, "0");
    const displaySeconds = seconds.toFixed(0).padStart(2, "0");

    console.log(
      chalk.blueBright(`${name}: ${displayMinutes}:${displaySeconds}`)
    );
    process.exit(0);
  }
}
