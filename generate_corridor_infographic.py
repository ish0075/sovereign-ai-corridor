import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Circle, Polygon, FancyArrowPatch
import numpy as np

# Set up dark figure — wide cinematic ratio
fig, ax = plt.subplots(figsize=(16, 9), dpi=150)
fig.patch.set_facecolor('#0a0a0a')
ax.set_facecolor('#0a0a0a')

ax.set_xlim(0, 160)
ax.set_ylim(0, 90)
ax.axis('off')

# Colors
teal = '#00e6b4'
white = '#ffffff'
dark_card = '#111116'
grid_line = '#1a1a2a'

# === BACKGROUND GRID ===
for i in range(0, 161, 10):
    ax.axvline(i, color=grid_line, linewidth=0.5, alpha=0.3, zorder=0)
for i in range(0, 91, 10):
    ax.axhline(i, color=grid_line, linewidth=0.5, alpha=0.3, zorder=0)

# === TITLE AREA ===
ax.text(80, 82, 'SOVEREIGN AI HYPERSCALE CORRIDOR', color=white, fontsize=22,
        fontweight='bold', ha='center', va='center', fontfamily='sans-serif', alpha=0.95, zorder=10)
ax.text(80, 75, 'CANADA', color=teal, fontsize=16,
        fontweight='bold', ha='center', va='center', fontfamily='sans-serif', alpha=0.9, zorder=10)

# === NODE 1: ALLANBURG (LEFT) ===
# Card background
allanburg_card = FancyBboxPatch((10, 28), 45, 38, boxstyle="round,pad=0.02",
                                 facecolor=dark_card, edgecolor=teal, linewidth=2, zorder=2)
ax.add_patch(allanburg_card)
# Glow
allanburg_glow = FancyBboxPatch((10, 28), 45, 38, boxstyle="round,pad=0.02",
                                 facecolor='none', edgecolor=teal, linewidth=5, alpha=0.15, zorder=1)
ax.add_patch(allanburg_glow)

ax.text(32.5, 61, 'NODE 1', color=teal, fontsize=11, fontweight='bold', ha='center', va='center', zorder=10)
ax.text(32.5, 56, 'ALLANBURG', color=white, fontsize=16, fontweight='bold', ha='center', va='center', zorder=10)
ax.text(32.5, 51, '308.279 Acres • 230 kV Grid', color='#aaaaaa', fontsize=10, ha='center', va='center', zorder=10)

# Simple building cluster representation
buildings_a = [(18, 36, 6, 4), (26, 38, 8, 5), (36, 35, 7, 5), (22, 32, 5, 3), (34, 30, 6, 3)]
for bx, by, bw, bh in buildings_a:
    b = FancyBboxPatch((bx, by), bw, bh, boxstyle="round,pad=0.01",
                       facecolor='#0f1f1a', edgecolor=teal, linewidth=1.2, alpha=0.9, zorder=3)
    ax.add_patch(b)

# === NODE 2: NANTICOKE (RIGHT) ===
nanticoke_card = FancyBboxPatch((105, 28), 45, 38, boxstyle="round,pad=0.02",
                                 facecolor=dark_card, edgecolor=teal, linewidth=2, zorder=2)
ax.add_patch(nanticoke_card)
nanticoke_glow = FancyBboxPatch((105, 28), 45, 38, boxstyle="round,pad=0.02",
                                 facecolor='none', edgecolor=teal, linewidth=5, alpha=0.15, zorder=1)
ax.add_patch(nanticoke_glow)

ax.text(127.5, 61, 'NODE 2', color=teal, fontsize=11, fontweight='bold', ha='center', va='center', zorder=10)
ax.text(127.5, 56, 'NANTICOKE', color=white, fontsize=16, fontweight='bold', ha='center', va='center', zorder=10)
ax.text(127.5, 51, '237.208 Acres • 500 kV Grid', color='#aaaaaa', fontsize=10, ha='center', va='center', zorder=10)

# Simple industrial representation
buildings_n = [(112, 36, 7, 4), (121, 38, 9, 5), (132, 35, 6, 5), (115, 32, 6, 3), (129, 30, 7, 3)]
for bx, by, bw, bh in buildings_n:
    b = FancyBboxPatch((bx, by), bw, bh, boxstyle="round,pad=0.01",
                       facecolor='#1a1a2e', edgecolor=teal, linewidth=1.2, alpha=0.9, zorder=3)
    ax.add_patch(b)

# Stacks for Nanticoke
for sx, sy in [(124, 46), (128, 47)]:
    c = Circle((sx, sy), 1.5, facecolor='#2d2d3a', edgecolor=teal, linewidth=1.2, zorder=4)
    ax.add_patch(c)

# === CONNECTING CORRIDOR LINE ===
# Dashed line between nodes with glow
for offset in [4, 2]:
    ax.plot([55, 105], [47, 47], color=teal, linewidth=2+offset, alpha=0.08, zorder=1)
ax.plot([55, 105], [47, 47], color=teal, linewidth=2, linestyle='--', alpha=0.8, zorder=4)

# Arrowheads
ax.annotate('', xy=(100, 47), xytext=(95, 47),
            arrowprops=dict(arrowstyle='->', color=teal, lw=1.5), zorder=5)
ax.annotate('', xy=(60, 47), xytext=(65, 47),
            arrowprops=dict(arrowstyle='->', color=teal, lw=1.5), zorder=5)

ax.text(80, 50, 'SOVEREIGN AI CORRIDOR', color=teal, fontsize=10, fontweight='bold',
        ha='center', va='center', zorder=10)

# === STATS BAR (BOTTOM) ===
stats = [
    ('545+', 'Total Acres'),
    ('2+ GW', 'Scalable Capacity'),
    ('230 kV + 500 kV', 'Grid Adjacency'),
    ('Day-1', 'Development Ready'),
]

start_x = 12
box_w = 34
box_h = 14
gap = 4

for i, (val, label) in enumerate(stats):
    x = start_x + i * (box_w + gap)
    y = 8
    # Card
    card = FancyBboxPatch((x, y), box_w, box_h, boxstyle="round,pad=0.02",
                          facecolor=dark_card, edgecolor=teal, linewidth=1.5, zorder=2)
    ax.add_patch(card)
    # Glow
    glow = FancyBboxPatch((x, y), box_w, box_h, boxstyle="round,pad=0.02",
                          facecolor='none', edgecolor=teal, linewidth=4, alpha=0.12, zorder=1)
    ax.add_patch(glow)
    # Text
    ax.text(x + box_w/2, y + box_h - 4, val, color=teal, fontsize=14, fontweight='bold',
            ha='center', va='center', zorder=10)
    ax.text(x + box_w/2, y + 3.5, label, color='#aaaaaa', fontsize=9,
            ha='center', va='center', zorder=10)

plt.tight_layout(pad=0)
plt.savefig('/home/jamie/Desktop/Jamies VAULTS/Kimi_Agent_Niagara AI Power Belt/app/public/sovereign ai hyperscale corridor canada.png',
            dpi=150, facecolor='#0a0a0a', edgecolor='none', bbox_inches='tight', pad_inches=0.1)
plt.close()
print("Sovereign AI Hyperscale Corridor Canada infographic generated successfully!")
