import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import PopupWindow from '../misc/PopupWindow.js';

const SidebarLeft = () => Widget.Box({
    className: 'sidebar-left',
    vertical: true,
    vexpand: true,
    hexpand: true,
    children: [
        Widget.Label({ label: 'test' }),
    ],
});

export default () => PopupWindow({
    focusable: true,
    anchor: [ 'left', 'top', 'bottom' ],
    name: 'sideleft',
    showClassName: 'sideleft-show',
    hideClassName: 'sideleft-hide',
    child: SidebarLeft(),
});
