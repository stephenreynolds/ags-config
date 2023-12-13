import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

export default ({ name, child, showClassName, hideClassName, ...props }) => Widget.Window({
    name,
    popup: true,
    visible: false,
    layer: 'overlay',
    ...props,
    child: Widget.Box({
        class_name: `${showClassName} ${hideClassName}`,
        connections: [[
            App, (self, currentName, visible) => {
                if (currentName === name) {
                    self.toggleClassName(hideClassName, !visible);
                }
            },
        ]],
        child,
    }),
});
