import { Widget, App, Applications } from "../imports.js";
import Separator from "../misc/Separator.js";
import icons from "../icons.js";
import { launchApp } from "../utils.js";
import Fuse from "../lib/fuse.js";

const AppItem = (app) =>
    Widget.Button({
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

const fuseOptions = {
    keys: [
        { name: "name", weight: 5 },
        { name: "description", weight: 1 },
    ],
    includeScore: true,
    sortFn: (a, b) => {
        if (a.score === b.score) {
            const aFrequency = Applications.list.find(
                (app) =>
                    app.name === a.item[0].v &&
                    (a.item[1] ? app.description === a.item[1].v : true),
            ).frequency;
            const bFrequency = Applications.list.find(
                (app) =>
                    app.name === b.item[0].v &&
                    (b.item[1] ? app.description === b.item[1].v : true),
            ).frequency;

            return bFrequency - aFrequency;
        }

        return a.score - b.score;
    },
};

const fuse = new Fuse(Applications.list, fuseOptions);

function filterApps(term) {
    const entries = fuse.search(term);
    return entries.map((entry) =>
        Applications.list.find((app) => app.name === entry.item.name),
    );
}

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
            let items = [];
            if (text === "") {
                items = Applications.query(text);
            } else {
                items = filterApps(text);
            }
            list.children = items
                .map((app) => [Separator(), AppItem(app)])
                .flat();
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
                children: [Widget.Icon(icons.apps.search), entry],
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
        connections: [
            [
                App,
                (_, name, visible) => {
                    if (name !== "overview") return;

                    entry.set_text("");
                    if (visible) entry.grab_focus();
                },
            ],
        ],
    });
};
