import Separator from "../misc/Separator.js";
import Theme from "../services/theme/theme.js";
import Clock from "../misc/Clock.js";
import DesktopMenu from "./DesktopMenu.js";
import { App, Widget } from "../imports.js";

const DesktopClock = () => Widget.Box({
    className: "clock-box-shadow",
    child: Widget.CenterBox({
        className: "clock-box",
        children: [
            Clock({
                className: "clock",
                halign: "center",
                format: "%-I",
            }),
            Widget.Box({
                className: "separator-box",
                vertical: true,
                hexpand: true,
                halign: "center",
                children: [
                    Separator({ valign: "center", vexpand: true }),
                    Separator({ valign: "center", vexpand: true }),
                ],
            }),
            Clock({
                className: "clock",
                halign: "center",
                format: "%M %p",
            }),
        ],
    }),
});

const Desktop = () => Widget.EventBox({
    onSecondaryClick: (_, event) => DesktopMenu().popup_at_pointer(event),
    onMiddleClick: print,
    child: Widget.Box({
        vertical: true,
        vexpand: true,
        hexpand: true,
        connections: [[Theme, box => {
            const [halign = "center", valign = "center", offset = 64] =
                Theme.getSetting("desktop_clock")?.split(" ") || [];

            box.halign = imports.gi.Gtk.Align[halign.toUpperCase()];
            box.valign = imports.gi.Gtk.Align[valign.toUpperCase()];
            box.setStyle(`margin: ${Number(offset)}px;`);
        }]],
        child: Widget.EventBox({
            onPrimaryClick: () => App.openWindow("dashboard"),
            child: Widget.Box({
                vertical: true,
                children: [
                    DesktopClock(),
                    Clock({ format: "%A %B %e", className: "date" }),
                ],
            }),
        }),
    }),
});

export default monitor => Widget.Window({
    monitor,
    name: `desktop${monitor}`,
    layer: "background",
    className: "desktop",
    anchor: ["top", "bottom", "left", "right"],
    child: Desktop(),
});
