// Demo OTP Service for testing without Firebase setup
// This simulates OTP functionality for development and demo purposes

export interface DemoOTPResult {
  success: boolean;
  message: string;
  user?: any;
}

export class DemoOTPService {
  private static instance: DemoOTPService;
  private otpCodes: Map<string, { code: string; expires: number }> = new Map();
  private verificationAttempts: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): DemoOTPService {
    if (!DemoOTPService.instance) {
      DemoOTPService.instance = new DemoOTPService();
    }
    return DemoOTPService.instance;
  }

  // Generate a 6-digit OTP code
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP (demo version - logs to console)
  public async sendOTP(phoneNumber: string): Promise<DemoOTPResult> {
    try {
      // Validate phone number format
      if (!phoneNumber || phoneNumber.length < 10) {
        return {
          success: false,
          message: 'Invalid phone number format. Please enter a valid phone number.'
        };
      }

      // Generate OTP
      const otpCode = this.generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      // Store OTP
      this.otpCodes.set(phoneNumber, { code: otpCode, expires: expiresAt });
      this.verificationAttempts.set(phoneNumber, 0);

      // Log to console for demo purposes
      console.log(`🔐 DEMO OTP for ${phoneNumber}: ${otpCode}`);
      console.log(`⏰ OTP expires in 5 minutes`);
      console.log(`📱 In production, this would be sent via SMS`);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        message: `Demo OTP sent to ${phoneNumber}. Check console for the code.`
      };
    } catch (error) {
      console.error('Demo OTP send error:', error);
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.'
      };
    }
  }

  // Verify OTP
  public async verifyOTP(phoneNumber: string, enteredOTP: string): Promise<DemoOTPResult> {
    try {
      console.log('🔍 Demo OTP verification:', { phoneNumber, enteredOTP });
      console.log('📋 Stored OTPs:', Array.from(this.otpCodes.entries()));
      
      // Check for backup OTP first (123456 for specific phone number)
      if (phoneNumber === '+918619444155' && enteredOTP === '123456') {
        console.log('🔑 Using backup OTP for +918619444155');
        
        // Create demo user
        const user = {
          uid: `demo_backup_${Date.now()}`,
          phoneNumber: phoneNumber,
          displayName: `Student ${phoneNumber.slice(-4)}`,
          email: null,
          isDemo: true
        };

        console.log(`✅ Backup OTP verified for ${phoneNumber}`);
        console.log(`👤 Demo user created:`, user);

        return {
          success: true,
          user: user,
          message: 'OTP verified successfully (backup)'
        };
      }
      
      const storedOTP = this.otpCodes.get(phoneNumber);
      
      if (!storedOTP) {
        console.log('❌ No OTP found for phone number:', phoneNumber);
        return {
          success: false,
          message: 'No OTP found for this phone number. Please request a new one.'
        };
      }

      // Check if OTP has expired
      if (Date.now() > storedOTP.expires) {
        this.otpCodes.delete(phoneNumber);
        return {
          success: false,
          message: 'OTP has expired. Please request a new one.'
        };
      }

      // Check verification attempts
      const attempts = this.verificationAttempts.get(phoneNumber) || 0;
      if (attempts >= 3) {
        return {
          success: false,
          message: 'Too many failed attempts. Please request a new OTP.'
        };
      }

      // Verify OTP
      console.log('🔐 Comparing OTPs:', { 
        entered: enteredOTP, 
        stored: storedOTP.code, 
        match: enteredOTP === storedOTP.code 
      });
      
      if (enteredOTP === storedOTP.code) {
        // Clear OTP and attempts
        this.otpCodes.delete(phoneNumber);
        this.verificationAttempts.delete(phoneNumber);

        // Create demo user
        const user = {
          uid: `demo_${Date.now()}`,
          phoneNumber: phoneNumber,
          displayName: `Student ${phoneNumber.slice(-4)}`,
          email: null,
          isDemo: true
        };

        console.log(`✅ Demo OTP verified for ${phoneNumber}`);
        console.log(`👤 Demo user created:`, user);

        return {
          success: true,
          user: user,
          message: 'OTP verified successfully'
        };
      } else {
        // Increment attempts
        this.verificationAttempts.set(phoneNumber, attempts + 1);
        
        console.log(`❌ OTP mismatch for ${phoneNumber}`);
        return {
          success: false,
          message: 'Invalid OTP code. Please check and try again.'
        };
      }
    } catch (error) {
      console.error('Demo OTP verification error:', error);
      return {
        success: false,
        message: 'Verification failed. Please try again.'
      };
    }
  }

  // Resend OTP
  public async resendOTP(phoneNumber: string): Promise<DemoOTPResult> {
    return this.sendOTP(phoneNumber);
  }

  // Clear all data
  public clearAll(): void {
    this.otpCodes.clear();
    this.verificationAttempts.clear();
  }

  // Get stored OTPs (for debugging)
  public getStoredOTPs(): Map<string, { code: string; expires: number }> {
    return new Map(this.otpCodes);
  }
}

// Export singleton instance
export const demoOTPService = DemoOTPService.getInstance();

// Demo instructions component
export const DemoInstructions = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
        🧪 Demo Mode Instructions
      </h3>
      <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
        <li>1. Enter any 10-digit phone number</li>
        <li>2. Click "Send OTP"</li>
        <li>3. Check the browser console (F12) for the OTP code</li>
        <li>4. Enter the 6-digit code to verify</li>
        <li>5. OTP expires in 5 minutes</li>
      </ol>
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded p-2 mt-2">
        <p className="text-xs text-green-700 dark:text-green-300 font-medium">
          🔑 <strong>Backup OTP:</strong> For phone number +918619444155, you can always use <strong>123456</strong>
        </p>
      </div>
      <p className="text-xs text-blue-600 dark:text-blue-300 mt-2">
        💡 This is a demo version. In production, OTPs are sent via SMS.
      </p>
    </div>
  );
};


