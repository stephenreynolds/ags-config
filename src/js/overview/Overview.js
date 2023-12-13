import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SidebarLeft from './sideleft/SidebarLeft.js';
import SidebarCenter from './sidecenter/SidebarCenter.js';
import SidebarRight from './sideright/SidebarRight.js';
import PopupWindow from '../misc/PopupWindow.js';

const Overview = () => Widget.Box({
    homogeneous: false,
    children: [
        SidebarLeft(),
        SidebarCenter(),
        SidebarRight(),
    ],
});

export default () => PopupWindow({
    focusable: true,
    anchor: [ 'top', 'bottom', 'left', 'right' ],
    name: 'overview',
    child: Overview(),
});
