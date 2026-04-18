"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMe } from "@/lib/api/clientApi";
import { updateUser } from "@/lib/api/clientApi";

export default function EditProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ username });
    router.push("/profile");
  };

  return (
    <div>
      <h1>Edit Profile</h1>

      <Image src={avatar} alt="avatar" width={120} height={120} />

      <p>Email: {email}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <button type="submit">Save</button>
      </form>

      <button onClick={() => router.back()}>Cancel</button>
    </div>
  );
}