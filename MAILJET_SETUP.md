# Mailjet Email Setup for Room Booking

This guide explains how to configure Mailjet for sending booking confirmation emails.

## Setup Steps

### 1. Get Mailjet API Credentials

1. Go to [Mailjet](https://www.mailjet.com/) and create an account or log in
2. Navigate to **Account Settings** → **API Keys**
3. Copy your **API Key** (Public Key) and **Secret Key** (Private Key)

### 2. Configure Environment Variables

Open the `.env.local` file in the root directory and replace the placeholder values with your actual Mailjet credentials:

```env
MAILJET_API_KEY=your_actual_mailjet_api_key_here
MAILJET_API_SECRET=your_actual_mailjet_secret_key_here
```

### 3. Verify Sender Email

In Mailjet, you need to verify the sender email address (`kallmibukur@gmail.com`):

1. Go to **Account Settings** → **Sender Addresses & Domains**
2. Add `kallmibukur@gmail.com` as a verified sender
3. Check your email and click the verification link

### 4. Test the Booking Form

1. Start the development server: `npm run dev`
2. Navigate to the **Stay** page (`/stay`)
3. Fill out the booking form
4. Submit the form

### 5. Email Functionality

When a booking is submitted:

- **Guest receives**: A confirmation email with all booking details
- **You receive**: A notification email at `kallmibukur@gmail.com` with the booking information

## Email Templates

Both emails are professionally formatted with:
- Booking details (name, email, phone, room, dates, guests)
- Special requests (if provided)
- Contact information

## Troubleshooting

### Error: "Mailjet credentials not found"
- Ensure `.env.local` file exists in the root directory
- Verify the environment variable names match exactly: `MAILJET_API_KEY` and `MAILJET_API_SECRET`
- Restart the development server after updating `.env.local`

### Error: "Failed to send booking confirmation"
- Check that your Mailjet API keys are correct
- Verify the sender email (`kallmibukur@gmail.com`) is verified in Mailjet
- Check Mailjet account status and limits

### Emails not arriving
- Check spam/junk folders
- Verify email addresses are correct
- Check Mailjet dashboard for email delivery status

## Files Modified

- `/src/app/api/booking/route.ts` - API endpoint for handling bookings
- `/src/components/Accommodations.tsx` - Booking form with state management
- `/.env.local` - Environment variables for Mailjet credentials
- `/package.json` - Added `node-mailjet` dependency
