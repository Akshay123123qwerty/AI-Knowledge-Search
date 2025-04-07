import axios from "axios";
import { useState } from "react";

const LoginUser = async (username: string, password: string) => {
  const[error,setError] = useState<string | null>(null);
    try {
    const res = await axios.post('http://127.0.0.1:8000/api/token/', {
      username,
      password,
    });

    const accessToken = res.data.access;
    const refreshToken = res.data.refresh;

    localStorage.setItem('access', accessToken);
    localStorage.setItem('refresh', refreshToken);

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  } catch (err) {
    setError("Invalid username or password.");
  }
};

export default LoginUser;
