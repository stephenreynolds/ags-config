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

const Bar = ({ monitor } = {}) => Window({
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

const scss = ags.App.configDir + "/style.scss";
const css = ags.App.configDir + "/style.css";
ags.Utils.exec(`sassc ${scss} ${css}`);

export default {
  style: css,
  style: ags.App.configDir + "/style.css",
  windows: [
    Bar(),
  ],
};
