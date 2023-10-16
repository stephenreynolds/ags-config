import PopupWindow from "../misc/PopupWindow.js";
import Applauncher from "./Applauncher.js";
import Notifications from "./Notifications.js";
import Calendar from "./Calendar.js";
import { Volume, SinkSelector, AppMixer } from "./Volume.js";
import { Widget } from "../imports.js";

const Row = (toggles, menus = []) => Widget.Box({
    className: "row",
    vertical: true,
    children: [
        Widget.Box({
            children: toggles,
        }),
        ...menus,
    ],
});

const Overview = () => Widget.CenterBox({
    className: "overview",
    spacing: 20,
    startWidget: Widget.Box({
        className: "left",
        children: [
            Widget.Box({
                className: "volume slider-box",
                valign: "start",
                child: Row(
                    [Volume()],
                    [SinkSelector(), AppMixer()],
                ),
            })
        ],
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
