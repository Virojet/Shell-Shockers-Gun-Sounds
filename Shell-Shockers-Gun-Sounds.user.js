// ==UserScript==
// @name         Shell Shockers Gun Sounds
// @version      1.1.1
// @description  Pick weapon, meme or custom sounds for primary shots, secondary shots, melee swings and reloads in Shell Shockers.
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
   Primary, secondary, melee and reload each get their own pick. Each choice covers every weapon and skin in that slot.

   How it works: the game plays every sound through BAWK.play(name, output). The script wraps that call. When the name
   is a weapon action, and it's your own (identified by the shooter's player-node position), the script plays your pick
   instead and the game's sound is skipped. Every other
   sound passes through untouched, and so does the game's code.

   Built-in sounds are downloaded from this project on GitHub the first time one is picked and kept in this
   site's storage, or one MP3 of your own per slot, kept there too. They go through the game's own sound output, so its
   Sound Effects volume turns them up and down with everything else.

   Settings ▸ the speaker tab ▸ Gun Sounds has four lists, a Test button for each, and a volume. As with the
   game's settings around it, a change is kept when you press Confirm.

   window.ssGunSounds: version, settings(), set({ primary, secondary, melee, reload, volume, everyone }), slotOf(soundName). */
(() => {
  "use strict";
  if (window.ssGunSounds) return;   // already running: Tampermonkey and the Mod Menu both started it

  const VERSION = "1.1.1";
  const STORE = "ssGunSounds";
  const SOUNDS = [
    { id: "awp", name: "AWP", file: "awp.mp3" },
    { id: "punch", name: "Punch", file: "punch.mp3" },
    { id: "fart", name: "Reverb Fart", file: "reverb-fart.mp3" },
    { id: "tuturu", name: "Tuturu", file: "tuturu.mp3" },
    { id: "boom", name: "Vine Boom", file: "vine-boom.mp3" },
    { id: "thunder-awp", name: "Thunder AWP", file: "primary/thunder-awp.mp3", slot: "primary" },
    { id: "rush-p90", name: "Rush P90", file: "primary/rush-p90.mp3", slot: "primary" },
    { id: "rapid-p90", name: "Rapid P90", file: "primary/rapid-p90.mp3", slot: "primary" },
    { id: "blast-rocket", name: "Blast Rocket", file: "primary/blast-rocket.mp3", slot: "primary" },
    { id: "quake-rocket", name: "Quake Rocket", file: "primary/quake-rocket.mp3", slot: "primary" },
    { id: "dragonfire-operator", name: "Dragonfire Operator", file: "primary/dragonfire-operator.mp3", slot: "primary" },
    { id: "fallen-operator", name: "Fallen Operator", file: "primary/fallen-operator.mp3", slot: "primary" },
    { id: "ion-pulse-operator", name: "Ion Pulse Operator", file: "primary/ion-pulse-operator.mp3", slot: "primary" },
    { id: "orbital-operator", name: "Orbital Operator", file: "primary/orbital-operator.mp3", slot: "primary" },
    { id: "soulshot-operator", name: "Soulshot Operator", file: "primary/soulshot-operator.mp3", slot: "primary" },
    { id: "hand-cannon", name: "Hand Cannon", file: "secondary/hand-cannon.mp3", slot: "secondary" },
    { id: "quickdraw", name: "Quickdraw", file: "secondary/quickdraw.mp3", slot: "secondary" },
    { id: "usp-s", name: "USP-S", file: "secondary/usp-s.mp3", slot: "secondary" },
    { id: "swift-slash", name: "Swift Slash", file: "melee/swift-slash.mp3", slot: "melee" },
    { id: "heavy-slash", name: "Heavy Slash", file: "melee/heavy-slash.mp3", slot: "melee" },
    { id: "steel-reset", name: "Steel Reset", file: "reload/steel-reset.mp3", slot: "reload" },
  ];
  const DEFAULT = "default", CUSTOM = "custom", PICK = "pick";
  const SLOTS = [
    { id: "primary", name: "Primary" },
    { id: "secondary", name: "Secondary" },
    { id: "melee", name: "Melee" },
    { id: "reload", name: "Reload" },
  ];
  const DEFAULTS = Object.freeze({ primary: DEFAULT, secondary: DEFAULT, melee: DEFAULT, reload: DEFAULT, volume: 0.8, everyone: false });
  const warn = (...a) => console.warn("[Gun Sounds]", ...a);

  /* ---- Which sounds are which weapon ----
     The game names them gun_<weapon>_fire (and gun_<weapon>_<skin>_fire), and melee_<weapon>. Secondary weapons are
     listed; any gun not listed counts as a primary, so a weapon added later is still covered. */
  const SECONDARY = new Set(["cluck9mm"]);
  // These are the game's reload animation events, not rocket flight/impact or the ks_reload UI cue.
  const RELOAD_START = new Set([
    "gun_eggk47_remove_mag", "gun_cluck9mm_remove_mag", "gun_aug_remove_mag",
    "gun_csg1_pull_action", "gun_dozenGauge_open", "gun_m24_bolt_open", "gun_rpegg_load",
  ]);
  const RELOAD_PARTS = new Set([
    ...RELOAD_START, "gun_eggk47_insert_mag", "gun_eggk47_full_cycle", "gun_cluck9mm_insert_mag",
    "gun_aug_insert_mag", "gun_aug_cycle", "gun_csg1_release_action", "gun_dozenGauge_load",
    "gun_dozenGauge_close", "gun_m24_bolt_close", "gun_smg_cycle",
  ]);
  function slotOf(name) {
    if (typeof name !== "string") return null;
    if (RELOAD_PARTS.has(name)) return "reload";
    if (name.startsWith("melee_")) return "melee";
    const m = /^gun_([^_]+)_(?:.*_)?fire/.exec(name);
    if (!m || name.includes("dry_fire")) return null;
    return SECONDARY.has(m[1]) ? "secondary" : "primary";
  }

  /* ---- Saved settings ---- */
  const soundsFor = slot => SOUNDS.filter(x => !x.slot || x.slot === slot);
  const isSound = (s, slot) => s === DEFAULT || s === CUSTOM || SOUNDS.some(x => x.id === s && (!x.slot || x.slot === slot));
  function clean(s) {
    const ok = !!s && typeof s === "object", pick = k => ok && isSound(s[k], k) ? s[k] : DEFAULTS[k];
    return {
      primary: pick("primary"), secondary: pick("secondary"), melee: pick("melee"), reload: pick("reload"),
      volume: ok && Number.isFinite(s.volume) ? Math.min(1, Math.max(0, s.volume)) : DEFAULTS.volume,
      everyone: ok && s.everyone === true,
    };
  }
  let saved;
  try { saved = clean(JSON.parse(localStorage.getItem(STORE))); } catch { saved = clean(null); }
  function save(s) {
    saved = clean(s);
    try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch { /* storage blocked: kept for this visit */ }
    if (running) getReady();
  }

  /* ---- Built-in sounds, from GitHub ----
     They come from the commit that added them, so the files this version uses never change under it. A sound is
     downloaded the first time it's needed, then kept in this site's Cache Storage. */
  const FILES = "https://raw.githubusercontent.com/Virojet/Shell-Shockers-Gun-Sounds/74cff01ab61fd816b8c48b5397dfc402b01818af/sounds";
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
  async function download(file) {
    const url = `${FILES}/${file}`, store = await keep();
    const old = store && await store.match(url).catch(() => null);
    if (old) return old;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Couldn't download ${file} (HTTP ${res.status})`);
    if (store) store.put(url, res.clone()).catch(() => { /* storage full: it downloads again next time */ });
    return res;
  }

  /* ---- Your own sound: one file a slot, in this site's IndexedDB ---- */
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

  const cache = new Map();   // sound id, or "custom:<slot>" → Promise of its AudioBuffer
  const ready = new Map();   // the same clips, once loaded, for the shot that can't wait
  const keyOf = (sound, slot) => sound === CUSTOM ? CUSTOM + ":" + slot : sound;
  function clip(sound, slot) {
    const key = keyOf(sound, slot);
    let p = cache.get(key);
    if (p) return p;
    p = sound === CUSTOM ?
      readFile(slot).then(f => f ? decode(f.data, f.name) : null) :
      download(SOUNDS.find(s => s.id === sound).file).then(r => r.arrayBuffer()).then(d => decode(d, sound));
    cache.set(key, p);
    p.then(b => { if (b) ready.set(key, b); }, () => { if (cache.get(key) === p) cache.delete(key); });
    return p;
  }
  function warm(sound, slot) { if (sound !== DEFAULT) clip(sound, slot).catch(warn); }
  function getReady() { for (const s of SLOTS) warm(saved[s.id], s.id); }

  /* ---- Playing ----
     Into the game's own sound output (BAWK's input, ahead of its volume), so its Sound Effects volume applies to
     these too. Once more than a few play at once, the oldest is cut by a short fade, so full-auto fire with a long
     sound can't pile up. */
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
  function play(buf, volume, to) {
    if (!buf || volume <= 0) return null;
    const { ctx, node } = output();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = buf;
    g.gain.value = volume;
    src.connect(g); g.connect(to || node);
    src.start();
    const v = { src, g, ctx };
    voices.add(v);
    // A listener, not onended: the game sets onended on the sources it gets back to free its channel.
    src.addEventListener("ended", () => { voices.delete(v); try { g.disconnect(); } catch { /* already gone */ } });
    if (voices.size > MAX_VOICES) fade(voices.values().next().value);
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

  // All stages from one player's reload use the same position object, even when BAWK allocates different channels.
  // Replace its first audio event once, then return silent sources for the other stages. BAWK still receives a real
  // source and its ended event to release each channel. A not-yet-loaded pick leaves that whole reload native.
  let reloads = new WeakMap(), silent = null;
  const reloadKey = (B, to) => soundPosition(B, to) || to || B;
  function endReload(B, to) {
    const key = reloadKey(B, to), state = reloads.get(key);
    if (state && state.source) { try { state.source.stop(); } catch { /* already ended */ } }
    reloads.delete(key);
  }
  function playReload(B, name, to, own, sound) {
    const key = reloadKey(B, to), now = performance.now();
    let state = reloads.get(key);
    if (state && now - state.at > 8000) { reloads.delete(key); state = null; }
    // Free Ranger's long reload pulls its action before playing the shared EggK-47 magazine-removal sound.
    const nestedMag = state && !state.complete && state.first === "gun_csg1_pull_action" && name === "gun_eggk47_remove_mag";
    if (RELOAD_START.has(name) && !nestedMag) {
      endReload(B, to);
      const buf = ready.get(keyOf(sound, "reload"));
      const source = buf && play(buf, saved.volume, own ? null : to);
      state = { at: now, first: name, source, replaced: !!source, complete: name === "gun_rpegg_load" };
      reloads.set(key, state);
      if (!buf) warm(sound, "reload");
      return source || null;
    }
    if (!state || !state.replaced) return null;
    if (name === "gun_csg1_release_action" || name === "gun_dozenGauge_close" || name === "gun_m24_bolt_close" ||
        (state.first !== "gun_csg1_pull_action" && name.endsWith("_insert_mag"))) state.complete = true;
    silent = silent || new AudioBuffer({ length: 1, numberOfChannels: 1, sampleRate: SR });
    return play(silent, 1, own ? null : to);
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
          const slot = slotOf(name), sound = slot && saved[slot];
          if (slot && slot !== "reload" && saved.reload !== DEFAULT) endReload(B, to);
          const own = sound && sound !== DEFAULT && mine(B, to);
          if (own || (sound && sound !== DEFAULT && saved.everyone)) {
            if (slot === "reload") {
              const src = playReload(B, name, to, own, sound);
              if (src) return src;
              return cur.apply(this, arguments);
            }
            const buf = ready.get(keyOf(sound, slot));
            const src = buf && play(buf, saved.volume, own ? null : to);
            if (src) return src;
            if (!buf) warm(sound, slot);   // not ready yet: the game's own sound this time
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
  let pendingFiles = {}, fileGen = 0;   // files picked since the popup opened: slot → { file, name, buf }
  const nameOf = slot => pendingFiles[slot] ? pendingFiles[slot].name : customNames[slot];
  const CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 9'%3E%3Cpath d='M.9 2.5 4.5 6.5 8.1 2.5' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;
  // The list takes the theme's colours (--ssg-*, read by paint()). Where the browser can style a dropdown's list
  // (Chrome and Edge), it opens as a short list in those colours with only the focused row lit.
  // The settings popup is centred and as tall as its contents, with room for little more than the game's own: with this
  // and Kill Sounds in it, on a 16:9 screen it would run off the top and bottom, Confirm with it. It scrolls instead.
  const CSS = `
#settingsPopup:has(#${CELL}) { max-height: 88vh; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; }
#${CELL} { min-width: 0; grid-column: 1 / -1; }
#${CELL} .ssg-slots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 var(--ss-space-md); }
#${CELL} .ssg-slots > div { min-width: 0; }
#${CELL} .ssg-slots .ss_button { min-width: 0; padding-inline: .8em; }
#${CELL} .ssg-bottom { margin-top: var(--ss-space-sm); }
#${CELL} .ssg-bottom .ssg-name { margin: 0 var(--ss-space-sm) 0 2px; }
#${CELL} .ssg-bottom input[type=range] { flex: 0 1 35%; }
#${CELL} .ssg-bottom .nowrap { margin-left: auto; }
#${CELL} .f_row { align-items: center; }
#${CELL} select, #${CELL} input[type=range] { min-width: 0; }
#${CELL} select { flex: 1 1 auto; }
#${CELL} .ss_button, #${CELL} label { flex: none; }
#${CELL} .ss_button:disabled { opacity: .5; cursor: default; }
#${CELL} .ssg-name { display: block; margin: var(--ss-space-sm) 0 .15em 2px; font-weight: 700; font-size: inherit; }
#${CELL} .ssg-head { display: flex; align-items: baseline; min-width: 0; margin: var(--ss-space-sm) 0 .15em 2px; }
#${CELL} .ssg-head .ssg-name { flex: none; margin: 0; }
#${CELL} .ssg-note { flex: 0 1 auto; margin: 0 var(--ss-space-sm) 0 auto; padding-left: .5em; font-weight: 700; font-size: .85em;
  min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#${CELL} .ssg-note.ssg-error { color: var(--ss-red, #d15354) !important; }
@supports (appearance: base-select) {
  #${CELL} select, #${CELL} select::picker(select) { appearance: base-select; }
  #${CELL} select { align-items: center; padding-inline: calc(var(--ss-space-sm) + 4px) 0; }
  #${CELL} selectedcontent { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  #${CELL} select::picker-icon { content: ""; flex: none; width: 9px; height: 9px; margin-inline: .3em 3px;
    background: currentColor; mask: ${CHEVRON} center / contain no-repeat; }
  #${CELL} select::picker(select) { margin-block: .2em; padding-block: .3em; max-block-size: min(18em, 45vh); font-size: .85em;
    border: var(--ss-common-border-width) solid var(--ssg-accent); border-radius: var(--ss-space-sm);
    background: var(--ssg-bg); color: var(--ssg-fg); box-shadow: .15em .15em .4em rgb(0 0 0 / .6);
    scrollbar-width: thin; scrollbar-color: var(--ssg-accent) transparent; }
  #${CELL} option { font-size: inherit; padding-block: .15em; line-height: 1.25; font-weight: 400; }
  #${CELL} option:hover { background: none; }
  #${CELL} option:focus { background: var(--ssg-accent); color: var(--ssg-bg); outline: none; }
  #${CELL} option::checkmark { color: var(--ssg-accent); }
  #${CELL} option:focus::checkmark { color: inherit; }
  #${CELL} hr { inline-size: auto; margin: .3em .5em; border: 0; border-block-start: 1px solid var(--ssg-accent); opacity: .45; }
}`;

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
      // "Choose MP3 file…" isn't a setting: picking it opens the file picker, and the file then becomes "My MP3".
      select.append(face, new Option("Game sound", DEFAULT), ...soundsFor(s.id).map(x => new Option(x.name, x.id)), el("hr"),
        new Option("My MP3", CUSTOM), new Option("Choose MP3 file…", PICK));
      select.title = (s.id === "reload" ? "Plays once per reload." : `Plays for every ${s.name.toLowerCase()} weapon.`) + " Your own file: MP3, OGG or WAV, up to 4 MB.";
      const test = el("button", "ss_button btn_blue bevel_blue btn_sm", "Test");
      test.type = "button";
      // The label line also names your file, or says what went wrong with it, so picking one adds no height.
      const note = el("span", "ssg-note text_blue4");
      const input = el("input");
      Object.assign(input, { type: "file", accept: "audio/*,.mp3,.ogg,.wav,.m4a,.webm", hidden: true });
      const head = el("div", "ssg-head");
      head.append(el("span", "ssg-name text_blue4", s.name), note);
      slots[s.id] = { select, test, note, input };
      const col = el("div");
      col.append(head, row(select, test), input);
      rows.push(col);
      select.addEventListener("pointerdown", paint);
      select.addEventListener("keydown", paint);
      select.addEventListener("mousemove", e => {
        if (e.target instanceof HTMLOptionElement && e.target !== document.activeElement) e.target.focus({ preventScroll: true });
      });
      select.addEventListener("change", () => {
        if (select.value === PICK) {
          select.value = pending[s.id];
          return input.click();
        }
        pending[s.id] = select.value;
        refresh();
        if (select.value === CUSTOM && !nameOf(s.id)) input.click();
        else if (select.value !== DEFAULT) preview(s.id);
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
    const everyoneRow = el("div", "nowrap");
    everyoneRow.append(everyoneLabel);
    const slotGrid = el("div", "ssg-slots"), bottom = row(el("span", "ssg-name text_blue4", "Volume"), range, value, everyoneRow);
    bottom.classList.add("ssg-bottom");
    slotGrid.append(...rows);
    cell.append(el("h3", "margin-bottom-none h-short", "Gun Sounds"), slotGrid, bottom);
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
      const s = SLOTS.find(x => pending[x.id] !== DEFAULT);
      if (s) preview(s.id);
    });

    // The popup opening or closing puts the saved settings back in the controls, so a change only stays if Confirm
    // saved it (Cancel, the X and Esc all leave things as they were).
    const me = { cell, slots, range, value, everyone, io: null, shown: null };
    me.io = new IntersectionObserver(entries => {
      const shown = entries[entries.length - 1].isIntersecting;
      if (ui !== me || shown === me.shown) return;
      me.shown = shown;
      revert({ ...saved });
      if (shown) paint();
    });
    me.io.observe(cell.closest("#settings") || grid);
    ui = me;
    revert({ ...saved });
    paint();
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
    for (const { select } of Object.values(ui.slots)) {
      vars.forEach(v => select.style.removeProperty(v));
      const o = getComputedStyle([...select.children].find(e => e.tagName === "OPTION" && !e.selected));
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
    for (const s of SLOTS) {
      const u = ui.slots[s.id];
      u.select.value = p[s.id];
      u.test.disabled = p[s.id] === DEFAULT;
      setNote(s.id);
    }
    ui.everyone.checked = p.everyone;
    ui.range.value = String(p.volume);
    ui.value.textContent = String(Math.round(p.volume * 100));
    ui.range.disabled = SLOTS.every(s => p[s.id] === DEFAULT);
  }
  // With no text, the note names your file while "My MP3" is picked. A problem shows in red in a few words, with
  // more in its tooltip.
  function setNote(slot, text, error, title = text) {
    if (!ui) return;
    const u = ui.slots[slot], mine = (pending || saved)[slot] === CUSTOM;
    u.note.textContent = text || (mine ? nameOf(slot) || "No file yet" : "");
    u.note.title = text ? title : mine ? nameOf(slot) || "" : "";
    u.note.classList.toggle("ssg-error", !!error);
  }
  // The slot's pick, as it'd play in a game.
  function preview(slot) {
    const p = pending || saved, sound = p[slot];
    if (sound === DEFAULT) return;
    const mine = sound === CUSTOM && pendingFiles[slot];
    (mine ? Promise.resolve(pendingFiles[slot].buf) : clip(sound, slot)).then(buf => {
      if (!buf) return setNote(slot, "Choose a file first", true, "Choose a sound file first.");
      play(buf, p.volume);
    }, err => {
      warn(err);
      if (sound === CUSTOM) setNote(slot, "Can't play your file", true, "Can't play your saved file. Choose it again.");
      else setNote(slot, "Couldn't download", true, "Couldn't download the sound from GitHub. Check your connection, then try again.");
      setTimeout(() => setNote(slot), 4000);
    });
  }
  // A picked file waits for Confirm like the rest of the settings: until then it's only previewed.
  async function addFile(slot, file) {
    if (file.size <= 0) return;
    const gen = ++fileGen;
    if (file.size > MAX_BYTES) return setNote(slot, "Too big: " + file.name, true, `${file.name} is too big. Files can be up to 4 MB.`);
    setNote(slot, "Loading…");
    try {
      const data = await file.arrayBuffer(), buf = await decode(data, file.name);
      if (gen !== fileGen || !pending) return;   // closed, or another file picked, in the meantime
      pendingFiles[slot] = { file: { name: file.name, data }, name: file.name, buf };
      pending[slot] = CUSTOM;
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
    for (const [slot, f] of Object.entries(pendingFiles)) {
      customNames[slot] = f.name;
      cache.set(CUSTOM + ":" + slot, Promise.resolve(f.buf));
      ready.set(CUSTOM + ":" + slot, f.buf);
      writeFile(slot, f.file).catch(err => warn("Couldn't keep your file for next time:", err));
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
    for (const s of SLOTS) readFile(s.id).then(f => { if (f) { customNames[s.id] = f.name; setNote(s.id); } }, () => { /* no storage: no files */ });
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
  }

  window.ssGunSounds = {
    version: VERSION,
    sounds: SOUNDS.map(s => s.id),
    settings: () => ({ ...saved }),
    set(s) { save({ ...saved, ...s }); revert({ ...saved }); return { ...saved }; },
    slotOf,
    status: () => ({ running, hooked: !!hooked, settingsShown: !!ui && ui.cell.isConnected, loaded: [...ready.keys()] }),
  };

  start();
  // The Mod Menu (if it's installed) lists it with an on/off switch and a shortcut to these settings.
  (window.ssModMenuQueue = window.ssModMenuQueue || []).push({
    id: "gun-sounds", name: "Gun Sounds", version: VERSION, group: "mod",
    description: "Pick sounds for primary shots, secondary shots, melee swings and reloads.",
    enable: start, disable: stop, openSettings,
  });
})();
