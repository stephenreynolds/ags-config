const charm = {
    blue: "#51a4e7",
};

const dark = {
    color_scheme: "dark",
    bg_color: "#171717",
    fg_color: "#eee",
    hover_fg: "#f1f1f1",
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
};

export default [
    catppuccin,
];
