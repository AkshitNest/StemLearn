import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { demoOTPService, DemoOTPResult } from './demo-otp';

// Firebase configuration
// You'll need to replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "your-measurement-id",
};


// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "your-api-key" && 
         firebaseConfig.projectId !== "your-project-id";
};

// Initialize Firebase only if properly configured
let app: any = null;
let auth: any = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log('🔥 Firebase initialized successfully');
  } catch (error) {
    console.warn('⚠️ Firebase initialization failed, falling back to demo mode:', error);
  }
} else {
  console.log('🧪 Firebase not configured, using demo mode');
}

// OTP Service Class
export class OTPService {
  private static instance: OTPService;
  private recaptchaVerifier: RecaptchaVerifier | null = null;
  private confirmationResult: any = null;

  private constructor() {}

  public static getInstance(): OTPService {
    if (!OTPService.instance) {
      OTPService.instance = new OTPService();
    }
    return OTPService.instance;
  }

  // Initialize reCAPTCHA verifier
  public initializeRecaptcha(containerId: string = 'recaptcha-container'): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if Firebase is configured
      if (!isFirebaseConfigured() || !auth) {
        console.log('🧪 Firebase not configured, skipping reCAPTCHA initialization');
        resolve();
        return;
      }

      // Check if container exists
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`reCAPTCHA container '${containerId}' not found`);
        reject(new Error(`reCAPTCHA container '${containerId}' not found`));
        return;
      }

      try {
        // Clear existing verifier if any
        if (this.recaptchaVerifier) {
          this.recaptchaVerifier.clear();
        }

        this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved');
            resolve();
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
            reject(new Error('reCAPTCHA expired'));
          }
        });
        
        this.recaptchaVerifier.render().then(() => {
          console.log('reCAPTCHA rendered successfully');
          resolve();
        }).catch((error) => {
          console.error('reCAPTCHA render error:', error);
          reject(error);
        });
      } catch (error) {
        console.error('reCAPTCHA initialization error:', error);
        reject(error);
      }
    });
  }

  // Send OTP to phone number
  public async sendOTP(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    // Always use demo mode since reCAPTCHA is disabled
    console.log('🧪 Using demo OTP service (reCAPTCHA disabled)');
    return demoOTPService.sendOTP(phoneNumber);
  }

  // Verify OTP
  public async verifyOTP(otp: string, phoneNumber?: string): Promise<{ success: boolean; user?: any; message: string }> {
    // Always use demo mode since reCAPTCHA is disabled
    console.log('🧪 Using demo OTP verification (reCAPTCHA disabled)');
    console.log('📱 Phone number:', phoneNumber);
    console.log('🔐 OTP:', otp);
    
    if (!phoneNumber) {
      return {
        success: false,
        message: 'Phone number required for demo verification'
      };
    }
    
    const result = await demoOTPService.verifyOTP(phoneNumber, otp);
    console.log('✅ Verification result:', result);
    return result;
  }

  // Resend OTP
  public async resendOTP(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    // Always use demo mode since reCAPTCHA is disabled
    console.log('🧪 Using demo OTP resend (reCAPTCHA disabled)');
    return demoOTPService.resendOTP(phoneNumber);
  }

  // Clear reCAPTCHA verifier
  public clearRecaptcha(): void {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
  }

  // Get current user
  public getCurrentUser() {
    return auth.currentUser;
  }

  // Sign out
  public async signOut(): Promise<void> {
    if (auth) {
      await auth.signOut();
    }
    this.confirmationResult = null;
    this.clearRecaptcha();
  }
}

// Export singleton instance
export const otpService = OTPService.getInstance();

export default app;
