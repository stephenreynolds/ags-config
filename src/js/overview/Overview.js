import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SidebarLeft from './sideleft/SidebarLeft.js';
import SidebarCenter from './sidecenter/SidebarCenter.js';
import SidebarRight from './sideright/SidebarRight.js';
import PopupWindow from '../misc/PopupWindow.js';

const Overview = () => Widget.Box({
    className: 'overview overview-hide',
    homogeneous: true,
    children: [
        SidebarLeft(),
        SidebarCenter(),
        SidebarRight(),
    ],
    connections: [[
        App, (self, currentName, visible) => {
            if (currentName === 'overview') {
                self.toggleClassName('overview-hide', !visible);
            }
        }, 'window-toggled',
    ]],
});

export default () => PopupWindow({
    focusable: true,
    anchor: [ 'top', 'bottom', 'left', 'right' ],
    name: 'overview',
    child: Overview(),
});
