# OCA Police v1.4 — Creator Dossier

## What is new

1. Tap a mark or report. Its original report, title, timestamp, and attachment appear immediately.
2. A deliberately simulated 2–5 second loading bar reveals the creator's fictional callsign, online status, and related map/incident information. This delay does not indicate live database activity.
3. If a photo/video has already been shared with the room, the report can display it; a creator's private camera is **not** accessed automatically.
4. MIC / TALK TO CREATOR requests a private **voice call**. REQUEST LIVE CAMERA requests a private **video call**. The other participant must accept before their mic/camera can start. The creator can decline or end the call.
5. The existing public/private room boundaries, maps, marker removal, chat, and mission-confirmation behavior are retained.

## Prerequisites

- Deploy on HTTPS. Browser camera/microphone permissions are required.
- Both creator and viewer must be connected.
- Peer-to-peer WebRTC works on many networks, but strict firewalls/carrier NAT may require a TURN relay for reliability; a relay is not bundled.
- These are game character profiles/room statuses, **not** real-life surveillance profiles or real-world locations.

## Start

Upload the extracted contents (not the enclosing ZIP) to your existing app GitHub repository, keeping `package.json` and `server.js` at the top level. Redeploy on Render using `npm install` and `npm start`.
