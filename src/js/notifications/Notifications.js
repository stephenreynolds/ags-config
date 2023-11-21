import Notification from "../misc/Notification.js";
import { Notifications, Widget, Utils } from "../imports.js";

const Popups = () => {
    const map = new Map();

    const onDismissed = (box, id, force = false) => {
        if (!id || !map.has(id)) return;

        if (map.get(id)._hovered.value && !force) return;

        if (map.size - 1 === 0) box.get_parent().revealChild = false;

        Utils.timeout(200, () => {
            map.get(id)?.destroy();
            map.delete(id);

            const n = Notifications.getNotification(id);
            if (n.hints.transient) {
                n.close();
            }
        });
    };

    const onNotified = (box, id) => {
        if (!id || Notifications.dnd) return;

        map.delete(id);
        map.set(id, Notification(Notifications.getNotification(id)));
        box.children = Array.from(map.values()).reverse();
        Utils.timeout(10, () => {
            box.get_parent().revealChild = true;
        });
    };

    return Widget.Box({
        vertical: true,
        connections: [
            [Notifications, onNotified, "notified"],
            [Notifications, onDismissed, "dismissed"],
            [Notifications, (box, id) => onDismissed(box, id, true), "closed"],
        ],
    });
};

const PopupList = ({ transition = "slide_up" } = {}) =>
    Widget.Box({
        class_name: "notifications-popup-list",
        css: "padding: 1px",
        margin: 5,
        children: [
            Widget.Revealer({
                transition,
                child: Popups(),
            }),
        ],
    });

export default (monitor) =>
    Widget.Window({
        monitor,
        name: `notifications-${monitor}`,
        anchor: ["top"],
        layer: "overlay",
        child: PopupList(),
    });
