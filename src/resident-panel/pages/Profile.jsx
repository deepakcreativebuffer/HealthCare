import React, { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../../data/api";
import {
  Card,
  Input,
  Select,
  Button,
  Switch,
  Avatar,
  Badge,
  Modal,
} from "../components/ui";
import {
  User,
  Shield,
  Building2,
  CreditCard,
  FileText,
  Camera,
  Edit2,
  Lock,
  Calendar,
  Clock,
  X,
  Check,
} from "lucide-react";

const Profile = () => {
  const { resident, refreshResident } = useOutletContext();
  const [twoFactor, setTwoFactor] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: resident?.name?.split(" ")[0] || "",
    lastName: resident?.name?.split(" ").slice(1).join(" ") || "",
    email: resident?.email || "",
    gender: resident?.gender || "Female",
    phone: resident?.phone || "(555) 555-0199",
    city: "Dallas",
    state: "TX",
    zipCode: "75201"
  });

  React.useEffect(() => {
    if (resident) {
      setFormData(prev => ({
        ...prev,
        firstName: resident.name.split(" ")[0] || "",
        lastName: resident.name.split(" ").slice(1).join(" ") || "",
        email: resident.email || "",
        gender: resident.gender || "Female",
        phone: resident.phone || "(555) 555-0199"
      }));
    }
  }, [resident]);

  const handleSaveProfile = async () => {
    await api.updateResident(resident.id, {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      gender: formData.gender,
      phone: formData.phone
    });
    if (refreshResident) refreshResident();
    setIsEditing(false);
  };

  const profileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const initial = resident.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfileImage(reader.result);
        } else {
          setCompanyLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-[12px]">
            Manage your account settings, facilities, and subscription
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-1.5 border-gray-200 h-9 text-[13px]"
                onClick={() => setIsEditing(false)}
              >
                <X className="w-4 h-4" /> Cancel
              </Button>
              <Button
                variant="primary"
                className="flex items-center gap-1.5 shadow-lg shadow-blue-200 h-9 text-[13px]"
                onClick={handleSaveProfile}
              >
                <Check className="w-4 h-4" /> Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="flex items-center gap-1.5 font-semibold h-9 text-[13px]"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Header Banner */}
      <Card className="p-0 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#00AEEF] to-[#0072CE]" />
        <div className="px-5 pb-4 flex flex-col md:flex-row md:items-end gap-4 -mt-10">
          <div className="relative">
            <input
              type="file"
              ref={profileInputRef}
              onChange={(e) => handleImageChange(e, "profile")}
              className="hidden"
              accept="image/*"
            />
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                initial
              )}
            </div>
            <button
              onClick={() => profileInputRef.current.click()}
              className="absolute bottom-0.5 right-0.5 p-1.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                {resident.name}
              </h2>
              <Badge
                variant="primary"
                className="bg-blue-100 text-blue-700 font-semibold px-2 py-0 text-[10px]"
              >
                Resident
              </Badge>
            </div>
            <p className="text-gray-500 text-[12px] mt-0.5">{resident.email}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6 pb-1 text-[12px] text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Joined Jan 15, 2025
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Last login Mar 1, 2026 at 9:32 AM
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-4">
          {/* Personal Information */}
          <Card className="space-y-4 p-3">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 mb-2">
              <User className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-gray-900 text-[14px]">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                readOnly={!isEditing}
              />
              <Input
                label="Middle Name"
                placeholder="Middle Name"
                readOnly={!isEditing}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                readOnly={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                disabled={!isEditing}
              />
              <Select
                label="Time Format"
                options={[
                  { value: "12", label: "12 hrs" },
                  { value: "24", label: "24 hrs" },
                ]}
                defaultValue="12"
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                readOnly={!isEditing}
              />
              <Input
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                readOnly={!isEditing}
              />
            </div>

            <div className="space-y-4">
              <Input
                label="Address"
                defaultValue="123 Healthcare Blvd"
                readOnly={!isEditing}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  readOnly={!isEditing}
                />
                <Input
                  label="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  readOnly={!isEditing}
                />
                <Input
                  label="ZIP Code"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <Input
              label="Associated Facility"
              defaultValue="Oasis Recovery Center"
              readOnly={!isEditing}
            />
          </Card>

          {/* Insurance & Payer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="space-y-3 p-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Shield className="w-4 h-4 text-blue-500" />
                <h3 className="font-bold text-gray-900 text-[14px]">
                  Insurance Information
                </h3>
              </div>
              <Select
                label="Insurance Type *"
                options={[
                  { value: "primary", label: "Primary" },
                  { value: "secondary", label: "Secondary" },
                ]}
                defaultValue="primary"
                disabled={!isEditing}
              />
            </Card>

            <Card className="space-y-3 p-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <h3 className="font-bold text-gray-900 text-[14px]">Payer Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Payer Name *"
                  defaultValue="Blue Cross Blue Shield"
                  readOnly={!isEditing}
                />
                <Input
                  label="Payer ID (Electronic) *"
                  defaultValue="BCBS-001"
                  readOnly={!isEditing}
                />
              </div>
            </Card>
          </div>

          {/* Policy Details */}
          <Card className="space-y-4 p-3">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <FileText className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-gray-900 text-[14px]">Policy Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Member ID *"
                defaultValue="MEM-88432"
                readOnly={!isEditing}
              />
              <Input
                label="Group Number"
                defaultValue="GRP-100"
                readOnly={!isEditing}
              />
              <Input
                label="Insurance Plan Name"
                defaultValue="Blue Cross PPO"
                readOnly={!isEditing}
              />
            </div>
          </Card>

          <div className="text-center text-[10px] text-gray-400 py-4">
            App v1.0
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-4">
          {/* Company Info */}
          <Card className="space-y-4 p-3">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Building2 className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-gray-900 text-[14px]">Company Info</h3>
            </div>
            <div className="flex flex-col items-center py-4 gap-3 bg-gray-50/50 rounded-lg border border-gray-100">
              {/* Logo Display */}
              <input
                type="file"
                ref={logoInputRef}
                onChange={(e) => handleImageChange(e, "logo")}
                className="hidden"
                accept="image/*"
              />
              <div className="flex items-center gap-2 px-4 py-4 bg-white border border-gray-200 rounded-lg">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      CB
                    </div>
                    <div>
                      <div className="font-bold text-emerald-600 flex items-center gap-1">
                        <span className="text-emerald-500">CREATIVE</span>{" "}
                        BUFFER
                      </div>
                      <div className="text-[10px] text-gray-400  text-right -mt-1">
                        Creativity Inside
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="text-blue-600 font-semibold flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4" /> Creative Buffer
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full text-gray-600 gap-2 h-8 text-[13px] bg-gray-50/50 border-gray-200"
              onClick={() => logoInputRef.current.click()}
            >
              <Camera className="w-4 h-4" /> Change Logo
            </Button>
          </Card>

          {/* Security */}
          <Card className="space-y-4 p-3">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Shield className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-gray-900 text-[14px]">Security</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Switch
                  label="Two-Factor Auth"
                  checked={twoFactor}
                  onChange={setTwoFactor}
                  disabled={!isEditing}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Extra layer of security
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full text-gray-600 gap-2 h-8 text-[13px] bg-gray-50/50 border-gray-200"
                onClick={() => setShowPasswordModal(true)}
              >
                <Lock className="w-4 h-4" /> Change Password
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Please enter your current password and your new password below.
          </p>
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
          />
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="pt-4 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1 shadow-lg shadow-blue-200"
              onClick={() => {
                alert("Password updated successfully!");
                setShowPasswordModal(false);
              }}
            >
              Update Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
