# Electrical Engineering Suite — change log

App version V3.4 · service-worker cache `electrical-tools-gh-v3-4-5`

## V3.4

### Arc Flash Estimator
- 22 kV and 33 kV switchgear presets (conductor gap 222 mm / 254 mm, working distance 910 mm / 1000 mm) and matching 22/33 kV voltage chips.
- Calculate / Export / History bottom tab bar, in line with the other tools.
- CSV export of the whole study, including the calculation trace, shock boundaries and PPE category.
- Third worked example seeded: SS-33 33 kV switchgear, 51 element at 0.4 s.

### Protection Coordination
- Optional third device in the chain. Every consecutive pair is checked on its own and listed with its tightest margin; the worst pair drives the verdict and the one-click fixes.
- Reference overlays: motor hot thermal curve from manually entered ×FLC/second points, motor starting at 100 % volts, motor starting at a reduced start voltage, and a transformer energising inrush point.
- Feeder-device check against whichever reference curves are switched on, with suggested settings. A motor feeder must sit above the starting curve and below the hot thermal curve; a transformer feeder must sit below the damage curve and ride through inrush.
- Overlay reference curve controls now sit on the Downstream tab alongside the inputs they drive.
- Result tab has a Show on chart picker — every device and active overlay can be hidden or shown, all on by default.
- Calculate / Export / History bottom tab bar, with a dedicated Export tab (CSV, share summary, save case).
- Chart retheming: white plot ground, green dotted log grid, blue solid downstream, black dash-dot middle device, red dashed upstream, and separate colours for each reference overlay.
- Worked examples reseeded: 11 kV three-device chain with inrush, 11 kV motor feeder with thermal and 80 % V start, LV MCCB vs ACB.

### Icons
- Redrawn for Motor Starting (motor with inrush trace), Protection Coordination (concave TCC pair), Generator Operating Point (G with capability curve), Switchgear Sizing (panel plan view), CPP Sizer (turbine, HRSG, stack), RoCoF (frequency nadir plot), Transient Analysis (damped oscillation), Arc Flash Estimator (bus arc with boundary).
- Each tool's own header icon now matches its launcher icon; the Protection Settings library row matches the Coordination glyph.

## Earlier in this cycle
- Reverse-solve tabs on Cable Sizing (minimum size, maximum load) and Motor Starting Voltage Drop (largest motor startable).
- Short Circuit: phase-to-phase fault toggle, centred switchboard tags in the single line diagram, manual board voltage entry.
- Protection Settings library (renamed from Devices), read by both new tools and written back to by Coordination.

## Notes
- Device curves are generic models (gG fuses, MCCB I²t bands). Check manufacturer curves before issuing a production study.
- Motor hot thermal seed points are a generic withstand shape — replace them with the motor's own thermal sheet.
