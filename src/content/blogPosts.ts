import type { BlogPost } from "./contentTypes"

// Adding a post? sitemap.xml is generated automatically (scripts/generate-sitemap.mjs) —
// just add its URL to public/llms.txt in the same change.

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-mediapipe-reads-your-hands",
    title: "How MediaPipe Turns Your Camera Into a Chord Controller",
    description:
      "A look at the actual signals WaveHand reads off your hands — finger position, wrist tilt, and thumb angle — and how they become chords, with the real limitations of hand-tracking music software.",
    date: "2026-08-01",
    image: {
      src: "/screenshots/wavehand-chord-wheel-hud.png",
      alt: "WaveHand's HUD with the scale-note wheel, showing which finger count on the left hand selects each chord degree",
    },
    sections: [
      {
        heading: "What hand tracking actually gives you",
        paragraphs: [
          "WaveHand doesn't track your whole hand as one blob. It uses MediaPipe's hand landmark model, which returns 21 individual points per hand — fingertips, each finger joint, and the wrist — every frame, as normalized coordinates in the camera image. Each point has an x and y position between 0 and 1 (relative to the frame width and height), plus a depth estimate. That's the entire raw input: twenty-one dots per hand, refreshed many times a second.",
          "Everything musical in WaveHand is built on top of those dots. There's no separate \"chord recognition\" model, no training step where you teach it your hands, no neural network guessing what you meant to play. A handful of geometric comparisons between landmark positions produce a small set of discrete signals, and those signals drive the synthesizer exactly the way key presses would drive a MIDI keyboard. If you've ever wondered what \"hand tracking music software\" actually does under the hood, this is it — the vision model finds the points, and simple arithmetic turns them into music.",
          "That design choice matters. Because the mapping is deterministic, the same hand shape always produces the same chord in a given key. You can learn it the way you'd learn chord shapes on a guitar, and it will never surprise you with a different interpretation of the same gesture.",
        ],
      },
      {
        heading: "How a raised finger is detected",
        paragraphs: [
          "Whether a finger is \"raised\" is decided with one comparison: if a fingertip landmark sits higher in the frame than the knuckle (the PIP joint) just below it, that finger counts as up. For the index, middle, ring, and pinky fingers, WaveHand compares the tip's y coordinate against the second knuckle's y coordinate. Smaller y means higher on screen, so tip above knuckle equals extended finger.",
          "Do that for four fingers and you get a raised-finger count from zero to four. On the left hand that count — plus the thumb — selects a chord degree: one through five fingers map to chords I through V, index-plus-pinky reaches VI, and index-plus-pinky-plus-thumb reaches VII. On the right hand the same finger count selects a voicing: one finger is a plain triad, two is a first inversion, three is a seventh chord, four is a dominant or diminished seventh depending on whether you're in a major or minor world.",
          "The reason a simple vertical comparison works is that MediaPipe's landmarks already account for the hand's orientation in the image. You're not comparing against an absolute height; you're comparing a tip against its own knuckle, so the test holds whether your hand is high or low in the frame, large or small, close to the camera or further away.",
        ],
      },
      {
        heading: "Why the thumb is a special case",
        paragraphs: [
          "Thumb detection works differently, because a thumb doesn't fold the same way the other fingers do — it moves sideways across the palm rather than curling down toward it. Comparing the thumb tip's height against a knuckle would give meaningless results. Instead, WaveHand compares the thumb tip's horizontal position to the joint below it (the IP joint).",
          "The direction of that comparison flips depending on which hand it is. A thumb extending outward on a right hand moves toward larger x values; on a left hand it moves toward smaller x values. MediaPipe reports handedness along with the landmarks, so WaveHand knows which rule to apply. On the right hand, an extended thumb drops the chord down an octave. On the left hand, it's the extra signal that distinguishes the VII chord from the VI chord.",
          "This is also why mirrored webcams don't break anything. The handedness label comes from the model, not from which side of the frame the hand appears on, so the thumb rule stays correct even when the preview looks flipped.",
        ],
      },
      {
        heading: "Wrist tilt: the continuous signal",
        paragraphs: [
          "Finger counts are discrete — a finger is either up or down. Wrist tilt is different: it's a continuous value from -1 to 1, read by comparing the wrist landmark's position against landmarks further up the hand (the middle and ring finger knuckles). A hand held flat reads close to zero. Tilt it one way and the value moves toward -1; tilt the other way and it moves toward 1.",
          "On the left hand, the sign of that value decides major versus minor. On the right hand, the magnitude sweeps a low-pass filter: tilt one way to darken the tone, the other way to open it up. Because it's continuous, the right-hand filter sweep feels like turning a knob rather than flipping a switch, which is what makes it expressive.",
          "There's one subtlety here. The tilt reading is normalized against the hand's own width (the distance between knuckles), so a small hand and a large hand produce the same tilt value for the same angle. Without that normalization, people with smaller hands would have to tilt more aggressively to hit the same filter position, which would be an unfair and confusing control.",
        ],
      },
      {
        heading: "The stabilizer that keeps chords from flickering",
        paragraphs: [
          "None of these readings are perfectly stable frame to frame. A slight hand tremor, a finger that briefly crosses another, or a frame where the camera loses a fingertip can flip a raw reading for a single frame, even while your hand hasn't actually moved. If WaveHand played audio straight from the raw per-frame reading, chords would stutter constantly.",
          "So every candidate chord runs through a small stabilizer before it's allowed to change the sound. A new chord has to stay identical across a short hold window before it \"commits\" and becomes what you hear. If your hand briefly leaves the frame, the last committed chord holds for a short grace period instead of cutting out instantly. A one-frame blip that doesn't repeat never gets the chance to commit.",
          "Both windows are deliberately short — tens of milliseconds, not hundreds. Too long and the instrument feels laggy; too short and noise gets through. The current values are tuned so that you should never consciously notice the stabilizer exists, only that chords click into place rather than glitching when you move slightly.",
        ],
      },
      {
        heading: "Where this approach has real limits",
        paragraphs: [
          "Hand tracking from a single webcam has honest limitations, and it's worth knowing them before you blame yourself for a missed chord. The model needs to see your fingers. If two fingers overlap from the camera's point of view, or your hand is turned edge-on, the landmark estimates for the hidden parts get worse. WaveHand's finger-raised test will sometimes misread a partially hidden finger.",
          "Lighting matters more than distance. The model works by finding contrast between your hand and the background. A bright window behind you, or a background that matches your skin tone, will degrade tracking in a way that no setting can fix. Even, front-facing light is the single biggest improvement most people can make.",
          "And there's no calibration step — the tracking is the same for everyone, which is a feature (nothing to set up) but also means it can't adapt to unusual hand proportions or a camera mounted at a strange angle. If tracking feels consistently off, the fix is in your physical setup, not in the software.",
        ],
      },
      {
        heading: "Why this matters for learning",
        paragraphs: [
          "The upside of a deterministic, landmark-based design is that WaveHand is genuinely learnable. Chord shapes are consistent, the feedback is immediate, and there's no hidden model behavior to second-guess. Learn mode builds on exactly this: because the app knows the precise finger count, tilt, and thumb state at every frame, it can compare your live hand against a target shape and tell you which component is wrong — degree, mode, quality, or octave — instead of just saying \"try again.\"",
          "That's also why the same hand-tracking foundation supports two very different instruments. Gesture mode uses the discrete signals (finger counts, thumb) for chords; Theremin mode ignores most of them and uses only continuous hand height for pitch and volume. Same 21 landmarks, same camera, two instruments.",
        ],
      },
      {
        heading: "Trying it yourself: a five-minute walkthrough",
        paragraphs: [
          "Open WaveHand in Chrome or Edge, allow camera access, and click to enable audio. Hold your left hand up with one finger raised, palm toward the camera, and you'll hear the I chord of the default key. Raise a second finger: the chord changes to II. Work through one to five fingers and listen to the degrees climb. That's the finger-count detection doing its job in real time.",
          "Now bring your right hand into frame and raise it higher — volume rises. Lower it — volume falls. Tilt your right wrist and listen to the filter open and close. Extend your right thumb and the whole chord drops an octave. Each of those is one of the signals described above, read off the landmarks dozens of times a second.",
          "Finally, tilt your left wrist while holding a chord. The chord flips between its major and minor version. If it flips when you didn't mean it to, hold your wrist flatter — you're sitting near the tilt threshold, and the stabilizer is faithfully reporting a real, if small, rotation.",
        ],
      },
      {
        heading: "Troubleshooting what you see in the HUD",
        paragraphs: [
          "The HUD shows the detected chord and quality in large type, plus a volume meter and a tone percentage. If the chord reads \"--\", no left hand is detected or no finger is raised: check that your hand is fully in frame with the palm toward the camera. If the quality reads something unexpected, look at your right hand's finger count — a stray raised finger changes the voicing.",
          "If volume is stuck low, your right hand is low in the frame; raise it. If tone is pinned at one extreme, your right wrist is tilted; level it. These are all direct readouts of the landmark signals, so the HUD is also a live debugger for your own gestures.",
          "A chord that holds when you lower your hand briefly is the grace period working as intended. A chord that lingers for longer than a second after your hand leaves frame is not normal and usually means the camera feed itself has frozen — reload the page.",
        ],
      },
    ],
    faq: [
      {
        q: "Does WaveHand use AI to guess what chord I meant?",
        a: "No. The vision model finds 21 landmark points on each hand, and simple geometric rules turn those into finger counts and tilt values. The chord is a deterministic function of those signals — the same shape always produces the same chord in a given key.",
      },
      {
        q: "Why does my chord flicker between two values?",
        a: "Usually a finger is near the threshold between raised and lowered, so the raw reading flips frame to frame. The stabilizer suppresses most of this, but raising the finger more clearly (or lowering it fully) removes the ambiguity entirely.",
      },
      {
        q: "Does it work with a mirrored webcam preview?",
        a: "Yes. Handedness comes from the model, not from which side of the frame your hand is on, so left/right rules (including the thumb test) stay correct even when the preview is flipped.",
      },
      {
        q: "Does hand size affect how I play?",
        a: "Finger detection compares each fingertip against its own knuckle, and tilt is normalized against the hand's own width, so small and large hands produce the same signals for the same gestures.",
      },
      {
        q: "How many frames per second does it track?",
        a: "Tracking runs on every animation frame the browser provides, typically 30–60 per second depending on your device. Chord changes are then stabilized over a short window so single-frame noise doesn't reach the audio.",
      },
      {
        q: "Is my camera video sent anywhere?",
        a: "No. MediaPipe runs entirely in your browser. Camera frames are processed on your device and never uploaded.",
      },
    ],
  },
  {
    slug: "theremin-reinvented-for-a-webcam",
    title: "The Theremin, Reinvented for a Webcam",
    description:
      "The theremin was the first instrument you play without touching it. WaveHand's Theremin mode is a modern, browser-based take on the same idea — here's how a virtual theremin works, what it shares with the original, and where it differs.",
    date: "2026-08-08",
    sections: [
      {
        heading: "A short history of the touchless instrument",
        paragraphs: [
          "The theremin is one of the oldest electronic instruments still played today. Leon Theremin, a Russian physicist, demonstrated it in 1920, and it was patented in 1928. It's played without any physical contact at all: two metal antennas sense the position of the player's hands through changes in electrical capacitance. One antenna controls pitch, the other controls volume, and moving your hands through open air changes the sound in real time.",
          "The instrument became famous for its eerie, voice-like glide — you hear it in 1950s science-fiction film scores and in a handful of pop records. It also has a reputation for being extraordinarily hard to play well, precisely because there's nothing to touch. No keys, no frets, no reference point except your own ear and muscle memory.",
          "That difficulty is part of what makes it interesting as a model for a webcam instrument. The theremin was always about reading hand position from a distance; it just used radio-frequency fields instead of a camera.",
        ],
      },
      {
        heading: "How WaveHand's Theremin mode maps your hands",
        paragraphs: [
          "WaveHand's Theremin mode follows the same two-hand split as the original, replacing antennas with a webcam. Your left hand controls volume by its height in the frame — raise it and the sound comes up, lower it and it fades. Your right hand controls pitch the same way, mapped against the key you've selected in Settings, so moving your hand up and down glides smoothly between notes instead of jumping between fixed steps.",
          "Under the hood, the mode reads only one number from each hand: the vertical position of the wrist landmark. Everything else the hand-tracking model provides — finger counts, tilt, thumb state — is ignored. That makes Theremin mode the simplest signal path in the whole app, and also the most forgiving of partial occlusion, since it doesn't care whether it can see your individual fingers.",
          "Pitch is continuous. There's no quantization to a scale by default, which means you can land between notes exactly as you would on a real theremin. The selected key sets the range the right hand sweeps through, so the center of your comfortable hand height lands somewhere musically sensible rather than at an arbitrary frequency.",
        ],
      },
      {
        heading: "What's the same as a physical theremin",
        paragraphs: [
          "The core skill transfers directly: you are tuning by ear, in real time, with no visual or tactile reference for where a note is. If you've ever searched for a \"virtual theremin\" or a \"theremin app\" hoping to get a feel for the real thing before buying one, this is the part that carries over honestly. The hand-eye-ear coordination is the same problem.",
          "The gliding, continuous pitch is also the same. Vibrato — the small, fast wobble that gives a theremin its vocal quality — works the same way: a small, fast oscillation of the right hand's height produces a small, fast oscillation in pitch. And volume shaping with the left hand is the same technique real thereminists use to articulate notes, since there's no attack from a pluck or a key press.",
        ],
      },
      {
        heading: "What's different, and why",
        paragraphs: [
          "A real theremin responds to distance from the antenna in all directions; the pitch field is roughly a sphere around the antenna. WaveHand's camera sees a two-dimensional image, so it maps pitch to vertical position only. Moving your hand toward or away from the camera doesn't change the note. This is a simplification, but it also makes the instrument easier to learn than a physical theremin, where accidental depth movement is a constant source of pitch drift.",
          "Latency is different too. A physical theremin's response is effectively instant; the webcam version has a small delay from camera capture, hand-tracking inference, and audio scheduling. On a decent laptop it's low enough to feel responsive, but a trained thereminist would notice it. There's no way to eliminate it entirely in a browser.",
          "Finally, a real theremin is a specific analog circuit with a characteristic tone. WaveHand uses a clean sine oscillator for Theremin mode by design — it's the waveform that most closely resembles the theremin's fundamental, and it stays out of the way so you hear your pitch control clearly.",
        ],
      },
      {
        heading: "Why Theremin mode skips the chord stabilizer",
        paragraphs: [
          "Gesture mode runs every reading through a stabilizer so chords click into place rather than flickering. Theremin mode deliberately skips all of that and sends your hand position straight to the oscillator. A stabilizer would smooth out exactly the small, fast movements — vibrato, quick slides — that make a theremin expressive.",
          "That means Theremin mode is less forgiving of noisy tracking. If your lighting is poor, you'll hear it as pitch wobble that you didn't intend. This is one of the reasons Theremin mode is a good diagnostic: if the pitch is jittery while your hand is still, your setup needs more light or a cleaner background.",
        ],
      },
      {
        heading: "Practical uses beyond novelty",
        paragraphs: [
          "Theremin mode is genuine ear training. Because nothing shows you where a note is, you have to find it by listening, then remember the hand height that produced it. That's the same skill fretless string players and singers develop, and it's hard to practice on an instrument with fixed pitches.",
          "It also pairs well with the loop pedal. Record a chord progression in Gesture mode, then switch to Theremin mode and improvise a melody over your own loop. The contrast between the discrete chords and the continuous lead line is musically useful, not just a demo.",
          "And for anyone curious about the theremin itself — searching \"can you make a theremin\" or \"how to make a theremin\" — the webcam version is a zero-cost way to find out whether you enjoy the control scheme before committing to hardware. It won't teach you a real theremin's depth-field behavior, but it will teach you whether playing by ear in open air is something you want to spend time on.",
        ],
      },
      {
        heading: "How to play your first phrase",
        paragraphs: [
          "Switch to Theremin mode from the HUD. Pick a key in Settings — the key sets the range your right hand sweeps, so the middle of your comfortable arm height lands on something musical. Hold your left hand at chest height and your right hand at the same level. You should hear a steady tone. Raise the left hand slightly and the tone gets louder; lower it and it fades.",
          "Now move only the right hand, slowly, up and then down. Listen for the pitch rising and falling as a glide, not as steps. Try to stop on a note that sounds \"at rest\" against your memory of the key — that's the root. Memorize the hand height. Then try to find the fifth above it, which will be noticeably higher in the frame. Go back and forth between the two until you can land them without searching.",
          "Vibrato comes last. Once you can hold a pitch steady, add a small, fast up-and-down wobble of the right hand — a few centimeters, several times a second. That's the characteristic theremin sound, and it's also the single technique most people find hardest, because the wobble has to be even. Practice it on one note before using it in a phrase.",
        ],
      },
      {
        heading: "Common problems and what they mean",
        paragraphs: [
          "Silence with the right hand clearly in frame almost always means the left hand is too low or out of frame — volume is the left hand's job in this mode, and with no left hand there is no volume. Bring it up to chest height.",
          "Pitch that jumps rather than glides means the tracking is losing and re-acquiring your right hand, usually from poor lighting or a hand too near the frame edge. Move toward the center of the camera's view and add light in front of you. Because Theremin mode has no stabilizer, every tracking hiccup is audible — which is also why it's the quickest way to check whether your setup is good.",
          "A pitch that drifts slowly while your hand feels still usually means your arm is sinking from fatigue. Rest the elbow against your body for support; thereminists do the same thing with a chair arm. Short sessions help here more than any setting.",
        ],
      },
      {
        heading: "Pairing it with the rest of the instrument",
        paragraphs: [
          "The most musical use of Theremin mode is over a loop. Record a chord progression in Gesture mode on one track, switch to Theremin mode, and improvise a melody on top. The chords give your ear a reference, which makes finding pitches far easier than playing Theremin mode alone, and the contrast between stepped chords and a gliding lead is a real arrangement texture, not a demo.",
          "The global recorder captures both together as one audio file. And because the loop pedal records Theremin mode step by step too, you can record a Theremin bassline as a loop track — keep the right hand low for low pitches — and then switch back to Gesture mode to play chords over your own bass.",
        ],
      },
    ],
    faq: [
      {
        q: "Is a webcam theremin the same as a real theremin?",
        a: "The two-hand pitch/volume control and the by-ear playing skill are the same. The differences are that pitch maps to vertical hand height only (not distance in all directions), there's a small latency from camera processing, and the tone is a clean synthesized sine rather than an analog circuit.",
      },
      {
        q: "Can I snap pitch to a scale?",
        a: "Theremin mode is continuous by design — landing between notes is part of the instrument. The selected key sets the range your hand sweeps through so the center sits somewhere musical.",
      },
      {
        q: "Why is the pitch wobbly even when my hand is still?",
        a: "Theremin mode intentionally has no smoothing, so tracking noise shows up directly. Wobble while still almost always means poor lighting or a busy background behind your hand.",
      },
      {
        q: "Do I need both hands?",
        a: "Yes. The left hand sets volume and the right hand sets pitch. With only one hand in frame you'll get pitch with no volume (silence) or volume with no pitch control.",
      },
      {
        q: "Can I record a Theremin melody?",
        a: "Yes. The loop pedal captures Theremin-mode playing step by step, and the global recorder captures the full mixed audio as a downloadable file.",
      },
      {
        q: "Who invented the theremin?",
        a: "Leon Theremin, a Russian physicist, demonstrated it in 1920 and patented it in 1928. It is widely regarded as the first electronic instrument played without physical contact.",
      },
    ],
  },
  {
    slug: "why-wavehand-has-a-loop-pedal",
    title: "Why WaveHand Has a 4-Track Loop Pedal",
    description:
      "WaveHand isn't just a hands-free instrument — it's also a 4-track looper built entirely in the browser. Here's why it exists, how step-based recording works, and how it keeps playing in a background tab.",
    date: "2026-08-15",
    sections: [
      {
        heading: "Why a hands-free instrument needed a looper",
        paragraphs: [
          "Playing chords with your hands is fun on its own, but it's more fun over a beat. A single pair of hands can only hold one chord at a time, and both hands are already busy — the left picking the chord, the right shaping it. There's no spare hand for a bassline or a melody. Looping solves that the same way it does for guitarists and vocalists: record a part, let it repeat, play something new on top.",
          "WaveHand's loop pedal lets you record up to four tracks, each capturing exactly what you played — gesture and all — and play them back while you keep performing live. If you've ever wondered whether you need to buy a physical loop pedal to try this kind of layered playing, the answer here is no: the looper is part of the instrument.",
        ],
      },
      {
        heading: "How step-based recording works",
        paragraphs: [
          "The loop pedal doesn't record audio the way a phone voice memo does. It records steps. Every beat is divided into four sub-steps, and while a track is recording, WaveHand captures a snapshot at each step: which notes were sounding, the volume, the filter tone, whether you were in Gesture or Theremin mode, and which synth voice was active.",
          "When playback starts, those steps are re-rendered through an offline audio pipeline rather than replayed as raw recorded sound. Consecutive steps with the same chord are merged into one sustained tone, so a chord held across four steps sounds like one note, not four stuttered attacks. Each merged run gets a short attack and release ramp so there are no clicks at the boundaries.",
          "This design has a practical consequence: a loop is editable after the fact. Because it's a sequence of steps, not a waveform, you can toggle individual steps on and off, place a chord by hand, or drag to paint a chord across several steps in the beat grid. A recorded audio clip couldn't do that.",
        ],
      },
      {
        heading: "The count-in and the three loop states",
        paragraphs: [
          "The looper moves through three states: idle, count-in, and recording. Pressing record starts a count-in — a bar of metronome clicks — so you know exactly when the first step lands. Then it records for the configured number of bars and stops automatically. You set the tempo, the number of bars, and the beats per bar before you start, and all four tracks share the same grid so they stay aligned.",
          "Each track is independently mutable and soloable during playback, which is what turns four loops into an arrangement you can build and strip back live. Mute everything but the bass to rebuild from the ground up; solo one track to check a part in isolation.",
        ],
      },
      {
        heading: "Keeping audio alive in a background tab",
        paragraphs: [
          "Getting loops to survive in a browser tab is its own small problem. Browsers routinely throttle or suspend audio in tabs that lose focus, which would normally kill a loop the moment you switched apps to look something up. WaveHand works around this with a silent, muted audio element wired to a constant-signal audio stream in the background. It doesn't add anything you can hear, but it gives the browser a reason to treat the tab as \"playing media\" and keep the audio engine running.",
          "The app also watches for the browser suspending the audio context and resumes it on the next opportunity — when the tab becomes visible again, or on the next user interaction. This isn't bulletproof (browsers can still decide to pause media), but it covers the common case of tabbing away briefly while a loop plays.",
        ],
      },
      {
        heading: "Two recorders, two jobs",
        paragraphs: [
          "The loop pedal is for building. It thinks in steps and chords and tracks. WaveHand also has a separate global recorder, which captures the actual mixed audio output — your loops and your live playing together — and turns it into a downloadable file. That one thinks only in raw audio and has no concept of steps.",
          "Keeping them separate means each stays simple at its own job. Build an arrangement on the loop pedal, improvise live over it, and use the global recorder to keep the result. The loop tracks themselves are for playing with, not for export.",
        ],
      },
      {
        heading: "Where the looper has real limits",
        paragraphs: [
          "Step resolution is four sub-steps per beat. That's enough for most chord progressions and simple melodies, but it can't capture rhythms finer than a sixteenth note at the current tempo. A fast triplet run in Theremin mode will be approximated to the nearest step.",
          "Four tracks is a deliberate ceiling. More tracks would mean more rendering work on every rebuild and a more cluttered beat grid; four is enough for chords, bass, a melodic layer, and one more. And because loops are re-rendered rather than recorded as audio, you can't loop sounds from outside WaveHand — only what the instrument itself produced.",
        ],
      },
      {
        heading: "Ways to actually use it",
        paragraphs: [
          "Record a four-chord progression in Gesture mode on track one. Switch to Theremin mode and record a bassline on track two, keeping your right hand low in the frame for low pitches. Then play a melody live over both. That's a complete arrangement from one person and a webcam.",
          "For practice, record the chord changes you're struggling with as a loop, then play along trying to switch chords cleanly in time. Because the loop is your own playing at your own tempo, it's a more honest backing track than a fixed recording.",
          "And for Learn mode, the practice metronome and the looper share the same tempo grid, so a song's tempo carries over if you want to loop a section after learning it.",
        ],
      },
      {
        heading: "Recording your first loop, step by step",
        paragraphs: [
          "Open Settings and turn on Show loop sequencer. The beat grid and transport appear below the play surface. Set a tempo you can play comfortably — slower than you think, 80 or 90 beats per minute is a good start — and leave bars at four and beats per bar at four. Select track one.",
          "Decide on a simple progression: one, four, five, one is enough. Press record. You'll hear a one-bar count-in of metronome clicks; use it to get your left hand ready in the one-finger shape. On the first beat after the count-in, play the I chord and hold it for a bar, then IV for a bar, V for a bar, I for the last bar. Recording stops automatically at the end of bar four.",
          "The loop starts playing immediately. Listen once through. If a chord change landed late, open the beat grid and look at the row for track one: each cell shows the chord recorded at that step. Click a wrong cell to toggle it off, or click an empty cell to place the right chord. You've just edited a loop without re-recording it, which is the whole point of step-based looping.",
        ],
      },
      {
        heading: "Building an arrangement across four tracks",
        paragraphs: [
          "With the chord loop on track one, select track two and switch to Theremin mode. Hold your right hand low in the frame for low pitches and record a simple bassline — just the root of each chord, one note per bar, is plenty. The count-in and automatic stop work the same way. Now you have chords and bass locked to the same grid.",
          "Track three is a good place for a counter-melody or a rhythmic figure: switch back to Gesture mode, pick a different voice in Settings (the loop remembers each step's voice), and play sparse, high chords with the octave thumb folded. Mute track one for a moment to hear how two and three sit together, then bring it back. Solo track two to check the bass is in tune with the chords.",
          "Leave track four empty for live playing, or record a final layer. Four tracks is a deliberate ceiling — enough for chords, bass, a layer, and one more — and the arrangement is complete when muting any track makes it sound emptier.",
        ],
      },
      {
        heading: "Why steps and not audio",
        paragraphs: [
          "An audio looper would be simpler to build and would capture exactly what you played, including every nuance of volume and filter movement. WaveHand records those too — volume and filter position are stored per step — but it records them as parameters, not as a waveform. The reason is editability. A waveform can only be trimmed or re-recorded; a step can be toggled, replaced, or painted over. For a learning instrument, being able to fix one wrong chord without redoing a take is worth more than audio-perfect fidelity.",
          "There's a second reason: size and speed. Four tracks of step data is a few kilobytes; four tracks of audio at loop length would be megabytes, rendered and mixed every cycle. Steps re-render only when something changes, which is what lets the looper stay responsive in a browser tab.",
        ],
      },
    ],
    faq: [
      {
        q: "Does the loop pedal record audio or notes?",
        a: "Notes and settings, as steps — four per beat. Playback re-renders those steps into audio, which is what makes loops editable in the beat grid afterward.",
      },
      {
        q: "How many tracks can I record?",
        a: "Four, each independently mutable and soloable, all sharing the same tempo and bar grid.",
      },
      {
        q: "Will the loop keep playing if I switch tabs?",
        a: "Usually yes. WaveHand uses a muted background audio element and resumes the audio context when the tab regains focus, which keeps the browser from suspending playback in most cases.",
      },
      {
        q: "Can I loop sound from another app or microphone?",
        a: "No. The looper captures what WaveHand itself plays. WaveHand never requests microphone access.",
      },
      {
        q: "How do I save a loop?",
        a: "Loops live in the session for playing with. To keep the result, use the global recorder, which exports the full mixed audio as a downloadable file.",
      },
      {
        q: "Can I edit a loop after recording?",
        a: "Yes. Open the beat grid to toggle steps on and off, place a chord on a specific step, or drag to paint the same chord across several steps.",
      },
    ],
  },
  {
    slug: "how-learn-mode-knows-you-got-it-right",
    title: "How Learn Mode Knows You Actually Got the Chord Right",
    description:
      "Learn mode doesn't just play a chart on a timer — it compares your hands against a four-part target every frame and only moves on when you're actually right. Here's the matching logic, the hold rule, and the bug it replaced.",
    date: "2026-08-22",
    sections: [
      {
        heading: "The problem with charts on a timer",
        paragraphs: [
          "Most play-along tools scroll a chord chart past you at tempo and leave it to you to keep up. That's fine for someone who already knows the chords. For a beginner it teaches almost nothing: you can wave your hands at roughly the right moment, the chart moves on regardless, and you reach the end of the song without ever having formed a single correct shape.",
          "WaveHand's Learn mode was built to avoid exactly that. Every step in a song has a target — a specific chord shape — and your live hand position is compared against that target on every frame. The chart does not advance until you match it. If you're searching for a chord practice app that actually checks your playing instead of just displaying it, this is the mechanism that makes the difference.",
        ],
      },
      {
        heading: "The four-part target",
        paragraphs: [
          "A target isn't just a chord name. It's four independent components: the scale degree (which chord, I through VII), the world (major or minor), the quality (triad, inversion, or seventh voicing), and the octave (whether the right thumb is extended for the octave-down version). Each of these corresponds to a specific gesture, so each can be checked separately.",
          "On every frame, Learn mode takes the current stabilized gesture — the same one that would drive the synth in free play — and compares it component by component against the target. The result is a match report with four yes/no flags and a score from 0 to 1. The on-screen chips light up individually: you can see that your degree and world are right but your quality is wrong, rather than just getting a red X.",
          "A step only counts as matched when all four flags are true. Three out of four doesn't advance the chart, but it doesn't count as a mistake either — it simply waits, with the chips showing you exactly which part to fix.",
        ],
      },
      {
        heading: "The hold rule",
        paragraphs: [
          "Even a full match doesn't advance the chart instantly. You have to hold the correct shape for a short window — a few hundred milliseconds — before it counts. That tiny hold time is deliberate. Without it, a hand passing briefly through the right shape on its way to a different one would trigger an advance you didn't intend, and you'd learn nothing from it.",
          "After a successful hold there's a brief pause before the next target appears, so you can see the step confirm before the chart moves. If you release the shape before the hold completes, the timer resets. If you've already triggered the advance, releasing doesn't undo it.",
          "This is also why the chart can't be rushed by flailing. The only way through is to actually find and hold each shape.",
        ],
      },
      {
        heading: "Audio is gated too",
        paragraphs: [
          "While Learn mode is open, the synth only plays when your live gesture fully matches the current target. A wrong chord makes no sound. This was a deliberate reversal of how an earlier version worked, and it's worth explaining why.",
          "The original Learn mode played whatever chord your hands happened to form and advanced the chart on the beat, with the metronome running from the start. Beginners heard wrong notes before they'd found the right shape, and the chart kept moving whether or not they were ready. The fix inverted the priority: no sound and no progress until correctness, and the practice metronome stays off until your first correct chord, then starts from there.",
          "The practical effect is that Learn mode is quiet and patient. You can take as long as you need to find a shape, and the first thing you hear is the right chord.",
        ],
      },
      {
        heading: "Sections, skipping, and repeating",
        paragraphs: [
          "Songs are divided into sections of a few bars each. You can jump to any section from a row of pills, repeat the current section when it finishes, or move on to the next. If a single chord is blocking you, a skip button moves past it without losing your place; skipped chords are marked separately from matched ones in the chart so you know what to come back to.",
          "When you complete a section — every step either matched or skipped — it's recorded as finished for that song. That progress is saved locally, so a song you've partly learned shows how far you got the next time you open it, and the song picker badges songs you've practiced before.",
        ],
      },
      {
        heading: "Why this works for learning",
        paragraphs: [
          "The matching logic turns Learn mode into something closer to a patient teacher than a karaoke screen. It tells you specifically what's wrong, waits while you fix it, confirms when you've got it, and remembers where you stopped. Those are the properties that make deliberate practice work, and they're only possible because the hand-tracking foundation gives the app precise, component-level knowledge of what your hands are doing.",
          "It also scales across songs. Because every target is just four numbers, a community arrangement built in a separate tool can be turned into a Learn mode song automatically, with no per-song programming.",
        ],
      },
      {
        heading: "A first Learn mode session",
        paragraphs: [
          "Click Learn a song in the HUD. The picker lists public community arrangements with their key and tempo; pick something slow with few chords. The practice panel opens showing the first target: a hand-shape diagram for each hand, the chord's name, and four chips labeled degree, mode, quality, and octave.",
          "Make the left-hand shape first and watch the degree and mode chips. When both turn green, make the right-hand shape and watch quality and octave. When all four are green, hold still. After the brief hold, the step confirms and the next target appears. If you're new to the gestures, fix mode and quality in Settings first — those two chips will then match automatically and you can concentrate on degree alone.",
          "Don't turn the metronome on yet. Finding shapes and keeping time are two separate skills; the metronome's delayed start exists precisely so you can learn the first without the second. Once you can get through a section with the chart waiting for you, turn the metronome on and go through it again with tempo.",
        ],
      },
      {
        heading: "Reading the chips when something is wrong",
        paragraphs: [
          "Degree red, everything else green: your left-hand finger count is wrong. Check for a half-raised finger or a stray thumb. Mode red: your left wrist is tilted the wrong way — level it for major, tilt for minor, or fix the mode in Settings. Quality red: your right-hand finger count doesn't match the target voicing. Octave red: your right thumb is extended when it shouldn't be, or folded when the target wants it out.",
          "The score shown with the chips is simply how many of the four match, as a fraction. It's useful as a quick read — three-quarters means one thing to fix — but the individual chips tell you which one. There is no partial credit; a step only advances at four out of four.",
        ],
      },
      {
        heading: "What Learn mode deliberately doesn't do",
        paragraphs: [
          "It doesn't score you. There's no points total, no accuracy percentage across the song, no leaderboard. Skipped chords are marked so you can revisit them, but nothing is counted against you. The design is that the measure of progress is sections completed, which is saved, and nothing else.",
          "It doesn't enforce tempo. Even with the metronome on, the chart still waits for a correct, held shape; the metronome is a reference, not a gate. A chart that forced you to keep up would recreate exactly the problem Learn mode was built to avoid.",
          "And it doesn't play the song for you. There's no demo playback of the arrangement. The only sound in Learn mode is your own correct chords. If you want to hear what a progression sounds like before learning it, play it in free play first.",
        ],
      },
    ],
    faq: [
      {
        q: "What does Learn mode actually check?",
        a: "Four things, independently: scale degree (which chord), major or minor world, voicing quality (triad, inversion, seventh), and octave (right thumb extended or not). All four must match.",
      },
      {
        q: "Why doesn't the chart move when I play the chord?",
        a: "Either one of the four components is still wrong (the on-screen chips show which), or you haven't held the correct shape long enough yet — a short hold is required so a passing gesture doesn't count.",
      },
      {
        q: "Why is there no sound when I play a wrong chord in Learn mode?",
        a: "By design. Audio is gated on a full match so the first thing you hear is the correct chord, not a wrong one. Free play (outside Learn mode) always sounds.",
      },
      {
        q: "Does the metronome start right away?",
        a: "No. It stays off until your first correct chord, then starts. You can also turn it off or adjust its volume at any time.",
      },
      {
        q: "Is my progress saved?",
        a: "Yes, locally in your browser. Completed sections are remembered per song, and the song picker shows which songs you've practiced.",
      },
      {
        q: "Can I skip a chord I can't get?",
        a: "Yes. Skip moves past the current chord without losing your place, and marks it as skipped rather than matched so you can revisit it.",
      },
    ],
  },
  {
    slug: "community-songs-two-file-formats",
    title: "Why Community Songs Come in Two Different File Formats",
    description:
      "WaveHand reads two different arrangement formats from its community song library — a step-based v1 and a MIDI-based v2. Here's why both exist, how the app tells them apart, and why it didn't force a migration.",
    date: "2026-08-29",
    sections: [
      {
        heading: "Where community songs come from",
        paragraphs: [
          "The songs in WaveHand's Learn mode aren't bundled with the app. They're arrangements that people create and publish through a separate community site, stored as JSON in a shared database, and fetched by WaveHand when you open the song picker or follow a shared link. Only arrangements their authors have marked public are readable, and WaveHand accesses them with a read-only key — it can look up songs but never write or modify them.",
          "Because the arrangements are authored elsewhere and over time, they don't all have the same shape. That's the origin of the two formats.",
        ],
      },
      {
        heading: "Version 1: steps",
        paragraphs: [
          "The original arrangement format is built around a flat list of steps. Each step is a slot on a grid — a fixed number of steps per bar — and holds a chord (as a scale degree and quality) or a rest. Timing is implicit: the position in the list is the position in time. It's simple, easy to author by hand, and maps directly onto a beat grid.",
          "Its limitation is that it can't express anything that doesn't line up with the grid. A chord that starts halfway between two steps, or one that sustains across an odd number of steps while another voice moves, has no representation. For strummed chord progressions that's fine. For melodic arrangements it's not.",
        ],
      },
      {
        heading: "Version 2: MIDI-style notes",
        paragraphs: [
          "The newer format is MIDI-based. Instead of a grid of steps, it holds a list of notes, each with a MIDI pitch, a start time in beats, and a duration in beats. This supports syncopation, sustained notes, overlapping voices, and anything else a MIDI file can represent. It's also the format a dedicated Learn-song builder tool exports, which is how many newer arrangements arrive.",
          "To turn v2 notes into Learn mode targets, WaveHand groups notes that sound together, works out which scale degree and quality they form in the arrangement's key, and derives the four-part target (degree, world, quality, octave) for each chord change. The conversion lives in one adapter so the practice engine never has to know which format a song started as.",
        ],
      },
      {
        heading: "How the app tells them apart",
        paragraphs: [
          "Every arrangement carries a version field. When WaveHand loads one, it checks that field and validates the shape: a v1 arrangement must have a steps array, a v2 arrangement must have a notes array. Anything else is rejected with a clear error rather than half-loaded. Both shapes are then normalized — missing optional fields get sensible defaults (key, mode, tempo, steps per bar, bar count) so the rest of the app can rely on them being present.",
          "The result is that a v1 song and a v2 song drive Learn mode identically. From the practice engine's point of view there is only one kind of song.",
        ],
      },
      {
        heading: "Why not just migrate everything to v2?",
        paragraphs: [
          "It would have been possible to convert every existing v1 arrangement to v2 once and drop v1 support. It would also have meant touching every published arrangement in the shared database — content other people authored — and accepting the risk that a conversion bug silently changed someone's song. Reading both formats avoids that entirely. Old arrangements keep working exactly as published; new ones can use the richer format.",
          "It also keeps the door open for a v3. The version-check-and-normalize pattern means a future format only needs a new branch in the loader, not a migration of everything before it.",
        ],
      },
      {
        heading: "What this means for you",
        paragraphs: [
          "In practice you never see the format. A song is a song in the picker, with its title, key, tempo, and tags. The only visible difference is that v2 arrangements can carry more rhythmic detail, which shows up as more precisely timed chord changes in Learn mode.",
          "If you build arrangements yourself in the community tool, you're producing v2, and you can rely on WaveHand reading them without any export step. If you find an older v1 arrangement you like, it will keep working indefinitely.",
        ],
      },
      {
        heading: "From notes to targets: what the adapter does",
        paragraphs: [
          "A Learn mode target is four numbers — degree, world, quality, octave — but a v2 arrangement is a list of MIDI pitches with start times. Bridging them is the adapter's job. It walks the notes in time order, groups notes whose start times coincide into a chord, and works out that chord's root relative to the arrangement's key. The root's position in the scale gives the degree. Whether the third above the root is major or minor gives the world. The number and spacing of notes above the root gives the quality: three notes in root position is a triad, a different bottom note is an inversion, a fourth note is a seventh.",
          "Octave comes from register: a chord voiced below a threshold relative to the key's root maps to the octave-down target (right thumb extended), otherwise to the base octave. For a v1 arrangement the adapter has much less to do, since each step already names a degree and quality directly; it only fills in the world from the arrangement's mode and derives octave from the step's register flag.",
          "The output of both paths is the same list of practice events — bar, beat, chord name, and the four-number target — which is what the practice panel renders. The adapter is the only place in WaveHand that knows two formats exist.",
        ],
      },
      {
        heading: "Edge cases and how they're handled",
        paragraphs: [
          "Not every group of notes is a clean chord. A single melody note with nothing under it has no third to classify, so the adapter treats it as a root-position triad on that note's degree — the closest playable gesture. A cluster that doesn't fit any triad or seventh shape falls back to the nearest triad on the lowest note. Notes outside the key are snapped to the nearest scale degree. None of this is musically perfect; it's a deliberate choice to always produce a target the hands can make rather than reject the arrangement.",
          "Rests are preserved as gaps between events — the practice chart simply has no target during them. Tempo and time signature come from the arrangement's own fields, with defaults if absent, so the practice metronome and the looper's grid line up with the song.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to know which format a song is?",
        a: "No. WaveHand detects the version automatically and normalizes both into the same internal shape. The picker and Learn mode look identical for either.",
      },
      {
        q: "What's the difference between v1 and v2?",
        a: "v1 is a fixed grid of steps, each holding a chord or rest. v2 is a list of MIDI notes with explicit start times and durations, which can express syncopation and sustained or overlapping notes.",
      },
      {
        q: "Can WaveHand modify community songs?",
        a: "No. It reads public arrangements with a read-only key and has no code path to write or edit them.",
      },
      {
        q: "What happens if an arrangement is malformed?",
        a: "The loader validates the version and required fields and refuses to load anything that doesn't match, with an error message, rather than partially loading it.",
      },
      {
        q: "Why keep supporting the old format?",
        a: "Migrating would mean rewriting other people's published songs and risking silent changes. Reading both formats keeps every existing arrangement working exactly as its author published it.",
      },
    ],
  },
  {
    slug: "why-your-hand-shake-doesnt-glitch-the-chord",
    title: "Why a Shaky Hand Doesn't Glitch the Chord",
    description:
      "Raw hand-tracking data is noisy frame to frame. Here's the small stabilizer that keeps WaveHand's chords steady without making them feel sluggish — the hold window, the grace period, and how the numbers were chosen.",
    date: "2026-09-05",
    sections: [
      {
        heading: "The noise problem",
        paragraphs: [
          "Hand landmark tracking is remarkably accurate, but it isn't perfectly stable. Watch the raw finger-raised readings frame by frame and you'll see occasional single-frame flips: a finger near the threshold reads as down for one frame and up the next, a fingertip briefly occluded by another finger disappears and reappears, a tremor nudges a knuckle across the comparison line. Your hand hasn't changed, but the data has.",
          "If WaveHand played audio directly from that raw per-frame reading, every one of those flips would be a chord change. You'd hear a stutter each time a finger wobbled, and a sustained chord would be interrupted by momentary wrong chords several times a second. The instrument would be unplayable. Every gesture instrument has to solve this, and how it's solved shapes how the instrument feels.",
        ],
      },
      {
        heading: "The hold window",
        paragraphs: [
          "WaveHand's answer is a stabilizer with two parts. The first is a hold window. Every frame, the raw reading produces a candidate chord — degree, major/minor world, quality, and octave as one bundle. That candidate has to stay identical across a short window before it's allowed to \"commit\" and become the chord you actually hear. If the candidate changes before the window elapses, the timer resets and the previously committed chord keeps playing.",
          "A one-frame blip never survives the window, so it never reaches the audio. A genuine chord change — you deliberately raise another finger — holds steady for the window and commits. The window is short enough that the delay between your gesture and the sound is below what most people consciously perceive, but long enough to swallow single-frame noise.",
          "The comparison is on the whole bundle, not just the degree. A change in quality or octave alone also has to hold before it commits, which stops the right hand's finger count from flickering a seventh chord on and off while you're adjusting.",
        ],
      },
      {
        heading: "The grace period",
        paragraphs: [
          "The second part handles a different failure: your hand leaving the frame. Reach for something, adjust your position, or just drift out of camera view for a moment, and the tracker reports no hand at all. Cutting the sound dead the instant tracking is lost would make the instrument feel fragile — every small repositioning would be a dropout.",
          "So when a hand disappears, WaveHand holds the last committed chord for a short grace period before treating the absence as real. A brief loss of tracking doesn't interrupt the note. Only a loss that persists past the grace period lets the chord release. The grace period is shorter than the hold window, because an absent hand is a stronger signal than a flickering finger — if you've really pulled your hand away, you want the sound to stop promptly.",
        ],
      },
      {
        heading: "Choosing the numbers",
        paragraphs: [
          "Both durations are small — on the order of tens of milliseconds. They were set by feel, not formula: the hold window was lengthened until finger-threshold flicker stopped reaching the audio, then shortened until chord changes felt immediate again. The grace period was tuned so that reaching briefly out of frame didn't drop a note, but deliberately lowering your hand did.",
          "Too short and noisy frames glitch through. Too long and the instrument feels laggy, arriving late on every chord change, which is especially noticeable when you're playing in time with a loop. The current values sit in the band where you shouldn't consciously notice the stabilizer exists — only that chords click into place rather than stuttering.",
          "If you want to feel the difference, switch to Theremin mode, which deliberately has no stabilizer: pitch follows your hand position raw. The small wobble you hear while holding still is exactly the noise Gesture mode is filtering out.",
        ],
      },
      {
        heading: "What the stabilizer doesn't do",
        paragraphs: [
          "It doesn't smooth continuous values. Right-hand height (volume) and wrist tilt (filter) are passed through as-is, because smoothing them would blunt expressive movement. Volume swells and filter sweeps should respond to your hand immediately, and small jitter in those values is far less audible than a chord change.",
          "It also doesn't try to guess your intent. If you hold a shape that's genuinely ambiguous — a finger right at the raised/lowered threshold — the stabilizer will faithfully report whichever reading holds for the window. The fix for a flickering chord is almost always to make the gesture more decisive: raise the finger clearly or fold it fully.",
          "And it doesn't apply in Learn mode's matching logic any differently than in free play. Learn mode compares your stabilized chord against the target, so the same hold-and-grace behavior that keeps free play steady also keeps practice feedback from flickering.",
        ],
      },
      {
        heading: "Why this is the instrument's feel",
        paragraphs: [
          "Every instrument has a response characteristic. A piano key has a weight; a guitar string has a pluck. For a gesture instrument, the stabilizer is that characteristic. It's the difference between an instrument that feels like it's reading your mind and one that feels like it's fighting you. Getting it right is less about clever code and more about tuning two numbers until the instrument disappears and only the music is left.",
          "That's also why the values are constants, not user settings. A looser stabilizer would glitch for everyone; a tighter one would lag for everyone. There isn't a per-player sweet spot to expose — there's one range that works, and the instrument sits in it.",
        ],
      },
      {
        heading: "Seeing the stabilizer work",
        paragraphs: [
          "You can watch it operate with the HUD open. Hold a chord and deliberately wiggle one finger near the raised/lowered threshold — half up, half down. The HUD's chord readout stays steady, even though the raw finger test is flipping. Now raise the finger fully: after a barely perceptible beat, the chord changes. That beat is the hold window.",
          "Then hold a chord and quickly move your left hand out of frame and back, within a fraction of a second. The chord doesn't drop. Move it out and keep it out: after a slightly longer moment, the sound releases. That moment is the grace period. Finally, switch to Theremin mode and hold your right hand perfectly still. The small pitch wobble you hear is the raw tracking noise that, in Gesture mode, the stabilizer swallows.",
        ],
      },
      {
        heading: "How it interacts with the looper and Learn mode",
        paragraphs: [
          "The loop pedal records the stabilized chord, not the raw reading. That matters: a recorded loop step reflects what you heard, not a single noisy frame. If the stabilizer had been bypassed for recording, loops would be full of one-step glitches that weren't audible when you played them.",
          "Learn mode compares the stabilized chord against the target. Its own hold requirement — hold the correct shape for a few hundred milliseconds before a step advances — sits on top of the stabilizer's shorter window. Two layers: the stabilizer rejects frame noise so the chord is real; Learn mode's hold confirms the real chord is intentional. Neither alone would be enough.",
        ],
      },
      {
        heading: "Alternatives that were considered",
        paragraphs: [
          "Majority voting over the last several frames is a common approach to this problem and would also suppress single-frame flicker. It was not used because it introduces a fixed delay equal to half the voting window on every change, including deliberate ones, and it handles the hand-leaves-frame case poorly — a vote with no hand present either stops immediately or needs a separate rule anyway. The hold-plus-grace design has lower latency on real changes and treats hand loss as its own, shorter case.",
          "Smoothing the landmark coordinates themselves before running the finger tests was also considered. It would reduce noise at the source, but it smears fast, deliberate movements too, and it changes the tilt reading in ways that make major/minor switching feel sluggish. Keeping the landmarks raw and stabilizing only the discrete chord bundle leaves the continuous controls — volume, tilt — fully responsive.",
        ],
      },
    ],
    faq: [
      {
        q: "What does the stabilizer actually do?",
        a: "It requires a new chord reading to hold steady for a short window before it plays, and it keeps the last chord sounding for a brief grace period if your hand leaves the frame. Together these suppress single-frame tracking noise.",
      },
      {
        q: "Does it add lag?",
        a: "A small, deliberate amount — tens of milliseconds — tuned to sit below conscious perception while still swallowing one-frame flicker. Chord changes should feel immediate in normal play.",
      },
      {
        q: "Why does Theremin mode wobble when my hand is still?",
        a: "Theremin mode intentionally has no stabilizer, so raw tracking noise reaches the pitch directly. The wobble is the noise Gesture mode filters out.",
      },
      {
        q: "Can I adjust the hold or grace times?",
        a: "No. They're tuned constants. Looser values glitch for everyone and tighter values lag for everyone, so there isn't a useful per-user setting to expose.",
      },
      {
        q: "Why does my chord still flicker sometimes?",
        a: "Usually a finger is held right at the raised/lowered threshold, so the reading genuinely alternates for longer than the window. Making the gesture more decisive — finger fully up or fully down — removes the ambiguity.",
      },
      {
        q: "Does the stabilizer affect volume and tone?",
        a: "No. Right-hand height and tilt pass through unsmoothed so swells and filter sweeps stay immediate. Only the discrete chord bundle is stabilized.",
      },
    ],
  },
  {
    slug: "settings-for-when-gesture-controls-feel-like-a-lot",
    title: "Settings for When Full Gesture Control Feels Like a Lot",
    description:
      "WaveHand's default controls use both hands for four things at once. The Settings sheet lets you fix any of those to a constant — here's what each option does, who it's for, and how to use it to learn one skill at a time.",
    date: "2026-09-12",
    image: {
      src: "/screenshots/wavehand-settings-sheet.png",
      alt: "WaveHand's Settings sheet showing Key, Sound, Left hand, Right hand, and Sequencer options",
    },
    sections: [
      {
        heading: "Four controls at once is a lot",
        paragraphs: [
          "By default, WaveHand asks both hands to do two things each. Your left hand picks a chord degree with its finger count and switches major/minor with its wrist tilt. Your right hand picks a voicing with its finger count and sweeps the filter with its tilt, while its height sets volume and its thumb toggles the octave. That's expressive once it's familiar, but it's four independent gestures running simultaneously, which is a lot to track while you're still learning any one of them.",
          "Experienced players tend to forget how much is going on because it has become automatic. For a first-time player — or anyone returning after a break — the Settings sheet exists to turn parts of it off.",
        ],
      },
      {
        heading: "Fixing the left hand's mode",
        paragraphs: [
          "The Left hand setting has two options. The default, \"Scale notes + tilt major/minor,\" is the full control: fingers pick the degree, tilt picks the world. The alternative, \"Fixed,\" locks the world to major or minor (your choice) so wrist tilt stops doing anything. You're left with one job for that hand: pick a degree.",
          "This is the single most useful simplification for beginners. Tilt is the hardest gesture to hold consistently because it's continuous and relative — a slight unintentional rotation flips you from major to minor mid-chord. Locking it removes that whole failure mode until you've got the finger counts down.",
        ],
      },
      {
        heading: "Fixing the right hand's quality",
        paragraphs: [
          "The Right hand setting works the same way. \"Finger layout = chord style\" is the default: one to four fingers select triad, first inversion, seventh, or dominant/diminished seventh. \"Fixed\" locks the voicing to one of those four so finger count on that hand stops mattering — every chord plays the same style.",
          "With quality fixed, your right hand only controls volume (height), tone (tilt), and octave (thumb). You can hold it in a relaxed open position and concentrate entirely on the left hand's chord changes.",
          "You can fix one dimension and leave the other live. Fix the left hand's mode and keep right-hand quality live to practice voicings; fix quality and keep mode live to practice major/minor tilt. Each combination isolates a different skill.",
        ],
      },
      {
        heading: "Key, Sound, and Sequencer",
        paragraphs: [
          "The Key selector sets which key the scale degrees map to. Changing it shifts every chord's actual pitch without changing any gesture. Your chosen key is remembered across visits, so you don't reset it every session. When you open a Learn mode song, the key switches to that song's key temporarily and does not overwrite your saved choice.",
          "Sound picks one of four synth voices — Bright (sawtooth), Soft (sine), Mellow (triangle), and 8-bit (square). This is the most immediately audible setting and the one most people change first. Each voice is loudness-compensated so switching doesn't make the instrument suddenly quieter or louder.",
          "Sequencer is a single checkbox: show or hide the loop pedal and beat grid. It's off by default so the play surface stays clean. Turn it on when you want to record loops; leave it off while you're learning chords.",
        ],
      },
      {
        heading: "This isn't an easy mode",
        paragraphs: [
          "It would be easy to read the fixed options as a simplified version of the instrument, something you graduate out of. That's not how they're built. The gesture engine is identical in every configuration; a fixed setting just holds one of its inputs constant. The chord you play with the left hand fixed to major is exactly the chord you'd play with tilt held perfectly flat. Nothing is dumbed down.",
          "That matters because it means the skills transfer. Chord shapes you learn with mode fixed are the same shapes you'll use with tilt live. You're not learning a training-wheels version and then relearning the real thing.",
        ],
      },
      {
        heading: "Accessibility, not just convenience",
        paragraphs: [
          "The fixed settings also matter for people who find a specific gesture physically difficult. Wrist tilt assumes a range of rotation that isn't universal. Holding four fingers in a specific count for an extended time can be tiring or impossible for some hands. Fixing that dimension means the gesture is no longer required to play at all, without changing anything about how the instrument sounds.",
          "There's no separate accessibility mode because there doesn't need to be one. The same settings that help a beginner focus also remove a barrier for someone who can't perform a particular gesture. The instrument is the same for both.",
        ],
      },
      {
        heading: "A practical learning path",
        paragraphs: [
          "Start with both fixed: left hand major, right hand triad. Learn the seven finger counts until you can hit any degree on demand. Then unfix the left hand and add tilt, practicing deliberate major/minor switches. Then unfix the right hand and explore voicings. Add the octave thumb last.",
          "At each stage, Learn mode works with whatever you've fixed — targets that require a fixed-off dimension will simply match automatically on that component. So you can run guided practice at every step of the path, not just at the end.",
        ],
      },
      {
        heading: "How the fixed settings work under the hood",
        paragraphs: [
          "The gesture engine produces a bundle every frame: degree from the left hand's finger count, world from its tilt, quality from the right hand's count, octave from its thumb. The fixed settings don't bypass any of that detection. They substitute a constant for one field of the bundle after detection and before stabilization. With mode fixed to major, the tilt is still measured — it's just ignored in favor of the constant. That's why there's no audible difference between a fixed world and a perfectly level wrist: downstream, they're the same bundle.",
          "This also means Learn mode doesn't need a special case. It compares the stabilized bundle against the target. If the world field is a constant that happens to match, the chip is green; if the target wants the other world, the chip stays red and the only fix is to change the setting (or unfix it). The practice panel is honest about this rather than silently passing a mismatched component.",
        ],
      },
      {
        heading: "Settings are saved, and what that means",
        paragraphs: [
          "Everything in the Settings sheet persists in your browser's local storage: key, voice, left-hand control, right-hand control, and sequencer visibility. Nothing is sent to a server. Close the tab, come back next week, and the instrument is configured as you left it. Clearing site data resets everything to defaults — full gesture control, key of A, Bright voice, sequencer hidden.",
          "The one exception is key during Learn mode. Opening a song switches the key to the song's key so the targets make musical sense; exiting practice restores your saved key. The song never overwrites your preference.",
          "If the saved settings ever load in an unexpected state — a voice name that doesn't exist, for instance — the loader falls back to the default for that one field rather than discarding everything. That's a small robustness detail, but it means a future change to the settings format can't lock a returning user out of their other preferences.",
        ],
      },
      {
        heading: "When to stop simplifying",
        paragraphs: [
          "The fixed settings are scaffolding, and scaffolding should come down. A reasonable test: if you can hit any degree on demand with the HUD closed, un-fix the left hand's mode. If you can flip major/minor deliberately on every attempt, un-fix the right hand's quality. If you find yourself never using a dimension even when it's live — always playing triads, say — that's not a problem; fix it again and don't think of it as a step backward. The instrument is meant to be configured to how you actually play.",
          "For players who fix a dimension for accessibility reasons rather than learning reasons, there is no \"stop.\" The simplified configuration is the instrument, permanently, and it sounds exactly the same.",
        ],
      },
    ],
    faq: [
      {
        q: "Does fixing a setting change how the instrument sounds?",
        a: "No. It holds one gesture input constant. The chord you get with mode fixed to major is identical to the chord you'd get with tilt held flat.",
      },
      {
        q: "Which setting should a beginner change first?",
        a: "Fix the left hand's mode. Wrist tilt is the hardest gesture to hold steady, and locking it removes accidental major/minor flips while you learn finger counts.",
      },
      {
        q: "Are settings saved?",
        a: "Yes, locally in your browser. Key, sound, hand controls, and sequencer visibility all persist across visits.",
      },
      {
        q: "Does opening a Learn mode song change my saved key?",
        a: "No. The song's key is applied temporarily for practice and your saved key is restored afterward.",
      },
      {
        q: "Can I use Learn mode with controls fixed?",
        a: "Yes. A fixed dimension matches its target component automatically, so guided practice works at every stage of simplification.",
      },
      {
        q: "Is there a separate accessibility mode?",
        a: "No, and deliberately so. The same fixed-control settings that help beginners focus also remove the requirement to perform a gesture someone can't make, with no change to the instrument.",
      },
    ],
  },
  {
    slug: "choosing-wavehands-four-synth-voices",
    title: "Choosing WaveHand's Four Synth Voices",
    description:
      "Every chord in WaveHand used to sound the same. Here's why we added four oscillator voices, what each waveform actually is, the loudness problem that came with them, and how loops remember the voice they were recorded with.",
    date: "2026-09-19",
    image: {
      src: "/screenshots/wavehand-settings-sheet.png",
      alt: "The Sound selector in WaveHand's Settings sheet, set to Bright",
    },
    sections: [
      {
        heading: "One sound for everyone",
        paragraphs: [
          "For a long time, every chord in WaveHand played through the same waveform: a sawtooth oscillator. It was chosen for a good reason — a sawtooth is bright and harmonically rich, so it cuts through even on a laptop's built-in speakers and makes chord changes easy to hear. But it meant nobody could change the one thing that most shapes an instrument's personality: its tone.",
          "The voice picker in Settings adds three more waveforms alongside the original. It's a small feature with an outsized effect on how the instrument feels, and it came with a non-obvious engineering problem worth explaining.",
        ],
      },
      {
        heading: "What the four waveforms are",
        paragraphs: [
          "All four voices are native Web Audio oscillator types — basic periodic waveforms the browser's audio engine generates directly. There are no samples to load and no audio files to fetch, which is why switching voices is instant.",
          "Bright is the original sawtooth: a ramp wave containing every harmonic, which is what gives it its edge. Soft is a sine wave: a single pure frequency with no harmonics at all, the smoothest and most mellow sound possible. Mellow is a triangle wave: odd harmonics only, falling off quickly, so it sits between sine and sawtooth — warmer than Bright, more present than Soft. 8-bit is a square wave: odd harmonics that fall off slowly, producing the hollow, buzzy tone associated with early video game sound chips.",
          "Each is a genuinely different timbre, not an effect layered on one sound. The same chord played through all four is recognizably the same chord with four distinct characters.",
        ],
      },
      {
        heading: "The loudness problem",
        paragraphs: [
          "The four waveforms are not equally loud at the same amplitude. This isn't a bug — it's physics. Perceived loudness depends heavily on harmonic content, and a sine wave carries only its fundamental while a sawtooth carries a full series of harmonics above it. At identical peak amplitude, a sine sounds noticeably quieter than a sawtooth, and a triangle sits in between. A square wave, with its strong odd harmonics, sounds louder still.",
          "Shipping the voice picker without correcting for this would have meant that picking Soft made the instrument suddenly quieter and picking 8-bit made it suddenly louder, for no reason a player would understand. It would feel like a volume bug, not a tone choice.",
          "So each voice carries its own gain compensation: a per-voice multiplier applied to the output level. Sine and triangle are boosted; square is pulled back slightly; sawtooth is the reference at one. The values were set by ear, matching perceived loudness across the four at a typical playing volume, and they apply both to live playback and to loops.",
        ],
      },
      {
        heading: "Switching voices mid-note",
        paragraphs: [
          "Web Audio lets an oscillator's waveform type be changed while it's running, so WaveHand switches voice on the oscillators that are already sounding rather than stopping and restarting them. The result is that changing the Sound setting while holding a chord changes the tone instantly, with no click and no gap. You can audition all four voices on a single sustained chord.",
          "The gain compensation updates at the same moment, so the perceived volume stays level across the switch.",
        ],
      },
      {
        heading: "Loops remember their voice",
        paragraphs: [
          "The loop pedal records steps, not audio, and each step stores the voice that was active when it was played. When a loop is rendered back, every step uses its own recorded voice and that voice's gain compensation — not whatever voice is currently selected. A loop recorded on Soft keeps playing Soft after you switch the live instrument to 8-bit.",
          "This means you can layer different voices across tracks: a Soft chord bed on one track, a Mellow bassline on another, 8-bit lead live on top. The voice is a property of what you played, not a global setting applied at playback.",
          "The same per-step storage is what lets a hand-placed chord in the beat grid take the current voice at the moment you place it, while leaving previously recorded steps untouched.",
        ],
      },
      {
        heading: "Theremin mode is the exception",
        paragraphs: [
          "The voice picker only affects Gesture mode. Theremin mode always uses a sine wave, regardless of the Sound setting. A theremin's characteristic tone is close to a pure sine, and the mode is about pitch control by ear — a harmonically rich waveform would make small pitch differences harder to hear. Keeping it fixed is a deliberate choice, not an oversight.",
        ],
      },
      {
        heading: "Picking a voice for the job",
        paragraphs: [
          "Bright is the best default for laptop speakers and for hearing chord changes clearly while learning. Soft is the choice for sustained pads and anything where you want the chords to sit behind a melody. Mellow is a good middle ground for recording loops that will have something layered on top. 8-bit is the fun one — it also happens to make inversions and sevenths very audible because its harmonics emphasize the voicing differences.",
          "There's no wrong answer. The point of having four is that the instrument can sound like yours.",
        ],
      },
      {
        heading: "What a waveform actually is",
        paragraphs: [
          "An oscillator produces a repeating pressure pattern at a given frequency. The shape of one repetition is the waveform, and it determines which overtones — whole-number multiples of the fundamental frequency — are present and how strong they are. A sine wave is the simplest possible shape, a pure undulation, and it contains only the fundamental. Every other periodic waveform is, mathematically, a sine fundamental plus a specific recipe of overtones.",
          "A sawtooth ramps up and drops sharply. That sharp drop produces every overtone, each one weaker than the last, which is why it sounds bright and full. A square wave alternates between two levels; the symmetry cancels the even-numbered overtones, leaving only the odd ones at considerable strength, which produces a hollow, reedy buzz. A triangle wave also has only odd overtones, but they fall off much faster than a square's, so it sounds rounder — a sine with a little edge.",
          "This is why the same chord sounds different through each voice while remaining recognizably the same chord: the fundamentals (the notes) are identical, and only the overtone recipe changes. It's also why the filter behaves differently per voice. A low-pass filter removes high overtones; on a sine there are none to remove, so a filter sweep on Soft is subtle. On Bright, it's dramatic.",
        ],
      },
      {
        heading: "How the gain compensation was set",
        paragraphs: [
          "Perceived loudness is not a simple function of amplitude. The ear is more sensitive to some frequencies than others, and a signal with energy spread across many overtones tends to sound louder than one with the same peak amplitude concentrated in a single frequency. The compensation values were found by playing the same chord through each voice at the same volume setting and adjusting until all four sounded equally loud to a listener — a by-ear match, not a measurement.",
          "The result is a multiplier per voice: the sine is boosted the most, the triangle a little less, the sawtooth is the reference at one, and the square is pulled back slightly. The same multiplier applies when a loop step is rendered with that voice, so a loop recorded on Soft stays at the same perceived volume as the live instrument when both are playing. Without the per-step storage, switching the live voice would have changed the loop's loudness retroactively.",
        ],
      },
      {
        heading: "Combinations worth trying",
        paragraphs: [
          "Soft voice, filter closed, octave down: a warm synth bass that sits under anything. Bright voice, filter fully open, three fingers on the right for sevenths: a classic sawtooth pad with harmonic richness. 8-bit voice, filter open, triads only: a chiptune lead that cuts through a mix. Mellow voice with a slow filter sweep during a sustained chord: the most \"analog synth\" sound in the instrument.",
          "Across tracks, contrast works better than matching. A Soft chord bed, a Mellow bassline, and a Bright or 8-bit live lead each occupy a different part of the harmonic spectrum, so they stay distinguishable even when they share notes. Four voices on four tracks is one of the few places where the looper's four-track ceiling feels exactly right.",
        ],
      },
    ],
    faq: [
      {
        q: "What are the four voices?",
        a: "Bright (sawtooth), Soft (sine), Mellow (triangle), and 8-bit (square) — four native Web Audio oscillator waveforms, each a distinct timbre.",
      },
      {
        q: "Why does Soft sound quieter in other synths but not here?",
        a: "Sine waves carry no harmonics and sound quieter at the same amplitude. WaveHand applies a per-voice gain compensation so all four sound equally loud.",
      },
      {
        q: "Can I change the voice while playing?",
        a: "Yes. The waveform switches on the running oscillators, so a held chord changes tone instantly with no gap or click.",
      },
      {
        q: "Does changing the voice change my recorded loops?",
        a: "No. Each loop step stores the voice it was recorded with and plays back using that voice, so loops keep their sound when you switch the live instrument.",
      },
      {
        q: "Why doesn't the voice setting affect Theremin mode?",
        a: "Theremin mode always uses a sine wave, which is closest to a real theremin's tone and keeps small pitch differences easy to hear.",
      },
      {
        q: "Is the voice setting saved?",
        a: "Yes, with the rest of your settings, locally in your browser.",
      },
    ],
  },
  {
    slug: "the-camera-bug-that-took-two-tries-to-fix",
    title: "The Camera Bug That Took Two Tries to Fix",
    description:
      "A real engineering postmortem: how a camera-startup bug in WaveHand survived a first fix, what the actual root cause turned out to be, and the rule that came out of it for any code that opens a device stream in a React effect.",
    date: "2026-09-26",
    sections: [
      {
        heading: "What Strict Mode does on purpose",
        paragraphs: [
          "React's Strict Mode, which is on in WaveHand's development build, deliberately runs certain effects twice: mount, unmount, mount again. It does this specifically to catch code that isn't safe to run more than once — code that assumes it will only ever set something up a single time. The double invocation only happens in development, but the bugs it reveals are real bugs that would eventually show up in production under a legitimate remount.",
          "WaveHand's camera-starting effect is exactly the kind of code Strict Mode exists to test. It requests a webcam stream, waits for a video element to be ready, downloads and initializes a hand-tracking model, and starts an animation loop. Each of those is an asynchronous step with a resource behind it. It did not survive the double invocation cleanly at first.",
        ],
      },
      {
        heading: "The symptom",
        paragraphs: [
          "In development, the camera would sometimes fail to start, or start and then stop, or — the most confusing version — appear to work while the camera's hardware indicator light stayed on after the component had unmounted. That last one is the tell: a stream had been acquired and never released. The browser still considered the camera in use even though nothing in the app was reading it.",
        ],
      },
      {
        heading: "The first fix, and why it was wrong",
        paragraphs: [
          "The obvious fix reached for the obvious guard: a boolean flag stored in a ref that remembered whether the camera had already started. On the second Strict Mode invocation, the effect would see the flag, do nothing, and return. The double getUserMedia call stopped. The bug seemed fixed.",
          "It introduced a subtler one. The same guard also blocked legitimate remounts — any time the component genuinely unmounted and mounted again, the flag was still set and the camera never restarted. And the cleanup logic only stopped a camera stream it could find already attached to the video element. If a stream had been acquired but the video element hadn't been wired to it yet when the component unmounted, cleanup found nothing to stop. The stream leaked, and the camera light stayed on.",
          "The root problem is that a boolean \"already started\" guard is designed to survive across separate effect invocations. That's precisely the property that breaks a remount. The guard was answering the wrong question — \"has this ever run?\" — when the right question was \"is this particular run still wanted?\"",
        ],
      },
      {
        heading: "The actual fix",
        paragraphs: [
          "The real fix replaces the persistent flag with a cancellation flag scoped to a single effect run. Each invocation of the effect creates its own local `cancelled` variable, initially false. The cleanup function for that invocation sets it to true. Every asynchronous step in the startup sequence — after requesting the camera, after the video starts playing, after the model loads, after the landmarker initializes — checks the flag and bails out if it's been set.",
          "Now the Strict Mode sequence works correctly. The first invocation starts, its cleanup immediately cancels it, and every pending step in that first run sees the flag and stops without touching state. The second invocation starts fresh with its own flag and runs to completion. A legitimate remount behaves identically.",
          "The stream leak was fixed separately. The acquired camera stream is now stored in a plain local variable the moment getUserMedia returns, independent of whether it's been attached to the video element. Cleanup stops whichever stream it can find — the one on the video element if attached, the local one if not — so an early cancel can't leave a stream running.",
        ],
      },
      {
        heading: "The rule that came out of it",
        paragraphs: [
          "The lesson generalized past this one bug. Any code that opens a long-lived resource inside a React effect — a camera, a WebSocket, an audio context, a subscription — needs to check a per-run cancellation flag after every await, not guard itself with a flag that persists across runs. And the resource must be tracked somewhere cleanup can reach regardless of how far the setup sequence got.",
          "That rule is now written directly into this codebase's engineering notes, specifically so a future change to the camera code doesn't reintroduce the pattern. \"Just add a guard flag\" is the natural instinct, and it's the wrong one.",
        ],
      },
      {
        heading: "Why it's worth writing down",
        paragraphs: [
          "Most bugs get fixed and forgotten. This one is worth a post because the first fix looked correct, passed casual testing, and shipped a leak. The failure was only visible under conditions — an unmount mid-startup — that are easy to miss by hand and that Strict Mode exists to force. If you build anything that touches a device stream in React, the two-tries version of this story is the one to remember.",
        ],
      },
      {
        heading: "The startup sequence, step by step",
        paragraphs: [
          "It helps to see how many places the sequence can be interrupted. First, request the camera stream — this awaits the browser's permission prompt and device setup, which can take anywhere from milliseconds to many seconds if the user is deciding. Second, attach the stream to a video element and wait for it to start playing. Third, download the hand-tracking runtime. Fourth, download the model file and create the landmarker, preferring the GPU and falling back to CPU if that fails. Fifth, start the per-frame detection loop.",
          "Each of those is an `await`. Between any two of them, the component can unmount — because Strict Mode is double-invoking in development, or because the user navigated away, or because a parent re-rendered with a different key. The per-run `cancelled` flag is checked after every one of those awaits. If it's set, the function returns without touching state and without starting the next step. The stream acquired in step one is stopped by the cleanup regardless of whether step two ever ran.",
        ],
      },
      {
        heading: "The same rule in the rest of the codebase",
        paragraphs: [
          "The pattern turned out to be relevant beyond the camera. The hand-tracking library itself was later moved from a static import to a dynamic one inside this same startup function, to keep it out of the initial page bundle. That dynamic import is another `await`, and it got the same `cancelled` check immediately after it — exactly because this bug had established the rule. A new await in the sequence without the check would have reopened the original leak in a slightly different form.",
          "The audio side has a related but milder version. The Web Audio context is created lazily on the first user gesture and resumed when the tab regains focus. Those are idempotent by construction — creating an audio context twice is harmless, resuming an already-running one is a no-op — so they didn't need the cancellation pattern. The distinction is whether the resource leaks when acquired twice. Cameras do; audio contexts don't.",
        ],
      },
      {
        heading: "How to tell if you have this bug",
        paragraphs: [
          "In development with Strict Mode on: your camera indicator light turns on, your effect's cleanup runs, and the light stays on. Or: the camera starts on first load but refuses to start after a hot reload or a route change back to the page. Either symptom points at a persistent guard flag or a cleanup that can't find the stream.",
          "In production: users report the camera light staying on after leaving the page, or the camera failing to start on the second visit without a full reload. These are rarer because production doesn't double-invoke, but any legitimate remount triggers the same path.",
          "The test that catches it: mount the component, unmount it before the camera promise resolves, and assert that the stream's tracks were stopped. If your cleanup only looks at the video element, that test fails.",
        ],
      },
    ],
    faq: [
      {
        q: "What is React Strict Mode?",
        a: "A development-only mode that intentionally runs effects twice (mount, unmount, mount) to surface code that isn't safe to run more than once. It doesn't affect production builds.",
      },
      {
        q: "Why was a boolean 'started' flag the wrong fix?",
        a: "It persists across effect runs, so it blocked legitimate remounts and left a camera stream leaked when cleanup ran before the video element was attached.",
      },
      {
        q: "What's the correct pattern?",
        a: "A per-run `cancelled` flag set by that run's cleanup and checked after every await, plus storing the acquired stream in a local that cleanup can always reach.",
      },
      {
        q: "Does this bug affect me as a user?",
        a: "Not anymore. The symptom — camera failing to start or staying on after leaving — was fixed. The post documents how so it isn't reintroduced.",
      },
      {
        q: "Why did the camera light stay on?",
        a: "A media stream had been acquired but never stopped because cleanup only looked at the video element, which hadn't been attached yet. The browser kept the camera active.",
      },
    ],
  },
  {
    slug: "making-a-camera-app-load-faster",
    title: "Making a Camera App Load Faster, Measured Not Guessed",
    description:
      "Two real, measured performance fixes to WaveHand's load time — a font-loading chain and an eagerly bundled hand-tracking library — found with an actual Lighthouse audit, plus what didn't change and why.",
    date: "2026-10-03",
    sections: [
      {
        heading: "Measure first",
        paragraphs: [
          "It's easy to guess at performance problems and spend an afternoon optimizing something that wasn't slow. It's more useful to run an actual audit and fix what it finds. A Lighthouse run against WaveHand's production site, in its default mobile simulation, turned up two concrete bottlenecks — and ruled out several things that would have been natural guesses.",
          "The headline numbers before the work: a performance score in the mid-60s, first contentful paint over five seconds, largest contentful paint over seven. Those are poor. But the breakdown mattered more than the score, because it pointed at specific causes.",
        ],
      },
      {
        heading: "Fix one: the font-loading chain",
        paragraphs: [
          "WaveHand's custom fonts were loaded through a CSS `@import` at the top of the main stylesheet. That nests the font request inside the stylesheet's own fetch: the browser downloads the CSS, parses it, discovers the `@import`, fetches the font provider's CSS, parses that, and only then fetches the actual font files. Four sequential network hops before any custom-font text can render. Lighthouse's network dependency tree showed this chain explicitly and attributed the better part of a second to it.",
          "The fix was to move font loading out of CSS and into the HTML head as `<link rel=\"preconnect\">` hints for the font origins followed by a direct `<link rel=\"stylesheet\">`. The browser can now open those connections and start the font fetch in parallel with the rest of the page instead of waiting for the main stylesheet to arrive and be parsed first. Same fonts, same appearance, one fewer serialized round trip on the critical path.",
        ],
      },
      {
        heading: "Fix two: the eagerly bundled vision library",
        paragraphs: [
          "The hand-tracking library is the single largest dependency in the app. It was imported statically at the top of the camera hook, which meant the bundler folded all of it into the main JavaScript file. Every visitor downloaded and parsed the entire hand-tracking engine before the page could become interactive — even though nothing uses it until the camera actually starts.",
          "Switching that one import to a dynamic `import()` inside the startup function moved the library into its own chunk. The main bundle dropped by roughly a third. The vision chunk still loads immediately on the home page (the camera starts on mount), but it loads in parallel as a separate file rather than blocking parse of everything else, and content pages that never start a camera don't load it at all.",
          "Crucially, this changed nothing about behavior. The camera starts at the same moment, the same model loads, the same cancellation checks run. The dynamic import sits behind the same per-run `cancelled` flag as every other await in that function, so the Strict Mode safety described in a previous post still holds.",
        ],
      },
      {
        heading: "What the audit ruled out",
        paragraphs: [
          "Server response time was not a problem — the root document arrived in tens of milliseconds. Total blocking time was already near zero. Layout shift was negligible. These are things a reasonable person might have spent time on, and the audit said not to.",
          "Two findings were real but not fixable in the app's code. First, the AdSense script accounts for a large share of unused JavaScript at load; that's inherent to how third-party ad scripts work, and removing it would mean removing ads. Second, the page is ineligible for the browser's back/forward cache because it requests camera permission — a platform rule for any camera-using page, not something app code controls.",
        ],
      },
      {
        heading: "What the numbers did after",
        paragraphs: [
          "Render-blocking time fell from the high hundreds of milliseconds to the low hundreds. The main bundle shrank substantially. Accessibility went to a perfect score after two unrelated fixes in the same pass (a volume meter missing a role, a start button whose label didn't match its visible text).",
          "The overall performance score moved only modestly, and it's worth being honest about why. Lighthouse's mobile test simulates a slow connection — roughly 1.6 Mbps with 150 ms latency and a 4× CPU slowdown. On that simulated network, even a lean site shows multi-second paint times, and the remaining gap is dominated by that simulation rather than by anything left to fix in the critical path. Real users on ordinary Wi-Fi or LTE load the site noticeably faster than the simulated numbers suggest; the score itself will not fully reflect that.",
        ],
      },
      {
        heading: "The general lesson",
        paragraphs: [
          "Both fixes were about when and how the browser fetches things, not about what the app does. That's where measurable wins usually hide for a client-rendered app: serialized network chains and oversized initial bundles. Neither required a new dependency or a change to the instrument.",
          "And both were only obvious after measuring. The font chain in particular looked innocent in the source — one tidy `@import` line — and only revealed its cost in the network waterfall.",
        ],
      },
      {
        heading: "Reading a Lighthouse report usefully",
        paragraphs: [
          "The score is the least useful number on the page. It's a weighted blend of several metrics under a simulated slow network, and a change that halves one real bottleneck can move it by a couple of points. The diagnostics underneath are where the information is. For this audit, three sections mattered: the render-blocking requests list (which named the font CSS and attributed a duration to it), the network dependency tree (which showed the four-hop chain visually), and the unused-JavaScript list (which named the main bundle and the ad script by size).",
          "A fourth section — the list of things that passed — was equally useful for what it ruled out. Server response time, blocking time, and layout shift all passed, which meant no time needed to go to a CDN change, a worker, or a layout fix. Reading the passes is how you avoid optimizing things that aren't slow.",
          "One trap: Lighthouse's default mobile run throttles heavily, and running it twice in a row can give scores several points apart from network variance alone. Compare diagnostics across runs, not single scores, and treat a change as real only if the specific metric it targets moved consistently.",
        ],
      },
      {
        heading: "What a dynamic import actually changes",
        paragraphs: [
          "With a static `import` at the top of a file, the bundler must include the imported module in the same output chunk as the importer — it has no way to know whether the import is needed immediately. With `await import(...)` inside a function, the bundler can emit the module as a separate file and have the importer fetch it only when that line runs. For WaveHand's camera hook, that line runs on mount, so the fetch still begins immediately on the home page. The gain isn't that the library loads later; it's that it loads in parallel as its own file, so the main bundle is smaller and parses faster, and pages that never mount the camera hook — every content page — don't fetch it at all.",
          "The risk with a dynamic import inside an async effect is the one covered in the camera-bug post: it's another `await`, so a cancellation check has to follow it. It got one. Behavior is identical to the static version except for where the bytes live.",
        ],
      },
      {
        heading: "What's left and why it's not fixed",
        paragraphs: [
          "The main bundle still includes React, the router, the audio and loop engines, and the HUD. Those are needed on every load of the instrument, so there's nothing to defer. The content pages are already lazy-loaded as separate chunks. The remaining large item is the ad script, which is not under the site's control.",
          "The honest ceiling for a client-rendered app on Lighthouse's simulated network is a first paint of a few seconds regardless of how lean the bundle is — the simulation's latency alone accounts for most of it. Real-device measurements on ordinary connections are a better guide to what users experience. For that reason the next step after these two fixes wasn't more bundle work; it was prerendering the content pages so crawlers see real HTML, which is a different kind of win.",
        ],
      },
    ],
    faq: [
      {
        q: "What were the two fixes?",
        a: "Moving font loading from a CSS @import to preconnect + stylesheet link tags in the HTML head, and switching the hand-tracking library from a static import to a dynamic import so it's a separate chunk.",
      },
      {
        q: "Did the changes alter how the instrument works?",
        a: "No. Camera and audio start at the same moment and run the same code; only how the browser fetches fonts and the vision library changed.",
      },
      {
        q: "Why didn't the Lighthouse score improve more?",
        a: "The mobile test simulates a slow 1.6 Mbps connection with heavy CPU throttling. Server response is fast; the remaining time is mostly that simulation, not an unfixed bottleneck.",
      },
      {
        q: "Why is unused JavaScript still reported?",
        a: "Most of it is the AdSense script, which is inherent to third-party ads. The app's own eager bundle was reduced by splitting out the vision library.",
      },
      {
        q: "What's back/forward cache and why is the page ineligible?",
        a: "A browser feature that restores a page instantly on back navigation. Pages that have requested camera access are excluded by browser policy, so no app change can fix it.",
      },
      {
        q: "How can I check performance myself?",
        a: "Run Lighthouse from Chrome DevTools against the live site. Compare the network dependency tree and render-blocking diagnostics, not just the score.",
      },
    ],
  },
  {
    slug: "sharing-a-camera-app-without-sharing-your-camera",
    title: "Sharing a Camera App Without Sharing Your Camera",
    description:
      "WaveHand's share feature generates a branded image instead of a screenshot of you. Here's why that was the only responsible option for a webcam app, how the card is drawn, and what happens on browsers without native sharing.",
    date: "2026-10-10",
    sections: [
      {
        heading: "The obvious design, and its problem",
        paragraphs: [
          "The obvious way to let someone share \"look what I'm playing\" is to capture whatever is on screen at that moment and hand it to the native share sheet. For most apps that's fine: the screen is the app. For a camera app, the screen is you. The most convenient share button would also be the one most likely to publish a frame of someone's live webcam feed, in their room, without a separate and explicit decision to do that.",
          "There's a reasonable argument that the user pressed Share, so they consented. But \"share this app\" and \"publish a photo of me and my surroundings\" are different intentions, and conflating them in one tap is the kind of design that produces regret. WaveHand's share feature was built to keep those two things apart.",
        ],
      },
      {
        heading: "What gets shared instead",
        paragraphs: [
          "Clicking Share generates a branded card: the app name, its real tagline, and its URL, styled with the same colors and fonts as the rest of the site. It's drawn fresh each time on a hidden canvas and converted to a PNG. It is the same image for every person who shares, on purpose. No camera frame, no personal data, nothing that varies by who's using it.",
          "Drawing it on demand rather than shipping a pre-rendered image file means it always reflects current branding without a separate asset to keep in sync. If the tagline changes, the share card changes with it. The card waits for the site's web fonts to finish loading before drawing text, so the typography matches the page even on a cold load.",
        ],
      },
      {
        heading: "Native share where it exists",
        paragraphs: [
          "Where the Web Share API is available — mainly mobile browsers — the Share action hands the generated image plus a line of text and the URL straight to the operating system's share sheet. That's the same sheet used for photos and links, so it reaches whatever apps the person actually uses to share things. If the browser supports sharing files, the card goes along as an attachment; if it supports text and URL only, those are shared without the image.",
          "If the person dismisses the share sheet, nothing happens and nothing is reported as an error. Cancelling a share is a normal action, not a failure.",
        ],
      },
      {
        heading: "Honest fallback on desktop",
        paragraphs: [
          "Most desktop browsers don't offer the Web Share API at all. On those, the native Share action simply isn't shown. There's no fake fallback that pretends to share and does something else. Instead, a Copy text action is always available: it puts the tagline and URL on the clipboard and briefly confirms it did so. That's a universal, honest fallback — it works everywhere and does exactly what it says.",
          "A broken or confusing fallback would have been worse than none. Showing a Share button that silently fails, or opens an unrelated dialog, erodes trust in every other button on the page.",
        ],
      },
      {
        heading: "What this costs",
        paragraphs: [
          "The trade-off is real: a generic card is less personal than a screenshot. There's no \"look at my chord progression\" in the image. That's accepted deliberately. Anyone who wants to share a moment of their own playing can use the global recorder to export audio, or take a screenshot themselves with full knowledge of what it contains. The share button's job is to share the app, and it does only that.",
        ],
      },
      {
        heading: "The general principle",
        paragraphs: [
          "For any app with access to a camera or microphone, the question to ask of every feature is: can this accidentally publish something the person didn't mean to publish? If the answer is yes, the feature needs a different design, not a confirmation dialog. WaveHand's share card is one small example of that principle — it makes the accidental case impossible rather than merely unlikely.",
        ],
      },
      {
        heading: "How the card is drawn",
        paragraphs: [
          "The card is a 1200 by 630 pixel canvas — the standard aspect ratio for social link previews, so it displays correctly wherever it lands. A dark gradient fills the background using the same two colors as the site's panels. A soft accent circle in the brand's mint color sits in the upper right. The app name is drawn large in the display typeface, the tagline below it in the body typeface with automatic line wrapping so a longer tagline won't overflow, and the site address along the bottom in a muted tone.",
          "Before drawing any text, the code waits for the document's fonts to finish loading. Without that step, a share triggered within the first second of a cold page load could render in a fallback system font and look wrong. If the fonts API isn't available, the wait is skipped and the canvas uses whatever font is ready — a readable card is better than no card.",
          "The canvas is converted to a PNG blob, wrapped as a file, and that's what the share sheet receives. Nothing is cached between shares. Drawing takes a few milliseconds.",
        ],
      },
      {
        heading: "Why the native share sheet",
        paragraphs: [
          "A custom share dialog with icons for specific services would need to be maintained as services change their sharing URLs, would miss whatever apps the person actually uses, and would require sending the image to a third-party upload endpoint to get a shareable link. The native sheet avoids all three. It shows the person's own installed apps, hands them the image directly as a file, and WaveHand never sees where it went.",
          "The trade-off is availability. The Web Share API with file support is common on mobile browsers and rare on desktop. Rather than detect the platform and guess, WaveHand checks for the API at render time: if `navigator.share` exists, the Share action is offered; if the browser also reports it can share files, the image goes along. Desktop users mostly see only Copy text, which is honest about what their browser can do.",
        ],
      },
      {
        heading: "What's in the shared text",
        paragraphs: [
          "The text is the site's real tagline — the same one in the page's meta description and on the start screen — followed by the URL. It's kept to one sentence so it survives platforms that truncate. There's no tracking parameter appended to the URL; a share link is the plain site address, and visits from shared links are indistinguishable from any other visit. That's intentional: adding attribution parameters would mean building a profile of who shares, which the feature was designed not to do.",
        ],
      },
    ],
    faq: [
      {
        q: "What does the Share button actually share?",
        a: "A branded card — app name, tagline, URL — generated fresh on a hidden canvas. Never a screenshot or any frame from your camera.",
      },
      {
        q: "Why not share a screenshot of my playing?",
        a: "A screenshot of a camera app is a photo of you and your room. Sharing that should be a separate, deliberate choice, not a side effect of a Share button.",
      },
      {
        q: "Why don't I see a Share option on my computer?",
        a: "Most desktop browsers don't support the Web Share API, so the native Share action isn't shown. Copy text is available everywhere as the fallback.",
      },
      {
        q: "What does Copy text do?",
        a: "Puts the tagline and URL on your clipboard and confirms briefly. It works on every browser.",
      },
      {
        q: "Can I share a recording of my playing?",
        a: "Yes — use the global recorder to export the mixed audio as a file, then share that file however you like, knowing exactly what's in it.",
      },
    ],
  },
  {
    slug: "two-ways-to-record-what-you-played",
    title: "Two Different Ways to Record What You Played",
    description:
      "WaveHand has two separate recording systems — the loop pedal and the global recorder — that do very different jobs. Here's what each captures, when to use which, and why they were kept apart instead of merged.",
    date: "2026-10-17",
    sections: [
      {
        heading: "One instrument, two recorders",
        paragraphs: [
          "It's natural to assume an instrument needs one Record button. WaveHand has two, and they aren't redundant. The loop pedal records into discrete, editable steps on one of four tracks, for building an arrangement you can loop and perform over. The global recorder captures the actual mixed audio output as it happens and turns it into a downloadable file. One thinks in musical steps; the other thinks in sound.",
        ],
      },
      {
        heading: "What the loop pedal captures",
        paragraphs: [
          "While a loop track is recording, WaveHand takes a snapshot at every sub-step of the beat grid: which notes were sounding, the volume, the filter tone, the mode, and the synth voice. It stores those snapshots as a sequence of steps. Nothing about the actual sound waves is recorded — just the parameters that produced them.",
          "On playback, the steps are rendered back into audio by a separate offline pass. Consecutive steps with the same chord are merged into one sustained note with smooth attack and release, so a held chord doesn't stutter. Because the loop is data, not audio, it can be edited afterward in the beat grid: toggle steps, place a chord, paint across several steps.",
          "The loop pedal's output goes to the same audio bus as your live playing, so loops and live notes mix naturally. Each track can be muted or soloed independently. This is a composition tool: it's for assembling parts.",
        ],
      },
      {
        heading: "What the global recorder captures",
        paragraphs: [
          "The global recorder taps the final audio bus — whatever is actually reaching your speakers — and records it as audio. Live gesture playing, every loop track that's playing, Theremin mode, all of it, exactly as a listener would hear it. It has no concept of steps, tracks, chords, or voices. It is a straightforward recording of sound.",
          "When you stop it, the recording is finalized into a file (WebM audio, the browser's native format) and offered for download. That file is yours to keep, share, or import into any audio software. Nothing is uploaded; the recording happens entirely in your browser.",
        ],
      },
      {
        heading: "Why not one recorder?",
        paragraphs: [
          "A single recorder would have to serve two incompatible goals. Loops need to be editable and re-renderable, which requires storing parameters, not sound. Export needs to capture the full mix including live playing over loops, which requires capturing sound, not parameters. A recorder that tried to do both would be worse at each.",
          "Keeping them separate also keeps each simple. The loop engine never deals with audio encoding. The global recorder never deals with step grids. When one needs to change, the other is untouched.",
        ],
      },
      {
        heading: "Using them together",
        paragraphs: [
          "The intended workflow is sequential. Build an arrangement on the loop pedal: chords on one track, a bassline on another, maybe a counter-melody on a third. Get the loop sounding right, editing steps in the beat grid as needed. Then start the global recorder, improvise live over the loop, stop the recorder, and download the result.",
          "The loop pedal's tracks are for playing with — they live in the session. The global recorder is how you keep a performance. If you only want to keep the loop itself, record the global recorder for one full loop cycle with nothing played live on top.",
        ],
      },
      {
        heading: "Limits of each",
        paragraphs: [
          "The loop pedal can only capture what WaveHand itself produces, at the beat grid's resolution of four sub-steps per beat, across at most four tracks. It can't loop external sound and never requests a microphone.",
          "The global recorder produces a browser-native WebM file. Most audio tools open it, but if you need WAV or MP3 you'll convert it afterward. And it records exactly what plays — if your loop has a mistake, the recording has it too. Fix the loop first.",
        ],
      },
      {
        heading: "How the global recorder captures the mix",
        paragraphs: [
          "Everything WaveHand plays — live synth, loop tracks, metronome — connects to one output bus before reaching your speakers. The global recorder taps that bus with the browser's media-recorder API, encoding whatever passes through it into an audio file in real time. Because it sits at the very end of the chain, it hears exactly what you hear, including volume swells, filter sweeps, and the per-voice loudness compensation. It does not re-render anything; it records.",
          "Starting it is a single click; stopping it finalizes the file and offers a download. The file is named with a timestamp so successive takes don't overwrite each other. The encoder is the browser's own, so the output format is what your browser supports natively — WebM with Opus audio in Chrome and Edge.",
        ],
      },
      {
        heading: "A short recording workflow",
        paragraphs: [
          "Build the loop first. Record chords on track one, fix any late changes in the beat grid, add a bass or counter-line on track two if you want it. Listen through two or three cycles and adjust per-track volume until the balance is right. Only then start the global recorder — it captures mistakes as faithfully as music, so the loop should be finished before you press record.",
          "Start the recorder, wait for the loop to come around to the top of a cycle, and play live over it for as many cycles as you like. When you stop the recorder, the download begins. If the first take isn't right, the loop is still there; start the recorder again. Each take is a separate file.",
          "For a clean export of just the loop with nothing live, start the recorder, keep your hands out of frame for exactly one full cycle, and stop. Trim the ends in any audio editor.",
        ],
      },
      {
        heading: "Why neither recorder touches the microphone",
        paragraphs: [
          "Both recorders capture WaveHand's own output. Neither one — nor anything else in the app — ever requests microphone access. That's a privacy decision, but it's also what makes the recordings clean: there's no room noise, no echo of the speakers, no bleed. The file you download is the synth's signal, not a microphone's picture of it.",
          "It also means the recorders can't be used to capture a real instrument or voice. If you want to layer your own singing over a WaveHand loop, export the loop and do the layering in audio software that has microphone access.",
        ],
      },
    ],
    faq: [
      {
        q: "What's the difference between the loop pedal and the global recorder?",
        a: "The loop pedal records editable steps (parameters) for building arrangements you play over. The global recorder captures the final mixed audio as a downloadable file.",
      },
      {
        q: "Which one should I use to save my music?",
        a: "The global recorder. Loop tracks live in the session; the global recorder exports a real audio file you can keep and share.",
      },
      {
        q: "Does the global recorder capture my loops too?",
        a: "Yes. It records everything reaching the output — live playing and any loop tracks that are playing — exactly as you hear it.",
      },
      {
        q: "What file format does it export?",
        a: "WebM audio, the browser's native recording format. Convert to WAV or MP3 with any audio tool if needed.",
      },
      {
        q: "Is anything uploaded when I record?",
        a: "No. Both recorders run entirely in your browser. The exported file goes straight to your downloads.",
      },
      {
        q: "Can I edit a global recording?",
        a: "Not inside WaveHand — it's a plain audio file. Edit the loop in the beat grid before recording, or edit the file in audio software afterward.",
      },
    ],
  },
  {
    slug: "reading-music-theory-through-your-hands",
    title: "Reading Music Theory Through Your Hands",
    description:
      "Roman numeral chords, inversions, and sevenths aren't just vocabulary in WaveHand — they're literally what your fingers choose. A practical tour of the theory the gesture mapping encodes, and why you don't need it to play.",
    date: "2026-10-24",
    sections: [
      {
        heading: "Degrees, not notes",
        paragraphs: [
          "Roman numeral chord names — I, ii, iii, IV, V, vi, vii° — describe a chord's position in a key without tying it to one specific note. The IV chord is a different actual chord in C major (F) than in G major (C), but it plays the same role in both: the same tension, the same tendency to move back toward I. Musicians use the numerals precisely because they transfer between keys.",
          "WaveHand's left hand picks exactly this: a degree, not a pitch. One finger is I, five fingers is V, index-plus-pinky is VI, add the thumb for VII. Change the key in Settings and every gesture produces the right chord for the new key without you changing anything about your hands. That's not a convenience feature — it's the Roman numeral system made physical.",
        ],
      },
      {
        heading: "Major and minor worlds",
        paragraphs: [
          "Wrist tilt on the left hand switches between what WaveHand calls major and minor worlds. In the major world, the degrees produce the chords you'd expect in a major key. In the minor world, they produce the chords of the parallel minor. The same finger count gives you, say, a major I chord or a minor i chord depending on tilt.",
          "This is a simplification of real harmony — in an actual major key, some degrees are naturally minor (ii, iii, vi) and in a minor key some are major. WaveHand's worlds give you the whole set as one family or the other, which is less theoretically precise but far more playable by gesture: one continuous tilt controls one audible quality.",
        ],
      },
      {
        heading: "Quality and inversion on the right hand",
        paragraphs: [
          "The right hand's finger count adds a second layer: how the chord is voiced. One finger is a plain triad, the three core notes of the chord in root position. Two fingers is a first inversion — the same three notes reordered so the third of the chord is on the bottom, which smooths voice leading between adjacent chords. Three fingers adds a seventh: a fourth note that colors the chord without changing its identity. Four fingers gives the seventh chord that most strongly wants to resolve.",
          "Major and minor worlds don't share identical quality options, because they don't function the same way musically. In the major world, four fingers is a dominant seventh — the tense, resolving sound. In the minor world, the same count is a diminished seventh, which is unstable in a different way. The quality labels in the HUD change with the world so what you see matches what you hear.",
        ],
      },
      {
        heading: "The octave thumb",
        paragraphs: [
          "Extending the right thumb drops the whole chord an octave. Musically this doesn't change the chord's identity or function at all — a C major triad an octave lower is still C major. What it changes is register: lower voicings sound heavier and work as bass; higher ones sit on top as melody support. Having the octave on a single, independent gesture means you can shift register without touching degree, world, or quality.",
        ],
      },
      {
        heading: "Why this mapping and not another",
        paragraphs: [
          "The gesture design separates the independent dimensions of a chord onto independent gestures: which chord (left fingers), which family (left tilt), how voiced (right fingers), which register (right thumb), and then the purely sonic controls of volume (right height) and tone (right tilt). That's the same separation a theory textbook makes, which is why the instrument is learnable even without the textbook.",
          "It also means the HUD can label things honestly. When it says \"V · Dominant 7th\" or \"ii · Minor 1st inv.,\" it isn't translating from some internal representation — those are literally the parameters your hands set.",
        ],
      },
      {
        heading: "You don't need any of this to play",
        paragraphs: [
          "None of the above is required. The gesture mapping works whether or not you know what an inversion is. A beginner learns \"two fingers on the left, one on the right\" as a shape, the way a guitarist learns a chord grip without necessarily knowing its spelling. The theory is there if you want to understand why certain progressions sound the way they do — I–IV–V–I, for instance, is one, four, five, one finger on the left — but the instrument never quizzes you on it.",
          "If you do want to learn theory, though, WaveHand is an unusually direct way in. Each concept is one gesture, and you hear the result instantly.",
        ],
      },
      {
        heading: "A few progressions to try",
        paragraphs: [
          "I–V–vi–IV (one, five, six, four fingers; tilt to minor for the vi) is the four-chord progression behind a very large share of popular songs. ii–V–I (two, five, one) is the fundamental jazz cadence; try it with three fingers on the right for sevenths throughout. I–vi–IV–V is the classic 1950s progression. Each of these is a small sequence of finger counts, and playing them is the fastest way to hear what the numerals mean.",
        ],
      },
      {
        heading: "How WaveHand turns a degree into frequencies",
        paragraphs: [
          "The chain from gesture to sound is short enough to follow end to end. The key setting gives a root frequency — A at 220 Hz by default, each other key a fixed ratio from it. The left hand's degree picks a note of the scale built on that root: in the major world the scale is the major scale, in the minor world it's the natural minor. That note becomes the chord's root.",
          "The right hand's quality then stacks notes above the root. A triad adds the third and fifth from the scale. An inversion rotates the stack so the third is lowest. A seventh adds the scale's seventh above the root. The dominant/diminished seventh alters that top note by a semitone depending on the world. Each note is converted to a frequency using equal temperament — every semitone multiplies frequency by the twelfth root of two — and each frequency becomes one oscillator. The octave thumb halves every frequency.",
          "There's no lookup table of chord names. The names shown in the HUD are generated from the same degree-and-quality numbers after the fact. If you ever see a chord labeled in a way you didn't expect, the label is a faithful description of the notes being played, derived the same way a theory student would derive it.",
        ],
      },
      {
        heading: "Hearing function, not just chords",
        paragraphs: [
          "The reason Roman numerals matter to musicians is function: certain degrees pull toward others. V wants to resolve to I. IV sits comfortably before V or before I. vi is the gentle substitute for I. Those pulls are what make a progression feel like it's going somewhere rather than wandering, and they're the same in every key, which is exactly why the numerals abstract the key away.",
          "WaveHand makes those pulls physical. Hold V (five fingers) with a dominant seventh (four on the right) and the tension is audible; drop to I (one finger) and it releases. Try ending a phrase on vi instead of I and notice it feels unfinished. These are the fundamental facts of tonal harmony, and because changing chords is a finger-count change rather than a hand reposition across a fretboard, you can test them faster here than on most instruments.",
        ],
      },
      {
        heading: "Learning theory from the instrument",
        paragraphs: [
          "If you want to use WaveHand as a theory tutor, a workable sequence: first, play each degree in turn with a plain triad and name it aloud — one, two, three — until the sound of each is familiar. Second, play I–IV–V–I in several keys and notice that it feels identical despite every pitch changing. Third, play a progression with one finger on the right throughout, then three fingers throughout, and listen to what sevenths add. Fourth, switch worlds mid-progression and hear the parallel minor.",
          "Learn mode complements this by labeling every target with its degree and quality, so practicing a real song is also reading a harmonic analysis of it. By the time you can play a song, you've seen its progression spelled out in numerals dozens of times. That's a more durable way to learn theory than reading about it, and it's a side effect of how the instrument is built rather than a separate feature.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to know music theory to use WaveHand?",
        a: "No. The gestures are learnable as shapes. Theory explains why they sound the way they do, but the instrument never requires it.",
      },
      {
        q: "What's a scale degree?",
        a: "A chord's position within a key, written as a Roman numeral (I through VII). WaveHand's left hand selects a degree, so the same gesture gives the right chord in any key.",
      },
      {
        q: "What's an inversion?",
        a: "The same chord with a different note on the bottom. Two fingers on the right hand gives a first inversion, which smooths movement between chords.",
      },
      {
        q: "What's the difference between a dominant and a diminished seventh?",
        a: "Both are four-note chords on the right hand's four-finger quality. In the major world it's a dominant seventh (tense, resolving); in the minor world it's a diminished seventh (unstable differently).",
      },
      {
        q: "Does the octave thumb change the chord?",
        a: "No. It changes register — the same chord an octave lower. Identity and function are unchanged.",
      },
      {
        q: "Are WaveHand's 'worlds' the same as real major and minor keys?",
        a: "Close but simplified. A real key mixes major and minor chords by degree; WaveHand's worlds give you one family at a time, which is less precise but far more playable by gesture.",
      },
    ],
  },
  {
    slug: "chord-practice-app-without-an-instrument",
    title: "Is There a Chord Practice App That Doesn't Need an Instrument?",
    description:
      "People search for chord practice and chord-change training apps hoping to skip the hardware. Here's an honest look at what a webcam-based chord trainer like WaveHand can and can't do compared to practicing on a real guitar or piano.",
    date: "2026-10-31",
    sections: [
      {
        heading: "The question people are actually asking",
        paragraphs: [
          "Searches for \"chord practice app,\" \"chord training app,\" and \"chord change practice app\" come from a specific place: wanting to work on chord fluency without always having an instrument to hand. On the train, at a desk, in a room where a guitar would be too loud. The honest question underneath is whether any app can give you something real, or whether it's all just flashcards.",
          "WaveHand's answer is a particular one. Your hands are the instrument. There's nothing to buy and nothing to carry, but it is a genuine instrument with a genuine learning curve — not a quiz.",
        ],
      },
      {
        heading: "What transfers to a real instrument",
        paragraphs: [
          "The theory transfers directly. Scale degrees, major/minor, inversions, sevenths — WaveHand's gestures are built on exactly the vocabulary a guitar or piano teacher uses, so chord progressions you learn here are the same progressions you'd play on either. Playing I–V–vi–IV with your hands teaches you what that progression is and how it sounds, which is the hard part on any instrument.",
          "Ear training transfers. Hearing chord changes, recognizing when a chord is major or minor, feeling where a progression wants to go — those are instrument-independent skills, and WaveHand gives you fast, clean feedback on all of them.",
          "Rhythm and chord-change timing transfer partly. Switching chords cleanly in time over a loop is a real skill, and the loop pedal lets you practice it against your own tempo. The physical motion is different from a fret-hand shift, but the timing and anticipation are the same problem.",
        ],
      },
      {
        heading: "What doesn't transfer",
        paragraphs: [
          "Finger strength, calluses, fret-hand stretches, strumming — none of that. WaveHand will not make barre chords easier. The physical technique of a stringed or keyed instrument is specific to that instrument, and no camera app replaces hours with the real thing.",
          "Nor does it teach chord spellings in the sense of \"which exact notes.\" You hear the chord and you know its degree and quality, but you're not placing individual notes. For a pianist who needs to know that a G7 is G–B–D–F, WaveHand won't drill that.",
        ],
      },
      {
        heading: "How WaveHand's Learn mode practices chords",
        paragraphs: [
          "Learn mode is where WaveHand is most like a dedicated chord trainer. It shows you a target chord shape for both hands, compares your live hands against it on every frame, and only advances when all four components — degree, world, quality, octave — match and you've held the shape briefly. Wrong shapes make no sound and don't advance anything. It tells you which component is wrong, not just that you're wrong.",
          "Songs come from a community library, so you're practicing real progressions from real songs rather than abstract drills. Progress through a song's sections is saved locally, so a long song can be learned across several short sessions.",
        ],
      },
      {
        heading: "The honest comparison",
        paragraphs: [
          "Compared to a real instrument, WaveHand is weaker on physical technique and stronger on zero-friction access. You can practice chord theory and progressions for ten minutes with no setup, in silence with headphones, anywhere with a laptop and a webcam. That's a real practice window that a guitar in a closet doesn't give you.",
          "Compared to flashcard-style chord apps, WaveHand is weaker on rote spelling drills and stronger on actually playing. You hear chords in context, over a loop, in a progression. That's closer to music than to memorization.",
          "It's not a replacement for an instrument you're serious about. It is a legitimate way to keep the theoretical and aural side of chord fluency moving when the instrument isn't available.",
        ],
      },
      {
        heading: "Who it's actually for",
        paragraphs: [
          "Someone learning guitar or piano who wants to internalize progressions faster. Someone curious about music theory who wants to hear it rather than read it. Someone who can't play a physical instrument for reasons of space, noise, or ability, and wants a real one anyway. And anyone who just wants to make chords with their hands in the air, which is its own reason.",
        ],
      },
      {
        heading: "A ten-minute practice routine with no instrument",
        paragraphs: [
          "Two minutes of Theremin mode first: pick a key, find the root and fifth by ear, hold each steady. This wakes up your pitch perception before you touch chords. Three minutes of free play in Gesture mode: cycle through the seven degrees with a triad, naming each. Then play the progression you're currently learning on your real instrument — I–V–vi–IV, say — and listen for the pull of each chord toward the next.",
          "Four minutes of Learn mode on a song, chart waiting for you, metronome off until the shapes are automatic. One minute to record the progression as a loop and play along once with the metronome on, concentrating on landing each change in time. Stop. Your Learn mode progress is saved; your real instrument is wherever you left it, and the progression is more familiar than it was ten minutes ago.",
        ],
      },
      {
        heading: "What makes it different from a chord chart app",
        paragraphs: [
          "Chart and flashcard apps show you a chord diagram and ask you to recall it, or scroll a chart at tempo and leave it to you to keep up. They test memory. WaveHand's Learn mode watches your hands and only advances when the shape is actually correct, which tests execution — the gap between knowing a chord and producing it on demand. It also sounds the chord when you get it right, so you're learning the sound along with the shape, which a silent diagram can't give you.",
          "The other difference is that nothing is pre-recorded. Flashcard apps often play a reference recording of the chord. WaveHand synthesizes it from your gesture, in your chosen key and voice, so the chord you hear is the one you made. That feedback loop — your hand, your sound, immediately — is closer to practicing an instrument than to studying one.",
        ],
      },
      {
        heading: "Carrying it back to the real instrument",
        paragraphs: [
          "The transfer works best if you keep the vocabulary aligned. When you learn a progression in WaveHand, say the degrees aloud. Then at your guitar or piano, say them again as you play. The hand shapes are different, but the numerals are the same, and the sound is the same, and connecting the two is the point.",
          "For chord-change speed specifically, the loop pedal is the bridge. A progression you can switch cleanly in time in WaveHand is a progression whose timing you've internalized; what remains on the real instrument is the physical motion, which you then practice knowing exactly when each change should land.",
          "What won't transfer, to repeat it plainly: finger strength, stretches, strumming, fretting pressure, and the specific voicings a given instrument favors. WaveHand is a theory, ear, and timing tool that happens to be a real instrument. It is not a substitute for the instrument you're trying to learn.",
        ],
      },
    ],
    faq: [
      {
        q: "Can WaveHand replace practicing on a real guitar or piano?",
        a: "No. It doesn't build the physical technique of a specific instrument. It does teach progressions, theory, and ear skills that transfer directly.",
      },
      {
        q: "Is it a chord-change practice app?",
        a: "Partly. You can practice switching chords cleanly in time over a loop, which trains timing and anticipation. The physical motion differs from a fret-hand shift.",
      },
      {
        q: "Does it quiz me on chord names?",
        a: "Learn mode shows targets as scale degree and quality and checks your hands against them. It doesn't drill note spellings like 'G7 = G–B–D–F.'",
      },
      {
        q: "Do I need anything besides a laptop?",
        a: "A webcam (built-in is fine) and a browser. No account, no download, no instrument, no microphone.",
      },
      {
        q: "Where do the practice songs come from?",
        a: "A community library of arrangements people have published. Each becomes a Learn mode song automatically.",
      },
      {
        q: "Can I practice silently?",
        a: "Yes — plug in headphones. The camera is the only input; nothing is captured from a microphone.",
      },
    ],
  },
  {
    slug: "loop-pedal-without-buying-one",
    title: "Can You Use a Loop Pedal Without Buying One?",
    description:
      "People ask whether looping needs dedicated hardware. For WaveHand the answer is a genuine no — here's what a browser loop station can do, how it compares to a hardware looper, and where hardware still wins.",
    date: "2026-11-07",
    sections: [
      {
        heading: "The question behind the search",
        paragraphs: [
          "\"Browser loop station,\" \"are looper pedals worth it,\" \"can you use a loop pedal with a keyboard\" — these searches share an assumption that looping is a hardware thing you buy. For guitarists it usually has been. But looping is fundamentally a software idea: record a phrase, repeat it, layer more on top. The pedal is just one way to control it.",
          "WaveHand includes a four-track looper as part of the instrument. You don't buy anything, plug anything in, or install anything. Whether that's enough depends on what you want to do with it.",
        ],
      },
      {
        heading: "What WaveHand's looper does",
        paragraphs: [
          "Set a tempo, a bar count, and beats per bar. Press record on a track: a one-bar count-in plays, then it records your gesture playing for the configured length and stops. Press record on another track to layer a second part. Each of the four tracks can be muted or soloed while everything plays, and the loop keeps running while you play live over it.",
          "Because the looper records steps rather than audio, loops are editable. Open the beat grid to toggle individual steps, place a chord by hand, or drag to paint a chord across several steps. You can fix a wrong chord without re-recording the whole track — something most hardware loopers can't do at all.",
          "Loops survive switching browser tabs in most cases, thanks to a background audio keepalive, so you can leave a loop running while you look something up.",
        ],
      },
      {
        heading: "How it compares to a hardware looper",
        paragraphs: [
          "A hardware pedal records audio from whatever you plug into it — guitar, keyboard, microphone, anything. WaveHand's looper records only WaveHand. You can't loop your voice or an external instrument through it, and it never asks for microphone access. For a guitarist who wants to loop their guitar, hardware is the answer.",
          "A hardware pedal is controlled by foot, leaving both hands free to play. WaveHand's transport is on screen, so you start and stop recording by clicking. Both hands are then free for gestures, which works well, but you can't punch in mid-phrase with a foot the way you can on a pedal.",
          "Hardware records at audio resolution. WaveHand records at four steps per beat, which is sixteenth notes at the current tempo — fine for chords and most melodies, not for fast ornamentation. On the other side, hardware loops are fixed audio; WaveHand's are editable data.",
        ],
      },
      {
        heading: "When you don't need the pedal",
        paragraphs: [
          "If what you want is to layer chord parts and improvise over them, WaveHand's looper is a complete answer. Chords on one track, a bass figure in Theremin mode on another, a counter-line on a third, live playing on top. Four tracks is enough for a full arrangement from one person.",
          "If you want to practice chord changes in time, your own loop is a more honest backing track than a fixed recording, because it's at your tempo with your voicings. Record the changes you're struggling with and play along.",
          "And if you're trying to decide whether looping as a creative practice is for you before spending money, this is a zero-cost way to find out. The workflow — record, layer, perform over — is the same idea a pedal implements.",
        ],
      },
      {
        heading: "When hardware still wins",
        paragraphs: [
          "Looping an external instrument or voice. Foot control for hands-busy playing. Audio-resolution fidelity for fast or subtle phrases. Stage use without a laptop. Any of those is a real reason to buy a pedal, and WaveHand doesn't pretend otherwise.",
        ],
      },
      {
        heading: "Keeping what you make",
        paragraphs: [
          "Loop tracks live in the session for playing with. To keep a result, use the global recorder, which captures the full mixed output — loops plus live playing — as a downloadable audio file. That file opens in any audio software and can be shared like any recording.",
        ],
      },
      {
        heading: "Your first loop without a pedal, in five minutes",
        paragraphs: [
          "Open Settings and turn on Show loop sequencer. Set the tempo to something slow — 80 beats per minute — and leave four bars of four beats. Select track one and decide on a progression you can already play: I–IV–V–I is fine. Press record. A one-bar count-in clicks; get your left hand into the one-finger shape during it.",
          "Play one chord per bar for four bars. Recording stops by itself and the loop begins playing. Now switch to Theremin mode, select track two, press record, and during the count-in lower your right hand toward the bottom of the frame. Play one low note per bar, aiming for the root of each chord by ear. Stop. You have chords and bass looping together, made with no hardware and no instrument.",
          "Switch back to Gesture mode and play over it. That's the entire loop-pedal workflow — record, layer, perform — and it took about as long as reading this section.",
        ],
      },
      {
        heading: "What a hardware pedal does that this can't",
        paragraphs: [
          "Being honest about the gaps is the point of the comparison. A hardware looper records any audio source: your guitar, your voice, a drum machine, a synth, all layered together. WaveHand loops only its own synth. A pedal is controlled by foot while both hands play an instrument that needs them; WaveHand's transport is on screen, which works because gestures don't need your hands on a surface, but it means no foot-controlled punch-in mid-phrase.",
          "A pedal captures audio at full resolution, so a fast run or a subtle slide is preserved exactly. WaveHand quantizes to four steps per beat. And a pedal works on a stage with an amplifier and no laptop. If any of those describes what you need, buy the pedal. The browser looper isn't pretending to be one; it's a looper for a different instrument.",
        ],
      },
      {
        heading: "What this can do that a pedal can't",
        paragraphs: [
          "Edit after recording. A wrong chord in a hardware loop means re-recording the layer; here it means clicking one cell in the beat grid. Paint a chord across a whole bar in one drag. Toggle a step off to hear what the progression sounds like without it, then toggle it back. These are composition tools, not performance tools, and most pedals simply don't have them.",
          "Store the voice per step, so one track can be a soft pad and another a buzzy lead, recorded at different times, playing together. Mute and solo from the screen while watching the grid. And see the loop — every chord, every step, laid out — which makes it a learning tool as much as a performance one. If you're trying to understand how a progression is built, watching it scroll past in the grid teaches more than hearing a pedal repeat it.",
        ],
      },
      {
        heading: "Deciding whether to buy one",
        paragraphs: [
          "Use WaveHand's looper for a week. If you find yourself wanting to loop something other than WaveHand — your voice, a guitar — a pedal is the answer, and you'll know it. If what you want is to build layered progressions, practice chord changes in time, and perform over your own accompaniment, you already have the tool. Looping as a creative habit is the same idea in both; the question is only what you're looping.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a loop pedal to use WaveHand's looper?",
        a: "No. The four-track looper is built into the instrument and controlled on screen. Nothing to buy or install.",
      },
      {
        q: "Can I loop my guitar or voice through WaveHand?",
        a: "No. It loops only what WaveHand itself plays and never requests microphone access. For external instruments, a hardware or software audio looper is the right tool.",
      },
      {
        q: "How many tracks are there?",
        a: "Four, each independently mutable and soloable, all sharing the same tempo and bar grid.",
      },
      {
        q: "Can I fix a mistake in a loop?",
        a: "Yes. Loops are editable steps — open the beat grid to toggle steps, place a chord, or paint a chord across steps without re-recording.",
      },
      {
        q: "What's the timing resolution?",
        a: "Four steps per beat (sixteenth notes). Enough for chords and most melodies; fast ornamentation is approximated to the nearest step.",
      },
      {
        q: "How do I save a loop?",
        a: "Use the global recorder to export the mixed audio as a WebM file. Loop tracks themselves live only in the session.",
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
