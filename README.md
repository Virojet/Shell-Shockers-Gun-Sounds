<div align="center">

# Shell Shockers — Gun Sounds

**Choose weapon, reload, meme or custom sounds in [Shell Shockers](https://shellshock.io).**

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

Pick a sound for each weapon slot. It plays for **every weapon in that slot**, whatever the gun or skin.

| Slot | Weapons |
|---|---|
| **Primary** | Every primary gun (and any added later) |
| **Secondary** | Cluck 9mm |
| **Melee** | Every melee weapon |
| **Reload** | Every primary and secondary reload; the clip plays once per reload sequence |

### Built-in sounds

| Selection | Added sounds |
|---|---|
| **Primary** | **Thunder AWP**, **Rush P90**, **Rapid P90**, **Blast Rocket**, **Quake Rocket**, **Dragonfire Operator**, **Fallen Operator**, **Ion Pulse Operator**, **Orbital Operator**, **Soulshot Operator** |
| **Secondary** | **Hand Cannon** (Desert Eagle), **Quickdraw** (Glock) |
| **Melee** | **Swift Slash**, **Heavy Slash** |
| **Reload** | **Steel Reset**, **Tactical Swap**, **Rifle Reset**, **Pump Action**, **Sidearm Snap** |

The original **AWP**, **Punch**, **Reverb Fart**, **Tuturu** and **Vine Boom** choices remain available in every list. Choose **Game sound** to keep that selection's original audio, or **My MP3** to use your own file.

- **My MP3:** choose **Choose MP3 file…** in a slot's list and pick a file (MP3, OGG or WAV, up to 4 MB). Its name shows next to the slot, and it's kept in your browser, one per slot.
- **Your shots only** by default. Tick **Everyone's weapons** to change other players' weapons too.
- **Reload** starts on **Game sound**, so updating keeps your existing audio until you choose a replacement. It replaces the reload's audio sequence once, rather than repeating the clip at each magazine or bolt step. Gameplay and reload timing stay the same.
- **Volume** slider, plus the game's **Sound Effects** volume.
- Works alongside [Valorant Kill Sounds](https://github.com/Virojet/Shell-Shockers-Valorant-Kill-Sounds) and [Better HUD](https://github.com/Virojet/Shell-Shockers-Better-Hud-Mod).
- Updates itself through Tampermonkey. Works on shellshock.io and its mirrors.

Built-in audio isn't embedded in the script. The first time you pick a sound it downloads from this project's [sounds](./sounds) folder and is kept in your browser. Clip credits and original supplied filenames are listed in [sounds/SOURCES.md](./sounds/SOURCES.md).

## Settings

**Settings** ▸ the **speaker tab** ▸ **Gun Sounds**, under Language and Kill Sounds. **Test** plays a slot's sound. Changes are kept when you press **Confirm**. If the settings are taller than your screen, scroll them.

## How updates work

Tampermonkey checks this repository's raw userscript on `main`, compares its `@version`, and downloads a newer version from the same URL when automatic updates are enabled. The next page reload runs the new version. You can also use Tampermonkey's **Check for updates** command. The script itself needs no GitHub account or token.

The audio URLs use a fixed Git commit, so an existing script version always gets the same files. GitHub is tried first, with jsDelivr serving the same commit as a backup. New audio becomes available when a newer script points to a commit containing it. Selected clips are cached locally; your settings and custom MP3s stay in the browser through script updates.

## Changelog

### 1.2.0 — Unreleased
- Added four CC0 reload choices: **Tactical Swap** (magazine reload), **Rifle Reset** (assault rifle), **Pump Action** (short shotgun pump) and **Sidearm Snap** (handgun magazine and slide). Source credits are in [sounds/SOURCES.md](./sounds/SOURCES.md).
- Added a backup audio host when GitHub downloads fail or time out, including Heavy Slash.
- Damaged cached audio is discarded and downloaded again. Only successfully decoded clips are cached.
- Download error tooltips include the failure details, and a successful Test clears the error.

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
