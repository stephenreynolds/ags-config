import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import GLib from 'gi://GLib';

const getLocalTime = (format) => GLib.DateTime.new_now_local().format(format) || '';

export default ({ format = '%-I:%M %p', interval = 1000, ...props } = {}) => Widget.Label({
    class_name: 'clock',
    ...props,
    connections: [[ interval, label =>
        label.label = getLocalTime(format),
    ]],
});
