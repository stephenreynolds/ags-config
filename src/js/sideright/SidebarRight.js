import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import PopupWindow from '../misc/PopupWindow.js';

const SidebarRight = () => Widget.Box({
    class_name: 'sidebar-right',
    vertical: true,
    vexpand: true,
    hexpand: true,
    children: [
        Widget.Label({ label: 'test' }),
    ],
});

export default () => PopupWindow({
    focusable: true,
    anchor: [ 'right', 'top', 'bottom' ],
    name: 'sideright',
    showClassName: 'sideright-show',
    hideClassName: 'sideright-hide',
    child: SidebarRight(),
});
