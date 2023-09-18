import Workspaces from "./widgets/workspaces.js";
import ClientTitle from "./widgets/clientTitle.js";
import Media from "./widgets/media.js";
import Notification from "./widgets/notification.js";
import Volume from "./widgets/volume.js";
import SysTray from "./widgets/systray.js";
import Clock from "./widgets/clock.js";

const { Box, CenterBox, Window } = ags.Widget;

const left = () => Box({
  children: [
    Workspaces(),
    ClientTitle(),
  ],
});

const Center = () => Box({
  children: [
    Media(),
    Notification(),
  ],
});

const Right = () => Box({
  halign: "end",
  children: [
    Volume(),
    SysTray(),
    Clock(),
  ],
});

export default monitor => Window({
  name: `bar-${monitor}`,
  className: "bar",
  monitor,
  anchor: ["bottom", "left", "right"],
  exclusive: true,
  child: CenterBox({
    startWidget: left(),
    centerWidget: Center(),
    endWidget: Right(),
  }),
});
