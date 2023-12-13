import Widget from 'resource:///com/github/Aylur/ags/widget.js';

export default () => Widget.Box({
    class_name: 'sidebar-left',
    vertical: true,
    vexpand: true,
    hpack: 'start',
    children: [
        Widget.Label({ label: 'test' }),
    ],
});
