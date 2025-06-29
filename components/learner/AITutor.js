"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Lightbulb, HelpCircle, Brain, X, Sparkles, Zap, Target, Code } from "lucide-react"

export default function AITutor({ course, module, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi! I'm your AI tutor for "${module.title}". I'm here to help you understand the concepts better. You can ask me questions, request simplifications, examples, or even take a quick quiz!`,
        timestamp: new Date(),
      },
    ])
  }, [module])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (message, action = null) => {
    if (!message.trim() && !action) return

    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          courseId: course._id,
          moduleId: module.id,
          message,
          action,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const assistantMessage = {
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const quickActions = [
    {
      label: "Simplify",
      icon: <Lightbulb className="h-4 w-4" />,
      action: () => sendMessage("Can you explain this module in simpler terms?", "simplify"),
      color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
    },
    {
      label: "Example",
      icon: <HelpCircle className="h-4 w-4" />,
      action: () => sendMessage("Can you provide a real-world example?", "example"),
      color: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200"
    },
    {
      label: "Quiz Me",
      icon: <Brain className="h-4 w-4" />,
      action: () => sendMessage("Create a quiz question for me", "quiz"),
      color: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
    },
    {
      label: "Code Example",
      icon: <Code className="h-4 w-4" />,
      action: () => sendMessage("Can you show me a code example?", "code"),
      color: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
    }
  ]

  return (
    <Card className="h-[600px] flex flex-col border-0 shadow-none">
      <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              AI Learning Assistant
            </CardTitle>
            <CardDescription className="text-slate-600">Ask questions about "{module.title}"</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="rounded-full hover:bg-white/50 text-slate-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex-shrink-0">
                    {message.role === "user" ? (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-2xl ${
                      message.role === "user" 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                        : "bg-gradient-to-r from-slate-50 to-gray-100 text-slate-800 border border-slate-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2 text-right">{message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-gray-100 p-4 rounded-2xl border border-slate-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                onClick={action.action} 
                disabled={loading}
                className={`border rounded-full px-4 py-2 ${action.color} transition-all duration-300`}
              >
                {action.icon}
                <span className="ml-1">{action.label}</span>
              </Button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about this module..."
              disabled={loading}
              className="border-2 border-slate-200 focus:border-blue-500 rounded-xl transition-all duration-300"
            />
            <Button 
              type="submit" 
              disabled={loading || !input.trim()} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}