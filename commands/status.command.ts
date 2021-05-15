import { CommanderStatic } from "commander";
import { AbstractCommand } from "./abstract.command";

export class StatusCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("status")
      .alias("s")
      .description("Pomo status.")
      .action(async () => {
        await this.action.handle();
      });
  }
}
