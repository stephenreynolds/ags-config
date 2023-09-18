const { ensureDirectory, exec, writeFile } = ags.Utils;

const generated = str => `// THIS FILE IS GENERATED
${str}`;

const scss = t => `$theme: "${t.color_scheme}";`;

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
