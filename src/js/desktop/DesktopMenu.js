import Theme from "../services/theme/theme.js";
import PowerMenu from "../services/powermenu.js";
import Lockscreen from "../services/lockscreen.js";
import icons from "../icons.js";
import { App, Widget } from "../imports.js";
import Gtk from "gi://Gtk";

const Item = (label, icon, onActivate) => Widget.MenuItem({
    onActivate,
    child: Widget.Box({
        children: [
            Widget.Icon(icon),
            Widget.Label({
                label,
                hexpand: true,
                xalign: 0,
            }),
        ],
    }),
});

export default () => Widget.Menu({
    className: "desktop-menu",
    children: [
        Item("Overview", icons.apps.apps, () => App.openWindow("overview")),
        Widget.MenuItem({
            child: Widget.Box({
                children: [
                    Widget.Icon(icons.powermenu.shutdown),
                    Widget.Label({
                        label: "System",
                        hexpand: true,
                        xalign: 0,
                    }),
                ],
            }),
            submenu: Widget.Menu({
                children: [
                    Item("Lock", icons.powermenu.lock, () => Lockscreen.lockscreen()),
                    Item("Log Out", icons.powermenu.logout, () => PowerMenu.action("logout")),
                    Item("Sleep", icons.powermenu.sleep, () => PowerMenu.action("sleep")),
                    Item("Reboot", icons.powermenu.reboot, () => PowerMenu.action("reboot")),
                    Item("Shutdown", icons.powermenu.shutdown, () => PowerMenu.action("shutdown")),
                ],
            }),
        }),
        Widget({ type: Gtk.SeparatorMenuItem }),
        Item("Settings", icons.settings, () => Theme.openSettings()),
    ],
});