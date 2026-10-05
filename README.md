# Training Coach AI v2

A mobile-first workout logger plus two-layer coaching system:

1. **Local coach engine** — works offline and applies re-entry rules, double progression, workout-role distinctions, pain/DOMS guardrails and exercise-specific increments.
2. **AI coach** — optional server-side OpenAI Responses API review that looks across recent sessions, RIR, pump, DOMS, readiness, pain notes, duration and your persistent coaching profile before prescribing the next workout.

The OpenAI API key is **never stored in the browser**. It is read from the server environment.

## Quick test on a computer (local coach only)

Open `public/index.html` directly in a browser. All logging, history, local analysis, progression and export/import features work. AI review will correctly show as unavailable because a local HTML file has no server.

## Run with AI coaching

Requires Node.js 20+ and an OpenAI API key.

macOS/Linux:

```bash
cd training_coach_ai_v2
export OPENAI_API_KEY="YOUR_KEY"
export OPENAI_MODEL="gpt-5.6"
export OPENAI_REASONING_EFFORT="high"
node server.mjs
```

Windows PowerShell (current window):

```powershell
cd training_coach_ai_v2
$env:OPENAI_API_KEY="YOUR_KEY"
$env:OPENAI_MODEL="gpt-5.6"
$env:OPENAI_REASONING_EFFORT="high"
node server.mjs
```

Then browse to:

`http://localhost:8787`

For another device on the same home network, browse to the computer's LAN IP on port 8787 (for example `http://192.168.1.50:8787`). This is fine for testing, but PWA installation/service workers generally require HTTPS on a phone.

## Install on a phone

For a true home-screen PWA with offline caching, deploy this folder to an HTTPS Node host, set `OPENAI_API_KEY` as a server-side secret/environment variable, then visit the HTTPS URL on the phone and choose **Add to Home screen / Install app**.

The project has no npm dependencies, so any Node host that can run `node server.mjs` is sufficient. Set the start command to:

`node server.mjs`

Set environment variables:

- `OPENAI_API_KEY` — required for AI review
- `OPENAI_MODEL` — default `gpt-5.6`
- `OPENAI_REASONING_EFFORT` — default `high`
- `PORT` — usually supplied automatically by the host



## Version 2.3 additions

- Past workout details now include **Edit recorded sets**. Users can retroactively correct weight, reps, and RIR for any saved set.
- Saving historical corrections automatically recalculates total weight moved, refreshes History cards/charts, and updates local coaching logic.
- If historical data is corrected, the current AI review/prescription is cleared so stale recommendations are not presented as current; run AI review again to coach from the corrected record.
- Edited sessions are timestamped in the workout detail view.

## Version 2.2 additions

- Bulldog Fitness artwork is now the installed PWA/device icon and in-app brand mark. A padded maskable icon is included so Android adaptive-icon masks do not cut off the artwork.
- History cards can be opened to inspect the full prior session: exercises, sets, weight, reps, RIR, rest, notes, readiness/DOMS, pump and session summary.
- Total weight moved is calculated from logged weight × reps, shown live during training, stored with the session, displayed in History, included in CSV export and surfaced in the coach summary.
- History includes color-coded A/B/C/D plots for total weight moved and session duration.
- Every exercise has an **Add another set** control. Added sets are marked in history and participate in total-volume calculation and the rest-timer workflow.
- Day-of readiness/DOMS logic changes the prescription before training begins. Low readiness/high DOMS reduces sets and raises target RIR; high readiness with low DOMS lets primary work run about 0.5 RIR harder. Re-entry safety limits still apply.
- Recent-session cards on the dashboard can also be opened directly.

## Coaching workflow

- Dashboard tells you the next A/B/C/D workout.
- First two exposures of each workout are treated as re-entry: reduced volume and 3–4 RIR.
- Log weight, reps, RIR, rest, readiness, DOMS, pain flags, notes and pump scores.
- Saving a workout immediately creates a local review.
- If AI is connected, saving also requests an AI review.
- The AI review does **not** silently rewrite the next session. Review it, then tap **Apply AI prescription**.
- The AI can recommend holding a load even if a simple rule would increase it, for example because the workout is a secondary exposure, DOMS is high, or recovery is poor.
- Export JSON periodically as a backup.

## Important training safety behavior

The app does not diagnose injuries. A pain/injury flag overrides normal progression. Sharp/localized, recurrent or persistent symptoms should not be trained through simply because the progression rule says to add weight.

## Updating from the old app

This v2 uses a new storage key, so it will not accidentally inherit stale state from the earlier prototype. It also uses a new cache name and network-first update strategy to avoid the stale-service-worker problem that can make an older UI appear unchanged.


## Live workout and rest timers

Version 2.1 adds a live workout timer and set-driven rest timers. Open the Log screen and press **Start training**. The workout clock runs until you press **Pause workout**; paused time is excluded. Once paused, use **Resume workout** to continue or **End workout** to finalize the session. Ending the workout writes the active training time into the Duration field automatically.

Each programmed set now has a **Complete set** button. Enter the set's reps (and any other log details), then tap Complete set. The app starts a countdown using that set's Rest value. You can add 30 seconds or skip the countdown. When rest expires, the app changes the display, vibrates when supported, and plays a short tone when the browser allows audio. The rest timer also pauses and resumes with the workout timer.

The browser cannot reliably detect the physical end of a set on its own, so the Complete set tap is the explicit trigger that makes the rest timer accurate and prevents accidental countdowns while editing the log.
