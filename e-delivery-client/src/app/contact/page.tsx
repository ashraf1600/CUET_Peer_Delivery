import React from "react";
import { Container } from "@/components/shared/Container";

const ContactPage = () => {
  return (
    <div className="bg-white py-10">
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-800">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Have a question or need help? We’re here for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-700">Email</h2>
              <p className="text-gray-600">cuetpeer.delivery@gmail.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-700">Location</h2>
              <p className="text-gray-600">CUET Campus, Raozan, Chattogram</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-700">Support Hours</h2>
              <p className="text-gray-600">Everyday: 10:00 AM – 10:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-gray-50 p-6 rounded-xl shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;








