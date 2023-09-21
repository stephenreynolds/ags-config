const { EventBox, Icon } = ags.Widget;
const { Notifications } = ags.Service;

export default () => EventBox({
    className: 'notifications panel-button',
    connections: [
        [Notifications, box => {
            box.visible =
                Notifications.notifications.length > 0 || Notifications.dnd;
        }],
        ['button-press-event', () => ags.App.openWindow('dashboard')],
    ],
    child: Icon({
        connections: [[Notifications, icon => {
            icon.icon = Notifications.dnd
                ? 'notifications-disabled-symbolic'
                : 'preferences-system-notifications-symbolic';
        }]],
    }),
});
