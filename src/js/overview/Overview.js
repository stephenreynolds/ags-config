import PopupWindow from "../misc/PopupWindow.js";
import Applauncher from "./Applauncher.js";
import NotificationList from "./NotificationList.js";
import Calendar from "./Calendar.js";
import { NetworkToggle, WifiSelection } from "./Network.js";
import { BluetoothToggle, BluetoothDevices } from "./Bluetooth.js";
import DND from "./DND.js";
import SystemTray from "./SystemTray.js";
import { Volume, SinkSelector, AppMixer } from "./Volume.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";

const Row = (toggles, menus = []) =>
    Widget.Box({
        className: "row",
        vertical: true,
        children: [
            Widget.Box({
                children: toggles,
            }),
            ...menus,
        ],
    });

const Homogeneous = (toggles) =>
    Widget.Box({
        homogeneous: true,
        children: toggles,
    });

const Overview = () =>
    Widget.CenterBox({
        className: "overview",
        spacing: 20,
        startWidget: Widget.Box({
            class_name: "left",
            vertical: true,
            hpack: "start",
            spacing: 10,
            children: [
                Widget.Box({
                    vertical: true,
                    spacing: 10,
                    vexpand: true,
                    children: [
                        Widget.Box({
                            class_name: "volume slider-box",
                            vpack: "start",
                            child: Row(
                                [Volume()],
                                [SinkSelector(), AppMixer()],
                            ),
                        }),
                        Widget.Box({
                            class_name: "network-widget",
                            child: Row(
                                [
                                    Homogeneous([
                                        NetworkToggle(),
                                        BluetoothToggle(),
                                    ]),
                                    DND(),
                                ],
                                [WifiSelection(), BluetoothDevices()],
                            ),
                        }),
                    ],
                }),
                Widget.Box({
                    children: [SystemTray()],
                }),
            ],
        }),
        centerWidget: Widget.Box({
            className: "center",
            vertical: true,
            children: [Applauncher()],
        }),
        endWidget: Widget.Box({
            className: "right",
            vertical: true,
            hpack: "end",
            children: [NotificationList(), Calendar()],
        }),
    });

export default () =>
    PopupWindow({
        name: "overview",
        layer: "overlay",
        content: Overview(),
    });
