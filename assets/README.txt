This folder should contain asset files used by the site.

Place the provided logo image here with the filename:

  brs-logo-white.png

So the path from the project root will be:

  assets/brs-logo-white.png

Note: The site header references this file in `index.html`.

Video asset
-------------
If you want to include the promo video on the site, save the MP4 file here with the filename:

  brs-video.mp4

Additional brand logo
---------------------
If you have a full brand logo (color) to display above the hero, place it here with the filename:

  brs-brand.png

The hero will display `assets/brs-brand.png` above the main title. If you prefer a different name, update the `src` in `index.html` accordingly.

After placing it, the site will load the local copy at `assets/brs-video.mp4`. If you prefer to stream from Google Drive instead of saving locally, keep the file private and use the Drive preview link; the page currently includes a "View on Google Drive" button as a fallback.

Aadhaar / Verification badge
-----------------------------
Place the Aadhaar-verified badge image here with the filename:

  aadhaar-verified-employer.png

This image will be shown in the "Verified profiles" feature card on the home page. If you name it differently, update the `src` in `index.html` accordingly.

WhatsApp verification samples
-----------------------------
If you want to display screenshots or snippets that show Aadhaar-verified employers/candidates (for the "Verification examples" gallery), place them here with the filenames:

  aadhaar-verified-employer.png
  aadhaar-verified-candidate.png


Digilocker partner logo
-----------------------
If you are displaying the Digilocker partnership badge, place the logo image here with the filename:

  DigiLocker.png

The home pages reference this file to show the partnership statement in the footer and the Verified card.

The home page references these two files in the "Verification examples" section. After placing them, open `index.html` in a browser or run a local server to preview the gallery.
