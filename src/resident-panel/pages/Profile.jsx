import React, { useState } from 'react';
import { Card, Input, Select, Button, Switch, Avatar, Badge } from '../components/ui';
import { User, Shield, Building2, CreditCard, FileText, Camera, Edit2, Lock, Calendar, Clock } from 'lucide-react';

const Profile = () => {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm">Manage your account settings, facilities, and subscription</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 font-semibold">
          <Edit2 className="w-4 h-4" /> Edit Profile
        </Button>
      </div>

      {/* Profile Header Banner */}
      <Card className="p-0 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#00AEEF] to-[#0072CE]" />
        <div className="px-8 pb-8 flex flex-col md:flex-row md:items-end gap-6 -mt-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              SM
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Pawan Singhnia</h2>
              <Badge variant="primary" className="bg-blue-100 text-blue-700 font-semibold px-3">Resident</Badge>
            </div>
            <p className="text-gray-500 text-sm mt-1">pawan.singhnia@oasisnotes.com</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 pb-2 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Joined Jan 15, 2025
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Last login Mar 1, 2026 at 9:32 AM
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Personal Information */}
          <Card className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <User className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-900">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="First Name" defaultValue="Pawan" />
              <Input label="Middle Name" placeholder="Middle Name" />
              <Input label="Last Name" defaultValue="Singhnia" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                label="Gender" 
                options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} 
                defaultValue="male"
              />
              <Select 
                label="Time Format" 
                options={[{value: '12', label: '12 hrs'}, {value: '24', label: '24 hrs'}]} 
                defaultValue="12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Phone" defaultValue="(555) 555-0199" />
              <Input label="Email" defaultValue="pawan.singhnia@oasisnotes.com" />
            </div>

            <div className="space-y-4">
              <Input label="Address" defaultValue="123 Healthcare Blvd" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Address" defaultValue="Dallas" />
                <Input label="City" defaultValue="City" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="State" defaultValue="TX" />
                <Input label="ZIP Code" defaultValue="75201" />
              </div>
            </div>

            <Input label="Company Name" defaultValue="Creative Buffer" />
          </Card>

          {/* Insurance & Payer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Shield className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-gray-900">Insurance Information</h3>
              </div>
              <Select 
                label="Insurance Type *" 
                options={[{value: 'primary', label: 'Primary'}, {value: 'secondary', label: 'Secondary'}]} 
                defaultValue="primary"
              />
            </Card>

            <Card className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-gray-900">Payer Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Payer Name *" defaultValue="Blue Cross Blue Shield" />
                <Input label="Payer ID (Electronic) *" defaultValue="BCBS-001" />
              </div>
            </Card>
          </div>

          {/* Policy Details */}
          <Card className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <FileText className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-900">Policy Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Member ID *" defaultValue="MEM-88432" />
              <Input label="Group Number" defaultValue="GRP-100" />
              <Input label="Insurance Plan Name" defaultValue="Blue Cross PPO" />
            </div>
          </Card>

          <div className="text-center text-[10px] text-gray-400 py-4">
            App v1.0
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Company Info */}
          <Card className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Building2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-900">Company Info</h3>
            </div>
            <div className="flex flex-col items-center py-6 gap-4 bg-gray-50/50 rounded-xl border border-gray-100">
              {/* Mock Logo */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">CB</div>
                <div>
                  <div className="font-bold text-emerald-600 flex items-center gap-1">
                    <span className="text-emerald-500">CREATIVE</span> BUFFER
                  </div>
                  <div className="text-[10px] text-gray-400 tracking-widest text-right -mt-1">Creativity Inside</div>
                </div>
              </div>
              <div className="text-blue-600 font-semibold flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4" /> Creative Buffer
              </div>
            </div>
            <Button variant="outline" className="w-full text-gray-600 gap-2 h-11 bg-gray-50/50 border-gray-200">
              <Camera className="w-4 h-4" /> Change Logo
            </Button>
          </Card>

          {/* Security */}
          <Card className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Shield className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-900">Security</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Switch 
                  label="Two-Factor Auth" 
                  checked={twoFactor} 
                  onChange={setTwoFactor} 
                />
                <p className="text-xs text-gray-400 mt-1">Extra layer of security</p>
              </div>
              
              <Button variant="outline" className="w-full text-gray-600 gap-2 h-11 bg-gray-50/50 border-gray-200">
                <Lock className="w-4 h-4" /> Change Password
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
