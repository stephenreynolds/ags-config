import OverviewButton from './buttons/OverviewButton.js';
import Workspaces from './buttons/Workspaces.js';
import DateButton from './buttons/DateButton.js';
import SysTray from './buttons/SysTray.js';
import SystemIndicators from './buttons/SystemIndicators.js';
import ScreenRecord from './buttons/ScreenRecord.js';
import BatteryBar from './buttons/BatteryBar.js';
const { Window, CenterBox, Box } = ags.Widget;
const { SystemTray } = ags.Service;

const submenuItems = ags.Variable(1);
SystemTray.instance.connect('changed', () => {
    submenuItems.setValue(SystemTray.items.length + 1);
});

const Start = monitor => Box({
    className: 'start',
    children: [
        OverviewButton(),
        Workspaces(monitor),
        Box({ hexpand: true }),
    ],
});

const Center = () => Box({
    className: 'center',
    children: [
    ],
});

const End = () => Box({
    className: 'end',
    children: [
        Box({ hexpand: true }),
        SysTray(),
        ScreenRecord(),
        BatteryBar(),
        SystemIndicators(),
        DateButton(),
    ],
});

export default monitor => Window({
    name: `bar${monitor}`,
    exclusive: true,
    monitor,
    anchor: ['bottom', 'left', 'right'],
    child: CenterBox({
        className: 'panel',
        startWidget: Start(monitor),
        centerWidget: Center(),
        endWidget: End(),
    }),
});
