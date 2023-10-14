import { Widget } from "../imports.js";
import GLib from "gi://GLib";

const TIME_FORMAT = "%-I:%M %p";

function getDayString(time) {
    const localTime = GLib.DateTime.new_now_local();
    let differenceInDays = time.get_day_of_year() - localTime.get_day_of_year();
    let dayString = "Today";
    if (differenceInDays > 0) {
        dayString = "Tomorrow";
    }
    else if (differenceInDays < 0) {
        dayString = "Yesterday";
    }
    return dayString;
}

export default () => Widget.Box({
    className: "datemenu",
    vertical: true,
    halign: "end",
    children: [
        Widget.Label({
            className: "date",
            xalign: 0,
            connections: [[1000, label =>
                label.label = GLib.DateTime.new_now_local().format("%A, %B %e"),
            ]],
        }),
        Widget.Box({
            className: "timezones",
            spacing: 20,
            children: [
                Widget.Label({
                    className: "tz-local",
                    connections: [[1000, label =>
                        label.label = GLib.DateTime.new_now_local().format(TIME_FORMAT),
                    ]],
                }),
                Widget.Box({
                    children: [
                        Widget.Box({
                            vertical: true,
                            hexpand: true,
                            halign: "start",
                            children: [
                                Widget.Label({
                                    className: "tz-label",
                                    label: "UTC",
                                    xalign: 0,
                                }),
                                Widget.Label({
                                    className: "tz-label",
                                    label: "Japan",
                                    xalign: 0,
                                }),
                            ],
                        }),
                        Widget.Box({
                            vertical: true,
                            hexpand: true,
                            halign: "start",
                            children: [
                                Widget.Label({
                                    className: "tz-utc",
                                    xalign: 0,
                                    connections: [[1000, label => {
                                        const time = GLib.DateTime.new_now_utc();
                                        const timeString = `${time.format(TIME_FORMAT)} ${getDayString(time)}`;
                                        label.label = timeString;
                                    }]],
                                }),
                                Widget.Label({
                                    className: "tz-jst",
                                    xalign: 0,
                                    connections: [[1000, label => {
                                        const time = GLib.DateTime.new_now(GLib.TimeZone.new("Asia/Tokyo"));
                                        const timeString = `${time.format(TIME_FORMAT)} ${getDayString(time)}`;
                                        label.label = timeString;
                                    }]],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
        Widget.Box({
            className: "calendar",
            halign: "end",
            children: [
                Widget({
                    type: imports.gi.Gtk.Calendar,
                    hexpand: true,
                    halign: "center",
                }),
            ],
        }),
    ],
});
