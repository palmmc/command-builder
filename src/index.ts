/* Imports */
import { WorldEvent } from "@serenityjs/core";
import { Plugin, PluginEvents, PluginType } from "@serenityjs/plugins";

/**
 * @Example_Commands
 */
import "./Examples/Commands/commands";
import { CommandBuilder } from "./Classes/Command/builder";
import { CommandOverload } from "./Classes/Command/overload";

/**
 * @Plugin
 */

const version = "0.1.0";

export class CommandBuilderPlugin extends Plugin implements PluginEvents {
  public readonly type = PluginType.Api;

  public readonly CommandBuilder = CommandBuilder;
  public readonly CommandOverload = CommandOverload;

  public constructor() {
    super("command-builder", version);
  }

  public onInitialize(): void {
    this.serenity.on(WorldEvent.WorldInitialize, ({ world }) => {
      CommandBuilder.registerAll(this, world);
    });
  }

  public onStartUp(): void {
    this.logger.info(
      "Loaded §eCommand §6Builder§r §8by §5palm1 §7- §8v" + version + "§r"
    );
  }
}

export default new CommandBuilderPlugin();
