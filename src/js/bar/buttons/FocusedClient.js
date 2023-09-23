import PanelButton from '../PanelButton.js';

const { Hyprland } = ags.Service;
const { execAsync } = ags.Utils;
const { Box, Icon, Item, Label, Menu } = ags.Widget;

export const ClientLabel = substitutes => Label({
    connections: [[Hyprland, label => {
        let name = Hyprland.active.client.class;
        substitutes.forEach(([from, to]) => {
            if (name === from)
                name = to;
        });
        label.label = name;
    }]],
});

export default () => PanelButton({
    className: 'focused-client',
    onSecondaryClick: (_, event) => Menu({
        className: 'focused-client-menu',
        children: [
            Item('Float', Icon('window-float-symbolic'), () => execAsync('hyprctl dispatch togglefloating active').catch(print)),
            Item('Maximize', Icon('window-maximize-symbolic'), () => execAsync('hyprctl dispatch fullscreen 1').catch(print)),
            Item('Close', Icon('window-close-symbolic'), () => execAsync('hyprctl dispatch closewindow active').catch(print)),
        ],
    }).popup_at_pointer(event),
    content: Box({
        child: ClientLabel([
            ['com.transmissionbt.Transmission._43_219944', 'Transmission'],
            ['com.transmissionbt.Transmission._40_219944', 'Transmission'],
            ['com.transmissionbt.Transmission._37_219944', 'Transmission'],
            ['com.obsproject.Studio', 'OBS'],
            ['com.github.wwmm.easyeffects', 'Easy Effects'],
            ['org.gnome.TextEditor', 'Text Editor'],
            ['org.gnome.design.IconLibrary', 'Icon Library'],
            ['blueberry.py', 'Blueberry'],
            ['org.wezfurlong.wezterm', 'Wezterm'],
            ['firefox', 'Firefox'],
            ['org.gnome.Nautilus', 'Files'],
            ['libreoffice-writer', 'Writer'],
            ['discord', 'Discord'],
            ['', 'Desktop'],
        ]),
    }),
});
