import { writeFileSync } from "fs";
import { Input } from "../commands";
import { Options } from "../utils/setup-options";
import { AbstractAction } from "./abstract.action";

const homedir = require("os").homedir();

export const CONFIGURATION_FILEPATH = homedir + "/.pomo-configuration.json";

export const DEFAULT_CONFIGURATION: Configuration = {
  [Options.workTime]: 25,
  [Options.breakTime]: 5,
  [Options.longBreakTime]: 15,
  [Options.sessionsBeforeLongBreak]: 4,
};

export interface Configuration {
  [Options.workTime]: number;
  [Options.breakTime]: number;
  [Options.longBreakTime]: number;
  [Options.sessionsBeforeLongBreak]: number;
}

export class SetupAction extends AbstractAction {
  private inputs: Input[] = [];
  public async handle(inputs: Input[]) {
    this.inputs = inputs;
    this.storeSettings();
  }

  private storeSettings() {
    const config: Configuration = {
      [Options.workTime]: this.getFromInput(Options.workTime),
      [Options.breakTime]: this.getFromInput(Options.breakTime),
      [Options.longBreakTime]: this.getFromInput(Options.longBreakTime),
      [Options.sessionsBeforeLongBreak]: this.getFromInput(
        Options.sessionsBeforeLongBreak
      ),
    };

    writeFileSync(CONFIGURATION_FILEPATH, JSON.stringify(config, null, 2));
  }

  private getFromInput(name: string) {
    const val = this.inputs.find((val) => val.name === name)?.value;
    if (val) return parseInt(val as string);
    // @ts-expect-error: String indexing
    else return DEFAULT_CONFIGURATION[name] ?? null;
  }
}
