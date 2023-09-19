import themes from "../../themes.js";
import setupScss from "./scss.js";
const { Service } = ags;
const { CACHE_DIR } = ags.Utils;
const THEME_CACHE = CACHE_DIR + "/theme-overrides.json";

class ThemeService extends Service {
    static { Service.register(this); }

    _defaultTheme = themes[0].name;

    constructor() {
        super();
        this.setup();
    }

    setup() {
        const theme = {
            ...this.getTheme(),
            ...this.settings,
        };
        setupScss(theme);
    }

    getTheme() {
        return themes.find(({ name }) => name === this.getSetting("theme"));
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
