import Desktop from './js/desktop/Desktop.js';
import { forMonitors } from './js/utils.js';

const windows = () => [
    forMonitors(Desktop),
];

export default {
    windows: windows().flat(1),
    maxStreamVolume: 1.05,
    cacheNotificationActions: true,
};
