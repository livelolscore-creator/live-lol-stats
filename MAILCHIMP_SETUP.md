# Mailchimp Setup Guide

## To activate the newsletter subscription, follow these steps:

### 1. Create a Mailchimp Account
- Go to [mailchimp.com](https://mailchimp.com) and sign up (free tier available)

### 2. Create an Audience (List)
1. In Mailchimp dashboard, go to **Audience** > **Manage Audience** > **Create audience**
2. Fill in the required fields (name, default email, etc.)
3. Note your **Audience ID** (found in Audience settings)

### 3. Get Your API User ID
1. Go to **Account** > **Extras** > **API keys**
2. Click **Create A Key**
3. Copy the generated API key

### 4. Update the Code
Open `src/components/News/News.tsx` and update these values:

```typescript
const MAILCHIMP_PARAMS = {
    u: "YOUR_MAILCHIMP_USER_ID",     // Your API key prefix (before the dash)
    id: "YOUR_MAILCHIMP_LIST_ID"     // Your Audience ID
};
```

**Finding your User ID:**
- Your API key format is: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us21`
- The part after the last dash (e.g., `us21`) is your datacenter
- The part before the dash is your user ID

### 5. Build URL Format
Your Mailchimp form action URL will be:
```
https://YOUR-DATACENTER.list-manage.com/subscribe/post?u=USER_ID&id=Audience_ID
```

Example:
```
https://us21.list-manage.com/subscribe/post?u=abc123def456&id=xyz789abc
```

### 6. Update the Code Properly
In `News.tsx`, change:
```typescript
const MAILCHIMP_URL = "https://us21.list-manage.com/subscribe/post";
const MAILCHIMP_PARAMS = {
    u: "abc123def456",
    id: "xyz789abc"
};
```

## Testing Locally
1. Run `npm start`
2. Go to the News page
3. Enter an email and click Subscribe
4. Check your Mailchimp audience for the new subscriber

## Troubleshooting

**"Something went wrong" error:**
- Verify your Mailchimp URL and params are correct
- Make sure your Mailchimp account is active

**No confirmation email sent:**
- Check Mailchimp's confirmation email settings
- Make sure double opt-in is enabled if you want verified subscribers

**Form not working:**
- Make sure `MAILCHIMP_URL` includes your datacenter (e.g., `us21`)
- Verify `u` and `id` values are correct
