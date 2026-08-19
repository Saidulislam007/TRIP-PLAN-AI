import AdminSidebar from "@/components/admin-panel/AdminSidebar";

export default function AdminPanelLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="min-h-screen lg:ml-64">
        {children}
      </main>
    </div>
  );
}