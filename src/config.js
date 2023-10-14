import Overview from "./js/overview/Overview.js";
import Dashboard from "./js/dashboard/Dashboard.js";
import OSD from "./js/osd/OSD.js";
import PowerMenu from "./js/powermenu/PowerMenu.js";
import Verification from "./js/powermenu/Verification.js";
import Desktop from "./js/desktop/Desktop.js";
import Notifications from "./js/notifications/Notifications.js";
import Lockscreen from "./js/lockscreen/Lockscreen.js";
import options from "./js/options.js";
import * as setup from "./js/utils.js";
import { forMonitors } from "./js/utils.js";

setup.scssWatcher();
setup.globalServices();

export default {
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
    closeWindowDelay: {
        "quicksettings": options.windowAnimationDuration,
        "dashboard": options.windowAnimationDuration,
    },
    windows: [
        forMonitors(OSD),
        forMonitors(Desktop),
        forMonitors(Lockscreen),
        Notifications(options.primaryMonitor),
        Overview(),
        Dashboard(),
        PowerMenu(),
        Verification(),
    ].flat(2),
};
