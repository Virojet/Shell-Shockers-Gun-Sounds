// ==UserScript==
// @name         Shell Shockers Gun Sounds
// @version      1.6.3
// @description  Pick weapon, meme or custom sounds for shots, melee swings, reloads and the empty click in Shell Shockers.
// @namespace    https://github.com/Virojet
// @author       Virojet
// @license      MIT
// @homepageURL  https://github.com/Virojet/Shell-Shockers-Gun-Sounds
// @supportURL   https://github.com/Virojet/Shell-Shockers-Gun-Sounds/issues
// @downloadURL  https://raw.githubusercontent.com/Virojet/Shell-Shockers-Gun-Sounds/main/Shell-Shockers-Gun-Sounds.user.js
// @updateURL    https://raw.githubusercontent.com/Virojet/Shell-Shockers-Gun-Sounds/main/Shell-Shockers-Gun-Sounds.user.js
// @match        *://*.shellshock.io/*
// @match        *://*.algebra.vip/*
// @match        *://*.biologyclass.club/*
// @match        *://*.deadlyegg.com/*
// @match        *://*.deathegg.world/*
// @match        *://*.eggboy.club/*
// @match        *://*.eggboy.xyz/*
// @match        *://*.eggcombat.com/*
// @match        *://*.egg.dance/*
// @match        *://*.eggfacts.fun/*
// @match        *://*.egghead.institute/*
// @match        *://*.eggisthenewblack.com/*
// @match        *://*.eggsarecool.com/*
// @match        *://*.geometry.best/*
// @match        *://*.geometry.monster/*
// @match        *://*.geometry.pw/*
// @match        *://*.geometry.report/*
// @match        *://*.hardboiled.life/*
// @match        *://*.hardshell.life/*
// @match        *://*.humanorganising.org/*
// @match        *://*.mathactivity.xyz/*
// @match        *://*.mathactivity.club/*
// @match        *://*.mathdrills.info/*
// @match        *://*.mathdrills.life/*
// @match        *://*.mathfun.rocks/*
// @match        *://*.mathgames.world/*
// @match        *://*.math.international/*
// @match        *://*.mathlete.fun/*
// @match        *://*.mathlete.pro/*
// @match        *://*.overeasy.club/*
// @match        *://*.risenegg.com/*
// @match        *://*.scrambled.tech/*
// @match        *://*.scrambled.today/*
// @match        *://*.scrambled.us/*
// @match        *://*.scrambled.world/*
// @match        *://*.shellshockers.club/*
// @match        *://*.shellshockers.life/*
// @match        *://*.shellshockers.site/*
// @match        *://*.shellshockers.us/*
// @match        *://*.shellshockers.world/*
// @match        *://*.shellshockers.xyz/*
// @match        *://*.shellsocks.com/*
// @match        *://*.softboiled.club/*
// @match        *://*.urbanegger.com/*
// @match        *://*.violentegg.club/*
// @match        *://*.violentegg.fun/*
// @match        *://*.yolk.best/*
// @match        *://*.yolk.life/*
// @match        *://*.yolk.rocks/*
// @match        *://*.yolk.tech/*
// @match        *://*.yolk.quest/*
// @match        *://*.yolk.today/*
// @match        *://*.zygote.cafe/*
// @match        *://*.shellshockers.best/*
// @match        *://*.eggboy.me/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/* Gun Sounds: swap your weapon and reload sounds for a built-in sound or your own MP3.
   Primary, secondary, melee, primary reload, secondary reload and no ammo each get their own pick, and every primary
   gun can have its own shot and reload too. Shot choices cover every skin of a weapon. Reload kits play their pieces
   on the game's own reload cues, so they keep time with each gun.

   How it works: the game plays every sound through BAWK.play(name, output). The script wraps that call. When the name
   is a weapon action, and it's your own (identified by the shooter's player-node position), the script plays your pick
   instead and the game's sound is skipped. Every other
   sound passes through untouched, and so does the game's code.

   Built-in sounds are downloaded from this project on GitHub the first time one is picked and kept in this
   site's storage, or one MP3 of your own per slot, kept there too. They go through the game's own sound output, so its
   Sound Effects volume turns them up and down with everything else.

   Settings ▸ the speaker tab ▸ Gun Sounds opens plain: three Quick start buttons (Game sounds, Real guns, Memes) that set
   every list at once, four lists (gun shots, gun reload, pistol shots, melee) with a Test button each, and a volume.
   Advanced adds the pistol reload and empty click lists, a "Set one gun" list that gives Gun shots and Gun reload one
   gun's own picks, Everyone's weapons, Export and Import. As with the game's settings around it, a change is kept when
   you press Confirm.

   window.ssGunSounds: version, settings(), set({ primary, secondary, melee, reload, sreload, empty, volume, everyone,
   "primary:<gun>", "reload:<gun>" }), export() (the settings as JSON text), import(text), slotOf(soundName). */
