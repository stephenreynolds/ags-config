import Service from 'resource:///com/github/Aylur/ags/service.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

class IndicatorService extends Service {
    static {
        Service.register(this, {
            'popup-volume': [ 'double' ],
            'popup-workspace': [ 'boolean' ],
        });
    }

    #speakerDelay = 1500;
    #speakerCount = 0;

    speaker() {
        this.emit('popup-volume', Audio.speaker?.volume);
        this.#speakerCount++;
        Utils.timeout(this.#speakerDelay, () => {
            this.#speakerCount--;

            if (this.#speakerCount === 0)
            {this.emit('popup-volume', -1);}
        });
    }

    connect(event = 'popup', callback) {
        return super.connect(event, callback);
    }
}

const service = new IndicatorService();

globalThis['indicator'] = service;

export default service;
