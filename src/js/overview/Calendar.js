import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import GLib from 'gi://GLib';

const TIME_FORMAT = '%-I:%M %p';

function getDayString(time) {
    const localTime = GLib.DateTime.new_now_local();
    let differenceInDays = time.get_day_of_year() - localTime.get_day_of_year();
    let dayString = 'Today';
    if (differenceInDays > 0) {
        dayString = 'Tomorrow';
    }
    else if (differenceInDays < 0) {
        dayString = 'Yesterday';
    }
    return dayString;
}

export default () => Widget.Box({
    class_name: 'datemenu',
    vertical: true,
    hpack: 'end',
    children: [
        Widget.Label({
            class_name: 'date',
            xalign: 0,
            connections: [[ 1000, label =>
                label.label = GLib.DateTime.new_now_local().format('%A, %B %e'),
            ]],
        }),
        Widget.Box({
            class_name: 'timezones',
            spacing: 20,
            children: [
                Widget.Label({
                    class_name: 'tz-local',
                    connections: [[ 1000, label =>
                        label.label = GLib.DateTime.new_now_local().format(TIME_FORMAT),
                    ]],
                }),
                Widget.Box({
                    children: [
                        Widget.Box({
                            vertical: true,
                            hexpand: true,
                            hpack: 'start',
                            children: [
                                Widget.Label({
                                    class_name: 'tz-label',
                                    label: 'UTC',
                                    xalign: 0,
                                }),
                                Widget.Label({
                                    class_name: 'tz-label',
                                    label: 'Japan',
                                    xalign: 0,
                                }),
                            ],
                        }),
                        Widget.Box({
                            vertical: true,
                            hexpand: true,
                            hpack: 'start',
                            children: [
                                Widget.Label({
                                    class_name: 'tz-utc',
                                    xalign: 0,
                                    connections: [[ 1000, label => {
                                        const time = GLib.DateTime.new_now_utc();
                                        const timeString = `${time.format(TIME_FORMAT)} ${getDayString(time)}`;
                                        label.label = timeString;
                                    } ]],
                                }),
                                Widget.Label({
                                    class_name: 'tz-jst',
                                    xalign: 0,
                                    connections: [[ 1000, label => {
                                        const time = GLib.DateTime.new_now(GLib.TimeZone.new('Asia/Tokyo'));
                                        const timeString = `${time.format(TIME_FORMAT)} ${getDayString(time)}`;
                                        label.label = timeString;
                                    } ]],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
        Widget.Box({
            class_name: 'calendar',
            hpack: 'end',
            children: [
                Widget.Calendar({
                    hexpand: true,
                    hpack: 'center',
                }),
            ],
        }),
    ],
});
