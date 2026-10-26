"""Generates favicon, PWA icons and the Open Graph share image into public/.

Run once (python scripts/generate-assets.py) when the brand changes; outputs are committed.
Requires Pillow. Uses Segoe UI on Windows, falls back to DejaVu Sans elsewhere.
"""
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
(PUBLIC / 'icons').mkdir(parents=True, exist_ok=True)

PURPLE = (107, 91, 240)
INK = (22, 19, 43)
TOMATO = (255, 122, 89)
LEAF = (88, 214, 141)
YELLOW = (255, 207, 51)
TINT = (241, 239, 255)
WHITE = (255, 255, 255)
MUTED = (124, 119, 153)
SITE_LABEL = 'pausepad.vercel.app'


def font(weight: str, size: int):
    candidates = {
        'black': ['C:/Windows/Fonts/seguibl.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'],
        'bold': ['C:/Windows/Fonts/segoeuib.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'],
        'regular': ['C:/Windows/Fonts/segoeui.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'],
    }[weight]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_mark(d: ImageDraw.ImageDraw, cx: float, cy: float, r: float, outline: int = 0):
    """Tomato with a pause symbol, matching src/components/Layout/Logo.tsx."""
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
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=TOMATO, outline=INK if outline else None, width=outline)
    d.polygon(leaf, fill=LEAF, outline=INK if outline else None)
    w, h, gap = r * 0.22, r * 0.62, r * 0.14
    top = cy - h * 0.42
    for x in (cx - gap - w, cx + gap):
        d.rounded_rectangle([x, top, x + w, top + h], radius=w / 2, fill=WHITE)


