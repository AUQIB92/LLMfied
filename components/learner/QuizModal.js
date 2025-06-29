"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2, Brain, Target, Award, Sparkles, Lightbulb, ChevronRight, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function QuizModal({ course, module, onClose, onComplete }) {
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    generateQuiz()
  }, [])

  const generateQuiz = async () => {
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          courseId: course._id,
          moduleId: module.id,
          difficulty: "medium",
        }),
      })

      const data = await response.json()

      if (response.ok && data.questions) {
        setQuiz(data)
      } else {
        throw new Error("Failed to generate quiz")
      }
    } catch (error) {
      console.error("Quiz generation error:", error)
      // Fallback quiz
      setQuiz({
        questions: [
          {
            question: "What is the main purpose of machine learning?",
            options: [
              "To create programs that can access the internet",
              "To enable computers to learn from data without explicit programming",
              "To replace human programmers entirely",
              "To make computers run faster"
            ],
            correct: 1,
            explanation: "Machine learning enables computers to learn patterns from data and make predictions without being explicitly programmed for each task.",
          },
          {
            question: "Which of the following is NOT a type of machine learning?",
            options: [
              "Supervised learning",
              "Unsupervised learning",
              "Reinforcement learning",
              "Deterministic learning"
            ],
            correct: 3,
            explanation: "The three main types of machine learning are supervised learning, unsupervised learning, and reinforcement learning. 'Deterministic learning' is not a standard type of machine learning.",
          },
          {
            question: "In supervised learning, what is required?",
            options: [
              "A human supervisor to monitor the learning process",
              "Labeled training data",
              "Reinforcement signals",
              "Clustering algorithms"
            ],
            correct: 1,
            explanation: "Supervised learning requires labeled training data, where each example has an input and the correct output (label).",
          },
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateResults = () => {
    let correctAnswers = 0
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100)
    setScore(finalScore)
    setShowResults(true)
  }

  const handleComplete = () => {
    onComplete(score)
  }

  if (loading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl bg-white rounded-2xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
              <Brain className="w-6 h-6 mr-3 text-purple-600 animate-pulse" />
              Generating Quiz
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Please wait while we create a personalized quiz for you...
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 relative mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-opacity-50"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-slate-600 animate-pulse">Creating challenging questions based on your learning...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl bg-white rounded-2xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
              <XCircle className="w-6 h-6 mr-3 text-red-600" />
              Quiz Unavailable
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Sorry, we couldn't generate a quiz for this module. Please try again later.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (showResults) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl bg-white rounded-2xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
              <Award className="w-6 h-6 mr-3 text-yellow-600" />
              Quiz Results
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Here's how you performed on the {module.title} quiz
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8">
            <div className="text-center py-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-8 border-slate-100"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="46" 
                    fill="none" 
                    stroke="#e2e8f0" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" cy="50" r="46" 
                    fill="none" 
                    stroke={score >= 70 ? "#10b981" : "#ef4444"} 
                    strokeWidth="8"
                    strokeDasharray="289.27"
                    strokeDashoffset={289.27 - (289.27 * score / 100)}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-800">{score}%</div>
                    <div className="text-sm text-slate-500">Score</div>
                  </div>
                </div>
              </div>
              
              <Badge 
                className={`text-lg px-4 py-2 ${
                  score >= 70 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' 
                    : 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                }`}
              >
                {score >= 70 ? 'Passed' : 'Needs Improvement'}
              </Badge>
              
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {score >= 70 ? (
                  <>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
                      <Target className="w-3 h-3 mr-1" />
                      Objectives Mastered
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1">
                      <Brain className="w-3 h-3 mr-1" />
                      Concepts Understood
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1">
                      <Award className="w-3 h-3 mr-1" />
                      Module Completed
                    </Badge>
                  </>
                ) : (
                  <>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1">
                      <Lightbulb className="w-3 h-3 mr-1" />
                      Review Recommended
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
                      <Target className="w-3 h-3 mr-1" />
                      Practice Needed
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                Question Review
              </h3>
              
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[index]
                const isCorrect = userAnswer === question.correct

                return (
                  <Card key={index} className={`border-l-4 ${isCorrect ? "border-l-emerald-500" : "border-l-red-500"} hover:shadow-md transition-all duration-300`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="h-5 w-5 text-red-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-base text-slate-800">{question.question}</CardTitle>
                          <div className="mt-3 space-y-2">
                            <p className="text-sm font-medium text-slate-700">
                              Your answer: <span className={isCorrect ? "text-emerald-600" : "text-red-600"}>{question.options[userAnswer]}</span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm font-medium text-emerald-600">
                                Correct answer: {question.options[question.correct]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    {question.explanation && (
                      <CardContent className="pt-0 pb-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                            <p className="text-sm text-slate-700">{question.explanation}</p>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>

            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
              >
                Close
              </Button>
              <Button 
                onClick={handleComplete}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white rounded-2xl border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
            <Brain className="w-6 h-6 mr-3 text-purple-600" />
            Quiz: {module.title}
          </DialogTitle>
          <DialogDescription className="text-slate-600 flex items-center justify-between">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              Medium Difficulty
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-slate-50">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">{currentQuestion + 1}</span>
                </div>
                <CardTitle className="text-xl text-slate-800">{currentQ.question}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswerSelect(currentQuestion, Number.parseInt(value))}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                      answers[currentQuestion] === index 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-slate-200 hover:border-blue-200 hover:bg-blue-50/50'
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-blue-600" />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer py-1 text-slate-800"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentQuestion === 0}
              className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
            >
              Previous
            </Button>

            <Button 
              onClick={handleNext} 
              disabled={answers[currentQuestion] === undefined}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {currentQuestion === quiz.questions.length - 1 ? (
                <>
                  Finish Quiz
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Next Question
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}