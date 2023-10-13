import Desktop from "./js/desktop/Desktop.js";
import PowerMenu from "./js/powermenu/PowerMenu.js";
import Verification from "./js/powermenu/Verification.js";
import { scssWatcher, forMonitors } from "./js/utils.js";

scssWatcher();

export default {
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
    closeWindowDelay: {
    },
    windows: [
        forMonitors(Desktop),
        PowerMenu(),
        Verification(),
    ].flat(2),
};
