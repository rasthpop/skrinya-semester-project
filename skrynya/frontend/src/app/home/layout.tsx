import Sidebar from "@/components/sidebar";
import { AuthProvider } from "../AuthContext";
import Header from "@/components/header";


export default function HomePageLayout({ children }: { children: React.ReactNode }) {
    return (
  <div>
    <Sidebar />
    <div>
      <AuthProvider>
        <Header />
      </AuthProvider>
      <div className="ml-[260px] 2xl:ml-[290px]">
      {children}
      </div>
    </div>
  </div>
    );
  }