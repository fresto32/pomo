import { readFileSync, writeFileSync } from "fs";
import { Options } from "../utils/setup-options";
import { AbstractAction } from "./abstract.action";
import { getConfiguration } from "../utils/get-config";
import { Status, statusFilePath } from "./status.action";

export class StartAction extends AbstractAction {
  public async handle() {
    this.start();
  }

  private start() {
    let status: Status;

    try {
      const raw = readFileSync(statusFilePath).toString();
      status = JSON.parse(raw) as Status;
    } catch {
      status = {
        startTime: new Date(),
        type: Options.breakTime,
        history: [],
      };
    }

    const nextType = this.getNextType(status);
    status.history.unshift(nextType);

    const data: Status = {
      startTime: new Date(),
      type: nextType,
      history: status.history,
    };

    writeFileSync(statusFilePath, JSON.stringify(data, null, 2));
  }

  private getNextType(status: Status) {
    const configuration = getConfiguration();

    if (status.type === Options.breakTime) {
      return Options.workTime;
    }

    let pastWorkCount = 0;

    pastWork: for (const pastType of status.history) {
      pastType: switch (pastType) {
        case Options.workTime:
          pastWorkCount++;
          break pastType;
        case Options.longBreakTime:
          break pastWork;
      }
    }

    if (pastWorkCount >= configuration.sessionsBeforeLongBreak) {
      return Options.longBreakTime;
    } else {
      return Options.breakTime;
    }
  }
}
