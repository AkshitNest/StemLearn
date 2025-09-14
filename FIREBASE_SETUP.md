# Firebase OTP Setup Guide

This guide will help you set up Firebase Authentication for real OTP verification in the StemLearn application.

## Prerequisites

1. A Google account
2. A Firebase project
3. A phone number for testing

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "stemlearn-otp")
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Phone Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Find "Phone" in the providers list
5. Click on "Phone" and toggle "Enable"
6. Click "Save"

## Step 3: Add a Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Enter an app nickname (e.g., "StemLearn Web")
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Create a `.env` file in the `StemLearn` directory
2. Add the following variables with your Firebase config values:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Step 5: Install Dependencies

Run the following command to install the required packages:

```bash
npm install firebase react-otp-input
```

## Step 6: Test the Setup

1. Start the development server: `npm run dev`
2. Navigate to the student login page
3. Enter a valid phone number (with country code)
4. Click "Send OTP"
5. Check your phone for the verification code
6. Enter the OTP to complete verification

## Important Notes

### Phone Number Format
- Always include the country code (e.g., +91 for India, +1 for US)
- The app automatically adds +91 for Indian numbers
- For international numbers, users should enter the full number with country code

### reCAPTCHA
- Firebase requires reCAPTCHA verification for phone authentication
- The app uses invisible reCAPTCHA for better UX
- Users may see a reCAPTCHA challenge occasionally

### Testing
- Use your own phone number for testing
- Firebase provides free SMS credits for testing
- Production usage may require billing setup

### Security
- Never commit your `.env` file to version control
- Use environment variables for all sensitive configuration
- Consider using Firebase Security Rules for additional protection

## Troubleshooting

### Common Issues

1. **"reCAPTCHA not loaded"**
   - Check if your domain is added to Firebase authorized domains
   - Ensure the reCAPTCHA container div exists

2. **"Invalid phone number"**
   - Verify the phone number format includes country code
   - Check if the number is valid and can receive SMS

3. **"SMS quota exceeded"**
   - You've reached the free SMS limit
   - Upgrade to a paid plan or wait for quota reset

4. **"OTP verification failed"**
   - Check if the OTP code is correct
   - Ensure the code hasn't expired (usually 5 minutes)
   - Try requesting a new OTP

### Firebase Console
- Monitor authentication attempts in the Firebase Console
- Check the "Authentication" > "Users" tab for registered users
- Review logs in the "Functions" tab if using Cloud Functions

## Production Considerations

1. **Billing**: Set up billing for production SMS usage
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Error Handling**: Add comprehensive error handling
4. **Analytics**: Monitor authentication success rates
5. **Security**: Implement additional security measures

## Support

For Firebase-specific issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)

For app-specific issues:
- Check the browser console for errors
- Verify all environment variables are set correctly
- Ensure all dependencies are installed



