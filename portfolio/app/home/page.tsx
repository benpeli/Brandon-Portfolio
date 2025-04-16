"use client";
import React, { useState } from 'react';
import '../globals.css';
import Apps from '../../components/Apps';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/brandonyee-cs', icon: '/icons/github.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/brandon-yee-0b335a284/', icon: '/icons/linkedin.png' },
    { name: 'Medium', url: 'https://medium.com/@brandonyee.nyc', icon: '/icons/medium.png' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Server error details:', {
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          formData: formData
        });
        setStatus('error');
      }
    } catch (error) {
      console.error('Client error details:', {
        error: error instanceof Error ? error.message : error,
        formData: formData
      });
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

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
      <div className='w-3/4 ml-[25%] overflow-y-auto h-screen'>
        {/* About Section */}
        <section className="py-20 text-gray-200 " id="home">
          <div className="max-w-4xl mx-auto">
            <h1 className="about-text mb-6 text-2xl md:text-3xl lg:text-4xl">
              Brandon Yee is a developer and researcher who specializes in Machine Learning and Quantitative Research.
            </h1>

            <Apps />

            <p className="mb-3 text-gray-400 text-xl md:text-xl">
              Brandon is a Machine Learning Researcher at 
              <a href='https://mitsloan.mit.edu/about/why-mit-sloan' target="_blank" rel="noopener" className='link'> MIT Sloan </a> 
              where, in collaboration with a
              <a href='https://mitsloan.mit.edu/programs/phd/damon-petersen?utm_source=chatgpt.com' target="_blank" rel="noopener" className='link'> Sloan PhD Student</a>
              , is researching multi-modal PyTorch frameworks using novel transformer methods. 

            </p>
            <p className="mb-6 text-gray-400 text-xl md:text-xl">
              Brandon's work at
              <a href='https://www.massgeneral.org/' target="_blank" rel="noopener" className='link'> Massachusetts General Hospital</a> 
              , under an
              <a href='https://www.massgeneral.org/doctors/23428/shaan-khurshid' target="_blank" rel="noopener" className='link'> Assistant Professor of Medicine </a>
               at Harvard Medical School, is making significant strides in Material Discovery Research.
            </p>
            <div className="grid grid-rows-2 md:grid-cols-4 gap-4 mt-10">
              <div className="text-center">
                <h3 className="text-xl font-bold">6+</h3>
                <p>Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">6+</h3>
                <p>Publications</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">10+</h3>
                <p>Projects</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">11+</h3>
                <p>Awards</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="py-20 text-gray-200" id="research">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Research</h2>
            <div className="space-y-6">
              <p className="mb-3 text-gray-200 text-xl md:text-xl">
                <strong>Physics-Informed Uncertainty Quantification for Graph Neural Networks in Materials Discovery.</strong> <em className="text-gray-400">Brandon Yee, Lucas Wang, Mihir Tekal, Shaan Khurshid, Shakeel Abdulkareem [April 2025 - Now].</em>
              </p>
              
              <p className="mb-3 text-gray-200 text-xl md:text-xl">
                <strong>TLR4-Bind: Integrating Modeling and ML for Inhibitor Affinity Prediction.</strong> <em className="text-gray-400">Brandon Yee, Kevin Bedoya, Kripamoye Biswas, Max Rutowski, Wilson Collins [March - Now].</em>
              </p>
              
              <p className="mb-3 text-gray-200 text-xl md:text-xl">
                <strong>The Cash Flow Duration Effect: Exploitable Market Inefficiencies Around Information-Rich Events.</strong> <em className="text-gray-400">Brandon Yee, Damon Petersen, Micheal D'Angelo, Piotr Kurek, Sky Ng [November 2024 - Now].</em>
              </p>
              
              <p className="mb-3 text-gray-200 text-xl md:text-xl">
                <strong>Literature Review: Credit Risk Assessment in Private Markets.</strong> <em className="text-gray-400">Brandon Yee [April 2025]. Preprint:</em>
              </p>
              
              <p className="mb-3 text-gray-200 text-xl md:text-xl">
                <strong>Multi-Modal Anomaly Detection for Enterprise Security.</strong> <em className="text-gray-400">Brandon Yee, Mark Wilkinson [March 2025]. Preprint:</em>
              </p>
              
              <p className="mb-3 text-gray-200 text-xl md:text-xl">
                <strong>Mathematical Foundations of Option Pricing Models: A Comparative Analysis.</strong> <em className="text-gray-400">Brandon Yee [February 2025]. <a href="https://assets-eu.researchsquare.com/files/rs-6297750/v1_covered_0907cb48-807b-46a6-b439-84e0bf74ee86.pdf?c=1743660407" target="_blank" rel="noopener" className="link inline-flex items-center">
                  <span>Download Paper</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a></em>
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
  <section className="py-20 px-6" id='projects'>
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl rounded-lg px-3 py-1 font-bold mb-12 text-center bg-w-sm">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Card 1 */}
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md border-5 border-zinc-500">
          <div className="h-48 bg-gray-200">
            <a href="https://github.com/brandonyee-cs/RTorch" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/RTorch-logo.png"
                alt="RTorch Logo"
                className="object-cover h-48 w-full"
              />
            </a>
          </div>
          <div className="p-10">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">RTorch</h3>
            <p className="text-gray-400 mb-10">RTorch is a Rust-based deep learning library with a PyTorch-style Python API, combining Rust's speed, safety, and familiarity.</p>
            <div className="flex space-x-2 text-green-500">
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Rust</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Python</span>
            </div>
          </div>
        </div>

        {/* Project Card 2 */}
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md border-5 border-zinc-500">
          <div className="h-48 bg-gray-200">
            <a href="https://github.com/brandonyee-cs/Chain-Reaction" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/ChainReaction-logo.png"
                alt="Chain Reaction Logo"
                className="object-cover h-48 w-full"
              />
            </a>
          </div>
          <div className="p-10">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">Chain Reaction</h3>
            <p className="text-gray-400 mb-10">Chain Reaction is a full-stack app that analyzes business supply chains to identify strategic local investment opportunities.</p>
            <div className="flex space-x-2 text-green-500">
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Python</span>            </div>
          </div>
        </div>

        {/* Project Card 3 */}
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md border-5 border-zinc-500">
          <div className="h-48 bg-gray-200">
            <a href="https://github.com/brandonyee-cs/Financial-Order-Book" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/OrderBook-logo.png"
                alt="Order Book Logo"
                className="object-cover h-48 w-full"
              />
            </a>
          </div>
          <div className="p-10">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">Order Book</h3>
            <p className="text-gray-400 mb-14">A high-performance trading system with FIX protocol support and configurable runtime parameters.</p>
            <div className="flex space-x-2 text-green-500 py-2">
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">C++</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">CMake</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    {/* Contact Section */}
    <section className="py-20 px-6" id='contact'>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-200 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md" 
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md" 
                required 
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-200 mb-2">Subject</label>
            <input 
              type="text" 
              id="subject" 
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md" 
              required 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-200 mb-2">Message</label>
            <textarea 
              id="message" 
              rows={5} 
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-zinc-600 text-green-500 px-6 py-3 rounded-md hover:bg-blue-700 transition"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p className="text-green-500">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>
    </section>
      </div>
    </div>
  )
}

export default Home