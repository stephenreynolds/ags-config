{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
    ags.url = "github:Aylur/ags";
  };

  outputs = { self, nixpkgs, ags }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    rec {
      configDir = ./src;
      buildInputs = with pkgs; [
        ags.packages.${system}.default
        nodejs
        sassc
        inotify-tools
      ];

      devShells.${system}.default = pkgs.mkShell {
        inherit buildInputs;
      };
    };
}
