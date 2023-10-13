import { Utils, App } from "./imports.js";

function resetScss() {
    const tmp = "/tmp/ags/scss";
    Utils.ensureDirectory(tmp);
    try {
        Utils.exec(`sassc ${App.configDir}/scss/main.scss ${tmp}/style.css`);
        App.resetCss();
        App.applyCss(`${tmp}/style.css`);
    } catch (error) {
        console.error(error);
    }
}

export function forMonitors(widget) {
    const ws = JSON.parse(Utils.exec("hyprctl -j monitors"));
    return ws.map(mon => widget(mon.id));
}

export function scssWatcher() {
    resetScss();
    return Utils.subprocess([
        "inotifywait",
        "--recursive",
        "--event", "create,modify",
        "-m", App.configDir + "/scss",
    ], () => resetScss());
}
