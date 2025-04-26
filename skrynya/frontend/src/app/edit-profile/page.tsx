'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileEdit from '@/components/profile_edit';

type ProfileEditForm = {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    password: string;
    email: string;
  };
}

type ProfileData = {
  first_name: string;
  last_name: string;
  phone: string;
  username: string;
  password: string;
  email: string;
};



export default function EditProfilePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. load token on mount
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (!stored) {
      setError('No auth token—please log in');
      setLoading(false);
      return;
    }
    setToken(stored);
  }, []);

  // 2. once token is set, fetch profile
  useEffect(() => {
    if (!token) return;    // wait until we have token

    async function loadProfile() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_RENDER_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) {
          const errBody = await res.json().catch(() => null);
          console.error('422 details:', errBody);
          throw new Error(`Save failed ${res.status}: ${JSON.stringify(errBody)}`);
        }        
        const data = await res.json();
        setFormData({
          first_name: data.first_name,
          last_name: data.second_name,         // note second_name field
          phone: data.phone,
          username: data.username,
          password: data.password,
          email: data.email
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [token]);

  // 3. handle save
  const handleSave = async (newData: ProfileEditForm) => {
    if (!token) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_RENDER_URL}/users/me`,
        {
          method: 'POST',   // PATCH is more semantically correct for partial update
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            "first_name": newData.formData.firstName,
            "second_name": newData.formData.lastName,
            "phone": newData.formData.phone,
            "username": newData.formData.username,
            "password": newData.formData.password,
            "email": newData.formData.email
          })
        }
      );
      if (!res.ok) {
        // parse out the JSON error detail
        const errorDetail = await res.json().catch(() => null);
        console.error('⚠️ 422 response detail:', errorDetail);
        throw new Error(`Save failed ${res.status}`);
      }
  
      router.push('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Could not save profile: ${err.message}`);
      } else {
        alert('Could not save profile: An unknown error occurred.');
      }
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) return <p>Завантаження…</p>;
  if (error || !formData) return <p>Помилка: {error || 'Немає даних'}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Редагування профілю</h1>
      <ProfileEdit
        formData={{
          firstName: formData.first_name,
          lastName: formData.last_name,
          phone: formData.phone,
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
