import { CommanderStatic } from "commander";
import { AbstractCommand } from "./abstract.command";

export class StartCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("start")
      .alias("s")
      .description("Start a pomodoro.")
      .action(async () => {
        await this.action.handle();
      });
  }
}
