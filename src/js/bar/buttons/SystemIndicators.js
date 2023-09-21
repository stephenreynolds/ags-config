import PanelButton from '../PanelButton.js';
import Indicator from '../../services/onScreenIndicator.js';
import icons from '../../icons.js';
const { App } = ags;
const { Audio, Notifications, Network } = ags.Service;
const { Box, Icon, Stack } = ags.Widget;

const MicrophoneMuteIndicator = () => Icon({
    icon: icons.audio.mic.muted,
    connections: [[Audio, icon => {
        icon.visible = Audio.microphone?.isMuted;
    }, 'microphone-changed']],
});

const DNDIndicator = () => Icon({
    icon: icons.notifications.silent,
    connections: [[Notifications, icon => {
        icon.visible = Notifications.dnd;
    }]],
});

const NetworkIndicator = () => Stack({
    items: [
        ['wifi', Icon({
            connections: [[Network, icon => {
                icon.icon = Network.wifi?.iconName;
            }]],
        })],
        ['wired', Icon({
            connections: [[Network, icon => {
                icon.icon = Network.wired?.iconName;
            }]],
        })],
    ],
    connections: [[Network, stack => {
        stack.shown = Network.primary || 'wifi';
    }]],
});

const AudioIndicator = () => Icon({
    connections: [[Audio, icon => {
        if (!Audio.speaker)
            return;

        const { muted, low, medium, high, overamplified } = icons.audio.volume;
        if (Audio.speaker.isMuted)
            return icon.icon = muted;

        icon.icon = [[101, overamplified], [67, high], [34, medium], [1, low], [0, muted]]
            .find(([threshold]) => threshold <= Audio.speaker.volume * 100)[1];
    }, 'speaker-changed']],
});

export default () => PanelButton({
    className: 'quicksettings panel-button',
    onClicked: () => App.toggleWindow('quicksettings'),
    onScrollUp: () => {
        Audio.speaker.volume += 0.02;
        Indicator.speaker();
    },
    onScrollDown: () => {
        Audio.speaker.volume -= 0.02;
        Indicator.speaker();
    },
    connections: [[App, (btn, win, visible) => {
        btn.toggleClassName('active', win === 'quicksettings' && visible);
    }]],
    child: Box({
        children: [
            MicrophoneMuteIndicator(),
            DNDIndicator(),
            NetworkIndicator(),
            AudioIndicator(),
        ],
    }),
});
