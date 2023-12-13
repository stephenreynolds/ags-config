import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import AppLauncher from './AppLauncher.js';
import SystemTray from './SystemTray.js';

export default () => Widget.Box({
    className: 'sidebar-center',
    vertical: true,
    vexpand: true,
    hpack: 'center',
    children: [
        Widget.Box({
            className: 'sidebar-center-group',
            vpack: 'center',
            child: AppLauncher(),
        }),
        Widget.Box({
            className: 'sidebar-center-group',
            vpack: 'end',
            hpack: 'center',
            child: SystemTray(),
        }),
    ],
});
