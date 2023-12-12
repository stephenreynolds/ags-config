import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Indicator from "../services/onScreenIndicator.js";
import icons from "../icons.js";

const VolumeIndicator = Widget.Box({
    vertical: true,
    className: "osd-bg osd-value",
    hexpand: true,
    spacing: 5,
    children: [
        Widget.Box({
            spacing: 5,
            children: [
                Widget.Slider({
                    className: "osd-volume-slider",
                    hexpand: true,
                    vertical: false,
                    drawValue: false,
                    onChange: ({ value }) => Audio.speaker.volume = value,
                    connections: [[Audio, (progress) => {
                        const updateValue = Audio.speaker?.volume;
                        if (!isNaN(updateValue)) progress.value = updateValue;
                    }]],
                }),
                Widget.Box({
                    vexpand: true,
                    spacing: 5,
                    children: [
                        Widget.Label({
                            hexpand: false, className: "osd-value-txt",
                            label: "100",
                            connections: [[Audio, (label) => {
                                label.label = `${Math.round(Audio.speaker?.volume * 100)}`;
                            }]],
                        }),
                        Widget.Icon({
                            connections: [[Audio, (icon) => {
                                if (!Audio.speaker)
                                    return;

                                const { muted, low, medium, high, overamplified } = icons.audio.volume;
                                if (Audio.speaker.stream.isMuted)
                                    return icon.icon = muted;

                                /** @type {Array<[number, string]>} */
                                const cons = [[101, overamplified], [67, high], [34, medium], [0, low]];
                                icon.icon = cons.find(([n]) => n <= Audio.speaker.volume * 100)?.[1] || "";
                            }, "speaker-changed"]],
                        })
                    ]
                }),
            ]
        }),
        Widget.Label({
            className: "text-sm",
            truncate: "end",
            connections: [[Audio, (label) => {
                label.label = Audio.speaker?.description || "";
            }]]
        }),
    ],
});

export default (monitor) => Widget.Window({
    name: `indicator-${monitor}`,
    monitor,
    className: "indicator",
    layer: "overlay",
    visible: true,
    anchor: ["bottom"],
    child: Widget.Box({
        vertical: true,
        css: "min-height: 2px;",
        children: [
            Widget.Revealer({
                transition: "slide_up",
                connections: [
                    [Indicator, (revealer, value) => {
                        revealer.revealChild = (value > -1);
                    }, "popup"]
                ],
                child: Widget.Box({
                    hpack: "center",
                    children: [
                        VolumeIndicator
                    ]
                })
            })
        ]
    })
});
