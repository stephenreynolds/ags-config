import { Widget } from "../imports.js";
import GLib from "gi://GLib";

export default ({
    format = "%-I:%M %p %a %b %e",
    interval = 1000,
    ...props
} = {}) => Widget.Label({
    class_name: "clock",
    ...props,
    connections: [[interval, label =>
        label.label = GLib.DateTime.new_now_local().format(format),
    ]],
});
