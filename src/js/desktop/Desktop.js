import Separator from "../misc/Separator.js";
import Theme from "../services/theme/theme.js";
import Clock from "../misc/Clock.js";
import DesktopMenu from "./DesktopMenu.js";
import { Widget } from "../imports.js";

const DesktopClock = () => Widget.Box({
    class_name: "clock-box-shadow",
    child: Widget.CenterBox({
        class_name: "clock-box",
        children: [
            Clock({
                class_name: "clock",
                hpack: "center",
                format: "%-I",
            }),
            Widget.Box({
                class_name: "separator-box",
                vertical: true,
                hexpand: true,
                hpack: "center",
                children: [
                    Separator({ vpack: "center", vexpand: true }),
                    Separator({ vpack: "center", vexpand: true }),
                ],
            }),
            Clock({
                class_name: "clock",
                hpack: "center",
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
            const [hpack = "center", vpack = "center", offset = 64] =
                Theme.getSetting("desktop_clock")?.split(" ") || [];

            box.hpack = hpack;
            box.vpack = vpack;
            box.setCss(`margin: ${Number(offset)}px;`);
        }]],
        child: Widget.Box({
            vertical: true,
            children: [
                DesktopClock(),
                Clock({ format: "%A %B %e", class_name: "date" }),
            ],
        }),
    }),
});

export default monitor => Widget.Window({
    monitor,
    name: `desktop${monitor}`,
    layer: "background",
    class_name: "desktop",
    anchor: ["top", "bottom", "left", "right"],
    child: Desktop(),
});
