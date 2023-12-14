import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { Arrow, Menu } from './ToggleButton.js';
import { getAudioTypeIcon } from '../../utils.js';
import icons from '../../icons.js';
import { setupCursorHover } from '../../misc/cursorHover.js';

const TypeIndicator = () => Widget.Button({
    class_name: 'type-indicator',
    on_clicked: () => {
        if (!Audio.speaker) {
            return;
        }
        Audio.speaker.isMuted = !Audio.speaker.isMuted;
    },
    child: Widget.Icon({
        connections: [[ Audio, (icon) => {
            if (!Audio.speaker) {
                return;
            }

            if (Audio.speaker.isMuted) {
                icon.icon = icons.audio.mic.muted;
            }
            else {
                icon.icon = getAudioTypeIcon(Audio.speaker.iconName);
            }

            icon.tooltipText = `Volume ${Math.floor(Audio.speaker.volume * 100)}%`;
        }, 'speaker-changed' ]],
    }),
    setup: (button) => setupCursorHover(button),
});

const VolumeSlider = () => Widget.Slider({
    class_name: 'volume-slider',
    hexpand: true,
    drawValue: false,
    onChange: ({ value }) => Audio.speaker.volume = value,
    connections: [[ Audio, (slider) => {
        if (!Audio.speaker) {
            return;
        }

        slider.value = Audio.speaker.volume;
        slider.tooltipText = `Volume ${Math.floor(Audio.speaker.volume * 100)}%`;
    }, 'speaker-changed' ]],
});

const SinkItem = (stream) => Widget.Button({
    hexpand: true,
    on_clicked: () => Audio.speaker = stream,
    child: Widget.Box({
        spacing: 10,
        children: [
            Widget.Icon({
                icon: getAudioTypeIcon(stream.iconName),
                tooltipText: stream.iconName,
            }),
            Widget.Label(stream.description.split(' ').slice(0, 4).join(' ')),
            Widget.Icon({
                icon: icons.tick,
                hexpand: true,
                hpack: 'end',
                connections: [[ 'draw', (icon) => {
                    icon.visible = Audio.speaker.id === stream.id;
                } ]],
            }),
        ],
    }),
    setup: (button) => setupCursorHover(button),
});

const SettingsButton = () => Widget.Button({
    on_clicked: () => {
        App.closeWindow('overview');
        Utils.execAsync([ 'pavucontrol' ]);
    },
    hexpand: true,
    child: Widget.Box({
        spacing: 10,
        children: [
            Widget.Icon(icons.settings),
            Widget.Label('Settings'),
        ],
    }),
    setup: (button) => setupCursorHover(button),
});

const SinkSelector = () => Menu({
    name: 'sink-selector',
    title: Widget.Label({
        class_name: 'text-semibold',
        label: 'Sink Selector',
    }),
    content: Widget.Box({
        class_name: 'sink-selector',
        vertical: true,
        children: [
            Widget.Box({
                vertical: true,
                connections: [[ Audio, (box) => {
                    box.children = Audio.speakers.map(SinkItem);
                }, 'notify::speakers' ]],
            }),
            SettingsButton(),
        ],
    }),
});

const MixerItem = (stream) => Widget.Box({
    class_name: 'mixer-item',
    hexpand: true,
    spacing: 10,
    children: [
        Widget.Icon({
            binds: [[ 'tooltip-text', stream, 'name' ]],
            connections: [[ stream, (icon) => {
                icon.icon = Utils.lookUpIcon(stream.name)
                    ? stream.name
                    : icons.mpris.fallback;
            } ]],
        }),
        Widget.Box({
            spacing: 10,
            children: [
                Widget.Box({
                    vertical: true,
                    children: [
                        Widget.Label({
                            xalign: 0,
                            truncate: 'end',
                            max_width_chars: 28,
                            binds: [[ 'label', stream, 'description' ]],
                        }),
                        Widget.Slider({
                            class_name: 'app-mixer-slider',
                            hexpand: true,
                            draw_value: false,
                            binds: [[ 'value', stream, 'volume' ]],
                            on_change: ({ value }) => stream.volume = value,
                        }),
                    ],
                }),
                Widget.Label({
                    xalign: 1,
                    binds: [[ 'label', stream, 'volume', (volume) => `${Math.floor(volume * 100)}%` ]],
                }),
            ],
        }),
    ],
});

const AppMixer = () => Menu({
    name: 'app-mixer',
    title: Widget.Label({
        class_name: 'text-semibold',
        label: 'App Mixer',
    }),
    content: Widget.Box({
        class_name: 'app-mixer',
        vertical: true,
        children: [
            Widget.Box({
                vertical: true,
                binds: [[ 'children', Audio, 'apps', a => a.map(MixerItem) ]],
            }),
            SettingsButton(),
        ],
    }),
});

export default () => Widget.Box({
    class_name: 'volume',
    child: Widget.Box({
        vertical: true,
        spacing: 4,
        children: [
            Widget.Box({
                children: [
                    TypeIndicator(),
                    VolumeSlider(),
                    Arrow('sink-selector'),
                    Widget.Box({
                        child: Arrow('app-mixer'),
                        connections: [[ Audio, (self) => {
                            self.visible = Array.from(Audio.apps).length > 0;
                        } ]],
                    }),
                ],
            }),
            SinkSelector(),
            AppMixer(),
        ],
    }),
});
