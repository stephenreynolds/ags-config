const Hyprland = ags.Service.Hyprland;
const { execAsync } = ags.Utils;
const { Box, Button, Label } = ags.Widget;

const Workspaces = () => Box({
  className: "workspaces",
  connections: [[Hyprland, box => {
    const arr = Array.from({ length: 9 }, (_, i) => i + 1);
    box.children = arr.map(i => Button({
      onClicked: () => execAsync(`hyprctl dispatch workspace ${i}`),
      child: Label({ label: `${i}` }),
      className: Hyprland.active.workspace.id == i ? "focused" : "",
    }));
  }]],
});

export default Workspaces;
