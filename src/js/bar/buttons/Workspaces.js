const { Hyprland } = ags.Service;
const { Box, Button, EventBox, Label } = ags.Widget;
const { execAsync } = ags.Utils;

const getMonitorWorkspaces = monitor =>
    Hyprland.workspaces
        .filter(w =>
            w.monitor === Hyprland.getMonitor(monitor).name &&
            w.id != -99)
        .sort((a, b) => a.id - b.id);

const WorkspaceButton = (workspace, monitor) => Button({
    onClicked: () => execAsync(`hyprctl dispatch workspace ${workspace.id}`).catch(print),
    child: Label({
        label: `${workspace.name}`,
        className: 'indicator',
        valign: 'center',
    }),
    connections: [[Hyprland, btn => {
        btn.toggleClassName('active', Hyprland.getMonitor(monitor).activeWorkspace.id === workspace.id);
        btn.toggleClassName('focused', Hyprland.active.workspace.id === workspace.id);
    }, 'changed']],
});

export default monitor => Box({
    className: 'workspaces pnel-button',
    child: Box({
        children: [EventBox({
            onScrollUp: () => execAsync('hyprctl dispatch workspace m+1'),
            onScrollDown: () => execAsync('hyprctl dispatch workspace m-1'),
            className: 'eventbox',
            child: Box({
                className: 'inner',
                valign: 'center',
                connections: [[Hyprland, box => {
                    box.children = getMonitorWorkspaces(monitor)
                        .map(w => WorkspaceButton(w, monitor));
                }, 'changed']]
            }),
        })],
    }),
});
