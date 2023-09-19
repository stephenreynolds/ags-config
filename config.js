import BottomBar from "./js/bar/bottomBar.js";

const ws = ags.Service.Hyprland.HyprctlGet("monitors");
const forMonitors = widget => ws.map(mon => widget(mon.id));

import { scssWatcher } from "./js/utils.js";
scssWatcher();

export default {
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
    windows: [
        forMonitors(BottomBar),
    ].flat(2),
};
