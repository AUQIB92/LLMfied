"use client"

import { useState, useRef } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  X,
  Upload,
  Check,
  AlertCircle,
  ArrowLeft
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfileSettings() {
  const { user, updateProfile, getAuthHeaders } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "")
  const [avatarFile, setAvatarFile] = useState(null)
  const fileInputRef = useRef(null)
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
    specialization: user?.specialization || "",
    experience: user?.experience || "",
    website: user?.website || "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setMessage({ type: "error", text: "File size must be less than 5MB" })
        return
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        setMessage({ type: "error", text: "Please select a valid image file (JPEG, PNG, or WebP)" })
        return
      }

      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result)
      }
      reader.readAsDataURL(file)
      setMessage({ type: "", text: "" }) // Clear any previous errors
    }
  }

  const uploadAvatar = async () => {
    if (!avatarFile) return null

    const formData = new FormData()
    formData.append("file", avatarFile)

    try {
      const response = await fetch("/api/upload/avatar", {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
      })

      const data = await response.json()
      
      if (response.ok) {
        return data.avatarUrl
      } else {
        throw new Error(data.error || "Failed to upload avatar")
      }
    } catch (error) {
      throw new Error("Failed to upload avatar: " + error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      let avatarUrl = user?.avatar

      // Upload avatar first if there's a new file
      if (avatarFile) {
        try {
          avatarUrl = await uploadAvatar()
        } catch (error) {
          setMessage({ type: "error", text: error.message })
          setLoading(false)
          return
        }
      }

      const updateData = {
        ...formData,
        ...(avatarUrl && avatarUrl !== user?.avatar && { avatar: avatarUrl })
      }

      const result = await updateProfile(updateData)
      
      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" })
        setTimeout(() => {
          router.back()
        }, 2000)
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update profile" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while updating profile" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Profile Settings
          </h2>
          <p className="text-slate-600 mt-2">Manage your account information and preferences</p>
        </div>
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Success/Error Messages */}
      {message.text && (
        <Alert className={`${message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
          {message.type === "success" ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar and Basic Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Photo
            </CardTitle>
            <CardDescription>Upload and manage your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-32 w-32 ring-4 ring-slate-200 group-hover:ring-blue-300 transition-all duration-300">
                  <AvatarImage src={avatarPreview} alt={formData.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                    {formData.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Camera className="h-8 w-8 text-white" />
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              
              <Button 
                onClick={handleAvatarClick}
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
              
              <p className="text-xs text-slate-500 text-center">
                JPG, PNG or GIF. Max size 5MB
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {user?.role === "educator" ? "Educator" : "Learner"}
              </Badge>
              <p className="text-sm text-slate-600">
                Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and professional information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {user?.role === "educator" && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Professional Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Area of Specialization</Label>
                      <Input
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="e.g., Computer Science, Mathematics, Biology"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g., 5 years"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://your-website.com"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
