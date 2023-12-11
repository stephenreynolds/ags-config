import Bar from "./js/bar/Bar.js";
import Overview from "./js/overview/Overview.js";
import OSD from "./js/osd/OSD.js";
import PowerMenu from "./js/powermenu/PowerMenu.js";
import Verification from "./js/powermenu/Verification.js";
import Desktop from "./js/desktop/Desktop.js";
import Notifications from "./js/notifications/Notifications.js";
import Dashboard from "./js/dashboard/Dashboard.js";
import options from "./js/options.js";
import * as setup from "./js/utils.js";
import { forMonitors } from "./js/utils.js";

setup.scssWatcher();

const windows = () => [
    forMonitors(OSD),
    forMonitors(Desktop),
    forMonitors(Bar),
    Notifications(options.primaryMonitor),
    Overview(),
    PowerMenu(),
    Verification(),
    Dashboard(),
];

export default {
    windows: windows().flat(1),
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
    closeWindowDelay: {
        "dashboard": options.transition,
        "quicksettings": options.transition,
    }
};
