import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, QrCode, Gamepad2, ArrowLeft, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStudent } from '@/contexts/StudentContext';
import LanguageSelector from '@/components/LanguageSelector';
import OTPVerification from '@/components/OTPVerification';
import { otpService } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StudentLogin: React.FC = () => {
  const { t } = useLanguage();
  const { updateStudentData } = useStudent();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileNumber, setMobileNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  // Initialize OTP service when component mounts
  React.useEffect(() => {
    const initializeOTP = async () => {
      try {
        await otpService.initializeRecaptcha('login-recaptcha-container');
        setIsRecaptchaReady(true);
      } catch (error) {
        console.error('Failed to initialize OTP service:', error);
        setError('Failed to initialize verification. Please refresh the page.');
      }
    };

    initializeOTP();

    // Cleanup on unmount
    return () => {
      otpService.clearRecaptcha();
    };
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) return;
    
    setError('');
    setIsLoading(true);

    try {
      const result = await otpService.sendOTP(`+91${mobileNumber}`);
      
      if (result.success) {
        setShowOtpInput(true);
        toast({
          title: "OTP Sent!",
          description: "Please check your phone for the verification code.",
        });
      } else {
        setError(result.message);
      }
    } catch (error: any) {
      console.error('Send OTP error:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSuccess = (user: any) => {
    // Update student data with verified phone number and name
    updateStudentData({
      name: studentName || user.displayName || `Student ${user.phoneNumber}`,
      profile: {
        ...user,
        phone: user.phoneNumber,
        firstName: studentName || user.displayName || '',
      }
    });

    toast({
      title: "Login Successful!",
      description: `Welcome to StemLearn, ${studentName || 'Student'}!`,
    });

    navigate('/student');
  };

  const handleBackToPhone = () => {
    setShowOtpInput(false);
    setError('');
    otpService.clearRecaptcha();
  };

  const handleQRLogin = () => {
    // Mock QR login - in real app would open QR scanner
    navigate('/student');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/5 rounded-full"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="floating-card p-8 bg-card/80 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gamepad2 className="h-8 w-8 text-primary" />
            </motion.div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('welcomeBack')}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t('loginSubtitle')}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}


          {/* Login Form */}
          {!showOtpInput ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="pl-10 bg-background/50 border-border hover:bg-background/70 focus:bg-background transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder={t('mobileNumber')}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="pl-10 bg-background/50 border-border hover:bg-background/70 focus:bg-background transition-colors"
                  maxLength={10}
                />
              </div>

              <Button 
                type="submit"
                disabled={!studentName.trim() || mobileNumber.length !== 10 || isLoading || !isRecaptchaReady}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-medium py-3 glow-primary disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : t('sendOtp')}
              </Button>

              {!isRecaptchaReady && (
                <p className="text-xs text-muted-foreground text-center">
                  Initializing verification...
                </p>
              )}
            </form>
          ) : (
            <OTPVerification
              phoneNumber={`+91${mobileNumber}`}
              onSuccess={handleOTPSuccess}
              onBack={handleBackToPhone}
              onResend={() => {
                // Reinitialize reCAPTCHA for resend
                otpService.initializeRecaptcha('login-recaptcha-container');
              }}
            />
          )}

          {/* reCAPTCHA Container */}
          <div id="login-recaptcha-container" className="hidden" />

          {/* Divider */}
          {!showOtpInput && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-border"></div>
                <span className="px-4 text-muted-foreground text-sm">or</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              {/* QR Login */}
              <Button
                variant="outline"
                onClick={handleQRLogin}
                className="w-full border-border hover:bg-muted/50 transition-colors flex items-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                {t('qrLogin')}
              </Button>

              {/* Demo Navigation */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-3">Demo Access:</p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/teacher/login')}
                    className="flex-1 text-xs"
                  >
                    Teacher Login
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentLogin;