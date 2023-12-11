import { Widget } from "resource:///com/github/Aylur/ags/widget.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";

/** @param {number} monitor */
const Workspaces = (monitor) => Widget.Box({
    className: "workspaces",
    connections: [[Hyprland.active.workspace, self => {
        const workspaces = Hyprland.workspaces
            .filter(ws =>
                ws.monitorID === monitor &&
                ws.id !== -99 &&
                (ws.windows > 0 || ws.id === Hyprland.active.workspace.id));

        self.children = workspaces.map(ws => Widget.Button({
            onClicked: () => Hyprland.sendMessage(`dispatch workspace ${ws.id}`),
            child: Widget.Label({
                label: `${ws.id}`,
                className: "indicator",
                vpack: "center"
            }),
            connections: [[Hyprland.active.workspace, btn => {
                btn.toggleClassName("visible", Hyprland.getMonitor(monitor).activeWorkspace.id === ws.id);
                btn.toggleClassName("active", Hyprland.active.workspace.id === ws.id);
            }]]
        }));
    }]],
});

export default (monitor) => Widget.EventBox({
    className: "workspaces",
    onScrollUp: () => Hyprland.sendMessage("dispatch workspace r+1"),
    onScrollDown: () => Hyprland.sendMessage("dispatch workspace r-1"),
    child: Workspaces(monitor),
});
