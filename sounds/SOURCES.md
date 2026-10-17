# Weapon clip sources

Display names below were chosen for this mod. The fourteen weapon clips were copied without transcoding from the supplied pack. Steel Reset is a composite reload clip described below.

| Selection | Display name | File | Original supplied file |
| --- | --- | --- | --- |
| Primary | Thunder AWP | [thunder-awp.mp3](primary/thunder-awp.mp3) | `SS_AWP_01_Source.mp3` |
| Primary | Rush P90 | [rush-p90.mp3](primary/rush-p90.mp3) | `SS_P90_01_Source.mp3` |
| Primary | Rapid P90 | [rapid-p90.mp3](primary/rapid-p90.mp3) | `SS_P90_02_CSGO.mp3` |
| Primary | Blast Rocket | [blast-rocket.mp3](primary/blast-rocket.mp3) | `SS_Rocket_01_TF2.mp3` |
| Primary | Quake Rocket | [quake-rocket.mp3](primary/quake-rocket.mp3) | `SS_Rocket_02_Original.mp3` |
| Primary | Dragonfire Operator | [dragonfire-operator.mp3](primary/dragonfire-operator.mp3) | `SS_Valorant_Operator_Elderflame.mp3` |
| Primary | Fallen Operator | [fallen-operator.mp3](primary/fallen-operator.mp3) | `SS_Valorant_Operator_Forsaken.mp3` |
| Primary | Ion Pulse Operator | [ion-pulse-operator.mp3](primary/ion-pulse-operator.mp3) | `SS_Valorant_Operator_Ion.mp3` |
| Primary | Orbital Operator | [orbital-operator.mp3](primary/orbital-operator.mp3) | `SS_Valorant_Operator_Origin.mp3` |
| Primary | Soulshot Operator | [soulshot-operator.mp3](primary/soulshot-operator.mp3) | `SS_Valorant_Operator_Reaver.mp3` |
| Secondary | Hand Cannon | [hand-cannon.mp3](secondary/hand-cannon.mp3) | `SS_Pistol_01_Desert_Eagle.mp3` |
| Secondary | Quickdraw | [quickdraw.mp3](secondary/quickdraw.mp3) | `SS_Pistol_02_Glock.mp3` |
| Melee | Swift Slash | [swift-slash.mp3](melee/swift-slash.mp3) | `SS_Knife_Swing_01.mp3` |
| Melee | Heavy Slash | [heavy-slash.mp3](melee/heavy-slash.mp3) | `SS_Knife_Swing_02.mp3` |
| Reload | Steel Reset | [steel-reset.mp3](reload/steel-reset.mp3) | `steel-reset.mp3` |

The supplied pack lists its Valve/Counter-Strike/Team Fortress and Riot/Valorant sources and timing notes in [weapon-pack-sources.txt](weapon-pack-sources.txt).

## Steel Reset reload

A composite of these Counter-Strike: Global Offensive AK-47 reload sounds (Valve):

- [ak47_clipout.wav](https://raw.githubusercontent.com/sourcesounds/csgo/08f1bd6835d4f510d2ccaedeab6bb9f637b388ab/sound/weapons/ak47/ak47_clipout.wav)
- [ak47_clipin.wav](https://raw.githubusercontent.com/sourcesounds/csgo/08f1bd6835d4f510d2ccaedeab6bb9f637b388ab/sound/weapons/ak47/ak47_clipin.wav)
- [ak47_boltpull.wav](https://raw.githubusercontent.com/sourcesounds/csgo/08f1bd6835d4f510d2ccaedeab6bb9f637b388ab/sound/weapons/ak47/ak47_boltpull.wav)

Magazine out at 0 s, magazine in at 0.38 s, bolt at 0.76 s; limiter and final fade; 48 kHz stereo MP3.

The separate `reload.mp3` supplied alongside the ZIP was silent and was not used.

## Additional CC0 reload choices

| Display name | File | Recording | Author | Source and license |
| --- | --- | --- | --- | --- |
| Tactical Swap | [tactical-swap.mp3](reload/tactical-swap.mp3) | `gunreload1.wav` — magazine reload | SpringySpringo | [Gun reload sounds](https://opengameart.org/content/gun-reload-sounds), CC0 1.0 |
| Rifle Reset | [rifle-reset.mp3](reload/rifle-reset.mp3) | `assaultriflereload1_0.wav` — assault-rifle reload | SpringySpringo | [Gun reload sounds](https://opengameart.org/content/gun-reload-sounds), CC0 1.0 |
| Pump Action | [pump-action.mp3](reload/pump-action.mp3) | `shotguncock_0.wav` — shotgun pump / cocking action | SpringySpringo | [Gun reload sounds](https://opengameart.org/content/gun-reload-sounds), CC0 1.0 |
| Sidearm Snap | [sidearm-snap.mp3](reload/sidearm-snap.mp3) | `reload.wav` — handgun magazine drop, insertion and slide rack | zer0_sol | [Handgun Reload Sound Effect](https://opengameart.org/content/handgun-reload-sound-effect), CC0 1.0 |

Converted from the original WAV recordings to 48 kHz stereo, 192 kbps MP3 with a peak limiter. Complete actions are retained; Pump Action is intentionally a short pump sound. These four recordings are dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Source URLs and SHA-256 hashes are in [reload-pack-sources.json](reload-pack-sources.json).

The MIT license in this repository covers the script code. The Valve/Riot game audio retains its original ownership; the four reload recordings above are CC0.
