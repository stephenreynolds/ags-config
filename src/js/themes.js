import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
const WP = `/home/${Utils.USER}/Pictures/Wallpapers/`;

const charm = {
    red: '#e55f86',
    green: '#00D787',
    yellow: '#EBFF71',
    blue: '#51a4e7',
    magenta: '#9077e7',
    teal: '#51e6e6',
    orange: '#E79E64',
};

const dark = {
    color_scheme: 'dark',
    bg_color: '#171717',
    fg_color: '#eee',
    hover_fg: '#f1f1f1',
    ...charm,
};

const misc = {
    wm_gaps_in: 4,
    wm_gaps_out: 8,
    wm_gaps_workspaces: 50,
    wm_rounding: 10,
    wm_no_gaps_when_only: 0,
    radii: 9,
    spacing: 9,
    shadow: 'rgba(0, 0, 0, 0.6)',
    drop_shadow: true,
    transition: 200,
    desktop_clock: 'center center',
    font: 'SF Pro Display',
    mono_font: 'CaskaydiaCove Nerd Font',
    font_size: 16,
};

const colors = {
    wallpaper_fg: 'white',
    hypr_active_border: 'rgba(3f3f3fFF)',
    hypr_inactive_border: 'rgba(3f3f3fDD)',
    hypr_group_active: 'rgba(e55f86FF)',
    hypr_group_locked_active: 'rgba(ebff71FF)',
    accent: '$blue',
    accent_fg: '#141414',
    widget_bg: '$fg_color',
    widget_opacity: 94,
    float_opacity: 20,
    active_gradient: 'to right, $accent, lighten($accent, 6%)',
    border_color: '$fg_color',
    border_opacity: 97,
    border_width: 1,
};

// Themes
const catppuccin_mocha = {
    wallpaper: WP + '1212315.jpg',
    name: 'catppuccin_mocha',
    icon: '󰄛',
    ...dark,
    ...misc,
    ...colors,
    accent: '$blue',
    bg_color: '#1e1e2e',
    fg_color: '#cdd6f4',
    hover_fg: '#bac2de',
    red: '#f38ba8',
    green: '#a6e3a1',
    yellow: '#f9e2af',
    blue: '#89b4fa',
    magenta: '#cba6f7',
    teal: '#94e2d5',
    orange: '#fab387',
    wallpaper_fg: '$fg_color',
    active_gradient: 'to right, $accent, $accent',
    hypr_active_border: 'rgba(89b4faFF)',
    hypr_inactive_border: 'rgba(1e1e2eff)',
    hypr_group_active: 'rgba(f9e2afFF)',
    hypr_group_inactive: 'rgba(45475aFF)',
    hypr_group_locked_active: 'rgba(f38ba8FF)',
};

const rose_pine = {
    name: 'rose_pine',
    icon: '🌹',
    ...dark,
    ...misc,
    ...colors,
    accent: '$blue',
    bg_color: '#191724',
    fg_color: '#e0def4',
    hover_fg: '#6e6a86',
    red: '#eb6f92',
    green: '#9ccfd8',
    yellow: '#f6c177',
    blue: '#31748f',
    magenta: '#c4a7e7',
    teal: '#9ccfd8',
    orange: '#ebbcba',
    wallpaper_fg: '$fg_color',
    hypr_active_border: 'rgba(c4a7e7ff)',
    hypr_inactive_border: 'rgba(191724ff)',
    hypr_group_active: 'rgba(ebbcbaFF)',
    hypr_group_inactive: 'rgba(6e6a86FF)',
    hypr_group_locked_active: 'rgba(eb6f92FF)',
};

export default [ catppuccin_mocha, rose_pine ];
