import supabase from '../supabaseClient';

// Bucket name for storing images
const IMAGES_BUCKET = 'marketplace-images';

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The path to store the file at
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadImage = async (file, path) => {
  try {
    if (!file) return null;
    
    // Create a unique file path
    const filePath = `${path}/${Date.now()}-${file.name}`;
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from(IMAGES_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(IMAGES_BUCKET)
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} path - The path of the file to delete
 * @returns {Promise<void>}
 */
export const deleteImage = async (path) => {
  try {
    if (!path) return;
    
    // Extract the file path from the URL
    const urlObj = new URL(path);
    const pathSegments = urlObj.pathname.split('/');
    const filePath = pathSegments.slice(pathSegments.indexOf(IMAGES_BUCKET) + 1).join('/');
    
    // Delete the file
    const { error } = await supabase.storage
      .from(IMAGES_BUCKET)
      .remove([filePath]);
    
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}; 