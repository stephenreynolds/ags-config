import DateColumn from "./DateColumn.js";
import NotificationColumn from "./NotificationColumn.js";
import PopupWindow from "../misc/PopupWindow.js";
import Separator from "../misc/Separator.js";
import { Widget } from "../imports.js";
import { Volume, SinkSelector, AppMixer } from "./Volume.js";
import Media from "./Media.js";

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

export default ({ anchor = ["bottom"], layout = ["bottom right"] } = {}) => PopupWindow({
    name: "dashboard",
    layout,
    anchor,
    content: Widget.Box({
        className: "dashboard",
        vertical: true,
        children: [
            Row(
                [
                    NotificationColumn(),
                    Separator({ orientation: "vertical" }),
                    DateColumn()
                ],
            ),
            Row(
                [
                    Row(
                        [Volume()],
                        [SinkSelector(), AppMixer()],
                    ),
                    Media(),
                ],
            ),
        ],
    }),
});
