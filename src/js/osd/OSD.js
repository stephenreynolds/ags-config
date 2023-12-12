import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Indicator from "../services/onScreenIndicator.js";

const OsdValue = (name, labelConnections, progressConnections, props = {}) => Widget.Box({ // Volume
    ...props,
    vertical: true,
    className: "osd-bg osd-value",
    hexpand: true,
    children: [
        Widget.Box({
            vexpand: true,
            children: [
                Widget.Label({
                    xalign: 0, yalign: 0, hexpand: true,
                    className: "osd-label",
                    label: `${name}`,
                }),
                Widget.Label({
                    hexpand: false, className: "osd-value-txt",
                    label: "100",
                    connections: labelConnections,
                }),
            ]
        }),
        Widget.ProgressBar({
            className: "osd-progress",
            hexpand: true,
            vertical: false,
            connections: progressConnections,
        })
    ],
});

const VolumeIndicator = OsdValue("Volume",
    [[Audio, (label) => {
        label.label = `${Math.round(Audio.speaker?.volume * 100)}`;
    }]],
    [[Audio, (progress) => {
        const updateValue = Audio.speaker?.volume;
        if (!isNaN(updateValue)) progress.value = updateValue;
    }]],
);

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
