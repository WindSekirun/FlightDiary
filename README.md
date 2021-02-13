# Flight-Diary
Flight Diary for Microsoft Flight Simulator (2020)

This project hosted on https://flights.uzuki.live/, on Github Pages (see gh-pages branch) 

### Disclamer
Under no circumstances should any of the plans or data listed on this site be used for real-world aviation or as a substitute for proper flight planning. Site owner have no verification of the existence of routes or waypoints.

### Permitted Use
The Flight plan, and all contained data is intended for simulated flight navigation only and must not be used in real-world flight simulations. 

## Build & Deploy script
```
sh ./scripts/build.sh
```

## Importer
This project contains 'importer' script for build metadata.json

Data of `Flight Diary` hardily depends on [**Little Navmap**](https://albar965.github.io/littlenavmap.html), open-sourced flight plan manager.

### Requirement - Package
* Python 3
* optipng
* webp
* pip install -r ./requirements.txt in `importer` folder

### Required file
These files must indicate in importer/target **before** running script.
* single lnmplns file (from Little Navmap) which contains flight plans
* single .html file (from Little Navmap, by Export flight plans to HTML File) which contains flight plans
* multiple .png file which screenshots from Game, at least one file is needed. 

### How to use?
1. copy required files into importer/target
2. `cd importer`
3. `python importer.py`
4. follow instruction of importer script

## Troubleshooting for build

### chmod geo2topo ENOENT: no such file or directory.

```sh
npm ERR! code ENOENT
npm ERR! syscall chmod
npm ERR! path /usr/local/lib/node_modules/@turf/turf/node_modules/topojson/node_modules/topojson-server/bin/geo2topo
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, chmod '/usr/local/lib/node_modules/@turf/turf/node_modules/topojson/node_modules/topojson-server/bin/geo2topo'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 
```

This error can be fixed by these commands.

```sh
npm install -g node-pre-gyp
npm install --no-bin-links
```