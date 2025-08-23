import { TargetEnum } from "@serenityjs/core";
import { CommandBuilder } from "../../Classes/Command/builder";
import { CommandOverload } from "../../Classes/Command/overload";

new CommandBuilder("test", "Prints hello world to selectors.")
  .setPermissions(["commandbuilder.test"])
  .setDebug(true)
  .addOverload(
    new CommandOverload({
      target: TargetEnum,
    }).onCallback((_world, _origin, { target }) => {
      if (!target.result) {
        throw new Error("No targets found.");
      }

      let successCount = 0;
      for (const entity of target.result) {
        if (!entity.isPlayer()) continue;

        entity.sendMessage("Hello World!");
        successCount++;
      }

      return {
        message: `Sent message to ${successCount} players.`,
      };
    })
  )
  .register();
