export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function getFrameSrc(index: number, folder?: string) {
  const prefix = folder ? `/optimized-frames/${folder}/frame_` : `/optimized-frames/frame_`;
  return `${prefix}${String(index).padStart(4, "0")}.webp`;
}

export function getFallbackFrame(folder?: string) {
  return folder ? `/optimized-frames/${folder}/frame_0001.webp` : `/optimized-frames/frame_0001.webp`;
}
