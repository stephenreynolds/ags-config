import Gdk from 'gi://Gdk';
import Gtk from 'gi://Gtk';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import MaterialIcon from './MaterialIcon.js';
import AnimatedCircProg from './AnimatedCircProg.js';
import { setupCursorHover } from './cursorHover.js';
import dayjs from '../lib/dayjs/dayjs.js';
import relativeTime from '../lib/dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);

function guessMessageType(summary) {
    if (summary.includes('recording')) {return 'screen_record';}
    if (summary.includes('battery') || summary.includes('power'))
    {return 'power';}
    if (summary.includes('screenshot')) {return 'screenshot_monitor';}
    if (summary.includes('welcome')) {return 'waving_hand';}
    if (summary.includes('time')) {return 'scheduleb';}
    if (summary.includes('installed')) {return 'download';}
    if (summary.includes('update')) {return 'update';}
    if (summary.startsWith('file')) {return 'folder_copy';}
    return 'chat';
}

const NotificationIcon = (notification) => {
    if (notification.image) {
        return Widget.Box({
            className: 'notification-icon',
            valign: Gtk.Align.CENTER,
            hexpand: false,
            css: `
                background-image: url('${notification.image}');
                background-size: auto 100%;
                background-repeat: no-repeat;
                background-position: center;
                `,
        });
    }

    let iconName = 'NO_ICON';
    if (Utils.lookUpIcon(notification.appIcon)) {
        iconName = notification.appIcon;
    }
    if (Utils.lookUpIcon(notification.appEntry)) {
        iconName = notification.appEntry;
    }

    return Widget.Box({
        valign: Gtk.Align.CENTER,
        hexpand: false,
        className: 'notification-icon',
        setup: box => {
            let icon;

            if (iconName !== 'NO_ICON') {
                icon = Widget.Icon({
                    iconName,
                    halign: Gtk.Align.CENTER, hexpand: true,
                    valign: Gtk.Align.CENTER,
                    setup: (self) => {
                        box.toggleClassName(`notification-icon-material-${notification.urgency}`, true);
                        Utils.timeout(1, () => {
                            const styleContext = self.get_parent().get_style_context();
                            const width = styleContext.get_property('min-width', Gtk.StateFlags.NORMAL);
                            const height = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL);
                            self.size = Math.max(width * 0.9, height * 0.9, 1);
                        });
                    },
                });
            }
            else {
                // FIXME: release_alert icon is missing, using error for now
                iconName = notification.urgency === 'critical'
                    ? 'error'
                    : guessMessageType(notification.summary.toLowerCase());
                icon = MaterialIcon(iconName, '3xl', {
                    hexpand: true,
                    setup: () => box.toggleClassName(`notification-icon-material-${notification.urgency}`, true),
                });
            }

            box.pack_start(icon, false, true, 0);
        },
    });
};

