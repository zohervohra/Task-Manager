import React , {useState } from 'react';
import { Link  , useNavigate} from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate()
  
    
    const [credentials, setCredentials] = useState({email : "" , password : ""})

    const handleSubmit = async(e) => {
        e.preventDefault()
     const response = await fetch('https://task-manager-production-7563.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email" :  credentials.email ,
                "password" : credentials.password
              })    
        });
        const json = await response.json();
        console.log(json);
        if(json.authToken){
            // save the auth token and redirect
            console.log("Login Success")
            localStorage.setItem('token', json.authToken)
            navigate('/dashboard')

    }
    else{
        console.log("Login Failed")
    }
    }

    const onChange = (e) => {
        setCredentials({...credentials , [e.target.name] : e.target.value})
      
    }

  return (
    <div>
      <section className="dark:bg-base-100 border-gray-800 text-base-content">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow dark:border-gray-700 sm:max-w-md">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-base-content">
                Login 
              </h1>
              <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-base-content">
                    Your email
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="bg-base-200 border border-gray-600 sm:text-sm rounded-lg block w-full p-2.5 dark:text-base-content" 
                    placeholder="name@company.com" 
                    required
                    onChange={onChange}  value={credentials.email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-base-content">
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="••••••••" 
                    className="bg-base-200 border border-gray-600 sm:text-sm rounded-lg block w-full p-2.5 dark:text-base-content" 
                    required
                    onChange={onChange}  value={credentials.password}
                  />
                </div>
                <div className='flex justify-center align-middle'>
                <button 
                  type="submit" 
                  className="btn w-36 md:btn-wide btn-secondary mt-4 px-0">
                  Sign in
                </button>
                </div>
              
                <p className="text-sm font-light text-gray-400">
                  Don’t have an account yet? 
                  <Link to="../signUp" className="font-medium text-primary-500 hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
