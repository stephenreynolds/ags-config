import { App, Utils } from "../../imports.js";

const noAlphaignore = ["verification", "powermenu", "lockscreen"];

export default function({
    wm_gaps,
    border_width,
    hypr_active_border,
    hypr_inactive_border,
    hypr_group_active,
    hypr_group_inactive,
    hypr_group_locked_active,
    radii,
    drop_shadow,
}) {
    try {
        App.connect("config-parsed", () => {
            for (const [name] of App.windows) {
                Utils.execAsync(["hyprctl", "keyword", "layerrule", `unset, ${name}`]).then(() => {
                    Utils.execAsync(["hyprctl", "keyword", "layerrule", `blur, ${name}`]);
                    if (!noAlphaignore.every(skip => !name.includes(skip)))
                        return;

                    Utils.execAsync(["hyprctl", "keyword", "layerrule", `ignorealpha 0.6, ${name}`]);
                });
            }
        });

        JSON.parse(Utils.exec("hyprctl -j monitors")).forEach(({ name }) => {
            Utils.execAsync(`hyprctl keyword monitor ${name},addreserved,0,0,0,0`);
        });

        Utils.execAsync(`hyprctl keyword general:border_size ${border_width}`);
        Utils.execAsync(`hyprctl keyword general:gaps_out ${wm_gaps}`);
        Utils.execAsync(`hyprctl keyword general:gaps_in ${wm_gaps / 2}`);
        Utils.execAsync(`hyprctl keyword general:col.active_border ${hypr_active_border}`);
        Utils.execAsync(`hyprctl keyword general:col.inactive_border ${hypr_inactive_border}`);
        Utils.execAsync(`hyprctl keyword group:col.border_active ${hypr_group_active}`);
        Utils.execAsync(`hyprctl keyword group:col.border_inactive ${hypr_inactive_border}`);
        Utils.execAsync(`hyprctl keyword group:col.border_locked_active ${hypr_group_locked_active}`);
        Utils.execAsync(`hyprctl keyword group:groupbar:col.active ${hypr_group_active}`);
        Utils.execAsync(`hyprctl keyword group:groupbar:col.inactive ${hypr_group_inactive}`);
        Utils.execAsync(`hyprctl keyword group:groupbar:col.locked_active ${hypr_group_locked_active}`);
        Utils.execAsync(`hyprctl keyword decoration:rounding ${radii}`);
        Utils.execAsync(`hyprctl keyword decoration:drop_shadow ${drop_shadow ? "yes" : "no"}`);
    } catch (error) {
        console.error(error);
    }
}
