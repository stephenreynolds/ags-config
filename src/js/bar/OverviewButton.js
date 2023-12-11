import { Widget } from "resource:///com/github/Aylur/ags/widget.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import Clock from "./Clock.js";
import MaterialIcon from "../misc/MaterialIcon.js";
import options from "../options.js";

const NotificationIcon = () => MaterialIcon("notifications_unread", "base", {
    vpack: "center",
    connections: [[Notifications, icon => {
        const visible = Notifications.notifications.length > 0;
        icon.css = `opacity: ${visible ? 1 : 0};`;
    }]]
});

export default (monitor) => Widget.Button({
    onClicked: () => console.log("OverviewButton clicked"),
    className: "overview-button",
    cursor: "pointer",
    child: Widget.Box({
        spacing: 8,
        children: [
            Clock(),
            monitor === options.primaryMonitor ? NotificationIcon() : null,
        ]
    })
});
