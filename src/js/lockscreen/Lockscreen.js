import Avatar from "../misc/Avatar.js";
import Spinner from "../misc/Spinner.js";
import Lockscreen from "../services/lockscreen.js";
import { Widget } from "../imports.js";
import Layer from "gi://GtkLayerShell";

export default monitor => Widget.Window({
    name: `lockscreen${monitor}`,
    class_name: "lockscreen",
    monitor,
    layer: "overlay",
    visible: false,
    setup: self => Layer.set_keyboard_mode(self, Layer.KeyboardMode.EXCLUSIVE),
    connections: [[Lockscreen, (w, lock) => w.visible = lock, "lock"]],
    child: Widget.Box({
        css: "min-width: 3000px; min-height: 2000px;",
        class_name: "shader",
        child: Widget.Box({
            class_name: "content",
            vertical: true,
            hexpand: true,
            vexpand: true,
            hpack: "center",
            vpack: "center",
            children: [
                Avatar({
                    shader: false,
                    hpack: "center",
                    vpack: "center",
                }),
                Widget.Box({
                    children: [
                        Widget.Entry({
                            connections: [[Lockscreen, entry => entry.text = "", "lock"]],
                            visibility: false,
                            placeholderText: "Password",
                            onAccept: ({ text }) => Lockscreen.auth(text),
                            hpack: "center",
                            hexpand: true,
                        }),
                        Spinner({
                            vpack: "center",
                            connections: [[Lockscreen, (w, auth) => w.visible = auth, "authenticating"]],
                        }),
                    ],
                }),
            ],
        }),
    }),
});
