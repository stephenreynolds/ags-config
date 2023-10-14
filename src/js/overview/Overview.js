import PopupWindow from "../misc/PopupWindow.js";
import Applauncher from "./Applauncher.js";
import Notifications from "./Notifications.js";
import Calendar from "./Calendar.js";
import { Widget } from "../imports.js";

const Overview = () => Widget.CenterBox({
    className: "overview",
    spacing: 20,
    startWidget: Widget.Box({
        className: "left",
    }),
    centerWidget: Widget.Box({
        className: "center",
        children: [
            Applauncher(),
        ],
    }),
    endWidget: Widget.Box({
        className: "right",
        vertical: true,
        halign: "end",
        children: [
            Notifications(),
            Calendar(),
        ],
    }),
});

export default () => PopupWindow({
    name: "overview",
    expand: true,
    layer: "overlay",
    content: Overview(),
});
