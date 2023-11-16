import Cairo from "cairo";
import icons from "./icons.js";
import Theme from "./services/theme/theme.js";
import Gdk from "gi://Gdk";
import { Hyprland, Utils, App } from "./imports.js";

export function range(length, start = 1) {
    return Array.from({ length }, (_, i) => i + start);
}

export function forMonitors(widget) {
    const n = Gdk.Display.get_default().get_n_monitors();
    return range(n, 0).map(widget);
}

export function createSurfaceFromWidget(widget) {
    const alloc = widget.get_allocation();
    const surface = new Cairo.ImageSurface(
        Cairo.Format.ARGB32,
        alloc.width,
        alloc.height,
    );
    const cr = new Cairo.Context(surface);
    cr.setSourceRGBA(255, 255, 255, 0);
    cr.rectangle(0, 0, alloc.width, alloc.height);
    cr.fill();
    widget.draw(cr);

    return surface;
}

export function getAudioTypeIcon(icon) {
    const substitues = [
        ["audio-headset-bluetooth", icons.audio.type.headset],
        ["audio-headset-analog-usb", icons.audio.type.headset],
        ["audio-card-analog-usb", icons.audio.type.speaker],
        ["audio-card-analog-pci", icons.audio.type.card],
    ];

    for (const [from, to] of substitues) {
        if (from === icon) return to;
    }

    return icon;
}

export function scssWatcher() {
    return Utils.subprocess(
        [
            "inotifywait",
            "--recursive",
            "--event",
            "create,modify",
            "-m",
            App.configDir + "/scss",
        ],
        () => Theme.setup(),
    );
}

export async function globalServices() {
    globalThis.ags = await import("./imports.js");
    globalThis.indicator = (
        await import("./services/onScreenIndicator.js")
    ).default;
    globalThis.theme = (await import("./services/theme/theme.js")).default;
    globalThis.audio = globalThis.ags.Audio;
    globalThis.mpris = globalThis.ags.Mpris;
}

export async function launchApp(app) {
    await Hyprland.sendMessage(`dispatch exec ${app.executable}`);
    app.frequency += 1;
}
