"use client"

import React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  BarChart3,
  UserPlus,
  School,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

// Mock data for admin dashboard
const dashboardStats = {
  totalStudents: 1247,
  totalProfessors: 89,
  activeCourses: 156,
  upcomingTests: 23,
  averageGPA: 3.42,
  attendanceRate: 87.5,
}

const studentsData = [
  {
    id: "st001",
    name: "Alex Johnson",
    email: "alex.j@university.edu",
    department: "Computer Science",
    year: "3rd Year",
    gpa: 3.8,
    status: "Active",
    enrolledCourses: ["CS301", "CS302", "CS303"],
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "st002",
    name: "Sarah Williams",
    email: "sarah.w@university.edu",
    department: "Computer Science",
    year: "2nd Year",
    gpa: 3.9,
    status: "Active",
    enrolledCourses: ["CS201", "CS202", "MATH201"],
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "st003",
    name: "James Miller",
    email: "james.m@university.edu",
    department: "Mathematics",
    year: "4th Year",
    gpa: 3.5,
    status: "Active",
    enrolledCourses: ["MATH401", "MATH402", "STAT301"],
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "st004",
    name: "Emily Davis",
    email: "emily.d@university.edu",
    department: "Physics",
    year: "1st Year",
    gpa: 3.7,
    status: "Active",
    enrolledCourses: ["PHYS101", "MATH101", "CHEM101"],
    profileImage: "/placeholder.svg?height=40&width=40",
  },
]

const professorsData = [
  {
    id: "prof001",
    name: "Dr. Michael Anderson",
    email: "m.anderson@university.edu",
    department: "Computer Science",
    position: "Associate Professor",
    phone: "+1 (555) 123-4567",
    office: "Science Building, Room 305",
    status: "Active",
    courses: ["CS301", "CS302", "CS401"],
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "prof002",
    name: "Dr. Sarah Chen",
    email: "s.chen@university.edu",
    department: "Mathematics",
    position: "Professor",
    phone: "+1 (555) 234-5678",
    office: "Math Building, Room 201",
    status: "Active",
    courses: ["MATH201", "MATH301", "STAT201"],
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "prof003",
    name: "Dr. Robert Wilson",
    email: "r.wilson@university.edu",
    department: "Physics",
    position: "Assistant Professor",
    phone: "+1 (555) 345-6789",
    office: "Physics Building, Room 105",
    status: "Active",
    courses: ["PHYS101", "PHYS201", "PHYS301"],
    profileImage: "/placeholder.svg?height=40&width=40",
  },
]

const coursesData = [
  {
    id: "cs301",
    code: "CS301",
    name: "Data Structures & Algorithms",
    department: "Computer Science",
    credits: 4,
    semester: "Fall 2023",
    professor: "Dr. Michael Anderson",
    enrolledStudents: 35,
    capacity: 40,
    schedule: "Mon, Wed, Fri - 10:00 AM",
    location: "Room 205",
    status: "Active",
    averageGrade: 3.6,
  },
  {
    id: "cs302",
    code: "CS302",
    name: "Database Management Systems",
    department: "Computer Science",
    credits: 3,
    semester: "Fall 2023",
    professor: "Dr. Michael Anderson",
    enrolledStudents: 42,
    capacity: 45,
    schedule: "Tue, Thu - 2:00 PM",
    location: "Room 301",
    status: "Active",
    averageGrade: 3.4,
  },
  {
    id: "math201",
    code: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    credits: 4,
    semester: "Fall 2023",
    professor: "Dr. Sarah Chen",
    enrolledStudents: 28,
    capacity: 35,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    location: "Math Building 101",
    status: "Active",
    averageGrade: 3.2,
  },
  {
    id: "phys101",
    code: "PHYS101",
    name: "General Physics I",
    department: "Physics",
    credits: 4,
    semester: "Fall 2023",
    professor: "Dr. Robert Wilson",
    enrolledStudents: 52,
    capacity: 60,
    schedule: "Tue, Thu - 10:00 AM",
    location: "Physics Lab 1",
    status: "Active",
    averageGrade: 3.3,
  },
]

