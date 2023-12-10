import App from "resource:///com/github/Aylur/ags/app.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";

const noAlphaignore = ["verification", "powermenu", "overview"];

export default async function({
    wm_gaps,
    border_width,
    hypr_active_border,
    hypr_inactive_border,
    hypr_group_active,
    hypr_group_inactive,
    hypr_group_locked_active,
    wm_rounding,
    drop_shadow,
}) {
    try {
        App.connect("config-parsed", () => {
            for (const [name] of App.windows) {
                Hyprland.sendMessage([
                    "keyword",
                    "layerrule",
                    `unset, ${name}`,
                ]).then(async () => {
                    await Hyprland.sendMessage([
                        "keyword",
                        "layerrule",
                        `blur, ${name}`,
                    ]);
                    if (!noAlphaignore.every((skip) => !name.includes(skip)))
                        return;

                    await Hyprland.sendMessage([
                        "keyword",
                        "layerrule",
                        `ignorealpha 0.6, ${name}`,
                    ]);
                });
            }
        });

        await Hyprland.sendMessage(
            `keyword general:border_size ${border_width}`,
        );
        await Hyprland.sendMessage(`keyword general:gaps_out ${wm_gaps}`);
        await Hyprland.sendMessage(`keyword general:gaps_in ${wm_gaps / 2}`);
        await Hyprland.sendMessage(
            `keyword general:col.active_border ${hypr_active_border}`,
        );
        await Hyprland.sendMessage(
            `keyword general:col.inactive_border ${hypr_inactive_border}`,
        );
        await Hyprland.sendMessage(
            `keyword group:col.border_active ${hypr_group_active}`,
        );
        await Hyprland.sendMessage(
            `keyword group:col.border_inactive ${hypr_inactive_border}`,
        );
        await Hyprland.sendMessage(
            `keyword group:col.border_locked_active ${hypr_group_locked_active}`,
        );
        await Hyprland.sendMessage(
            `keyword group:groupbar:col.active ${hypr_group_active}`,
        );
        await Hyprland.sendMessage(
            `keyword group:groupbar:col.inactive ${hypr_group_inactive}`,
        );
        await Hyprland.sendMessage(
            `keyword group:groupbar:col.locked_active ${hypr_group_locked_active}`,
        );
        await Hyprland.sendMessage(
            `keyword decoration:rounding ${wm_rounding}`,
        );
        await Hyprland.sendMessage(
            `keyword decoration:drop_shadow ${drop_shadow ? "yes" : "no"}`,
        );
    } catch (error) {
        console.error(error);
    }
}
