import Notification from "../misc/Notification.js";
import { Notifications, Widget } from "../imports.js";

const Popups = () =>
    Widget.Box({
        className: "notification-popups spacing-v-5-revealer",
        vertical: true,
        margin: 1,
        properties: [
            ["map", new Map()],

            ["dismiss", (box, id, force = false) => {
                if (!id) return;

                const notification = box._map.get(id);

                if (!notification || (notification._hovered && !force)) {
                    return;
                }

                notification.revealChild = false;
                notification._destroyWithAnims();
            }],

            ["notify", (box, id) => {
                if (!id || Notifications.dnd) return;

                const notification = Notifications.getNotification(id);

                if (!notification) return;

                box._map.delete(id);

                const newNotification = Notification({
                    notification,
                    isPopup: true,
                });

                box._map.set(id, newNotification);
                box.pack_end(box._map.get(id), false, false, 0);
                box.show_all();
            }],
        ],
        connections: [
            [Notifications, (box, id) => box._notify(box, id), "notified"],
            [Notifications, (box, id) => box._dismiss(box, id), "dismissed"],
            [Notifications, (box, id) => box._dismiss(box, id, true), "closed"],
        ],
    });

export default (monitor) =>
    Widget.Window({
        monitor,
        name: `notifications-${monitor}`,
        anchor: ["top"],
        layer: "overlay",
        child: Popups(),
    });
