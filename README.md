<div align="center">

# Shell Shockers — Gun Sounds

**Choose weapon, reload, empty-click, meme or custom sounds in [Shell Shockers](https://shellshock.io).**

<br>

[![Install Gun Sounds](https://img.shields.io/badge/Install_Gun_Sounds-one_click-2ea44f?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/Virojet/Shell-Shockers-Gun-Sounds/main/Shell-Shockers-Gun-Sounds.user.js)

[![Version](https://img.shields.io/badge/version-1.2.0-0E7697?style=flat-square)](./Shell-Shockers-Gun-Sounds.user.js)
[![Code license: MIT](https://img.shields.io/badge/code_license-MIT-lightgrey?style=flat-square)](./LICENSE)

</div>

---

## Install

1. **Get Tampermonkey** for your browser: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) · [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) · [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/) · [Opera GX & others](https://www.tampermonkey.net/)
2. **[Click here to install Gun Sounds](https://raw.githubusercontent.com/Virojet/Shell-Shockers-Gun-Sounds/main/Shell-Shockers-Gun-Sounds.user.js)**, then press **Install**
3. **Reload [shellshock.io](https://shellshock.io)**

> [!TIP]
> Chrome, Edge, Brave and Opera need **Allow User Scripts** turned on: Extensions → Tampermonkey → Details.

## What it does

Pick a sound for each of six lists. Shot choices play for **every weapon in that slot**, whatever the gun or skin.

| List | Plays for |
|---|---|
| **Primary** | Every primary gun's shots (and any gun added later) |
| **Secondary** | Cluck 9mm shots |
| **Melee** | Every melee weapon |
| **Primary reload** | Every primary gun's reload |
| **Secondary reload** | The Cluck 9mm's reload |
| **No ammo** | The click when you pull the trigger with no ammo left |

### Built-in sounds

| List | Choices |
|---|---|
| **Primary — 10** | Thunder AWP, Rush P90, Rapid P90, Blast Rocket, Quake Rocket, Dragonfire Operator, Fallen Operator, Ion Pulse Operator, Orbital Operator, Soulshot Operator |
| **Secondary — 10** | Hand Cannon (Desert Eagle), Quickdraw (Glock), USP-S, Five-SeveN, R8 Revolver, P250, Tec-9, CZ75-Auto, Dual Berettas, P2000 |
| **Melee — 10** | Swift Slash, Heavy Slash, Blade Flick, Machete Sweep, Saber Arc, Claymore Swing, Pickaxe Swing, Shovel Swing, Wrench Swing, Boxing Glove |
| **Reload kits — 15** | AK-47, AUG, AWP bolt, G3SG1, P90, Double barrel, Rocket, Glock, USP-S, Five-SeveN, R8 cylinder, P250, Tec-9, P2000, Dual Berettas, plus **Matched to your gun** |
| **One-clip reloads — 5** | Steel Reset, Tactical Swap, Rifle Reset, Pump Action, Sidearm Snap |
| **No ammo — 10** | Pistol Click, Rifle Click, Shotgun Click, Trigger Tap, Low Ammo Tick, Railgun Dry Fire, Marksman Dry Fire, Minigun Whir, Gatling Click, Hammer Click |

Both reload lists have the kits and the one-clip reloads. Each built-in clip shows its length in the open list, for example **USP-S (1.53s)**. The original **AWP**, **Punch**, **Reverb Fart**, **Tuturu** and **Vine Boom** are in every list. **Game sound** keeps the game's own audio, and **My MP3** plays your own file.

#### How reloads keep time
A gun's reload plays a few sounds in the game: the magazine coming out, the second touch when the new one goes in, and on an empty reload the bolt or slide. A **reload kit** has one sound for each of those, and plays it the moment the game plays its own, so it lines up with every gun's reload speed:

| Gun | Mag out | Mag in | Bolt / slide (empty mag) |
|---|---|---|---|
| EggK-47 | 0 s | 1.55 s | 2.08 s |
| Scrambler | 0 s (open) | 1.34 s (load) | 1.92 s (close) |
| Free Ranger | 0.75 s, after the action is pulled at 0 s | 2.17 s | 2.67 s |
| RPEGG | — | 3.3 s after the shot | — |
| Whipper | 0 s | 2.00 s | 2.59 s |
| Crackshot | 0 s (bolt open) | 1.35 s | 1.75 s (bolt close) |
| Tri-Hard | 0 s | 1.50 s | 2.08 s |
| Cluck 9mm | 0 s | 1.58 s | 2.33 s |

**Matched to your gun** picks the kit that suits the gun reloading (EggK-47 → AK-47, Scrambler → Double barrel, Free Ranger → G3SG1, RPEGG → Rocket, Whipper → P90, Crackshot → AWP bolt, Tri-Hard → AUG). The pistol's follows your **Secondary** pick, so P250 shots get the P250 reload; otherwise it's the Glock. A one-clip reload or your own MP3 starts on the first cue and fades out just after the last one. Firing or a melee swing cuts a reload sound short, as it does the reload.

- **My MP3:** choose **Choose MP3 file…** in a list and pick a file (MP3, OGG or WAV, up to 4 MB). Its name shows next to the list, and it's kept in your browser, one per list.
- **Your weapons only** by default. Tick **Everyone's weapons** to change other players' too.
- Every list starts on **Game sound**. If you picked a reload in 1.1, both reload lists start with that pick.
- **Volume** slider, plus the game's **Sound Effects** volume.
- Works alongside [Valorant Kill Sounds](https://github.com/Virojet/Shell-Shockers-Valorant-Kill-Sounds) and [Better HUD](https://github.com/Virojet/Shell-Shockers-Better-Hud-Mod).
- Updates itself through Tampermonkey. Works on shellshock.io and its mirrors.

Built-in audio isn't embedded in the script. The first time you pick a sound it downloads from this project's [sounds](./sounds) folder and is kept in your browser. Clip credits and original supplied filenames are listed in [sounds/SOURCES.md](./sounds/SOURCES.md).

## Settings

**Settings** ▸ the **speaker tab** ▸ **Gun Sounds**, under Language and Kill Sounds: six lists in two rows of three. **Test** plays a list's sound; a reload plays at a real reload's timing (your last primary's, or the pistol's). Changes are kept when you press **Confirm**. If the settings are taller than your screen, scroll them.

## How updates work

Tampermonkey checks this repository's raw userscript on `main`, compares its `@version`, and downloads a newer version from the same URL when automatic updates are enabled. The next page reload runs the new version. You can also use Tampermonkey's **Check for updates** command. The script itself needs no GitHub account or token.

The audio URLs use a fixed Git commit, so an existing script version always gets the same files. GitHub is tried first, with jsDelivr serving the same commit as a backup. New audio becomes available when a newer script points to a commit containing it. Selected clips are cached locally; your settings and custom MP3s stay in the browser through script updates.

## Changelog

### 1.2.0 — Unreleased
- **Secondary reload** and **No ammo** lists. The pistol's reload and the empty click now have their own picks, next to Primary reload.
- Every list has at least ten sounds of its own: five more pistols, five more melee swings, ten no-ammo clicks, and 15 reload kits.
- **Reload kits** play a sound on each of the game's reload cues (mag out, mag in, bolt or slide), so they keep time with every gun. **Matched to your gun** picks the kit for the gun reloading. One-clip reloads fade out as the reload ends.
- The settings are smaller: six lists in two rows of three.
- Four CC0 one-clip reloads: **Tactical Swap**, **Rifle Reset**, **Pump Action** and **Sidearm Snap**. Credits are in [sounds/SOURCES.md](./sounds/SOURCES.md).
- A backup audio host when GitHub downloads fail or time out. Damaged cached audio is downloaded again, and download errors say what failed.

### 1.1.3 — 2026-10-18
- Show the measured MP3 duration beside every built-in sound in the dropdowns.

### 1.1.2 — 2026-10-18
- Added visible **Default Sounds**, slot-specific **Sounds**, and **Custom Sounds** headings inside each dropdown.
- Preserved saved selections and theme colors with grouped options.

### 1.1.1 — 2026-10-18
- Added **USP-S**, a single silenced shot, to **Secondary**.

### 1.1.0 — 2026-10-17
- Added 14 weapon clips, organized by selection:
  - **Primary:** Thunder AWP, Rush P90, Rapid P90, Blast Rocket, Quake Rocket, Dragonfire Operator, Fallen Operator, Ion Pulse Operator, Orbital Operator and Soulshot Operator.
  - **Secondary:** Hand Cannon and Quickdraw.
  - **Melee:** Swift Slash and Heavy Slash.
- Added a separate **Reload** selection with **Steel Reset**, the original meme choices, and custom MP3 support.
- A replacement reload plays once per sequence. The game's later magazine, loading and bolt steps do not replay the clip.
- New weapon clips appear only in their matching category. Existing saved choices remain valid, and Reload defaults to **Game sound**.
- The four selections use a compact two-by-two layout.
- Selected audio is downloaded from a fixed GitHub commit and cached in the browser. Existing settings and custom audio remain saved when updating.

<details>
<summary>Older versions</summary>

### 1.0.3
- **Fixed:** the sounds now play when you shoot in a real match. Earlier versions missed your own shots, because the game plays them from your egg's position like everyone else's. Other players' weapons still keep their sounds unless **Everyone's weapons** is ticked.

### 1.0.2
- The settings popup scrolls when it's taller than your screen, so Confirm and the close button are always reachable.
- The lists show the full sound names, and the labels match the game's.
- Your own file is picked from the list (**Choose MP3 file…**), and its name shows next to the slot, so the settings don't grow.

### 1.0.1
The Gun Sounds settings are now one short strip (Primary, Secondary and Melee side by side).

### 1.0.0
First release.

</details>
