import React, { useState } from 'react'
import emailjs from 'emailjs-com'

const Contact = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const toggleForm = () => setShowForm(!showForm)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs.send(
      'service_j6h55hv',
      'template_bp34acd',
      formData,
      '6SrQLGRWj7K9avG_z'
    ).then(() => {
      alert('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
      setShowForm(false)
    }).catch((error) => {
      alert('Something went wrong. Please try again.')
      console.error('EmailJS Error:', error)
    })
  }

  return (
    <section id="contact" className="bg-gray-900 text-white py-16 px-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Let's Connect</h2>
        <p className="text-gray-300 mb-8">
          I'd love to connect with you! Whether you have a project in mind or just want to chat, feel free to reach out. I'm always open to new opportunities and collaborations.
        </p>
        <button
          onClick={toggleForm}
          className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-3 rounded-full transition"
        >
          Contact Me
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-md shadow-xl relative">
            <button
              onClick={toggleForm}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center text-teal-600">Contact Form</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact
