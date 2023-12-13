import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

export default () => Widget.Box({
    class_name: 'sidebar-right sideright-show sideright-hide',
    vertical: true,
    vexpand: true,
    children: [
        Widget.Label({ label: 'test' }),
    ],
    connections: [[
        App, (self, currentName, visible) => {
            if (currentName === 'overview') {
                self.toggleClassName('sideright-hide', !visible);
            }
        }, 'window-toggled',
    ]],
});
