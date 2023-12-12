import themes from '../../themes.js';
import setupScss from './scss.js';
import setupHyprland from './hyprland.js';
import SettingsDialog from '../../settingsdialog/SettingsDialog.js';
import IconBrowser from '../../misc/IconBrowser.js';
import Service from 'resource:///com/github/Aylur/ags/service.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

const THEME_CACHE = Utils.CACHE_DIR + '/theme-overrides.json';

class ThemeService extends Service {
    static {
        Service.register(this);
    }

    get themes() {
        return themes;
    }

    _defaultTheme = themes[0].name;

    constructor() {
        super();
        Utils.exec('swww init');
        this.setup(true);
    }

    openSettings() {
        if (!this._dialog) {this._dialog = SettingsDialog();}

        this._dialog.hide();
        this._dialog.present();
    }

    iconBrowser() {
        IconBrowser();
    }

    getTheme() {
        return themes.find(({ name }) => name === this.getSetting('theme'));
    }

    setup(firstStart) {
        const theme = {
            ...this.getTheme(),
            ...this.settings,
        };
        setupScss(theme);
        setupHyprland(theme);
        this.setupOther();
        this.setupWallpaper(firstStart);
    }

    reset() {
        Utils.exec(`rm ${THEME_CACHE}`);
        this._settings = null;
        this.setup();
        this.emit('changed');
    }

    setupOther() {
        const darkmode = this.getSetting('color_scheme') === 'dark';

        if (Utils.exec('which gsettings')) {
            const gsettings =
                'gsettings set org.gnome.desktop.interface color-scheme';
            Utils.execAsync(
                `${gsettings} "prefer-${darkmode ? 'dark' : 'light'}"`,
            ).catch(print);
        }
    }

    setupWallpaper(firstStart = false) {
        Utils.execAsync([
            'swww',
            'img',
            '--transition-type',
            `${firstStart ? 'none' : 'wipe'}`,
            this.getSetting('wallpaper'),
        ]).catch(print);
    }

    get settings() {
        if (this._settings) {return this._settings;}

        try {
            this._settings = JSON.parse(Utils.readFile(THEME_CACHE));
        } catch (_) {
            this._settings = {};
        }

        return this._settings;
    }

    setSetting(prop, value) {
        const settings = this.settings;
        settings[prop] = value;
        Utils.writeFile(JSON.stringify(settings, null, 2), THEME_CACHE).catch(
            print,
        );
        this._settings = settings;
        this.emit('changed');

        if (prop === 'layout') {
            if (!this._notiSent) {
                this._notiSent = true;
                Utils.execAsync([
                    'notify-send',
                    'Layout Change Needs a Reload',
                ]);
            }
            return;
        }

        this.setup();
    }

    getSetting(prop) {
        if (prop === 'theme') {return this.settings.theme || this._defaultTheme;}

        return this.settings[prop] !== undefined
            ? this.settings[prop]
            : this.getTheme()[prop];
    }
}

export default new ThemeService();
