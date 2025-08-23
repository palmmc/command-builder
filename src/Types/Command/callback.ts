import { CommandResponse, Dimension, Entity, World } from "@serenityjs/core";
import { CommandParameters, MappedParameters } from "./parameters";

type ExecuteCallback<T extends CommandParameters> = (
  world: World,
  origin: Dimension | Entity,
  params: MappedParameters<T>
) => CommandResponse;

type FailureCallback = (origin: Dimension | Entity) => void;

export { ExecuteCallback, FailureCallback };
