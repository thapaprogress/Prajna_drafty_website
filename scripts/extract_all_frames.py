import os
import glob
import subprocess

def extract_frames():
    root = os.getcwd()
    output_base = os.path.join(root, "public", "optimized-frames")
    os.makedirs(output_base, exist_ok=True)

    # Find all mp4 files in the root folder
    mp4_files = glob.glob(os.path.join(root, "*.mp4"))
    print(f"Found {len(mp4_files)} video files:")
    for f in mp4_files:
        print(f" - {os.path.basename(f)}")

    for video_path in mp4_files:
        filename = os.path.basename(video_path)
        
        # Determine output folder name based on video content
        if "globe" in filename.lower():
            folder_name = "globe"
        elif "office" in filename.lower():
            folder_name = "office"
        elif "city" in filename.lower() or "transforma" in filename.lower():
            folder_name = "city"
        elif "workspace" in filename.lower() or "holographic" in filename.lower():
            folder_name = "workspace"
        else:
            folder_name = os.path.splitext(filename)[0].lower().replace(" ", "_")

        output_dir = os.path.join(output_base, folder_name)
        
        # Clean existing directory to ensure no stale/extra frames exist
        if os.path.exists(output_dir):
            import shutil
            shutil.rmtree(output_dir)
        os.makedirs(output_dir, exist_ok=True)

        print(f"\nProcessing: {filename} -> {folder_name}")
        
        # Run ffmpeg to extract frames as webp
        # We scale to width 1280 (maintaining aspect ratio) and use -q:v 72 for WebP quality.
        # We explicitly use -c:v libwebp and -f image2 to extract separate images rather than an animated webp.
        output_pattern = os.path.join(output_dir, "frame_%04d.webp")
        cmd = [
            "ffmpeg",
            "-y",
            "-i", video_path,
            "-vf", "scale=1280:-1",
            "-c:v", "libwebp",
            "-q:v", "72",
            "-f", "image2",
            output_pattern
        ]
        
        try:
            print(f"Running: {' '.join(cmd)}")
            subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            # Count extracted files
            extracted = len(glob.glob(os.path.join(output_dir, "frame_*.webp")))
            print(f"Success! Extracted {extracted} frames to public/optimized-frames/{folder_name}")
        except subprocess.CalledProcessError as e:
            print(f"Error processing {filename}:")
            print(e.stderr.decode('utf-8', errors='ignore'))

if __name__ == "__main__":
    extract_frames()
