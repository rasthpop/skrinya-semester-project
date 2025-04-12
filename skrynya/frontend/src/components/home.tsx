// Home.tsx or your main component (e.g. Index.tsx)
import { useState } from "react";
import ProfileCard from "@/components/profile_card"; // Import ProfileCard
import ProfileEdit from "@/components/profile_edit"; // Import ProfileEdit

const Home = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    registrationDate: "2024-01-01", // or however you're storing this
  });

  const handleEditClick = () => {
    setIsEditing(true); // Switch to editing mode when "Редагувати Профіль" is clicked
  };

  const handleSaveClick = (newData: any) => {
    console.log("New profile data:", newData);
    // Normally, you would send this data to the backend to save it
    setProfileData(newData);
    setIsEditing(false); // Switch back to ProfileCard after saving
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Switch back to ProfileCard without saving
  };

  return (
    <div>
      {isEditing ? (
        <ProfileEdit
          formData={profileData}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
        />
      ) : (
        <ProfileCard
          first_name={profileData.first_name}
          last_name={profileData.last_name}
          email={profileData.email}
          phone={profileData.phone}
          onEdit={handleEditClick} // Pass down the function to trigger edit mode
        />
      )}
    </div>
  );
};

export default Home;
