import { Widget, App, Applications } from "../imports.js";
import Separator from "../misc/Separator.js";
import icons from "../icons.js";
import { launchApp } from "../utils.js";

const AppItem = app => Widget.Button({
    class_name: "app",
    on_clicked: () => {
        App.closeWindow("overview");
        launchApp(app);
    },
    child: Widget.Box({
        children: [
            Widget.Icon({
                icon: app.iconName,
                size: 48,
            }),
            Widget.Box({
                vertical: true,
                children: [
                    Widget.Label({
                        class_name: "title",
                        label: app.name,
                        xalign: 0,
                        vpack: "center",
                        ellipsize: 3,
                    }),
                    Widget.Label({
                        class_name: "description",
                        label: app.description || "",
                        wrap: true,
                        xalign: 0,
                        justification: "left",
                        vpack: "center",
                    }),
                ],
            }),
        ],
    }),
});

export default () => {
    const list = Widget.Box({ vertical: true });

    const placeholder = Widget.Label({
        label: "    Couldn't find a match",
        class_name: "placeholder",
    });

    const entry = Widget.Entry({
        hexpand: true,
        text: "-",
        placeholderText: "Search",
        onAccept: ({ text }) => {
            const list = Applications.query(text);
            if (list[0]) {
                App.toggleWindow("overview");
                list[0].launch();
            }
        },
        onChange: ({ text }) => {
            list.children = Applications.query(text).map(app => [
                Separator(),
                AppItem(app),
            ]).flat();
            list.add(Separator());
            list.show_all();

            placeholder.visible = list.children.length === 1;
        },
    });

    return Widget.Box({
        class_name: "applauncher",
        properties: [["list", list]],
        vertical: true,
        children: [
            Widget.Box({
                class_name: "header",
                children: [
                    Widget.Icon(icons.apps.search),
                    entry,
                ],
            }),
            Widget.Scrollable({
                hscroll: "never",
                hexpand: true,
                vexpand: true,
                child: Widget.Box({
                    vertical: true,
                    children: [list, placeholder],
                }),
            }),
        ],
        connections: [[App, (_, name, visible) => {
            if (name !== "overview")
                return;

            entry.set_text("");
            if (visible)
                entry.grab_focus();
        }]],
    });
};
