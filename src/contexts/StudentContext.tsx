import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StudentProfileData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  
  // Academic Information
  schoolName: string;
  grade: string;
  subjects: string[];
  interests: string[];
  
  // Location
  city: string;
  state: string;
  country: string;
  
  // Additional
  bio: string;
  goals: string;
  learningStyle: string;
  
  // System
  profileCompletion: number;
  credits: number;
  lastUpdated: string;
}

export interface StudentData {
  name: string;
  level: number;
  currentXP: number;
  requiredXP: number;
  streak: number;
  totalBadges: number;
  credits: number;
  profile: StudentProfileData;
}

interface StudentContextType {
  studentData: StudentData;
  updateStudentData: (data: Partial<StudentData>) => void;
  updateProfile: (profile: Partial<StudentProfileData>) => void;
  addCredits: (amount: number) => void;
  addXP: (amount: number, reason?: string) => void;
  calculateProfileCompletion: (profile: StudentProfileData) => number;
  calculateCreditsFromCompletion: (completion: number) => number;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studentData, setStudentData] = useState<StudentData>({
    name: "New Learner",
    level: 1,
    currentXP: 0,
    requiredXP: 100,
    streak: 0,
    totalBadges: 0,
    credits: 0,
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      schoolName: '',
      grade: '',
      subjects: [] as string[],
      interests: [] as string[],
      city: '',
      state: '',
      country: '',
      bio: '',
      goals: '',
      learningStyle: '',
      profileCompletion: 0,
      credits: 0,
      lastUpdated: new Date().toISOString(),
    }
  });

  // Load student data from localStorage on mount
  useEffect(() => {
    const savedStudentData = localStorage.getItem('studentData');
    const savedProfile = localStorage.getItem('studentProfile');
    
    if (savedStudentData) {
      const parsed = JSON.parse(savedStudentData);
      setStudentData(prev => ({ ...prev, ...parsed }));
    }
    
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      const completion = calculateProfileCompletion(parsed);
      const credits = calculateCreditsFromCompletion(completion);
      
      setStudentData(prev => ({
        ...prev,
        profile: {
          ...parsed,
          profileCompletion: completion,
          credits: credits
        },
        credits: credits
      }));
    } else {
      // For new users, calculate initial profile completion
      const initialProfile = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        schoolName: '',
        grade: '',
        subjects: [] as string[],
        interests: [] as string[],
        city: '',
        state: '',
        country: '',
        bio: '',
        goals: '',
        learningStyle: '',
        profileCompletion: 0,
        credits: 0,
        lastUpdated: new Date().toISOString(),
      };
      
      const completion = calculateProfileCompletion(initialProfile);
      const credits = calculateCreditsFromCompletion(completion);
      
      setStudentData(prev => ({
        ...prev,
        profile: {
          ...initialProfile,
          profileCompletion: completion,
          credits: credits
        },
        credits: credits
      }));
    }
  }, []);

  // Save to localStorage whenever studentData changes
  useEffect(() => {
    localStorage.setItem('studentData', JSON.stringify(studentData));
  }, [studentData]);

  const calculateProfileCompletion = (profile: StudentProfileData): number => {
    const fields = [
      'firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender',
      'schoolName', 'grade', 'city', 'state', 'country', 'bio', 'goals', 'learningStyle'
    ];
    
    const completedFields = fields.filter(field => {
      const value = profile[field as keyof StudentProfileData];
      return value && value.toString().trim() !== '';
    }).length;
    
    const arrayFields = ['subjects', 'interests'];
    const completedArrayFields = arrayFields.filter(field => {
      const value = profile[field as keyof StudentProfileData] as string[];
      return value && value.length > 0;
    }).length;
    
    const totalFields = fields.length + arrayFields.length;
    const completedTotal = completedFields + completedArrayFields;
    
    return Math.round((completedTotal / totalFields) * 100);
  };

  const calculateCreditsFromCompletion = (completion: number): number => {
    if (completion >= 100) return 100;
    if (completion >= 90) return 75;
    if (completion >= 80) return 50;
    if (completion >= 70) return 30;
    if (completion >= 50) return 20;
    if (completion >= 30) return 10;
    return 0;
  };

  const updateStudentData = (data: Partial<StudentData>) => {
    setStudentData(prev => ({ ...prev, ...data }));
  };

  const updateProfile = (profileUpdate: Partial<StudentProfileData>) => {
    const updatedProfile = { ...studentData.profile, ...profileUpdate };
    const completion = calculateProfileCompletion(updatedProfile);
    const credits = calculateCreditsFromCompletion(completion);
    
    const finalProfile = {
      ...updatedProfile,
      profileCompletion: completion,
      credits: credits,
      lastUpdated: new Date().toISOString()
    };
    
    setStudentData(prev => ({
      ...prev,
      profile: finalProfile,
      credits: credits
    }));
    
    // Save profile separately to localStorage
    localStorage.setItem('studentProfile', JSON.stringify(finalProfile));
  };

  const addCredits = (amount: number) => {
    setStudentData(prev => ({
      ...prev,
      credits: prev.credits + amount
    }));
  };

  const addXP = (amount: number, reason?: string) => {
    setStudentData(prev => {
      const newXP = prev.currentXP + amount;
      const newLevel = Math.floor(newXP / prev.requiredXP) + 1;
      const newRequiredXP = newLevel * 100;
      
      // Log XP gain for debugging
      console.log(`🎉 XP Gained: +${amount}${reason ? ` (${reason})` : ''}`);
      
      return {
        ...prev,
        currentXP: newXP % prev.requiredXP,
        level: newLevel,
        requiredXP: newRequiredXP
      };
    });
  };

  return (
    <StudentContext.Provider value={{
      studentData,
      updateStudentData,
      updateProfile,
      addCredits,
      addXP,
      calculateProfileCompletion,
      calculateCreditsFromCompletion
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

