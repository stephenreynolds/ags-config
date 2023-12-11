import { Widget } from "resource:///com/github/Aylur/ags/widget.js";
import Workspaces from "./Workspaces.js";
import options from "../options.js";
import OverviewButton from "./OverviewButton.js";

/** @param {number} monitor */
const Bar = (monitor) => Widget.CenterBox({
    className: "bar",
    startWidget: Workspaces(monitor),
    centerWidget: OverviewButton(monitor),
});

/** @param {number} monitor */
export default (monitor) => Widget.Window({
    name: `bar-${monitor}`,
    exclusivity: "exclusive",
    monitor,
    anchor: [options.bar.position, "left", "right"],
    child: Bar(monitor)
});
