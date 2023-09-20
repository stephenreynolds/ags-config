const Hyprland = ags.Service.Hyprland;
const { execAsync } = ags.Utils;
const { Box, Button, EventBox, Label } = ags.Widget;

const getMonitorWorkspaces = monitor =>
    Hyprland.workspaces.filter(w =>
        w.monitor === Hyprland.getMonitor(monitor).name &&
        w.id != -99);

const WorkspaceButton = workspace => Button({
    onClicked: () => execAsync(`hyprctl dispatch workspace ${workspace.id}`).catch(print),
    child: Label({
        label: `${workspace.name}`,
        className: "indicator",
        valign: "center",
    }),
    connections: [[Hyprland, btn => {
        btn.toggleClassName("active", Hyprland.active.workspace.id === workspace.id);
    }]],
});

export default monitor => Box({
    className: "workspaces panel-button",
    child: Box({
        children: [EventBox({
            onScrollUp: () => execAsync("hyprctl dispatch workspace m+1"),
            onScrollDown: () => execAsync("hyprctl dispatch workspace m-1"),
            className: "eventbox",
            child: Box({
                connections: [[Hyprland, box => {
                    box.children = getMonitorWorkspaces(monitor)
                        .map(w => WorkspaceButton(w));
                }]]
            }),
        })],
    }),
});
