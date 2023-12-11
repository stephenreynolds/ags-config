import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Workspaces from "./Workspaces.js";
import DashboardButton from "./DashboardButton.js";
import SystemTray from "./SystemTray.js";
import SystemIndicators from "./SystemIndicators.js";
import options from "../options.js";

/** @param {number} monitor */
const Bar = (monitor) => Widget.CenterBox({
    className: "bar",
    startWidget: Workspaces(monitor),
    endWidget: Widget.Box({
        hpack: "end",
        spacing: 20,
        children: [
            monitor === options.primaryMonitor ? SystemTray() : null,
            monitor === options.primaryMonitor ? SystemIndicators() : null,
            DashboardButton(monitor),
        ],
    }),
});

/** @param {number} monitor */
export default (monitor) => Widget.Window({
    name: `bar-${monitor}`,
    exclusivity: "exclusive",
    monitor,
    anchor: [options.bar.position, "left", "right"],
    child: Bar(monitor)
});
