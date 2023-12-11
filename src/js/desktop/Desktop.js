import DesktopMenu from "./DesktopMenu.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";

const Desktop = () => Widget.EventBox({
    onSecondaryClick: (_, event) => DesktopMenu().popup_at_pointer(event),
});

export default monitor => Widget.Window({
    monitor,
    name: `desktop${monitor}`,
    layer: "background",
    class_name: "desktop",
    anchor: ["top", "bottom", "left", "right"],
    child: Desktop(),
});
