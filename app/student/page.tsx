"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import StudentDashboard from "@/components/student-dashboard"

export default function StudentPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <StudentDashboard />
      </div>
    </ProtectedRoute>
  )
}
