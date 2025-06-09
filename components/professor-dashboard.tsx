"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  User,
  Mail,
  BookOpen,
  Calendar,
  Clock,
  Upload,
  Edit,
  Trash2,
  Plus,
  FileText,
  Users,
  GraduationCap,
  Phone,
  Building,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useAuth } from "@/contexts/auth-context"

// Mock data for professor dashboard
const professorData = {
  id: "prof123",
  name: "Dr. Michael Anderson",
  email: "m.anderson@university.edu",
  department: "Computer Science",
  position: "Associate Professor",
  phone: "+1 (555) 123-4567",
  office: "Science Building, Room 305",
  profileImage: "/placeholder.svg?height=120&width=120",
  bio: "Ph.D. in Computer Science with 15 years of teaching experience. Research interests include machine learning, data mining, and artificial intelligence.",
}

const coursesData = [
  {
    id: "cs301",
    code: "CS301",
    name: "Data Structures & Algorithms",
    semester: "Fall 2023",
    credits: 4,
    schedule: "Mon, Wed, Fri - 10:00 AM",
    location: "Room 205",
    enrolledStudents: 35,
    description: "Advanced concepts in data structures and algorithmic problem solving.",
  },
  {
    id: "cs302",
    code: "CS302",
    name: "Database Management Systems",
    semester: "Fall 2023",
    credits: 3,
    schedule: "Tue, Thu - 2:00 PM",
    location: "Room 301",
    enrolledStudents: 42,
    description: "Comprehensive study of database design, implementation, and management.",
  },
  {
    id: "cs401",
    code: "CS401",
    name: "Machine Learning",
    semester: "Fall 2023",
    credits: 4,
    schedule: "Mon, Wed - 1:00 PM",
    location: "Room 405",
    enrolledStudents: 28,
    description: "Introduction to machine learning algorithms and applications.",
  },
]

const studentsData = [
  {
    id: "st101",
    name: "Alex Johnson",
    email: "alex.j@university.edu",
    course: "CS301",
    attendance: 92,
    midterm: 85,
    quiz1: 78,
    quiz2: 88,
    assignment: 90,
    grade: "A-",
  },
  {
    id: "st102",
    name: "Sarah Williams",
    email: "sarah.w@university.edu",
    course: "CS301",
    attendance: 88,
    midterm: 92,
    quiz1: 85,
    quiz2: 90,
    assignment: 95,
    grade: "A",
  },
  {
    id: "st103",
    name: "James Miller",
    email: "james.m@university.edu",
    course: "CS301",
    attendance: 78,
    midterm: 72,
    quiz1: 68,
    quiz2: 75,
    assignment: 80,
    grade: "B-",
  },
  {
    id: "st104",
    name: "Emily Davis",
    email: "emily.d@university.edu",
    course: "CS302",
    attendance: 95,
    midterm: 88,
    quiz1: 92,
    quiz2: 85,
    assignment: 90,
    grade: "A",
  },
  {
    id: "st105",
    name: "Michael Brown",
    email: "michael.b@university.edu",
    course: "CS302",
    attendance: 85,
    midterm: 78,
    quiz1: 82,
    quiz2: 80,
    assignment: 85,
    grade: "B+",
  },
  {
    id: "st106",
    name: "Jessica Wilson",
    email: "jessica.w@university.edu",
    course: "CS401",
    attendance: 98,
    midterm: 95,
    quiz1: 92,
    quiz2: 94,
    assignment: 98,
    grade: "A+",
  },
]

const assessmentsData = [
  {
    id: "a101",
    title: "Midterm Exam",
    course: "CS301",
    type: "Exam",
    date: "2023-10-15",
    time: "10:00 AM - 12:00 PM",
    location: "Room 205",
    totalMarks: 100,
    weight: 30,
    description: "Covers topics from weeks 1-6. Focus on array algorithms and tree structures.",
  },
  {
    id: "a102",
    title: "Quiz 1",
    course: "CS301",
    type: "Quiz",
    date: "2023-09-20",
    time: "10:00 AM - 10:30 AM",
    location: "Room 205",
    totalMarks: 20,
    weight: 10,
    description: "Short quiz on basic data structures.",
  },
  {
    id: "a103",
    title: "Database Design Project",
    course: "CS302",
    type: "Assignment",
    date: "2023-10-30",
    time: "11:59 PM",
    location: "Online Submission",
    totalMarks: 100,
    weight: 25,
    description: "Design and implement a relational database for a given case study.",
  },
  {
    id: "a104",
    title: "Final Exam",
    course: "CS401",
    type: "Exam",
    date: "2023-12-10",
    time: "1:00 PM - 4:00 PM",
    location: "Room 405",
    totalMarks: 100,
    weight: 40,
    description: "Comprehensive exam covering all course material with emphasis on practical applications.",
  },
]

