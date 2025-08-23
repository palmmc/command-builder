# Simply Commands
Build class oriented commands for **[SerenityJS](https://github.com/SerenityJS/serenity)**.<br>
Adds a plugin building system that allows for more organization and freedom with registering your own commands.

## How do I use this?
1. **Install the Plugin:** Install the **[latest version](https://github.com/palmmc/simply-commands/releases/latest)** to your SerenityJS server's `plugins` directory.
2. **Install the Typings:** Install the NPM package into your plugin project's folder.

    ```bash
    #npm
    npm install simply-commands
  
    #yarn
    yarn add simply-commands
    
    #bun
    bun add simply-commands
    ```
> [!NOTE]
> If you are having trouble with this step, try adding `--prefix <path/to/your/plugin/project>` at the end of the command.
3. **Import into your Plugin:** In your plugin's main file, import the `CommandBuilderPlugin` class.

    ```ts
    import type { CommandBuilderPlugin } from "simply-commands";
    ```
4. **Resolve the Plugin Instance:** Once your plugin is initialized, resolve the `CommandBuilderPlugin` instance that you have installed so you can use its features.
    ```ts
    import { Plugin } from "@serenityjs/plugins";
    
    import type { CommandBuilderPlugin } from "simply-commands";
    
    class ExamplePlugin extends Plugin {
      public onInitialize(): void {
        // The resolve method fetches the CommandBuilderPlugin instance from the plugin you installed.
        const { CommandBuilder, CommandOverload } = this.resolve<CommandBuilderPlugin>("command-builder")!; // Notice the use of `!` can be unsafe if the plugin is not loaded correctly.
      }
    }
    ```
## Now I make commands?
Yep, that's it! Here's an example to show you how the structure works for the command builder.
> **Example Usage**
```ts
// Create a new command.
new CommandBuilder("test", "Prints hello world to selectors.") // This command will be accessible using '/test'.
  .setPermissions(["commandbuilder.test"]) // Hide this command unless the player has the 'commandbuilder.test' permission.
  .setDebug(true) // Identifies the command as a debug command, which just changes its color to blue.
  .addOverload(
    new CommandOverload({ // Create a new command overload.
      target: TargetEnum, // Command parameters, allow the user to input a selector to target.
    }).onCallback((_world, _origin, { target }) => { // world and origin are unused here, but they are available by default.
      // Command functionality.
      if (!target.result) {
        throw new Error("No targets found.");
      }

      let successCount = 0;
      for (const entity of target.result) {
        if (!entity.isPlayer()) continue;

        entity.sendMessage("Hello World!");
        successCount++;
      }

      // Send successful command feedback to player.
      return {
        message: `Sent message to ${successCount} players.`,
      };
    })
  )
  // The most important part: Queues your command to be registered to the world.
  .register();
```