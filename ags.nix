{ lib, config, pkgs, inputs, system, ... }:
let
  cfg = config.programs.ags;
  ags = inputs.ags.packages.${system}.default;
in
{
  nativeBuildInputs = with pkgs; [
    sassc
    inotify-tools
  ];

  options.programs.ags = {
    enable = lib.mkEnableOption "ags";
  };

  config = lib.mkIf cfg.enable {
    systemd.user.services.ags = {
      Unit = {
        Description = "Aylur's Gtk Shell";
        PartOf = [ "graphical-session.target" ];
        After = [ "graphical-session.target" ];
      };
      Install.WantedBy = [ "graphical-session.target" ];
      Service = {
        Type = "simple";
        ExecStart = "${lib.getExe ags} --config ${./src/config.js}";
        ExecStop = "${lib.getExe ags} --quit";
        Restart = "on-failure";
      };
    };
  };
}
