'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileEdit from '@/components/profile_edit';
import axios from 'axios';

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

//   // 1. load token on mount
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (!stored) {
      setError('No auth token—please log in');
      setLoading(false);
      return;
    }
    setToken(stored);
  }, []);

//   // 2. once token is set, fetch profile
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

//   // 3. handle save
const handleSave = async (newData: ProfileEditForm) => {
    if (!token) return;
    try {
    console.log(`ROUTEROUTEROUTE ${process.env.NEXT_PUBLIC_RENDER_URL}/users/me`);
      await axios.put(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/me`, {
        first_name: newData.formData.firstName,
        second_name: newData.formData.lastName,
        phone: newData.formData.phone,
        username: newData.formData.username,
        password: newData.formData.password,
        email: newData.formData.email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(`Failed to update profile: ${error}`);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

//   if (loading) return <p>Завантаження…</p>;
//   if (error || !formData) return <p>Помилка: {error || 'Немає даних'}</p>;
    if (loading) return <p>Завантаження…</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!formData) return <p>Немає даних профілю</p>;
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
