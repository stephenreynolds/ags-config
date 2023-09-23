import PopupWindow from '../misc/PopupWindow.js';
import Workspace from './Workspace.js';
const { Hyprland } = ags.Service;

export default () => PopupWindow({
    name: 'overview',
    content: ags.Widget.Box({
        className: 'overview',
        properties: [
            ['update', box => {
                ags.Utils.execAsync('hyprctl -j clients')
                    .catch(logError)
                    .then(clients => {
                        const json = JSON.parse(clients);
                        box.children.forEach(ch => ch.update(json));
                    });
            }],
        ],
        setup: box => box._update(box),
        connections: [[ags.Service.Hyprland, box => {
            if (!ags.App.getWindow('overview').visible)
                return;

            box.children = Hyprland.workspaces.map(w => Workspace(w.id));

            box._update(box);
        }]],
    }),
});
