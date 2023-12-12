import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import GLib from 'gi://GLib';

export default ({ format = '%-I:%M %p', interval = 1000, ...props } = {}) => Widget.Label({
    className: 'clock',
    ...props,
    connections: [ [ interval, label =>
        label.label = GLib.DateTime.new_now_local().format(format),
    ] ],
});
