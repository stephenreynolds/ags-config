const Mpris = ags.Service.Mpris;
const { Button, Label } = ags.Widget;

const Media = () => Button({
  className: "media",
  onPrimaryClick: () => Mpris.getPlayer("")?.playPause(),
  onScrollUp: () => Mpris.getPlayer("")?.next(),
  onScrollDown: () => Mpris.getPlayer("")?.previous(),
  child: Label({
    connections: [[Mpris, label => {
      const mpris = Mpris.getPlayer("");
      if (mpris) {
        label.label = `${mpris.trackArtists.join(", ")} - ${mpris.trackTitle}`;
      }
      else {
        label.label = "Nothing is playing";
      }
    }]],
  })
})

export default Media;
