'use client'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const fetchLogin = () => {
    axiosInstance.post('login/', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.status === 200) {
          router.push('/');
        } else {
          router.push('/Login');
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
        router.push('/Login');
      });
  };

  return (
    <div className="bg-amber-50 h-screen w-ful flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <div className="text-3xl font-bold text-black flex justify-center mb-5">
              Login
            </div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input id="username" name="username" type="text" value={username} onChange={handleUsernameChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 p-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2 mb-2">
              <input id="password" name="password" type="password" value={password} onChange={handlePasswordChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 p-3" />
            </div>
            <Link href="/Register" className="font-semibold text-orange-600 hover:text-orange-500">
              Non hai un account?
            </Link>
          </div>

          <div>
            <button type="button" onClick={fetchLogin} className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;