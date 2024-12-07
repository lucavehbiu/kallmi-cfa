'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-cormorant">
      {/* Hero Section */}
      <div className="h-[40vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/hero-kallmi.webp"
          alt="Olive Grove"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl text-white font-light tracking-wider z-20">
          Contact Us
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-light">Get in Touch</h2>
              <p className="text-lg text-stone-600">
                We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-lg">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-400 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-400 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-lg">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-400 outline-none transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-stone-800 text-white hover:bg-stone-700 transition-colors text-lg"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-light mb-2">Visit Us</h3>
                <p className="text-lg text-stone-600">
                  Kallmi Estate<br />
                  Kallm, Rruga Currila, 2001<br />
                  Albania
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-2">Contact</h3>
                <p className="text-lg text-stone-600">
                  Phone: +355 682450851<br />
                  Email: eldivehbiu@gmail.com
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-2">Hours</h3>
                <p className="text-lg text-stone-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 6:00 PM<br />
                  Sunday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>

            {/* Google Maps iframe */}
            <div className="h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11983.527505482585!2d19.4197957!3d41.3331819!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134fda8c7a364bcd%3A0x8399697acbf36121!2sKallmi%20i%20Bukur!5e0!3m2!1sen!2s!4v1731775569503!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;