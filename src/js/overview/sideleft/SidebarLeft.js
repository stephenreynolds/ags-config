import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

export default () => Widget.Box({
    class_name: 'sidebar-left sideleft-show sideleft-hide',
    vertical: true,
    vexpand: true,
    hpack: 'start',
    children: [
        Widget.Label({ label: 'test' }),
    ],
    connections: [[
        App, (self, currentName, visible) => {
            if (currentName === 'overview') {
                self.toggleClassName('sideleft-hide', !visible);
            }
        }, 'window-toggled',
    ]],
});
