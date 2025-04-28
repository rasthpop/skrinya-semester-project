
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
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();
    const [firstName, setFirstName] = useState(formData.firstName);
    const [lastName, setLastName] = useState(formData.lastName);
    const [phone, setPhone] = useState(formData.phone);
    const [username] = useState(formData.username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(formData.email);
    
    
    const validateForm = () => {
        const errors: { [key: string]: string } = {};
      
        if (!firstName.trim()) {
          errors.first_name = "Ім’я обов’язкове";
        } else if (firstName.length < 2 || firstName.length > 30) {
          errors.first_name = "Ім’я повинно містити від 2 до 30 символів";
        }
      
        if (!lastName.trim()) {
          errors.second_name = "Прізвище обов’язкове";
        } else if (lastName.length < 2 || lastName.length > 30) {
          errors.second_name = "Прізвище повинно містити від 2 до 30 символів";
        }
      
        if (!email.trim()) {
          errors.email = "Електронна пошта обов’язкова";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Некоректна електронна пошта";
        } else if (email.length > 50) {
          errors.email = "Електронна пошта повинна містити не більше 50 символів";
        }
      
        if (!/^\+?\d{10,15}$/.test(phone)) {
          errors.phone = "Некоректний номер телефону";
        }
      
        if (password.trim()) {
            if (password.length < 6 || password.length > 32) {
            errors.password = "Пароль має містити від 6 до 32 символів";
            }
        }
            
                setFormErrors(errors);
      
        return Object.keys(errors).length === 1;
      };

    const renderError = (field: string) => (
        <p className={`text-xs md:text-sm mb-1 min-h-[1.25rem] transition-all duration-300 ${formErrors[field] ? "text-red-500" : "text-transparent"}`}>
          {formErrors[field] || "."}
        </p>
      );
  const handleSave = () => {
    if (!validateForm()) {
        return;
      }
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
      {/* Username
      <div className="flex flex-col">
        <label className="text-textgray mb-1 text-sm sm:text-base">Ім’я користувача</label>
        <input
          className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div> */}

      {/* First & Last Name */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-textgray mb-1 text-sm sm:text-base">Ім’я</label>
      {renderError("first_name")}
          <input
            className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-textgray mb-1 text-sm sm:text-base">Прізвище</label>
            {renderError("second_name")}
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
        {renderError("email")}
          <input
            className="border border-[#D9D9D9] rounded-lg p-2 text-sm sm:text-base focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-textgray mb-1 text-sm sm:text-base">Номер Телефону</label>
          {renderError("phone")}
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
        {renderError("password")}
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