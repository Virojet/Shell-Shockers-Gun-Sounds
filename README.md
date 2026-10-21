<div align="center">

# Shell Shockers — Gun Sounds

**Choose weapon, reload, empty-click, meme or custom sounds in [Shell Shockers](https://shellshock.io).**

<br>

[![Install Gun Sounds](https://img.shields.io/badge/Install_Gun_Sounds-one_click-2ea44f?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/Virojet/Shell-Shockers-Gun-Sounds/main/Shell-Shockers-Gun-Sounds.user.js)

[![Version](https://img.shields.io/badge/version-1.6.2-0E7697?style=flat-square)](./Shell-Shockers-Gun-Sounds.user.js)
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

Click a **Quick start** button, or pick a sound for each list. Shot choices play for **every weapon in that slot**, whatever the skin, and each primary gun can have **its own shot and reload** too.

| List | Plays for |
|---|---|
| **Gun shots** | Every primary gun's shots (and any gun added later), or one gun's |
| **Pistol shots** | Cluck 9mm shots |
| **Melee** | Every melee weapon |
| **Gun reload** | Every primary gun's reload, or one gun's |
| **Pistol reload** (Advanced) | The Cluck 9mm's reload |
| **Empty click** (Advanced) | The click when you pull the trigger with no ammo left |

### Built-in sounds

| List | Choices |
|---|---|
| **Pistol shots — 10** | Hand Cannon (Desert Eagle), Quickdraw (Glock), USP-S, Five-SeveN, R8 Revolver, P250, Tec-9, CZ75-Auto, Dual Berettas, P2000 |
| **Melee — 10** | Swift Slash, Heavy Slash, Blade Flick, Machete Sweep, Saber Arc, Claymore Swing, Pickaxe Swing, Shovel Swing, Wrench Swing, Boxing Glove |
| **Pistol reload — 11** | Glock, USP-S, Five-SeveN, R8 cylinder, P250, Tec-9, P2000, Dual Berettas, Desert Eagle, Colt M1911, P228, plus **Match my pistol** |
| **Empty click — 10** | Pistol Click, Rifle Click, Shotgun Click, Trigger Tap, Low Ammo Tick, Railgun Dry Fire, Marksman Dry Fire, Minigun Whir, Gatling Click, Hammer Click |

Each built-in clip shows its length in the open list, for example **USP-S (1.53s)**. The original **AWP**, **Punch**, **Reverb Fart**, **Tuturu** and **Vine Boom** are in every shot list. **Game sound** keeps the game's own audio, and **Your file** plays your own sound.

#### Each primary gun
**Gun shots** and **Gun reload** list their sounds by gun, and under **Advanced** the **Set one gun** list switches both to one gun's own picks. A gun starts on **Same as all guns**. **Match each gun** plays the first sound of the gun firing or reloading.

Every gun has **ten shots and ten reload kits** of its own:

| Gun | Shots | Reload kits |
|---|---|---|
| EggK-47 | AK-47, M4A4, M4A1-S, Galil AR, Classic AK-47, Classic M4A1, Negev, Classic M249, Pulse Rifle, Survivor AK | AK-47, M4A4, Galil AR, Classic AK-47, Classic M4A1, STG 44, BAR, Survivor AK, Pulse Rifle, Outbreak AK |
| Scrambler | Nova, XM1014, Sawed-Off, Force-A-Nature, MAG-7, Classic M3, Scattergun, Chrome Shotgun, SPAS-12, Double Barrel | Double barrel, MAG-7, Pump shotgun, Nova, XM1014, Sawed-Off, Combine Shotgun, Chrome Shotgun, Auto Shotgun, Super Shorty |
| Free Ranger | G3SG1, SCAR-20, Classic, SG 550, Classic G3SG1, Hunting Rifle, Military Sniper, Crossbow, Survivor SG 552, Bazaar Bargain | G3SG1, SCAR-20, SG 553, SG 550, Classic G3SG1, Hunting Rifle, Military Sniper, M1 Garand, M1 Carbine, Desert Rifle |
| RPEGG | Blast Rocket, Quake Rocket, Direct Hit, Black Box, Liberty Launcher, Air Strike, Cow Mangler, Loch-n-Load, RPG, Doom Rocket | Rocket, Quake RPG, Cow Mangler, Beggar's Bazooka, Bazooka, Mortar Shell, Grenade Launcher, Drum Launcher, Sticky Launcher, Righteous Bison |
| Whipper | Rush P90, Rapid P90, MP7, MP9, UMP-45, MAC-10, PP-Bizon, MP5, SMG1, Silenced SMG | P90, MP7, MP9, UMP-45, MAC-10, PP-Bizon, MP5, Tommy Gun, MP40, Survivor SMG |
| Crackshot | AWP, Thunder AWP, SSG 08, Scout, Sniper Rifle, Sydney Sleeper, Machina, Classic AWP, Survivor Scout, Machina charged | AWP bolt, SSG 08 bolt, Scout bolt, Classic AWP, AWP magazine, Classic Scout, Machina, Sniper Rifle, Kar98k, Survivor Scout |
| Tri-Hard | AUG, FAMAS, SG 553, Classic AUG, Classic FAMAS, Classic SG 552, Classic Galil, Survivor M4, Desert Rifle, Classic M4A1 silenced | AUG, FAMAS, SG 553, Classic AUG, Classic FAMAS, Classic SG 552, Classic Galil, Survivor M4, Outbreak M4, M4A1-S |

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

For the pistol, **Match my pistol** follows your **Pistol shots** pick, so P250 shots get the P250 reload; otherwise it's the Glock. Your own file starts on the first cue and fades out just after the last one. Firing, a melee swing or dying cuts a reload sound short, as it does the reload.

- **Your file:** choose **Choose a file…** in a list and pick a file (MP3, OGG or WAV, up to 4 MB). Its name shows next to the list, and it's kept in your browser, one per list (and one per gun).
- **Your weapons only** by default. Tick **Everyone's weapons** to change other players' too. In a busy fight, other players' sounds give way first, so yours are never cut.
- Every list starts on **Game sound**. A reload pick that's gone in 1.3 (a one-clip reload, or a rifle kit on the pistol) becomes **Match each gun** (**Match my pistol** for the pistol).
- **Volume** slider, plus the game's **Sound Effects** volume.
- Works alongside [Valorant Kill Sounds](https://github.com/Virojet/Shell-Shockers-Valorant-Kill-Sounds) and [Better HUD](https://github.com/Virojet/Shell-Shockers-Better-Hud-Mod).
- Updates itself through Tampermonkey. Works on shellshock.io and its mirrors.

Built-in audio isn't embedded in the script. The first time you pick a sound it downloads from this project's [sounds](./sounds) folder and is kept in your browser. Clip credits and original supplied filenames are listed in [sounds/SOURCES.md](./sounds/SOURCES.md).

## Settings

**Settings** ▸ the **speaker tab** ▸ **Gun Sounds**, under Language and Kill Sounds. It starts as just a **▸ Gun Sounds** heading; click it to open the panel, and it stays open or shut the way you leave it. Inside:

- **Quick start:** **Game sounds** (the game's own sounds everywhere), **Real guns** (each gun gets a matching shot and reload, a USP-S pistol, a swing and a click) and **Memes** (Vine Boom, Tuturu, Punch and Reverb Fart). One click sets every list and plays a sample. The button stays lit while the lists still match it, and **Volume** and **Everyone's weapons** are left alone.
- **Four lists** in two columns: **Gun shots**, **Gun reload**, **Pistol shots** and **Melee**, each with a **Test** button. Picking a sound plays it, and **Test** plays it again: one shot, or a reload at a real reload's timing (the gun shown, else your last primary, or the pistol).
- **Volume.**
- **Advanced**, a button on the heading's line, adds **Pistol reload** and **Empty click**, **Set one gun**, **Everyone's weapons**, **Export** and **Import**, and turns into **Simple** to put them away again. It's remembered, and it opens by itself for anyone who already uses one of those.

Changes are kept when you press **Confirm**.

**Export** saves every pick, the volume and Everyone's weapons to `gun-sounds-settings.json`. **Import** loads one of those files into the lists, and **Confirm** keeps it. Your own files stay in the browser and aren't in the export; on a new browser a list set to **Your file** shows **No file yet** until you choose the file again.

If the settings are taller than your screen, scroll them.

## How updates work

Tampermonkey checks this repository's raw userscript on `main`, compares its `@version`, and downloads a newer version from the same URL when automatic updates are enabled. The next page reload runs the new version. You can also use Tampermonkey's **Check for updates** command. The script itself needs no GitHub account or token.

The audio URLs use a fixed Git commit, so an existing script version always gets the same files. GitHub is tried first, with jsDelivr serving the same commit as a backup. New audio becomes available when a newer script points to a commit containing it. Selected clips are cached locally; your settings and custom MP3s stay in the browser through script updates.

## Changelog

### 1.6.2 — 2026-10-21
- **Sounds that leaned to one ear now play the same in both.** The Crackshot's **Sniper Rifle** was louder in the left ear (about 2 dB over the whole shot, 4 dB in its tail). I measured the left and right ear of all 324 sounds in the project and folded the 17 that leaned noticeably to the middle: that shot, the Crackshot **SSG 08**, the EggK-47's **Classic M4A1**, the **Claymore swing**, the **Minigun** and **Gatling** empty clicks, and 11 reload pieces. Everything else was already within 1.5 dB.
- Nothing was added or removed, so your saved picks are unchanged.

### 1.6.1 — 2026-10-21
- **Shots that played in one ear are gone.** Nine of the 1.6.0 shots (the Day of Defeat: Source STG 44, BAR, M1 Garand, M1 Carbine, Tommy Gun, Kar98k, Scoped Kar98k and Springfield, and the Zombie Panic! Source Outbreak M4) were recorded much louder in the left channel (the Outbreak M4 only a little), so they were loud in the left ear and faint in the right. Each is replaced by a shot that sits evenly in both ears, so every gun still has ten: EggK-47 gets **Negev** and **Classic M249**, Free Ranger **Crossbow** and **Survivor SG 552**, Whipper **SMG1**, Crackshot **Classic AWP**, **Survivor Scout** and **Machina charged**, Tri-Hard **Classic M4A1 silenced**.
- A pick of one of the removed shots falls back to the gun's default. Every reload kit is even in both ears and is unchanged.

### 1.6.0 — 2026-10-21
- **Ten shots and ten reload kits for every primary gun.** Each gun had three to five of each; now every one has ten of its own: 43 new shots and 47 new kits, from older Counter-Strike versions and other Valve games (Team Fortress 2, Half-Life 2, Left 4 Dead 2, Day of Defeat: Source) and Zombie Panic! Source, all in [sounds/SOURCES.md](./sounds/SOURCES.md).
- The new shots start on the shot, the Tri-Hard's are three-round bursts like the others, and every kit piece is cut to play on its reload cue, so they line up like the sounds that were already there.
- Three new pistol reloads: **Desert Eagle**, **Colt M1911** and **P228**. **Match my pistol** gives the Hand Cannon the Desert Eagle's.
- Your saved picks and the sounds from earlier versions are unchanged.

### 1.5.0 — 2026-10-21
- **Simpler settings.** Gun Sounds is a **▸ Gun Sounds** heading that opens when you click it and stays the way you leave it. Opened, it shows three **Quick start** buttons (**Game sounds**, **Real guns**, **Memes**) that set every list at once, four lists (**Gun shots**, **Gun reload**, **Pistol shots**, **Melee**) and the volume.
- **Advanced** adds **Pistol reload** and **Empty click**, **Set one gun** (the old Primary gun list), **Everyone's weapons**, **Export** and **Import**. It opens by itself for anyone who already uses one of them.
- **Plainer names:** Primary is **Gun shots**, Primary reload is **Gun reload**, Secondary is **Pistol shots**, Secondary reload is **Pistol reload**, No ammo is **Empty click**, **Matched to your gun** is **Match each gun** (**Match my pistol** for the pistol reload), and **My MP3** is **Your file**.
- Your saved picks, **Everyone's weapons**, your own files and the sounds themselves are unchanged.

### 1.4.0 — 2026-10-18
- **Export** and **Import** buttons save your Gun Sounds settings to a file and load them back, for another browser or a backup.
- A reload sound stops when you die, instead of playing out.
- With **Everyone's weapons** on, other players' sounds give way first when lots play at once, so your own shots are never cut.
- Removed the audio files no list uses any more: the Operator shots, the one-clip reloads and the old whole-gun reloads. Older versions still get them from their own fixed commit.

### 1.3.1 — 2026-10-18
- **Test** plays a primary sound once, instead of a few shots at the gun's fire rate.

### 1.3.0 — 2026-10-18
- **A pick for each primary gun.** The **Primary gun** list switches Primary and Primary reload to one gun, which starts on **Same as all guns**.
- Primary sounds and reload kits are grouped by gun, at least three each, made to fit that gun: 27 shots and 24 kits. The Tri-Hard's shots are three-round bursts, as the game plays one sound per burst.
- A gun's last shot fades quickly when it fires again, so fast guns stay crisp.
- **Matched to your gun** in Primary plays the gun's first shot.
- Removed the five Operator shots and the one-clip reloads (Steel Reset, Tactical Swap, Rifle Reset, Pump Action, Sidearm Snap), which didn't line up with any gun's reload. The meme sounds are no longer in the reload lists, and Secondary reload lists the pistol kits.

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
