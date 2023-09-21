import PanelButton from '../PanelButton.js';

const { Hyprland } = ags.Service;
const { Box, Label } = ags.Widget;

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
