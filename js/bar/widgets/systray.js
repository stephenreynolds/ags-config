const { Box, Button, Icon } = ags.Widget;
const SystemTray = ags.Service.SystemTray;

const SysTray = () => Box({
    connections: [[SystemTray, box => {
        box.children = SystemTray.items.map(item => Button({
            child: Icon(),
            onPrimaryClick: (_, event) => item.activate(event),
            onSecondaryClick: (_, event) => item.openMenu(event),
            connections: [[item, button => {
                button.child.iton = item.icon;
                button.tooltipMarkup = item.tooltipMarkup;
            }]],
        }));
    }]],
})

export default SysTray;
