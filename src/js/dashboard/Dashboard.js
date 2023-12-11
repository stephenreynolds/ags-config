import Widget from "resource:///com/github/Aylur/ags/widget.js";
import PopupWindow from "../misc/PopupWindow.js";
import NotificationColumn from "./NotificationColumn.js";

export default () => PopupWindow({
    name: "dashboard",
    anchor: ["right", "top", "bottom"],
    transition: "slide_left",
    child: Widget.Box({
        className: "dashboard",
        children: [
            NotificationColumn(),
        ],
    }),
});
