repo: (not yet connected)
branch: main
path: docs/

## Last sync
date: 2026-11-10T00:00:00Z
commit: (unknown — repository not connected)

### Updated in this project
- Homepage icons redrawn: Motor Starting (motor + inrush trace), Protection Coordination (concave TCC pair), Generator Operating Point (G + capability curve), Switchgear Sizing (panel plan view), CPP Sizer (turbine, HRSG, stack).
- Arc Flash and Protection Coordination now carry the standard Calculate / Export / History bottom tab bar; Coordination gained a dedicated Export tab (CSV, share summary, save case).
- Coordination plot retheming: white plot ground, green dotted log grid, blue solid downstream, black dash-dot middle, red dashed upstream, and distinct colours for the reference overlays.
- Arc Flash: added 22 kV and 33 kV switchgear presets (gap 222 mm / 254 mm, working distance 910 mm / 1000 mm) and 22/33 kV voltage chips; added CSV export of the full study including the calculation trace.
- Protection Coordination: optional third device in the chain, with every consecutive pair checked separately and a per-pair margin table; the worst pair drives the verdict and the one-click fixes.
- Protection Coordination: new reference overlays — motor hot thermal curve from manually entered ×FLC/second points, motor starting at 100 % and at a reduced start voltage, and a transformer energising inrush point.
- Protection Coordination: feeder-device check against whichever reference curves are switched on, with suggested settings (motor feeder above the starting curve and below the hot thermal curve; transformer feeder below the damage curve and riding through inrush); plus CSV export.
- Worked examples reseeded to v13: Arc Flash now has three (433 V ACB, 3.45 kV MCC relay, 33 kV switchgear), Coordination has three (11 kV three-device chain with inrush, 11 kV motor feeder with thermal and 80 % V start, LV MCCB/ACB).
- Each tool's own header icon synced to the new homepage glyph (Switchgear, CPP, Generator, Motor Starting, Coordination, RoCoF, Transient, Arc Flash) — previously only the launcher was updated.
- Coordination: the Overlay reference curves controls now sit on the Downstream tab (with the inputs they drive); the Result tab gained a "Show on chart" picker to hide or show each device and overlay, all shown by default.
- App version stamp bumped to V3.4 (homepage header and footer, and `window.APP_VERSION` which every tool footer reads — it was still showing V2.2/V3.3).
- `docs/CHANGELOG.md` and a copy of this file added to the published folder so the notes travel with the download.
- Service-worker cache bumped to `electrical-tools-gh-v3-4-5`.

## Screen map
| Screen | Built from |
| --- | --- |
| Home / tool launcher | ElectricalAppM.dc.html |
| Cable Sizing (incl. Reverse) | CableAppM.dc.html, engine.js |
| Transformer Sizing | TrafoAppM.dc.html |
| Switchgear Sizing | SwgrAppM.dc.html |
| CPP Sizer | CPPAppM.dc.html |
| Generator Operating Point | GenAppM.dc.html |
| RoCoF and Nadir Frequency | DfdtAppM.dc.html |
| Transient Analysis | TransientAppM.dc.html |
| Short Circuit Calculator | SCCAppM.dc.html |
| Motor Starting Voltage Drop (incl. Reverse) | VDMAppM.dc.html |
| Arc Flash Estimator | ArcFlashM.dc.html, protlib.js |
| Protection Coordination | ProtCoordM.dc.html, protlib.js |
| Libraries / Protection Settings | LibraryM.dc.html |
| Help | HelpM.dc.html |
| Offline PWA | docs/app.html, docs/index.html, docs/sw.js, docs/manifest.json |
