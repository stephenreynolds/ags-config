import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Indicator from '../services/onScreenIndicator.js';
import icons from '../icons.js';
import options from '../options.js';

const WorkspaceIndicator = (monitor) => Widget.Box({
    className: 'osd-workspace',
    child: Widget.Box({
        className: 'workspaces',
        connections: [[ Hyprland.active.workspace, self => {
            const workspaces = Hyprland.workspaces
                .filter(ws =>
                    ws.monitorID === monitor &&
                    ws.id !== -99 &&
                    (ws.windows > 0 || ws.id === Hyprland.active.workspace.id));

            self.children = workspaces.map(ws => Widget.Button({
                onClicked: () => Hyprland.sendMessage(`dispatch workspace ${ws.id}`),
                child: Widget.Label({
                    label: `${ws.id}`,
                    className: 'indicator',
                    vpack: 'center',
                }),
                connections: [[ Hyprland.active.workspace, btn => {
                    btn.toggleClassName('visible', Hyprland.getMonitor(monitor).activeWorkspace.id === ws.id);
                    btn.toggleClassName('active', Hyprland.active.workspace.id === ws.id);
                } ]],
            }));
        } ]],
    }),
});

const VolumeIndicator = () => Widget.Box({
    vertical: true,
    className: 'osd-volume',
    hexpand: true,
    spacing: 5,
    children: [
        Widget.Box({
            spacing: 5,
            children: [
                Widget.Slider({
                    className: 'osd-volume-slider',
                    hexpand: true,
                    vertical: false,
                    drawValue: false,
                    onChange: ({ value }) => Audio.speaker.volume = value,
                    connections: [[ Audio, (progress) => {
                        const updateValue = Audio.speaker?.volume;
                        if (!isNaN(updateValue)) {progress.value = updateValue;}
                    } ]],
                }),
                Widget.Box({
                    vexpand: true,
                    spacing: 5,
                    children: [
                        Widget.Label({
                            hexpand: false, className: 'osd-volume-value-label',
                            label: '100',
                            connections: [[ Audio, (label) => {
                                label.label = `${Math.round(Audio.speaker?.volume * 100)}`;
                            } ]],
                        }),
                        Widget.Icon({
                            connections: [[ Audio, (icon) => {
                                if (!Audio.speaker)
                                {return;}

                                const { muted, low, medium, high, overamplified } = icons.audio.volume;
                                if (Audio.speaker.stream.isMuted)
                                {return icon.icon = muted;}

                                /** @type {Array<[number, string]>} */
                                const cons = [[ 101, overamplified ], [ 67, high ], [ 34, medium ], [ 0, low ]];
                                icon.icon = cons.find(([ n ]) => n <= Audio.speaker.volume * 100)?.[1] || '';
                            }, 'speaker-changed' ]],
                        }),
                    ],
                }),
            ],
        }),
        Widget.Label({
            className: 'text-sm',
            truncate: 'end',
            connections: [[ Audio, (label) => {
                label.label = Audio.speaker?.description || '';
            } ]],
        }),
    ],
});

const isActiveMonitor = (monitor) =>
    monitor === Hyprland.monitors.find(m => m.name === Hyprland.active.monitor).id;

export default (monitor) => Widget.Window({
    name: `indicator-${monitor}`,
    monitor,
    className: 'indicator',
    layer: 'overlay',
    visible: true,
    anchor: [ 'bottom' ],
    child: Widget.Box({
        vertical: true,
        css: 'min-height: 2px;',
        children: [
            Widget.Revealer({
                transition: 'slide_up',
                transitionDuration: options.transitionDuration,
                connections: [
                    [ Indicator, (self, value) => {
                        if (!isActiveMonitor(monitor)) {
                            self.revealChild = false;
                            return;
                        }
                        self.revealChild = value > -1;
                    }, 'popup-volume' ],
                ],
                child: VolumeIndicator(),
            }),
            Widget.Revealer({
                transition: 'slide_up',
                transitionDuration: options.transitionDuration,
                hpack: 'center',
                connections: [
                    [ Indicator, (self, reveal) => {
                        if (!reveal || !isActiveMonitor(monitor)) {
                            self.revealChild = false;
                            return;
                        }
                        self.revealChild = true;
                    }, 'popup-workspace' ],
                ],
                child: WorkspaceIndicator(monitor),
            }),
        ],
    }),
});
