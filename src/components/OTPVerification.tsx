import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowLeft, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { otpService } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import OTPInput from './OTPInput';
import { useToast } from '@/hooks/use-toast';

interface OTPVerificationProps {
  phoneNumber: string;
  onSuccess: (user: any) => void;
  onBack: () => void;
  onResend?: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  phoneNumber,
  onSuccess,
  onBack,
  onResend
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const maxAttempts = 3;

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith('+')) {
      return phone;
    }
    return `+${phone}`;
  };

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Initialize reCAPTCHA when component mounts (disabled in demo mode)
  useEffect(() => {
    const initializeRecaptcha = async () => {
      try {
        // reCAPTCHA is disabled, so this will just resolve
        await otpService.initializeRecaptcha('otp-recaptcha-container');
      } catch (error) {
        console.error('Failed to initialize reCAPTCHA:', error);
        // Don't set error in demo mode since reCAPTCHA is disabled
        console.log('reCAPTCHA initialization skipped (demo mode)');
      }
    };

    initializeRecaptcha();

    // Cleanup on unmount
    return () => {
      otpService.clearRecaptcha();
    };
  }, []);

  const handleOTPComplete = async (enteredOtp: string) => {
    if (loading || isVerified) return;

    console.log('🔍 OTPVerification: handleOTPComplete called');
    console.log('📱 Phone number:', phoneNumber);
    console.log('🔐 Entered OTP:', enteredOtp);

    setOtp(enteredOtp);
    setError('');
    setLoading(true);

    try {
      const result = await otpService.verifyOTP(enteredOtp, phoneNumber);
      console.log('📋 OTPVerification: Verification result:', result);
      
      if (result.success) {
        setIsVerified(true);
        toast({
          title: "Verification Successful!",
          description: "Your phone number has been verified successfully.",
        });
        
        // Delay success callback to show animation
        setTimeout(() => {
          onSuccess(result.user);
        }, 1500);
      } else {
        setError(result.message);
        setAttempts(prev => prev + 1);
        
        if (attempts + 1 >= maxAttempts) {
          setError(`Too many failed attempts. Please request a new OTP.`);
        }
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      setError('Verification failed. Please try again.');
      setAttempts(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendLoading || resendCooldown > 0) return;

    setResendLoading(true);
    setError('');
    setAttempts(0);

    try {
      const result = await otpService.resendOTP(phoneNumber);
      
      if (result.success) {
        setResendCooldown(60); // 60 seconds cooldown
        toast({
          title: "OTP Resent",
          description: "A new OTP has been sent to your phone number.",
        });
        onResend?.();
      } else {
        setError(result.message);
      }
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleBack = () => {
    otpService.clearRecaptcha();
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* reCAPTCHA Container */}
      <div id="otp-recaptcha-container" className="hidden" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex justify-center">
          <motion.div
            className="p-3 bg-primary/10 rounded-full"
            animate={{ 
              scale: isVerified ? [1, 1.2, 1] : 1,
              rotate: isVerified ? [0, 360] : 0
            }}
            transition={{ duration: 0.6 }}
          >
            {isVerified ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <Phone className="h-8 w-8 text-primary" />
            )}
          </motion.div>
        </div>
        
        <h2 className="text-2xl font-bold">
          {isVerified ? 'Phone Verified!' : 'Verify Your Phone'}
        </h2>
        
        <p className="text-muted-foreground">
          {isVerified 
            ? 'Your phone number has been successfully verified.'
            : `Enter the 6-digit code sent to ${formatPhoneNumber(phoneNumber)}`
          }
        </p>
      </motion.div>

      {/* OTP Input */}
      <AnimatePresence>
        {!isVerified && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card>
              <CardContent className="pt-6">
                <OTPInput
                  length={6}
                  onComplete={handleOTPComplete}
                  onResend={resendCooldown === 0 ? handleResendOTP : undefined}
                  disabled={loading || attempts >= maxAttempts}
                  error={error}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      <AnimatePresence>
        {isVerified && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            <p className="text-lg text-green-600 font-medium">
              Verification Complete!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resend Information */}
      {!isVerified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-2"
        >
          {resendCooldown > 0 ? (
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Resend available in {resendCooldown}s</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              <span>Didn't receive the code? You can resend it now</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          disabled={loading || isVerified}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {resendCooldown === 0 && !isVerified && (
          <Button
            onClick={handleResendOTP}
            variant="outline"
            disabled={resendLoading || loading}
          >
            {resendLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Resend OTP
              </>
            )}
          </Button>
        )}
      </div>

      {/* Attempts Counter */}
      {attempts > 0 && attempts < maxAttempts && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-orange-600"
        >
          {maxAttempts - attempts} attempts remaining
        </motion.div>
      )}
    </div>
  );
};

export default OTPVerification;
