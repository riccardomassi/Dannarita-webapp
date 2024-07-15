'use client'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const fetchLogin = () => {
    axiosInstance.post('login/', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.status === 200) {
          router.push('/Prenotazioni');
        } else {
          router.push('/Login');
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
        router.push('/Login');
      });
  };

  const fetchRegister = () => {
    if (password !== confirmPassword) {
      setPasswordError("Le password non corrispondono.");
      return;
    }

    axiosInstance.post('register/', {
      username: username,
      email: email,
      password: password
    })
      .then(response => {
        if (response.status === 201) {
          fetchLogin();
        } else {
          router.push('/Register');
        }
      })
      .catch(error => {
        setUsernameError(error.response.data['error']);
        if (error.response.data['email'][0] === "Enter a valid email address.") {
          setEmailError("Inserisci un indirizzo email valido.");
        }
        console.error('Errore durante la chiamata API:', error);
        router.push('/Register');
      });
  };

  const handleEnterPressed = (event) => {
    if (event.key === 'Enter') {
      fetchRegister();
    }
  }

  return (
    <div className="bg-amber-50 h-screen w-ful flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <div className="text-3xl font-bold text-black flex justify-center mb-5">
              Register
            </div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input id="email" name="email" type="email" value={email} onChange={handleEmailChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 p-3" />
            </div>
            {
              /* messaggio di errore: email already exists */
              emailError && <div className="text-red-500 text-sm">{emailError}</div>
            }
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input id="username" name="username" type="text" value={username} onChange={handleUsernameChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 p-3" />
            </div>
            {
              /* messaggio di errore: username already exists */
              usernameError && <div className="text-red-500 text-sm">{usernameError}</div>
            }
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2 mb-2">
              <input id="password" name="password" type="password" onKeyDown={handleEnterPressed} value={password} onChange={handlePasswordChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 p-3" />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
              Conferma Password
            </label>
            <div className="mt-2 mb-2">
              <input id="confirm-password" name="confirm-password" type="password" onKeyDown={handleEnterPressed} value={confirmPassword} onChange={handleConfirmPasswordChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 p-3" />
            </div>
            {
              /* messaggio di errore: password non corrisponde */
              passwordError && <div className="text-red-500 text-sm">{passwordError}</div>
            }
          </div>

          <div>
            <button type="button" onClick={fetchRegister} className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
              Register
            </button>
          </div>

          <div className="mt-4">
            <Link href="/Login" className="font-semibold text-orange-600 hover:text-orange-500">
              Hai già un account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
