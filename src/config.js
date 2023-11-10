import Overview from "./js/overview/Overview.js";
import OSD from "./js/osd/OSD.js";
import PowerMenu from "./js/powermenu/PowerMenu.js";
import Verification from "./js/powermenu/Verification.js";
import Desktop from "./js/desktop/Desktop.js";
import Notifications from "./js/notifications/Notifications.js";
import options from "./js/options.js";
import * as setup from "./js/utils.js";
import { forMonitors } from "./js/utils.js";

setup.scssWatcher();
setup.globalServices();

export default {
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
    windows: [
        forMonitors(OSD),
        forMonitors(Desktop),
        Notifications(options.primaryMonitor),
        Overview(),
        PowerMenu(),
        Verification(),
    ].flat(2),
};
