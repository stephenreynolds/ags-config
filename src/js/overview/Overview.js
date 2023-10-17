import PopupWindow from "../misc/PopupWindow.js";
import Applauncher from "./Applauncher.js";
import Notifications from "./Notifications.js";
import Calendar from "./Calendar.js";
import Media from "./Media.js";
import { NetworkToggle, WifiSelection } from "./Network.js";
import { BluetoothToggle, BluetoothDevices } from "./Bluetooth.js";
import DND from "./DND.js";
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

const Homogeneous = toggles => Widget.Box({
    homogeneous: true,
    children: toggles,
});

const Overview = () => Widget.CenterBox({
    className: "overview",
    spacing: 20,
    startWidget: Widget.Box({
        className: "left",
        vertical: true,
        halign: "start",
        spacing: 10,
        children: [
            Media(),
            Widget.Box({
                className: "volume slider-box",
                valign: "start",
                child: Row(
                    [Volume()],
                    [SinkSelector(), AppMixer()],
                ),
            }),
            Widget.Box({
                className: "network-widget",
                child: Row(
                    [Homogeneous([NetworkToggle(), BluetoothToggle()]), DND()],
                    [WifiSelection(), BluetoothDevices()],
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
