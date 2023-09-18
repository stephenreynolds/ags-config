import Theme from "./services/theme/theme.js";

export function scssWatcher() {
  return  ags.Utils.subprocess([
    "inotifywait",
    "--recursive",
    "--event",
    "create,modify",
    "-m",
    ags.App.configDir + "/scss",
  ], Theme.setup);
}
