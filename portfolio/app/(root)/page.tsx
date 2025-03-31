import React from 'react'
import Image from 'next/image'
import '../globals.css'
import Apps from '../../components/Apps'

const Home = () => {
  return (
    <div className='w-full bg-zinc-700 py-10'>

      <Apps />

      {/* Projects Section */}
      <section className="py-10 px-6 text-green-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl bg-zinc-500 rounded-lg px-3 py-1 font-bold mb-12 text-center bg-w-sm">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Project One</h3>
                <p className="text-gray-600 mb-4">A brief description of the project and the technologies used.</p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Next.js</span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Project Two</h3>
                <p className="text-gray-600 mb-4">A brief description of the project and the technologies used.</p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">TypeScript</span>
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Tailwind</span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Project Three</h3>
                <p className="text-gray-600 mb-4">A brief description of the project and the technologies used.</p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Express</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 text-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
          </p>
          <p className="mb-6">
            Suspendisse in orci enim. Donec suscipit ante in hendrerit posuere. Mauris elit tellus, nonummy vel, vestibulum ut, rhoncus vel, odio. Aliquam erat volutpat. Ut dictum hendrerit felis.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="text-center">
              <h3 className="text-xl font-bold">5+</h3>
              <p>Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">20+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">10+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">3+</h3>
              <p>Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home