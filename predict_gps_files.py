import os
import re

project_root = './go-route-india-travel-main'

ignore_dirs = ['.venv', 'node_modules', 'dist', 'build', '__pycache__']

file_extensions = ['.tsx', '.html', '.csv']

# Very rich list of GPS-related keywords
gps_keywords = [
    'map', 'maps', 'location', 'gps', 'coordinates', 'tracking', 'latitude', 'longitude', 'navigator.geolocation',
    'watchposition', 'getcurrentposition', 'mapcontainer', 'leaflet', 'mapbox', 'googlemaps',
    'route', 'station', 'bus', 'journey', 'transport', 'lat', 'lng'
]

# Pattern-based regexes
patterns = [
    r'<\s*Map.*?>',  # React Map component
    r'<\s*MapView.*?>',
    r'import\s+.*(map|location|gps).*from\s+',
    r'navigator\.geolocation\.(watchPosition|getCurrentPosition)',
    r'lat\s*[:=]', r'lng\s*[:=]', r'longitude\s*[:=]', r'latitude\s*[:=]'
]

def should_ignore(path):
    return any(ignored in path for ignored in ignore_dirs)

# Deep scan of a file
def deep_scan_file(file_path):
    score = 0
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read().lower()
            # Simple keyword matches
            for keyword in gps_keywords:
                if keyword in content:
                    score += 2  # basic keyword match weight
            # Regex pattern matches
            for pat in patterns:
                if re.search(pat, content, flags=re.IGNORECASE):
                    score += 5  # pattern match weight
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    # File name hint
    fname = os.path.basename(file_path).lower()
    if any(k in fname for k in gps_keywords):
        score += 3  # file name related

    return score

# Results
scanned_files = {}

for root, dirs, files in os.walk(project_root):
    dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d))]
    for file in files:
        if any(file.endswith(ext) for ext in file_extensions):
            file_path = os.path.join(root, file)
            score = deep_scan_file(file_path)
            if score > 0:
                scanned_files[file_path] = score

# Sort by highest scores first
sorted_files = sorted(scanned_files.items(), key=lambda x: x[1], reverse=True)

# Output
print("\n=== SUPER DEEP GPS INTEGRATION PREDICTION ===")
for path, score in sorted_files:
    confidence = min(100, score * 4)  # scale to 100
    print(f"- {path} (Confidence: {confidence}%)")
