
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

type ProfileEditProps = {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    password: string;
    email: string;
  };
  onSave: (newData: ProfileEditProps) => void; // Function to save the new profile data
  onCancel: () => void; // Function to cancel the editing and go back to ProfileCard
};

export default function ProfileEdit({
  formData,
  onSave,
  onCancel,
}: ProfileEditProps) {
  const router = useRouter();
  // const [error, setError] = useState('');
  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);
  const [phone, setPhone] = useState(formData.phone);
  const [username, setUserName] = useState(formData.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(formData.email);
  const handleSave = () => {
    onSave({
      formData: {
        firstName,
        lastName,
        phone,
        username,
        password,
        email,
      },
      onSave,
      onCancel,
    });
  };
// const handleCancel = () => {
//   router.push('/profile');
// };


return (
  <div className="flex flex-col gap-6 mx-4">
    {/* Form fields */}
    <div className="flex-1 flex flex-col gap-6">
      {/* Username */}
      <div className="flex flex-col">
        <label className="text-textgray mb-1 text-sm sm:text-base">Ім’я користувача</label>
        <input
          className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      {/* First & Last Name */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-textgray mb-1 text-sm sm:text-base">Ім’я</label>
          <input
            className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-textgray mb-1 text-sm sm:text-base">Прізвище</label>
          <input
            className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-textgray mb-1 text-sm sm:text-base">Електронна Пошта</label>
          <input
            className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-textgray mb-1 text-sm sm:text-base">Номер Телефону</label>
          <input
            className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-textgray mb-1 text-sm sm:text-base">Пароль</label>
        <input
          className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleSave}
          className="flex-1 flex justify-center items-center text-sm sm:text-base bg-[#14111F] text-white rounded-xl py-3 sm:py-4"
        >
          Зберегти
        </button>
        <button
          onClick={() => {
            onCancel();
            router.push("/profile");
          }}
          className="flex-1 flex justify-center items-center text-sm sm:text-base bg-[#D9D9D9] text-black rounded-xl py-3 sm:py-4"
        >
          Скасувати
        </button>
      </div>
    </div>
  </div>
);

}