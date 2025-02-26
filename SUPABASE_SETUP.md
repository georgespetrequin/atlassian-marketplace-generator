# Supabase Setup for Atlassian Marketplace Preview Builder

This document provides instructions on how to set up Supabase for the Atlassian Marketplace Preview Builder application.

## What is Supabase?

[Supabase](https://supabase.io/) is an open-source Firebase alternative that provides a PostgreSQL database, authentication, instant APIs, real-time subscriptions, and storage.

## Setup Instructions

### 1. Create a Supabase Account

1. Go to [Supabase](https://supabase.io/) and sign up for a free account.
2. Once logged in, create a new project.
3. Give your project a name (e.g., "Atlassian Marketplace Preview Builder").
4. Set a secure password for your database.
5. Choose a region closest to your users.
6. Click "Create new project".

### 2. Create the Database Table

1. In your Supabase project dashboard, navigate to the "Table Editor" in the left sidebar.
2. Click "New Table".
3. Set the table name to `marketplace_listings`.
4. Add the following columns:

| Column Name | Type | Default Value | Primary | Is Nullable |
|-------------|------|---------------|---------|-------------|
| id | uuid | gen_random_uuid() | Yes (PK) | No |
| created_at | timestamptz | now() | No | No |
| listingName | text | NULL | No | No |
| appName | text | NULL | No | Yes |
| appTagline | text | NULL | No | Yes |
| appLogo | jsonb | NULL | No | Yes |
| appBanner | jsonb | NULL | No | Yes |
| appYouTubeUrl | text | NULL | No | Yes |
| companyName | text | NULL | No | Yes |
| worksWithProducts | jsonb | NULL | No | Yes |
| highlightTitle1 | text | NULL | No | Yes |
| highlightSummary1 | text | NULL | No | Yes |
| highlightScreenshot1 | jsonb | NULL | No | Yes |
| highlightTitle2 | text | NULL | No | Yes |
| highlightSummary2 | text | NULL | No | Yes |
| highlightScreenshot2 | jsonb | NULL | No | Yes |
| highlightTitle3 | text | NULL | No | Yes |
| highlightSummary3 | text | NULL | No | Yes |
| highlightScreenshot3 | jsonb | NULL | No | Yes |
| moreDetails | text | NULL | No | Yes |
| videoUrl | text | NULL | No | Yes |

5. Click "Save" to create the table.

### 3. Set Up Storage for Images

1. In your Supabase project dashboard, navigate to the "Storage" section in the left sidebar.
2. Click "Create a new bucket".
3. Set the bucket name to `marketplace-images`.
4. Choose "Public" for the bucket type (this allows images to be publicly accessible).
5. Click "Create bucket".
6. After creating the bucket, go to the "Policies" tab.
7. Add the following policies to allow public access to the images:

#### For Select (Read) Operations:
- Policy name: `Public Read Access`
- Policy definition: `true`

#### For Insert (Create) Operations:
- Policy name: `Public Insert Access`
- Policy definition: `true`

#### For Update Operations:
- Policy name: `Public Update Access`
- Policy definition: `true`

#### For Delete Operations:
- Policy name: `Public Delete Access`
- Policy definition: `true`

Note: In a production environment, you would want to restrict these policies for better security.

### 4. Get Your API Keys

1. In your Supabase project dashboard, go to "Settings" (gear icon) in the left sidebar.
2. Click on "API" in the settings menu.
3. You'll find your "Project URL" and "anon public" key on this page.

### 5. Configure Your Application

1. In your project directory, create a `.env` file if it doesn't exist already.
2. Add the following environment variables to your `.env` file:

```
REACT_APP_SUPABASE_URL=your_project_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

3. Replace `your_project_url` with your Supabase project URL.
4. Replace `your_anon_key` with your Supabase anon key.

### 6. Restart Your Application

After setting up the environment variables, restart your application to apply the changes.

## Testing Your Setup

To test if your Supabase setup is working correctly:

1. Start your application.
2. Create a marketplace listing and save it.
3. Check if the listing appears in the saved listings dropdown.
4. You can also verify that the data is being stored by checking the "Table Editor" in your Supabase dashboard.

## Troubleshooting

If you encounter any issues with your Supabase setup:

1. Check that your environment variables are correctly set in the `.env` file.
2. Ensure that your Supabase project is active and running.
3. Check the browser console for any error messages related to Supabase.
4. Verify that your table structure matches the expected schema.

## Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase JavaScript Client](https://supabase.io/docs/reference/javascript/supabase-client)
- [Supabase Auth Documentation](https://supabase.io/docs/guides/auth) 