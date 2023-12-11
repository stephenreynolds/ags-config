import { Variable } from "resource:///com/github/Aylur/ags/variable.js";
import { Widget } from "resource:///com/github/Aylur/ags/widget.js";
import GLib from "gi://GLib";

const TIME_FORMAT = "%-I:%M %p";
const DATE_FORMAT = "%a %b %e";
const DATETIME_SEPARATOR = "  ";

const time = new Variable("", {
    poll: [1000, () => GLib.DateTime.new_now_local()
        .format(`${DATE_FORMAT}${DATETIME_SEPARATOR}${TIME_FORMAT}`)],
});

export default () => Widget.Label({
    className: "clock",
    hpack: "center",
    binds: [["label", time]],
});
