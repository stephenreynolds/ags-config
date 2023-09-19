const Hyprland = ags.Service.Hyprland;
const { execAsync } = ags.Utils;
const { Box, Button, EventBox, Label } = ags.Widget;

export default monitor => Box({
    className: "workspaces panel-button",
    child: Box({
        children: [EventBox({
            onScrollUp: () => execAsync("hyprctl dispatch workspace r+1"),
            onScrollDown: () => execAsync("hyprctl dispatch workspace r-1"),
            className: "eventbox",
            child: Box({
                connections: [[Hyprland, box => {
                    box.children = Hyprland.workspaces
                        .filter(w => w.monitor === Hyprland.getMonitor(monitor).name && w.id != -99)
                        .map(w => Button({
                            onClicked: () => execAsync(`hyprctl dispatch workspace ${w.id}`).catch(print),
                            child: Label({
                                label: `${w.name}`,
                                className: "indicator",
                                valign: "center",
                            }),
                            connections: [[Hyprland, btn => {
                                btn.toggleClassName("active", Hyprland.active.workspace.id === w.id);
                            }]],
                        }))
                }]]
            }),
        })],
    }),
});
