repo: (not yet connected)
branch: main
path: docs/

## Last sync
date: 2026-11-11T17:00:00Z
commit: (unknown — repository not connected)

### Updated in this project
- Protection Coordination: motor inputs on a Power feeder reduced to starting current and duration (starting power factor removed; currents now summed arithmetically).
- Protection Coordination: per-feeder "Show <tag> on chart" buttons at the foot of the Result tab replace the single switchboard tick box; each board draws in its own colour.
- Save Project pinned at the top of the Result tab in all eleven tools (it had been nested inside a button group in eight of them) and renamed from "Save case" in Protection Coordination, Short Circuit and Arc Flash — one name for one action.
- App version V3.9.5; service-worker cache `electrical-tools-gh-v3-5-5`.
- Fixed invisible SVG labels across six tools (coordination chart axis values, switchgear arrangement, RoCoF / Transient / CPP single-line diagrams, short-circuit source glyphs) — labels are now built as real SVG text nodes rather than template holes inside <text>.
- iPhone PWA shell pinned to the viewport — the bare strip under the bottom tab bar is gone (docs/index.html).
- Protection Coordination: Power feeders take peak bus load, bus power factor and the largest motor's starting current, duration and power factor; pick-up and ride-through are checked and a Switchboard loading overlay can be switched on from the Result tab and drawn on the chart.
- Relay curve lists corrected to IEC 60255-151 with TMS in Protection Coordination and Arc Flash (the editors still offered the IEEE C37.112 shapes and a time dial); Protection Settings library note updated.
- Coordination chart axis values enlarged (11 px decades, 9 px sub-divisions).
- Save case moved to the top of the Result tab in every tool and pinned while the result scrolls.
- Short Circuit Calculator: Export tab no longer rendered the Calculate step panes.
- Coordination Help Basis page now opens with an "In this case" block: the IEC shape and constants of every relay in the chain plus the equation behind each overlay switched on; references corrected to IEC 60255-151.
- App version V3.9.1; service-worker cache `electrical-tools-gh-v3-5-1`.
- Relay curves moved from IEEE C37.112 to IEC 60255-151 (LTI / SI / VI / EI) with TMS as the time setting; library entries and worked examples reseeded.
- Motor FLC in Protection Coordination is now calculated from the nameplate and read-only.
- Home Help topics each carry a Formulas used block; coordination Basis page lists the IEC constants.
- App version V3.9; service-worker cache `electrical-tools-gh-v3-5-0`.
- Bottom tab bars fill the safe-area strip in every tool; Home screen gap removed.
- Coordination chart gained marked decade and 2/5 scales on both axes; Help lists the formula for every curve type.
- Launch animation extended to 2 s; CPP Sizer icon redrawn from the supplied sketch; overlay reference curves now default to off.
- App version V3.8; service-worker cache `electrical-tools-gh-v3-4-9`.
- Input tabs shortened: number fields pair two to a line in Protection Coordination, Arc Flash, Motor Starting, CPP Sizer and Generator Operating Point; summary chips added to the Coordination device tabs. Touch targets unchanged at 44-46 px.
- App version V3.7; service-worker cache `electrical-tools-gh-v3-4-8`.
- Help button on Short Circuit, Motor Starting, Arc Flash and Protection Coordination (How to use / Basis / Assumptions); Home Help section completed so every tool is covered.
- Arc Flash and Protection Coordination: History removed from the header, kept on the bottom tab bar.
- Protection Coordination: relay thermal formula shown under the selected relay; Study settings moved to the top of the Result tab; third-device option moved to the bottom of the Upstream tab.
- App version V3.6; service-worker cache `electrical-tools-gh-v3-4-7`.
- Protection Coordination: feeder type per position (Motor / Transformer / Power feeder downstream; Transformer primary / Power feeder upstream and middle), device choice narrowed to Relay 50/51, MCCB LSIG and HRC fuse, motor nameplate block feeding the starting and thermal overlays, six selectable relay thermal curves (ABB REM, Siemens 7UM, Easergy P3M32, SEL-710, Schneider LTMR, SEPAM M87), and transformer data with both winding voltages referred to the downstream chart base.
- Protection Settings library now states the reference model behind each generic curve (MCCB T-M, LSIG, fuse, relay, O/L).
- App version V3.5; service-worker cache `electrical-tools-gh-v3-4-6`.
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
