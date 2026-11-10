# Electrical Engineering Suite — change log

App version V3.8 · service-worker cache `electrical-tools-gh-v3-4-9`

## V3.8
- Bottom tab bars now grow into the device safe area instead of reserving blank space under them, so the last row of buttons sits lower and the bar background fills the strip. Applied to every tool.
- Home screen no longer holds a flexible gap above the theme picker — the content runs straight through to the footer.
- Protection Coordination chart carries marked scales: long ticks and bold labels on every decade, short ticks with light labels on the 2 and 5 sub-divisions, on both axes.
- Protection Coordination Help now lists the formula for every curve type — the three IEEE C37.112 inverse shapes with their constants, definite time, instantaneous, MCCB long-time, short-time with I²t in and out, instantaneous, thermal-magnetic, the gG fuse band and the motor overload class.
- Launch animation runs for 2 seconds.
- CPP Sizer icon redrawn from the supplied sketch: generator with its coupling mark, turbine, HRSG and stack on a ground line. Updated on the launcher and in the tool header.
- All overlay reference curves in Protection Coordination now start switched off; changing the feeder type only clears the ones that no longer apply.

## V3.7 — shorter input tabs
- Number fields now pair two to a line in Protection Coordination, Arc Flash Estimator, Motor Starting Voltage Drop, CPP Sizer and Generator Operating Point. Fields with long labels, help text or a derived value underneath keep a full row, and selects, checkboxes and text areas still span the width. Touch targets stay at 44-46 px.
- Protection Coordination device tabs carry a read-only chip strip at the top — device class, current settings, motor full-load current and relay model, or transformer rating and voltages — so the figures can be checked without scrolling back.

## V3.6
- Help button added to Short Circuit, Motor Starting, Arc Flash and Protection Coordination, each with How to use, Basis and Assumptions, matching the other tools.
- Home Help section completed: Short Circuit Calculator, Transient Analysis, Arc Flash Estimator and Protection Coordination added, so all eleven tools and the libraries are covered.
- Arc Flash and Protection Coordination: History moved off the header — it lives on the bottom tab bar only.
- Protection Coordination: selecting a relay thermal curve now shows that relay's thermal formula with each term defined and a worked trip time at six times full load.
- Protection Coordination: Study settings moved from the Downstream tab to the top of the Result tab; the third-device option moved to the bottom of the Upstream tab.

## V3.5

### Protection Coordination — feeder types
- Each position now carries a feeder type. Downstream offers Motor, Transformer or Power feeder; the middle and upstream positions offer Transformer primary or Power feeder only, since a motor can only sit at the bottom of a chain.
- Protective device choices are now Relay 50/51, MCCB LSIG and HRC fuse at every position, picked from the library or entered by hand.
- A motor feeder takes a nameplate block: rated output, voltage, power factor, efficiency, full-load current (or derived from kW), locked-rotor multiple and start time. The starting envelope and hot thermal curve follow those figures, and the overlay panel stops asking for them twice.
- With Relay 50/51 on a motor feeder, the relay's own thermal curve can be selected — ABB REM, Siemens 7UM, Easergy P3M32, SEL-710, Schneider LTMR or SEPAM M87 — each seeded with its heating time constant and permitted overload, editable, plotted as an IEC 60255-8 thermal replica against the prior load.
- A transformer-primary feeder takes rating, impedance and both winding voltages. The damage curve is referred from the primary current to the chart base, which is always the downstream device's voltage (taken from the motor nameplate when the downstream feeder is a motor).
- Chart base voltage is shown on the current axis.

### Libraries
- The Protection Settings editor now states what each generic curve is modelled on, including the MCCB T-M reference (thermal-magnetic moulded-case breaker of the Schneider NSX / ABB Tmax XT class) and the LSIG reference (Micrologic / Ekip class electronic trip unit).

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
