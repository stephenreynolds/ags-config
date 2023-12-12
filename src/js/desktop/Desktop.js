import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Clock from '../misc/Clock.js';

const DesktopClock = () => Widget.Box({
    children: [
        Clock(),
    ],
});

const Desktop = () => Widget.EventBox({
    child: DesktopClock(),
});

export default monitor => Widget.Window({
    monitor,
    name: `desktop-${monitor}`,
    layer: 'background',
    anchor: [ 'top', 'bottom', 'left', 'right' ],
    child: Desktop(),
});
