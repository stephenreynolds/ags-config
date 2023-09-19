const { ensureDirectory, exec, writeFile } = ags.Utils;

const generated = str => `// THIS FILE IS GENERATED
${str}`;

const scss = t => `$theme: "${t.color_scheme}";
$blue: ${t.blue};

$bg_color: ${t.bg_color};
$fg_color: ${t.fg_color};
$hover_fg: ${t.hover_fg};

$radii: ${t.radii}px;
$spacing: ${t.spacing}px;

$accent: ${t.accent};

$border_color: transparentize(${t.border_color}, ${t.border_opacity / 100});
$border_width: ${t.border_width}px;
$border: $border_width solid $border_color;

$transition: ${t.transition}ms;

$bar_style: ${t.bar_style};
`;

export default async function(theme) {
    const tmp = "/tmp/ags/scss";
    ensureDirectory(tmp);
    try {
        await writeFile(generated(scss(theme)), `${tmp}/generated.scss`);
        await writeFile(generated(theme.additional_scss || ""), `${tmp}/additional.scss`);
        exec(`sassc ${ags.App.configDir}/scss/main.scss ${tmp}/style.css`);
        ags.App.resetCss();
        ags.App.applyCss(`${tmp}/style.css`);
    }
    catch (error) {
        logError(error);
    }
}
