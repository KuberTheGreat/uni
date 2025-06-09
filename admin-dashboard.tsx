"use client"
import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Plus,
  Edit,
  Trash2,
  FileText,
  BarChart3,
  Settings,
  Shield,
  UserPlus,
  School,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

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
    <div className="min-h-screen bg-gray-50 p-6">
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
                          <TableCell>
                            <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Student</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-16 w-16">
                                        <AvatarImage
                                          src={student.profileImage || "/placeholder.svg"}
                                          alt={student.name}
                                        />
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
                                    <Separator />
                                    <div>
                                      <Label>Enrolled Courses</Label>
                                      <div className="mt-2 space-y-2">
                                        {courses.map((course) => (
                                          <div key={course.id} className="flex items-center space-x-2">
                                            <Checkbox
                                              id={course.id}
                                              checked={student.enrolledCourses.includes(course.code)}
                                              onCheckedChange={(checked) => {
                                                const updatedStudents = students.map((s) => {
                                                  if (s.id === student.id) {
                                                    const enrolledCourses = checked
                                                      ? [...s.enrolledCourses, course.code]
                                                      : s.enrolledCourses.filter((c) => c !== course.code)
                                                    return { ...s, enrolledCourses }
                                                  }
                                                  return s
                                                })
                                                setStudents(updatedStudents)
                                              }}
                                            />
                                            <Label htmlFor={course.id} className="text-sm">
                                              {course.code} - {course.name}
                                            </Label>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUser(student.id, "student")}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
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
                          <TableCell>
                            <Badge variant={professor.status === "Active" ? "default" : "secondary"}>
                              {professor.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Professor</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-16 w-16">
                                        <AvatarImage
                                          src={professor.profileImage || "/placeholder.svg"}
                                          alt={professor.name}
                                        />
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
                                    <Separator />
                                    <div>
                                      <Label>Assigned Courses</Label>
                                      <div className="mt-2 space-y-2">
                                        {courses.map((course) => (
                                          <div key={course.id} className="flex items-center space-x-2">
                                            <Checkbox
                                              id={course.id}
                                              checked={professor.courses.includes(course.code)}
                                              onCheckedChange={(checked) => {
                                                const updatedProfessors = professors.map((p) => {
                                                  if (p.id === professor.id) {
                                                    const assignedCourses = checked
                                                      ? [...p.courses, course.code]
                                                      : p.courses.filter((c) => c !== course.code)
                                                    return { ...p, courses: assignedCourses }
                                                  }
                                                  return p
                                                })
                                                setProfessors(updatedProfessors)
                                              }}
                                            />
                                            <Label htmlFor={course.id} className="text-sm">
                                              {course.code} - {course.name}
                                            </Label>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUser(professor.id, "professor")}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
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
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="code">Course Code</Label>
                        <Input
                          id="code"
                          value={newCourse.code}
                          onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                          placeholder="e.g. CS301"
                        />
                      </div>
                      <div>
                        <Label htmlFor="credits">Credits</Label>
                        <Input
                          id="credits"
                          type="number"
                          value={newCourse.credits}
                          onChange={(e) => setNewCourse({ ...newCourse, credits: Number.parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input
                        id="courseName"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                        placeholder="e.g. Data Structures & Algorithms"
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
                            <SelectItem key={professor.id} value={professor.name}>
                              {professor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newCourse.capacity}
                          onChange={(e) => setNewCourse({ ...newCourse, capacity: Number.parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="semester">Semester</Label>
                        <Select
                          value={newCourse.semester}
                          onValueChange={(value) => setNewCourse({ ...newCourse, semester: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                            <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                            <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        value={newCourse.schedule}
                        onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                        placeholder="e.g. Mon, Wed, Fri - 10:00 AM"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newCourse.location}
                        onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                        placeholder="e.g. Room 205"
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddCourse} className="bg-green-600 hover:bg-green-700">
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
                    <TableHead>Professor</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Avg Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-gray-500">
                            {course.code} • {course.credits} credits
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{course.professor}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={(course.enrolledStudents / course.capacity) * 100} className="h-2 w-20" />
                          <span className="text-sm">
                            {course.enrolledStudents}/{course.capacity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{course.schedule}</p>
                          <p className="text-xs text-gray-500">{course.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.averageGrade >= 3.5 ? "default" : "secondary"}>
                          {course.averageGrade.toFixed(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.status === "Active" ? "default" : "secondary"}>{course.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Course Analytics - {course.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-2xl font-bold">{course.enrolledStudents}</div>
                                      <p className="text-sm text-gray-600">Enrolled Students</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-2xl font-bold">{course.averageGrade.toFixed(1)}</div>
                                      <p className="text-sm text-gray-600">Average Grade</p>
                                    </CardContent>
                                  </Card>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600 mb-2">Enrollment Rate</p>
                                  <Progress value={(course.enrolledStudents / course.capacity) * 100} className="h-3" />
                                  <p className="text-xs text-gray-500 mt-1">
                                    {Math.round((course.enrolledStudents / course.capacity) * 100)}% capacity
                                  </p>
                                </div>
                                <Separator />
                                <div>
                                  <p className="font-medium mb-2">Course Details</p>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Department:</span>
                                      <span>{course.department}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Semester:</span>
                                      <span>{course.semester}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Credits:</span>
                                      <span>{course.credits}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
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
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Assessment
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{assessment.title}</p>
                          <Badge variant="outline" className="mt-1">
                            {assessment.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{assessment.course}</TableCell>
                      <TableCell>{assessment.professor}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{new Date(assessment.date).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">{assessment.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>{assessment.studentsEnrolled}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assessment.status === "Active"
                              ? "default"
                              : assessment.status === "Scheduled"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {assessment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Assessment Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <p className="font-medium">{assessment.title}</p>
                                  <p className="text-sm text-gray-500">{assessment.course}</p>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Professor</p>
                                    <p className="font-medium">{assessment.professor}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Type</p>
                                    <Badge variant="outline">{assessment.type}</Badge>
                                  </div>
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
                                <div>
                                  <p className="text-sm text-gray-500">Students Enrolled</p>
                                  <p className="font-medium">{assessment.studentsEnrolled}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAssessment(assessment.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
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
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Shield className="h-4 w-4 mr-2" />
                Create Role
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    User Roles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{role.name}</h4>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{role.permissions.length} permissions assigned</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permissionId) => {
                          const permission = permissions.find((p) => p.id === permissionId)
                          return (
                            <Badge key={permissionId} variant="secondary" className="text-xs">
                              {permission?.name}
                            </Badge>
                          )
                        })}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Available Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Checkbox id={permission.id} />
                      <div className="flex-1">
                        <Label htmlFor={permission.id} className="font-medium">
                          {permission.name}
                        </Label>
                        <p className="text-sm text-gray-600">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
