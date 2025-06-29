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
  Brain,
  Lightbulb,
  MessageSquare,
  Target,
  Award,
  ChevronRight,
  Sparkles,
  Zap,
  Code,
  Eye,
  Download,
  Share2,
  Volume2,
  Pause,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Star,
  Bookmark,
  FileText,
  Video,
  ExternalLink,
  Globe,
  Wrench,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"
import AITutor from "./AITutor"
import QuizModal from "./QuizModal"

export default function ModuleContent({ course, module, onBack, onComplete }) {
  const [showAITutor, setShowAITutor] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const [completedSections, setCompletedSections] = useState(new Set())

  // Enhanced module data with resources and interactive elements
  const [moduleData, setModuleData] = useState({
    ...module,
    estimatedReadTime: "15 min",
    difficulty: "Intermediate",
    prerequisites: ["Basic programming knowledge", "Understanding of algorithms"],
    resources: {
      books: [
        {
          title: "Pattern Recognition and Machine Learning",
          author: "Christopher Bishop",
          description: "Comprehensive introduction to machine learning and pattern recognition",
          url: "https://www.amazon.com/Pattern-Recognition-Learning-Information-Statistics/dp/0387310738",
          rating: 4.8
        },
        {
          title: "The Elements of Statistical Learning",
          author: "Trevor Hastie",
          description: "Statistical learning theory and methods",
          url: "https://www.amazon.com/Elements-Statistical-Learning-Prediction-Statistics/dp/0387848576",
          rating: 4.7
        }
      ],
      videos: [
        {
          title: "Machine Learning Explained",
          creator: "3Blue1Brown",
          description: "Visual introduction to neural networks and deep learning",
          url: "https://www.youtube.com/watch?v=aircAruvnKk",
          duration: "19 min"
        },
        {
          title: "Andrew Ng's ML Course",
          creator: "Stanford Online",
          description: "Complete machine learning course from Stanford",
          url: "https://www.coursera.org/learn/machine-learning",
          duration: "11 weeks"
        }
      ],
      articles: [
        {
          title: "A Gentle Introduction to Machine Learning",
          source: "Towards Data Science",
          description: "Beginner-friendly overview of ML concepts",
          url: "https://towardsdatascience.com/a-gentle-introduction-to-machine-learning-74aa7d1c4b6e"
        }
      ],
      tools: [
        {
          name: "Jupyter Notebook",
          description: "Interactive computing environment for data science",
          url: "https://jupyter.org/",
          type: "Development Environment"
        },
        {
          name: "scikit-learn",
          description: "Machine learning library for Python",
          url: "https://scikit-learn.org/",
          type: "Python Library"
        }
      ]
    },
    keyInsights: [
      "Machine learning enables computers to learn patterns from data without explicit programming",
      "Different types of ML (supervised, unsupervised, reinforcement) solve different problem types",
      "The quality and quantity of training data significantly impacts model performance"
    ],
    practicalApplications: [
      "Recommendation systems (Netflix, Amazon)",
      "Image recognition (medical diagnosis, autonomous vehicles)",
      "Natural language processing (chatbots, translation)"
    ]
  })

  useEffect(() => {
    // Simulate reading progress
    const interval = setInterval(() => {
      if (isReading && readingProgress < 100) {
        setReadingProgress(prev => Math.min(prev + 1, 100))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isReading, readingProgress])

  useEffect(() => {
    // Auto-start reading when component mounts
    setIsReading(true)
  }, [])

  const handleSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]))
  }

  const handleModuleComplete = () => {
    setReadingProgress(100)
    onComplete(module.id)
  }

  const getResourceIcon = (type) => {
    switch (type) {
      case 'books': return BookOpen
      case 'videos': return Video
      case 'articles': return FileText
      case 'tools': return Wrench
      default: return ExternalLink
    }
  }

  const getResourceColor = (type) => {
    switch (type) {
      case 'books': return 'from-blue-500 to-cyan-600'
      case 'videos': return 'from-red-500 to-pink-600'
      case 'articles': return 'from-green-500 to-emerald-600'
      case 'tools': return 'from-purple-500 to-indigo-600'
      default: return 'from-slate-500 to-gray-600'
    }
  }

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
                <span>Back to Course</span>
              </Button>
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 truncate max-w-md">{module.title}</h1>
                <p className="text-sm text-slate-600">{course.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-xl border border-blue-200">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">{readingProgress}% Read</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`rounded-xl transition-all duration-300 ${bookmarked ? 'text-yellow-600 bg-yellow-50' : 'text-slate-600 hover:text-yellow-600 hover:bg-yellow-50'}`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                </Button>
                
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-2 shadow-lg">
                <TabsTrigger 
                  value="content" 
                  className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Content</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="resources" 
                  className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span className="hidden sm:inline">Insights</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="practice" 
                  className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Practice</span>
                </TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card className="learning-card animate-fade-in-up">
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-3xl font-bold text-slate-800 mb-3">{module.title}</CardTitle>
                        <CardDescription className="text-lg text-slate-600">
                          {module.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">{moduleData.estimatedReadTime} read</span>
                        </div>
                        <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
                          {moduleData.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 mb-1">Learning Objectives</h3>
                          <p className="text-sm text-slate-600">What you'll learn in this module</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {module.objectives?.map((objective, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-slate-800">{objective}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <div className="module-content" dangerouslySetInnerHTML={{ __html: module.content.replace(/^# .*$/m, '').replace(/\n## /g, '\n<h2 class="text-2xl font-bold mt-8 mb-4 text-learning">').replace(/\n### /g, '\n<h3 class="text-xl font-bold mt-6 mb-3 text-learning">').replace(/\n/g, '<br />') }} />
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setLiked(!liked)}
                          className={`border-2 ${liked ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'} transition-all duration-300`}
                        >
                          <ThumbsUp className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                          Helpful
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-2 border-slate-200 text-slate-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300"
                          onClick={() => setShowAITutor(true)}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Ask AI Tutor
                        </Button>
                      </div>
                      
                      <Button 
                        onClick={handleModuleComplete}
                        className="learning-button"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Complete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-6">
                <Card className="learning-card animate-fade-in-up">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                      <Sparkles className="w-6 h-6 mr-3 text-emerald-600" />
                      Learning Resources
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Curated materials to enhance your understanding
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {Object.entries(moduleData.resources).map(([type, resources]) => {
                      if (!resources || resources.length === 0) return null
                      
                      const ResourceIcon = getResourceIcon(type)
                      const gradientColor = getResourceColor(type)
                      
                      return (
                        <div key={type} className="space-y-4">
                          <h3 className="text-xl font-bold text-slate-800 flex items-center">
                            <div className={`w-8 h-8 bg-gradient-to-br ${gradientColor} rounded-lg flex items-center justify-center mr-3`}>
                              <ResourceIcon className="w-4 h-4 text-white" />
                            </div>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map((resource, index) => (
                              <a 
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 bg-white hover:shadow-lg`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`w-10 h-10 bg-gradient-to-br ${gradientColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <ResourceIcon className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-slate-800 mb-1 hover:text-blue-600 transition-colors duration-300">
                                      {resource.title || resource.name}
                                    </h4>
                                    {resource.author && (
                                      <p className="text-sm text-slate-600 mb-1">by {resource.author}</p>
                                    )}
                                    {resource.creator && (
                                      <p className="text-sm text-slate-600 mb-1">by {resource.creator}</p>
                                    )}
                                    <p className="text-sm text-slate-600 line-clamp-2">{resource.description}</p>
                                    
                                    <div className="flex items-center space-x-3 mt-2">
                                      {resource.rating && (
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                          <span className="text-xs font-medium text-slate-700">{resource.rating}</span>
                                        </div>
                                      )}
                                      {resource.duration && (
                                        <div className="flex items-center space-x-1">
                                          <Clock className="w-3 h-3 text-slate-500" />
                                          <span className="text-xs text-slate-600">{resource.duration}</span>
                                        </div>
                                      )}
                                      <div className="flex items-center space-x-1 text-blue-600 text-xs">
                                        <ExternalLink className="w-3 h-3" />
                                        <span>View Resource</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                <Card className="learning-card animate-fade-in-up">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                      <Lightbulb className="w-6 h-6 mr-3 text-purple-600" />
                      Key Insights
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Important concepts and applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Key Insights */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-blue-600" />
                        Core Concepts
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {moduleData.keyInsights?.map((insight, index) => (
                          <div 
                            key={index} 
                            className="p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-white">{index + 1}</span>
                              </div>
                              <p className="text-slate-800">{insight}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Practical Applications */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-purple-600" />
                        Practical Applications
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {moduleData.practicalApplications?.map((application, index) => (
                          <div 
                            key={index} 
                            className="p-4 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Zap className="w-4 h-4 text-white" />
                              </div>
                              <p className="text-slate-800">{application}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Prerequisites */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-emerald-600" />
                        Prerequisites
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {moduleData.prerequisites?.map((prerequisite, index) => (
                          <div 
                            key={index} 
                            className="p-3 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                              <p className="text-slate-800 text-sm">{prerequisite}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Practice Tab */}
              <TabsContent value="practice" className="space-y-6">
                <Card className="learning-card animate-fade-in-up">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                      <Brain className="w-6 h-6 mr-3 text-orange-600" />
                      Practice & Assessment
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Test your knowledge and reinforce learning
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Quiz */}
                    <div className="p-6 rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Module Quiz</h3>
                          <p className="text-slate-600 mb-4">Test your understanding of key concepts with this interactive quiz.</p>
                          <div className="flex items-center space-x-3">
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200">5 questions</Badge>
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">Multiple choice</Badge>
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">Instant feedback</Badge>
                          </div>
                          <Button 
                            onClick={() => setShowQuiz(true)}
                            className="mt-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Start Quiz
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Interactive Exercises */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-blue-600" />
                        Coding Exercises
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-md transition-all duration-300">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Code className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-1">Implement a Simple Linear Regression</h4>
                              <p className="text-sm text-slate-600 mb-3">Build a linear regression model from scratch using Python.</p>
                              <Button 
                                variant="outline" 
                                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                              >
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Start Exercise
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-md transition-all duration-300">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Code className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-1">Decision Tree Classifier Challenge</h4>
                              <p className="text-sm text-slate-600 mb-3">Implement and optimize a decision tree for classification.</p>
                              <Button 
                                variant="outline" 
                                className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                              >
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Start Exercise
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Interactive Visualizations */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-emerald-600" />
                        Interactive Visualizations
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 hover:shadow-md transition-all duration-300">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-1">Decision Boundary Explorer</h4>
                              <p className="text-sm text-slate-600 mb-3">Visualize how different algorithms create decision boundaries.</p>
                              <Button 
                                variant="outline" 
                                className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Explore
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-md transition-all duration-300">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <PieChart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-1">Clustering Visualization</h4>
                              <p className="text-sm text-slate-600 mb-3">Interactive demo of K-means and hierarchical clustering.</p>
                              <Button 
                                variant="outline" 
                                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Explore
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Module Progress */}
            <Card className="learning-card animate-fade-in-up stagger-1">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Reading Progress</span>
                    <span className="text-sm font-bold text-blue-600">{readingProgress}%</span>
                  </div>
                  <div className="progress-gradient">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${readingProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsReading(!isReading)}
                    className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                  >
                    {isReading ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Tracking
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Resume Tracking
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setReadingProgress(0)}
                    className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Tutor */}
            <Card className="learning-card animate-fade-in-up stagger-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  AI Learning Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                  <p className="text-sm text-slate-700 mb-3">
                    Need help understanding concepts? Ask the AI tutor for explanations, examples, or clarifications.
                  </p>
                  <Button 
                    onClick={() => setShowAITutor(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat with AI Tutor
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="learning-card animate-fade-in-up stagger-3">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Download Content
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                >
                  <Volume2 className="w-4 h-4 mr-3" />
                  Text-to-Speech
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                  onClick={() => setShowQuiz(true)}
                >
                  <Brain className="w-4 h-4 mr-3" />
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Tutor Modal */}
      {showAITutor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <AITutor
              course={course}
              module={module}
              onClose={() => setShowAITutor(false)}
            />
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          course={course}
          module={module}
          onClose={() => setShowQuiz(false)}
          onComplete={(score) => {
            setShowQuiz(false)
            if (score >= 70) {
              handleSectionComplete('quiz')
            }
          }}
        />
      )}
    </div>
  )
}