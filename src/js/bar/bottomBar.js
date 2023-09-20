import Workspaces from "./widgets/workspaces.js";
import SystemTray from "./widgets/systray.js";
import Clock from "./widgets/clock.js";

const { Box, CenterBox, Window } = ags.Widget;

const Left = (monitor) => Box({
    className: "start",
    children: [
        Workspaces(monitor),
    ],
});

const Center = () => Box({
    className: "center",
    children: [
    ],
});

const Right = () => Box({
    className: "end",
    halign: "end",
    spacing: 20,
    children: [
        SystemTray(),
        Clock(),
    ],
});

export default monitor => Window({
    name: `bar-${monitor}`,
    monitor,
    anchor: ["bottom", "left", "right"],
    exclusive: true,
    child: CenterBox({
        className: "bar",
        startWidget: Left(monitor),
        centerWidget: Center(),
        endWidget: Right(),
    }),
});