const scheduleData = [
  {
    id: "sch101",
    course: "CS301",
    title: "Data Structures & Algorithms",
    day: "Monday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Room 205",
    type: "Lecture",
    notes: "Cover binary search trees and AVL trees",
  },
  {
    id: "sch102",
    course: "CS301",
    title: "Data Structures & Algorithms",
    day: "Wednesday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Room 205",
    type: "Lecture",
    notes: "Red-black trees and B-trees",
  },
  {
    id: "sch103",
    course: "CS301",
    title: "Data Structures & Algorithms",
    day: "Friday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Room 205",
    type: "Lecture",
    notes: "Graph algorithms",
  },
  {
    id: "sch104",
    course: "CS302",
    title: "Database Management Systems",
    day: "Tuesday",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    location: "Room 301",
    type: "Lecture",
    notes: "SQL advanced queries",
  },
  {
    id: "sch105",
    course: "CS302",
    title: "Database Management Systems",
    day: "Thursday",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    location: "Room 301",
    type: "Lecture",
    notes: "Transaction management and concurrency control",
  },
  {
    id: "sch106",
    course: "CS401",
    title: "Machine Learning",
    day: "Monday",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    location: "Room 405",
    type: "Lecture",
    notes: "Neural networks and deep learning",
  },
  {
    id: "sch107",
    course: "CS401",
    title: "Machine Learning",
    day: "Wednesday",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    location: "Room 405",
    type: "Lecture",
    notes: "Reinforcement learning",
  },
  {
    id: "sch108",
    course: "Office Hours",
    title: "Office Hours",
    day: "Tuesday",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    location: "Room 305",
    type: "Office Hours",
    notes: "Available for student consultations",
  },
  {
    id: "sch109",
    course: "Office Hours",
    title: "Office Hours",
    day: "Thursday",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    location: "Room 305",
    type: "Office Hours",
    notes: "Available for student consultations",
  },
]

