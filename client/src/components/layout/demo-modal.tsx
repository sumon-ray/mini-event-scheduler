"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, X, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react"
import { useState } from "react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const totalDuration = 120 // 2 minutes demo

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, you would control the actual video here
  }

  const handleRestart = () => {
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Simulate video progress (in real app, this would come from video element)
  const progressPercentage = (currentTime / totalDuration) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Event Scheduler Demo Video</DialogTitle>
        </DialogHeader>

        {/* Video Container */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Demo Content - This would be replaced with actual video */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Simulated Video Background */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
              {/* Demo Screenshots Slideshow */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 transform scale-90">
                  <div className="space-y-6">
                    {/* Simulated App Interface */}
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
                        <h3 className="text-xl font-bold text-gray-900">Event Scheduler Demo</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-500">Live Demo</span>
                      </div>
                    </div>

                    {/* Demo Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">✨ AI-Powered Categorization</h4>
                        <div className="space-y-2">
                          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <p className="font-medium text-sm">Team Meeting → Work</p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                            <p className="font-medium text-sm">Doctor Visit → Personal</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <p className="font-medium text-sm">Conference → Other</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">📊 Smart Analytics</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold text-blue-600">24</p>
                              <p className="text-xs text-gray-600">This Week</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-purple-600">8</p>
                              <p className="text-xs text-gray-600">Today</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-green-600">98%</p>
                              <p className="text-xs text-gray-600">Accuracy</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                      <div className="flex items-center justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Smart Scheduling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Auto Categories</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Real-time Sync</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button
                  onClick={handlePlay}
                  className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-black hover:text-black shadow-2xl transition-all duration-300 hover:scale-110"
                >
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-1">
                <div
                  className="bg-white rounded-full h-1 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlay}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                  >
                    <Play className={`w-5 h-5 ${isPlaying ? "hidden" : "block"}`} />
                    <div className={`w-5 h-5 ${isPlaying ? "block" : "hidden"}`}>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-5 bg-white rounded-full"></div>
                        <div className="w-1.5 h-5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRestart}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>

                  <span className="text-white text-sm font-medium">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Info */}
        <div className="bg-white p-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Event Scheduler Demo</h3>
              <p className="text-sm text-gray-600">See how AI-powered categorization works in real-time</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={onClose}
              >
                Try It Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DemoModal
