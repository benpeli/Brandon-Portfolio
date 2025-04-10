import React from 'react'
import '../globals.css'
import Apps from '../../components/Apps'

const Home = () => {

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/brandonyee-cs', icon: '/icons/github.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/brandon-yee-0b335a284/', icon: '/icons/linkedin.png' },
    { name: 'Medium', url: 'https://medium.com/@brandonyee.nyc', icon: '/icons/medium.png' },
  ];

  return (

    <div className='flex h-screen bg-zinc-700'>
      {/* Fixed Profile Section */}
      <div className='w-1/4 fixed top-0 left-0 h-screen flex flex-col justify-center items-center border-r border-zinc-600 p-6'>
        <div className="flex flex-col items-center profile-image-container">
          <img
            src="/images/profile-picture.jpeg" 
            alt="Profile Picture" 
            width="200" 
            height="200"
            className="profileImage mb-3"
          />
          <h1 className="name-title text-gray-200 font-bold">BRANDON YEE</h1>
          <p className="title text-gray-200">ML Researcher @ MIT</p>
        </div>

        <div className="mt-6 w-full">
          <div className="flex justify-center gap-8">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors px-2"
                aria-label={link.name}
              >
                <img 
                  src={link.icon} 
                  alt={`${link.name} icon`}
                  width="40"
                  height="30"
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className='w-3/4 ml-[25%] py-20 overflow-y-auto h-screen'>
        {/* About Section */}
        <section className="py-15 text-gray-200">
          <div className="max-w-4xl mx-auto">
            <h1 className="about-text mb-6 text-2xl md:text-3xl lg:text-4xl">
              Brandon Yee is a developer and entrepreneur who specializes in Machine Learning and Quantitative Research.
            </h1>

            <Apps />

            <p className="mb-3 text-gray-400 text-xl md:text-xl">
              Brandon is a Machine Learning Researcher at 
              <a href='https://mitsloan.mit.edu/about/why-mit-sloan' target="_blank" rel="noopener" className='link'> MIT Sloan </a> 
              where in collaboration with a
              <a href='https://mitsloan.mit.edu/programs/phd/damon-petersen?utm_source=chatgpt.com' target="_blank" rel="noopener" className='link'> Sloan PhD Student</a>
              , is researching multi-modal PyTorch frameworks using novel transformer methods. 

            </p>
            <p className="mb-6 text-gray-400 text-xl md:text-xl">
              Brandon's work at
              <a href='https://www.massgeneral.org/' target="_blank" rel="noopener" className='link'> Massachusetts General Hospital</a> 
              , under an
              <a href='https://www.massgeneral.org/doctors/23428/shaan-khurshid' target="_blank" rel="noopener" className='link'> Assistant Professor of Medicine </a>
               at Harvard Medical School, working to make significant strides in Material Discovery Research.
            </p>
            <div className="grid grid-rows-2 md:grid-cols-4 gap-4 mt-10">
              <div className="text-center">
                <h3 className="text-xl font-bold">6+</h3>
                <p>Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">10+</h3>
                <p>Projects</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">6+</h3>
                <p>Publications</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">11+</h3>
                <p>Awards</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home