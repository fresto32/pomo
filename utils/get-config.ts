import { readFileSync } from "fs";
import {
  Configuration,
  CONFIGURATION_FILEPATH,
  DEFAULT_CONFIGURATION,
} from "../actions/setup.action";

export function getConfiguration() {
  try {
    return JSON.parse(
      readFileSync(CONFIGURATION_FILEPATH).toString()
    ) as Configuration;
  } catch {
    return DEFAULT_CONFIGURATION;
  }
}
