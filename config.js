const Left = () => Box({
    children: [
        Workspaces(),
        ClientTitle(),
    ]
})

const Center = () => Box({
    children: [
        Media(),
        Notification(),
    ]
})

const Bar = ({ monitor } = {}) => Window({
    name: `bar-${monitor}`,
    className: "bar",
    monitor,
    anchor: ["top", "left", "right"],
    exclusive: true,
    child: CenterBox({
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right(),
    })
})

const scss = ags.App.configDir + '/style.scss';
const css = ags.App.configDir + '/style.css';
ags.Utils.exec(`sassc ${scss} ${css}`);

export default {
    style: css,
    style: ags.App.configDir + '/style.css',
    windows: [
        Bar(),
    ],
};
