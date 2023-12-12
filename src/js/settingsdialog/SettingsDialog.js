import Gtk from 'gi://Gtk';
import Theme from '../services/theme/theme.js';
import themes from '../themes.js';
import Wallpaper from '../misc/Wallpaper.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

const Row = (title, child) =>
    Widget.Box({
        class_name: 'row',
        children: [ Widget.Label(`${title}: `), child ],
    });

const Img = (title, prop) =>
    Row(
        title,
        Widget.FileChooserButton({
            title,
            type: Gtk.FileChooserButton,
            hexpand: true,
            hpack: 'end',
            connections: [
                [
                    'selection-changed',
                    (w) =>
                        Theme.setSetting(
                            prop,
                            w.get_uri().replace('file://', ''),
                        ),
                ],
            ],
        }),
    );

const SpinButton = (title, prop, max = 100, min = 0) =>
    Row(
        title,
        Widget.SpinButton({
            type: Gtk.SpinButton,
            setup: (w) => {
                w.set_range(min, max);
                w.set_increments(1, 1);
            },
            hexpand: true,
            hpack: 'end',
            connections: [
                [
                    'value-changed',
                    (b) => !b._block && Theme.setSetting(prop, b.value),
                ],
                [
                    Theme,
                    (b) => {
                        b._block = true;
                        b.value = Theme.getSetting(prop);
                        b._block = false;
                    },
                ],
            ],
        }),
    );

const SwitchButton = (title, prop) =>
    Row(
        title,
        Widget.Switch({
            hpack: 'end',
            hexpand: true,
            connections: [
                [
                    Theme,
                    (s) => {
                        s._block = true;
                        s.active = Theme.getSetting(prop);
                        s._block = false;
                    },
                ],
                [
                    'notify::active',
                    (s) => !s._block && Theme.setSetting(prop, s.active),
                ],
            ],
        }),
    );

const Color = (title, prop) =>
    Row(
        title,
        Widget.Box({
            hexpand: true,
            hpack: 'end',
            class_name: 'color',
            children: [
                Widget.Entry({
                    onAccept: ({ text }) => Theme.setSetting(prop, text),
                    vpack: 'center',
                    connections: [
                        [ Theme, (w) => (w.text = Theme.getSetting(prop)) ],
                    ],
                }),
                Widget.ColorButton({
                    alpha: true,
                    vpack: 'center',
                    connections: [
                        [
                            'color-set',
                            (w) => {
                                w.get_parent().children[0].set_text(
                                    w.rgba.to_string(),
                                );
                                Theme.setSetting(prop, w.rgba.to_string());
                            },
                        ],
                    ],
                }),
            ],
        }),
    );

const Text = (title, prop) =>
    Row(
        title,
        Widget.Entry({
            class_name: 'text',
            hexpand: true,
            hpack: 'end',
            connections: [[ Theme, (w) => (w.text = Theme.getSetting(prop)) ]],
            onAccept: ({ text }) => Theme.setSetting(prop, text),
        }),
    );

const TextSpinButton = (title, prop, list) =>
    Row(
        title,
        Widget.Box({
            class_name: 'text-spin',
            hexpand: true,
            hpack: 'end',
            properties: [
                [ 'values', list ],
                [
                    'step',
                    (box, step) => {
                        const label = box.get_children()[0];
                        const max = box._values.length - 1;
                        let index = box._values.indexOf(label.label) + step;

                        if (index > max) {index = 0;}

                        if (index < 0) {index = max;}

                        const value = box._values[index];
                        label.label = value;
                        Theme.setSetting(prop, value);
                    },
                ],
            ],
            children: [
                Widget.Label({
                    connections: [
                        [
                            Theme,
                            (label) => (label.label = Theme.getSetting(prop)),
                        ],
                    ],
                }),
                Widget.Button({
                    child: Widget.Icon('pan-down-symbolic'),
                    onClicked: (btn) => {
                        const box = btn.get_parent();
                        box._step(box, -1);
                    },
                }),
                Widget.Button({
                    child: Widget.Icon('pan-up-symbolic'),
                    onClicked: (btn) => {
                        const box = btn.get_parent();
                        box._step(box, +1);
                    },
                }),
            ],
        }),
    );

