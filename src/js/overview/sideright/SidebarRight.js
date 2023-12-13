import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import NotificationList from './NotificationList.js';

export default () => Widget.Box({
    class_name: 'sidebar-right',
    vertical: true,
    vexpand: true,
    hpack: 'end',
    child: Widget.Box({
        vertical: true,
        vexpand: true,
        className: 'spacing-v-15',
        children: [
            NotificationList({ vexpand: true }),
        ],
    }),
});
