import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Volume from './Volume.js';

export default () => Widget.Box({
    class_name: 'sidebar-left',
    vertical: true,
    vexpand: true,
    hpack: 'start',
    child: Widget.Box({
        vertical: true,
        vexpand: true,
        className: 'spacing-v-15',
        children: [
            Volume(),
        ],
    }),
});
