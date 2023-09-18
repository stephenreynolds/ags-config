const Notifications = ags.Service.Notifications;
const { Box, Icon, Label } = ags.Widget;

const Notification = () => Box({
  className: "notification",
  children: [
    Icon({
      icon: "preferences-system-notifications-symbolic",
      connections: [
        [Notifications, icon => icon.visible = Notifications.popups.length > 0],
      ],
    }),
    Label({
      connections: [[Notifications, label => {
        label.label = Notifications.popups[0]?.summary || "";
      }]],
    }),
  ]
});

export default Notification;
