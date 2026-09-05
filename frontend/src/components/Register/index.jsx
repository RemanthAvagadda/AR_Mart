import { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate()
  const [name, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [erroMsg, setError] = useState(false)
  const updateUsername = (event) => {
    setUsername(event.target.value)
  }
  const updatePassword = (event) => {
    setPassword(event.target.value)
  }
  const updateEmail = (event) => {
    setEmail(event.target.value)
  }

  const submitForm = async (event) => {
    event.preventDefault()
    if (name != "" && password != "" && email != "") {
      const userDetails = {
        name, password, email
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
      }
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
      const url = `${apiBaseUrl}/users/add-user`
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        console.log("Hellloo")
        setError(false)
        navigate('/login', { replace: true })
      }
      else {
        setError(true)
      }
    }
    else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-5 lg:flex-row lg:justify-around">
      <div className="hidden w-full max-w-[550px] items-center justify-center rounded-[32px] bg-gradient-to-br from-[#0b69ff] via-[#7c3aed] to-[#111827] p-10 text-center lg:flex">
        <div className="rounded-[28px] border border-white/20 bg-white/10 px-14 py-10 backdrop-blur-sm">
          <div className="text-6xl font-black tracking-[0.4em] text-white">AR</div>
          <p className="mt-4 text-lg uppercase tracking-[0.35em] text-blue-100">Fashion</p>
        </div>
      </div>
      <form onSubmit={submitForm} className="w-full max-w-[420px] min-h-[400px] p-5 shadow-md flex flex-col items-center justify-center rounded-md">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-[#0b69ff] text-2xl font-black text-white shadow-md">
          AR
        </div>
        <div className="w-[90%]">
          <label className="text-sm text-[ #475569] font-bold">USERNAME</label>
          <br />
          <input type="text" placeholder="Username" onChange={updateUsername} className="w-full border-solid border min-h-8 pl-2 mb-5" />
        </div>
        <div className="w-[90%]">
          <label className="text-sm text-[ #475569] font-bold">PASSWORD</label>
          <br />
          <input type="password" placeholder="Password" onChange={updatePassword} className="w-full border-solid border min-h-8 pl-2 mb-5" />
        </div>
        <div className="w-[90%]">
          <label className="text-sm text-[ #475569] font-bold">Email</label>
          <br />
          <input type="text" placeholder="Enter your email" value={email} onChange={updateEmail} className="w-full border-solid border min-h-8 pl-2 mb-5" />
        </div>
        <button className="bg-[#0b69ff] text-[#ffffff] text-md p-2 w-[80%] rounded-md" type="submit">Register</button>
        {erroMsg && <p>"user cannot register"</p>}
      </form>
    </div>
  )
}

export default Register
