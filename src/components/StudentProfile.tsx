import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Award, Star, Edit3, Save, X, CheckCircle, Coins } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStudent, StudentProfileData } from '@/contexts/StudentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface StudentProfileProps {
  onCreditsUpdate?: (credits: number) => void;
  onProfileUpdate?: (profile: StudentProfileData) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ onCreditsUpdate, onProfileUpdate }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { studentData, updateProfile, addCredits } = useStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [showCreditsAnimation, setShowCreditsAnimation] = useState(false);
  
  const profileData = studentData.profile;

  // Save profile data
  const saveProfile = () => {
    const previousCredits = profileData.credits;
    
    updateProfile(profileData);
    
    // Show credits animation if credits increased
    if (profileData.credits > previousCredits) {
      setShowCreditsAnimation(true);
      setTimeout(() => setShowCreditsAnimation(false), 3000);
    }
    
    onCreditsUpdate?.(profileData.credits);
    onProfileUpdate?.(profileData);
    
    toast({
      title: t('profileUpdated'),
      description: `${t('profileCompletion')}: ${profileData.profileCompletion}% - ${t('creditsEarned')} ${profileData.credits} ${t('credits')}!`,
    });
    
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof StudentProfileData, value: string | string[]) => {
    updateProfile({ [field]: value });
  };

  const handleArrayFieldChange = (field: 'subjects' | 'interests', value: string) => {
    if (value.trim() === '') return;
    
    const currentArray = profileData[field] || [];
    updateProfile({
      [field]: [...currentArray, value.trim()]
    });
  };

  const removeArrayItem = (field: 'subjects' | 'interests', index: number) => {
    const currentArray = profileData[field] || [];
    updateProfile({
      [field]: currentArray.filter((_, i) => i !== index)
    });
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 90) return 'text-green-600';
    if (completion >= 70) return 'text-yellow-600';
    if (completion >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getCompletionMessage = (completion: number) => {
    if (completion >= 100) return t('profileComplete');
    if (completion >= 90) return t('almostThere');
    if (completion >= 70) return t('greatProgress');
    if (completion >= 50) return t('keepGoing');
    if (completion >= 30) return t('gettingStarted');
    return t('completeProfile');
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{t('profile')}</CardTitle>
                <CardDescription>
                  Complete your profile to earn credits and unlock features
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit3 className="h-4 w-4 mr-2" />
                  {t('editProfile')}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={saveProfile} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    {t('saveProfile')}
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    {t('cancel')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Profile Completion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">{t('profileCompletion')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${getCompletionColor(profileData.profileCompletion)}`}>
                  {profileData.profileCompletion}%
                </span>
                {profileData.credits > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    {profileData.credits} {t('credits')}
                  </Badge>
                )}
              </div>
            </div>
            
            <Progress value={profileData.profileCompletion} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {getCompletionMessage(profileData.profileCompletion)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Credits Animation */}
      <AnimatePresence>
        {showCreditsAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Coins className="h-5 w-5" />
            <span className="font-bold">+{profileData.credits} {t('creditsEarned')}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('personalInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t('firstName')}</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t('lastName')}</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div>
                <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
                <Label htmlFor="phone">{t('phone')}</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">{t('dateOfBirth')}</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="gender">{t('gender')}</Label>
                <Select
                  value={profileData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('male')}</SelectItem>
                    <SelectItem value="female">{t('female')}</SelectItem>
                    <SelectItem value="other">{t('other')}</SelectItem>
                    <SelectItem value="prefer-not-to-say">{t('preferNotToSay')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              {t('academicInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="schoolName">{t('schoolName')}</Label>
              <Input
                id="schoolName"
                value={profileData.schoolName}
                onChange={(e) => handleInputChange('schoolName', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your school name"
              />
            </div>
            
            <div>
              <Label htmlFor="grade">{t('grade')}</Label>
              <Select
                value={profileData.grade}
                onValueChange={(value) => handleInputChange('grade', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={`Grade ${i + 1}`}>
                      Grade {i + 1}
                    </SelectItem>
                  ))}
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>{t('subjects')}</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder={t('addSubject')}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleArrayFieldChange('subjects', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        if (input.value.trim()) {
                          handleArrayFieldChange('subjects', input.value);
                          input.value = '';
                        }
                      }}
                    >
                      {t('add')}
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profileData.subjects || []).map((subject, index) => (
    <Badge key={index} variant="secondary" className="flex items-center gap-1">
      {subject}
      {isEditing && (
        <button
          onClick={() => removeArrayItem('subjects', index)}
          className="ml-1 hover:text-red-500"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  ))}
</div>

              </div>
            </div>
            
            <div>
              <Label>{t('interests')}</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder={t('addInterest')}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleArrayFieldChange('interests', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        if (input.value.trim()) {
                          handleArrayFieldChange('interests', input.value);
                          input.value = '';
                        }
                      }}
                    >
                      {t('add')}
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profileData.interests || []).map((interest, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => removeArrayItem('interests', index)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('location')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="city">{t('city')}</Label>
              <Input
                id="city"
                value={profileData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your city"
              />
            </div>
            
            <div>
              <Label htmlFor="state">{t('state')}</Label>
              <Input
                id="state"
                value={profileData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your state"
              />
            </div>
            
            <div>
              <Label htmlFor="country">{t('country')}</Label>
              <Input
                id="country"
                value={profileData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your country"
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              {t('additionalInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bio">{t('bio')}</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="goals">{t('goals')}</Label>
              <Textarea
                id="goals"
                value={profileData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                disabled={!isEditing}
                placeholder="What do you want to achieve?"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="learningStyle">{t('learningStyle')}</Label>
              <Select
                value={profileData.learningStyle}
                onValueChange={(value) => handleInputChange('learningStyle', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your learning style" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="visual">{t('visualLearner')}</SelectItem>
                    <SelectItem value="auditory">{t('auditoryLearner')}</SelectItem>
                    <SelectItem value="kinesthetic">{t('kinestheticLearner')}</SelectItem>
                    <SelectItem value="reading-writing">{t('readingWritingLearner')}</SelectItem>
                    <SelectItem value="mixed">{t('mixedLearningStyle')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
