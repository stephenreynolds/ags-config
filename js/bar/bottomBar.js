import Workspaces from "./widgets/workspaces.js";
import ClientTitle from "./widgets/clientTitle.js";
import Notification from "./widgets/notification.js";
import Volume from "./widgets/volume.js";
import SysTray from "./widgets/systray.js";
import Clock from "./widgets/clock.js";

const { Box, CenterBox, Window } = ags.Widget;

const Left = (monitor) => Box({
  className: "start",
  children: [
    Workspaces(monitor),
    ClientTitle(),
  ],
});

const Center = () => Box({
  className: "center",
  children: [
    Notification(),
  ],
});

const Right = () => Box({
  className: "end",
  children: [
    Volume(),
    SysTray(),
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
