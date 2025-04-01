import Header from "@/components/header"
import Sidebar from "@/components/sidebar"

export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
        <div>
            <Sidebar />
            <div>
            <Header />
            {children}
            </div>
        </div>
    )
  }