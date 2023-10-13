import BottomBar from './js/bar/BottomBar.js';
import Overview from './js/overview/Overview.js';
import Dashboard from './js/dashboard/Dashboard.js';
import OSD from './js/osd/OSD.js';
import Applauncher from './js/applauncher/Applauncher.js';
import PowerMenu from './js/powermenu/PowerMenu.js';
import Verification from './js/powermenu/Verification.js';
import Desktop from './js/desktop/Desktop.js';
import Notifications from './js/notifications/Notifications.js';
import QuickSettings from './js/quicksettings/QuickSettings.js';
import { scssWatcher, warnOnLowBattery } from './js/utils.js';
import options from './js/options.js';
const ws = JSON.parse(ags.Utils.exec('hyprctl -j monitors'));
const forMonitors = widget => ws.map(mon => widget(mon.id));

warnOnLowBattery();
scssWatcher();

export default {
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
    closeWindowDelay: {
        'quicksettings': options.windowAnimationDuration,
        'dashboard': options.windowAnimationDuration,
    },
    windows: [
        forMonitors(BottomBar),
        forMonitors(OSD),
        forMonitors(Desktop),
        Notifications(options.primaryMonitor),
        Applauncher(),
        Overview(),
        Dashboard(),
        QuickSettings(),
        PowerMenu(),
        Verification(),
    ].flat(2),
};
