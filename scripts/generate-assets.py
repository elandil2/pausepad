"""Generates favicon, PWA icons and the Open Graph share image into public/.

Run once (python scripts/generate-assets.py) when the brand changes; outputs are committed.
Requires Pillow. Uses Segoe UI on Windows, falls back to DejaVu Sans elsewhere.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
(PUBLIC / 'icons').mkdir(parents=True, exist_ok=True)

BG = (12, 13, 22)
TOMATO = (255, 107, 91)
LEAF = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (179, 181, 200)


def font(bold: bool, size: int):
    candidates = (
        ['C:/Windows/Fonts/segoeuib.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']
        if bold
        else ['C:/Windows/Fonts/segoeui.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']
    )
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_mark(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float):
    """Tomato with a pause symbol, matching src/components/Layout/Logo.tsx."""
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=TOMATO)
    # Leaf
    leaf = [
        (cx, cy - r * 0.96),
        (cx - r * 0.55, cy - r * 1.28),
        (cx - r * 0.2, cy - r * 0.98),
        (cx - r * 0.62, cy - r * 0.86),
        (cx, cy - r * 0.78),
        (cx + r * 0.62, cy - r * 0.86),
        (cx + r * 0.2, cy - r * 0.98),
        (cx + r * 0.55, cy - r * 1.28),
    ]
    draw.polygon(leaf, fill=LEAF)
    # Pause bars
    w, h, gap = r * 0.22, r * 0.62, r * 0.14
    top = cy - h * 0.42
    for x in (cx - gap - w, cx + gap):
        draw.rounded_rectangle([x, top, x + w, top + h], radius=w / 2, fill=WHITE)


def icon(size: int, padding: float, rounded: bool) -> Image.Image:
    scale = 4
    s = size * scale
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if rounded:
        d.rounded_rectangle([0, 0, s - 1, s - 1], radius=s * 0.22, fill=BG)
    else:
        d.rectangle([0, 0, s, s], fill=BG)
    r = s * (0.5 - padding) * 0.86
    draw_mark(d, s / 2, s / 2 + r * 0.14, r)
    return img.resize((size, size), Image.LANCZOS)


icon(192, 0.12, False).save(PUBLIC / 'icons/icon-192x192.png')
icon(512, 0.12, False).save(PUBLIC / 'icons/icon-512x512.png')
icon(512, 0.22, False).save(PUBLIC / 'icons/icon-512x512-maskable.png')
icon(180, 0.12, False).convert('RGB').save(PUBLIC / 'icons/apple-touch-icon.png')
icon(64, 0.04, True).save(PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# Open Graph image, 1200x630
W, H = 1200, 630
og = Image.new('RGB', (W, H), BG)
glow = Image.new('RGB', (W, H), BG)
gd = ImageDraw.Draw(glow)
gd.ellipse([-200, -350, 700, 350], fill=(70, 32, 34))
gd.ellipse([800, -250, 1500, 300], fill=(18, 44, 60))
og = Image.blend(og, glow.filter(ImageFilter.GaussianBlur(140)), 1.0)
d = ImageDraw.Draw(og)

# Timer ring on the right
cx, cy, R = 905, 330, 190
d.ellipse([cx - R, cy - R, cx + R, cy + R], outline=(38, 40, 54), width=18)
d.arc([cx - R, cy - R, cx + R, cy + R], start=-90, end=150, fill=TOMATO, width=18)
time_font = font(True, 104)
tw = d.textlength('25:00', font=time_font)
d.text((cx - tw / 2, cy - 72), '25:00', font=time_font, fill=WHITE)
label_font = font(False, 30)
lw = d.textlength('Focus', font=label_font)
d.text((cx - lw / 2, cy + 52), 'Focus', font=label_font, fill=MUTED)

# Brand + headline on the left
draw_mark(d, 104, 128, 36)
d.text((158, 96), 'PausePad', font=font(True, 46), fill=WHITE)
headline = font(True, 66)
d.text((72, 220), 'Free Pomodoro', font=headline, fill=WHITE)
d.text((72, 300), 'timer', font=headline, fill=WHITE)
d.text((72, 410), 'Tasks · Focus music · No sign-up', font=font(False, 32), fill=MUTED)
d.text((72, 520), 'pausepad.com', font=font(True, 30), fill=TOMATO)

og.save(PUBLIC / 'og-image.png', optimize=True)

(PUBLIC / 'favicon.svg').write_text(
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="18" r="12" fill="#ff6b5b"/>
  <path d="M16 6.5c-1.2-2-3.4-2.6-5.2-2.2 1 .9 1.6 2 1.8 3.2-1.6-.3-3.3.1-4.4 1.2 2.4.6 4.9.4 7.8-.7 2.9 1.1 5.4 1.3 7.8.7-1.1-1.1-2.8-1.5-4.4-1.2.2-1.2.8-2.3 1.8-3.2-1.8-.4-4 .2-5.2 2.2z" fill="#34d399"/>
  <rect x="12.6" y="14.5" width="2.6" height="7.5" rx="1.3" fill="#fff"/>
  <rect x="16.8" y="14.5" width="2.6" height="7.5" rx="1.3" fill="#fff"/>
</svg>
""",
    encoding='utf-8',
)
print('assets written to', PUBLIC)
