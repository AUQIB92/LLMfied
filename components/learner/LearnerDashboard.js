"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Play, 
  Star,
  Target,
  Calendar,
  Award,
  Zap,
  Brain,
  Users,
  ChevronRight,
  Sparkles,
  GraduationCap,
  BarChart3
} from "lucide-react"
import CourseLibrary from "./CourseLibrary"
import CourseViewer from "./CourseViewer"

export default function LearnerDashboard() {
  const { user } = useAuth()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [learningStats, setLearningStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    currentStreak: 0
  })

  useEffect(() => {
    // Simulate loading enrolled courses and stats
    setEnrolledCourses([
      {
        id: 1,
        title: "Advanced Machine Learning",
        progress: 75,
        totalModules: 12,
        completedModules: 9,
        instructor: "Dr. Sarah Chen",
        thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "AI & ML",
        difficulty: "Advanced",
        estimatedTime: "8 weeks",
        rating: 4.8
      },
      {
        id: 2,
        title: "React Development Masterclass",
        progress: 45,
        totalModules: 15,
        completedModules: 7,
        instructor: "Alex Thompson",
        thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Web Development",
        difficulty: "Intermediate",
        estimatedTime: "6 weeks",
        rating: 4.9
      },
      {
        id: 3,
        title: "Data Science Fundamentals",
        progress: 90,
        totalModules: 10,
        completedModules: 9,
        instructor: "Prof. Michael Rodriguez",
        thumbnail: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Data Science",
        difficulty: "Beginner",
        estimatedTime: "4 weeks",
        rating: 4.7
      }
    ])

    setRecentActivity([
      { type: "completed", course: "Data Science Fundamentals", module: "Statistical Analysis", time: "2 hours ago" },
      { type: "started", course: "React Development Masterclass", module: "State Management", time: "1 day ago" },
      { type: "quiz", course: "Advanced Machine Learning", module: "Neural Networks", score: 95, time: "2 days ago" },
      { type: "achievement", title: "Week Streak", description: "Completed 7 days in a row", time: "3 days ago" }
    ])

    setLearningStats({
      totalCourses: 3,
      completedCourses: 1,
      totalHours: 47,
      currentStreak: 7
    })
  }, [])

  if (selectedCourse) {
    return <CourseViewer course={selectedCourse} onBack={() => setSelectedCourse(null)} />
  }

  if (activeTab === "library") {
    return <CourseLibrary onCourseSelect={setSelectedCourse} />
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'intermediate': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI & ML': return Brain
      case 'Web Development': return BookOpen
      case 'Data Science': return BarChart3
      default: return BookOpen
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-learning">LLMfied</h1>
                  <p className="text-xs text-slate-500 -mt-1">AI-Powered Learning</p>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {[
                { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                { id: "library", label: "Course Library", icon: BookOpen }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-green-50 px-3 py-2 rounded-xl border border-emerald-200">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">{learningStats.currentStreak} day streak</span>
              </div>
              <Avatar className="w-10 h-10 ring-2 ring-blue-200 ring-offset-2">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "L"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="learning-card p-8 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome back, <span className="text-learning">{user?.name || "Learner"}!</span>
                </h2>
                <p className="text-lg text-slate-600">Ready to continue your learning journey?</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setActiveTab("library")}
                  className="learning-button flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Explore Courses</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  View Achievements
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Courses Enrolled",
              value: learningStats.totalCourses,
              icon: BookOpen,
              color: "from-blue-500 to-cyan-600",
              bgColor: "from-blue-50 to-cyan-50"
            },
            {
              title: "Courses Completed",
              value: learningStats.completedCourses,
              icon: Trophy,
              color: "from-emerald-500 to-green-600",
              bgColor: "from-emerald-50 to-green-50"
            },
            {
              title: "Learning Hours",
              value: `${learningStats.totalHours}h`,
              icon: Clock,
              color: "from-purple-500 to-pink-600",
              bgColor: "from-purple-50 to-pink-50"
            },
            {
              title: "Current Streak",
              value: `${learningStats.currentStreak} days`,
              icon: Zap,
              color: "from-orange-500 to-red-600",
              bgColor: "from-orange-50 to-red-50"
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className={`learning-card animate-fade-in-up stagger-${index + 1} overflow-hidden`}>
                <CardContent className="p-6">
                  <div className={`w-full h-2 bg-gradient-to-r ${stat.color} rounded-full mb-4`}></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <Card className="learning-card animate-fade-in-up stagger-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                    <Play className="w-6 h-6 mr-3 text-blue-600" />
                    Continue Learning
                  </CardTitle>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <CardDescription className="text-slate-600">
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {enrolledCourses.map((course, index) => {
                  const CategoryIcon = getCategoryIcon(course.category)
                  return (
                    <div 
                      key={course.id} 
                      className={`group p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:shadow-lg bg-gradient-to-r from-white to-blue-50/30 animate-slide-in-right stagger-${index + 1}`}
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-20 h-20 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <CategoryIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 text-lg">
                                {course.title}
                              </h3>
                              <p className="text-sm text-slate-600 mb-2">by {course.instructor}</p>
                              <div className="flex items-center space-x-3">
                                <Badge className={getDifficultyColor(course.difficulty)}>
                                  {course.difficulty}
                                </Badge>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium text-slate-700">{course.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-slate-500">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm">{course.estimatedTime}</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              className="learning-button opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              Continue
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-slate-700">
                                {course.completedModules} of {course.totalModules} modules completed
                              </span>
                              <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
                            </div>
                            <div className="progress-gradient">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Achievements */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="learning-card animate-fade-in-up stagger-3">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'completed' ? 'bg-emerald-100' :
                      activity.type === 'started' ? 'bg-blue-100' :
                      activity.type === 'quiz' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      {activity.type === 'completed' && <Trophy className="w-4 h-4 text-emerald-600" />}
                      {activity.type === 'started' && <Play className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'quiz' && <Target className="w-4 h-4 text-purple-600" />}
                      {activity.type === 'achievement' && <Award className="w-4 h-4 text-orange-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">
                        {activity.type === 'completed' && `Completed ${activity.module}`}
                        {activity.type === 'started' && `Started ${activity.module}`}
                        {activity.type === 'quiz' && `Quiz completed: ${activity.score}%`}
                        {activity.type === 'achievement' && activity.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {activity.course || activity.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="learning-card animate-fade-in-up stagger-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                  onClick={() => setActiveTab("library")}
                >
                  <BookOpen className="w-4 h-4 mr-3" />
                  Browse Course Library
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Study Time
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Join Study Groups
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}