export default ({ notification, isPopup = false, popupTimeout = 3000, props = {} } = {}) => {
    const command = isPopup
        ? () => notification.dismiss()
        : () => notification.close();

    const destroyWithAnims = () => {
        widget.sensitive = false;
        notificationBox.setCss(rightAnim1);
        Utils.timeout(200, () => {
            wholeThing.revealChild = false;
        });
        Utils.timeout(400, () => {
            command();
            wholeThing.destroy();
        });
    };

    const display = Gdk.Display.get_default();

    const widget = Widget.EventBox({
        onHover: (self) => {
            self.window.set_cursor(Gdk.Cursor.new_from_name(display, 'grab'));
            if (!wholeThing._hovered) {wholeThing._hovered = true;}
        },
        onHoverLost: (self) => {
            self.window.set_cursor(null);
            if (wholeThing._hovered) {wholeThing._hovered = false;}
        },
        onMiddleClick: () => destroyWithAnims(),
    });

    const wholeThing = Widget.Revealer({
        properties: [
            [ 'id', notification.id ],
            [ 'close', undefined ],
            [ 'hovered', false ],
            [ 'dragging', false ],
            [ 'destroyWithAnims', () => destroyWithAnims ],
        ],
        revealChild: false,
        transition: 'slide_down',
        transitionDuration: 200,
        child: Widget.Box({
            homogeneous: true,
        }),
    });

    const content = Widget.Box({
        ...props,
        className: `${isPopup ? 'popup-' : ''}notification-${notification.urgency} spacing-h-10`,
        children: [
            NotificationIcon(notification),
            Widget.Box({
                vpack: 'center',
                vertical: true,
                hexpand: true,
                children: [
                    Widget.Box({
                        children: [
                            Widget.Label({
                                className: 'text-lg text-semibold titlefont',
                                label: notification.summary,
                                xalign: 0,
                                justify: Gtk.Justification.LEFT,
                                hexpand: true,
                                maxWidthChars: 24,
                                truncate: 'end',
                                ellipsize: 3,
                                wrap: true,
                                useMarkup: notification.summary.startsWith('<'),
                            }),
                            Widget.Label({
                                className: 'text-sm text-semibold',
                                vpack: 'center',
                                justify: Gtk.Justification.RIGHT,
                                label: !isPopup ? dayjs.unix(notification.time).fromNow() : null,
                            }),
                        ],
                    }),
                    Widget.Label({
                        className: `text-base notification-body-${notification.urgency}`,
                        xalign: 0,
                        useMarkup: true,
                        justify: Gtk.Justification.LEFT,
                        wrap: true,
                        label: notification.body,
                    }),
                ],
            }),
            Widget.Overlay({
                child: AnimatedCircProg({
                    className: `notification-circprog-${notification.urgency}`,
                    vpack: 'center',
                    initFrom: isPopup ? 100 : 0,
                    initTo: 0,
                    initAnimTime: popupTimeout,
                }),
                overlays: [
                    Widget.Button({
                        className: 'notification-close-btn',
                        onClicked: () => destroyWithAnims,
                        child: MaterialIcon('close', 'xl', {
                            vpack: 'center',
                        }),
                        setup: button => setupCursorHover(button),
                    }),
                ],
            }),
        ],
    });

    const gesture = Gtk.GestureDrag.new(widget);
    let initialDir = 0;
    // In px
    const startMargin = 0;
    const dragThreshold = 100;
    // In rem
    const maxOffset = 10.227;
    const endMargin = 20.455;
    const leftAnim1 = `transition: 200ms cubic-bezier(0.05, 0.7, 0.1, 1);
                       margin-left: -${Number(maxOffset + endMargin)}rem;
                       margin-right: ${Number(maxOffset + endMargin)}rem;
                       opacity: 0;`;
    const rightAnim1 = `transition: 200ms cubic-bezier(0.05, 0.7, 0.1, 1);
                        margin-left:   ${Number(maxOffset + endMargin)}rem;
                        margin-right: -${Number(maxOffset + endMargin)}rem;
                        opacity: 0;`;

    const notificationBox = Widget.Box({
        properties: [
            [ 'leftAnim1', leftAnim1 ],
            [ 'rightAnim1', rightAnim1 ],
            [ 'ready', false ],
        ],
        homogeneous: true,
        children: [ content ],
        connections: [
            [ gesture, (self) => {
                let offset = gesture.get_offset()[1];
                if (initialDir === 0 && offset !== 0) {
                    initialDir = offset > 0 ? 1 : -1;
                }

                if (offset > 0) {
                    if (initialDir < 0) {
                        self.setCss('margin-left: 0px; margin-right: 0px;');
                    } else {
                        self.setCss(`
                            margin-left:   ${Number(offset + startMargin)}px;
                            margin-right: -${Number(offset + startMargin)}px;
                        `);
                    }
                } else if (offset < 0) {
                    if (initialDir > 0) {
                        self.setCss('margin-left: 0px; margin-right: 0px;');
                    } else {
                        offset = Math.abs(offset);
                        self.setCss(`
                            margin-right: ${Number(offset + startMargin)}px;
                            margin-left: -${Number(offset + startMargin)}px;
                        `);
                    }
                }

                wholeThing._dragging = Math.abs(offset) > 10;

                if (widget.window) {
                    widget.window.set_cursor(
                        Gdk.Cursor.new_from_name(display, 'grabbing'),
                    );
                }
            }, 'drag-update' ],

            [ gesture, (self) => {
                if (!self._ready) {
                    wholeThing.revealChild = true;
                    self._ready = true;
                    return;
                }

                const offset = gesture.get_offset()[1];

                if (Math.abs(offset) > dragThreshold && offset * initialDir > 0) {
                    if (offset > 0) {
                        self.setCss(rightAnim1);
                        widget.sensitive = false;
                    } else {
                        self.setCss(leftAnim1);
                        widget.sensitive = false;
                    }
                    Utils.timeout(200, () => {
                        wholeThing.revealChild = false;
                    });
                    Utils.timeout(400, () => {
                        command();
                        wholeThing.destroy();
                    });
                } else {
                    self.setCss(`transition: margin 200ms cubic-bezier(0.05, 0.7, 0.1, 1), opacity 200ms cubic-bezier(0.05, 0.7, 0.1, 1);
                                   margin-left:  ${startMargin}px;
                                   margin-right: ${startMargin}px;
                                   margin-bottom: unset; margin-top: unset;
                                   opacity: 1;`);

                    if (widget.window) {
                        widget.window.set_cursor(Gdk.Cursor.new_from_name(display, 'grab'));
                    }

                    wholeThing._dragging = false;
                }
                initialDir = 0;
            }, 'drag-end' ],
        ],
    });

    widget.add(notificationBox);
    wholeThing.child.children = [ widget ];

    return wholeThing;
};
