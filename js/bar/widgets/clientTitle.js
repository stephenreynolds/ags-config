const Hyprland = ags.Service.Hyprland;
const { Label } =  ags.Widget;

const ClientTitle = () => Label({
  className: "client-title",
  label: Hyprland.active.client.title || "",
  connections: [[Hyprland, label => {
    label.label = Hyprland.active.client.title || "";
  }]],
})

export default ClientTitle;
