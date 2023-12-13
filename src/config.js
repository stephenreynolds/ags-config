import Overview from './js/overview/Overview.js';
import OSD from './js/osd/OSD.js';
// Import PowerMenu from './js/powermenu/PowerMenu.js';
// Import Verification from './js/powermenu/Verification.js';
import Desktop from './js/desktop/Desktop.js';
import Notifications from './js/notifications/Notifications.js';
import options from './js/options.js';
import * as setup from './js/utils.js';
import { forMonitors } from './js/utils.js';

setup.scssWatcher();

globalThis.audio = (await import('resource:///com/github/Aylur/ags/service/audio.js')).default;

const windows = () => [
    forMonitors(Desktop),
    forMonitors(OSD),
    Notifications(options.primaryMonitor),
    Overview(),
    // PowerMenu(),
    // Verification(),
];

export default {
    windows: windows().flat(1),
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
    closeWindowDelay: {
        'overview': 210,
    },
};
