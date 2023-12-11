import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Network from "resource:///com/github/Aylur/ags/service/network.js";
import icons from "../icons.js";

const NetworkIndicator = () => Widget.Stack({
    items: [
        ["wifi", Widget.Icon({
            connections: [[Network, icon => {
                icon.icon = Network.wifi?.iconName;
            }]]
        })],
        ["wired", Widget.Icon({
            connections: [[Network, icon => {
                icon.icon = Network.wired?.iconName;
            }]]
        })]
    ],
    connections: [[Network, stack => {
        stack.shown = Network.primary || "wifi";
    }]]
});

const VOLUME_CHANGE = 0.02;

const AudioIndicator = () => Widget.Icon({
    connections: [[Audio, icon => {
        if (!Audio.speaker) {
            return;
        }

        const { muted, low, medium, high, overamplified } = icons.audio.volume;
        if (Audio.speaker.isMuted) {
            return icon.icon = muted;
        }

        icon.icon = [[101, overamplified], [67, high], [34, medium], [1, low], [0, muted]]
            .find(([threshold]) => threshold <= Audio.speaker.volume * 100)[1];
    }, "speaker-changed"]],
});

export default () => Widget.Button({
    onScrollUp: () => {
        Audio.speaker.volume += VOLUME_CHANGE;
    },
    onScrollDown: () => {
        Audio.speaker.volume -= VOLUME_CHANGE;
    },
    child: Widget.Box({
        spacing: 10,
        children: [
            NetworkIndicator(),
            AudioIndicator()
        ]
    })
});
