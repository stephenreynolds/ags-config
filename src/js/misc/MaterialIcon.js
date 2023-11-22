import { Widget } from "../imports.js";

export default (icon, size, props = {}) =>
    Widget.Label({
        className: `icon-material text-${size}`,
        label: icon,
        ...props,
    });
