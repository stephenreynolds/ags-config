import Theme from '../services/theme/theme.js';
const { Box } = ags.Widget;

export default ({ className, ...props }) => Box({
    ...props,
    className: `wallpaper ${className}`,
    connections: [[Theme, box => {
        console.log(Theme.getSetting('wallpaper'));
        box.setStyle(`
            background-image: url('${Theme.getSetting('wallpaper')}');
            background-size: cover;
        `);
    }]],
});