export default function ProfessorDashboard() {
  const { user } = useAuth()
  const [professor, setProfessor] = useState({
    ...professorData,
    name: user?.name || professorData.name,
    email: user?.email || professorData.email,
    profileImage: user?.profileImage || professorData.profileImage,
  })
  const [courses, setCourses] = useState(coursesData)
  const [students, setStudents] = useState(studentsData)
  const [assessments, setAssessments] = useState(assessmentsData)
  const [schedule, setSchedule] = useState(scheduleData)
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || "")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: professor.name,
    email: professor.email,
    department: professor.department,
    position: professor.position,
    phone: professor.phone,
    office: professor.office,
    bio: professor.bio,
  })
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    course: "",
    type: "Quiz",
    date: "",
    time: "",
    location: "",
    totalMarks: 100,
    weight: 10,
    description: "",
  })
  const [isAddingAssessment, setIsAddingAssessment] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [editingSchedule, setEditingSchedule] = useState(null)
  const [date, setDate] = useState<Date>()

  const handleSaveProfile = () => {
    setProfessor({ ...professor, ...editForm })
    setIsEditing(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfessor({ ...professor, profileImage: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddAssessment = () => {
    const newId = `a${assessments.length + 101}`
    setAssessments([...assessments, { ...newAssessment, id: newId }])
    setIsAddingAssessment(false)
    setNewAssessment({
      title: "",
      course: "",
      type: "Quiz",
      date: "",
      time: "",
      location: "",
      totalMarks: 100,
      weight: 10,
      description: "",
    })
  }

  const handleDeleteAssessment = (id: string) => {
    setAssessments(assessments.filter((assessment) => assessment.id !== id))
  }

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)))
    setEditingStudent(null)
  }

  const handleUpdateSchedule = (updatedSchedule) => {
    setSchedule(schedule.map((item) => (item.id === updatedSchedule.id ? updatedSchedule : item)))
    setEditingSchedule(null)
  }

  const filteredStudents = selectedCourse
    ? students.filter((student) => student.course === courses.find((c) => c.id === selectedCourse)?.code)
    : students

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Professor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {professor.name}!</p>
        </div>

        {/* Profile Section */}
        <Card className="w-full border-blue-100">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <User className="h-5 w-5" />
              Professor Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32 border-2 border-blue-200">
                  <AvatarImage src={professor.profileImage || "/placeholder.svg"} alt={professor.name} />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-800">
                    {professor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center gap-2">
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={editForm.department}
                          onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          value={editForm.position}
                          onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="office">Office</Label>
                        <Input
                          id="office"
                          value={editForm.office}
                          onChange={(e) => setEditForm({ ...editForm, office: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{professor.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{professor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Department</p>
                          <p className="font-medium">{professor.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Position</p>
                          <p className="font-medium">{professor.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{professor.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Office</p>
                          <p className="font-medium">{professor.office}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Biography</p>
                      <p className="text-sm">{professor.bio}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses & Students Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-900">
            <BookOpen className="h-6 w-6 text-blue-700" />
            Courses & Students
          </h2>
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="bg-blue-50 border border-blue-100">
              <TabsTrigger value="courses" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Courses
              </TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Students
              </TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <Dialog key={course.id}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg text-blue-900">{course.name}</h3>
                            <Badge className="bg-blue-600">{course.code}</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span>{course.semester}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span>{course.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span>{course.enrolledStudents} Students</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-blue-900">{course.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Course Code</p>
                          <p className="font-medium">{course.code}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Semester</p>
                          <p className="font-medium">{course.semester}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Schedule</p>
                          <p className="font-medium">{course.schedule}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{course.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Credits</p>
                          <p className="font-medium">{course.credits}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Enrolled Students</p>
                          <p className="font-medium">{course.enrolledStudents}</p>
                        </div>
                        <Separator className="bg-blue-100" />
                        <div>
                          <p className="text-sm text-gray-500">Description</p>
                          <p className="text-sm">{course.description}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="students" className="mt-4">
              <div className="mb-4">
                <Label htmlFor="course-filter">Filter by Course</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-full md:w-[300px] border-blue-200">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-md border border-blue-100">
                <Table>
                  <TableHeader className="bg-blue-50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={student.attendance} className="h-2 w-20" />
                            <span className="text-sm">{student.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={student.grade.startsWith("A") ? "default" : "secondary"}
                            className={student.grade.startsWith("A") ? "bg-blue-600" : ""}
                          >
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog
                            open={editingStudent?.id === student.id}
                            onOpenChange={(open) => !open && setEditingStudent(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingStudent(student)}
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="text-blue-900">Edit Student Performance</DialogTitle>
                              </DialogHeader>
                              {editingStudent && (
                                <div className="space-y-4">
                                  <div>
                                    <p className="font-medium">{editingStudent.name}</p>
                                    <p className="text-sm text-gray-500">{editingStudent.email}</p>
                                  </div>
                                  <Separator className="bg-blue-100" />
                                  <div className="space-y-3">
                                    <div>
                                      <Label htmlFor="attendance">Attendance (%)</Label>
                                      <Input
                                        id="attendance"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={editingStudent.attendance}
                                        onChange={(e) =>
                                          setEditingStudent({
                                            ...editingStudent,
                                            attendance: Number.parseInt(e.target.value),
                                          })
                                        }
                                        className="border-blue-200"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="midterm">Midterm</Label>
                                      <Input
                                        id="midterm"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={editingStudent.midterm}
                                        onChange={(e) =>
                                          setEditingStudent({
                                            ...editingStudent,
                                            midterm: Number.parseInt(e.target.value),
                                          })
                                        }
                                        className="border-blue-200"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="quiz1">Quiz 1</Label>
                                      <Input
                                        id="quiz1"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={editingStudent.quiz1}
                                        onChange={(e) =>
                                          setEditingStudent({
                                            ...editingStudent,
                                            quiz1: Number.parseInt(e.target.value),
                                          })
                                        }
                                        className="border-blue-200"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="quiz2">Quiz 2</Label>
                                      <Input
                                        id="quiz2"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={editingStudent.quiz2}
                                        onChange={(e) =>
                                          setEditingStudent({
                                            ...editingStudent,
                                            quiz2: Number.parseInt(e.target.value),
                                          })
                                        }
                                        className="border-blue-200"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="assignment">Assignment</Label>
                                      <Input
                                        id="assignment"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={editingStudent.assignment}
                                        onChange={(e) =>
                                          setEditingStudent({
                                            ...editingStudent,
                                            assignment: Number.parseInt(e.target.value),
                                          })
                                        }
                                        className="border-blue-200"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="grade">Grade</Label>
                                      <Select
                                        value={editingStudent.grade}
                                        onValueChange={(value) =>
                                          setEditingStudent({
                                            ...editingStudent,
                                            grade: value,
                                          })
                                        }
                                      >
                                        <SelectTrigger id="grade" className="border-blue-200">
                                          <SelectValue placeholder="Select grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="A+">A+</SelectItem>
                                          <SelectItem value="A">A</SelectItem>
                                          <SelectItem value="A-">A-</SelectItem>
                                          <SelectItem value="B+">B+</SelectItem>
                                          <SelectItem value="B">B</SelectItem>
                                          <SelectItem value="B-">B-</SelectItem>
                                          <SelectItem value="C+">C+</SelectItem>
                                          <SelectItem value="C">C</SelectItem>
                                          <SelectItem value="C-">C-</SelectItem>
                                          <SelectItem value="D">D</SelectItem>
                                          <SelectItem value="F">F</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      onClick={() => handleUpdateStudent(editingStudent)}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Assessment Management */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-900">
              <FileText className="h-6 w-6 text-blue-700" />
              Assessment Management
            </h2>
            <Dialog open={isAddingAssessment} onOpenChange={setIsAddingAssessment}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Assessment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-blue-900">Add New Assessment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAssessment.title}
                      onChange={(e) => setNewAssessment({ ...newAssessment, title: e.target.value })}
                      className="border-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="course">Course</Label>
                    <Select
                      value={newAssessment.course}
                      onValueChange={(value) => setNewAssessment({ ...newAssessment, course: value })}
                    >
                      <SelectTrigger id="course" className="border-blue-200">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.code}>
                            {course.code} - {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newAssessment.type}
                      onValueChange={(value) => setNewAssessment({ ...newAssessment, type: value })}
                    >
                      <SelectTrigger id="type" className="border-blue-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Quiz">Quiz</SelectItem>
                        <SelectItem value="Exam">Exam</SelectItem>
                        <SelectItem value="Assignment">Assignment</SelectItem>
                        <SelectItem value="Project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal border-blue-200 ${
                              !date && "text-muted-foreground"
                            }`}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              setDate(selectedDate)
                              setNewAssessment({
                                ...newAssessment,
                                date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
                              })
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        value={newAssessment.time}
                        onChange={(e) => setNewAssessment({ ...newAssessment, time: e.target.value })}
                        placeholder="e.g. 10:00 AM - 12:00 PM"
                        className="border-blue-200"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newAssessment.location}
                      onChange={(e) => setNewAssessment({ ...newAssessment, location: e.target.value })}
                      className="border-blue-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalMarks">Total Marks</Label>
                      <Input
                        id="totalMarks"
                        type="number"
                        value={newAssessment.totalMarks}
                        onChange={(e) =>
                          setNewAssessment({ ...newAssessment, totalMarks: Number.parseInt(e.target.value) })
                        }
                        className="border-blue-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (%)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={newAssessment.weight}
                        onChange={(e) =>
                          setNewAssessment({ ...newAssessment, weight: Number.parseInt(e.target.value) })
                        }
                        className="border-blue-200"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newAssessment.description}
                      onChange={(e) => setNewAssessment({ ...newAssessment, description: e.target.value })}
                      rows={3}
                      className="border-blue-200"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddAssessment} className="bg-blue-600 hover:bg-blue-700">
                      Add Assessment
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-blue-900">{assessment.title}</h3>
                    <Badge
                      variant={
                        assessment.type === "Exam"
                          ? "destructive"
                          : assessment.type === "Quiz"
                            ? "default"
                            : "secondary"
                      }
                      className={assessment.type === "Quiz" ? "bg-blue-600" : ""}
                    >
                      {assessment.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{assessment.course}</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      {new Date(assessment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-600" />
                      {assessment.time}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-blue-900">{assessment.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <Badge
                              variant={
                                assessment.type === "Exam"
                                  ? "destructive"
                                  : assessment.type === "Quiz"
                                    ? "default"
                                    : "secondary"
                              }
                              className={assessment.type === "Quiz" ? "bg-blue-600" : ""}
                            >
                              {assessment.type}
                            </Badge>
                            <Badge variant="outline" className="border-blue-200">
                              {assessment.course}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium">{new Date(assessment.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Time</p>
                              <p className="font-medium">{assessment.time}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{assessment.location}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Total Marks</p>
                              <p className="font-medium">{assessment.totalMarks}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Weight</p>
                              <p className="font-medium">{assessment.weight}%</p>
                            </div>
                          </div>
                          <Separator className="bg-blue-100" />
                          <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="text-sm">{assessment.description}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAssessment(assessment.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-900">
            <Clock className="h-6 w-6 text-blue-700" />
            Teaching Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.map((item) => (
              <Dialog
                key={item.id}
                open={editingSchedule?.id === item.id}
                onOpenChange={(open) => !open && setEditingSchedule(null)}
              >
                <DialogTrigger asChild>
                  <Card
                    className={`cursor-pointer hover:shadow-lg transition-shadow border-blue-100 ${
                      item.type === "Office Hours" ? "bg-blue-50" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-blue-900">{item.title}</h3>
                        <Badge
                          variant={item.type === "Lecture" ? "default" : "outline"}
                          className={item.type === "Lecture" ? "bg-blue-600" : "border-blue-300 text-blue-700"}
                        >
                          {item.type}
                        </Badge>
                      </div>
                      {item.course !== "Office Hours" && <p className="text-gray-600 text-sm mb-2">{item.course}</p>}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          {item.day}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-blue-600" />
                          {item.startTime} - {item.endTime}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-blue-600" />
                          {item.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-blue-900">
                      {editingSchedule ? "Edit Schedule" : "Schedule Details"}
                    </DialogTitle>
                  </DialogHeader>
                  {editingSchedule ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={editingSchedule.title}
                          onChange={(e) => setEditingSchedule({ ...editingSchedule, title: e.target.value })}
                          className="border-blue-200"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="day">Day</Label>
                          <Select
                            value={editingSchedule.day}
                            onValueChange={(value) => setEditingSchedule({ ...editingSchedule, day: value })}
                          >
                            <SelectTrigger id="day" className="border-blue-200">
                              <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Monday">Monday</SelectItem>
                              <SelectItem value="Tuesday">Tuesday</SelectItem>
                              <SelectItem value="Wednesday">Wednesday</SelectItem>
                              <SelectItem value="Thursday">Thursday</SelectItem>
                              <SelectItem value="Friday">Friday</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={editingSchedule.type}
                            onValueChange={(value) => setEditingSchedule({ ...editingSchedule, type: value })}
                          >
                            <SelectTrigger id="type" className="border-blue-200">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Lecture">Lecture</SelectItem>
                              <SelectItem value="Lab">Lab</SelectItem>
                              <SelectItem value="Office Hours">Office Hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            value={editingSchedule.startTime}
                            onChange={(e) => setEditingSchedule({ ...editingSchedule, startTime: e.target.value })}
                            className="border-blue-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="endTime">End Time</Label>
                          <Input
                            id="endTime"
                            value={editingSchedule.endTime}
                            onChange={(e) => setEditingSchedule({ ...editingSchedule, endTime: e.target.value })}
                            className="border-blue-200"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editingSchedule.location}
                          onChange={(e) => setEditingSchedule({ ...editingSchedule, location: e.target.value })}
                          className="border-blue-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={editingSchedule.notes}
                          onChange={(e) => setEditingSchedule({ ...editingSchedule, notes: e.target.value })}
                          rows={3}
                          className="border-blue-200"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => handleUpdateSchedule(editingSchedule)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Badge
                          variant={item.type === "Lecture" ? "default" : "outline"}
                          className={item.type === "Lecture" ? "bg-blue-600" : "border-blue-300 text-blue-700"}
                        >
                          {item.type}
                        </Badge>
                        {item.course !== "Office Hours" && (
                          <Badge variant="outline" className="border-blue-200">
                            {item.course}
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Day</p>
                          <p className="font-medium">{item.day}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">
                            {item.startTime} - {item.endTime}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{item.location}</p>
                      </div>
                      <Separator className="bg-blue-100" />
                      <div>
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-sm">{item.notes}</p>
                      </div>
                      <Button onClick={() => setEditingSchedule(item)} className="w-full bg-blue-600 hover:bg-blue-700">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Schedule
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
