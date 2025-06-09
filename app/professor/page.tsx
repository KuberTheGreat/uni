"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import ProfessorDashboard from "@/components/professor-dashboard"

export default function ProfessorPage() {
  return (
    <ProtectedRoute allowedRoles={["professor"]}>
      <div className="min-h-screen bg-white">
        <Navbar />
        <ProfessorDashboard />
      </div>
    </ProtectedRoute>
  )
}
