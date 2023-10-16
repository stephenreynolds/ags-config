export default {
    // if this player is running this will be shown on panel
    preferredMpris: "spotify",

    primaryMonitor: 2,

    // number of workspaces shown on panel and overview
    workspaces: 7,

    // path to read temperature from
    temperature: "/sys/class/thermal/thermal_zone0/temp",

    // at what intervals should cpu, ram, temperature refresh
    systemFetchInterval: 5000,
};
