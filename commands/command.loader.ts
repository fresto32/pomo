import * as chalk from "chalk";
import { CommanderStatic } from "commander";
import { SetupAction } from "../actions/setup.action";
import { StartAction } from "../actions/start.action";
import { StatusAction } from "../actions/status.action";
import { SetupCommand } from "./setup.command";
import { StartCommand } from "./start.command";
import { StatusCommand } from "./status.command";

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new StartCommand(new StartAction()).load(program);
    new StatusCommand(new StatusAction()).load(program);
    new SetupCommand(new SetupAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on("command:*", () => {
      console.error(
        `\n Invalid command: ${chalk.red("%s")}`,
        program.args.join(" ")
      );
      console.log(
        `See ${chalk.red("--help")} for a list of available commands.\n`
      );
      process.exit(1);
    });
  }
}
