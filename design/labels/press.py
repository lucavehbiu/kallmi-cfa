"""Turn a label print PDF into the file the printer gets.

  - text converted to outlines (Chromium embeds fonts as Type 3, which
    prepress software often rejects) — needs Ghostscript
  - TrimBox / BleedBox set so the 3 mm bleed is machine-readable — needs pypdf
  - colours stay RGB on purpose: the printer converts with their own press
    profile and ink limit. A blind conversion here put ~400 % ink on the
    black background, well over the ~300 % presses accept.

Usage: python3 press.py <in.pdf> <out.pdf> <bleed_mm>
"""
import subprocess
import sys
import tempfile

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

src, dst, bleed_mm = sys.argv[1], sys.argv[2], float(sys.argv[3])
b = bleed_mm * 72 / 25.4

with tempfile.NamedTemporaryFile(suffix=".pdf") as tmp:
    subprocess.run(
        ["gs", "-q", "-dBATCH", "-dNOPAUSE", "-dSAFER", "-sDEVICE=pdfwrite",
         "-dNoOutputFonts", "-dAutoRotatePages=/None",
         f"-sOutputFile={tmp.name}", src],
        check=True,
    )
    reader = PdfReader(tmp.name)
    writer = PdfWriter()
    for page in reader.pages:
        x0, y0, x1, y1 = (float(v) for v in page.mediabox)
        page.bleedbox = RectangleObject([x0, y0, x1, y1])
        page.trimbox = RectangleObject([x0 + b, y0 + b, x1 - b, y1 - b])
        writer.add_page(page)
    with open(dst, "wb") as f:
        writer.write(f)
