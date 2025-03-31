import Sidebar from "@/components/sidebar";
import Profile from "./pages/profile/app";
import Header from "@/components/header";
import Registration from "./pages/registration/app";

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
