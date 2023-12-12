import Widget from 'resource:///com/github/Aylur/ags/widget.js';

export default ({ class_name, content, ...rest }) =>
    Widget.Button({
        class_name: `panel-button ${class_name}`,
        child: Widget.Box({ children: [ content ] }),
        ...rest,
    });
