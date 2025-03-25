import Sidebar from "@/components/sidebar";
import App from "./pages/profile/app";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="">
      <Sidebar/>
      <div>
        <Header/>
        <App/>
      </div>
    </div>
  );
}
