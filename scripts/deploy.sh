#!/bin/bash

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "Error: .env.local file not found!"
  echo "Please create a .env.local file with your Supabase credentials."
  echo "You can copy .env.local.example and fill in your values."
  exit 1
fi

# Load environment variables from .env.local
export $(grep -v '^#' .env.local | xargs)

# Check if required environment variables are set
if [ -z "$REACT_APP_SUPABASE_URL" ] || [ -z "$REACT_APP_SUPABASE_ANON_KEY" ]; then
  echo "Error: Required environment variables are not set!"
  echo "Make sure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are defined in .env.local"
  exit 1
fi

# Run the deploy script
echo "🚀 Deploying with secure environment variables..."
npm run deploy

# Unset environment variables for security
unset REACT_APP_SUPABASE_URL
unset REACT_APP_SUPABASE_ANON_KEY

echo "✅ Deployment complete!" 