def dots(img: Image.Image, spacing: int, radius: float, color=(255, 255, 255, 26)):
    layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    for y in range(spacing // 2, img.size[1], spacing):
        for x in range(spacing // 2, img.size[0], spacing):
            ld.ellipse([x - radius, y - radius, x + radius, y + radius], fill=color)
    img.alpha_composite(layer)


def icon(size: int, padding: float, rounded: bool) -> Image.Image:
    scale = 4
    s = size * scale
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if rounded:
        d.rounded_rectangle([0, 0, s - 1, s - 1], radius=s * 0.24, fill=PURPLE)
    else:
        d.rectangle([0, 0, s, s], fill=PURPLE)
    r = s * (0.5 - padding) * 0.86
    draw_mark(d, s / 2, s / 2 + r * 0.14, r, outline=max(2, int(s * 0.025)))
    return img.resize((size, size), Image.LANCZOS)


icon(192, 0.12, False).save(PUBLIC / 'icons/icon-192x192.png')
icon(512, 0.12, False).save(PUBLIC / 'icons/icon-512x512.png')
icon(512, 0.22, False).save(PUBLIC / 'icons/icon-512x512-maskable.png')
icon(180, 0.12, False).convert('RGB').save(PUBLIC / 'icons/apple-touch-icon.png')
icon(64, 0.04, True).save(PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# ---------- Open Graph image, 1200x630 ----------
W, H = 1200, 630
NIGHT_TOP, NIGHT_BOTTOM = (27, 19, 82), (77, 63, 207)
og = Image.new('RGBA', (W, H))
d = ImageDraw.Draw(og)
for y in range(H):
    t = y / (H - 1)
    d.line([(0, y), (W, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(NIGHT_TOP, NIGHT_BOTTOM)))
random.seed(7)
for _ in range(70):
    x, y, r = random.uniform(0, W), random.uniform(0, H), random.uniform(1.2, 2.8)
    d.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, random.randint(150, 255)))
for x, y, s in [(560, 70, 18), (600, 520, 14), (40, 590, 16), (1170, 600, 12)]:
    d.polygon([(x, y - s), (x + s * 0.3, y - s * 0.3), (x + s, y), (x + s * 0.3, y + s * 0.3),
               (x, y + s), (x - s * 0.3, y + s * 0.3), (x - s, y), (x - s * 0.3, y - s * 0.3)],
              fill=YELLOW, outline=INK)

# Left: brand + headline
draw_mark(d, 100, 112, 34, outline=4)
d.text((150, 78), 'PausePad', font=font('black', 52), fill=WHITE)
d.text((64, 200), 'Pomodoro', font=font('black', 96), fill=WHITE)
d.text((64, 300), 'timer', font=font('black', 96), fill=WHITE)
d.text((66, 430), 'Tasks · Lofi music · No sign-up', font=font('bold', 30), fill=(230, 226, 255))

# Yellow sticker with the URL
label_font = font('bold', 28)
lw = d.textlength(SITE_LABEL, font=label_font)
x0, y0 = 64, 506
d.rounded_rectangle([x0 + 5, y0 + 5, x0 + lw + 45, y0 + 61], radius=28, fill=INK)
d.rounded_rectangle([x0, y0, x0 + lw + 40, y0 + 56], radius=28, fill=YELLOW, outline=INK, width=4)
d.text((x0 + 20, y0 + 8), SITE_LABEL, font=label_font, fill=INK)

# Right: window card
cx0, cy0, cx1, cy1 = 640, 70, 1140, 560
d.rounded_rectangle([cx0 + 12, cy0 + 12, cx1 + 12, cy1 + 12], radius=30, fill=INK)
d.rounded_rectangle([cx0, cy0, cx1, cy1], radius=30, fill=TINT, outline=INK, width=5)
# title bar
d.rounded_rectangle([cx0, cy0, cx1, cy0 + 84], radius=30, fill=WHITE, outline=INK, width=5)
d.rectangle([cx0 + 5, cy0 + 50, cx1 - 5, cy0 + 80], fill=WHITE)
d.line([cx0, cy0 + 84, cx1, cy0 + 84], fill=INK, width=5)
d.ellipse([cx0 + 24, cy0 + 20, cx0 + 68, cy0 + 64], fill=TOMATO, outline=INK, width=3)
d.text((cx0 + 84, cy0 + 16), 'PausePad timer', font=font('black', 28), fill=INK)
d.text((cx0 + 84, cy0 + 48), 'One task, no distractions', font=font('regular', 20), fill=MUTED)
# big time
tf = font('black', 132)
tw = d.textlength('25:00', font=tf)
d.text(((cx0 + cx1) / 2 - tw / 2, cy0 + 150), '25:00', font=tf, fill=INK)
# progress bar
px0, py, px1 = cx0 + 60, cy0 + 360, cx1 - 60
d.rounded_rectangle([px0, py, px1, py + 34], radius=17, fill=WHITE, outline=INK, width=4)
d.rounded_rectangle([px0 + 4, py + 4, px0 + (px1 - px0) * 0.62, py + 30], radius=13, fill=TOMATO)
# start button
bx0, by0, bx1, by1 = (cx0 + cx1) / 2 - 110, cy0 + 418, (cx0 + cx1) / 2 + 110, cy0 + 470
d.rounded_rectangle([bx0 + 5, by0 + 5, bx1 + 5, by1 + 5], radius=26, fill=INK)
d.rounded_rectangle([bx0, by0, bx1, by1], radius=26, fill=TOMATO, outline=INK, width=4)
sf = font('black', 30)
sw = d.textlength('START', font=sf)
d.text(((bx0 + bx1) / 2 - sw / 2, by0 + 6), 'START', font=sf, fill=INK)

og.convert('RGB').save(PUBLIC / 'og-image.png', optimize=True)

(PUBLIC / 'favicon.svg').write_text(
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#6b5bf0"/>
  <circle cx="16" cy="18" r="10.5" fill="#ff7a59" stroke="#16132b" stroke-width="1.6"/>
  <path d="M16 7.2c-1-1.7-2.9-2.2-4.4-1.9.8.8 1.4 1.7 1.5 2.7-1.4-.3-2.8.1-3.7 1 2 .5 4.2.3 6.6-.6 2.4.9 4.6 1.1 6.6.6-.9-.9-2.3-1.3-3.7-1 .1-1 .7-1.9 1.5-2.7-1.5-.3-3.4.2-4.4 1.9z" fill="#58d68d" stroke="#16132b" stroke-width="1"/>
  <rect x="12.8" y="14.8" width="2.4" height="6.6" rx="1.2" fill="#fff"/>
  <rect x="16.8" y="14.8" width="2.4" height="6.6" rx="1.2" fill="#fff"/>
</svg>
""",
    encoding='utf-8',
)
print('assets written to', PUBLIC)
