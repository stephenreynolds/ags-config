import PanelButton from '../PanelButton.js';
const { Box, EventBox, Icon, Label } = ags.Widget;
const { Notifications } = ags.Service;
const { DateTime } = imports.gi.GLib;

const Clock = ({
    interval = 1000,
} = {}) => Box({
    className: 'clock',
    vertical: true,
    connections: [[interval, box =>
        box.children = [
            Label({
                halign: "end",
                label: DateTime.new_now_local().format("%-I:%M %p"),
            }),
            Label({
                halign: "end",
                label: DateTime.new_now_local().format("%a %b %e"),
            })
        ]
    ]],
});

const NotificationIndicator = () => EventBox({
    className: 'notifications',
    child: Icon({
        connections: [[Notifications, icon => {
            icon.visible = Notifications.notifications.length > 0;
            icon.icon = Notifications.dnd
                ? 'notifications-disabled-symbolic'
                : 'preferences-system-notifications-symbolic';
        }]],
    }),
});

export default () => PanelButton({
    className: 'dashboard panel-button date-button',
    onClicked: () => ags.App.toggleWindow('dashboard'),
    connections: [[ags.App, (btn, win, visible) => {
        btn.toggleClassName('active', win === 'dashboard' && visible);
    }]],
    child: Box({
        spacing: 10,
        children: [
            Clock(),
            NotificationIndicator(),
        ],
    }),
});
