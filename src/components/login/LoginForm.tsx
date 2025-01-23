'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './LoginForm.module.css'
import useFetch from '@/hooks/useFetch'
import Cookies from "js-cookie";

type Data = {
  Token: string;
  UserId: string;
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    var url = "https://localhost:7152/api/auth/login";
    event.preventDefault()
    setIsLoading(true)
    event.preventDefault(); // Ngừng reload trang khi submit form

    if (!email || !password) {
      alert('Email và mật khẩu là bắt buộc!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": email, password }), // Lấy email và password từ state
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("token", data.Token, { expires: 1 }); // Lưu token 1 ngày
        localStorage.setItem("userId", data.UserId);
        localStorage.setItem("userName", data.UserName);
        localStorage.setItem("avatar", "/placeholder-avatar.png");
        router.push("/list");
        console.log('Login successful', data);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
    
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>Đăng nhập</h1>
        <p className={styles.description}>
          Nhập thông tin đăng nhập của bạn để truy cập tài khoản
        </p>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email} // Gắn giá trị state vào input
            onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị state khi người dùng nhập
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            required
            value={password} // Gắn giá trị state vào input
            onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị state khi người dùng nhập
          />
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? (
            <span className={styles.spinner}></span>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>
    </div>
  );
}

