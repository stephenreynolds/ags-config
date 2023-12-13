import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import PopupWindow from '../misc/PopupWindow.js';

const SidebarCenter = () => Widget.Box({
    className: 'sidebar-center',
    vertical: true,
    vexpand: true,
    hexpand: true,
    children: [
        Widget.Label({ label: 'test' }),
    ],
});

export default () => PopupWindow({
    focusable: true,
    anchor: [ 'top', 'bottom' ],
    name: 'sidecenter',
    showClassName: 'sidecenter-show',
    hideClassName: 'sidecenter-hide',
    child: SidebarCenter(),
});
