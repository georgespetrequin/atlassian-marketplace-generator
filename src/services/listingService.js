import supabase from '../supabaseClient';

// Table name for marketplace listings
const LISTINGS_TABLE = 'marketplace_listings';

/**
 * Save a marketplace listing to Supabase
 * @param {Object} listingData - The listing data to save
 * @returns {Promise<Object>} - The saved listing data with ID
 */
export const saveMarketplaceListing = async (listingData) => {
  try {
    // Add timestamp for created_at
    const listingWithTimestamp = {
      ...listingData,
      created_at: new Date().toISOString(),
    };
    
    // Insert the listing into Supabase
    const { data, error } = await supabase
      .from(LISTINGS_TABLE)
      .insert([listingWithTimestamp])
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
 * Get all marketplace listings from Supabase
 * @returns {Promise<Array>} - Array of listing objects
 */
export const getMarketplaceListings = async () => {
  try {
    const { data, error } = await supabase
      .from(LISTINGS_TABLE)
      .select('*')
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
 * @returns {Promise<Object>} - The listing object
 */
export const getMarketplaceListingById = async (id) => {
  try {
    const { data, error } = await supabase
      .from(LISTINGS_TABLE)
      .select('*')
      .eq('id', id)
      .single();
    
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
 * @returns {Promise<void>}
 */
export const deleteMarketplaceListing = async (id) => {
  try {
    const { error } = await supabase
      .from(LISTINGS_TABLE)
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(`Error deleting marketplace listing with ID ${id}:`, error);
    throw error;
  }
}; 