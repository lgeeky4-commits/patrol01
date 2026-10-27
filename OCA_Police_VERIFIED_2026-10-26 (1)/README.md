# OCA Police Dispatch Demo — v1.2

**OCA = Office of City Attack**, as specified for this fictional training-style interface. This is a four-user coordination *demo*, not an authenticated or reliable real police or emergency system.

## What's new in v1.2

1. **Incident numbers:** Every map REPORT receives an automatic server-issued label such as `OCA-2026-0001`, displayed on the map pin, report card, and incident details. The sequence is in memory and restarts with the demo server.
2. **ETA countdown:** The assigned primary responder can open the incident report, enter a manually estimated **1–120 minutes**, and press **SET ETA**. Every participant who can see the incident sees the timer count down each second. Negative time is shown as **ETA OVERDUE**. This is *not* calculated from location data or the map picture.
3. **ARRIVED ON SCENE:** The primary responder can mark arrival. The incident changes to **On Scene**, the unit roster updates to **On scene**, and the timer is replaced by its recorded arrival time. The report filters include **ON SCENE**.
4. **REQUEST BACKUP:** The incident creator or assigned responder can request backup from other currently connected members of the same conversation. Others receive **ACCEPT / DECLINE**. A unit that accepts can draw a backup route to the incident, which is kept separate from the primary responder's path.

## Full incident workflow

1. Join the session using a unique unit display name (up to four people).
2. In the selected chat, choose **MAP → REPORT**, tap the original picture-based map where your fictional incident occurred, and enter its title, description, priority, and optionally a photo/video.
3. Open the new report in **REPORTS**. Its `OCA-YYYY-NNNN` incident number appears automatically.
4. Under **REQUEST UNIT ASSISTANCE**, select another connected member and press **SEND REQUEST**.
5. The invited unit presses **ACCEPT** (or **DECLINE**). Accepting automatically opens **PATH** mode, so they can tap at least two points and press **FINISH**.
6. The assigned responder opens the report in **REPORTS**, enters an ETA, and selects **SET ETA**.
7. The report creator or responder can press **REQUEST BACKUP**; other units in this room can choose whether to assist. Accepted backup members draw their own paths.
8. The primary responder presses **ARRIVED ON SCENE** when the simulated unit arrives. The incident and roster update immediately.

## Previous features retained

- Public dispatch and one-on-one private messaging with room-specific map reports.
- Original user-supplied static map (no live GPS, no online map).
- Notes/markers, paths, reports, images/videos, browser camera, hold-to-talk voice messages, and one-to-one voice/video calls.
- Sharp-cornered OCA interface, four color themes, brightness/contrast/saturation/hue filters.
- Map items disappear when their creator leaves.

## How to run

Node.js 18+ is recommended. There are no third-party server dependencies.

```sh
npm start
```

Then open `http://localhost:3000` on that computer. To use on multiple phones, upload/deploy to a host that runs Node.js and provides HTTPS; the repo root should contain `server.js` and `package.json`, with `public/` beside them. For example, connect a GitHub repo to Render as a Web Service with start command `npm start`.

## Important limits

This is a **fictional coordination/training demo**, not suitable for real emergency or law-enforcement operations. It has no identity verification, no encrypted permanent database, no real location tracking, no guaranteed delivery, and no automatically computed arrival times. Incident data (including IDs, countdowns, reports, and attachments) lives in server memory and disappears after the server restarts. Browser cameras require HTTPS/permission, and calls may require a relay server on some networks.


## Mission confirmation update

This is a fictional multiplayer roleplay map; locations and incident records are game data, not real emergency reports.

### Two-player mission confirmation
1. Place or open one of your own map items.
2. Press REQUEST MISSION CONFIRMATION.
3. A different connected player opens the same item in the same conversation/map.
4. That second player presses CONFIRM MISSION.
5. The server removes the mark for everyone in that room. The creator cannot self-confirm.

### Incident-number search
Police reports already receive numbers like `OCA-2026-0001`. The new search field in the report panel filters active incidents by number or title and also finds completed cases. Private conversation search stays scoped to that conversation. Confirmation of an incident removes any linked response routes as well.

**Storage:** All records are held in the running demo server's memory. Restarting the server clears active and completed cases. Real multi-phone calling/radio remains dependent on browser permissions and network conditions.
