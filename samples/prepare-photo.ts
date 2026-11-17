// SAMPLE FROM RAVA (portfolio excerpt)
// What it shows: the fix for a real bug. Symptom checks that included a photo
// were failing because full-size phone photos were too large to send.
// How it was made: written by Claude (Anthropic's AI) under Jackson Davis's
// direction. Jackson found and reported the bug on his phone; he did not
// hand-write this code.

import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

// Shrinks a photo before it is sent for an AI symptom check.
//
// Why: modern iPhone cameras produce 12-48 MP images. Even compressed, the
// encoded photo is several MB, large enough that the request failed before it
// reached the server, and over the AI provider's per-image limit. Photos picked
// from the library can also be HEIC, which the AI model doesn't accept.
// Downscaling to 1568px on the long edge (the provider's recommended maximum;
// larger images are downscaled on their side anyway, so no detail is lost) and
// re-encoding as JPEG keeps each photo to roughly 150-400 KB.

const MAX_EDGE = 1568;
const JPEG_QUALITY = 0.7;

export interface PreparedPhoto {
  mediaType: 'image/jpeg';
  data: string;
}

export async function prepareAssessmentPhoto(
  uri: string,
  width?: number,
  height?: number,
): Promise<PreparedPhoto> {
  const ctx = ImageManipulator.manipulate(uri);
  const w = width ?? 0;
  const h = height ?? 0;
  if (w > MAX_EDGE || h > MAX_EDGE || (!w && !h)) {
    // Unknown dimensions: constrain the width; most phone photos are taller
    // than wide in portrait, which still lands well under the size limit.
    ctx.resize(w >= h ? { width: MAX_EDGE } : { height: MAX_EDGE });
  }
  const image = await ctx.renderAsync();
  const saved = await image.saveAsync({
    base64: true,
    compress: JPEG_QUALITY,
    format: SaveFormat.JPEG,
  });
  if (!saved.base64) throw new Error('Photo could not be processed.');
  return { mediaType: 'image/jpeg', data: saved.base64 };
}
