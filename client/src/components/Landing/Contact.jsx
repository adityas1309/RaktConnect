import React, { useState } from 'react';
import PageMeta from '../common/PageMeta';
const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setIsSuccess(false);
      setModalMessage('Please fill in all fields.');
      setShowModal(true);
      return;
    }

    if (!email.includes('@')) {
      setIsSuccess(false);
      setModalMessage('Please enter a valid email address.');
      setShowModal(true);
      return;
    }

    setIsSuccess(true);
    setModalMessage('✅ Message sent successfully!');
    setShowModal(true);

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <PageMeta title="Contact | RaktConnect" />

    <div
      className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: "var(--bg-main)",
        color: "var(--text-main)"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 mt-12" style={{ color: "var(--accent)" }}>
            Contact Us
          </h1>
          <p className="text-xl" style={{ color: "var(--text-muted)" }}>
            Get in touch with our support team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            className="rounded-xl shadow-lg p-8"
            style={{
              background: "var(--bg-surface)",
              color: "var(--text-main)"
            }}
          >
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--text-main)" }}>
              Contact Information
            </h2>
            <div className="space-y-4" style={{ color: "var(--text-muted)" }}>
              <p>📞 24/7 Helpline: 1-800-555-HELP</p>
              <p>📧 Email: support@raktconnect.org</p>
              <p>📍 Headquarters: 123 Life Saver Street, Health City</p>
            </div>
          </div>

          <div
            className="rounded-xl shadow-lg p-8"
            style={{
              background: "var(--bg-surface)",
              color: "var(--text-main)"
            }}
          >
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--text-main)" }}>
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-main)",
                    borderColor: "rgba(200,200,200,0.13)"
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-main)",
                    borderColor: "rgba(200,200,200,0.13)"
                  }}
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-main)",
                    borderColor: "rgba(200,200,200,0.13)"
                  }}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg hover:bg-red-700 transition-colors"
                style={{
                  background: "var(--accent)",
                  color: "#fff"
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            className="p-6 sm:p-8 rounded-2xl shadow-2xl w-[90%] sm:w-[400px] text-center relative animate-fadeIn transition-all duration-300"
            style={{
              background: "var(--bg-surface)",
              color: "var(--text-main)"
            }}
          >
            {/* Close Icon */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Icon */}
            <div className="mb-4">
              {isSuccess ? (
                <div className="text-green-600 text-4xl">✅</div>
              ) : (
                <div className="text-red-600 text-4xl">❌</div>
              )}
            </div>

            {/* Title */}
            <h3 className={`text-2xl font-semibold mb-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {isSuccess ? 'Success' : 'Error'}
            </h3>

            {/* Message */}
            <p className="mb-6" style={{ color: "var(--text-muted)" }}>{modalMessage}</p>

            {/* OK Button */}
            <button
              onClick={closeModal}
              className={`px-6 py-2 rounded-lg font-medium text-white shadow-md transition-colors ${
                isSuccess
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Contact;