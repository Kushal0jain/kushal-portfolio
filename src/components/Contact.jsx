import React, { useState } from "react";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  const [formData, setFormData] = useState({
    name: "",
    emailPrefix: "",
    customDomain: "",
    message: "",
  });

  const [selectedDomain, setSelectedDomain] = useState("gmail.com");
  const [useCustom, setUseCustom] = useState(false);

  const predefinedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent entering '@' in prefix when using predefined domains
    if (name === "emailPrefix" && !useCustom && value.includes("@")) return;

    // Auto-switch to predefined if typed custom domain is one of the preset
    if (name === "customDomain" && useCustom) {
      const trimmed = value.trim().toLowerCase();
      if (predefinedDomains.includes(trimmed)) {
        setUseCustom(false);
        setSelectedDomain(trimmed);
        setFormData({ ...formData, customDomain: "" });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleDomainChange = (e) => {
    const value = e.target.value;

    setSelectedDomain(value);

    if (value === "other") {
      setUseCustom(true);
      setFormData({ ...formData, emailPrefix: "", customDomain: "" });
    } else {
      setUseCustom(false);
      setFormData({ ...formData, customDomain: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullEmail = useCustom
      ? `${formData.customDomain}`
      : `${formData.emailPrefix}@${selectedDomain}`;

    const textMessage = `Name: ${formData.name}%0AEmail: ${fullEmail}%0AMessage: ${formData.message}`;

    const whatsappNumber = "917727012340"; // Correct format—no + sign

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`,
      "_blank"
    );

    // Reset form
    setFormData({
      name: "",
      emailPrefix: "",
      customDomain: "",
      message: "",
    });

    setSelectedDomain("gmail.com");
    setUseCustom(false);
    toggleForm();
  };

  return (
    <section id="contact" className="bg-black text-white py-16 px-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Let's Connect</h2>
        <p className="text-gray-300 mb-8">
          I'd love to connect with you! Whether you have a project in mind or
          just want to chat, feel free to reach out. I'm always open to new
          opportunities and collaborations.
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

            <h3 className="text-2xl font-bold mb-4 text-center text-teal-600">
              Contact Form
            </h3>

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

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  name="emailPrefix"
                  value={formData.emailPrefix}
                  onChange={handleChange}
                  placeholder="Email ID"
                  className="w-1/2 border border-gray-300 px-4 py-2 rounded-lg"
                  disabled={useCustom}
                  required={!useCustom}
                />
                <select
                  value={selectedDomain}
                  onChange={handleDomainChange}
                  className="w-1/2 border border-gray-300 px-4 py-2 rounded-lg"
                >
                  <option value="gmail.com">@gmail.com</option>
                  <option value="yahoo.com">@yahoo.com</option>
                  <option value="outlook.com">@outlook.com</option>
                  <option value="hotmail.com">@hotmail.com</option>
                  <option value="icloud.com">@icloud.com</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {useCustom && (
                <input
                  type="email"
                  name="customDomain"
                  value={formData.customDomain}
                  onChange={handleChange}
                  placeholder="Enter full email (example@domain.com)"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
                  required
                />
              )}

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
                Send Message via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
