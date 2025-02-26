import supabase from '../supabaseClient';

/**
 * Register a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - The user data and session
 */
export const registerUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Login a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - The session data
 */
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

/**
 * Logout the current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

/**
 * Get the current user session
 * @returns {Promise<Object|null>} - The current session or null if not logged in
 */
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data.session;
  } catch (error) {
    console.error('Error getting current session:', error);
    throw error;
  }
};

/**
 * Get the current user
 * @returns {Promise<Object|null>} - The current user or null if not logged in
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};

/**
 * Set up auth state change listener
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} - Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  
  return data.subscription.unsubscribe;
}; 