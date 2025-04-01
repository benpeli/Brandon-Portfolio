import React from 'react'

const page = () => {
  return (
    <div className='w-full bg-zinc-700 py-10'>
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
            <input type="text" id="subject" className="w-full p-3 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea id="message" rows={5} className="w-full p-3 border border-gray-300 rounded-md"></textarea>
          </div>
          <button type="submit" className="bg-zinc-600 text-green-500 px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </section></div>
  )
}

export default page