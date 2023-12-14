import App from 'resource:///com/github/Aylur/ags/app.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';

function sendBatch(batch) {
    const command = batch
        .filter(x => !!x)
        .map(x => `keyword ${x}`)
        .join('; ');

    Hyprland.sendMessage(`[[BATCH]]/${command}`);
}

function initConfig({
    wm_gaps_in,
    wm_gaps_out,
    wm_gaps_workspaces,
    border_width,
    hypr_active_border,
    hypr_inactive_border,
    hypr_group_active,
    hypr_group_inactive,
    hypr_group_locked_active,
    wm_rounding,
    drop_shadow,
}) {
    sendBatch([
        `general:border_size ${border_width}`,
        `general:gaps_in ${wm_gaps_in}`,
        `general:gaps_out ${wm_gaps_out}`,
        `general:gaps_workspaces ${wm_gaps_workspaces}`,
        `general:col.active_border ${hypr_active_border}`,
        `general:col.inactive_border ${hypr_inactive_border}`,
        `general:col.border_active ${hypr_group_active}`,
        `general:col.border_inactive ${hypr_inactive_border}`,
        `general:col.border_locked_active ${hypr_group_locked_active}`,
        `group:groupbar:col.active ${hypr_group_active}`,
        `group:groupbar:col.inactive ${hypr_group_inactive}`,
        `group:groupbar:col.locked_active ${hypr_group_locked_active}`,
        `decoration:rounding ${wm_rounding}`,
        `decoration:drop_shadow ${drop_shadow ? 'yes' : 'no'}`,
    ]);
}

const noAlphaignore = [ 'verification', 'powermenu', '^(notifications-*)', '^(indicator-.*)' ];

function listenMatchingAlphaIgnore() {
    App.connect('config-parsed', () => {
        const batch = [];

        for (const [ name ] of App.windows) {
            batch.push(
                `layerrule unset, ${name}`,
                `layerrule blur, ${name}`,
            );

            if (noAlphaignore.every((skip) => !name.includes(skip))) {
                batch.push(`layerrule ignorealpha 0.6, ${name}`);
            }
        }

        sendBatch(batch);
    });
}

export default async function({
    wm_gaps_in,
    wm_gaps_out,
    wm_gaps_workspaces,
    border_width,
    hypr_active_border,
    hypr_inactive_border,
    hypr_group_active,
    hypr_group_inactive,
    hypr_group_locked_active,
    wm_rounding,
    drop_shadow,
}) {
    initConfig({
        wm_gaps_in,
        wm_gaps_out,
        wm_gaps_workspaces,
        border_width,
        hypr_active_border,
        hypr_inactive_border,
        hypr_group_active,
        hypr_group_inactive,
        hypr_group_locked_active,
        wm_rounding,
        drop_shadow,
    });

    listenMatchingAlphaIgnore();
}
