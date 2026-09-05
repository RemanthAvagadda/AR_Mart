
import { Link, Navigate } from 'react-router-dom'
import Header from '../Header'
import Cookies from 'js-cookie'
const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />
  }
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center gap-8 p-4 py-8 md:flex-row md:gap-10 md:p-8 lg:p-12">
        <div className="w-full md:w-1/2 lg:max-w-[580px]">
          <h1 className="text-3xl font-bold text-[#1e293b] sm:text-4xl lg:text-[35px]">Clothes That Get YOU <br className="hidden sm:block" /> Noticed</h1>
          <p className="mt-4 text-base text-[#64748b] sm:text-lg">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So,celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <button className="mt-5 bg-[#0b69ff] text-[#ffffff] p-4 rounded-md">Shop Now</button>
          </Link>
        </div>
        <div className="flex w-full max-w-[420px] items-center justify-center rounded-3xl bg-gradient-to-br from-[#0b69ff] via-[#7c3aed] to-[#1e293b] p-8 text-center shadow-xl md:w-1/2">
          <div className="flex h-52 w-full max-w-[280px] flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <span className="text-5xl font-black tracking-widest text-white">AR</span>
            <span className="mt-3 text-sm uppercase tracking-[0.35em] text-blue-100">Style</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home