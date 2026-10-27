# Electrical Tools — Complete Mobile Web App

This package combines the original **Electrical Tools** suite with the **Motor Starting Voltage Drop Calculator** in a shared, mobile-friendly home page.

## Included tools

The original Electrical Tools app remains available at `electrical-tools.html` and includes:

1. Cable Sizing
2. CPP Sizer
3. Generator Operating Point
4. Transformer Sizing
5. Generator Frequency Transient
6. Switchgear Sizing

The Motor Starting Voltage Drop Calculator is available at `voltage-drop.html`. The original calculator file is retained as `VD_Tool_RevAE.html`.

## Deploy to GitHub Pages

1. Create a GitHub repository. For a straightforward public GitHub Pages deployment, set it to **Public**.
2. Extract this package and upload **all files and folders in this directory** to the repository root. Do not upload only the ZIP file.
3. Commit the files to the `main` branch.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/(root)`, then save.
6. When GitHub finishes publishing, open the Pages URL shown in the Settings page. It usually follows `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
7. On iPhone, open that URL in Safari, tap **Share → Add to Home Screen**. On Android, open it in Chrome and use **Install app** or **Add to Home screen** if offered.

Official setup: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## App structure

- `index.html`: combined app launcher
- `electrical-tools.html`: wrapper for the original suite
- `app.html`: original bundled Electrical Tools app (preserved)
- `engine.js`: original separate cable calculation engine source/reference
- `voltage-drop.html`: wrapper for the voltage-drop calculator
- `VD_Tool_RevAE.html`: supplied Motor Starting Voltage Drop Calculator (preserved)
- `manifest.json`: installable web app metadata
- `sw.js`: app-scoped offline cache
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`: supplied app icons

## Notes and limitations

- This is a static client-side application; there is no server-side account system or shared cloud database.
- Calculator scenarios and settings use browser storage when supported. They are not automatically synchronised between devices.
- The voltage-drop calculator dynamically loads the SheetJS dependency from a CDN for Excel exports in its current supplied implementation. Excel export can therefore require internet access even when calculator pages are cached.
- The PWA cache makes a best effort to preserve app pages offline. First load and updates should be completed while online.
- Treat calculation results as engineering decision-support outputs. Validate calculation methods, standards, data libraries, project limits and OEM values before using results for design approval.
- GitHub Pages content is publicly accessible. Do not upload confidential project data or credentials.
