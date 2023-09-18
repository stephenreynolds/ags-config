const { Box, Icon, Slider, Stack } = ags.Widget;
const Audio = ags.Service.Audio;

const Volume = () => Box({
    className: "volume",
    style: "min-width: 180px",
    children: [
        Stack({
            items: [
                ["101", Icon("audio-volume-overamplified-symbolic")],
                ["67", Icon("audio-volume-high-symbolic")],
                ["34", Icon("audio-volume-medium-symbolic")],
                ["1", Icon("audio-volume-low-symbolic")],
                ["0", Icon("audio-volume-muted-symbolic")],
            ],
            connections: [[Audio, stack => {
                if (!Audio.speaker) {
                    return;
                }

                if (Audio.speaker.isMuted) {
                    stack.shown = "0";
                    return;
                }

                const show = [101, 67, 34, 1, 0].find(
                    threshold => threshold <= Audio.speaker.volume * 100);

                stack.shown = `${show}`;
            }, "speaker-changed"]],
        }),
        Slider({
            hexpand: true,
            drawValue: false,
            onChange: ({ value }) => Audio.speaker.volume = value,
            connections: [[Audio, slider => {
                if (!Audio.speaker) {
                    return;
                }

                slider.value = Audio.speaker.volume;
            }, "speaker-changed"]],
        })
    ]
})

export default Volume;
