# Weapon clip sources

Display names below were chosen for this mod. These nine clips were copied without transcoding from the supplied pack.

| Selection | Display name | File | Original supplied file |
| --- | --- | --- | --- |
| Primary | Thunder AWP | [thunder-awp.mp3](primary/thunder-awp.mp3) | `SS_AWP_01_Source.mp3` |
| Primary | Rush P90 | [rush-p90.mp3](primary/rush-p90.mp3) | `SS_P90_01_Source.mp3` |
| Primary | Rapid P90 | [rapid-p90.mp3](primary/rapid-p90.mp3) | `SS_P90_02_CSGO.mp3` |
| Primary | Blast Rocket | [blast-rocket.mp3](primary/blast-rocket.mp3) | `SS_Rocket_01_TF2.mp3` |
| Primary | Quake Rocket | [quake-rocket.mp3](primary/quake-rocket.mp3) | `SS_Rocket_02_Original.mp3` |
| Secondary | Hand Cannon | [hand-cannon.mp3](secondary/hand-cannon.mp3) | `SS_Pistol_01_Desert_Eagle.mp3` |
| Secondary | Quickdraw | [quickdraw.mp3](secondary/quickdraw.mp3) | `SS_Pistol_02_Glock.mp3` |
| Melee | Swift Slash | [swift-slash.mp3](melee/swift-slash.mp3) | `SS_Knife_Swing_01.mp3` |
| Melee | Heavy Slash | [heavy-slash.mp3](melee/heavy-slash.mp3) | `SS_Knife_Swing_02.mp3` |

The supplied pack lists its Valve/Counter-Strike/Team Fortress and Riot/Valorant sources and timing notes in [weapon-pack-sources.txt](weapon-pack-sources.txt).

The separate `reload.mp3` supplied alongside the ZIP was silent and was not used.

## Reviewed gun reloads and USP-S

The component sounds for **Matched per gun (automatic)** use Valve CS:GO and TF2 audio from the sourcesounds mirrors. **USP-S** uses the suppressed `usp_01.wav` shot, plus `usp_clipout.wav`, `usp_clipin.wav` and `usp_sliderelease.wav`. These are audio presets; no pistol model or texture is supplied.

| Shell Shockers gun | Reload choice | Source sound family |
| --- | --- | --- |
| EggK-47 | AK Magazine | CS:GO AK-47 magazine and bolt |
| Scrambler | Break & Load | TF2 double-barrel open, shell insertion and close |
| Free Ranger | Marksman Swap | CS:GO G3SG1 magazine and action |
| RPEGG | Rocket Seat | TF2 rocket insertion |
| Whipper | P90 Lock | CS:GO P90 magazine and action |
| Crackshot | Bolt Cycle | CS:GO AWP bolt and loading |
| Tri-Hard | AUG Reset | CS:GO AUG magazine and action |
| Cluck 9mm | Pistol Rack | CS:GO Glock magazine and slide |
| Cluck 9mm with USP-S audio | USP-S | CS:GO USP magazine and slide |

