import Sidebar from "@/components/sidebar";
import Profile from "./pages/profile/page";
import Header from "@/components/header";
import Registration from "./pages/registration/page";

export default function Home() {
  return (
    // <div>
    //   <Sidebar/>
    //   <div>
    //     <Header/>
    //     {/* <Profile/> */}
    //   </div>
    // </div>
  <div className="flex justify-center">
  <Registration/>
  </div>
  );
}