(() => {
  "use strict";
  if (window.ssGunSounds) return;   // already running: Tampermonkey and the Mod Menu both started it

  const VERSION = "1.6.3";
  const STORE = "ssGunSounds";
  const UI_STORE = STORE + ".ui";   // how the settings look (Advanced open or not), apart from the sounds
  // `kind` limits a sound to one kind of list, and `gun` a primary shot to that gun's category. The meme sounds (no
  // kind) are in every shot list.
  const SOUNDS = [
    { id: "awp", name: "AWP", file: "awp.mp3", duration: 1.00 },
    { id: "punch", name: "Punch", file: "punch.mp3", duration: 1.53 },
    { id: "fart", name: "Reverb Fart", file: "reverb-fart.mp3", duration: 1.00 },
    { id: "tuturu", name: "Tuturu", file: "tuturu.mp3", duration: 0.95 },
    { id: "boom", name: "Vine Boom", file: "vine-boom.mp3", duration: 1.02 },
    { id: "ak-47", name: "AK-47", file: "primary/eggk47/ak-47.mp3", kind: "primary", duration: 2.85 },
    { id: "m4a4", name: "M4A4", file: "primary/eggk47/m4a4.mp3", kind: "primary", duration: 3.19 },
    { id: "m4a1-s", name: "M4A1-S", file: "primary/eggk47/m4a1-s.mp3", kind: "primary", duration: 1.41 },
    { id: "galil-ar", name: "Galil AR", file: "primary/eggk47/galil-ar.mp3", kind: "primary", duration: 3.16 },
    { id: "classic-ak-47", name: "Classic AK-47", file: "primary/eggk47/classic-ak-47.mp3", kind: "primary", duration: 1.50 },
    { id: "classic-m4a1", name: "Classic M4A1", file: "primary/eggk47/classic-m4a1.mp3", kind: "primary", duration: 1.40 },
    { id: "negev", name: "Negev", file: "primary/eggk47/negev.mp3", kind: "primary", duration: 3.20 },
    { id: "classic-m249", name: "Classic M249", file: "primary/eggk47/classic-m249.mp3", kind: "primary", duration: 1.60 },
    { id: "pulse-rifle", name: "Pulse Rifle", file: "primary/eggk47/pulse-rifle.mp3", kind: "primary", duration: 0.83 },
    { id: "survivor-ak", name: "Survivor AK", file: "primary/eggk47/survivor-ak.mp3", kind: "primary", duration: 1.99 },
    { id: "nova", name: "Nova", file: "primary/scrambler/nova.mp3", kind: "primary", duration: 2.85 },
    { id: "xm1014", name: "XM1014", file: "primary/scrambler/xm1014.mp3", kind: "primary", duration: 3.19 },
    { id: "sawed-off", name: "Sawed-Off", file: "primary/scrambler/sawed-off.mp3", kind: "primary", duration: 2.80 },
    { id: "force-a-nature", name: "Force-A-Nature", file: "primary/scrambler/force-a-nature.mp3", kind: "primary", duration: 2.00 },
    { id: "mag-7", name: "MAG-7", file: "primary/scrambler/mag-7.mp3", kind: "primary", duration: 3.00 },
    { id: "classic-m3", name: "Classic M3", file: "primary/scrambler/classic-m3.mp3", kind: "primary", duration: 1.60 },
    { id: "scattergun", name: "Scattergun", file: "primary/scrambler/scattergun.mp3", kind: "primary", duration: 3.20 },
    { id: "chrome-shotgun", name: "Chrome Shotgun", file: "primary/scrambler/chrome-shotgun.mp3", kind: "primary", duration: 1.18 },
    { id: "spas-12", name: "SPAS-12", file: "primary/scrambler/spas-12.mp3", kind: "primary", duration: 1.56 },
    { id: "double-barrel", name: "Double Barrel", file: "primary/scrambler/double-barrel.mp3", kind: "primary", duration: 1.30 },
    { id: "g3sg1", name: "G3SG1", file: "primary/free-ranger/g3sg1.mp3", kind: "primary", duration: 2.67 },
    { id: "scar-20", name: "SCAR-20", file: "primary/free-ranger/scar-20.mp3", kind: "primary", duration: 3.25 },
    { id: "classic-rifle", name: "Classic", file: "primary/free-ranger/classic.mp3", kind: "primary", duration: 1.80 },
    { id: "sg-550", name: "SG 550", file: "primary/free-ranger/sg-550.mp3", kind: "primary", duration: 2.64 },
    { id: "classic-g3sg1", name: "Classic G3SG1", file: "primary/free-ranger/classic-g3sg1.mp3", kind: "primary", duration: 2.30 },
    { id: "hunting-rifle", name: "Hunting Rifle", file: "primary/free-ranger/hunting-rifle.mp3", kind: "primary", duration: 1.79 },
    { id: "military-sniper", name: "Military Sniper", file: "primary/free-ranger/military-sniper.mp3", kind: "primary", duration: 2.06 },
    { id: "crossbow", name: "Crossbow", file: "primary/free-ranger/crossbow.mp3", kind: "primary", duration: 0.55 },
    { id: "survivor-sg-552", name: "Survivor SG 552", file: "primary/free-ranger/survivor-sg-552.mp3", kind: "primary", duration: 1.42 },
    { id: "bazaar-bargain", name: "Bazaar Bargain", file: "primary/free-ranger/bazaar-bargain.mp3", kind: "primary", duration: 1.00 },
    { id: "blast-rocket", name: "Blast Rocket", file: "primary/blast-rocket.mp3", kind: "primary", duration: 1.90 },
    { id: "quake-rocket", name: "Quake Rocket", file: "primary/quake-rocket.mp3", kind: "primary", duration: 1.90 },
    { id: "direct-hit", name: "Direct Hit", file: "primary/rpegg/direct-hit.mp3", kind: "primary", duration: 4.08 },
    { id: "black-box", name: "Black Box", file: "primary/rpegg/black-box.mp3", kind: "primary", duration: 2.92 },
    { id: "liberty-launcher", name: "Liberty Launcher", file: "primary/rpegg/liberty-launcher.mp3", kind: "primary", duration: 3.20 },
    { id: "air-strike", name: "Air Strike", file: "primary/rpegg/air-strike.mp3", kind: "primary", duration: 1.91 },
    { id: "cow-mangler", name: "Cow Mangler", file: "primary/rpegg/cow-mangler.mp3", kind: "primary", duration: 1.83 },
    { id: "loch-n-load", name: "Loch-n-Load", file: "primary/rpegg/loch-n-load.mp3", kind: "primary", duration: 2.00 },
    { id: "rpg", name: "RPG", file: "primary/rpegg/rpg.mp3", kind: "primary", duration: 1.09 },
    { id: "doom-rocket", name: "Doom Rocket", file: "primary/rpegg/doom-rocket.mp3", kind: "primary", duration: 2.43 },
    { id: "rush-p90", name: "Rush P90", file: "primary/rush-p90.mp3", kind: "primary", duration: 0.98 },
    { id: "rapid-p90", name: "Rapid P90", file: "primary/rapid-p90.mp3", kind: "primary", duration: 1.15 },
    { id: "mp7", name: "MP7", file: "primary/whipper/mp7.mp3", kind: "primary", duration: 2.64 },
    { id: "mp9", name: "MP9", file: "primary/whipper/mp9.mp3", kind: "primary", duration: 1.70 },
    { id: "ump-45", name: "UMP-45", file: "primary/whipper/ump-45.mp3", kind: "primary", duration: 2.09 },
    { id: "mac-10", name: "MAC-10", file: "primary/whipper/mac-10.mp3", kind: "primary", duration: 1.99 },
    { id: "pp-bizon", name: "PP-Bizon", file: "primary/whipper/pp-bizon.mp3", kind: "primary", duration: 1.52 },
    { id: "mp5", name: "MP5", file: "primary/whipper/mp5.mp3", kind: "primary", duration: 1.41 },
    { id: "smg1", name: "SMG1", file: "primary/whipper/smg1.mp3", kind: "primary", duration: 0.52 },
    { id: "silenced-smg", name: "Silenced SMG", file: "primary/whipper/silenced-smg.mp3", kind: "primary", duration: 0.54 },
    { id: "sniper-awp", name: "AWP", file: "primary/crackshot/awp.mp3", kind: "primary", duration: 4.13 },
    { id: "thunder-awp", name: "Thunder AWP", file: "primary/thunder-awp.mp3", kind: "primary", duration: 1.90 },
    { id: "ssg-08", name: "SSG 08", file: "primary/crackshot/ssg-08.mp3", kind: "primary", duration: 2.25 },
    { id: "scout", name: "Scout", file: "primary/crackshot/scout.mp3", kind: "primary", duration: 3.22 },
    { id: "sniper-rifle", name: "Sniper Rifle", file: "primary/crackshot/sniper-rifle.mp3", kind: "primary", duration: 3.20 },
    { id: "sydney-sleeper", name: "Sydney Sleeper", file: "primary/crackshot/sydney-sleeper.mp3", kind: "primary", duration: 1.00 },
    { id: "machina", name: "Machina", file: "primary/crackshot/machina.mp3", kind: "primary", duration: 1.94 },
    { id: "classic-awp", name: "Classic AWP", file: "primary/crackshot/classic-awp.mp3", kind: "primary", duration: 3.20 },
    { id: "survivor-scout", name: "Survivor Scout", file: "primary/crackshot/survivor-scout.mp3", kind: "primary", duration: 3.20 },
    { id: "machina-charged", name: "Machina charged", file: "primary/crackshot/machina-charged.mp3", kind: "primary", duration: 3.20 },
    { id: "aug-burst", name: "AUG", file: "primary/tri-hard/aug.mp3", kind: "primary", duration: 2.76 },
    { id: "famas-burst", name: "FAMAS", file: "primary/tri-hard/famas.mp3", kind: "primary", duration: 2.75 },
    { id: "sg-553-burst", name: "SG 553", file: "primary/tri-hard/sg-553.mp3", kind: "primary", duration: 2.47 },
    { id: "classic-aug-burst", name: "Classic AUG", file: "primary/tri-hard/classic-aug.mp3", kind: "primary", duration: 1.68 },
    { id: "classic-famas-burst", name: "Classic FAMAS", file: "primary/tri-hard/classic-famas.mp3", kind: "primary", duration: 1.66 },
    { id: "classic-sg-552-burst", name: "Classic SG 552", file: "primary/tri-hard/classic-sg-552.mp3", kind: "primary", duration: 1.62 },
    { id: "classic-galil-burst", name: "Classic Galil", file: "primary/tri-hard/classic-galil.mp3", kind: "primary", duration: 1.90 },
    { id: "survivor-m4-burst", name: "Survivor M4", file: "primary/tri-hard/survivor-m4.mp3", kind: "primary", duration: 1.20 },
    { id: "desert-rifle-burst", name: "Desert Rifle", file: "primary/tri-hard/desert-rifle.mp3", kind: "primary", duration: 1.14 },
    { id: "classic-m4a1-silenced-burst", name: "Classic M4A1 silenced", file: "primary/tri-hard/classic-m4a1-silenced.mp3", kind: "primary", duration: 0.44 },
    { id: "hand-cannon", name: "Hand Cannon", file: "secondary/hand-cannon.mp3", kind: "secondary", duration: 1.90 },
    { id: "quickdraw", name: "Quickdraw", file: "secondary/quickdraw.mp3", kind: "secondary", duration: 1.35 },
    { id: "usp-s", name: "USP-S", file: "secondary/usp-s.mp3", kind: "secondary", duration: 1.53 },
    { id: "five-seven", name: "Five-SeveN", file: "secondary/five-seven.mp3", kind: "secondary", duration: 1.60 },
    { id: "r8-revolver", name: "R8 Revolver", file: "secondary/r8-revolver.mp3", kind: "secondary", duration: 3.50 },
    { id: "p250", name: "P250", file: "secondary/p250.mp3", kind: "secondary", duration: 1.84 },
    { id: "tec-9", name: "Tec-9", file: "secondary/tec-9.mp3", kind: "secondary", duration: 2.53 },
    { id: "cz75-auto", name: "CZ75-Auto", file: "secondary/cz75-auto.mp3", kind: "secondary", duration: 1.70 },
    { id: "dual-berettas", name: "Dual Berettas", file: "secondary/dual-berettas.mp3", kind: "secondary", duration: 3.38 },
    { id: "p2000", name: "P2000", file: "secondary/p2000.mp3", kind: "secondary", duration: 2.19 },
    { id: "swift-slash", name: "Swift Slash", file: "melee/swift-slash.mp3", kind: "melee", duration: 0.17 },
    { id: "heavy-slash", name: "Heavy Slash", file: "melee/heavy-slash.mp3", kind: "melee", duration: 0.16 },
    { id: "blade-flick", name: "Blade Flick", file: "melee/blade-flick.mp3", kind: "melee", duration: 0.36 },
    { id: "machete-sweep", name: "Machete Sweep", file: "melee/machete-sweep.mp3", kind: "melee", duration: 0.57 },
    { id: "saber-arc", name: "Saber Arc", file: "melee/saber-arc.mp3", kind: "melee", duration: 0.52 },
    { id: "claymore-swing", name: "Claymore Swing", file: "melee/claymore-swing.mp3", kind: "melee", duration: 0.39 },
    { id: "pickaxe-swing", name: "Pickaxe Swing", file: "melee/pickaxe-swing.mp3", kind: "melee", duration: 0.50 },
    { id: "shovel-swing", name: "Shovel Swing", file: "melee/shovel-swing.mp3", kind: "melee", duration: 0.62 },
    { id: "wrench-swing", name: "Wrench Swing", file: "melee/wrench-swing.mp3", kind: "melee", duration: 0.62 },
    { id: "boxing-glove", name: "Boxing Glove", file: "melee/boxing-glove.mp3", kind: "melee", duration: 0.52 },
    { id: "pistol-click", name: "Pistol Click", file: "empty/pistol-click.mp3", kind: "empty", duration: 0.26 },
    { id: "rifle-click", name: "Rifle Click", file: "empty/rifle-click.mp3", kind: "empty", duration: 0.26 },
    { id: "shotgun-click", name: "Shotgun Click", file: "empty/shotgun-click.mp3", kind: "empty", duration: 0.12 },
    { id: "trigger-tap", name: "Trigger Tap", file: "empty/trigger-tap.mp3", kind: "empty", duration: 0.14 },
    { id: "low-ammo-tick", name: "Low Ammo Tick", file: "empty/low-ammo-tick.mp3", kind: "empty", duration: 0.52 },
    { id: "railgun-dry", name: "Railgun Dry Fire", file: "empty/railgun-dry.mp3", kind: "empty", duration: 0.13 },
    { id: "marksman-dry", name: "Marksman Dry Fire", file: "empty/marksman-dry.mp3", kind: "empty", duration: 0.16 },
    { id: "minigun-spin", name: "Minigun Whir", file: "empty/minigun-spin.mp3", kind: "empty", duration: 0.60 },
    { id: "gatling-click", name: "Gatling Click", file: "empty/gatling-click.mp3", kind: "empty", duration: 0.60 },
    { id: "hammer-click", name: "Hammer Click", game: "hammer_click", kind: "empty" },   // the game's own, no download
  ];

  /* ---- Reload kits ----
     A kit is one sound per reload cue, played when the game plays that cue, so it keeps time with the gun:
       start  — the old magazine comes out, or the action opens (the reload's first cue)
       finish — the second touch: the new magazine seats, the shells or the rocket go in
       action — the bolt, slide, pump or close that ends an empty reload
       pull   — the action pulled before the magazine (the Free Ranger's empty reload) */
  const KITS = [
    { id: "kit-ak", name: "AK-47", start: "ak47-clipout", finish: "ak47-clipin", action: "ak47-boltpull" },
    { id: "kit-m4a4", name: "M4A4", start: "m4a1-clipout", finish: "m4a1-clipin", action: "m4a1-boltforward" },
    { id: "kit-galil", name: "Galil AR", start: "galil-clipout", finish: "galil-clipin", action: "galil-boltforward" },
    { id: "kit-ak-classic", name: "Classic AK-47", start: "ak47c-clipout", finish: "ak47c-clipin", action: "ak47c-boltpull" },
    { id: "kit-m4-classic", name: "Classic M4A1", start: "m4a1c-clipout", finish: "m4a1c-clipin", action: "m4a1c-boltpull" },
    { id: "kit-stg44", name: "STG 44", start: "mp44-clipout", finish: "mp44-clipin", action: "mp44-boltforward" },
    { id: "kit-bar", name: "BAR", start: "bar-clipout", finish: "bar-clipin", action: "bar-boltforward" },
    { id: "kit-survivor-ak", name: "Survivor AK", start: "l4dak-clipout", finish: "l4dak-clipin", action: "l4dak-slideforward" },
    { id: "kit-ar2", name: "Pulse Rifle", start: "ar2-rotate", finish: "ar2-push" },
    { id: "kit-outbreak-ak", name: "Outbreak AK", start: "zpsak-clipout", finish: "zpsak-clipin", action: "zpsak-boltback" },
    { id: "kit-double", name: "Double barrel", start: "scatter-gun-double-tube-open", finish: "scatter-gun-double-shells-in", action: "scatter-gun-double-tube-close" },
    { id: "kit-mag7", name: "MAG-7", start: "mag7-clipout", finish: "mag7-clipin", action: "mag7-pump-forward" },
    { id: "kit-pump", name: "Pump shotgun", start: "shotgun-cock-back", finish: "shotgun-shell-in", action: "shotgun-cock-forward" },
    { id: "kit-nova", name: "Nova", start: "nova-shell-1", finish: "nova-shells-in", action: "nova-pump" },
    { id: "kit-xm1014", name: "XM1014", start: "xm1014-shell-1", finish: "xm1014-shells-in", action: "xm1014-pump" },
    { id: "kit-sawedoff", name: "Sawed-Off", start: "sawedoff-shell-1", finish: "sawedoff-shells-in", action: "sawedoff-pump" },
    { id: "kit-hl2-shotgun", name: "Combine Shotgun", start: "hl2sg-reload-1", finish: "hl2sg-reload-2", action: "hl2sg-cock" },
    { id: "kit-chrome", name: "Chrome Shotgun", start: "chrome-shell-2", finish: "chrome-shell-4", action: "chrome-pump" },
    { id: "kit-auto-shotgun", name: "Auto Shotgun", start: "autosg-boltback", finish: "autosg-shell", action: "autosg-boltforward" },
    { id: "kit-super-shorty", name: "Super Shorty", start: "shorty-load-1", finish: "shorty-load-3", action: "shorty-pump" },
    { id: "kit-g3", name: "G3SG1", pull: "g3sg1-slideback", start: "g3sg1-clipout", finish: "g3sg1-clipin", action: "g3sg1-slideforward" },
    { id: "kit-scar20", name: "SCAR-20", pull: "scar20-boltback", start: "scar20-clipout", finish: "scar20-clipin", action: "scar20-boltforward" },
    { id: "kit-sg553", name: "SG 553", pull: "sg556-boltback", start: "sg556-clipout", finish: "sg556-clipin", action: "sg556-boltforward" },
    { id: "kit-sg550", name: "SG 550", start: "sg550-clipout", finish: "sg550-clipin", action: "sg550-boltpull" },
    { id: "kit-g3-classic", name: "Classic G3SG1", start: "g3c-clipout", finish: "g3c-clipin", action: "g3c-slide" },
    { id: "kit-hunting", name: "Hunting Rifle", pull: "hunting-boltback", start: "hunting-clipout", finish: "hunting-clipin", action: "hunting-boltforward" },
    { id: "kit-military", name: "Military Sniper", pull: "military-slideback", start: "military-clipout", finish: "military-clipin", action: "military-slideforward" },
    { id: "kit-garand", name: "M1 Garand", start: "garand-ping", finish: "garand-clipin", action: "garand-boltforward" },
    { id: "kit-carbine", name: "M1 Carbine", pull: "carbine-boltback", start: "carbine-clipout", finish: "carbine-clipin", action: "carbine-boltforward" },
    { id: "kit-desert", name: "Desert Rifle", pull: "desert-slideback", start: "desert-clipout", finish: "desert-clipin", action: "desert-slideforward" },
    { id: "kit-rocket", name: "Rocket", finish: "rocket-reload" },
    { id: "kit-quake", name: "Quake RPG", finish: "quake-rpg-reload" },
    { id: "kit-mangler", name: "Cow Mangler", finish: "cow-mangler-reload" },
    { id: "kit-bazooka", name: "Beggar's Bazooka", finish: "dumpster-rocket-reload" },
    { id: "kit-dod-bazooka", name: "Bazooka", finish: "dodrocket-clipin" },
    { id: "kit-mortar", name: "Mortar Shell", finish: "mortar-load" },
    { id: "kit-grenade-launcher", name: "Grenade Launcher", finish: "tfgl-reload" },
    { id: "kit-drum-launcher", name: "Drum Launcher", finish: "l4dgl-shell" },
    { id: "kit-sticky", name: "Sticky Launcher", finish: "sticky-reload" },
    { id: "kit-bison", name: "Righteous Bison", finish: "bison-reload" },
    { id: "kit-p90", name: "P90", start: "p90-release-out", finish: "p90-clipin", action: "p90-boltforward" },
    { id: "kit-mp7", name: "MP7", start: "mp7-clipout", finish: "mp7-clipin", action: "mp7-slideforward" },
    { id: "kit-mp9", name: "MP9", start: "mp9-clipout", finish: "mp9-clipin", action: "mp9-boltforward" },
    { id: "kit-ump45", name: "UMP-45", start: "ump45-clipout", finish: "ump45-clipin", action: "ump45-boltforward" },
    { id: "kit-mac10", name: "MAC-10", start: "mac10-clipout", finish: "mac10-clipin", action: "mac10-boltforward" },
    { id: "kit-bizon", name: "PP-Bizon", start: "bizon-clipout", finish: "bizon-clipin", action: "bizon-boltforward" },
    { id: "kit-mp5", name: "MP5", start: "mp5-clipout", finish: "mp5-clipin", action: "mp5-slideforward" },
    { id: "kit-thompson", name: "Tommy Gun", start: "thompson-clipout", finish: "thompson-clipin", action: "thompson-boltforward" },
    { id: "kit-mp40", name: "MP40", start: "mp40-clipout", finish: "mp40-clipin", action: "mp40-boltforward" },
    { id: "kit-survivor-smg", name: "Survivor SMG", start: "l4dsmg-clipout", finish: "l4dsmg-clipin", action: "l4dsmg-slideforward" },
    { id: "kit-awp", name: "AWP bolt", start: "awp-boltback", finish: "awp-clipin", action: "awp-boltforward" },
    { id: "kit-ssg08", name: "SSG 08 bolt", start: "ssg08-boltback", finish: "ssg08-clipin", action: "ssg08-boltforward" },
    { id: "kit-scout", name: "Scout bolt", start: "sniper-bolt-back", finish: "scout-clipin", action: "sniper-bolt-forward" },
    { id: "kit-awp-classic", name: "Classic AWP", start: "awpc-clipout", finish: "awpc-clipin", action: "awpc-bolt" },
    { id: "kit-awp-mag", name: "AWP magazine", start: "awp-clipout", finish: "awp-clipin", action: "awp-boltforward" },
    { id: "kit-scout-classic", name: "Classic Scout", start: "scoutc-clipout", finish: "scoutc-clipin", action: "scoutc-bolt" },
    { id: "kit-machina", name: "Machina", start: "machina-boltback", finish: "machina-reload", action: "machina-boltforward" },
    { id: "kit-sniper-rifle", name: "Sniper Rifle", start: "sniper-bolt-back", finish: "sniper-reload", action: "sniper-bolt-forward" },
    { id: "kit-kar98k", name: "Kar98k", start: "k98-boltback", finish: "k98-clipin", action: "k98-boltforward" },
    { id: "kit-survivor-scout", name: "Survivor Scout", start: "l4dscout-bolt", finish: "l4dscout-clipin", action: "l4dscout-boltforward" },
    { id: "kit-aug", name: "AUG", start: "aug-clipout", finish: "aug-clipin", action: "aug-boltrelease" },
    { id: "kit-famas", name: "FAMAS", start: "famas-clipout", finish: "famas-clipin", action: "famas-boltforward" },
    { id: "kit-sg553-tri", name: "SG 553", start: "sg556-clipout", finish: "sg556-clipin", action: "sg556-boltforward" },
    { id: "kit-aug-classic", name: "Classic AUG", start: "augc-clipout", finish: "augc-clipin", action: "augc-boltslap" },
    { id: "kit-famas-classic", name: "Classic FAMAS", start: "famasc-clipout", finish: "famasc-clipin", action: "famasc-forearm" },
    { id: "kit-sg552-classic", name: "Classic SG 552", start: "sg552c-clipout", finish: "sg552c-clipin", action: "sg552c-boltpull" },
    { id: "kit-galil-classic", name: "Classic Galil", start: "galilc-clipout", finish: "galilc-clipin", action: "galilc-boltpull" },
    { id: "kit-survivor-m4", name: "Survivor M4", start: "l4dm4-clipout", finish: "l4dm4-clipin", action: "l4dm4-slideforward" },
    { id: "kit-outbreak-m4", name: "Outbreak M4", start: "zpsm4-clipout", finish: "zpsm4-clipin", action: "zpsm4-boltback" },
    { id: "kit-m4a1s", name: "M4A1-S", start: "m4a1-clipout", finish: "m4a1-clipin", action: "m4a1s-boltforward" },
    { id: "kit-glock", name: "Glock", start: "glock-clipout", finish: "glock-clipin", action: "glock-sliderelease" },
    { id: "kit-usp", name: "USP-S", start: "usp-clipout", finish: "usp-clipin", action: "usp-sliderelease" },
    { id: "kit-fiveseven", name: "Five-SeveN", start: "fiveseven-out", finish: "fiveseven-in", action: "fiveseven-slide" },
    { id: "kit-revolver", name: "R8 cylinder", start: "revolver-out", finish: "revolver-in-close", action: "revolver-hammer" },
    { id: "kit-p250", name: "P250", start: "p250-clipout", finish: "p250-clipin", action: "p250-sliderelease" },
    { id: "kit-tec9", name: "Tec-9", start: "tec9-clipout", finish: "tec9-clipin", action: "tec9-boltrelease" },
    { id: "kit-p2000", name: "P2000", start: "p2000-clipout", finish: "p2000-clipin", action: "p2000-sliderelease" },
    { id: "kit-elite", name: "Dual Berettas", start: "elite-clipout", finish: "elite-clipin", action: "elite-sliderelease" },
    { id: "kit-deagle", name: "Desert Eagle", start: "deagle-clipout", finish: "deagle-clipin", action: "deagle-slideforward" },
    { id: "kit-colt", name: "Colt M1911", start: "colt-clipout", finish: "colt-clipin", action: "colt-boltforward" },
    { id: "kit-p228", name: "P228", start: "p228-clipout", finish: "p228-clipin", action: "p228-sliderelease" },
  ];
  const ROLES = ["pull", "start", "finish", "action"];
  const stageId = piece => "stage:" + piece;
  const kitById = id => KITS.find(k => k.id === id);
  const kitPieces = kit => ROLES.map(r => kit[r]).filter(Boolean);
  const AUDIO = new Map(SOUNDS.map(s => [s.id, s]));
  for (const piece of new Set(KITS.flatMap(kitPieces)))
    AUDIO.set(stageId(piece), { id: stageId(piece), name: piece, file: `reload/stages/${piece}.mp3` });

  /* ---- The primary guns ----
     Each has its own shot and reload picks, and its own sounds: shots that suit its firing (the Tri-Hard plays one
     sound for its three-round burst, so its shots are bursts, 100 ms apart like the game's), and kits with a piece for
     each of its reload cues. `rof` is the time between shots (the game runs on 33 ms ticks), measured in a live match. The first
     shot and kit are what "Matched to your gun" plays. */
  const GUNS = [
    { id: "eggk47", name: "EggK-47", rof: 100, shots: ["ak-47", "m4a4", "m4a1-s", "galil-ar", "classic-ak-47", "classic-m4a1", "negev", "classic-m249", "pulse-rifle", "survivor-ak"], kits: ["kit-ak", "kit-m4a4", "kit-galil", "kit-ak-classic", "kit-m4-classic", "kit-stg44", "kit-bar", "kit-survivor-ak", "kit-ar2", "kit-outbreak-ak"] },
    { id: "dozenGauge", name: "Scrambler", rof: 267, shots: ["nova", "xm1014", "sawed-off", "force-a-nature", "mag-7", "classic-m3", "scattergun", "chrome-shotgun", "spas-12", "double-barrel"], kits: ["kit-double", "kit-mag7", "kit-pump", "kit-nova", "kit-xm1014", "kit-sawedoff", "kit-hl2-shotgun", "kit-chrome", "kit-auto-shotgun", "kit-super-shorty"] },
    { id: "csg1", name: "Free Ranger", rof: 433, shots: ["g3sg1", "scar-20", "classic-rifle", "sg-550", "classic-g3sg1", "hunting-rifle", "military-sniper", "crossbow", "survivor-sg-552", "bazaar-bargain"], kits: ["kit-g3", "kit-scar20", "kit-sg553", "kit-sg550", "kit-g3-classic", "kit-hunting", "kit-military", "kit-garand", "kit-carbine", "kit-desert"] },
    { id: "rpegg", name: "RPEGG", rof: 1333, shots: ["blast-rocket", "quake-rocket", "direct-hit", "black-box", "liberty-launcher", "air-strike", "cow-mangler", "loch-n-load", "rpg", "doom-rocket"], kits: ["kit-rocket", "kit-quake", "kit-mangler", "kit-bazooka", "kit-dod-bazooka", "kit-mortar", "kit-grenade-launcher", "kit-drum-launcher", "kit-sticky", "kit-bison"] },
    { id: "smg", name: "Whipper", rof: 67, shots: ["rush-p90", "rapid-p90", "mp7", "mp9", "ump-45", "mac-10", "pp-bizon", "mp5", "smg1", "silenced-smg"], kits: ["kit-p90", "kit-mp7", "kit-mp9", "kit-ump45", "kit-mac10", "kit-bizon", "kit-mp5", "kit-thompson", "kit-mp40", "kit-survivor-smg"] },
    { id: "m24", name: "Crackshot", rof: 500, shots: ["sniper-awp", "thunder-awp", "ssg-08", "scout", "sniper-rifle", "sydney-sleeper", "machina", "classic-awp", "survivor-scout", "machina-charged"], kits: ["kit-awp", "kit-ssg08", "kit-scout", "kit-awp-classic", "kit-awp-mag", "kit-scout-classic", "kit-machina", "kit-sniper-rifle", "kit-kar98k", "kit-survivor-scout"] },
    { id: "aug", name: "Tri-Hard", rof: 500, shots: ["aug-burst", "famas-burst", "sg-553-burst", "classic-aug-burst", "classic-famas-burst", "classic-sg-552-burst", "classic-galil-burst", "survivor-m4-burst", "desert-rifle-burst", "classic-m4a1-silenced-burst"], kits: ["kit-aug", "kit-famas", "kit-sg553-tri", "kit-aug-classic", "kit-famas-classic", "kit-sg552-classic", "kit-galil-classic", "kit-survivor-m4", "kit-outbreak-m4", "kit-m4a1s"] },
  ];
  const GUN = Object.fromEntries(GUNS.map(g => [g.id, g]));
  const PISTOL_KITS = ["kit-glock", "kit-usp", "kit-fiveseven", "kit-revolver", "kit-p250", "kit-tec9", "kit-p2000", "kit-elite", "kit-deagle", "kit-colt", "kit-p228"];
  // The pistol's "Matched to your gun" kit follows your Secondary pick.
  const PISTOL_KIT = { "usp-s": "kit-usp", "five-seven": "kit-fiveseven", "r8-revolver": "kit-revolver", p250: "kit-p250",
    "tec-9": "kit-tec9", p2000: "kit-p2000", "dual-berettas": "kit-elite", quickdraw: "kit-glock", "hand-cannon": "kit-deagle" };

  /* ---- The game's reload cues ----
     Each gun's reload plays a few named sounds. The role is what the cue means, so a kit can answer it. */
  const CUE = {
    gun_eggk47_remove_mag: "start", gun_cluck9mm_remove_mag: "start", gun_aug_remove_mag: "start",
    gun_dozenGauge_open: "start", gun_m24_bolt_open: "start", gun_csg1_pull_action: "pull",
    gun_eggk47_insert_mag: "finish", gun_cluck9mm_insert_mag: "finish", gun_aug_insert_mag: "finish",
    gun_dozenGauge_load: "finish", gun_rpegg_load: "finish",
    gun_eggk47_full_cycle: "action", gun_smg_cycle: "action", gun_aug_cycle: "action",
    gun_csg1_release_action: "action", gun_dozenGauge_close: "action", gun_m24_bolt_close: "action",
  };
  // The gun a reload's first cue names by itself. The EggK-47, Free Ranger and Whipper share the EggK-47 magazine
  // cues, so for those it's the gun that player last fired.
  const CUE_GUN = { gun_cluck9mm_remove_mag: "cluck9mm", gun_aug_remove_mag: "aug", gun_csg1_pull_action: "csg1",
    gun_dozenGauge_open: "dozenGauge", gun_m24_bolt_open: "m24", gun_rpegg_load: "rpegg" };
  // Measured in a live match, empty magazine: ms from each gun's first reload cue to the later ones. A partial reload
  // is the same without the action (and, on the Free Ranger, without the pull: mag out 0, mag in 1666). The RPEGG's
  // only cue comes 3.3 s after the shot. Test uses these to play a reload as it sounds in a game.
  const TIMING = {
    eggk47: { start: 0, finish: 1550, action: 2081 },
    dozenGauge: { start: 0, finish: 1335, action: 1919 },
    csg1: { pull: 0, start: 750, finish: 2169, action: 2669 },
    rpegg: { finish: 0 },
    smg: { start: 0, finish: 2000, action: 2585 },
    m24: { start: 0, finish: 1353, action: 1750 },
    aug: { start: 0, finish: 1500, action: 2082 },
    cluck9mm: { start: 0, finish: 1583, action: 2334 },
  };

  const DEFAULT = "default", CUSTOM = "custom", PICK = "pick", PER_GUN = "per-gun", SAME = "same";
  // `more` lists show only under Advanced. In the grid's two columns the four plain ones fall as shots and reload
  // for the gun, then the pistol's shots and melee; with Advanced the rest pair up the pistol and the empty click.
  const SLOTS = [
    { id: "primary", name: "Gun shots", kind: "primary" },
    { id: "reload", name: "Gun reload", kind: "reload" },
    { id: "secondary", name: "Pistol shots", kind: "secondary" },
    { id: "sreload", name: "Pistol reload", kind: "sreload", more: true },
    { id: "melee", name: "Melee", kind: "melee" },
    { id: "empty", name: "Empty click", kind: "empty", more: true },
  ];
  const KIND = Object.fromEntries(SLOTS.map(s => [s.id, s.kind]));
  // Primary and Primary reload also have a pick for each gun, saved as "primary:<gun>" and "reload:<gun>". It starts on
  // "Same as all guns", the slot's own pick.
  const PER_GUN_SLOTS = ["primary", "reload"];
  const gunKey = (slot, gun) => slot + ":" + gun;
  const KEYS = [...SLOTS.map(s => s.id), ...PER_GUN_SLOTS.flatMap(s => GUNS.map(g => gunKey(s, g.id)))];
  const DEFAULTS = Object.freeze({ ...Object.fromEntries(KEYS.map(k => [k, k.includes(":") ? SAME : DEFAULT])),
    volume: 0.8, everyone: false });
  const warn = (...a) => console.warn("[Gun Sounds]", ...a);

  /* ---- Which sounds are which weapon ----
     The game names them gun_<weapon>_fire (and gun_<weapon>_<skin>_fire), and melee_<weapon>. Secondary weapons are
     listed; any gun not listed counts as a primary, so a weapon added later is still covered. Every gun's empty click
     is gun_eggk47_dry_fire. */
  const SECONDARY = new Set(["cluck9mm"]);
  function slotOf(name) {
    if (typeof name !== "string") return null;
    if (name.includes("dry_fire")) return "empty";
    // The pistol's empty reload ends on the EggK-47 bolt; the reload in progress settles which list it belongs to.
    if (CUE[name]) return name.startsWith("gun_cluck9mm_") ? "sreload" : "reload";
    if (name.startsWith("melee_")) return "melee";
    const m = /^gun_([^_]+)_(?:.*_)?fire/.exec(name);
    if (!m) return null;
    return SECONDARY.has(m[1]) ? "secondary" : "primary";
  }
  const gunOf = name => /^gun_([^_]+)_/.exec(name)?.[1];

  /* ---- Saved settings ---- */
  const MEMES = SOUNDS.filter(x => !x.kind);
  const isReload = slot => slot === "reload" || slot === "sreload";
  // What a list offers besides the game's sound and your own: a slot, or a slot for one gun ("primary:eggk47").
  function choices(key) {
    const [slot, gun] = key.split(":");
    if (slot === "primary") return (gun ? [GUN[gun]] : GUNS).flatMap(g => g.shots);
    if (slot === "reload") return (gun ? [GUN[gun]] : GUNS).flatMap(g => g.kits);
    if (slot === "sreload") return PISTOL_KITS;
    return SOUNDS.filter(x => x.kind === KIND[slot]).map(x => x.id);
  }
  function isSound(s, key) {
    if (s === DEFAULT || s === CUSTOM) return true;
    const [slot, gun] = key.split(":");
    if (s === SAME) return !!gun;
    if (s === PER_GUN) return !gun && (slot === "primary" || isReload(slot));
    return choices(key).includes(s) || (!isReload(slot) && MEMES.some(x => x.id === s));
  }
  // A reload pick from an older version that's gone (a one-clip reload, a test build's, or a gun kit on the pistol)
  // becomes the kit matched to your gun.
  const oldReload = v => typeof v === "string" && /^(kit-|reload-)|^(steel-reset|tactical-swap|rifle-reset|pump-action|sidearm-snap)$/.test(v);
  function clean(s) {
    const ok = !!s && typeof s === "object";
    // 1.1 had one Reload list; its pick carries over to both reload lists.
    const src = ok ? { ...s, sreload: s.sreload === undefined ? s.reload : s.sreload } : {};
    const out = {};
    for (const k of KEYS) {
      const v = src[k];
      out[k] = !ok ? DEFAULTS[k] : isSound(v, k) ? v : isReload(k) && oldReload(v) ? PER_GUN : DEFAULTS[k];
    }
    out.volume = ok && Number.isFinite(s.volume) ? Math.min(1, Math.max(0, s.volume)) : DEFAULTS.volume;
    out.everyone = ok && s.everyone === true;
    return out;
  }
  let saved;
  try { saved = clean(JSON.parse(localStorage.getItem(STORE))); } catch { saved = clean(null); }
  function save(s) {
    saved = clean(s);
    try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch { /* storage blocked: kept for this visit */ }
    if (running) getReady();
  }
  // What a list's pick plays for a gun, and the key your own MP3 for it is kept under. "Same as all guns" takes the
  // slot's pick, and "Matched to your gun" the gun's first sound (the pistol's kit follows your Secondary pick). A gun
  // added to the game later has none of its own, so it keeps the game's sound.
  function resolve(key, gun, p = saved) {
    const slot = key.split(":")[0];
    let sound = p[key] ?? DEFAULT;
    if (sound === SAME) { key = slot; sound = p[slot]; }
    if (sound === PER_GUN) sound = slot === "sreload" ? PISTOL_KIT[p.secondary] || "kit-glock" :
      (slot === "primary" ? GUN[gun]?.shots[0] : GUN[gun]?.kits[0]) ?? DEFAULT;
    return { sound, key };
  }
  const pickFor = (slot, gun, p = saved) =>
    resolve(GUN[gun] && PER_GUN_SLOTS.includes(slot) ? gunKey(slot, gun) : slot, gun, p);
  const kitFor = (gun, p = saved) => kitById(pickFor(gun === "cluck9mm" ? "sreload" : "reload", gun, p).sound);
  // Settings as a file: { ssGunSounds: version, settings }. Anything unknown in one is dropped, as when loading.
  const exportText = p => JSON.stringify({ ssGunSounds: VERSION, settings: clean(p) }, null, 2);
  function parseSettings(text) {
    const j = JSON.parse(text), s = j && typeof j === "object" && "ssGunSounds" in j ? j.settings : j;
    if (!s || typeof s !== "object" || !KEYS.some(k => k in s)) throw new Error("Not Gun Sounds settings");
    return clean({ ...DEFAULTS, ...s });
  }
  const reloadsOn = () => KEYS.some(k => isReload(k.split(":")[0]) && saved[k] !== DEFAULT && saved[k] !== SAME);

  /* ---- Quick start ----
     One click sets every list (and clears the gun-by-gun picks), so a beginner never has to open a dropdown. Volume
     and Everyone's weapons are left alone. A preset is lit while the lists still match it. */
  const PRESETS = [
    { id: "game", name: "Game sounds", tip: "Keep the game's own sounds.", picks: {} },
    { id: "real", name: "Real guns", tip: "Each gun gets a matching real gun sound and reload.",
      picks: { primary: PER_GUN, reload: PER_GUN, secondary: "usp-s", sreload: PER_GUN, melee: "swift-slash", empty: "pistol-click" } },
    { id: "memes", name: "Memes", tip: "Vine Boom, Tuturu, Punch and a fart.",
      picks: { primary: "boom", secondary: "tuturu", melee: "punch", empty: "fart" } },
  ];
  const presetPicks = pr => ({ ...Object.fromEntries(KEYS.map(k => [k, DEFAULTS[k]])), ...pr.picks });
  const presetOf = p => PRESETS.find(pr => { const want = presetPicks(pr); return KEYS.every(k => p[k] === want[k]); });
  // What only Advanced shows: the pistol reload, the empty click, a gun's own picks and Everyone's weapons.
  const hiddenInUse = p => p.everyone || KEYS.some(k => (k.includes(":") || SLOTS.some(s => s.id === k && s.more)) && p[k] !== DEFAULTS[k]);
  // How the panel looks stays as the player left it: `open` (the Gun Sounds heading, like a Notion toggle: shut until
  // they open it) and `more` (Advanced; until they choose, it's open only if they already use something in it).
  function readUi() {
    try { const v = JSON.parse(localStorage.getItem(UI_STORE)); if (v && typeof v === "object") return v; } catch { /* no storage */ }
    return {};
  }
  function writeUi(patch) {
    try { localStorage.setItem(UI_STORE, JSON.stringify({ ...readUi(), ...patch })); } catch { /* kept for this visit */ }
  }
  const readOpen = () => readUi().open === true;
  const readMore = () => typeof readUi().more === "boolean" ? readUi().more : hiddenInUse(saved);

  /* ---- Built-in sounds, from GitHub ----
     They come from the commit that added them, so the files this version uses never change under it. A sound is
     downloaded the first time it's needed, then kept in this site's Cache Storage. */
  const FILES = "https://raw.githubusercontent.com/Virojet/Shell-Shockers-Gun-Sounds/3903406420cb089f3c5e1649a07c0508c91d5ade/sounds";
  // Same immutable files, via a second host if GitHub is temporarily unavailable or blocked.
  const MIRROR = FILES.replace("https://raw.githubusercontent.com/", "https://cdn.jsdelivr.net/gh/")
    .replace(/\/([a-f0-9]{40})\//, "@$1/");
  const KEEP = "ss-gun-sounds";
  let kept = null;
  function keep() {
    kept = kept || (async () => {
      const store = await caches.open(KEEP);
      for (const req of await store.keys()) if (!req.url.startsWith(FILES + "/")) store.delete(req);   // an older version's
      return store;
    })().catch(() => null);   // no storage here (a private window, or it's blocked): they download on each visit
    return kept;
  }
  async function download(file, name) {
    const url = `${FILES}/${file}`, store = await keep();
    const old = store && await store.match(url).catch(() => null);
    if (old) {
      try { return await decode(await old.arrayBuffer(), name); }
      catch { await store.delete(url).catch(() => {}); }   // discard a damaged cached response and download again
    }
    const errors = [];
    for (const host of [FILES, MIRROR]) {
      const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch(`${host}/${file}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.arrayBuffer(), buf = await decode(data, name);
        // Only keep verified audio. Both hosts share the canonical cache key, so a fallback works offline too.
        if (store) store.put(url, new Response(data, { headers: { "Content-Type": "audio/mpeg" } })).catch(() => {});
        return buf;
      } catch (err) {
        errors.push(`${host === FILES ? "GitHub" : "backup"}: ${err.name === "AbortError" ? "request timed out" : err.message}`);
      } finally { clearTimeout(timer); }
    }
    throw new Error(`Couldn't download ${file}. ${errors.join("; ")}`);
  }

  /* ---- Your own sound: one file a list (a slot, or one gun's), in this site's IndexedDB ---- */
  const MAX_BYTES = 4 * 1024 * 1024;
  function idb(mode, fn) {
    return new Promise((resolve, reject) => {
      let req;
      try { req = indexedDB.open("ss-gun-sounds", 1); } catch (e) { return reject(e); }
      req.onupgradeneeded = () => req.result.createObjectStore("files");
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        const db = req.result;
        try {
          const tx = db.transaction("files", mode), r = fn(tx.objectStore("files"));
          tx.oncomplete = () => { db.close(); resolve(r && r.result); };
          tx.onerror = tx.onabort = () => { db.close(); reject(tx.error); };
        } catch (e) { db.close(); reject(e); }
      };
    });
  }
  const readFile = slot => idb("readonly", st => st.get(slot)).then(v => v && v.data ? v : null);
  // Secondary reload started as a copy of the one Reload list, so until it has a file of its own it uses that one.
  const fileFor = slot => readFile(slot).then(f => f || (slot === "sreload" ? readFile("reload") : null));
  const writeFile = (slot, f) => idb("readwrite", st => st.put(f, slot));

  /* ---- Making a clip ready ----
     Silence at the start is cut, so the sound plays the moment you shoot; the peak is matched, so no sound is much
     louder than another; and a clip is held to 4 s, fading out at the end, so a long file can't drown a fight. */
  const SR = 48000, MAX_SECONDS = 4, PEAK = 0.8;
  function prepare(buf) {
    const n = buf.length, sr = buf.sampleRate, chans = [];
    for (let ch = 0; ch < buf.numberOfChannels; ch++) chans.push(buf.getChannelData(ch));
    let peak = 0;
    for (const x of chans) for (let i = 0; i < n; i++) { const a = Math.abs(x[i]); if (a > peak) peak = a; }
    if (!Number.isFinite(peak) || peak < 1e-4) return null;
    let from = 0;
    while (from < n && !chans.some(x => Math.abs(x[from]) > peak * 0.02)) from++;
    from = Math.max(0, from - Math.round(0.003 * sr));
    let to = n;
    while (to > from && !chans.some(x => Math.abs(x[to - 1]) > peak * 0.002)) to--;
    const capped = to - from > MAX_SECONDS * sr;
    if (capped) to = from + Math.round(MAX_SECONDS * sr);
    const len = to - from;
    if (len < 64) return null;
    const out = new AudioBuffer({ length: len, numberOfChannels: chans.length, sampleRate: sr });
    const fadeOut = Math.min(len >> 1, Math.round((capped ? 0.15 : 0.01) * sr)), fadeIn = from ? Math.round(0.002 * sr) : 0;
    const gain = PEAK / peak;
    chans.forEach((x, ch) => {
      const y = out.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        let g = gain;
        if (i < fadeIn) g *= i / fadeIn;
        if (i >= len - fadeOut) g *= (len - i) / fadeOut;
        y[i] = x[from + i] * g;
      }
    });
    return out;
  }
  async function decode(data, name) {
    let raw;
    try { raw = await new OfflineAudioContext(2, 1, SR).decodeAudioData(data.slice(0)); }
    catch (err) { throw Object.assign(new Error(`Can't play ${name}. MP3, OGG and WAV files work.`), { note: "Can't play " + name, cause: err }); }
    const buf = prepare(raw);
    if (!buf) throw Object.assign(new Error(`There's no sound in ${name}.`), { note: "No sound in " + name });
    return buf;
  }

  const cache = new Map();   // sound id, or "custom:<list key>" → Promise of its AudioBuffer
  const ready = new Map();   // the same clips, once loaded, for the shot that can't wait
  const keyOf = (sound, list) => sound === CUSTOM ? CUSTOM + ":" + list : sound;
  function clip(sound, list) {
    const key = keyOf(sound, list);
    let p = cache.get(key);
    if (p) return p;
    p = sound === CUSTOM ?
      fileFor(list).then(f => f ? decode(f.data, f.name) : null) :
      download(AUDIO.get(sound).file, sound);
    cache.set(key, p);
    p.then(b => { if (b) ready.set(key, b); }, () => { if (cache.get(key) === p) cache.delete(key); });
    return p;
  }
  const kitClips = kit => Promise.all(kitPieces(kit).map(piece => clip(stageId(piece))));
  const kitReady = kit => kitPieces(kit).every(piece => ready.has(stageId(piece)));
  // `sound` as resolve() gives it: never "Same as all guns" or "Matched to your gun".
  function warm(sound, key) {
    if (sound === DEFAULT || AUDIO.get(sound)?.game) return;   // the game's own sounds need no download
    const kit = kitById(sound);
    if (kit) kitClips(kit).catch(warn);
    else clip(sound, key).catch(warn);
  }
  // Everything that can play: each gun's picks, the slot's own (for a gun added later), and the other lists.
  function getReady() {
    for (const slot of PER_GUN_SLOTS) {
      for (const g of GUNS) { const r = pickFor(slot, g.id); warm(r.sound, r.key); }
      if (saved[slot] !== PER_GUN) warm(saved[slot], slot);
    }
    for (const slot of ["secondary", "melee", "empty", "sreload"]) { const r = resolve(slot); warm(r.sound, r.key); }
  }

  /* ---- Playing ----
     Into the game's own sound output (BAWK's input, ahead of its volume), so its Sound Effects volume applies to
     these too. Once more than a few play at once, the oldest is cut by a short fade, so full-auto fire with a long
     sound can't pile up. Other players' sounds go first, so a busy fight never cuts your own. */
  const MAX_VOICES = 6;
  const voices = new Set();
  let own = null;
  function output() {
    const B = window.BAWK, ctx = B && B.audioCtx, node = B && (B.inputNode || B.gainNode);
    if (ctx && node && ctx.state !== "closed") return { ctx, node };
    if (!own || own.ctx.state === "closed") {
      const c = new AudioContext(), g = c.createGain();
      g.gain.value = 0.6;   // the game's default Sound Effects volume
      g.connect(c.destination);
      own = { ctx: c, node: g };
    }
    return own;
  }
  function play(buf, volume, to, delay = 0) {
    if (!buf || volume <= 0) return null;
    const { ctx, node } = output();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = buf;
    g.gain.value = volume;
    src.connect(g); g.connect(to || node);
    src.start(delay > 0 ? ctx.currentTime + delay : 0);
    const v = { src, g, ctx, mine: !to };
    voices.add(v);
    // A listener, not onended: the game sets onended on the sources it gets back to free its channel.
    src.addEventListener("ended", () => { voices.delete(v); try { g.disconnect(); } catch { /* already gone */ } });
    if (voices.size > MAX_VOICES) fade([...voices].find(x => !x.mine) || voices.values().next().value);
    return src;
  }
  function fade(v) {
    voices.delete(v);
    try {
      const t = v.ctx.currentTime;
      v.g.gain.cancelScheduledValues(t);
      v.g.gain.setTargetAtTime(0, t, 0.008);
      v.src.stop(t + 0.06);
    } catch { /* already stopped */ }
  }
  const quiet = () => [...voices].forEach(fade);
  // Fade a playing clip out `after` seconds from now. Called again, the later time wins.
  function fadeAt(src, after, speed = 0.05) {
    const v = [...voices].find(x => x.src === src);
    if (!v) return;
    try {
      const t = v.ctx.currentTime + Math.max(0, after);
      v.g.gain.cancelScheduledValues(v.ctx.currentTime);
      v.g.gain.setTargetAtTime(0, t, speed);
      v.src.stop(t + speed * 6);
    } catch { /* already stopped */ }
  }
  // A shot's tail fades quickly when the same gun fires again, so each shot of a fast gun is heard on its own beat
  // instead of smearing into the last one.
  let lastShots = new WeakMap();
  function shot(by, src, after = 0) {
    const prev = lastShots.get(by);
    if (prev) fadeAt(prev, after, 0.03);
    lastShots.set(by, src);
  }

  /* ---- The hook ---- */
  const MARK = Symbol.for("ssGunSounds.hook");
  // Every shot, yours included, plays through a positional channel (BAWK.children[].channels[]) whose
  // `position` is the shooter's own position object. The game camera hangs under your player node,
  // so a shot is yours when that object belongs to one of the camera's ancestors.
  let scene = null;
  function findScene() {
    if (scene && !(scene.isDisposed || scene._isDisposed)) return scene;
    scene = null;
    for (const k of Object.getOwnPropertyNames(window)) {
      let v;
      try { v = window[k]; } catch { continue; }
      if (!v || typeof v !== "object") continue;
      try {
        if (Array.isArray(v.cameras) && Array.isArray(v.rootNodes)) return (scene = v);
        const s = v._scene;
        if (s && Array.isArray(s.cameras) && Array.isArray(s.rootNodes)) return (scene = s);
      } catch {}
    }
    return null;
  }
  function soundPosition(B, to) {
    for (const child of B.children || []) {
      const ch = child && child.channels && child.channels.find(c => c && c.node === to);
      if (ch) return ch.position;
    }
    return null;
  }
  function mine(B, to) {
    if (!to || to === B.inputNode || to === B.gainNode) return true;
    const pos = soundPosition(B, to);
    const s = findScene();
    if (!pos || !s) return true;   // can't tell: better your sound than none
    const cam = s.cameras.find(c => c && c.name === "camera") || s.activeCamera;
    if (cam && cam.parent) {
      let n = cam;
      for (let i = 0; n.parent && i < 8; i++) n = n.parent;
      me = n._position || n.position;   // your player node (it outlives respawns)
      for (let c = cam; c; c = c.parent) if (c._position === pos || c.position === pos) return true;
    }
    // The camera comes off your egg on pause and death screens; the remembered node still counts.
    // Before your first spawn there's no egg, so nothing is yours.
    return pos === me;
  }
  let me = null;

  /* ---- Reloads ----
     All cues from one player's reload carry that player's position object, so it keys the reload in progress.
     A kit answers each cue with its own piece. Your own MP3 plays once on the first cue and fades as the reload ends.
     Cues with nothing to play get a silent source, so the game's sound stays off and BAWK still frees its channel.
     If the pick isn't loaded when a reload starts, that whole reload keeps the game's sounds. */
  let reloads = new WeakMap(), playing = new Set(), primaryWeapons = new WeakMap(), previewWeapon = "eggk47", silent = null;
  const reloadKey = (B, to) => soundPosition(B, to) || to || B;
  const quietSource = to => {
    silent = silent || new AudioBuffer({ length: 1, numberOfChannels: 1, sampleRate: SR });
    return play(silent, 1, to);
  };
  function endReload(B, to, key = reloadKey(B, to)) {
    const state = reloads.get(key);
    if (state) state.sources.forEach(s => fadeAt(s, 0));
    reloads.delete(key);
    playing.delete(key);
  }
  // A player who dies mid-reload: the game plays the shell burst at a copy of their position, a little higher.
  function endReloadAt(B, pos) {
    if (!pos || !Number.isFinite(pos.x)) return;
    for (const key of playing) {
      if (Number.isFinite(key.x) && Math.hypot(key.x - pos.x, key.y + 0.32 - pos.y, key.z - pos.z) < 0.5) endReload(B, null, key);
    }
  }
  function startReload(B, name, to, key, now) {
    endReload(B, to);
    const slot = name.startsWith("gun_cluck9mm_") ? "sreload" : "reload";
    // The EggK-47, Free Ranger and Whipper share magazine cues: those go by the gun that player last fired.
    const gun = slot === "sreload" ? "cluck9mm" : CUE_GUN[name] || primaryWeapons.get(key) || "eggk47";
    const { sound, key: list } = pickFor(slot, gun);
    const state = { at: now, last: null, slot, sources: [], kit: null, clip: null, on: false, to: null };
    reloads.set(key, state);
    playing.add(key);
    if (sound === DEFAULT) return state;
    const own = mine(B, to);
    if (!own && !saved.everyone) return state;
    if (own && slot === "reload") previewWeapon = gun;
    state.to = own ? null : to;
    const kit = kitById(sound);
    if (kit) {
      if (kitReady(kit)) Object.assign(state, { kit, on: true });
      else kitClips(kit).catch(warn);
    } else {
      const buf = ready.get(keyOf(sound, list));
      if (buf) Object.assign(state, { clip: buf, on: true });
      else warm(sound, list);
    }
    return state;
  }
  function playReload(B, name, to) {
    const role = CUE[name], key = reloadKey(B, to), now = performance.now();
    let state = reloads.get(key);
    if (state && now - state.at > 8000) { reloads.delete(key); playing.delete(key); state = null; }
    // A reload starts on its first cue: mag out, action open, or (the Free Ranger's empty reload) the action pulled,
    // whose mag-out cue then belongs to it. The RPEGG's one cue is a reload of its own.
    const fresh = !state || role === "pull" || name === "gun_rpegg_load" || (role === "start" && state.last !== "pull");
    if (fresh) {
      if (role === "action") return null;   // the end of a reload we never saw start
      state = startReload(B, name, to, key, now);
    }
    state.at = now;
    state.last = role;
    if (!state.on) return null;
    let src = null;
    if (state.kit) {
      const piece = state.kit[role] || (role === "pull" ? state.kit.action : null);
      src = piece && play(ready.get(stageId(piece)), saved.volume, state.to);
    } else if (fresh) {
      src = play(state.clip, saved.volume, state.to);
    } else if (state.sources[0]) {
      // Let the clip run through the last touch, then fade: the bolt or slide comes about half a second after the mag.
      fadeAt(state.sources[0], role === "action" ? 0.45 : 0.9);
    }
    if (src) state.sources.push(src);
    return src || quietSource(state.to);
  }

  let hooked = null;   // { B, orig, wrap }
  function hook() {
    const B = window.BAWK, cur = B && B.play;
    if (typeof cur !== "function") return false;
    if (cur[MARK]) {   // ours already (this script's earlier hook)
      cur[MARK].live = true;
      hooked = { B, orig: cur[MARK].orig, wrap: cur };
      return true;
    }
    const state = { live: true, orig: cur };
    const wrap = function (name, to) {
      if (state.live && running) {
        try {
          const slot = slotOf(name);
          // A swap or a death ends a reload, and its sound with it.
          if (name === "weapon_swap" && reloads.has(reloadKey(B, to))) endReload(B, to);
          else if (name === "shell_burst" && playing.size) endReloadAt(B, soundPosition(B, to));
          if (isReload(slot)) {
            if (reloadsOn()) {
              const src = playReload(B, name, to);
              if (src) return src;
            }
            return cur.apply(this, arguments);
          }
          const by = slot && reloadKey(B, to), gun = slot === "primary" && gunOf(name);
          if (slot === "primary" || slot === "secondary" || slot === "melee") {
            if (reloads.has(by)) endReload(B, to);   // a shot or a swing cuts a reload short
            if (GUN[gun]) primaryWeapons.set(by, gun);
          }
          const { sound, key: list } = slot === "primary" ? pickFor(slot, gun) : slot ? resolve(slot) : {};
          if (sound && sound !== DEFAULT && (saved.everyone || mine(B, to))) {
            const own = mine(B, to), game = AUDIO.get(sound)?.game;
            if (game) {   // one of the game's own sounds, played in its place
              const args = [...arguments];
              args[0] = game;
              return cur.apply(this, args);
            }
            const buf = ready.get(keyOf(sound, list));
            const src = buf && play(buf, saved.volume, own ? null : to);
            if (src) {
              if (slot !== "empty") shot(by, src);
              if (own && GUN[gun]) previewWeapon = gun;
              return src;
            }
            if (!buf) warm(sound, list);   // not ready yet: the game's own sound this time
          }
        } catch (err) { warn(err); }
      }
      return cur.apply(this, arguments);
    };
    wrap[MARK] = state;
    try { B.play = wrap; } catch { return false; }
    if (B.play !== wrap) return false;
    hooked = { B, orig: cur, wrap };
    return true;
  }
  function unhook() {
    if (!hooked) return;
    const { B, orig, wrap } = hooked;
    hooked = null;
    wrap[MARK].live = false;   // if another script wrapped it since, ours stays in the chain but does nothing
    try { if (B.play === wrap) B.play = orig; } catch { /* left as is */ }
  }

  /* ---- Settings ▸ the speaker tab ▸ Gun Sounds, next to Language ---- */
  const CELL = "ss-gun-sounds";
  let ui = null, pending = null, customNames = {};
  let pendingFiles = {}, fileGen = 0;   // files picked since the popup opened: list key → { file, name, buf }
  const nameOf = key => pendingFiles[key] ? pendingFiles[key].name : customNames[key];
  const CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 9'%3E%3Cpath d='M.9 2.5 4.5 6.5 8.1 2.5' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;
  // The list takes the theme's colours (--ssg-*, read by paint()). Where the browser can style a dropdown's list
  // (Chrome and Edge), it opens as a short list in those colours with only the focused row lit.
  // The settings popup is centred and as tall as its contents, with room for little more than the game's own: with this
  // and Kill Sounds in it, on a 16:9 screen it would run off the top and bottom, Confirm with it. It scrolls instead.
  const CSS = `
#settingsPopup:has(#${CELL}) { max-height: 88vh; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; }
#${CELL} { min-width: 0; grid-column: 1 / -1; }
#${CELL} [hidden] { display: none !important; }
#${CELL} .ssg-slots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 var(--ss-space-sm); }
#${CELL} .ssg-slots > div { min-width: 0; }
#${CELL} .ssg-slots .ss_button { min-width: 0; padding-inline: .5em; margin: 0; }
#${CELL} .ssg-slots select.ss_select { margin-right: .3em; font-size: .9em; }
#${CELL} .ssg-slots selectedcontent { font-size: inherit; }
#${CELL} .ssg-top { display: flex; align-items: center; min-width: 0; }
#${CELL} .ssg-top h3 { flex: 1 1 auto; }
#${CELL} .ssg-head-toggle { display: inline-flex; align-items: center; gap: .45em; margin: 0; padding: 0; border: 0; background: none;
  box-shadow: none; color: inherit; font: inherit; letter-spacing: inherit; text-transform: inherit; text-shadow: inherit;
  text-align: left; cursor: pointer; }
#${CELL} .ssg-head-toggle:hover .ssg-tri { opacity: .7; }
#${CELL} .ssg-head-toggle:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; border-radius: 3px; }
#${CELL} .ssg-tri { flex: none; width: 0; height: 0; border-block: .42em solid transparent; border-inline-start: .7em solid currentColor;
  transition: transform .15s ease; }
#${CELL} .ssg-head-toggle[aria-expanded=true] .ssg-tri { transform: rotate(90deg); }
@media (prefers-reduced-motion: reduce) { #${CELL} .ssg-tri { transition: none; } }
#${CELL} .ssg-top .ss_button, #${CELL} .ssg-presets .ss_button, #${CELL} .ssg-extra .ss_button { min-width: 0; margin: 0; padding-inline: .6em; }
#${CELL} .ssg-intro { margin: 0 0 .1em 2px; font-size: .85em; font-weight: 700; }
#${CELL} .ssg-presets { display: flex; flex-wrap: wrap; align-items: center; gap: .3em; margin: .3em 0 .1em 0; }
#${CELL} .ssg-presets .ssg-name { margin: 0 var(--ss-space-sm) 0 2px; }
#${CELL} .ssg-presets .ss_button[aria-pressed=true] { filter: brightness(1.35); box-shadow: 0 0 0 2px #fff; }
#${CELL} .ssg-gun { margin-top: .3em; }
#${CELL} .ssg-gun .ssg-name { margin: 0 var(--ss-space-sm) 0 2px; }
#${CELL} .ssg-gun select.ss_select { flex: 0 1 12em; margin: 0; font-size: .9em; }
#${CELL} .ssg-bottom { margin-top: .35em; }
#${CELL} .ssg-bottom .ssg-name { margin: 0 var(--ss-space-sm) 0 2px; }
#${CELL} .ssg-bottom input[type=range] { flex: 0 1 45%; }
#${CELL} .ssg-extra { margin-top: .35em; gap: .3em; }
#${CELL} .ssg-extra label { white-space: nowrap; margin-right: auto; }
#${CELL} .f_row { align-items: center; }
#${CELL} select, #${CELL} input[type=range] { min-width: 0; }
#${CELL} select { flex: 1 1 auto; }
#${CELL} optgroup { font: inherit; font-weight: 700; }
#${CELL} .ss_button, #${CELL} label { flex: none; }
#${CELL} .ss_button:disabled { opacity: .5; cursor: default; }
#${CELL} .ssg-name { display: block; margin: var(--ss-space-sm) 0 .15em 2px; font-weight: 700; font-size: inherit; }
#${CELL} .ssg-head { display: flex; align-items: baseline; min-width: 0; margin: .3em 0 .1em 2px; }
#${CELL} .ssg-head .ssg-name { flex: none; margin: 0; }
#${CELL} .ssg-note { flex: 0 1 auto; margin: 0 var(--ss-space-sm) 0 auto; padding-left: .5em; font-weight: 700; font-size: .85em;
  min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#${CELL} .ssg-note.ssg-error { color: var(--ss-red, #d15354) !important; }
@supports (appearance: base-select) {
  #${CELL} select, #${CELL} select::picker(select) { appearance: base-select; }
  #${CELL} select { align-items: center; padding-inline: .45em 0; }
  #${CELL} selectedcontent { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  #${CELL} select::picker-icon { content: ""; flex: none; width: 9px; height: 9px; margin-inline: .2em 2px;
    background: currentColor; mask: ${CHEVRON} center / contain no-repeat; }
  #${CELL} select::picker(select) { margin-block: .2em; padding-block: .3em; max-block-size: min(18em, 45vh); font-size: .85em;
    border: var(--ss-common-border-width) solid var(--ssg-accent); border-radius: var(--ss-space-sm);
    background: var(--ssg-bg); color: var(--ssg-fg); box-shadow: .15em .15em .4em rgb(0 0 0 / .6);
    scrollbar-width: thin; scrollbar-color: var(--ssg-accent) transparent; }
  #${CELL} option { font-size: inherit; padding-block: .15em; line-height: 1.25; font-weight: 400; }
  #${CELL} optgroup { color: var(--ssg-fg); }
  #${CELL} optgroup + optgroup { border-block-start: 1px solid var(--ssg-accent); margin-block-start: .3em; padding-block-start: .3em; }
  #${CELL} selectedcontent .ssg-dur { display: none; }
  #${CELL} option:hover { background: none; }
  #${CELL} option:focus { background: var(--ssg-accent); color: var(--ssg-bg); outline: none; }
  #${CELL} option::checkmark { color: var(--ssg-accent); }
  #${CELL} option:focus::checkmark { color: inherit; }
  #${CELL} hr { inline-size: auto; margin: .3em .5em; border: 0; border-block-start: 1px solid var(--ssg-accent); opacity: .45; }
}`;

  const GROUP = { secondary: "Pistol Sounds", melee: "Melee Sounds", empty: "Empty Click Sounds" };
  // A built-in clip's length shows beside its name in the open list, and not in the closed box.
  function soundOption(x) {
    const o = new Option(x.name, x.id);
    if (x.duration) o.append(el("span", "ssg-dur", ` (${x.duration.toFixed(2)}s)`));
    return o;
  }
  const TIPS = {
    primary: "The sound your gun makes when you shoot. Under Advanced you can set one gun on its own.",
    secondary: "The sound your pistol makes when you shoot.",
    melee: "The sound of your melee swing.",
    reload: "The sound of reloading your gun. It plays in time with the game's own reload. Under Advanced you can set one gun on its own.",
    sreload: "The sound of reloading your pistol.",
    empty: "The click when you pull the trigger with no ammo left.",
  };
  // A list's choices by its key ("primary", or "primary:eggk47" for one gun), as [group label, options].
  function groups(key) {
    const [slot, gun] = key.split(":"), out = [];
    const first = gun ? [new Option("Same as all guns", SAME)] : [];
    first.push(new Option("Game sound", DEFAULT));
    if (!gun && (slot === "primary" || isReload(slot))) first.push(new Option(slot === "sreload" ? "Match my pistol" : "Match each gun", PER_GUN));
    if (!isReload(slot)) first.push(...MEMES.map(soundOption));
    out.push(["Default Sounds", first]);
    const kitOption = id => new Option(kitById(id).name, id);
    if (slot === "primary") for (const g of gun ? [GUN[gun]] : GUNS) out.push([g.name + " Sounds", g.shots.map(id => soundOption(AUDIO.get(id)))]);
    else if (slot === "reload") for (const g of gun ? [GUN[gun]] : GUNS) out.push([g.name + " Reloads", g.kits.map(kitOption)]);
    else if (slot === "sreload") out.push(["Pistol Reloads", PISTOL_KITS.map(kitOption)]);
    else out.push([GROUP[slot], SOUNDS.filter(x => x.kind === slot).map(soundOption)]);
    out.push(["Your Own Sound", [new Option("Your file", CUSTOM), new Option("Choose a file…", PICK)]]);
    return out;
  }
  // The list shows the gun picked at the top, for Primary and Primary reload.
  const keyFor = id => ui && ui.gun && PER_GUN_SLOTS.includes(id) ? gunKey(id, ui.gun) : id;
  const isOff = (p, key) => p[key] === DEFAULT || (p[key] === SAME && p[key.split(":")[0]] === DEFAULT);
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function injectUI() {
    const grid = document.querySelector("#settings_misc > .display-grid");
    if (!grid) return;
    if (ui) removeUI();
    const cell = el("div", "f_col");
    cell.id = CELL;
    const row = (...kids) => { const r = el("div", "f_row"); r.append(...kids); return r; };
    const rows = [], slots = {};
    for (const s of SLOTS) {
      const select = el("select", "ss_select ss_marginright_sm");
      // Chrome and Edge draw the closed box from this button, so a long name ends in "…" before the arrow.
      const face = el("button");
      face.type = "button";
      face.append(el("selectedcontent"));
      select.append(face);
      select.title = TIPS[s.id] + " Your own file: MP3, OGG or WAV, up to 4 MB.";
      const test = el("button", "ss_button btn_blue bevel_blue btn_sm", "Test");
      test.type = "button";
      // The label line also names your file, or says what went wrong with it, so picking one adds no height.
      const note = el("span", "ssg-note text_blue4");
      const input = el("input");
      Object.assign(input, { type: "file", accept: "audio/*,.mp3,.ogg,.wav,.m4a,.webm", hidden: true });
      const head = el("div", "ssg-head"), name = el("span", "ssg-name text_blue4", s.name);
      head.append(name, note);
      const col = el("div");
      slots[s.id] = { select, face, test, note, input, name, col, more: !!s.more, key: null };
      col.append(head, row(select, test), input);
      rows.push(col);
      select.addEventListener("pointerdown", paint);
      select.addEventListener("keydown", paint);
      select.addEventListener("mousemove", e => {
        if (e.target instanceof HTMLOptionElement && e.target !== document.activeElement) e.target.focus({ preventScroll: true });
      });
      select.addEventListener("change", () => {
        const key = slots[s.id].key;
        if (select.value === PICK) {
          select.value = pending[key];
          return input.click();
        }
        pending[key] = select.value;
        refresh();
        if (select.value === CUSTOM && !nameOf(key)) input.click();
        else if (!isOff(pending, key)) preview(s.id);
      });
      test.addEventListener("click", () => preview(s.id));
      input.addEventListener("change", () => { const f = input.files[0]; input.value = ""; if (f) addFile(s.id, f); });
    }
    const range = el("input", "ss_slider");
    Object.assign(range, { type: "range", min: "0", max: "1", step: "0.01" });
    const value = el("label", "ss_slider label text_blue4");
    const everyone = el("input");
    everyone.type = "checkbox";
    const everyoneLabel = el("label", "ss_checkbox label", "Everyone's weapons ");
    everyoneLabel.title = "Also replace other players' weapon sounds, not just your own.";
    everyoneLabel.append(everyone, el("span", "checkmark"));
    // Your picks as a file, to keep or to move to another browser. Your own MP3s stay in this browser.
    const exportBtn = el("button", "ss_button btn_blue bevel_blue btn_sm", "Export");
    const importBtn = el("button", "ss_button btn_blue bevel_blue btn_sm", "Import");
    exportBtn.type = importBtn.type = "button";
    exportBtn.title = "Save these settings to a file. Your own MP3s aren't in it.";
    importBtn.title = "Load settings from a file. They're kept when you press Confirm.";
    const importInput = el("input");
    Object.assign(importInput, { type: "file", accept: ".json,application/json", hidden: true });
    exportBtn.addEventListener("click", () => {
      const url = URL.createObjectURL(new Blob([exportText(pending || saved)], { type: "application/json" }));
      const a = el("a");
      Object.assign(a, { href: url, download: "gun-sounds-settings.json" });
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    importBtn.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", async () => {
      const f = importInput.files[0];
      importInput.value = "";
      if (!f) return;
      let s = null;
      try { s = parseSettings(await f.text()); } catch { /* not ours */ }
      if (s && pending) { pending = s; refresh(); }
      importBtn.textContent = s ? "Imported" : "Not a settings file";
      setTimeout(() => { importBtn.textContent = "Import"; }, 2500);
    });
    const slotGrid = el("div", "ssg-slots"), bottom = row(el("span", "ssg-name text_blue4", "Volume"), range, value);
    bottom.classList.add("ssg-bottom");
    slotGrid.append(...rows);
    // Quick start: one click fills every list, and the one that matches the lists is lit.
    const presets = el("div", "ssg-presets"), presetBtns = {};
    presets.append(el("span", "ssg-name text_blue4", "Quick start"));
    for (const pr of PRESETS) {
      const b = el("button", "ss_button btn_blue bevel_blue btn_sm", pr.name);
      b.type = "button";
      b.title = pr.tip;
      b.addEventListener("click", () => applyPreset(pr));
      presetBtns[pr.id] = b;
      presets.append(b);
    }
    // Which gun Gun shots and Gun reload show: all guns, or one gun's own picks.
    const gunSelect = el("select", "ss_select");
    const gunFace = el("button");
    gunFace.type = "button";
    gunFace.append(el("selectedcontent"));
    gunSelect.append(gunFace, new Option("All guns", ""), ...GUNS.map(g => new Option(g.name, g.id)));
    gunSelect.title = "Give one gun its own shot and reload. It starts on \"Same as all guns\".";
    gunSelect.addEventListener("pointerdown", paint);
    gunSelect.addEventListener("change", () => { me.gun = gunSelect.value; refresh(); });
    const gunRow = row(el("span", "ssg-name text_blue4", "Set one gun"), gunSelect);
    gunRow.classList.add("ssg-gun");
    const extra = row(everyoneLabel, exportBtn, importBtn, importInput);
    extra.classList.add("ssg-extra");
    // Advanced, on the heading's line: the plain view, or every list and option.
    const toggle = el("button", "ss_button btn_blue bevel_blue btn_sm");
    toggle.type = "button";
    toggle.addEventListener("click", () => setMore(!me.more));
    // The heading is a toggle like a Notion one: a triangle that points right when shut and down when open.
    const head = el("button", "ssg-head-toggle");
    head.type = "button";
    head.id = CELL + "-toggle";
    head.setAttribute("aria-controls", CELL + "-body");
    head.append(el("span", "ssg-tri"), el("span", null, "Gun Sounds"));
    head.addEventListener("click", () => setOpen(!me.open));
    const top = el("div", "ssg-top"), title = el("h3", "margin-bottom-none h-short");
    title.append(head);
    top.append(title, toggle);
    const intro = el("div", "ssg-intro text_blue4", "Pick a sound for each action. It plays when you pick it. Press Confirm to keep it.");
    const body = el("div", "ssg-body");
    body.id = CELL + "-body";
    body.append(intro, presets, gunRow, slotGrid, bottom, extra);
    cell.append(top, body);
    grid.append(cell);

    let style = document.getElementById(CELL + "-style");
    if (!style) {
      style = el("style", null, CSS);
      style.id = CELL + "-style";
      (document.head || document.documentElement).append(style);
    }
    everyone.addEventListener("change", () => { pending.everyone = everyone.checked; });
    range.addEventListener("input", () => {
      pending.volume = Math.min(1, Math.max(0, Number(range.value) || 0));
      value.textContent = String(Math.round(pending.volume * 100));
    });
    range.addEventListener("change", () => {
      const s = SLOTS.find(x => !isOff(pending, slots[x.id].key));
      if (s) preview(s.id);
    });

    // The popup opening or closing puts the saved settings back in the controls, so a change only stays if Confirm
    // saved it (Cancel, the X and Esc all leave things as they were).
    const me = { cell, slots, range, value, everyone, gunSelect, gunRow, extra, toggle, head, body, presetBtns, gun: "", open: readOpen(), more: readMore(), io: null, shown: null };
    me.io = new IntersectionObserver(entries => {
      const shown = entries[entries.length - 1].isIntersecting;
      if (ui !== me || shown === me.shown) return;
      me.shown = shown;
      revert({ ...saved });
      if (shown) paint();
    });
    me.io.observe(cell.closest("#settings") || grid);
    ui = me;
    setOpen(me.open, false);
    setMore(me.more, false);
    revert({ ...saved });
    paint();
  }
  // The Gun Sounds heading: shows or hides everything under it (and Advanced, which only matters while it's open).
  function setOpen(open, remember = true) {
    if (!ui) return;
    ui.open = open;
    ui.body.hidden = ui.toggle.hidden = !open;
    ui.head.setAttribute("aria-expanded", String(open));
    if (remember) writeUi({ open });
    if (open) paint();   // lists that were hidden get the theme's colours
  }
  // Advanced: the pistol reload and empty click lists, one gun at a time, Everyone's weapons, Export and Import.
  function setMore(more, remember = true) {
    if (!ui) return;
    ui.more = more;
    if (!more) ui.gun = "";   // back to the plain lists, which are for all guns
    ui.gunRow.hidden = ui.extra.hidden = !more;
    for (const u of Object.values(ui.slots)) u.col.hidden = u.more && !more;
    ui.toggle.textContent = more ? "Simple" : "Advanced";
    ui.toggle.setAttribute("aria-expanded", String(more));
    if (remember) writeUi({ more });
    refresh();
    if (more) paint();   // lists that were hidden get the theme's colours
  }
  // A quick start sets every list at once, then plays the gun shot (if there is one) so it's heard straight away.
  function applyPreset(pr) {
    if (!ui || !pending) return;
    pending = { ...pending, ...presetPicks(pr) };
    refresh();
    if (!isOff(pending, ui.slots.primary.key)) preview("primary");
  }
  function removeUI() {
    if (!ui) return;
    ui.io.disconnect();
    ui.cell.remove();
    document.getElementById(CELL + "-style")?.remove();
    ui = null;
    pendingFiles = {};
    fileGen++;
  }
  // The list's colours come from the theme, as it colours the game's own dropdowns.
  function paint() {
    if (!ui) return;
    const vars = ["--ssg-bg", "--ssg-fg", "--ssg-accent"];
    const clear = c => /^transparent$|^rgba\(.*,\s*0(\.0+)?\)$|\/\s*0(\.0+)?\)$/.test(c);
    const game = [...ui.cell.parentNode.querySelectorAll("select.ss_select")].find(e => !ui.cell.contains(e));
    for (const select of [ui.gunSelect, ...Object.values(ui.slots).map(u => u.select)]) {
      vars.forEach(v => select.style.removeProperty(v));
      const o = getComputedStyle([...select.options].find(e => !e.selected) || select);
      const s = getComputedStyle(select);
      const values = [[o.backgroundColor, s.backgroundColor].find(c => !clear(c)) || "#fff", o.color, s.borderTopColor];
      vars.forEach((v, i) => select.style.setProperty(v, values[i]));
      if (game) select.style.fontFamily = getComputedStyle(game).fontFamily;
    }
  }
  function revert(to) {
    pending = to;
    pendingFiles = {};
    fileGen++;
    refresh();
  }
  function refresh() {
    if (!ui) return;
    const p = pending || saved;
    ui.gunSelect.value = ui.gun;
    for (const s of SLOTS) {
      const u = ui.slots[s.id], key = keyFor(s.id);
      if (u.key !== key) {   // the gun changed: that gun's own choices
        u.key = key;
        while (u.select.lastChild !== u.face) u.select.lastChild.remove();
        for (const [label, options] of groups(key)) {
          const g = el("optgroup");
          g.label = label;
          g.append(...options);
          u.select.append(g);
        }
        const gun = key.split(":")[1];
        u.name.textContent = gun ? `${s.name} (${GUN[gun].name})` : s.name;
      }
      u.select.value = p[key];
      u.test.disabled = isOff(p, key);
      setNote(s.id);
    }
    const lit = presetOf(p);
    for (const pr of PRESETS) ui.presetBtns[pr.id].setAttribute("aria-pressed", String(lit === pr));
    ui.everyone.checked = p.everyone;
    ui.range.value = String(p.volume);
    ui.value.textContent = String(Math.round(p.volume * 100));
    ui.range.disabled = KEYS.every(k => isOff(p, k));
  }
  // With no text, the note names your file while "My MP3" is picked. A problem shows in red in a few words, with
  // more in its tooltip.
  function setNote(slot, text, error, title = text) {
    if (!ui) return;
    const u = ui.slots[slot], key = u.key, mine = (pending || saved)[key] === CUSTOM;
    u.note.textContent = text || (mine ? nameOf(key) || "No file yet" : "");
    u.note.title = text ? title : mine ? nameOf(key) || "" : "";
    u.note.classList.toggle("ssg-error", !!error);
  }
  // The slot's pick, as it'd play in a game. A reload plays on the cue times of a real reload (an empty one, so the
  // bolt or slide is in it): your last primary's for Primary reload, the pistol's for Secondary reload.
  function preview(slot) {
    const p = pending || saved, shown = ui ? ui.slots[slot].key : slot;
    // Played for the gun shown, or else the one you last used.
    const gun = slot === "sreload" ? "cluck9mm" : shown.split(":")[1] || previewWeapon;
    const { sound, key: list } = resolve(shown, gun, p);
    if (sound === DEFAULT) return;
    const failed = err => {
      warn(err);
      if (sound === CUSTOM) setNote(slot, "Can't play your file", true, "Can't play your saved file. Choose it again.");
      else setNote(slot, "Couldn't download", true, `${err.message}. Check your connection, then press Test to retry.`);
      setTimeout(() => setNote(slot), 4000);
    };
    const game = AUDIO.get(sound)?.game;
    if (game) {
      setNote(slot);
      try { window.BAWK.play(game); } catch (err) { warn(err); }
      return;
    }
    const reload = isReload(slot), times = TIMING[gun] || TIMING.eggk47;
    const kit = reload && kitById(sound);
    if (kit) {
      return kitClips(kit).then(() => {
        setNote(slot);
        const cues = ROLES.filter(r => r in times).map(r => [times[r], kit[r] || (r === "pull" ? kit.action : null)])
          .filter(([, piece]) => piece);
        const first = Math.min(...cues.map(([at]) => at));
        for (const [at, piece] of cues) play(ready.get(stageId(piece)), p.volume, null, (at - first) / 1000);
      }, failed);
    }
    const mine = sound === CUSTOM && pendingFiles[list];
    (mine ? Promise.resolve(pendingFiles[list].buf) : clip(sound, list)).then(buf => {
      if (!buf) return setNote(slot, "Choose a file first", true, "Choose a sound file first.");
      setNote(slot);
      if (reload) {
        const src = play(buf, p.volume);
        if (src) fadeAt(src, (times.action != null ? times.action + 450 : times.finish + 900) / 1000);
      } else play(buf, p.volume);   // one shot
    }, failed);
  }
  // A picked file waits for Confirm like the rest of the settings: until then it's only previewed. It's kept for the
  // list shown when it was picked (one gun's, or all guns').
  async function addFile(slot, file) {
    if (file.size <= 0) return;
    const gen = ++fileGen, key = ui ? ui.slots[slot].key : slot;
    if (file.size > MAX_BYTES) return setNote(slot, "Too big: " + file.name, true, `${file.name} is too big. Files can be up to 4 MB.`);
    setNote(slot, "Loading…");
    try {
      const data = await file.arrayBuffer(), buf = await decode(data, file.name);
      if (gen !== fileGen || !pending) return;   // closed, or another file picked, in the meantime
      pendingFiles[key] = { file: { name: file.name, data }, name: file.name, buf };
      pending[key] = CUSTOM;
      refresh();
      preview(slot);
    } catch (err) {
      if (gen !== fileGen) return;
      if (err && err.note) return setNote(slot, err.note, true, err.message);
      warn(err);
      setNote(slot, "Can't read that file", true, "Can't read that file. Try choosing it again.");
    }
  }
  function keepFiles() {
    for (const [key, f] of Object.entries(pendingFiles)) {
      customNames[key] = f.name;
      cache.set(CUSTOM + ":" + key, Promise.resolve(f.buf));
      ready.set(CUSTOM + ":" + key, f.buf);
      writeFile(key, f.file).catch(err => warn("Couldn't keep your file for next time:", err));
    }
    pendingFiles = {};
  }

  // The game's Confirm, Reset to Defaults and Cancel buttons, under the tabs.
  function onClick(e) {
    if (!ui || !pending) return;
    const b = e.target instanceof Element && e.target.closest("#settings .grid-column-3-eq > button");
    if (!b) return;
    if (b.classList.contains("btn_green")) { keepFiles(); save(pending); }
    else if (b.classList.contains("btn_yolk")) revert({ ...DEFAULTS });
    else if (b.classList.contains("btn_red")) revert({ ...saved });
  }
  function openSettings() {
    const app = window.vueApp;
    if (!running || !app || typeof app.showSettingsPopup !== "function") return false;
    try {
      app.showSettingsPopup();
      const tab = document.getElementById("misc_button");
      if (tab) tab.click();
      else if (typeof app.onSettingsPopupSwitchTabMisc === "function") app.onSettingsPopupSwitchTabMisc();
    } catch (err) { warn(err); return false; }
    tick();
    return true;
  }

  /* ---- On and off ---- */
  let running = false, timer = 0;
  function tick() {
    if (!running) return;
    if (!hooked || hooked.B !== window.BAWK || hooked.B.play !== hooked.wrap) hook();
    if (!ui || !ui.cell.isConnected) injectUI();
  }
  function start() {
    if (running) return;
    running = true;
    document.addEventListener("click", onClick, true);
    tick();
    timer = setInterval(tick, 1000);
    getReady();
    for (const k of KEYS) fileFor(k).then(f => { if (f) { customNames[k] = f.name; refresh(); } }, () => { /* no storage: no files */ });
  }
  function stop() {
    if (!running) return;
    running = false;
    clearInterval(timer);
    document.removeEventListener("click", onClick, true);
    unhook();
    removeUI();
    quiet();
    reloads = new WeakMap();
    playing.clear();
    primaryWeapons = new WeakMap();
    lastShots = new WeakMap();
    previewWeapon = "eggk47";
  }

  window.ssGunSounds = {
    version: VERSION,
    sounds: [...SOUNDS.map(s => s.id), ...KITS.map(k => k.id)],
    settings: () => ({ ...saved }),
    set(s) { save({ ...saved, ...s }); revert({ ...saved }); return { ...saved }; },
    export: () => exportText(saved),
    import(text) { save(parseSettings(text)); revert({ ...saved }); return { ...saved }; },
    slotOf,
    status: () => ({ running, hooked: !!hooked, settingsShown: !!ui && ui.cell.isConnected, loaded: [...ready.keys()] }),
  };

  start();
  // The Mod Menu (if it's installed) lists it with an on/off switch and a shortcut to these settings.
  (window.ssModMenuQueue = window.ssModMenuQueue || []).push({
    id: "gun-sounds", name: "Gun Sounds", version: VERSION, group: "mod",
    description: "Pick sounds for primary and secondary shots, melee swings, reloads and the empty click.",
    enable: start, disable: stop, openSettings,
  });

  // install-counter:begin
  // Install counter: one anonymous hit per browser, sent once and never again (key "ssGunSounds-install-counted").
  // Nothing is sent but the hit itself: no settings, names or IDs. Total: abacus.jasoncameron.dev/get/virojet-gun-sounds/installs
  (() => {
    const KEY = "ssGunSounds-install-counted";
    try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }
    setTimeout(() => {
      fetch("https://abacus.jasoncameron.dev/hit/virojet-gun-sounds/installs", { credentials: "omit", referrerPolicy: "no-referrer" })
        .then(r => { if (r.ok) localStorage.setItem(KEY, "1"); })
        .catch(() => { });
    }, 8000);
  })();
  // install-counter:end
})();
