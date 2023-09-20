const charm = {
    blue: "#51a4e7",
};

const dark = {
    color_scheme: "dark",
    bg_color: "#171717",
    fg_color: "#eee",
    hover_fg: "#f1f1f1",
    bg_opacity: 1,
    ...charm,
};

const misc = {
    radii: 9,
    spacing: 9,
    transition: 200,
    bar_style: "normal",
};

const colors = {
    accent: "$blue",
    border_color: "$fg_color",
    border_opacity: 97,
    border_width: 1,
};

// Themes
const catppuccin = {
    ...dark,
    ...misc,
    ...colors,
    bg_color: "#1e1e2e",
    fg_color: "#cdd6f4",
    hover_fg: "#a6adc8",
    accent: "#89b4fa",
    bg_opacity: 0.5,
};

export default [
    catppuccin,
];
