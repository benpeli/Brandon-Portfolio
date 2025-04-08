import React from 'react'

const page = () => {
  return (
    <div>
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

  </div>
  )
}

export default page