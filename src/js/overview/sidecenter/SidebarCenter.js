import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import AppLauncher from './AppLauncher.js';
import SystemTray from './SystemTray.js';

export default () => Widget.Box({
    className: 'sidebar-center sidecenter-show sidecenter-hide',
    vertical: true,
    vexpand: true,
    hpack: 'center',
    children: [
        Widget.Box({
            className: 'sidecenter-group',
            vpack: 'center',
            child: AppLauncher(),
        }),
        Widget.Box({
            className: 'sidecenter-group',
            vpack: 'end',
            hpack: 'center',
            child: SystemTray(),
        }),
    ],
    connections: [[
        App, (self, currentName, visible) => {
            if (currentName === 'overview') {
                self.toggleClassName('sidecenter-hide', !visible);
            }
        }, 'window-toggled',
    ]],
});
