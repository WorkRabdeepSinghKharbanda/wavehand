import type { Listicle } from "./contentTypes"

// Adding a listicle? sitemap.xml is generated automatically (scripts/generate-sitemap.mjs) —
// just add its URL to public/llms.txt in the same change.

export const LISTICLES: Listicle[] = [
  {
    slug: "ways-to-practice-chords",
    title: "5 Ways to Practice Chords in WaveHand",
    description:
      "WaveHand isn't just one mode — here are five real ways to build chord skills with it, from free play to guided practice, and how to combine them into a routine that actually sticks.",
    image: {
      src: "/screenshots/wavehand-chord-wheel-hud.png",
      alt: "WaveHand's Gesture mode showing the chord wheel for A major with finger counts for each degree",
    },
    intro: [
      "If you've searched for the best way to practice chords, most answers assume you own a guitar or a piano. WaveHand doesn't require either — your hands are the instrument — but the underlying practice principles are the same: isolate one skill, get immediate feedback, repeat in context, and build toward playing real songs. What's different is that a webcam instrument can give you feedback a physical instrument can't, like telling you precisely which part of a chord shape is wrong.",
      "The five approaches below aren't alternatives to choose between. They're layers. Most people start with free play to learn the shapes, use Learn mode to practice real progressions, and bring in the looper and Theremin mode once the basics are automatic. The settings tips at the end apply throughout.",
      "Everything here refers to features that exist in WaveHand today. There's no comparison to other apps or instruments, because the point is to show what you can actually do with this one.",
      "A note on what good practice looks like with a camera instrument specifically. Hand tracking rewards clean, deliberate gestures and punishes sloppy ones: a finger held halfway between raised and lowered flickers, a wrist tilted slightly flips the chord. That means practice here is partly about the music and partly about precision of movement, the same way a violinist's practice is partly about intonation. Short, focused sessions — ten or fifteen minutes — produce better gestures than long ones, because fatigue makes hands imprecise. If your chords start misfiring late in a session, that's the signal to stop, not to push through.",
      "It also helps to keep the HUD visible while you practice. It shows the detected chord and voicing in large type, so you always know whether the shape you think you're making is the shape the camera sees. Treat it as a mirror. When the HUD and your intent disagree, the HUD is right about what your hand is doing, and the fix is in the hand.",
    ],
    items: [
      {
        title: "Free play in Gesture mode",
        description:
          "The fastest way to get a feel for the chord shapes. No song, no chart — just hold shapes with your left hand and listen to how the right hand's volume, quality, and tone controls change the sound. Start by cycling through one to five fingers on the left hand and naming each degree out loud as you hear it. Then add the two extended shapes for VI and VII. Once the seven degrees are automatic, introduce left-wrist tilt for major and minor. Free play is where you build the raw muscle memory that every other practice method depends on, and because the HUD shows the detected chord and quality in real time, you always know whether your hand is doing what you think it is.",
      },
      {
        title: "Ear training in Theremin mode",
        description:
          "Theremin mode has no fixed steps to land on, so it's genuine ear training — you tune pitch by hearing it, the same skill a real theremin or fretless instrument demands. Pick a key, then try to find the root, third, and fifth of that key by ear with your right hand, holding each until it sounds in tune. Then try to play a simple melody you know. This feels unrelated to chord practice at first, but it builds the skill of hearing intervals, which is exactly what you need to recognize whether a chord is major or minor without looking at the HUD. Ten minutes of Theremin mode before a chord session noticeably sharpens your ear for the session itself.",
      },
      {
        title: "Guided practice with Learn mode",
        description:
          "Load a song from the community library and Learn mode shows you the next chord shape for both hands, only advancing once you're actually holding it correctly — not just on the beat. It checks four components independently (degree, major/minor, voicing, octave) and shows which ones match, so you can fix exactly what's wrong instead of guessing. Wrong chords make no sound, and the practice metronome stays off until your first correct chord, so you can take as long as you need. Use the section pills to jump to the part you're working on, repeat a section when it finishes, and skip a single chord that's blocking you without losing your place. Your progress is saved per song, so a long song can be learned across several short sessions.",
      },
      {
        title: "Looping your own progressions",
        description:
          "Record a chord progression into the loop pedal, let it play back, and practice switching chords cleanly on top of your own loop instead of a static backing track. Turn on the sequencer in Settings, set a comfortable tempo, and record the progression you're working on into track one — slowly, mistakes and all. Then play along, trying to land each chord change exactly in time with the loop. Because the loop is your own playing at your own tempo, it's a more honest practice partner than a fixed recording. When a change starts feeling easy, nudge the tempo up and re-record. The beat grid lets you fix a single wrong chord in the loop by hand without re-recording the whole thing.",
      },
      {
        title: "Simplifying controls in Settings",
        description:
          "If tilt-based mode switching or finger-count quality feels like too much at once, the Settings sheet lets you fix mode or quality to a constant value — useful for isolating one skill at a time, or for anyone who finds the full gesture set physically difficult. Fix the left hand to major and the right hand to a triad, learn the seven finger counts until they're automatic, then unfix one dimension at a time. The gesture engine is identical in every configuration, so shapes you learn with controls fixed are the same shapes you'll use with everything live. Learn mode works at every stage: a fixed dimension matches its target automatically, so you can run guided practice on real songs even while you've simplified the controls.",
      },
    ],
    faq: [
      {
        q: "Which of these should a complete beginner start with?",
        a: "Free play with the left hand fixed to major and the right hand fixed to a triad (both in Settings). Learn the seven finger counts first; everything else builds on them.",
      },
      {
        q: "How long should a practice session be?",
        a: "Ten to fifteen focused minutes is plenty. Hand tracking rewards clean, deliberate gestures, and fatigue makes gestures sloppy. Short daily sessions beat long weekly ones.",
      },
      {
        q: "Does Learn mode work if I've fixed controls in Settings?",
        a: "Yes. A fixed dimension (mode or quality) matches its target component automatically, so guided practice works at every simplification level.",
      },
      {
        q: "Do I need the sequencer turned on to practice?",
        a: "Only for the looping method. Free play, Theremin ear training, and Learn mode all work with the sequencer hidden, which keeps the screen simpler.",
      },
      {
        q: "Will this help me on a real guitar or piano?",
        a: "The theory, progressions, and ear skills transfer directly. Physical technique for a specific instrument does not — WaveHand won't build fret-hand strength.",
      },
      {
        q: "Is my practice progress saved?",
        a: "Learn mode saves completed sections per song, locally in your browser. Settings (key, voice, hand controls) are saved too. Free-play and loop sessions are not stored.",
      },
    ],
  },
  {
    slug: "hand-gestures-to-know",
    title: "6 Hand Gestures Every WaveHand Player Should Know",
    description:
      "The full gesture vocabulary Gesture mode reads — what each hand shape actually does, how the camera detects it, and the common mistakes that make each one misfire.",
    image: {
      src: "/screenshots/wavehand-chord-wheel-hud.png",
      alt: "The chord wheel in WaveHand's HUD mapping left-hand finger counts to scale degrees",
    },
    intro: [
      "Gesture mode reads a small, fixed vocabulary of hand shapes. There are no hidden gestures and no combinations to discover — the six below are the whole language. Each maps to one musical parameter, and each is detected by a specific geometric test on the hand landmarks the camera provides, which means each has a specific way of going wrong when your hand isn't quite in the position the test expects.",
      "This is a reference page. The guide explains the instrument from scratch; this page is for when you're playing and want to know exactly why a gesture isn't registering. For each gesture: what it does, how it's detected, and what to check when it misfires.",
      "The left hand chooses which chord. The right hand chooses how it sounds. Keeping that split in mind makes all six easier to remember.",
      "A word on how detection actually works, because it explains most misfires. For each of the four long fingers, a finger counts as raised when its tip landmark is higher in the frame than the middle knuckle of the same finger. It's a relative test — tip against its own knuckle — so hand size, distance from the camera, and position in the frame don't change the result. The thumb is tested horizontally instead, because thumbs move sideways rather than curling down. Wrist tilt is a continuous number from the wrist's position relative to the knuckles, normalized to hand width. Every gesture below is built from those three measurements.",
      "The gesture readings then pass through a short stabilizer before they reach the sound: a new chord must hold steady for a brief window before it plays, and a hand that briefly leaves frame keeps its last chord for a short grace period. This is why a decisive gesture registers instantly and an ambiguous one — a finger held halfway — flickers. The single most useful habit for a WaveHand player is making every gesture unambiguous: fingers fully up or fully down, wrist clearly level or clearly tilted, thumb clearly in or clearly out.",
    ],
    items: [
      {
        title: "Left hand: 1–5 raised fingers",
        description:
          "Selects chord degrees I through V of the current key — the core of what you're playing. A finger counts as raised when its tip is higher in the frame than its middle knuckle, so the test is relative to your own hand, not to an absolute height. Common misfire: a finger held halfway, tip level with the knuckle, flickers between counted and not. Raise fingers fully or fold them fully. Second misfire: the thumb. For degrees I through V the thumb should be folded in; an extended thumb is read as part of the VI/VII shapes and will change the chord.",
      },
      {
        title: "Left hand: index + pinky",
        description:
          "A specific two-finger shape that reaches the VI chord, outside the plain 1–5 finger count range. Only the index and pinky should be up; middle and ring must be folded. Because this shape has exactly two raised fingers, it's distinguished from the II chord (which also has two) by which fingers they are. Misfire: the ring finger drifting up with the pinky, which is a very common tendency — the pinky and ring finger share tendons. Practice folding the ring finger deliberately while extending the pinky.",
      },
      {
        title: "Left hand: index + pinky + thumb",
        description:
          "Adds the thumb to the same shape to reach the VII chord, completing the full scale-degree range. The thumb is detected differently from the other fingers: by its horizontal position relative to the joint below it, not its height, because a thumb moves sideways rather than curling down. Misfire: the thumb not extended far enough outward reads as folded and you get VI instead of VII. Push the thumb clearly away from the palm. The handedness label from the camera makes the direction test correct for either hand and for mirrored previews.",
      },
      {
        title: "Left hand: wrist tilt",
        description:
          "Switches the current chord between its major and minor voicing, without changing which degree you're playing. Tilt is a continuous value from -1 to 1, read by comparing the wrist landmark to the knuckles further up the hand, and normalized against hand width so small and large hands behave the same. The sign decides the world. Misfire: unintentional tilt. A hand held slightly rotated sits near the threshold and the chord flips unexpectedly. Hold the wrist level for major, tilt deliberately for minor, and if tilt is more trouble than it's worth while learning, fix the mode in Settings.",
      },
      {
        title: "Right hand: height",
        description:
          "Controls volume continuously — raise your hand to play louder, lower it to fade toward silence. This is the simplest gesture: the vertical position of the wrist in the frame, mapped to a gain. It isn't stabilized, so volume follows your hand immediately, which is what makes swells expressive. Misfire: the hand too low in frame, so everything is quiet. Keep your right hand at least at chest height. In Theremin mode the roles swap — left hand height is volume, right hand height is pitch.",
      },
      {
        title: "Right hand: finger count + thumb",
        description:
          "1–4 fingers step through triad, inversion, and 7th-chord voicings; extending the thumb drops the chord an octave. One finger is a root-position triad, two is a first inversion, three adds a seventh, four is a dominant (major world) or diminished (minor world) seventh. The thumb test is the same horizontal-position check as the left hand's. Misfire: a stray raised finger changes the voicing — if you hear an unexpected seventh, check your right hand's count. Right-wrist tilt, separately, sweeps the filter: tilt one way to darken the tone, the other to brighten it. If voicing control is too much at once, fix quality in Settings.",
      },
    ],
    faq: [
      {
        q: "Why does the same finger count give different chords?",
        a: "Because the degree also depends on which fingers are up (index+pinky is VI, not II) and on wrist tilt (major vs minor). Check both before assuming the count is wrong.",
      },
      {
        q: "Does it matter which hand is left or right?",
        a: "Yes — the left hand picks the chord, the right shapes it. Handedness comes from the camera's hand model, not from where the hand appears in the frame, so a mirrored preview doesn't swap them.",
      },
      {
        q: "Why does my chord flicker?",
        a: "A finger is sitting right at the raised/lowered threshold. Make gestures decisive: fully up or fully down. The stabilizer suppresses brief flicker but can't resolve a genuinely ambiguous shape.",
      },
      {
        q: "Can I change what the gestures do?",
        a: "You can fix left-hand mode (major/minor) and right-hand quality to constants in Settings, which removes those gestures from play. The remaining mappings are fixed.",
      },
      {
        q: "Does hand size affect gestures?",
        a: "No. Finger detection compares each tip to its own knuckle, and tilt is normalized to hand width, so the same gesture produces the same result regardless of hand size.",
      },
      {
        q: "What's the fastest way to learn all six?",
        a: "Fix mode and quality in Settings, learn the left-hand degree shapes in free play with the HUD open, then add the other gestures back one at a time.",
      },
    ],
  },
  {
    slug: "ways-to-customize-your-sound",
    title: "5 Ways to Customize Your Sound in WaveHand",
    description:
      "WaveHand's tone isn't fixed — here are the real, working ways to change how it sounds, all built into the app today, and how they combine.",
    image: {
      src: "/screenshots/wavehand-settings-sheet.png",
      alt: "WaveHand's Settings sheet with the Key and Sound selectors visible",
    },
    intro: [
      "A sawtooth chord in A major played loud with the filter open is one sound. The same gesture with a sine voice, in D, played soft with the filter closed and the octave dropped, is a completely different one. WaveHand gives you a small number of controls over tone, and because they're independent, they combine into a wide range of sounds without any menu-diving.",
      "Two of these controls live in Settings and persist between sessions. Three are live gestures you perform while playing. Knowing which is which matters: the live ones are for expression in the moment, the saved ones are for setting up the instrument you want.",
      "Everything listed is a real feature in the current app. There are no effects racks or sample libraries — the instrument is deliberately a small set of oscillators with a filter, and that constraint is part of what makes it quick to learn.",
      "The sound engine, for context: each chord note is one oscillator of the selected waveform. All the oscillators feed a single low-pass filter whose cutoff and resonance are driven by right-hand tilt, then a master gain driven by right-hand height. That's the entire signal chain — oscillators, filter, gain. Theremin mode uses one sine oscillator through the same filter and gain. Knowing this makes the five controls below predictable: voice changes the oscillators, tilt changes the filter, height changes the gain, key and octave change the oscillator frequencies, and voicing changes which frequencies there are.",
      "Because the chain is so short, every control is audible immediately and none of them mask the others. A filter sweep on a sine voice sounds subtle because a sine has few harmonics to remove; the same sweep on a sawtooth is dramatic. An octave drop on a triad is clean; on a seventh chord it gets muddy fast. Part of learning the instrument is learning which combinations work, and the short chain makes that learnable by ear.",
    ],
    items: [
      {
        title: "Pick a synth voice",
        description:
          "Choose between Bright (sawtooth), Soft (sine), Mellow (triangle), and 8-bit (square) in Settings — four real oscillator waveforms, not presets layered on one sound. Each has a distinct harmonic character: Bright is full and cutting, Soft is pure with no overtones, Mellow sits between them, 8-bit is hollow and buzzy. Every voice is loudness-compensated so switching doesn't make the instrument suddenly quieter or louder, and the switch happens instantly on a held chord so you can audition all four without stopping. Loops remember the voice they were recorded with, so you can layer different voices across tracks.",
      },
      {
        title: "Sweep the filter live",
        description:
          "Right-hand wrist tilt sweeps a low-pass filter in Gesture mode, brightening or darkening the tone as you play, no menu required. Tilt one way and the filter closes, muffling the high harmonics for a warmer, more distant sound; tilt the other and it opens, letting the chord cut through. The filter's resonance rises as it sweeps, which gives the movement a slight vocal quality. This is the most expressive tone control because it's continuous and immediate — a slow tilt during a sustained chord is a classic synth gesture, and here it's literally a gesture.",
      },
      {
        title: "Change key",
        description:
          "The key selector shifts every chord's actual pitch — your chosen key is remembered across visits, so you don't reset it every session. Because the left hand selects scale degrees rather than fixed notes, changing key doesn't change any gesture: one finger is still the I chord, just a different I. Lower keys sound heavier; higher keys sound brighter. When you open a Learn mode song, the key switches to that song's key temporarily and your saved choice is restored afterward.",
      },
      {
        title: "Drop an octave with your thumb",
        description:
          "Extending your right thumb transposes the current chord down an octave live, for a heavier or bass-focused sound. The chord's identity doesn't change — only its register. This is how you get a bassline out of the same gestures that produce chords: hold a simple triad, drop the octave, and the result sits underneath. Combined with a closed filter and the Soft voice, it's a convincing synth bass; with the 8-bit voice and open filter, it's a chiptune bass.",
      },
      {
        title: "Choose quality and inversion",
        description:
          "Right-hand finger count doesn't just add notes — it steps through genuinely different voicings (triad, inversion, 7th, dominant or diminished 7th) that change a chord's whole character. A root-position triad is plain and stable. A first inversion is smoother between chords. A seventh is richer and more tense. The same progression played with one finger throughout versus three fingers throughout sounds like two different arrangements. If you want a consistent voicing without managing the right hand's count, fix quality in Settings.",
      },
    ],
    faq: [
      {
        q: "Which of these are saved between sessions?",
        a: "Voice and key, in Settings. Filter tilt, octave thumb, and voicing are live gestures and reset to neutral when your hands leave the frame.",
      },
      {
        q: "Why doesn't the voice setting change Theremin mode?",
        a: "Theremin mode always uses a sine wave, closest to a real theremin's tone and best for hearing fine pitch differences. The voice picker affects Gesture mode only.",
      },
      {
        q: "Can I add reverb or other effects?",
        a: "No. The instrument is deliberately a small set of oscillators plus a filter. For effects, export with the global recorder and process the file in audio software.",
      },
      {
        q: "Does changing the voice affect loops I already recorded?",
        a: "No. Each loop step stores its own voice and plays back with it, so existing loops keep their sound when you switch the live voice.",
      },
      {
        q: "What's the best voice for learning?",
        a: "Bright. It's harmonically full, so chord changes and voicing differences are easiest to hear, especially on laptop speakers.",
      },
      {
        q: "Why does the filter sound different at the extremes?",
        a: "Resonance rises with the sweep, so the fully open and fully closed positions have a peaked, slightly vocal quality. That's the filter design, not a bug.",
      },
    ],
  },
  {
    slug: "ways-to-loop-and-record",
    title: "4 Ways to Loop and Record in WaveHand",
    description:
      "WaveHand's looping and recording tools, what each one is actually for, how they differ from a hardware loop pedal, and a workflow that uses all four together.",
    intro: [
      "WaveHand has two separate recording systems, and understanding why there are two is the key to using either well. The loop pedal records editable steps — parameters, not sound — for building an arrangement you perform over. The global recorder captures the actual mixed audio for export. One is for making; the other is for keeping.",
      "If you've used a hardware loop pedal, the model is familiar: record a part, let it repeat, layer more. The differences are that WaveHand's loops are editable after the fact, there's no foot switch (transport is on screen), and it only records what WaveHand itself plays — it never requests a microphone.",
      "The four items below are the things you can actually do. The FAQ covers the questions that come up once you start.",
      "A practical workflow that uses all four: set a slow tempo, record a four-chord progression on track one, fix any late changes in the beat grid, then record a bassline in Theremin mode on track two. Mute and solo to balance them. Start the global recorder, improvise in Gesture mode over both tracks for a few cycles, stop, and download. You've gone from nothing to a finished, layered recording with one pair of hands and no hardware. Each step is covered in detail below.",
      "The constraints are worth stating up front so they don't surprise you mid-session. Resolution is four steps per beat, so very fast ornaments are approximated. Four tracks is the maximum. Loops exist only in the current session — reloading the page clears them, which is why the global recorder exists. And the looper captures gestures, so there's nothing to loop if your hands aren't in frame.",
    ],
    items: [
      {
        title: "Record a track on the loop pedal",
        description:
          "Capture what you play, gesture and all, onto one of four tracks, step by step, synced to the beat grid. Turn on the sequencer in Settings, set tempo, bar count, and beats per bar, pick a track, and press record. A one-bar count-in plays so you know when the first step lands, then recording runs for the configured length and stops on its own. Each step stores the notes, volume, filter position, mode, and voice that were active, at four steps per beat. On playback the steps are re-rendered into audio with same-chord runs merged into sustained notes, so a held chord doesn't stutter.",
      },
      {
        title: "Mute and solo tracks live",
        description:
          "Each of the four loop tracks can be muted or soloed independently while playing, letting you build and strip back an arrangement on the fly. Mute everything but the bass to rebuild a texture from the bottom up. Solo a single track to check a part in isolation, then bring the others back. Because all four tracks share one tempo and bar grid, they stay aligned no matter which combination is audible. Per-track volume lets you balance a quiet pad against a prominent lead without re-recording either.",
      },
      {
        title: "Play live over your own loop",
        description:
          "Loop playback continues in the background while you keep performing on top — in Gesture or Theremin mode, over your own recorded progression. This is the point of looping: a single pair of hands can only hold one chord, but with a loop running you can play a melody over your own chords, or chords over your own bassline. Loops keep running when you switch browser tabs in most cases, thanks to a background audio keepalive. The live synth and the loop tracks go to the same output bus, so they mix naturally.",
      },
      {
        title: "Export the full mix",
        description:
          "The global recorder captures the actual combined audio output — your loops and live playing together — as a real, downloadable audio file. Start it, perform over your loop, stop it, and a WebM audio file is offered for download. Nothing is uploaded; recording happens entirely in your browser. This is how you keep a performance, since loop tracks themselves live only in the session. To keep just the loop, record one full cycle with nothing played live on top. Convert to WAV or MP3 with any audio tool if you need another format.",
      },
    ],
    faq: [
      {
        q: "What's the difference between the loop pedal and the global recorder?",
        a: "The loop pedal records editable steps for building arrangements. The global recorder captures the final mixed audio as a downloadable file. Use the first to make, the second to keep.",
      },
      {
        q: "Can I fix a wrong chord in a loop?",
        a: "Yes. Open the beat grid to toggle steps, place a chord on a specific step, or drag to paint a chord across steps — no re-recording needed.",
      },
      {
        q: "Can I loop my voice or an external instrument?",
        a: "No. WaveHand loops only what it plays itself and never requests microphone access. For external audio, use a hardware or software audio looper.",
      },
      {
        q: "How many tracks and how long can a loop be?",
        a: "Four tracks. Loop length is set by bar count and beats per bar at the chosen tempo, all shared across tracks.",
      },
      {
        q: "Does the loop keep playing if I switch tabs?",
        a: "Usually. A muted background audio element and automatic context resume keep most browsers from suspending playback. It isn't guaranteed on every browser.",
      },
      {
        q: "What file format does the export use?",
        a: "WebM audio, the browser's native recording format. Most audio tools open it directly.",
      },
    ],
  },
  {
    slug: "tips-for-better-hand-tracking",
    title: "6 Tips for Better Hand Tracking",
    description:
      "Practical, real tips for getting more consistent gesture detection out of WaveHand's webcam tracking — what actually affects the hand-tracking model and what doesn't.",
    intro: [
      "Almost every inconsistent-chord complaint traces back to the camera's view of your hands, not to a setting. The hand-tracking model finds 21 landmarks per hand by looking for the hand's shape against its background; anything that makes that shape harder to see — poor light, clutter, cropping, overlap — degrades the landmarks, and WaveHand's gesture tests inherit that degradation. There's no calibration step and no per-user tuning, so the fix is always in the physical setup.",
      "The good news is that the setup fixes are simple and mostly free. These six tips cover the things that genuinely matter, in roughly the order they're worth checking. Most people only need the first two.",
      "One honest caveat: single-camera hand tracking has limits no setup can remove. Fingers that overlap from the camera's point of view, or a hand turned edge-on, will always be harder to read. Good setup makes the common cases reliable; it doesn't make the hard cases easy.",
      "A quick way to test your setup before adjusting anything: switch to Theremin mode and hold your right hand still at chest height. Theremin mode has no stabilizer, so the pitch you hear is the raw tracking. A steady tone means the camera is seeing your hand cleanly. A wobbling or jumping tone means noise, and the tips below are the fixes, roughly in order of how often each one is the cause.",
      "Also worth knowing what the HUD can tell you. In Gesture mode it shows the detected chord and quality; if those flicker while your hand is still, a finger is near a threshold or the tracking is noisy. If they read \"--\" with your hand clearly raised, the hand isn't being detected at all — usually framing or light. Treat the HUD as a mirror for what the camera sees rather than what you intend.",
    ],
    items: [
      {
        title: "Use even, front-facing light",
        description:
          "Hand tracking reads contrast between your hand and the background — a bright window behind you works against it far more than a lamp in front of you. Backlighting turns your hand into a silhouette and the model loses the finger edges it needs. Face a window or put a lamp beside your screen so light falls on your palms. Avoid strong single-point light that casts hard shadows across the fingers; a soft, diffuse source is best. This one change fixes the majority of tracking problems.",
      },
      {
        title: "Keep both hands fully in frame",
        description:
          "A hand that's partially cropped out of the camera view is far harder to track reliably than one that's simply a bit small in the frame. The model needs to see the whole hand to place its landmarks; a hand cut off at the wrist or with fingers out of frame produces unstable estimates. Sit back far enough that both hands, raised, fit comfortably inside the camera's view with margin. If your camera is narrow, consider where your hands naturally rest and adjust your chair rather than your gestures.",
      },
      {
        title: "Use Chrome or Edge",
        description:
          "These are the recommended browsers for WaveHand's camera and audio APIs — other browsers may work less reliably. The hand-tracking model runs on the GPU where available, and Chrome and Edge have the most consistent WebGL and media-stream support. If you're on another browser and tracking is poor, try one of these before changing anything else. Also keep the browser tab in the foreground while playing; background tabs may throttle the camera feed.",
      },
      {
        title: "Don't worry about exact distance",
        description:
          "What matters most is that your fingers are visually distinguishable from each other, not your exact distance from the camera. Finger detection compares each fingertip to its own knuckle, and tilt is normalized to hand width, so the gestures work the same whether your hand is large or small in the frame. Too close and your hand may leave the frame when raised; too far and fingers blur together. Anywhere in between is fine. Arm's length from a laptop is a good default.",
      },
      {
        title: "Give it a moment after a hand leaves frame",
        description:
          "A brief tracking loss holds the last chord for a short grace period rather than cutting out instantly — a flicker isn't a bug. If you reach for something and the chord sustains for a fraction of a second, that's the stabilizer doing its job. A chord that lingers much longer than that after your hand is clearly gone usually means the camera feed has frozen; reload the page. In Theremin mode there's no stabilizer, so pitch follows your hand raw — that's intentional, and it's a good diagnostic for tracking noise.",
      },
      {
        title: "Check for competing camera use",
        description:
          "Most browsers only allow one tab or app to use the camera at a time — another app holding it open will block WaveHand from starting. If the start screen shows a camera error, close video-call apps and other browser tabs that might have the camera, then reload. Also check that you granted permission when the browser asked; a denied permission has to be reset in the browser's site settings, not in WaveHand. Once the camera starts, a cluttered or moving background (other people, a TV) can confuse the model — a plain wall behind you helps.",
      },
    ],
    faq: [
      {
        q: "Why do my chords flicker even in good light?",
        a: "Usually a finger is held halfway, right at the raised/lowered threshold. Make gestures decisive — fully up or fully down. Good light reduces noise; it can't resolve a genuinely ambiguous shape.",
      },
      {
        q: "Is there a calibration step?",
        a: "No. Tracking is the same for everyone. If it feels consistently off, adjust light, framing, and background rather than looking for a setting.",
      },
      {
        q: "Does a better webcam help?",
        a: "Somewhat. Higher resolution and better low-light performance give the model cleaner input. But lighting and framing matter more than camera quality for most people.",
      },
      {
        q: "Why is tracking worse at night?",
        a: "Less ambient light means less contrast between your hand and the background. Add a lamp in front of you; it makes a larger difference than any other change.",
      },
      {
        q: "Can I use an external webcam?",
        a: "Yes. The browser will use whichever camera it's given permission for. Position it at roughly screen height facing you.",
      },
      {
        q: "Why does my camera light stay on after I close the tab?",
        a: "It shouldn't. WaveHand stops the camera stream on unmount. If the light stays on, another tab or app is likely using the camera.",
      },
    ],
  },
  {
    slug: "settings-if-gestures-feel-overwhelming",
    title: "5 Settings to Try if Gesture Controls Feel Overwhelming",
    description:
      "Real, working settings in WaveHand for simplifying the default four-gesture control scheme — what each does, who it helps, and a path from simplified to full control.",
    image: {
      src: "/screenshots/wavehand-settings-sheet.png",
      alt: "WaveHand's Settings sheet showing the Left hand and Right hand control options",
    },
    intro: [
      "WaveHand's default controls ask both hands to do two things each, simultaneously. That's expressive once it's automatic and overwhelming before it is. The Settings sheet exists to turn parts of it off — not as a dumbed-down mode, but by holding one of the gesture engine's inputs constant so you can focus on the rest.",
      "These settings also matter for accessibility. A gesture that one person finds easy another may find tiring or impossible. Fixing that gesture to a constant removes it as a requirement without changing anything about how the instrument sounds. The same five settings serve both purposes.",
      "The order below is a reasonable path: start with the first two, add the others as needed, and un-fix controls one at a time as the simpler version becomes automatic.",
      "Why simplification works here specifically: the gesture engine reads four independent signals every frame and combines them into one chord. When you fix a signal, the detection still runs but a constant is substituted for that one field before the chord is formed. The result is indistinguishable from performing that gesture perfectly every time. So a beginner with two controls fixed is playing the same instrument as an expert — they've just delegated two of the four decisions to a setting. Nothing is hidden and nothing is downgraded.",
      "All five settings persist in your browser between sessions, so you configure once and the instrument stays that way. If you share a computer, remember the settings are per browser profile, not per person.",
    ],
    items: [
      {
        title: "Fix the mode to major or minor",
        description:
          "Turns off left-hand wrist tilt as a control, so you're only choosing a chord degree, not degree and mode at once. In Settings, change Left hand from the default to Fixed and pick major or minor. Tilt is the hardest gesture to hold steady because it's continuous and relative — a slight unintentional rotation flips you between worlds mid-chord. Locking it removes that whole failure mode while you learn the finger counts. The chord you get with mode fixed to major is identical to the chord you'd get with tilt held perfectly flat; nothing about the sound changes.",
      },
      {
        title: "Fix the quality",
        description:
          "Turns off right-hand finger count as a voicing control, so every chord plays the same fixed triad or inversion. In Settings, change Right hand to Fixed and pick a voicing. Your right hand then controls only volume (height), tone (tilt), and octave (thumb), and you can hold it in a relaxed open position. This pairs well with fixing the mode: with both fixed, you have one job — pick a degree with the left hand — and the instrument becomes genuinely easy to start on.",
      },
      {
        title: "Start in Theremin mode",
        description:
          "Only two simple, continuous controls (volume and pitch) instead of Gesture mode's four independent inputs. No finger counts, no tilt switching, no voicing. Left hand height is volume, right hand height is pitch, and that's the whole instrument. It's a different skill from chords, but it's a gentle way to get comfortable with having your hands in front of a camera and seeing them affect sound before adding the complexity of Gesture mode.",
      },
      {
        title: "Turn off the sequencer",
        description:
          "The loop pedal and beat grid stay hidden by default until you explicitly turn them on in Settings — one less thing on screen while you're learning. The sequencer is powerful but visually busy, and its transport controls aren't needed for learning chords. Leave it off until you're ready to record loops, then turn it on with the single checkbox. The HUD, Settings, Learn mode, and both instrument modes all work fully with the sequencer hidden.",
      },
      {
        title: "Replay the tutorial",
        description:
          "The first-visit walkthrough is always available again from Help, in case you want a refresher on what each hand actually does. It steps through camera and sound setup, the left-hand degree shapes, the right-hand controls, and the modes, in a few short screens. Replaying it after fixing controls in Settings can be useful: you'll see the full gesture set described while playing the simplified version, which makes it clearer what you'll add back later.",
      },
    ],
    faq: [
      {
        q: "Do these settings make the instrument sound different?",
        a: "No. Fixing a control holds one gesture input constant. The gesture engine is the same; the chord with mode fixed to major is exactly the chord you'd play with tilt held flat.",
      },
      {
        q: "Which should I change first?",
        a: "Fix the left hand's mode. Wrist tilt is the gesture most likely to misfire while learning, and locking it immediately makes chords more predictable.",
      },
      {
        q: "Can I use Learn mode with controls fixed?",
        a: "Yes. A fixed dimension matches its target automatically, so guided practice on real songs works at every simplification level.",
      },
      {
        q: "Are these settings saved?",
        a: "Yes, locally in your browser, along with key and voice. They'll be the same next time you open WaveHand.",
      },
      {
        q: "Is there a dedicated accessibility mode?",
        a: "No, deliberately. The same fixed-control settings that help beginners also remove the requirement to perform a gesture someone can't make, with no separate mode needed.",
      },
      {
        q: "How do I know when to un-fix a control?",
        a: "When the simplified version feels automatic — you hit any degree without thinking. Then unfix one dimension, practice it alone, and repeat.",
      },
    ],
  },
  {
    slug: "things-you-need-before-you-start",
    title: "4 Things You Need Before You Start Playing WaveHand",
    description:
      "The real, minimal requirements to run WaveHand — browser, camera, secure connection, and nothing else — plus what each one is for and what to do if one isn't available.",
    image: {
      src: "/screenshots/wavehand-start-screen.png",
      alt: "WaveHand's start screen with the Click to enable audio button",
    },
    intro: [
      "WaveHand is deliberately light on requirements. There's no app to install, no account to create, no instrument to own, and no microphone to grant. The list below is complete: if you have these four things, you can play. If you're missing one, the notes explain why it's needed and whether there's a workaround.",
      "Each requirement exists for a specific technical reason, mostly to do with how browsers handle cameras and audio. Knowing the reason helps when something doesn't work — the error is almost always one of these four.",
      "What happens on first load, so the requirements make sense in order. The page itself is small and arrives quickly. When you reach the start screen, the browser asks for camera permission — that's requirement two, and it only works on a secure connection, requirement three. Once granted, WaveHand downloads the hand-tracking model from a public content network and initializes it on your GPU through WebGL — the browser support that makes requirement one matter. Then you click to enable audio, which the browser requires to be a user gesture, and the instrument is live. Nothing in that sequence creates an account or installs anything, which is requirement four.",
      "If you've met all four and something still doesn't work, the start screen shows the specific error: a camera permission problem, a camera already in use elsewhere, or a browser that lacks the camera API. Each of those maps directly to one of the items below.",
    ],
    items: [
      {
        title: "Chrome or Edge",
        description:
          "The recommended browsers for WaveHand's camera and Web Audio APIs. The hand-tracking model uses WebGL to run on your GPU, the instrument uses the Web Audio API for sound, and the camera uses the media-stream API — Chrome and Edge have the most consistent support for all three together. Other modern browsers may work but aren't the primary target; if you're on one and something's off, try Chrome or Edge before anything else. A recent version matters more than which of the two you pick.",
      },
      {
        title: "A webcam",
        description:
          "Required for all hand tracking — WaveHand never requests microphone access, only camera. A laptop's built-in camera is fine; an external webcam at roughly screen height facing you is also fine. Resolution matters less than lighting. The camera needs to see both hands fully when raised, so sit far enough back for that. If the camera is in use by another app or tab, WaveHand can't start; close the other one and reload.",
      },
      {
        title: "HTTPS or localhost",
        description:
          "Browsers only allow camera access on a secure origin — this is a browser rule that applies to any site requesting a webcam, not something specific to WaveHand. The live site is served over HTTPS, so this is automatic for normal use. It only matters if you run WaveHand yourself from source: a plain http:// address on a local network will be refused camera access, which is why the development server uses a self-signed HTTPS certificate.",
      },
      {
        title: "Nothing else",
        description:
          "No install, no account, and no download — open the site, grant camera permission, and start playing. No microphone, no MIDI hardware, no instrument, no plugin. Community songs for Learn mode are fetched from a public, read-only source and don't require signing in. Your settings and practice progress are saved locally in your browser, not on a server. If you've used chord-practice tools that needed an account or a download first, this is the opposite by design.",
      },
    ],
    faq: [
      {
        q: "Does it work on a phone?",
        a: "It isn't blocked, but it isn't the primary design target. You need to see both raised hands in frame on a screen you aren't holding, which works better on a laptop or desktop.",
      },
      {
        q: "Why does it ask for camera permission?",
        a: "Hand tracking needs to see your hands. The video is processed on your device and never uploaded. Microphone permission is never requested.",
      },
      {
        q: "I denied camera access by mistake — how do I fix it?",
        a: "Reset the permission in your browser's site settings for the WaveHand page, then reload. WaveHand can't re-prompt after a denial; only the browser can.",
      },
      {
        q: "Do I need headphones?",
        a: "No. Speakers are fine. Headphones help if you want to practice quietly or hear fine pitch differences in Theremin mode.",
      },
      {
        q: "Does it work offline?",
        a: "Not currently. The hand-tracking model and fonts load from the network on first start, and community songs need a connection.",
      },
      {
        q: "Is there anything to download?",
        a: "No. It runs entirely in the browser tab.",
      },
    ],
  },
  {
    slug: "ways-to-learn-a-song-faster",
    title: "5 Ways to Learn a Song Faster in WaveHand",
    description:
      "Real features inside Learn mode that make picking up a new song faster — not just a chord chart on a timer — and how to use them deliberately.",
    intro: [
      "Searches for how to learn chords fast usually get generic advice: practice slowly, repeat the hard parts, don't rush. That advice is right, and Learn mode is built to make each piece of it concrete. It shows you exactly what to play, waits until you've played it, lets you repeat the part you're stuck on, and remembers where you got to.",
      "The five items below are features that exist in Learn mode today. Each maps to a specific piece of practice advice, and together they form a reasonable method: get the shapes right first, add tempo second, repeat deliberately, skip what's blocking you, come back tomorrow.",
      "Songs come from a community library of arrangements, so what you're learning are real progressions from real songs. Open the song picker from the HUD, or follow a shared link to a specific arrangement.",
      "A suggested session shape, using the five below in order: pick a song and let the chart wait while you find each shape in the first section, metronome off. Once you can get through the section, turn the metronome on and repeat it with tempo. Repeat the section two or three more times. If one chord keeps stopping you, skip it, finish the section, then jump back to that section and attack the hard chord with the rest already familiar. Stop while your gestures are still clean; your completed sections are saved for tomorrow.",
      "One thing Learn mode will not do is play the song to you. There's no demo playback. If you want to hear a progression before learning it, play it in free play first — or practice the section until you've heard it yourself, which is a better way to learn it anyway.",
    ],
    items: [
      {
        title: "Let the chart wait for you",
        description:
          "Learn mode only advances once your hands actually match the target — degree, mode, quality, and octave — so you're never rushed past a shape you haven't found yet. The on-screen chips show which of the four components match, so you fix exactly what's wrong instead of guessing. A brief hold is required before a match counts, so a passing gesture can't trigger an advance you didn't mean. This is the single biggest difference from a scrolling chart: the song moves at your pace, not the metronome's.",
      },
      {
        title: "Use the practice metronome",
        description:
          "It waits until your first correct chord before it starts, so you're never keeping time before you've actually found the first note. Once running, it gives you the song's tempo to play against. Turn it on from the metronome button in the practice panel, adjust its volume, or leave it off entirely while you're still finding shapes. Adding tempo is the second stage of learning a passage, after the shapes are right — the metronome's delayed start is designed around that order.",
      },
      {
        title: "Repeat a section",
        description:
          "Jump back to the start of the current section instead of restarting the whole song when one part needs more reps. Songs are split into sections of a few bars; when a section finishes, you can repeat it or move on. The section pills at the top let you jump directly to any section, so you can spend a whole session on the bridge without playing the verses to get there. Deliberate repetition of the hard part is how passages actually get learned.",
      },
      {
        title: "Skip a chord you're stuck on",
        description:
          "Move past a single difficult chord without losing your place in the rest of the chart. Skipped chords are marked separately from matched ones, so you know what to come back to. This keeps one hard change from blocking the whole song — you can learn everything around it, then return to the hard chord with the rest of the section already familiar. It's the Learn mode equivalent of playing through a mistake in a rehearsal rather than stopping every time.",
      },
      {
        title: "Come back later — your progress is saved",
        description:
          "Completed sections are remembered per song across visits, so a song you've partly learned shows that progress next time you open it. The song picker badges songs you've practiced with a count of completed sections. Learning in several short sessions beats one long one: hand tracking rewards clean gestures, and gestures get sloppy with fatigue. Progress is stored locally in your browser; nothing is uploaded.",
      },
    ],
    faq: [
      {
        q: "Why doesn't the chart advance when I play the chord?",
        a: "One of the four components (degree, mode, quality, octave) is still wrong — the chips show which — or you haven't held the correct shape long enough yet.",
      },
      {
        q: "Why is there no sound for wrong chords in Learn mode?",
        a: "By design. Audio is gated on a full match so the first thing you hear is the correct chord. Free play always sounds.",
      },
      {
        q: "Can I practice a song in a different key?",
        a: "Learn mode uses the arrangement's own key. Your saved key setting is restored when you exit practice.",
      },
      {
        q: "Does skipping a chord count against me?",
        a: "No. Skipped chords are marked distinctly so you can revisit them, but there's no score or penalty.",
      },
      {
        q: "Where do the songs come from?",
        a: "A community library of published arrangements. Only arrangements their authors marked public are listed.",
      },
      {
        q: "Can I use Learn mode with simplified controls?",
        a: "Yes. If you've fixed mode or quality in Settings, that component matches automatically, so guided practice still works.",
      },
    ],
  },
  {
    slug: "instruments-that-inspired-wavehand",
    title: "6 Real Instruments That Inspired WaveHand's Two Modes",
    description:
      "WaveHand's two modes both descend from real instrument traditions — here's the actual lineage, what each ancestor contributed, and what got left behind.",
    intro: [
      "Nothing about WaveHand is new in the sense of having no precedent. Touchless control, chord-button instruments, filter sweeps, looping, and the separation of pitch from expression are all old ideas. What's new is the input device — a webcam — and the fact that all of them run in a browser tab at once.",
      "Tracing the lineage is useful for more than trivia. Each ancestor explains a design choice: why Theremin mode has no stabilizer, why the left hand picks degrees rather than notes, why the filter is on a continuous gesture. The six below are the ones that most directly shaped the instrument. Only publicly documented history is stated; where a date or name is given, it's the commonly cited one.",
      "There's a pattern across all six. Each ancestor separated something that an earlier instrument had bundled together: the theremin separated playing from touching, the chord organ separated chords from individual notes, MIDI separated the controller from the sound source, the loop pedal separated performance from accompaniment. WaveHand sits at the end of that line, separating the input device from any physical object at all. Its design question was never \"what can a camera do?\" but \"which of these existing separations does a camera make possible at once?\"",
      "What WaveHand doesn't inherit is also worth naming. There's no sampled acoustic instrument, no drum machine, no sequencer in the traditional step-programming sense beyond the beat grid, and no MIDI output. Those omissions are deliberate: the instrument is small enough to learn in a sitting because it took one idea from each ancestor and left the rest.",
    ],
    items: [
      {
        title: "The theremin (1920s)",
        description:
          "Invented by Leon Theremin, demonstrated in 1920 and patented in 1928, the original touchless instrument — two antennas read hand position in open air to control pitch and volume, the direct ancestor of WaveHand's Theremin mode. The two-hand split (one hand pitch, one hand volume), the continuous gliding pitch, and the by-ear playing skill all carry over. What got left behind: the spherical pitch field around a physical antenna. A camera sees two dimensions, so WaveHand maps pitch to vertical height only — a simplification that also makes it easier to learn.",
      },
      {
        title: "The keyboard and its scale degrees",
        description:
          "The Roman-numeral chord system Gesture mode's left hand uses (I–VII) comes straight from centuries of keyboard and functional harmony theory. Numerals describe a chord's role in a key rather than a fixed pitch, which is why the same WaveHand gesture gives the right chord in any key. The keyboard also contributed the idea of inversions and sevenths as distinct voicings of the same chord, which the right hand's finger count selects. Left behind: individual note selection. WaveHand plays chords, not single keys.",
      },
      {
        title: "The chord organ",
        description:
          "Chord-button instruments that play a full triad from one hand shape, rather than individual notes, share the same core idea as Gesture mode's left hand. Home chord organs of the mid-twentieth century had labeled buttons for each chord so a player could accompany a melody without learning voicings. WaveHand's left hand is a chord-button instrument where the buttons are finger counts. Left behind: the fixed set of chords per instrument — WaveHand's buttons move with the key.",
      },
      {
        title: "The synthesizer filter sweep",
        description:
          "Sweeping a low-pass filter with a physical knob is a classic analog-synth technique — Gesture mode's right-hand wrist tilt does the same thing with a hand instead of a knob. The rising resonance as the filter moves, the way a slow sweep over a sustained chord becomes an expressive gesture in itself, the four basic waveforms in the voice picker — all of this is standard subtractive synthesis, directly inherited. Left behind: envelopes, LFOs, and effects. WaveHand keeps the oscillator-plus-filter core and nothing more.",
      },
      {
        title: "The loop pedal",
        description:
          "Guitar and vocal loop pedals — record a phrase, layer live performance on top — are the direct model for WaveHand's own 4-track looper. The workflow is the same: record, repeat, layer, mute and solo parts, perform over the result. What's different: WaveHand records editable steps rather than audio, so loops can be fixed after the fact, and transport is on screen rather than under a foot. Left behind: looping external sound. WaveHand loops only itself.",
      },
      {
        title: "MIDI itself",
        description:
          "The idea of separating \"what note\" from \"how it's played\" (velocity, modulation) underlies both MIDI and WaveHand's split between chord degree and voicing/tone controls. MIDI formalized the notion that an instrument's input device and its sound source are independent — a keyboard can drive any synth. WaveHand's hands-and-camera input drives its own synth through exactly that kind of separation, and the community arrangement format it reads for Learn mode is MIDI-based. Left behind: MIDI output. WaveHand doesn't currently send MIDI to other software.",
      },
    ],
    faq: [
      {
        q: "Is WaveHand a theremin?",
        a: "Theremin mode is modeled on one — two-hand pitch and volume control by ear. It differs in using a camera (height only, not distance in all directions), having small latency, and using a clean sine tone.",
      },
      {
        q: "Who invented the theremin?",
        a: "Leon Theremin, a Russian physicist, demonstrated it in 1920 and patented it in 1928.",
      },
      {
        q: "What's a chord organ?",
        a: "A home keyboard instrument with labeled buttons that each play a full chord, popular in the mid-twentieth century for easy accompaniment. WaveHand's left hand works on the same principle.",
      },
      {
        q: "Does WaveHand send MIDI?",
        a: "Not currently. It's conceptually MIDI-like (input separated from sound source) and reads MIDI-based arrangements, but has no MIDI output.",
      },
      {
        q: "Why does Theremin mode have no stabilizer?",
        a: "Because a theremin's expressiveness comes from small, fast hand movements — vibrato, slides — that smoothing would remove. Gesture mode's stabilizer would defeat the point.",
      },
      {
        q: "What's subtractive synthesis?",
        a: "Starting with a harmonically rich waveform and removing frequencies with a filter. WaveHand's oscillators plus low-pass filter is the simplest form of it.",
      },
    ],
  },
  {
    slug: "ways-wavehand-protects-your-privacy",
    title: "5 Ways WaveHand Keeps Your Privacy in Mind",
    description:
      "Real, verifiable choices in how WaveHand handles a webcam-based instrument's biggest inherent privacy question — each one checkable against the actual code.",
    intro: [
      "A webcam instrument has an obvious privacy question built in: what happens to the video? For WaveHand the answer is simple — it never leaves your device — but \"trust us\" isn't a good answer, so this page lists the specific, checkable choices behind it. Every item below describes something you can verify in the app's public source code, not a policy statement.",
      "Two things WaveHand does use are disclosed plainly in the Privacy Policy: Google Analytics for page usage and Google AdSense for ads, both of which set cookies under Google's policies. Those are standard for a free website and are separate from the camera question. This page is about the camera, the microphone, and the data the instrument itself touches.",
      "Why on-device processing is the whole story, technically: the hand-tracking model is a file the browser downloads once, then runs locally using your graphics hardware through WebGL. Each camera frame goes from the camera to the browser's video element to the model and back out as 21 landmark coordinates — all inside the browser process, on your machine. There is no step where a frame is encoded and sent over the network, because there is no server in the loop that would need it. The landmarks themselves are numbers that exist only in memory for the duration of a frame and are then replaced by the next frame's.",
      "If you want to confirm this rather than take it on trust, open your browser's developer tools to the Network tab while playing. After the initial model download, you'll see no outgoing requests while the camera runs. That's the verifiable version of \"your video never leaves your device.\"",
    ],
    items: [
      {
        title: "No microphone access, ever",
        description:
          "WaveHand only ever requests camera permission — it has no code path that requests or uses microphone access. The media-stream request is for video only, with audio explicitly disabled. All sound you hear is generated by the browser's Web Audio engine from your gestures; nothing is captured from a microphone, which also means the loop pedal and global recorder can only record what WaveHand itself plays. If a browser ever prompts you for microphone access on this site, something else is asking.",
      },
      {
        title: "Hand tracking runs on your device",
        description:
          "The MediaPipe hand-tracking model runs locally in your browser — your camera frames aren't uploaded anywhere to be processed. The model files are downloaded once from a public content delivery network, then inference happens on your own GPU or CPU, frame by frame, inside the tab. There is no server receiving video. The only network activity related to the camera is fetching the model itself, which contains no information about you.",
      },
      {
        title: "Sharing never captures your camera",
        description:
          "The share feature generates a generic branded image from scratch every time, rather than a screenshot of whatever your camera happens to be seeing. The card is drawn on a hidden canvas — app name, tagline, URL — and is identical for every person who shares. This was a deliberate design decision: a screenshot of a camera app is a photo of you and your room, and that should never be a side effect of a Share button. If you want to share your own playing, export audio with the global recorder, which contains no video.",
      },
      {
        title: "No account required to play",
        description:
          "The instrument itself needs no login or account — only optionally browsing community songs touches a separate, read-only data source. Settings, your chosen key and voice, and Learn mode progress are saved locally in your browser's storage, not on a server. There's nothing to sign up for and no profile being built. Clearing your browser data clears everything WaveHand stored.",
      },
      {
        title: "Read-only community data access",
        description:
          "Community song data is fetched using a public, read-only key with no ability to write or access anything beyond public arrangements. The key is the same for every visitor and is intentionally safe to expose in a browser. Server-side rules restrict it to arrangements their authors marked public. WaveHand cannot modify, delete, or publish arrangements — creating and sharing songs happens on a separate community site with its own accounts.",
      },
    ],
    faq: [
      {
        q: "Is my camera video ever sent to a server?",
        a: "No. Hand tracking runs entirely in your browser. The only camera-related network request is downloading the tracking model, which contains nothing about you.",
      },
      {
        q: "Does WaveHand use my microphone?",
        a: "Never. It requests camera-only media access and has no code that uses a microphone.",
      },
      {
        q: "What does the Share button send?",
        a: "A generated branded card (name, tagline, URL) and text. Never a screenshot or camera frame.",
      },
      {
        q: "What does WaveHand store?",
        a: "Settings and Learn mode progress, locally in your browser. Nothing on a server. Clearing site data removes it.",
      },
      {
        q: "What about cookies?",
        a: "Google Analytics and Google AdSense set cookies under Google's policies, as disclosed in the Privacy Policy. WaveHand itself sets none.",
      },
      {
        q: "Can I verify these claims?",
        a: "Yes. The source code is public on GitHub (linked from the About page). Each item above corresponds to a specific, inspectable part of it.",
      },
    ],
  },
  {
    slug: "ways-to-edit-the-beat-grid-by-hand",
    title: "4 Ways to Edit a Loop by Hand in the Beat Grid",
    description:
      "You don't have to play every step live — the beat grid lets you place, adjust, and paint chords directly, by hand. Here's each editing action and when it's the right tool.",
    intro: [
      "Because WaveHand's loop pedal records steps rather than audio, a loop is data you can edit. The beat grid is the editor: a grid of tracks by steps, four steps per beat, where each cell holds a chord or is empty. Everything you do in it is re-rendered into audio on the next playback cycle, so edits are audible almost immediately.",
      "This is what sets a step-based looper apart from a hardware pedal. On a pedal, a wrong chord means re-recording the track. Here, you fix the one cell. The four actions below are the complete set of edits; combined with live recording, they let you build loops you couldn't play in one take.",
      "Turn on the sequencer in Settings to see the beat grid. It's hidden by default to keep the play surface clean.",
      "Reading the grid: each row is a track, each column is a step, with four steps per beat and beats grouped into bars. A filled cell shows the chord name recorded or placed at that step; an empty cell is silence. During playback a highlight moves across the columns so you can see which step is sounding. Muted tracks are dimmed. The grid is live — a change to any cell is picked up on the next loop cycle without stopping playback.",
      "Steps store more than a chord name. A recorded step also carries the volume, filter position, mode, and synth voice that were active when it was played, and a hand-placed step gets the current voice with default volume. That's why a recorded step and a placed step can sit side by side and both render correctly: each one knows how it should sound.",
    ],
    items: [
      {
        title: "Place a chord on a specific step",
        description:
          "Click any empty step in the grid to open a chord picker and drop a chord in exactly that spot, without playing it live at all. The picker offers the scale degrees of the current key; the chord is placed as a root-position triad at the current synth voice, so you can lay out a progression entirely by hand before ever playing a note. Placed steps and recorded steps are the same kind of data and sound identical on playback.",
      },
      {
        title: "Toggle a step on or off",
        description:
          "Turn an existing step on or off directly, for quick edits without re-recording the whole track. Clicking a filled step silences it while keeping its chord in memory; clicking again restores it. This is the fastest way to fix a timing mistake — a chord that landed one step early — or to thin out a progression by muting alternate steps for a sparser feel. Toggling off is reversible; nothing is deleted.",
      },
      {
        title: "Drag to paint the same chord across steps",
        description:
          "Click and drag across multiple steps to fill them with the same chord in one motion, instead of placing each one individually. Start on a filled step and drag; the chord extends into every step you pass over. On playback, consecutive steps with the same chord are merged into one sustained note, so painting a chord across a whole bar produces a held chord, not four repeated attacks. This is how you lay down a chord bed quickly.",
      },
      {
        title: "Combine hand-placed and live-recorded steps",
        description:
          "Manually placed steps and steps recorded live from your actual gestures sit on the same track and play back exactly the same way. A common workflow: record a progression live with a few mistakes, then fix the wrong steps by hand. Or lay out the chord changes by hand for timing, then record a live take on another track for the expressive details — volume swells and filter sweeps that hand placement can't produce. Each step remembers the voice it was created with, so edits don't change existing steps' sounds.",
      },
    ],
    faq: [
      {
        q: "Where is the beat grid?",
        a: "Turn on Show loop sequencer in Settings. The grid and loop transport appear below the play surface.",
      },
      {
        q: "Does a hand-placed chord sound different from a recorded one?",
        a: "No. Both are steps with the same data and render identically. Placed chords are root-position triads at the current voice; recorded steps carry whatever voicing, volume, and filter you played.",
      },
      {
        q: "Can I undo an edit?",
        a: "Toggling a step off is reversible by toggling it back on. There's no multi-step undo history; edits are immediate.",
      },
      {
        q: "Why does painting a chord across steps sound like one note?",
        a: "Consecutive steps with the same chord are merged into a single sustained note on playback, with smooth attack and release, so it doesn't stutter.",
      },
      {
        q: "Can I edit a loop while it's playing?",
        a: "Yes. Edits are re-rendered and heard on the next loop cycle.",
      },
      {
        q: "Can I copy a track or move steps between tracks?",
        a: "Not currently. Editing is per-step within a track: place, toggle, and paint.",
      },
    ],
  },
]

export function getListicle(slug: string): Listicle | undefined {
  return LISTICLES.find((l) => l.slug === slug)
}