const assessmentsData = [
  {
    id: "a001",
    title: "Midterm Exam",
    course: "CS301",
    professor: "Dr. Michael Anderson",
    type: "Exam",
    date: "2023-10-15",
    time: "10:00 AM - 12:00 PM",
    location: "Room 205",
    status: "Scheduled",
    studentsEnrolled: 35,
  },
  {
    id: "a002",
    title: "Database Design Project",
    course: "CS302",
    professor: "Dr. Michael Anderson",
    type: "Assignment",
    date: "2023-10-30",
    time: "11:59 PM",
    location: "Online Submission",
    status: "Active",
    studentsEnrolled: 42,
  },
  {
    id: "a003",
    title: "Calculus Quiz 2",
    course: "MATH201",
    professor: "Dr. Sarah Chen",
    type: "Quiz",
    date: "2023-10-20",
    time: "9:00 AM - 9:30 AM",
    location: "Math Building 101",
    status: "Scheduled",
    studentsEnrolled: 28,
  },
  {
    id: "a004",
    title: "Physics Lab Report",
    course: "PHYS101",
    professor: "Dr. Robert Wilson",
    type: "Assignment",
    date: "2023-10-25",
    time: "11:59 PM",
    location: "Online Submission",
    status: "Active",
    studentsEnrolled: 52,
  },
]

const permissionsData = [
  { id: "view_students", name: "View Students", description: "Can view student information" },
  { id: "edit_students", name: "Edit Students", description: "Can modify student records" },
  { id: "delete_students", name: "Delete Students", description: "Can remove students from system" },
  { id: "view_professors", name: "View Professors", description: "Can view professor information" },
  { id: "edit_professors", name: "Edit Professors", description: "Can modify professor records" },
  { id: "delete_professors", name: "Delete Professors", description: "Can remove professors from system" },
  { id: "manage_courses", name: "Manage Courses", description: "Can create, edit, and delete courses" },
  { id: "manage_assessments", name: "Manage Assessments", description: "Can oversee all assessments" },
  { id: "view_analytics", name: "View Analytics", description: "Can access system analytics" },
  { id: "system_admin", name: "System Administration", description: "Full system access" },
]

