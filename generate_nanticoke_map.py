import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Circle, Polygon, PathPatch
from matplotlib.path import Path
import numpy as np

# Set up dark figure
fig, ax = plt.subplots(figsize=(11.84, 8.64), dpi=150)
fig.patch.set_facecolor('#0a0a0a')
ax.set_facecolor('#0a0a0a')

# Remove axes
ax.set_xlim(0, 100)
ax.set_ylim(0, 73)
ax.axis('off')

# Color scheme matching Allanburg map
teal = '#00e6b4'
teal_dim = '#00b894'
dark_bg = '#0a0a0a'
outline_color = '#00e6b4'

# Helper to draw glowing outline
def draw_glow_rect(ax, xy, width, height, color=teal, lw=2, glow=True):
    if glow:
        # Outer glow
        rect_glow = FancyBboxPatch(xy, width, height, boxstyle="round,pad=0.02",
                                    facecolor='none', edgecolor=color, linewidth=lw+3,
                                    alpha=0.2, zorder=1)
        ax.add_patch(rect_glow)
    rect = FancyBboxPatch(xy, width, height, boxstyle="round,pad=0.02",
                          facecolor='none', edgecolor=color, linewidth=lw, zorder=2)
    ax.add_patch(rect)

def draw_building(ax, xy, width, height, color='#1a1a2e', edge=teal, lw=1.5):
    rect = FancyBboxPatch(xy, width, height, boxstyle="round,pad=0.01",
                          facecolor=color, edgecolor=edge, linewidth=lw, alpha=0.9, zorder=3)
    ax.add_patch(rect)
    # Inner glow
    glow = FancyBboxPatch(xy, width, height, boxstyle="round,pad=0.01",
                          facecolor='none', edgecolor=edge, linewidth=lw+2, alpha=0.15, zorder=2)
    ax.add_patch(glow)

# === LAKE ERIE (bottom) ===
lake = Polygon([(0, 0), (100, 0), (100, 18), (70, 22), (40, 20), (15, 16), (0, 14)],
               closed=True, facecolor='#0d1b2a', edgecolor='#1b3a4b', linewidth=2, alpha=0.9, zorder=1)
ax.add_patch(lake)
# Lake shoreline glow
shore_x = [0, 15, 40, 70, 100, 100, 0]
shore_y = [14, 16, 20, 22, 18, 0, 0]
ax.plot(shore_x, shore_y, color=teal, linewidth=1.5, alpha=0.4, zorder=2)

# === CROWN CORE PARCEL (PIN 382000065) - large central area ===
crown_points = [(22, 18), (58, 18), (62, 28), (65, 45), (60, 58), (45, 62), 
                (28, 58), (20, 45), (18, 32), (22, 18)]
crown_poly = Polygon(crown_points, closed=True, facecolor='#0f1f1a', 
                     edgecolor=teal, linewidth=2.5, alpha=0.85, zorder=2)
ax.add_patch(crown_poly)
# Crown glow
crown_glow = Polygon(crown_points, closed=True, facecolor='none', 
                     edgecolor=teal, linewidth=5, alpha=0.12, zorder=1)
ax.add_patch(crown_glow)

# === OPG NANTICOKE GENERATING STATION (top of crown area) ===
# Main OPG building complex
opg_buildings = [
    (30, 52, 8, 6),
    (40, 54, 10, 5),
    (52, 50, 7, 7),
    (35, 46, 6, 4),
    (48, 44, 5, 4),
]
for bx, by, bw, bh in opg_buildings:
    draw_building(ax, (bx, by), bw, bh, color='#1a1a2e', edge=teal, lw=1.2)

# OPG cooling towers / stacks
stacks = [(42, 62), (46, 64), (50, 63)]
for sx, sy in stacks:
    circle = Circle((sx, sy), 1.8, facecolor='#2d2d3a', edgecolor=teal, linewidth=1.5, zorder=4)
    ax.add_patch(circle)
    # Stack glow
    glow = Circle((sx, sy), 2.2, facecolor='none', edgecolor=teal, linewidth=3, alpha=0.2, zorder=3)
    ax.add_patch(glow)
    # Smoke plumes
    smoke_x = [sx, sx+1.5, sx+3, sx+4]
    smoke_y = [sy+1.8, sy+4, sy+6, sy+7]
    ax.plot(smoke_x, smoke_y, color='#555', linewidth=2, alpha=0.3, zorder=5)

# === STELCO LAKE ERIE WORKS (left/west) ===
stelco_buildings = [
    (4, 28, 12, 5),
    (6, 35, 10, 4),
    (3, 22, 8, 4),
    (8, 40, 6, 3),
]
for bx, by, bw, bh in stelco_buildings:
    draw_building(ax, (bx, by), bw, bh, color='#1f1f2e', edge='#a855f7', lw=1.2)

