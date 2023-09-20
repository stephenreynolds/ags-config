const { execAsync } = ags.Utils;
const { Box, Label } = ags.Widget;

const Time = () => Label({
    halign: "end",
    connections: [[
        1000, label => execAsync(["date", "+%-I:%M %p"])
            .then(time => label.label = time).catch(console.error)
    ]]
})

const Date = () => Label({
    halign: "end",
    connections: [[
        1000, label => execAsync(["date", "+%a %b %e"])
            .then(date => label.label = date).catch(console.error)
    ]]
})

const Clock = () => Box({
    className: "clock",
    vertical: true,
    children: [
        Time(),
        Date(),
    ],
})

export default Clock;
