import AdminSidebar from "@/components/admin-panel/AdminSidebar";
import AdminHeader from "@/components/admin-panel/AdminHeader";

export default function AdminPanelLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="lg:ml-64">

        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)]">
          {children}
        </main>

      </div>

    </div>
  );
}