# Stelco boundary
draw_glow_rect(ax, (2, 20), 14, 26, color='#a855f7', lw=1.5)

# === NANTICOKE SOLAR FARM (southeast) ===
# Solar panels grid
for row in range(5):
    for col in range(8):
        sx = 72 + col * 3.2
        sy = 8 + row * 2.2
        rect = patches.Rectangle((sx, sy), 2.8, 1.8, facecolor='#1e3a5f', 
                                  edgecolor=teal, linewidth=0.5, alpha=0.8, zorder=3)
        ax.add_patch(rect)

# Solar farm boundary
draw_glow_rect(ax, (70, 5), 28, 14, color=teal, lw=1.5)

# === 500kV TRANSMISSION SPINE ===
# Main transmission line running through the site
spine_x = [15, 25, 35, 45, 55, 65]
spine_y = [68, 58, 45, 32, 22, 15]
# Draw thick glowing line
for offset in [3, 2, 1]:
    ax.plot(spine_x, spine_y, color=teal, linewidth=4+offset*2, alpha=0.08, zorder=1)
ax.plot(spine_x, spine_y, color=teal, linewidth=3, alpha=0.9, zorder=4)
# Tower icons along spine
towers = [(25, 58), (35, 45), (45, 32), (55, 22)]
for tx, ty in towers:
    # Simple tower shape
    tower = Polygon([(tx, ty-1.5), (tx-0.8, ty+1.5), (tx+0.8, ty+1.5)], 
                    closed=True, facecolor='#2d2d3a', edgecolor=teal, linewidth=1, zorder=5)
    ax.add_patch(tower)

# === ROADS / GRID LINES ===
# Horizontal roads
roads_h = [
    ([0, 100], [18, 18]),
    ([0, 100], [32, 32]),
    ([0, 65], [45, 45]),
]
for rx, ry in roads_h:
    ax.plot(rx, ry, color='#2a2a3a', linewidth=1, alpha=0.6, zorder=1)

# Vertical roads
roads_v = [
    ([22, 22], [18, 68]),
    ([38, 38], [18, 62]),
    ([58, 58], [18, 58]),
]
for rx, ry in roads_v:
    ax.plot(rx, ry, color='#2a2a3a', linewidth=1, alpha=0.6, zorder=1)

# === LABELS ===
ax.text(50, 70, 'NANTICOKE CROWN ASSEMBLY', color='white', fontsize=14, 
        fontweight='bold', ha='center', va='center', 
        fontfamily='sans-serif', alpha=0.95, zorder=10)

ax.text(50, 3, '500kV POWER GRID INFRASTRUCTURE MAP', color='white', fontsize=12, 
        fontweight='bold', ha='center', va='center', 
        fontfamily='sans-serif', alpha=0.85, zorder=10)

# Location labels with cyan color
labels = [
    (50, 60, 'OPG NANTICOKE\nGENERATING STATION', 'center'),
    (40, 35, 'CROWN CORE\nPIN 382000065', 'center'),
    (9, 32, 'STELCO\nLAKE ERIE WORKS', 'center'),
    (84, 12, 'NANTICOKE\nSOLAR FARM', 'center'),
    (50, 10, 'LAKE ERIE', 'center'),
    (62, 50, '500kV SPINE', 'left'),
]

for lx, ly, text, align in labels:
    ax.text(lx, ly, text, color=teal, fontsize=8, fontweight='bold', 
            ha=align, va='center', fontfamily='sans-serif', alpha=0.9, zorder=10)

# Scale bar
ax.plot([88, 98], [6, 6], color='white', linewidth=2, alpha=0.7, zorder=10)
ax.text(93, 5, '2 KM', color='white', fontsize=7, ha='center', va='top', alpha=0.7, zorder=10)

# North arrow
arrow_x, arrow_y = 94, 66
ax.annotate('', xy=(arrow_x, arrow_y+3), xytext=(arrow_x, arrow_y),
            arrowprops=dict(arrowstyle='->', color='white', lw=1.5), zorder=10)
ax.text(arrow_x, arrow_y+4, 'N', color='white', fontsize=8, ha='center', va='bottom', 
        fontweight='bold', alpha=0.8, zorder=10)

# Add some subtle grid background
for i in range(0, 101, 10):
    ax.axvline(i, color='#1a1a2a', linewidth=0.5, alpha=0.3, zorder=0)
for i in range(0, 74, 10):
    ax.axhline(i, color='#1a1a2a', linewidth=0.5, alpha=0.3, zorder=0)

plt.tight_layout(pad=0)
plt.savefig('/home/jamie/Desktop/Jamies VAULTS/Kimi_Agent_Niagara AI Power Belt/app/public/nanticoke-crown-assembly.jpg', 
            dpi=150, facecolor='#0a0a0a', edgecolor='none', bbox_inches='tight', pad_inches=0.1)
plt.close()
print("Nanticoke Crown Assembly map generated successfully!")
