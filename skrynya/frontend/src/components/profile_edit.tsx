// ProfileEdit.tsx
import React, { useState } from "react";

type ProfileEditProps = {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    registrationDate: string;
  };
  onSave: (newData: any) => void; // Function to save the new profile data
  onCancel: () => void; // Function to cancel the editing and go back to ProfileCard
};

export default function ProfileEdit({
  formData,
  onSave,
  onCancel,
}: ProfileEditProps) {
  const [firstName, setFirstName] = useState(formData.first_name);
  const [lastName, setLastName] = useState(formData.last_name);
  const [email, setEmail] = useState(formData.email);
  const [phone, setPhone] = useState(formData.phone);

  const handleSave = () => {
    const updatedData = { first_name: firstName, last_name: lastName, email, phone };
    onSave(updatedData); // Save the new data and return it to the parent
  };

  return (
    <div>
      <div>
        <label>Ім’я:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Прізвище:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Електронна Пошта:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Номер Телефону:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
  <button onClick={handleSave}>Зберегти</button>
  <button onClick={onCancel}>Скасувати</button>
</div>
    </div>
  );
}
