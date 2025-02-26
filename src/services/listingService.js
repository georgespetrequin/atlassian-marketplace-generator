import supabase from '../supabaseClient';

// Table name for marketplace listings
const LISTINGS_TABLE = 'marketplace_listings';

/**
 * Save a marketplace listing to Supabase
 * @param {Object} listingData - The listing data to save
 * @param {string} userId - The ID of the user saving the listing
 * @returns {Promise<Object>} - The saved listing data with ID
 */
export const saveMarketplaceListing = async (listingData, userId) => {
  try {
    // Add timestamp and user_id for created_at
    const listingWithMetadata = {
      ...listingData,
      created_at: new Date().toISOString(),
      user_id: userId,
    };
    
    // Insert the listing into Supabase
    const { data, error } = await supabase
      .from(LISTINGS_TABLE)
      .insert([listingWithMetadata])
      .select();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data[0];
  } catch (error) {
    console.error('Error saving marketplace listing:', error);
    throw error;
  }
};

/**
 * Get all marketplace listings for a specific user
 * @param {string} userId - The ID of the user whose listings to retrieve
 * @returns {Promise<Array>} - Array of listing objects
 */
export const getMarketplaceListings = async (userId) => {
  try {
    // If no userId is provided, return an empty array
    if (!userId) {
      return [];
    }
    
    const { data, error } = await supabase
      .from(LISTINGS_TABLE)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching marketplace listings:', error);
    throw error;
  }
};

/**
 * Get a specific marketplace listing by ID
 * @param {string} id - The ID of the listing to retrieve
 * @param {string} userId - The ID of the user who owns the listing
 * @returns {Promise<Object>} - The listing object
 */
export const getMarketplaceListingById = async (id, userId) => {
  try {
    const query = supabase
      .from(LISTINGS_TABLE)
      .select('*')
      .eq('id', id);
    
    // If userId is provided, ensure the listing belongs to the user
    if (userId) {
      query.eq('user_id', userId);
    }
    
    const { data, error } = await query.single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching marketplace listing with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a marketplace listing by ID
 * @param {string} id - The ID of the listing to delete
 * @param {string} userId - The ID of the user who owns the listing
 * @returns {Promise<void>}
 */
export const deleteMarketplaceListing = async (id, userId) => {
  try {
    const { error } = await supabase
      .from(LISTINGS_TABLE)
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(`Error deleting marketplace listing with ID ${id}:`, error);
    throw error;
  }
}; 