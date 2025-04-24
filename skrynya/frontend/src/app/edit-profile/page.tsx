// app/edit-profile/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileEdit from '@/components/profile_edit';

type ProfileData = {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  registrationDate: string;
};

export default function EditProfilePage() {
  const router = useRouter();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpcnlua2EiLCJpZCI6MTgsImV4cCI6MTc0NTU2NTgxNX0.5rlENVgw9x_U_yLXXKhOJasRFtLNyG4NYURK7mxmJGs";
  const [formData, setFormData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Load existing profile data on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('http://127.0.0.1:8000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });        
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setFormData({
          first_name: data.first_name,
          second_name: data.second_name,
          email: data.email,
          phone: data.phone,
          registrationDate: data.registration_date, // adjust field names
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  // 2. onSave: send PUT/PATCH to update, then go back
  const handleSave = async (newData: any) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/users/me', {
        method: 'POST', // or PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: newData.firstName,
          second_name: newData.secondName,
          email: newData.email,
          phone: newData.phone,
        }),
      });
      if (!res.ok) throw new Error(`Failed to save: ${res.status}`);
      // optionally re‑fetch or update local state
      router.push('/profile'); // navigate back to view mode
    } catch (err: any) {
      alert(`Could not save profile: ${err.message}`);
    }
  };

  // 3. onCancel: just navigate back
  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) return <p>Завантаження…</p>;
  if (error || !formData) return <p>Помилка: {error || 'Немає даних'}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Редагування профілю</h1>
      <ProfileEdit
        formData={formData}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
