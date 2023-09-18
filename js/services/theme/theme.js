import themes from "../../themes.js";
import setupScss from "./scss.js";
const { Service } = ags;

class ThemeService extends Service {
  static { Service.register(this); }

  _defaultTheme = themes[0].name;

  constructor() {
    super();
    this.setup();
  }

  getTheme() {
    return themes.find(({ name }) => name === this.getSetting("theme"));
  }

  setup() {
    const theme = {
      ...this.getTheme(),
      ...this.settings,
    };
    setupScss(theme);
  }

  get settings() {
    if (this._settings) {
      return this._settings;
    }

    try {
      this._settings = JSON.parse(readFile(THEME_CACHE));
    }
    catch (_) {
      this._settings = {};
    }

    return this._settings;
  }

  getSetting(prop) {
    if (prop === "theme") {
      return this.settings.theme || this._defaultTheme;
    }

    return this.settings[prop] !== undefined
      ? this.settings[prop]
      : this.getTheme()[prop];
  }
}

export default class Theme {
  static { Service.Theme = this; }
  static instance = new ThemeService();

  static setup() {
    Theme.instance.setup();
  }
}