const rolesData = [
  {
    id: "admin",
    name: "Administrator",
    permissions: [
      "view_students",
      "edit_students",
      "delete_students",
      "view_professors",
      "edit_professors",
      "delete_professors",
      "manage_courses",
      "manage_assessments",
      "view_analytics",
      "system_admin",
    ],
  },
  {
    id: "academic_coordinator",
    name: "Academic Coordinator",
    permissions: [
      "view_students",
      "edit_students",
      "view_professors",
      "manage_courses",
      "manage_assessments",
      "view_analytics",
    ],
  },
  {
    id: "department_head",
    name: "Department Head",
    permissions: ["view_students", "view_professors", "manage_courses", "view_analytics"],
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const [students, setStudents] = useState(studentsData)
  const [professors, setProfessors] = useState(professorsData)
  const [courses, setCourses] = useState(coursesData)
  const [assessments, setAssessments] = useState(assessmentsData)
  const [permissions] = useState(permissionsData)
  const [roles, setRoles] = useState(rolesData)

  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [isAddingCourse, setIsAddingCourse] = useState(false)
  const [userType, setUserType] = useState("student")
  const [date, setDate] = useState<Date>()

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    position: "",
    phone: "",
    office: "",
  })

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    department: "",
    credits: 3,
    semester: "Fall 2023",
    professor: "",
    capacity: 30,
    schedule: "",
    location: "",
  })

  const handleAddUser = () => {
    const newId =
      userType === "student"
        ? `st${String(students.length + 1).padStart(3, "0")}`
        : `prof${String(professors.length + 1).padStart(3, "0")}`

    if (userType === "student") {
      const student = {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        department: newUser.department,
        year: newUser.year,
        gpa: 0.0,
        status: "Active",
        enrolledCourses: [],
        profileImage: "/placeholder.svg?height=40&width=40",
      }
      setStudents([...students, student])
    } else {
      const professor = {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        department: newUser.department,
        position: newUser.position,
        phone: newUser.phone,
        office: newUser.office,
        status: "Active",
        courses: [],
        profileImage: "/placeholder.svg?height=40&width=40",
      }
      setProfessors([...professors, professor])
    }

    setIsAddingUser(false)
    setNewUser({
      name: "",
      email: "",
      department: "",
      year: "",
      position: "",
      phone: "",
      office: "",
    })
  }

  const handleAddCourse = () => {
    const courseId = newCourse.code.toLowerCase().replace(/\s+/g, "")
    const course = {
      id: courseId,
      ...newCourse,
      enrolledStudents: 0,
      status: "Active",
      averageGrade: 0.0,
    }
    setCourses([...courses, course])
    setIsAddingCourse(false)
    setNewCourse({
      code: "",
      name: "",
      department: "",
      credits: 3,
      semester: "Fall 2023",
      professor: "",
      capacity: 30,
      schedule: "",
      location: "",
    })
  }

  const handleDeleteUser = (id: string, type: "student" | "professor") => {
    if (type === "student") {
      setStudents(students.filter((student) => student.id !== id))
    } else {
      setProfessors(professors.filter((professor) => professor.id !== id))
    }
  }

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const handleDeleteAssessment = (id: string) => {
    setAssessments(assessments.filter((assessment) => assessment.id !== id))
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">University Management System</p>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{dashboardStats.totalStudents}</div>
              <p className="text-xs text-gray-600">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Professors</CardTitle>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{dashboardStats.totalProfessors}</div>
              <p className="text-xs text-gray-600">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{dashboardStats.activeCourses}</div>
              <p className="text-xs text-gray-600">
                <CheckCircle className="inline h-3 w-3 mr-1" />
                All courses running
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{dashboardStats.upcomingTests}</div>
              <p className="text-xs text-gray-600">
                <Calendar className="inline h-3 w-3 mr-1" />
                Next 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Academic Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average GPA</span>
                <span className="font-bold text-lg">{dashboardStats.averageGPA}/4.0</span>
              </div>
              <Progress value={(dashboardStats.averageGPA / 4.0) * 100} className="h-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm">Attendance Rate</span>
                <span className="font-bold text-lg">{dashboardStats.attendanceRate}%</span>
              </div>
              <Progress value={dashboardStats.attendanceRate} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-green-600" />
                Department Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Computer Science</span>
                <Badge variant="outline">45%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mathematics</span>
                <Badge variant="outline">25%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Physics</span>
                <Badge variant="outline">20%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Other</span>
                <Badge variant="outline">10%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Management Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="courses">Course Management</TabsTrigger>
            <TabsTrigger value="assessments">Assessment Oversight</TabsTrigger>
            <TabsTrigger value="permissions">Permissions & Roles</TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">User Management</h3>
              <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="userType">User Type</Label>
                      <Select value={userType} onValueChange={setUserType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="professor">Professor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={newUser.department}
                        onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {userType === "student" ? (
                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Select value={newUser.year} onValueChange={(value) => setNewUser({ ...newUser, year: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st Year">1st Year</SelectItem>
                            <SelectItem value="2nd Year">2nd Year</SelectItem>
                            <SelectItem value="3rd Year">3rd Year</SelectItem>
                            <SelectItem value="4th Year">4th Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            value={newUser.position}
                            onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                            placeholder="e.g. Associate Professor"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={newUser.phone}
                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="office">Office</Label>
                          <Input
                            id="office"
                            value={newUser.office}
                            onChange={(e) => setNewUser({ ...newUser, office: e.target.value })}
                            placeholder="Building, Room Number"
                          />
                        </div>
                      </>
                    )}
                    <DialogFooter>
                      <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                        Add {userType === "student" ? "Student" : "Professor"}
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Tabs defaultValue="students" className="w-full">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="professors">Professors</TabsTrigger>
              </TabsList>

              <TabsContent value="students">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>GPA</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.profileImage || "/placeholder.svg"} alt={student.name} />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-sm text-gray-500">{student.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.year}</TableCell>
                          <TableCell>
                            <Badge variant={student.gpa >= 3.5 ? "default" : "secondary"}>
                              {student.gpa.toFixed(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.enrolledCourses.length} courses</TableCell>
                          <TableCell>{student.status}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedUser(student)
                                  setSelectedCourse(null)
                                  setSelectedAssessment(null)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteUser(student.id, "student")}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="professors">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Professor</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {professors.map((professor) => (
                        <TableRow key={professor.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={professor.profileImage || "/placeholder.svg"} alt={professor.name} />
                                <AvatarFallback>
                                  {professor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{professor.name}</p>
                                <p className="text-sm text-gray-500">{professor.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{professor.department}</TableCell>
                          <TableCell>{professor.position}</TableCell>
                          <TableCell>{professor.courses.length} courses</TableCell>
                          <TableCell>{professor.status}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedUser(professor)
                                  setSelectedCourse(null)
                                  setSelectedAssessment(null)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteUser(professor.id, "professor")}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Course Management Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Course Management</h3>
              <Dialog open={isAddingCourse} onOpenChange={setIsAddingCourse}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="code">Course Code</Label>
                      <Input
                        id="code"
                        value={newCourse.code}
                        onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Course Name</Label>
                      <Input
                        id="name"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={newCourse.department}
                        onValueChange={(value) => setNewCourse({ ...newCourse, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="credits">Credits</Label>
                      <Input
                        id="credits"
                        type="number"
                        value={newCourse.credits}
                        onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="semester">Semester</Label>
                      <Input
                        id="semester"
                        value={newCourse.semester}
                        onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="professor">Professor</Label>
                      <Select
                        value={newCourse.professor}
                        onValueChange={(value) => setNewCourse({ ...newCourse, professor: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select professor" />
                        </SelectTrigger>
                        <SelectContent>
                          {professors.map((professor) => (
                            <SelectItem key={professor.id} value={professor.id}>
                              {professor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={newCourse.capacity}
                        onChange={(e) => setNewCourse({ ...newCourse, capacity: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        value={newCourse.schedule}
                        onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newCourse.location}
                        onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddCourse} className="bg-blue-600 hover:bg-blue-700">
                        Add Course
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Enrolled Students</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>{course.semester}</TableCell>
                      <TableCell>{course.enrolledStudents}</TableCell>
                      <TableCell>{course.capacity}</TableCell>
                      <TableCell>{course.schedule}</TableCell>
                      <TableCell>{course.location}</TableCell>
                      <TableCell>{course.status}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedCourse(course)
                              setSelectedAssessment(null)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Assessment Oversight Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Assessment Oversight</h3>
              <Dialog open={isAddingCourse} onOpenChange={setIsAddingCourse}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Assessment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="course">Course</Label>
                      <Select
                        value={newCourse.course}
                        onValueChange={(value) => setNewCourse({ ...newCourse, course: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newCourse.type}
                        onValueChange={(value) => setNewCourse({ ...newCourse, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Exam">Exam</SelectItem>
                          <SelectItem value="Assignment">Assignment</SelectItem>
                          <SelectItem value="Quiz">Quiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newCourse.date}
                        onChange={(e) => setNewCourse({ ...newCourse, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        value={newCourse.time}
                        onChange={(e) => setNewCourse({ ...newCourse, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newCourse.location}
                        onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddCourse} className="bg-blue-600 hover:bg-blue-700">
                        Add Assessment
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell>{assessment.title}</TableCell>
                      <TableCell>{assessment.course}</TableCell>
                      <TableCell>{assessment.type}</TableCell>
                      <TableCell>{assessment.date}</TableCell>
                      <TableCell>{assessment.time}</TableCell>
                      <TableCell>{assessment.location}</TableCell>
                      <TableCell>{assessment.status}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedAssessment(assessment)
                              setSelectedCourse(null)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAssessment(assessment.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Permissions & Roles Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Permissions & Roles</h3>
              <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Permission
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Permission</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newUser.description}
                        onChange={(e) => setNewUser({ ...newUser, description: e.target.value })}
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                        Add Permission
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell>{permission.name}</TableCell>
                      <TableCell>{permission.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedUser(permission)
                              setSelectedCourse(null)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUser(permission.id, "permission")}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
