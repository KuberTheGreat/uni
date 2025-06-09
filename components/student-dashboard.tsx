"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Upload,
  Edit,
  Trophy,
  Target,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

// Mock data for student dashboard
const studentData = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  course: "Computer Science",
  profileImage: "/placeholder.svg?height=120&width=120",
  cgpa: 3.8,
  semester: "6th Semester",
}

const enrolledCourses = [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    code: "CS301",
    professor: "Dr. Sarah Wilson",
    duration: "16 weeks",
    credits: 4,
    schedule: "Mon, Wed, Fri - 10:00 AM",
    description: "Advanced concepts in data structures and algorithmic problem solving.",
  },
  {
    id: 2,
    name: "Database Management Systems",
    code: "CS302",
    professor: "Prof. Michael Chen",
    duration: "16 weeks",
    credits: 3,
    schedule: "Tue, Thu - 2:00 PM",
    description: "Comprehensive study of database design, implementation, and management.",
  },
  {
    id: 3,
    name: "Software Engineering",
    code: "CS303",
    professor: "Dr. Emily Rodriguez",
    duration: "16 weeks",
    credits: 4,
    schedule: "Mon, Wed - 3:00 PM",
    description: "Principles and practices of large-scale software development.",
  },
  {
    id: 4,
    name: "Computer Networks",
    code: "CS304",
    professor: "Prof. David Kim",
    duration: "16 weeks",
    credits: 3,
    schedule: "Tue, Thu - 11:00 AM",
    description: "Network protocols, architecture, and distributed systems.",
  },
]

const marksData = [
  {
    id: 1,
    subject: "Data Structures & Algorithms",
    code: "CS301",
    midterm: 85,
    quiz1: 92,
    quiz2: 88,
    assignment: 90,
    attendance: 95,
    cgpa: 3.9,
    grade: "A",
  },
  {
    id: 2,
    subject: "Database Management Systems",
    code: "CS302",
    midterm: 78,
    quiz1: 85,
    quiz2: 82,
    assignment: 88,
    attendance: 92,
    cgpa: 3.6,
    grade: "B+",
  },
  {
    id: 3,
    subject: "Software Engineering",
    code: "CS303",
    midterm: 90,
    quiz1: 94,
    quiz2: 89,
    assignment: 92,
    attendance: 98,
    cgpa: 4.0,
    grade: "A",
  },
  {
    id: 4,
    subject: "Computer Networks",
    code: "CS304",
    midterm: 82,
    quiz1: 87,
    quiz2: 85,
    assignment: 86,
    attendance: 90,
    cgpa: 3.7,
    grade: "A-",
  },
]

const upcomingTests = [
  {
    id: 1,
    title: "Database Final Exam",
    subject: "CS302",
    date: "2024-01-15",
    time: "2:00 PM - 5:00 PM",
    type: "Final Exam",
    location: "Room 301",
    syllabus: "Chapters 8-12, SQL Advanced Queries, Transaction Management",
  },
  {
    id: 2,
    title: "Algorithms Quiz 3",
    subject: "CS301",
    date: "2024-01-12",
    time: "10:00 AM - 11:00 AM",
    type: "Quiz",
    location: "Room 205",
    syllabus: "Dynamic Programming, Graph Algorithms",
  },
  {
    id: 3,
    title: "Software Engineering Midterm",
    subject: "CS303",
    date: "2024-01-18",
    time: "3:00 PM - 5:00 PM",
    type: "Midterm",
    location: "Room 401",
    syllabus: "SDLC, Design Patterns, Testing Methodologies",
  },
]

