"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AdminDashboard />
      </div>
    </ProtectedRoute>
  )
}
