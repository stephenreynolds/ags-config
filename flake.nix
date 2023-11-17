{
  description = "My AGS config";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    ags = {
      url = "github:Aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, ags }:
    let
      genSystems = nixpkgs.lib.genAttrs [
        "aarch64-linux"
        "x86_64-linux"
      ];
      pkgs = genSystems (system: import nixpkgs { inherit system; });

      configDir = builtins.path { path = ./src; name = "ags-config"; };

      runtimeDependencies = genSystems (system: with pkgs.${system}; [
        inotify-tools
        sassc
        inter
        swww
        libnotify
        imagemagick
      ]);

      projectRoot = toString (builtins.getEnv "PWD");
    in
    {
      inherit configDir runtimeDependencies;

      homeManagerModules.default = import ./nix/hm-module.nix self;

      devShells = genSystems (system: {
        default = pkgs.${system}.mkShell {
          buildInputs = with pkgs.${system}; [
            (writeShellScriptBin "ags" ''
              ${ags.packages.${system}.default}/bin/ags --config ${projectRoot}/src/config.js $@
            '')
            nodejs
            nodePackages_latest.eslint
          ] ++ runtimeDependencies.${system};
        };
      });
    };
}
