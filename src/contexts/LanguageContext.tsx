import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'ur' | 'kn' | 'od' | 'ml' | 'pa' | 'as';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    quests: 'Quests',
    leaderboard: 'Leaderboard',
    profile: 'Profile',
    
    // Subjects
    math: 'Mathematics',
    science: 'Science',
    technology: 'Technology',
    engineering: 'Engineering',
    
    // Gamification
    level: 'Level',
    xp: 'XP',
    points: 'Points',
    streak: 'Day Streak',
    badges: 'Badges',
    
    // Quests
    questsTitle: 'Learning Quests',
    questsSubtitle: 'Choose your adventure and master STEM concepts!',
    startQuest: 'Start Quest',
    difficulty: 'Difficulty',
    
    // Login
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Continue your learning journey',
    mobileNumber: 'Mobile Number',
    otp: 'Enter OTP',
    sendOtp: 'Send OTP',
    verifyOtp: 'Verify OTP',
    qrLogin: 'Login with QR Code',
    
    // Teacher Dashboard
    teacherDashboard: 'Teacher Dashboard',
    classProgress: 'Class Progress',
    assignments: 'Assignments',
    analytics: 'Analytics',
    exportReports: 'Export Reports',
    
    // Offline
    offlineMode: 'Offline Mode',
    offlineMessage: 'No internet connection. Your progress is saved locally.',
  },
  hi: {
    // Navigation  
    dashboard: 'डैशबोर्ड',
    quests: 'खोज',
    leaderboard: 'लीडरबोर्ड',
    profile: 'प्रोफाइल',
    
    // Subjects
    math: 'गणित',
    science: 'विज्ञान',
    technology: 'प्रौद्योगिकी',
    engineering: 'इंजीनियरिंग',
    
    // Gamification
    level: 'स्तर',
    xp: 'अनुभव अंक',
    points: 'अंक',
    streak: 'दिन की लकीर',
    badges: 'बैज',
    
    // Quests
    questsTitle: 'सीखने की खोज',
    questsSubtitle: 'अपना रोमांच चुनें और STEM अवधारणाओं में महारत हासिल करें!',
    startQuest: 'खोज शुरू करें',
    difficulty: 'कठिनाई',
    
    // Login  
    welcomeBack: 'वापस स्वागत है',
    loginSubtitle: 'अपनी सीखने की यात्रा जारी रखें',
    mobileNumber: 'मोबाइल नंबर',
    otp: 'OTP दर्ज करें',
    sendOtp: 'OTP भेजें',
    verifyOtp: 'OTP सत्यापित करें',
    qrLogin: 'QR कोड से लॉगिन करें',
    
    // Teacher Dashboard
    teacherDashboard: 'शिक्षक डैशबोर्ड',
    classProgress: 'कक्षा की प्रगति',
    assignments: 'असाइनमेंट',
    analytics: 'विश्लेषण',
    exportReports: 'रिपोर्ट निर्यात करें',
    
    // Offline
    offlineMode: 'ऑफ़लाइन मोड',
    offlineMessage: 'इंटरनेट कनेक्शन नहीं है। आपकी प्रगति स्थानीय रूप से सहेजी गई है।',
  },
  bn: {
    // Navigation
    dashboard: 'ড্যাশবোর্ড',
    quests: 'অনুসন্ধান',
    leaderboard: 'লিডারবোর্ড',
    profile: 'প্রোফাইল',
    
    // Subjects
    math: 'গণিত',
    science: 'বিজ্ঞান',
    technology: 'প্রযুক্তি',
    engineering: 'প্রকৌশল',
    
    // Gamification
    level: 'স্তর',
    xp: 'অভিজ্ঞতা পয়েন্ট',
    points: 'পয়েন্ট',
    streak: 'দিনের ধারা',
    badges: 'ব্যাজ',
    
    // Quests
    questsTitle: 'শেখার অনুসন্ধান',
    questsSubtitle: 'আপনার দুঃসাহসিক কাজ বেছে নিন এবং STEM ধারণাগুলিতে দক্ষতা অর্জন করুন!',
    startQuest: 'অনুসন্ধান শুরু করুন',
    difficulty: 'কঠিনতা',
    
    // Login
    welcomeBack: 'আবার স্বাগতম',
    loginSubtitle: 'আপনার শেখার যাত্রা অব্যাহত রাখুন',
    mobileNumber: 'মোবাইল নম্বর',
    otp: 'OTP প্রবেশ করান',
    sendOtp: 'OTP পাঠান',
    verifyOtp: 'OTP যাচাই করুন',
    qrLogin: 'QR কোড দিয়ে লগইন করুন',
    
    // Teacher Dashboard
    teacherDashboard: 'শিক্ষক ড্যাশবোর্ড',
    classProgress: 'ক্লাসের অগ্রগতি',
    assignments: 'অ্যাসাইনমেন্ট',
    analytics: 'বিশ্লেষণ',
    exportReports: 'রিপোর্ট রপ্তানি করুন',
    
    // Offline
    offlineMode: 'অফলাইন মোড',
    offlineMessage: 'কোন ইন্টারনেট সংযোগ নেই। আপনার অগ্রগতি স্থানীয়ভাবে সংরক্ষিত।',
  },
  te: {
    // Navigation
    dashboard: 'డ్యాష్‌బోర్డ్',
    quests: 'అన్వేషణలు',
    leaderboard: 'లీడర్‌బోర్డ్',
    profile: 'ప్రొఫైల్',
    
    // Subjects
    math: 'గణితం',
    science: 'విజ్ఞాన శాస్త్రం',
    technology: 'సాంకేతికత',
    engineering: 'ఇంజనీరింగ్',
    
    // Gamification
    level: 'స్థాయి',
    xp: 'అనుభవ పాయింట్లు',
    points: 'పాయింట్లు',
    streak: 'రోజుల వరుస',
    badges: 'బ్యాజ్‌లు',
    
    // Quests
    questsTitle: 'అభ్యాస అన్వేషణలు',
    questsSubtitle: 'మీ సాహసం ఎంచుకోండి మరియు STEM భావనలలో నైపుణ్యం పొందండి!',
    startQuest: 'అన్వేషణ ప్రారంభించండి',
    difficulty: 'కష్టం',
    
    // Login
    welcomeBack: 'తిరిగి స్వాగతం',
    loginSubtitle: 'మీ అభ్యాస ప్రయాణాన్ని కొనసాగించండి',
    mobileNumber: 'మొబైల్ నంబర్',
    otp: 'OTP నమోదు చేయండి',
    sendOtp: 'OTP పంపండి',
    verifyOtp: 'OTP ధృవీకరించండి',
    qrLogin: 'QR కోడ్‌తో లాగిన్ చేయండి',
    
    // Teacher Dashboard
    teacherDashboard: 'ఉపాధ్యాయ డ్యాష్‌బోర్డ్',
    classProgress: 'క్లాస్ పురోగతి',
    assignments: 'అసైన్‌మెంట్లు',
    analytics: 'విశ్లేషణలు',
    exportReports: 'నివేదికలను ఎగుమతి చేయండి',
    
    // Offline
    offlineMode: 'ఆఫ్‌లైన్ మోడ్',
    offlineMessage: 'ఇంటర్నెట్ కనెక్షన్ లేదు. మీ పురోగతి స్థానికంగా సేవ్ చేయబడింది.',
  },
  mr: {
    // Navigation
    dashboard: 'डॅशबोर्ड',
    quests: 'शोध',
    leaderboard: 'लीडरबोर्ड',
    profile: 'प्रोफाइल',
    
    // Subjects
    math: 'गणित',
    science: 'विज्ञान',
    technology: 'तंत्रज्ञान',
    engineering: 'अभियांत्रिकी',
    
    // Gamification
    level: 'स्तर',
    xp: 'अनुभव गुण',
    points: 'गुण',
    streak: 'दिवसांची रांग',
    badges: 'बॅज',
    
    // Quests
    questsTitle: 'शिकण्याचे शोध',
    questsSubtitle: 'तुमचे साहस निवडा आणि STEM संकल्पनांमध्ये प्रभुत्व मिळवा!',
    startQuest: 'शोध सुरू करा',
    difficulty: 'अडचण',
    
    // Login
    welcomeBack: 'परत स्वागत आहे',
    loginSubtitle: 'तुमचा शिकण्याचा प्रवास सुरू ठेवा',
    mobileNumber: 'मोबाइल नंबर',
    otp: 'OTP टाका',
    sendOtp: 'OTP पाठवा',
    verifyOtp: 'OTP पडताळा',
    qrLogin: 'QR कोडसह लॉगिन करा',
    
    // Teacher Dashboard
    teacherDashboard: 'शिक्षक डॅशबोर्ड',
    classProgress: 'वर्गाची प्रगती',
    assignments: 'असाइनमेंट',
    analytics: 'विश्लेषण',
    exportReports: 'अहवाल निर्यात करा',
    
    // Offline
    offlineMode: 'ऑफलाइन मोड',
    offlineMessage: 'इंटरनेट कनेक्शन नाही. तुमची प्रगती स्थानिक पातळीवर जतन केली आहे.',
  },
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    quests: 'தேடல்கள்',
    leaderboard: 'லீடர்போர்டு',
    profile: 'சுயவிவரம்',
    
    // Subjects
    math: 'கணிதம்',
    science: 'அறிவியல்',
    technology: 'தொழில்நுட்பம்',
    engineering: 'பொறியியல்',
    
    // Gamification
    level: 'நிலை',
    xp: 'அனுபவ புள்ளிகள்',
    points: 'புள்ளிகள்',
    streak: 'நாள் தொடர்',
    badges: 'பேட்ஜ்கள்',
    
    // Quests
    questsTitle: 'கற்றல் தேடல்கள்',
    questsSubtitle: 'உங்கள் சாகசத்தை தேர்வு செய்து STEM கருத்துகளில் தேர்ச்சி பெறுங்கள்!',
    startQuest: 'தேடலை தொடங்குங்கள்',
    difficulty: 'சிரமம்',
    
    // Login
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
    loginSubtitle: 'உங்கள் கற்றல் பயணத்தை தொடருங்கள்',
    mobileNumber: 'மொபைல் எண்',
    otp: 'OTP ஐ உள்ளிடுங்கள்',
    sendOtp: 'OTP அனுப்பவும்',
    verifyOtp: 'OTP சரிபார்க்கவும்',
    qrLogin: 'QR குறியீடுடன் உள்நுழையவும்',
    
    // Teacher Dashboard
    teacherDashboard: 'ஆசிரியர் டாஷ்போர்டு',
    classProgress: 'வகுப்பு முன்னேற்றம்',
    assignments: 'பணிகள்',
    analytics: 'பகுப்பாய்வு',
    exportReports: 'அறிக்கைகளை ஏற்றுமதி செய்யவும்',
    
    // Offline
    offlineMode: 'ஆஃப்லைன் பயன்முறை',
    offlineMessage: 'இணைய இணைப்பு இல்லை. உங்கள் முன்னேற்றம் உள்ளூரில் சேமிக்கப்பட்டது.',
  },
  gu: {
    // Navigation
    dashboard: 'ડેશબોર્ડ',
    quests: 'શોધ',
    leaderboard: 'લીડરબોર્ડ',
    profile: 'પ્રોફાઇલ',
    
    // Subjects
    math: 'ગણિત',
    science: 'વિજ્ઞાન',
    technology: 'ટેકનોલોજી',
    engineering: 'એન્જિનિયરિંગ',
    
    // Gamification
    level: 'લેવલ',
    xp: 'અનુભવ પોઇન્ટ્સ',
    points: 'પોઇન્ટ્સ',
    streak: 'દિવસની લાઇન',
    badges: 'બેજ',
    
    // Quests
    questsTitle: 'શીખવાની શોધ',
    questsSubtitle: 'તમારું સાહસ પસંદ કરો અને STEM ખ્યાલોમાં નિપુણતા મેળવો!',
    startQuest: 'શોધ શરૂ કરો',
    difficulty: 'મુશ્કેલી',
    
    // Login
    welcomeBack: 'પાછા સ્વાગત છે',
    loginSubtitle: 'તમારી શીખવાની યાત્રા ચાલુ રાખો',
    mobileNumber: 'મોબાઇલ નંબર',
    otp: 'OTP દાખલ કરો',
    sendOtp: 'OTP મોકલો',
    verifyOtp: 'OTP ચકાસો',
    qrLogin: 'QR કોડ સાથે લોગિન કરો',
    
    // Teacher Dashboard
    teacherDashboard: 'શિક્ષક ડેશબોર્ડ',
    classProgress: 'વર્ગની પ્રગતિ',
    assignments: 'અસાઇનમેન્ટ્સ',
    analytics: 'વિશ્લેષણ',
    exportReports: 'રિપોર્ટ્સ નિકાસ કરો',
    
    // Offline
    offlineMode: 'ઑફલાઇન મોડ',
    offlineMessage: 'ઇન્ટરનેટ કનેક્શન નથી. તમારી પ્રગતિ સ્થાનિક રીતે સાચવવામાં આવી છે.',
  },
  ur: {
    // Navigation
    dashboard: 'ڈیش بورڈ',
    quests: 'تلاش',
    leaderboard: 'لیڈر بورڈ',
    profile: 'پروفائل',
    
    // Subjects
    math: 'ریاضی',
    science: 'سائنس',
    technology: 'ٹیکنالوجی',
    engineering: 'انجینئرنگ',
    
    // Gamification
    level: 'درجہ',
    xp: 'تجربے کے پوائنٹس',
    points: 'پوائنٹس',
    streak: 'دن کی لکیر',
    badges: 'بیجز',
    
    // Quests
    questsTitle: 'سیکھنے کی تلاش',
    questsSubtitle: 'اپنا مہم جوئی منتخب کریں اور STEM تصورات میں مہارت حاصل کریں!',
    startQuest: 'تلاش شروع کریں',
    difficulty: 'مشکل',
    
    // Login
    welcomeBack: 'واپس خوش آمدید',
    loginSubtitle: 'اپنے سیکھنے کا سفر جاری رکھیں',
    mobileNumber: 'موبائل نمبر',
    otp: 'OTP درج کریں',
    sendOtp: 'OTP بھیجیں',
    verifyOtp: 'OTP کی تصدیق کریں',
    qrLogin: 'QR کوڈ سے لاگ ان کریں',
    
    // Teacher Dashboard
    teacherDashboard: 'ٹیچر ڈیش بورڈ',
    classProgress: 'کلاس کی ترقی',
    assignments: 'اسائنمنٹس',
    analytics: 'تجزیات',
    exportReports: 'رپورٹس ایکسپورٹ کریں',
    
    // Offline
    offlineMode: 'آف لائن موڈ',
    offlineMessage: 'انٹرنیٹ کنکشن نہیں ہے۔ آپ کی پیش قدمی مقامی طور پر محفوظ کر دی گئی ہے۔',
  },
  kn: {
    // Navigation
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    quests: 'ಅನ್ವೇಷಣೆಗಳು',
    leaderboard: 'ಲೀಡರ್‌ಬೋರ್ಡ್',
    profile: 'ಪ್ರೊಫೈಲ್',
    
    // Subjects
    math: 'ಗಣಿತ',
    science: 'ವಿಜ್ಞಾನ',
    technology: 'ತಂತ್ರಜ್ಞಾನ',
    engineering: 'ಇಂಜಿನಿಯರಿಂಗ್',
    
    // Gamification
    level: 'ಹಂತ',
    xp: 'ಅನುಭವ ಅಂಕಗಳು',
    points: 'ಅಂಕಗಳು',
    streak: 'ದಿನಗಳ ಸರಣಿ',
    badges: 'ಬ್ಯಾಜ್‌ಗಳು',
    
    // Quests
    questsTitle: 'ಕಲಿಕೆಯ ಅನ್ವೇಷಣೆಗಳು',
    questsSubtitle: 'ನಿಮ್ಮ ಸಾಹಸವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು STEM ಪರಿಕಲ್ಪನೆಗಳಲ್ಲಿ ಪಾರಂಗತತೆ ಪಡೆಯಿರಿ!',
    startQuest: 'ಅನ್ವೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
    difficulty: 'ಕಷ್ಟ',
    
    // Login
    welcomeBack: 'ಮತ್ತೆ ಸ್ವಾಗತ',
    loginSubtitle: 'ನಿಮ್ಮ ಕಲಿಕೆಯ ಪ್ರಯಾಣವನ್ನು ಮುಂದುವರಿಸಿ',
    mobileNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    otp: 'OTP ನಮೂದಿಸಿ',
    sendOtp: 'OTP ಕಳುಹಿಸಿ',
    verifyOtp: 'OTP ಪರಿಶೀಲಿಸಿ',
    qrLogin: 'QR ಕೋಡ್‌ನೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
    
    // Teacher Dashboard
    teacherDashboard: 'ಶಿಕ್ಷಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    classProgress: 'ತರಗತಿ ಪ್ರಗತಿ',
    assignments: 'ಕಾರ್ಯಭಾರಗಳು',
    analytics: 'ವಿಶ್ಲೇಷಣೆ',
    exportReports: 'ವರದಿಗಳನ್ನು ರಫ್ತು ಮಾಡಿ',
    
    // Offline
    offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
    offlineMessage: 'ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲ. ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಲಾಗಿದೆ.',
  },
  od: {
    // Navigation
    dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    quests: 'ଅନୁସନ୍ଧାନ',
    leaderboard: 'ଲିଡରବୋର୍ଡ',
    profile: 'ପ୍ରୋଫାଇଲ',
    
    // Subjects
    math: 'ଗଣିତ',
    science: 'ବିଜ୍ଞାନ',
    technology: 'ପ୍ରଯୁକ୍ତିବିଦ୍ୟା',
    engineering: 'ଇଞ୍ଜିନିୟରିଂ',
    
    // Gamification
    level: 'ସ୍ତର',
    xp: 'ଅଭିଜ୍ଞତା ପଏଣ୍ଟ',
    points: 'ପଏଣ୍ଟ',
    streak: 'ଦିନର ଧାରା',
    badges: 'ବ୍ୟାଜ',
    
    // Quests
    questsTitle: 'ଶିଖିବାର ଅନୁସନ୍ଧାନ',
    questsSubtitle: 'ଆପଣଙ୍କର ସାହସିକତା ବାଛନ୍ତୁ ଏବଂ STEM ଧାରଣାଗୁଡ଼ିକରେ ଦକ୍ଷତା ହାସଲ କରନ୍ତୁ!',
    startQuest: 'ଅନୁସନ୍ଧାନ ଆରମ୍ଭ କରନ୍ତୁ',
    difficulty: 'କଷ୍ଟ',
    
    // Login
    welcomeBack: 'ପୁନର୍ବାର ସ୍ବାଗତ',
    loginSubtitle: 'ଆପଣଙ୍କର ଶିଖିବା ଯାତ୍ରା ଜାରି ରଖନ୍ତୁ',
    mobileNumber: 'ମୋବାଇଲ ନମ୍ବର',
    otp: 'OTP ପ୍ରବେଶ କରନ୍ତୁ',
    sendOtp: 'OTP ପଠାନ୍ତୁ',
    verifyOtp: 'OTP ଯାଞ୍ଚ କରନ୍ତୁ',
    qrLogin: 'QR କୋଡ ସହିତ ଲଗଇନ କରନ୍ତୁ',
    
    // Teacher Dashboard
    teacherDashboard: 'ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ',
    classProgress: 'କ୍ଲାସର ଅଗ୍ରଗତି',
    assignments: 'ଆସାଇନମେଣ୍ଟ',
    analytics: 'ବିଶ୍ଳେଷଣ',
    exportReports: 'ରିପୋର୍ଟ ରପ୍ତାନି କରନ୍ତୁ',
    
    // Offline
    offlineMode: 'ଅଫଲାଇନ ମୋଡ',
    offlineMessage: 'କୌଣସି ଇଣ୍ଟରନେଟ ସଂଯୋଗ ନାହିଁ। ଆପଣଙ୍କର ଅଗ୍ରଗତି ସ୍ଥାନୀୟ ଭାବରେ ସଞ୍ଚୟ ହୋଇଛି।',
  },
  ml: {
    // Navigation
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    quests: 'അന്വേഷണങ്ങൾ',
    leaderboard: 'ലീഡർബോർഡ്',
    profile: 'പ്രൊഫൈൽ',
    
    // Subjects
    math: 'ഗണിതം',
    science: 'ശാസ്ത്രം',
    technology: 'സാങ്കേതികവിദ്യ',
    engineering: 'എഞ്ചിനീയറിംഗ്',
    
    // Gamification
    level: 'നിലവാരം',
    xp: 'അനുഭവ പോയിന്റുകൾ',
    points: 'പോയിന്റുകൾ',
    streak: 'ദിവസങ്ങളുടെ നിര',
    badges: 'ബാഡ്ജുകൾ',
    
    // Quests
    questsTitle: 'പഠന അന്വേഷണങ്ങൾ',
    questsSubtitle: 'നിങ്ങളുടെ സാഹസികത തിരഞ്ഞെടുക്കുക, STEM ആശയങ്ങളിൽ പ്രാവീണ്യം നേടുക!',
    startQuest: 'അന്വേഷണം ആരംഭിക്കുക',
    difficulty: 'ബുദ്ധിമുട്ട്',
    
    // Login
    welcomeBack: 'വീണ്ടും സ്വാഗതം',
    loginSubtitle: 'നിങ്ങളുടെ പഠന യാത്ര തുടരുക',
    mobileNumber: 'മൊബൈൽ നമ്പർ',
    otp: 'OTP നൽകുക',
    sendOtp: 'OTP അയയ്ക്കുക',
    verifyOtp: 'OTP പരിശോധിക്കുക',
    qrLogin: 'QR കോഡ് ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക',
    
    // Teacher Dashboard
    teacherDashboard: 'ടീച്ചർ ഡാഷ്‌ബോർഡ്',
    classProgress: 'ക്ലാസ് പുരോഗതി',
    assignments: 'അസൈൻമെന്റുകൾ',
    analytics: 'വിശകലനം',
    exportReports: 'റിപ്പോർട്ടുകൾ എക്സ്പോർട്ട് ചെയ്യുക',
    
    // Offline
    offlineMode: 'ഓഫ്‌ലൈൻ മോഡ്',
    offlineMessage: 'ഇന്റർനെറ്റ് കണക്ഷൻ ഇല്ല. നിങ്ങളുടെ പുരോഗതി പ്രാദേശികമായി സേവ് ചെയ്തിട്ടുണ്ട്.',
  },
  pa: {
    // Navigation
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    quests: 'ਖੋਜ',
    leaderboard: 'ਲੀਡਰਬੋਰਡ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    
    // Subjects
    math: 'ਗਣਿਤ',
    science: 'ਵਿਗਿਆਨ',
    technology: 'ਤਕਨਾਲੋਜੀ',
    engineering: 'ਇੰਜੀਨੀਅਰਿੰਗ',
    
    // Gamification
    level: 'ਪੱਧਰ',
    xp: 'ਤਜਰਬੇ ਦੇ ਅੰਕ',
    points: 'ਅੰਕ',
    streak: 'ਦਿਨ ਦੀ ਲਕੀਰ',
    badges: 'ਬੈਜ',
    
    // Quests
    questsTitle: 'ਸਿੱਖਣ ਦੀ ਖੋਜ',
    questsSubtitle: 'ਆਪਣਾ ਰੋਮਾਂਚ ਚੁਣੋ ਅਤੇ STEM ਸੰਕਲਪਾਂ ਵਿੱਚ ਮਾਹਰ ਬਣੋ!',
    startQuest: 'ਖੋਜ ਸ਼ੁਰੂ ਕਰੋ',
    difficulty: 'ਮੁਸ਼ਕਲ',
    
    // Login
    welcomeBack: 'ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ',
    loginSubtitle: 'ਆਪਣੀ ਸਿੱਖਣ ਦੀ ਯਾਤਰਾ ਜਾਰੀ ਰੱਖੋ',
    mobileNumber: 'ਮੋਬਾਈਲ ਨੰਬਰ',
    otp: 'OTP ਦਾਖਲ ਕਰੋ',
    sendOtp: 'OTP ਭੇਜੋ',
    verifyOtp: 'OTP ਤਸਦੀਕ ਕਰੋ',
    qrLogin: 'QR ਕੋਡ ਨਾਲ ਲਾਗਿਨ ਕਰੋ',
    
    // Teacher Dashboard
    teacherDashboard: 'ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ',
    classProgress: 'ਜਮਾਤੀ ਤਰੱਕੀ',
    assignments: 'ਅਸਾਈਨਮੈਂਟ',
    analytics: 'ਵਿਸ਼ਲੇਸ਼ਣ',
    exportReports: 'ਰਿਪੋਰਟਾਂ ਨਿਰਯਾਤ ਕਰੋ',
    
    // Offline
    offlineMode: 'ਔਫਲਾਈਨ ਮੋਡ',
    offlineMessage: 'ਇੰਟਰਨੈਟ ਕਨੈਕਸ਼ਨ ਨਹੀਂ ਹੈ। ਤੁਹਾਡੀ ਤਰੱਕੀ ਸਥਾਨਕ ਤੌਰ \'ਤੇ ਸੁਰੱਖਿਅਤ ਹੈ।',
  },
  as: {
    // Navigation
    dashboard: 'ডেশব\'ৰ্ড',
    quests: 'অন্বেষণ',
    leaderboard: 'লিডাৰব\'ৰ্ড',
    profile: 'প্ৰ\'ফাইল',
    
    // Subjects
    math: 'গণিত',
    science: 'বিজ্ঞান',
    technology: 'প্ৰযুক্তি',
    engineering: 'অভিযান্ত্ৰিকতা',
    
    // Gamification
    level: 'স্তৰ',
    xp: 'অভিজ্ঞতাৰ পইণ্ট',
    points: 'পইণ্ট',
    streak: 'দিনৰ শাৰী',
    badges: 'বেজ',
    
    // Quests
    questsTitle: 'শিক্ষাৰ অন্বেষণ',
    questsSubtitle: 'আপোনাৰ দুঃসাহসিক অভিযান বাছনি কৰক আৰু STEM ধাৰণাসমূহত দক্ষতা অৰ্জন কৰক!',
    startQuest: 'অন্বেষণ আৰম্ভ কৰক',
    difficulty: 'কষ্ট',
    
    // Login
    welcomeBack: 'পুনৰাই স্বাগতম',
    loginSubtitle: 'আপোনাৰ শিক্ষাৰ যাত্ৰা অব্যাহত ৰাখক',
    mobileNumber: 'ম\'বাইল নম্বৰ',
    otp: 'OTP প্ৰবিষ্ট কৰক',
    sendOtp: 'OTP পঠিয়াওক',
    verifyOtp: 'OTP সত্যাপন কৰক',
    qrLogin: 'QR ক\'ডেৰে লগ ইন কৰক',
    
    // Teacher Dashboard
    teacherDashboard: 'শিক্ষক ডেশব\'ৰ্ড',
    classProgress: 'শ্ৰেণীৰ অগ্ৰগতি',
    assignments: 'এচাইনমেণ্ট',
    analytics: 'বিশ্লেষণ',
    exportReports: 'প্ৰতিবেদন ৰপ্তানি কৰক',
    
    // Offline
    offlineMode: 'অফলাইন মোড',
    offlineMessage: 'ইণ্টাৰনেট সংযোগ নাই। আপোনাৰ অগ্ৰগতি স্থানীয়ভাৱে সংৰক্ষণ কৰা হৈছে।',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};