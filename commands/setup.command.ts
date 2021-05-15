import { CommanderStatic } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";
import { Options } from "./../utils/setup-options";

export class SetupCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("setup [work] [break] [long break] [sessions before long break]")
      .description("Update break and work times in minutes.")
      .action(
        async (
          workTime: string,
          breakTime: string,
          longBreakTime: string,
          sessionsBeforeLongBreak: string
        ) => {
          const inputs: Input[] = [];
          inputs.push({ name: Options.workTime, value: workTime });
          inputs.push({ name: Options.breakTime, value: breakTime });
          inputs.push({
            name: Options.longBreakTime,
            value: longBreakTime,
          });
          inputs.push({
            name: Options.sessionsBeforeLongBreak,
            value: sessionsBeforeLongBreak,
          });

          await this.action.handle(inputs);
        }
      );
  }
}
