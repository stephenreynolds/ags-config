const { execAsync } = ags.Utils;
const { Label } = ags.Widget;

const Clock = () => Label({
    className: "clock",
    connections: [[
        1000, label => execAsync(["date", "+%a %b %e %-I:%M %p"])
            .then(date => label.label = date).catch(console.error)
    ]]
})

export default Clock;
