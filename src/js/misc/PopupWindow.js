import Widget from 'resource:///com/github/Aylur/ags/widget.js';

export default ({ name, child, ...props }) => Widget.Window({
    name,
    popup: true,
    visible: false,
    layer: 'overlay',
    child,
    ...props,
});
