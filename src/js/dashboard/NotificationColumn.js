import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import { timeout } from "resource:///com/github/Aylur/ags/utils.js";
import icons from "../icons.js";
import Notification from "../misc/Notification.js";

const ClearButton = () => Widget.Button({
    onClicked: () => {
        const list = Array.from(Notifications.notifications);
        for (let i = 0; i < list.length; i++) {
            timeout(50 * i, () => list[i]?.close());
        }
    },
    binds: [["sensitive", Notifications, "notifications", n => n.length > 0]],
    child: Widget.Box({
        children: [
            Widget.Label("Clear "),
            Widget.Icon({
                binds: [["icon", Notifications, "notifications", n =>
                    n.length > 0 ? icons.trash.full : icons.trash.empty]]
            })
        ]
    })
});

const Header = () => Widget.Box({
    className: "header",
    children: [
        Widget.Label({
            label: "Notifications",
            hexpand: true,
            xalign: 0
        }),
        ClearButton(),
    ]
});

const NotificationList = () => Widget.Box({
    className: "spacing-v-5-revealer",
    vertical: true,
    vpack: "end",
    connections: [
        [Notifications, (box, id) => {
            if (box.children.length === 0) {
                Notifications.notifications
                    .forEach(notification => {
                        box.pack_end(Notification({
                            notification,
                            isPopup: false,
                        }), false, false, 0);
                    });
                box.show_all();
            }
            else if (id) {
                const notification = Notifications.getNotification(id);
                const newNotification = Notification({
                    notification,
                    isPopup: false,
                });
                if (newNotification) {
                    box.pack_end(newNotification, false, false, 0);
                    box.show_all();
                }
            }
        }, "notified"],

        [Notifications, (box, id) => {
            if (!id) {
                return;
            }

            for (const ch of box.children) {
                if (ch._id === id) {
                    ch._destroyWithAnims();
                }
            }
        }, "closed"],

        [Notifications, box => box.visible = Notifications.notifications.length > 0],
    ]
});

export default () => Widget.Box({
    className: "notifications",
    vertical: true,
    children: [
        Header(),
        Widget.Scrollable({
            className: "notification-scrollale",
            vexpand: true,
            child: Widget.Box({
                className: "notification-list",
                vertical: true,
                children: [
                    NotificationList()
                ]
            })
        })
    ]
});
