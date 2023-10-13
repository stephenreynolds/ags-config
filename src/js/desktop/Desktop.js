import Clock from "../misc/Clock.js";
import DesktopMenu from "./DesktopMenu.js";
import { Widget } from "../imports.js";

const DesktopClock = () => Widget.Box({
    className: "clock-box-shadow",
    child: Widget.CenterBox({
        className: "clock-box",
        children: [
            Clock({
                className: "clock",
                halign: "center",
                format: "%-I:%M %p",
            }),
        ],
    }),
});

const Desktop = () => Widget.EventBox({
    onSecondaryClick: (_, event) => DesktopMenu().popup_at_pointer(event),
    child: Widget.Box({
        vertical: true,
        vexpand: true,
        hexpand: true,
        halign: "center",
        valign: "center",
        children: [
            DesktopClock(),
            Clock({ format: "%A %B %e", className: "date" }),
        ],
    }),
});

export default monitor => Widget.Window({
    monitor,
    name: `desktop-${monitor}`,
    layer: "background",
    className: "desktop",
    anchor: ["top", "bottom", "left", "right"],
    child: Desktop(),
});