The P90's initial sound combines magazine release and removal with a 0.12 s gap. Since 1.2.0 the script uses the component sounds in [reload/stages](reload/stages) as **reload kits**, each piece played on the game's own reload cue. The partial/empty composites that used to be in `reload/guns` were removed in 1.4.0. The reviewed timing notes were based on the [Shell Shockers Wiki weapon profiles](https://shellshockers.fandom.com/wiki/Weapon#Weapon_Profiles) and captured reload-event names. Automatic mode follows the events directly and does not change gameplay timing.

Files, pinned source revisions, download URLs, Git blob hashes and SHA-256 hashes are listed in [gun-reload-sources.json](gun-reload-sources.json). Source mirrors: [CS:GO](https://github.com/sourcesounds/csgo/tree/08f1bd6835d4f510d2ccaedeab6bb9f637b388ab/sound/weapons) and [TF2](https://github.com/sourcesounds/tf/tree/420bf271208d79d952e693974e391892c254ad80/sound/weapons). Audio was converted to 48 kHz stereo MP3 with a limiter; final playback gain is normalized by the script.

## Additional pistol and melee choices

| Choice | Recording family | Source |
| --- | --- | --- |
| Five-SeveN | Five-SeveN shot, magazine and slide | Valve CS:GO, `sound/weapons/fiveseven/` |
| R8 Revolver | R8 shot, cylinder loading/closing and hammer | Valve CS:GO, `sound/weapons/revolver/` |
| Blade Flick | `knife_swing.wav` | Valve TF2 |
| Machete Sweep | `machete_swing.wav` | Valve TF2 |
| Saber Arc | `batsaber_swing1.wav` | Valve TF2 |

Five-SeveN and R8 include reload kit components. The revolver insertion component combines loading and cylinder closure with a 0.35 s gap. Audio uses the same pinned CS:GO and TF2 source revisions listed above, with limiter and 48 kHz stereo MP3 conversion. Exact download URLs, Git blob hashes and generated-file hashes are in [category-expansion-sources.json](category-expansion-sources.json).

## USP-S

**USP-S** in Secondary is one silenced Counter-Strike: Global Offensive shot (Valve), from [usp_01.wav](https://raw.githubusercontent.com/sourcesounds/csgo/08f1bd6835d4f510d2ccaedeab6bb9f637b388ab/sound/weapons/usp/usp_01.wav). Leading/trailing near-silence trimmed, peak adjusted with a short ending fade, exported as 48 kHz stereo, 320 kbps MP3 under two seconds.

## Ten choices per list

| List | Added choices | Source recordings |
| --- | --- | --- |
| Secondary | P250, Tec-9, CZ75-Auto, Dual Berettas, P2000 | CS:GO `p250_01`, `tec9_02`, `cz75_01`, `elites_01`, `hkp2000_01` |
| Reload kits | P250, Tec-9, P2000, Dual Berettas | CS:GO magazine out, magazine in and slide/bolt release for each pistol (`elite_leftclipin` for the Dual Berettas' magazine in) |
| Melee | Claymore Swing, Pickaxe Swing, Shovel Swing, Wrench Swing, Boxing Glove | TF2 `demo_sword_swing1`, `pickaxe_swing1`, `shovel_swing`, `wrench_swing`, `boxing_gloves_swing1` |
| No ammo | Pistol Click, Rifle Click, Shotgun Click, Minigun Whir, Gatling Click, Low Ammo Tick, Trigger Tap, Railgun Dry Fire, Marksman Dry Fire | CS:GO `clipempty_pistol`, `clipempty_rifle`, `lowammo_01`, `c4/c4_click`; TF2 `shotgun_empty`, `minigun_empty`, `gatling_empty`, `sniper_railgun_dry_fire`, `widow_maker_dry_fire` |

**Hammer Click**, the tenth no-ammo choice, is the game's own `hammer_click` sound and has no file here. Same pinned CS:GO and TF2 revisions as above, limiter, 48 kHz stereo 192 kbps MP3. Exact download URLs and SHA-256 hashes of the source and generated files are in [category-ten-sources.json](category-ten-sources.json).

## Per-gun shots and reload kits (1.3.0)

Each primary gun has its own shots and kits. Recordings from Valve's Counter-Strike: Global Offensive, Counter-Strike: Source and Team Fortress 2, from pinned sourcesounds mirrors ([CS:GO](https://github.com/sourcesounds/csgo/tree/08f1bd6835d4f510d2ccaedeab6bb9f637b388ab/sound/weapons), [CS:Source](https://github.com/sourcesounds/cstrike/tree/104c8cdfe575cf30ac2c9807c809d9383e7db0bb/sound/weapons), [TF2](https://github.com/sourcesounds/tf/tree/420bf271208d79d952e693974e391892c254ad80/sound/weapons)).

| Gun | Shots ([primary/](primary)) | Kit pieces ([reload/stages/](reload/stages)) |
| --- | --- | --- |
| EggK-47 | CS:GO `ak47_01`, `m4a1_01`, `m4a1_silencer_01`, `galil_01` | CS:GO M4A1 and Galil AR clip out, clip in, bolt forward |
| Scrambler | CS:GO `nova-1`, `xm1014-1`, `sawedoff-1`; TF2 `scatter_gun_double_shoot` | CS:GO MAG-7 clip out, clip in, pump forward; TF2 shotgun cock back, `shotgun_reload`, cock forward |
| Free Ranger | CS:GO `g3sg1_01`, `scar20_01`; TF2 `sniper_rifle_classic_shoot` | CS:GO SCAR-20 and SG 553 bolt back, clip out, clip in, bolt forward |
| RPEGG | TF2 `rocket_directhit_shoot`, `rocket_blackbox_shoot` | TF2 `quake_rpg_reload_remastered`, `cow_mangler_reload`, `dumpster_rocket_reload` |
| Whipper | CS:GO `mp7_01`, `mp9_01`, `ump45_02` | CS:GO MP7, MP9 and UMP-45 clip out, clip in, bolt or slide forward |
| Crackshot | CS:GO `awp_01`, `ssg08_01`; CS:Source `scout_fire-1` | CS:GO SSG 08 bolt back, clip in, bolt forward; TF2 sniper bolt back and forward with CS:Source `scout_clipin` |
| Tri-Hard | CS:GO `aug_01`, `famas_01`, `sg556_01` | CS:GO FAMAS clip out, clip in, bolt forward |

The Tri-Hard shots are three copies of one shot at 0, 100 and 200 ms, mixed, since the game plays one sound per three-round burst. All were converted to 48 kHz stereo 192 kbps MP3 with a limiter. Download URLs and SHA-256 hashes of the source and generated files are in [per-gun-sources.json](per-gun-sources.json).

Since 1.3.0 the five Operator shots and the one-clip reloads (Steel Reset and four CC0 reloads) are no longer offered, and 1.4.0 removed their files, along with the old whole-gun reloads. Older script versions download audio from the fixed commit they were released with, so they still find them.

The MIT license in this repository covers the script code. The Valve/Riot game audio retains its original ownership.
