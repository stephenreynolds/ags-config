import Gtk from 'gi://Gtk';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Notifications from 'resource:///com/github/Aylur/ags/service/notifications.js';
import MaterialIcon from '../../misc/MaterialIcon.js';
import { setupCursorHover } from '../../misc/cursorHover.js';
import Notification from '../../misc/Notification.js';

const NotificationList = Widget.Box({
    className: 'spacing-v-5-revealer',
    vertical: true,
    vpack: 'start',
    connections: [
        [ Notifications, (box, id) => {
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
        }, 'notified' ],

        [ Notifications, (box, id) => {
            if (!id) {
                return;
            }

            for (const ch of box.children) {
                if (ch._id === id) {
                    ch._destroyWithAnims();
                }
            }
        }, 'closed' ],

        [ Notifications, box => box.visible = Notifications.notifications.length > 0 ],
    ],
});

export default (props) => {
    const listTitle = Widget.Revealer({
        revealChild: false,
        connections: [[ Notifications, (revealer) => {
            revealer.revealChild = Notifications.notifications.length > 0;
        } ]],
        child: Widget.Box({
            vpack: 'start',
            className: 'sidebar-group-invisible text',
            children: [
                Widget.Label({
                    className: 'text-xl',
                    hexpand: true,
                    xalign: 0,
                    label: 'Notifications',
                }),
                Widget.Button({
                    className: 'notification-closeall-btn',
                    onClicked: () => Notifications.clear(),
                    child: Widget.Box({
                        className: 'spacing-h-5',
                        children: [
                            MaterialIcon('clear_all', 'base'),
                            Widget.Label({
                                className: 'text-lg',
                                label: 'Clear',
                            }),
                        ],
                    }),
                    setup: button => setupCursorHover(button),
                }),
            ],
        }),
    });

    const listContents = Widget.Scrollable({
        hexpand: true,
        hscroll: 'never',
        vscroll: 'automatic',
        child: Widget.Box({
            vexpand: true,
            children: [ NotificationList ],
        }),
    });

    listContents.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC);
    const vScrollbar = listContents.get_vscrollbar();
    vScrollbar.get_style_context().add_class('sidebar-scrollbar');

    return Widget.Box({
        ...props,
        className: 'sidebar-group-invisible spacing-v-5',
        vertical: true,
        vexpand: true,
        children: [
            listTitle,
            listContents,
        ],
    });
};
