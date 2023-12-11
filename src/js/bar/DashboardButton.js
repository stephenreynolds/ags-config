import App from "resource:///com/github/Aylur/ags/app.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import Clock from "./Clock.js";
import MaterialIcon from "../misc/MaterialIcon.js";
import options from "../options.js";

const NotificationIcon = () => MaterialIcon("notifications_unread", "base", {
    vpack: "center",
    connections: [[Notifications, icon => {
        icon.visible = Notifications.notifications.length > 0;
    }]]
});

export default (monitor) => Widget.Button({
    className: "dashboard-button",
    onClicked: () => App.toggleWindow("dashboard"),
    cursor: "pointer",
    child: Widget.Box({
        spacing: 8,
        children: [
            Clock(),
            monitor === options.primaryMonitor ? NotificationIcon() : null,
        ]
    })
});