const FontButton = (title, prop) =>
    Row(
        title,
        Widget.FontButton({
            hexpand: true,
            hpack: 'end',
            useSize: false,
            showSize: false,
            fontName: Theme.getSetting(prop),
            connections: [
                [
                    'font-set',
                    ({ fontName }) => {
                        Theme.setSetting(prop, fontName);
                    },
                ],
            ],
        }),
    );

const page = Variable('󰒓 General');
const showPage = (p) => (page.value = p);

const Tab = (name) =>
    Widget.Button({
        hexpand: true,
        class_name: 'tab',
        onClicked: () => showPage(name),
        child: Widget.Label(name),
        connections: [
            [ page, (b) => b.toggleClassName('active', page.value === name) ],
        ],
    });

const Layout = (pages) =>
    Widget.Box({
        vertical: true,
        class_name: 'settings',
        hexpand: false,
        children: [
            Widget.Box({
                class_name: 'headerbar',
                vpack: 'start',
                child: Widget.Box({
                    class_name: 'tabs',
                    children: [
                        ...Object.keys(pages).map((page) => Tab(page)),
                        Widget.Button({
                            class_name: 'tab',
                            onClicked: () => Theme.reset(),
                            child: Widget.Label('󰦛 Reset'),
                            hexpand: true,
                        }),
                    ],
                }),
            }),
            Widget.Box({
                class_name: 'content',
                child: Widget.Stack({
                    transition: 'slide_left_right',
                    items: Object.keys(pages).map((page) => [
                        page,
                        pages[page],
                    ]),
                    binds: [[ 'shown', page ]],
                }),
            }),
            Widget.Label({
                wrap: true,
                class_name: 'disclaimer',
                label:
                    'These settings override all preset themes. ' +
                    'To make them permanent: edit ~/.config/ags/theme/themes.js',
            }),
        ],
    });

const Page = (children) =>
    Widget.Scrollable({
        child: Widget.Box({
            vertical: true,
            children,
        }),
    });

export default () =>
    Widget.Window({
        name: 'settings',
        child: Layout({
            '󰒓 General': Page([
                Wallpaper({
                    class_name: 'row',
                    hexpand: true,
                    vexpand: true,
                }),
                Img('Wallpaper', 'wallpaper'),
                SpinButton('Useless Gaps', 'wm_gaps', 128),
                SpinButton('Spacing', 'spacing', 18),
                SpinButton('Roundness', 'radii', 36),
            ]),
            '󰏘 Colors': Page([
                TextSpinButton('Color Theme', 'color_scheme', [
                    'light',
                    'dark',
                ]),
                ...[
                    'Red',
                    'Green',
                    'Yellow',
                    'Blue',
                    'Magenta',
                    'Teal',
                    'Orange',
                ].map((c) => Color(c, c.toLowerCase())),
            ]),
            '󰃟 Theme': Page([
                TextSpinButton(
                    'Theme',
                    'theme',
                    themes.map((t) => t.name),
                ),
                Color('Background Color', 'bg_color'),
                Color('Foreground Color', 'fg_color'),
                Color('Hovered Foreground Color', 'hover_fg'),
                Text('Hyprland Active Border Color', 'hypr_active_border'),
                Text('Hyprland Inactive Border Color', 'hypr_inactive_border'),
                Color('Accent Color', 'accent'),
                Color('Accent Foreground', 'accent_fg'),
                Text('Active Gradient', 'active_gradient'),
                Color('Widget Background', 'widget_bg'),
                SpinButton('Widget Opacity', 'widget_opacity'),
                Color('Border Color', 'border_color'),
                SpinButton('Border Width', 'border_width'),
                SpinButton('Border Opacity', 'border_opacity'),
            ]),
            '󰠱 Miscellaneous': Page([
                Color('Shadow', 'shadow'),
                SwitchButton('Drop Shadow', 'drop_shadow'),
                SpinButton('Transition', 'transition', 1000),
                Text('Desktop Clock Position', 'desktop_clock'),
                Color('Wallpaper Foreground Color', 'wallpaper_fg'),
                FontButton('Font', 'font'),
                FontButton('Mono Font', 'mono_font'),
                SpinButton('Font Size', 'font_size'),
            ]),
        }),
        connections: [
            [
                'delete-event',
                (win) => {
                    win.hide();
                    return true;
                },
            ],
        ],
        setup: (win) => win.set_default_size(700, 600),
    });
