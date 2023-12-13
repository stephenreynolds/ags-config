import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import AppLauncher from './AppLauncher.js';

export default () => Widget.Box({
    className: 'sidebar-center sidecenter-show sidecenter-hide',
    vertical: true,
    vexpand: true,
    hpack: 'center',
    children: [
        AppLauncher(),
    ],
    connections: [[
        App, (self, currentName, visible) => {
            if (currentName === 'overview') {
                self.toggleClassName('sidecenter-hide', !visible);
            }
        }, 'window-toggled',
    ]],
});
