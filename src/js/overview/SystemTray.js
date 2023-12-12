import PanelButton from './PanelButton.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import Gdk from 'gi://Gdk';

const onTrayItemClick = (item, btn) =>
    item.menu?.popup_at_widget(btn, Gdk.Gravity.NORTH, Gdk.Gravity.SOUTH, null);

const SysTrayItem = (item) =>
    PanelButton({
        content: Widget.Icon({ binds: [[ 'icon', item, 'icon' ]] }),
        binds: [[ 'tooltipMarkup', item, 'tooltip-markup' ]],
        setup: (btn) => {
            const id = item.menu?.connect('popped-up', (menu) => {
                btn.toggleClassName('active');
                menu.connect('notify::visible', (menu) => {
                    btn.toggleClassName('active', menu.visible);
                });
                menu.disconnect(id);
            });

            if (id) {
                btn.connect('destroy', () => item.menu?.disconnect(id));
            }
        },
        onPrimaryClick: (btn) => onTrayItemClick(item, btn),
        onSecondaryClick: (btn) => onTrayItemClick(item, btn),
    });

export default () => Widget.Box({
    class_name: 'system-tray',
    binds: [[ 'children', SystemTray, 'items', (i) => i.map(SysTrayItem) ]],
});
