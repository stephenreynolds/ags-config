import Cairo from "cairo";
import icons from "./icons.js";
import Theme from "./services/theme/theme.js";
import { Utils, App } from "./imports.js";

export function forMonitors(widget) {
    const ws = JSON.parse(Utils.exec("hyprctl -j monitors"));
    return ws.map((mon) => widget(mon.id));
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
    globalThis.recorder = (await import("./services/screenrecord.js")).default;
    globalThis.indicator = (
        await import("./services/onScreenIndicator.js")
    ).default;
    globalThis.theme = (await import("./services/theme/theme.js")).default;
    globalThis.audio = globalThis.ags.Audio;
    globalThis.mpris = globalThis.ags.Mpris;
}

export function launchApp(app) {
    Utils.execAsync(`hyprctl dispatch exec ${app.executable}`);
    app.frequency += 1;
}
