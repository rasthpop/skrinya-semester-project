import Sidebar from "@/components/sidebar";
import { AuthProvider } from "../AuthContext";
import Header from "@/components/header";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
  <div>
    <Sidebar />
    <div>
      <AuthProvider>
        <Header />
      </AuthProvider>
      {children}
    </div>
  </div>
    );
  }