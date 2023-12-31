self: { config, pkgs, inputs, ... }:

let
  system = pkgs.stdenv.hostPlatform.system;
in
{
  config = {
    programs.ags = {
      package = self.inputs.ags.packages.${system}.default;
      configDir = self.configDir;
    };

    home.packages = self.runtimeDependencies.${system};
  };
}