const dailySchedule = [
  {
    id: 1,
    time: "9:00 AM - 10:00 AM",
    subject: "Free Period",
    type: "break",
    location: "",
    professor: "",
  },
  {
    id: 2,
    time: "10:00 AM - 11:30 AM",
    subject: "Data Structures & Algorithms",
    code: "CS301",
    type: "lecture",
    location: "Room 205",
    professor: "Dr. Sarah Wilson",
  },
  {
    id: 3,
    time: "11:30 AM - 12:00 PM",
    subject: "Break",
    type: "break",
    location: "",
    professor: "",
  },
  {
    id: 4,
    time: "12:00 PM - 1:00 PM",
    subject: "Lunch Break",
    type: "break",
    location: "Cafeteria",
    professor: "",
  },
  {
    id: 5,
    time: "1:00 PM - 2:30 PM",
    subject: "Computer Networks Lab",
    code: "CS304L",
    type: "lab",
    location: "Lab 3",
    professor: "Prof. David Kim",
  },
  {
    id: 6,
    time: "3:00 PM - 4:30 PM",
    subject: "Software Engineering",
    code: "CS303",
    type: "lecture",
    location: "Room 301",
    professor: "Dr. Emily Rodriguez",
  },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const [student, setStudent] = useState({
    ...studentData,
    name: user?.name || studentData.name,
    email: user?.email || studentData.email,
    profileImage: user?.profileImage || studentData.profileImage,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: student.name,
    email: student.email,
    course: student.course,
  })

  const handleSaveProfile = () => {
    setStudent({ ...student, ...editForm })
    setIsEditing(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setStudent({ ...student, profileImage: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {student.name}!</p>
        </div>

        {/* Profile Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={student.profileImage || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback className="text-2xl">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center gap-2">
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                  </Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="course">Course</Label>
                      <Input
                        id="course"
                        value={editForm.course}
                        onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{student.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Course</p>
                          <p className="font-medium">{student.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">CGPA</p>
                          <p className="font-medium">{student.cgpa}/4.0</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enrolled Courses Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Enrolled Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {enrolledCourses.map((course) => (
              <Dialog key={course.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
                      <p className="text-gray-600 mb-2">{course.code}</p>
                      <Badge variant="secondary">{course.credits} Credits</Badge>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{course.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Course Code</p>
                      <p className="font-medium">{course.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Professor</p>
                      <p className="font-medium">{course.professor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Schedule</p>
                      <p className="font-medium">{course.schedule}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Credits</p>
                      <p className="font-medium">{course.credits}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-sm">{course.description}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Marks & CGPA Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="h-6 w-6" />
            Academic Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marksData.map((mark) => (
              <Dialog key={mark.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{mark.subject}</h3>
                      <p className="text-gray-600 text-sm mb-3">{mark.code}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">CGPA:</span>
                          <Badge variant={mark.cgpa >= 3.5 ? "default" : "secondary"}>{mark.cgpa}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Grade:</span>
                          <Badge variant="outline">{mark.grade}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Attendance:</span>
                          <span className="text-sm font-medium">{mark.attendance}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{mark.subject}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Course Code</p>
                        <p className="font-medium">{mark.code}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Grade</p>
                        <Badge variant="outline" className="w-fit">
                          {mark.grade}
                        </Badge>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Assessment Breakdown</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Midterm Exam</span>
                          <span className="font-medium">{mark.midterm}/100</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Quiz 1</span>
                          <span className="font-medium">{mark.quiz1}/100</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Quiz 2</span>
                          <span className="font-medium">{mark.quiz2}/100</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Assignment</span>
                          <span className="font-medium">{mark.assignment}/100</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Attendance</span>
                        <span className="font-medium">{mark.attendance}%</span>
                      </div>
                      <Progress value={mark.attendance} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Course CGPA</span>
                        <Badge variant={mark.cgpa >= 3.5 ? "default" : "secondary"}>{mark.cgpa}/4.0</Badge>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Upcoming Tests & Quizzes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Upcoming Tests & Quizzes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingTests.map((test) => (
              <Dialog key={test.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{test.title}</h3>
                        <Badge variant={test.type === "Final Exam" ? "destructive" : "default"}>{test.type}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{test.subject}</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          {new Date(test.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          {test.time}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      {test.title}
                      <Badge variant={test.type === "Final Exam" ? "destructive" : "default"}>{test.type}</Badge>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Subject</p>
                      <p className="font-medium">{test.subject}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{new Date(test.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{test.time}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{test.location}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Syllabus Coverage</p>
                      <p className="text-sm">{test.syllabus}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Today's Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailySchedule.map((schedule) => (
              <Dialog key={schedule.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`cursor-pointer hover:shadow-lg transition-shadow ${
                      schedule.type === "break" ? "bg-gray-50" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{schedule.subject}</h3>
                        <Badge
                          variant={
                            schedule.type === "lecture" ? "default" : schedule.type === "lab" ? "secondary" : "outline"
                          }
                        >
                          {schedule.type}
                        </Badge>
                      </div>
                      {schedule.code && <p className="text-gray-600 text-sm mb-2">{schedule.code}</p>}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          {schedule.time}
                        </div>
                        {schedule.location && <p className="text-sm text-gray-600">{schedule.location}</p>}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      {schedule.subject}
                      <Badge
                        variant={
                          schedule.type === "lecture" ? "default" : schedule.type === "lab" ? "secondary" : "outline"
                        }
                      >
                        {schedule.type}
                      </Badge>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {schedule.code && (
                      <div>
                        <p className="text-sm text-gray-500">Course Code</p>
                        <p className="font-medium">{schedule.code}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{schedule.time}</p>
                    </div>
                    {schedule.location && (
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{schedule.location}</p>
                      </div>
                    )}
                    {schedule.professor && (
                      <div>
                        <p className="text-sm text-gray-500">Professor</p>
                        <p className="font-medium">{schedule.professor}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium capitalize">{schedule.type}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
