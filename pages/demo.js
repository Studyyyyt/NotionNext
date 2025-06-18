// pages/index.js
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null)
  const cases = [
    { before: '/cases/before1.jpg', after: '/cases/after1.jpg', desc: '牙齿美白案例' },
    { before: '/cases/before2.jpg', after: '/cases/after2.jpg', desc: '种植牙案例' }
  ]
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 顶部导航 */}
      <header className="flex justify-between items-center px-8 py-4 shadow">
        <div className="text-2xl font-bold text-blue-600">牙医作品集</div>
        <nav className="space-x-6 text-gray-700">
          <a href="#services" className="hover:text-blue-500">服务项目</a>
          <a href="#cases" className="hover:text-blue-500">作品集</a>
          <a href="#team" className="hover:text-blue-500">医生团队</a>
          <a href="#contact" className="hover:text-blue-500">联系我们</a>
        </nav>
        <a href="#appointment" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">在线预约</a>
      </header>

      {/* Banner */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-700">让微笑更自信</h1>
          <p className="text-lg text-gray-600 mb-6">专业牙医团队，守护您的口腔健康</p>
          <a href="#appointment" className="inline-block bg-blue-500 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-600 transition">立即预约</a>
        </div>
      </section>

      {/* 服务项目 */}
      <section id="services" className="py-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-10 text-blue-700">服务项目</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {['牙齿美白', '种植牙', '正畸矫正'].map((item, idx) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer text-center">
              <div className="text-4xl mb-4 text-blue-400">🦷</div>
              <div className="font-semibold text-lg mb-2">{item}</div>
              <div className="text-gray-500">专业{item}服务，安全舒适，效果显著。</div>
            </div>
          ))}
        </div>
      </section>

      {/* 作品集 */}
      <section id="cases" className="py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-blue-700">作品集展示</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition">
              <div className="flex gap-2">
                <Image src={c.before} alt="before" width={180} height={120} className="rounded cursor-pointer" onClick={() => setSelectedImage(c.before)} />
                <Image src={c.after} alt="after" width={180} height={120} className="rounded cursor-pointer" onClick={() => setSelectedImage(c.after)} />
              </div>
              <div className="mt-2 text-center text-gray-600">{c.desc}</div>
            </div>
          ))}
        </div>
        {/* 图片放大弹窗 */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="case" className="max-w-[90vw] max-h-[80vh] rounded shadow-lg" />
          </div>
        )}
      </section>

      {/* 医生团队 */}
      <section id="team" className="py-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-10 text-blue-700">医生团队</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {['张医生', '李医生', '王医生'].map((name, idx) => (
            <div key={name} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition text-center group">
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 mb-4 flex items-center justify-center text-3xl">👨‍⚕️</div>
              <div className="font-semibold text-lg mb-2">{name}</div>
              <div className="text-gray-500 group-hover:text-blue-500 transition">10年+经验，专注口腔健康</div>
            </div>
          ))}
        </div>
      </section>

      {/* 预约表单 */}
      <section id="appointment" className="py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-blue-700">在线预约</h2>
        <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="姓名" required />
          <input className="w-full border rounded px-3 py-2" placeholder="联系方式" required />
          <select className="w-full border rounded px-3 py-2">
            <option>选择服务项目</option>
            <option>牙齿美白</option>
            <option>种植牙</option>
            <option>正畸矫正</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">提交预约</button>
        </form>
      </section>

      {/* 页脚 */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        © 2025 牙医作品集 | 联系电话：123-456-7890
      </footer>
    </div>
  )
}