<div align="center">

# Shell Shockers — Gun Sounds

**Choose weapon, reload, empty-click, meme or custom sounds in [Shell Shockers](https://shellshock.io).**

<br>

[![Install Gun Sounds](https://img.shields.io/badge/Install_Gun_Sounds-one_click-2ea44f?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/Virojet/Shell-Shockers-Gun-Sounds/main/Shell-Shockers-Gun-Sounds.user.js)

[![Version](https://img.shields.io/badge/version-1.3.0-0E7697?style=flat-square)](./Shell-Shockers-Gun-Sounds.user.js)
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

Pick a sound for each of six lists. Shot choices play for **every weapon in that slot**, whatever the skin, and each primary gun can have **its own shot and reload** too.

| List | Plays for |
|---|---|
| **Primary** | Every primary gun's shots (and any gun added later), or one gun's |
| **Secondary** | Cluck 9mm shots |
| **Melee** | Every melee weapon |
| **Primary reload** | Every primary gun's reload, or one gun's |
| **Secondary reload** | The Cluck 9mm's reload |
| **No ammo** | The click when you pull the trigger with no ammo left |

### Built-in sounds

| List | Choices |
|---|---|
| **Secondary — 10** | Hand Cannon (Desert Eagle), Quickdraw (Glock), USP-S, Five-SeveN, R8 Revolver, P250, Tec-9, CZ75-Auto, Dual Berettas, P2000 |
| **Melee — 10** | Swift Slash, Heavy Slash, Blade Flick, Machete Sweep, Saber Arc, Claymore Swing, Pickaxe Swing, Shovel Swing, Wrench Swing, Boxing Glove |
| **Secondary reload — 8** | Glock, USP-S, Five-SeveN, R8 cylinder, P250, Tec-9, P2000, Dual Berettas, plus **Matched to your gun** |
| **No ammo — 10** | Pistol Click, Rifle Click, Shotgun Click, Trigger Tap, Low Ammo Tick, Railgun Dry Fire, Marksman Dry Fire, Minigun Whir, Gatling Click, Hammer Click |

Each built-in clip shows its length in the open list, for example **USP-S (1.53s)**. The original **AWP**, **Punch**, **Reverb Fart**, **Tuturu** and **Vine Boom** are in every shot list. **Game sound** keeps the game's own audio, and **My MP3** plays your own file.

#### Each primary gun
**Primary** and **Primary reload** list their sounds by gun, and the **Primary gun** list at the top of Gun Sounds switches both to one gun's own picks. A gun starts on **Same as all guns**. **Matched to your gun** plays the first sound of the gun firing or reloading.

| Gun | Shots | Reload kits |
|---|---|---|
| EggK-47 | AK-47, M4A4, M4A1-S, Galil AR | AK-47, M4A4, Galil AR |
| Scrambler | Nova, XM1014, Sawed-Off, Force-A-Nature | Double barrel, MAG-7, Pump shotgun |
| Free Ranger | G3SG1, SCAR-20, Classic | G3SG1, SCAR-20, SG 553 |
| RPEGG | Blast Rocket, Quake Rocket, Direct Hit, Black Box | Rocket, Quake RPG, Cow Mangler, Beggar's Bazooka |
| Whipper | Rush P90, Rapid P90, MP7, MP9, UMP-45 | P90, MP7, MP9, UMP-45 |
| Crackshot | AWP, Thunder AWP, SSG 08, Scout | AWP bolt, SSG 08 bolt, Scout bolt |
| Tri-Hard | AUG, FAMAS, SG 553 | AUG, FAMAS, SG 553 |

Each shot starts the moment the gun fires. When the same gun fires again, the last shot's tail fades quickly, so fast guns like the EggK-47 and Whipper are heard shot by shot. The Tri-Hard plays one sound per three-round burst, so its shots are bursts, 100 ms apart like the gun's. Each gun's kits have a sound for every one of that gun's reload cues: the Free Ranger's kits pull a bolt before the magazine, the Scrambler's open, load and close, the Crackshot's work a bolt, and the RPEGG's load a rocket.

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

For the pistol, **Matched to your gun** follows your **Secondary** pick, so P250 shots get the P250 reload; otherwise it's the Glock. Your own MP3 starts on the first cue and fades out just after the last one. Firing or a melee swing cuts a reload sound short, as it does the reload.

- **My MP3:** choose **Choose MP3 file…** in a list and pick a file (MP3, OGG or WAV, up to 4 MB). Its name shows next to the list, and it's kept in your browser, one per list (and one per gun).
- **Your weapons only** by default. Tick **Everyone's weapons** to change other players' too.
- Every list starts on **Game sound**. A reload pick that's gone in 1.3 (a one-clip reload, or a rifle kit on the pistol) becomes **Matched to your gun**.
- **Volume** slider, plus the game's **Sound Effects** volume.
- Works alongside [Valorant Kill Sounds](https://github.com/Virojet/Shell-Shockers-Valorant-Kill-Sounds) and [Better HUD](https://github.com/Virojet/Shell-Shockers-Better-Hud-Mod).
- Updates itself through Tampermonkey. Works on shellshock.io and its mirrors.

Built-in audio isn't embedded in the script. The first time you pick a sound it downloads from this project's [sounds](./sounds) folder and is kept in your browser. Clip credits and original supplied filenames are listed in [sounds/SOURCES.md](./sounds/SOURCES.md).

## Settings

**Settings** ▸ the **speaker tab** ▸ **Gun Sounds**, under Language and Kill Sounds: six lists in two rows of three, and **Primary gun** at the top. **Test** plays a list's sound: a shot a few times at the gun's fire rate, a reload at a real reload's timing (the gun shown, else your last primary, or the pistol). Changes are kept when you press **Confirm**. If the settings are taller than your screen, scroll them.

## How updates work

Tampermonkey checks this repository's raw userscript on `main`, compares its `@version`, and downloads a newer version from the same URL when automatic updates are enabled. The next page reload runs the new version. You can also use Tampermonkey's **Check for updates** command. The script itself needs no GitHub account or token.

The audio URLs use a fixed Git commit, so an existing script version always gets the same files. GitHub is tried first, with jsDelivr serving the same commit as a backup. New audio becomes available when a newer script points to a commit containing it. Selected clips are cached locally; your settings and custom MP3s stay in the browser through script updates.

## Changelog

### 1.3.0 — Unreleased
- **A pick for each primary gun.** The **Primary gun** list switches Primary and Primary reload to one gun, which starts on **Same as all guns**.
- Primary sounds and reload kits are grouped by gun, at least three each, made to fit that gun: 27 shots and 24 kits. The Tri-Hard's shots are three-round bursts, as the game plays one sound per burst.
- A gun's last shot fades quickly when it fires again, so fast guns stay crisp.
- **Matched to your gun** in Primary plays the gun's first shot.
- Removed the five Operator shots and the one-clip reloads (Steel Reset, Tactical Swap, Rifle Reset, Pump Action, Sidearm Snap), which didn't line up with any gun's reload. The meme sounds are no longer in the reload lists, and Secondary reload lists the pistol kits.
- **Test** fires a shot a few times at the gun's own rate.

### 1.2.0 — 2026-10-18
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
