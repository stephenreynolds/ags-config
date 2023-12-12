import Gtk from 'gi://Gtk';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

export default ({ orientation = 'vertical', ...rest } = {}) =>
    Widget.Separator({
        ...rest,
        orientation: Gtk.Orientation[orientation.toUpperCase()],
    });
