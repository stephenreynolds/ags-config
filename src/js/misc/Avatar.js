import Theme from '../services/theme/theme.js';
import { Widget } from '../imports.js';

export default ({ shader = true, ...props } = {}) => Widget.Box({
    ...props,
    class_name: 'avatar',
    connections: [[Theme, box => {
        box.setCss(`
            background-image: url('${Theme.getSetting('avatar')}');
            background-size: cover;
        `);
    }]],
    children: [
        shader && Widget.Box({
            class_name: 'shader',
            vexpand: true,
            hexpand: true,
        }),
    ],
});
