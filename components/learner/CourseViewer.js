"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  Users, 
  Star,
  Trophy,
  Target,
  Brain,
  Lightbulb,
  MessageSquare,
  Download,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Zap,
  Award,
  BarChart3
} from "lucide-react"
import ModuleContent from "./ModuleContent"
import AITutor from "./AITutor"

export default function CourseViewer({ course, onBack }) {
  const [selectedModule, setSelectedModule] = useState(null)
  const [showAITutor, setShowAITutor] = useState(false)
  const [moduleProgress, setModuleProgress] = useState({})
  const [expandedModules, setExpandedModules] = useState(new Set([1]))
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading course data with enhanced modules
    setTimeout(() => {
      setCourseData({
        ...course,
        modules: [
          {
            id: 1,
            title: "Introduction to Machine Learning",
            description: "Fundamental concepts and overview of ML applications",
            duration: "45 min",
            content: `# Introduction to Machine Learning

Machine learning is a subset of artificial intelligence (AI) that focuses on the development of algorithms and statistical models that enable computers to improve their performance on a specific task through experience.

## Core Concepts

### What is Machine Learning?
Machine learning is the science of getting computers to learn and act like humans do, and improve their learning over time in autonomous fashion, by feeding them data and information in the form of observations and real-world interactions.

### Types of Machine Learning

#### Supervised Learning
Supervised learning is a type of machine learning where the algorithm learns from labeled training data. The algorithm makes predictions or decisions based on input data and is corrected when those predictions are wrong.

#### Unsupervised Learning  
Unsupervised learning is a type of machine learning that looks for previously undetected patterns in a data set with no pre-existing labels and with a minimum of human supervision.

#### Reinforcement Learning
Reinforcement learning is an area of machine learning concerned with how software agents ought to take actions in an environment in order to maximize the notion of cumulative reward.`,
            objectives: [
              "Understand the fundamental concepts of machine learning",
              "Distinguish between different types of ML algorithms",
              "Identify real-world applications of machine learning"
            ],
            completed: true,
            quiz: true
          },
          {
            id: 2,
            title: "Supervised Learning Algorithms",
            description: "Deep dive into classification and regression techniques",
            duration: "1h 20min",
            content: `# Supervised Learning Algorithms

Supervised learning algorithms learn from labeled training data to make predictions on new, unseen data.

## Classification Algorithms

### Decision Trees
Decision trees are a popular machine learning algorithm that can be used for both classification and regression tasks...

### Random Forest
Random Forest is an ensemble learning method that combines multiple decision trees...

## Regression Algorithms

### Linear Regression
Linear regression is a fundamental algorithm for predicting continuous values...`,
            objectives: [
              "Master classification algorithms like decision trees and SVM",
              "Understand regression techniques and their applications",
              "Implement supervised learning models from scratch"
            ],
            completed: false,
            quiz: true
          },
          {
            id: 3,
            title: "Neural Networks & Deep Learning",
            description: "Introduction to artificial neural networks and deep learning",
            duration: "2h 15min",
            content: `# Neural Networks & Deep Learning

Neural networks are computing systems inspired by biological neural networks...`,
            objectives: [
              "Understand the structure and function of neural networks",
              "Learn about backpropagation and gradient descent",
              "Build your first deep learning model"
            ],
            completed: false,
            quiz: true
          }
        ]
      })
      
      setModuleProgress({
        1: 100,
        2: 30,
        3: 0
      })
      
      setLoading(false)
    }, 1000)
  }, [course])

  const toggleModuleExpansion = (moduleId) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const getProgressColor = (progress) => {
    if (progress === 100) return "from-emerald-500 to-green-600"
    if (progress > 0) return "from-blue-500 to-purple-600"
    return "from-slate-300 to-slate-400"
  }

  const getModuleIcon = (module) => {
    if (module.completed) return CheckCircle
    if (moduleProgress[module.id] > 0) return PlayCircle
    return BookOpen
  }

  if (selectedModule) {
    return (
      <ModuleContent
        course={courseData}
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
        onComplete={(moduleId) => {
          setModuleProgress(prev => ({ ...prev, [moduleId]: 100 }))
          setSelectedModule(null)
        }}
      />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="learning-card p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading Course Content</h3>
          <p className="text-slate-600">Preparing your learning experience...</p>
        </div>
      </div>
    )
  }

  const overallProgress = courseData?.modules 
    ? Math.round(courseData.modules.reduce((acc, module) => acc + (moduleProgress[module.id] || 0), 0) / courseData.modules.length)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl px-3 py-2 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 truncate max-w-md">{courseData?.title}</h1>
                <p className="text-sm text-slate-600">by {courseData?.instructor}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-xl border border-blue-200">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">{overallProgress}% Complete</span>
              </div>
              <Button 
                variant="outline"
                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl px-4 py-2 transition-all duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <div className="learning-card p-8 animate-fade-in-up">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative">
                  <img 
                    src={courseData?.thumbnail} 
                    alt={courseData?.title}
                    className="w-full lg:w-48 h-32 lg:h-32 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">{courseData?.title}</h2>
                      <p className="text-lg text-slate-600 mb-4">{courseData?.description || "Master the fundamentals and advanced concepts through hands-on learning."}</p>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-3 py-1">
                          {courseData?.category}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 px-3 py-1">
                          {courseData?.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-slate-700">{courseData?.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{courseData?.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                      <span className="text-sm font-bold text-blue-600">{overallProgress}%</span>
                    </div>
                    <div className="progress-gradient">
                      <div 
                        className={`h-full bg-gradient-to-r ${getProgressColor(overallProgress)} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Modules */}
            <div className="learning-card animate-fade-in-up stagger-1">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                  Course Modules
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {courseData?.modules?.length} modules • Interactive content with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseData?.modules?.map((module, index) => {
                  const ModuleIcon = getModuleIcon(module)
                  const progress = moduleProgress[module.id] || 0
                  const isExpanded = expandedModules.has(module.id)
                  
                  return (
                    <div key={module.id} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-300 bg-gradient-to-r from-white to-blue-50/30">
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => toggleModuleExpansion(module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              module.completed 
                                ? 'bg-gradient-to-br from-emerald-500 to-green-600' 
                                : progress > 0 
                                  ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                                  : 'bg-gradient-to-br from-slate-300 to-slate-400'
                            } shadow-lg`}>
                              <ModuleIcon className="w-6 h-6 text-white" />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-bold text-slate-800 text-lg mb-1">{module.title}</h3>
                              <p className="text-slate-600 text-sm mb-2">{module.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{module.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Target className="w-4 h-4" />
                                  <span>{module.objectives?.length || 3} objectives</span>
                                </div>
                                {module.quiz && (
                                  <div className="flex items-center space-x-1">
                                    <Brain className="w-4 h-4" />
                                    <span>Quiz included</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-700 mb-1">{progress}%</div>
                              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${getProgressColor(progress)} transition-all duration-500`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-slate-100 bg-slate-50/50">
                          <div className="pt-4 space-y-4">
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                                <Target className="w-4 h-4 mr-2 text-blue-600" />
                                Learning Objectives
                              </h4>
                              <ul className="space-y-1">
                                {module.objectives?.map((objective, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-start">
                                    <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                                    {objective}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex gap-3">
                              <Button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedModule(module)
                                }}
                                className="learning-button flex items-center space-x-2"
                              >
                                <PlayCircle className="w-4 h-4" />
                                <span>{progress > 0 ? 'Continue' : 'Start'} Module</span>
                              </Button>
                              
                              {module.quiz && (
                                <Button 
                                  variant="outline"
                                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                                >
                                  <Brain className="w-4 h-4 mr-2" />
                                  Take Quiz
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Tutor */}
            <Card className="learning-card animate-fade-in-up stagger-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  AI Learning Assistant
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Get instant help and explanations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowAITutor(true)}
                  className="w-full learning-button flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with AI Tutor</span>
                </Button>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card className="learning-card animate-fade-in-up stagger-3">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Modules Completed</p>
                      <p className="text-lg font-bold text-slate-800">
                        {courseData?.modules?.filter(m => m.completed).length || 0} / {courseData?.modules?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Overall Progress</p>
                      <p className="text-lg font-bold text-slate-800">{overallProgress}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Time Invested</p>
                      <p className="text-lg font-bold text-slate-800">12.5 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="learning-card animate-fade-in-up stagger-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Download Resources
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                >
                  <Bookmark className="w-4 h-4 mr-3" />
                  Bookmark Course
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Join Discussion
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Tutor Modal */}
      {showAITutor && courseData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <AITutor
              course={courseData}
              module={courseData.modules[0]}
              onClose={() => setShowAITutor(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}