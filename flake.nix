{
  description = "ncempt dev shell and docker image";
  
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = inputs@{ flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];

      perSystem = { system, ... }:
        let
          pkgs = import nixpkgs {
            inherit system;
            config.allowUnfree = true;
          };
          
          nodejs = pkgs.nodejs_23;
          
        in {

          devShells.default = pkgs.mkShell {
            

            buildInputs = [ pkgs.git nodejs pkgs.nodePackages."@angular/cli" ];

            

            shellHook = ''
             
            '';
          };

          /*
          packages.dockerImage = pkgs.dockerTools.buildImage {
            name = "ncemptdocker";
            tag = "latest";
            
            config = {
              Env = [
                "PATH=${python}/bin:${pkgs.coreutils}/bin"
                "LD_LIBRARY_PATH=${libraries}"
                "FONTCONFIG_PATH=/etc/fonts"
              ];
              Cmd = [ "${pkgs.writeShellScript "entrypoint.sh" ''

                #!/bin/sh

                mkdir -p $out/app
                cp -r ${./.}/* $out/app

                cd app
                
                python -m venv .venv
                source .venv/bin/activate
                if [ -f requirements.txt ]; then
                  pip install -r requirements.txt
                fi
              
                echo "Database Migrations"
                python manage.py migrate
                python manage.py collectstatic --noinput
                
                
                # Start server
                echo "Starting server"
                python manage.py runserver 0.0.0.0:8080
              
              ''}" 
              ];
              WorkingDir = "/";
              ExposedPorts = {
                "8080/tcp" = {}; # Django
              };
            };
          };
          */

        };
    };
}