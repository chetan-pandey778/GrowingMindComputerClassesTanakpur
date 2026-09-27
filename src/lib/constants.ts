// Supabase Storage URLs
export const SUPABASE_STORAGE_URL = 'https://yjibyfbbkbyblfsctqko.supabase.co/storage/v1/object/public/images';

// Specific image URLs
export const FOUNDER_IMAGE_URL = `${SUPABASE_STORAGE_URL}/Founder.jpg`;
export const LOGO_IMAGE_URL = `${SUPABASE_STORAGE_URL}/logo.png`;
export const LOGO_IMAGE_URL_JPG = `${SUPABASE_STORAGE_URL}/logo.jpg`;

// Helper function to get image URL by filename
export function getImageUrl(filename: string): string {
  return `${SUPABASE_STORAGE_URL}/${filename}`;
}

// Available gallery images (img1.jpg to img21.jpg)
export const GALLERY_IMAGES = Array.from({ length: 21 }, (_, i) => ({
  id: `img${i + 1}`,
  filename: `img${i + 1}.jpg`,
  url: getImageUrl(`img${i + 1}.jpg`)
}));

// Helper function to get random gallery image
export function getRandomGalleryImage(): string {
  const randomIndex = Math.floor(Math.random() * GALLERY_IMAGES.length);
  return GALLERY_IMAGES[randomIndex].url;
}

// Helper function to get gallery image by index (with fallback handling)
export function getGalleryImageByIndex(index: number): string {
  const safeIndex = Math.max(0, Math.min(index, GALLERY_IMAGES.length - 1));
  return GALLERY_IMAGES[safeIndex].url;
}

// Fallback placeholder URL in case Supabase images fail
export const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/800x600/1e293b/ffffff?text=Image+Not+Available';

// Logo image with fallback handling
export function getLogoUrl(): string {
  return LOGO_IMAGE_URL;
}

// Background images for different sections
export const BACKGROUND_IMAGES = {
  hero: [getImageUrl('img1.jpg'), getImageUrl('img2.jpg'), getImageUrl('img3.jpg')],
  courses: [getImageUrl('img4.jpg'), getImageUrl('img5.jpg'), getImageUrl('img6.jpg')],
  gallery: [getImageUrl('img7.jpg'), getImageUrl('img8.jpg'), getImageUrl('img9.jpg')],
  about: [getImageUrl('img10.jpg'), getImageUrl('img11.jpg')],
  contact: [getImageUrl('img12.jpg')],
  default: getImageUrl('img1.jpg')
};

// Get background image by section type
export function getBackgroundImage(section: keyof typeof BACKGROUND_IMAGES, index: number = 0): string {
  const images = BACKGROUND_IMAGES[section] || BACKGROUND_IMAGES.default;
  const safeIndex = Math.max(0, Math.min(index, images.length - 1));
  return images[safeIndex];
}
