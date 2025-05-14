import os
import re

project_root = './go-route-india-travel-main'

ignore_dirs = ['.venv', 'node_modules', 'dist', 'build', '__pycache__']

file_extensions = ['.tsx', '.html', '.csv']

gps_keywords = [
    'map', 'maps', 'location', 'gps', 'coordinates', 'tracking', 'latitude', 'longitude', 'navigator.geolocation',
    'watchposition', 'getcurrentposition', 'mapcontainer', 'leaflet', 'mapbox', 'googlemaps',
    'route', 'station', 'bus', 'journey', 'transport', 'lat', 'lng'
]

patterns = [
    r'<\s*Map.*?>', 
    r'<\s*MapView.*?>',
    r'import\s+.*(map|location|gps).*from\s+',
    r'navigator\.geolocation\.(watchPosition|getCurrentPosition)',
    r'lat\s*[:=]', r'lng\s*[:=]', r'longitude\s*[:=]', r'latitude\s*[:=]'
]

def should_ignore(path):
    return any(ignored in path for ignored in ignore_dirs)

def deep_scan_file(file_path):
    score = 0
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read().lower()
            for keyword in gps_keywords:
                if keyword in content:
                    score += 2  
            for pat in patterns:
                if re.search(pat, content, flags=re.IGNORECASE):
                    score += 5  
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    
    fname = os.path.basename(file_path).lower()
    if any(k in fname for k in gps_keywords):
        score += 3  
    return score


scanned_files = {}

for root, dirs, files in os.walk(project_root):
    dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d))]
    for file in files:
        if any(file.endswith(ext) for ext in file_extensions):
            file_path = os.path.join(root, file)
            score = deep_scan_file(file_path)
            if score > 0:
                scanned_files[file_path] = score


sorted_files = sorted(scanned_files.items(), key=lambda x: x[1], reverse=True)

print("\n=== SUPER DEEP GPS INTEGRATION PREDICTION ===")
for path, score in sorted_files:
    confidence = min(100, score * 4) 
    print(f"- {path} (Confidence: {confidence}%)")
