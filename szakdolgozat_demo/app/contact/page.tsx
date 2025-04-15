"use client";

import { useState } from "react";
import Chatbot from "../components/Chatbot;
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setMessage("message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setMessage("error sending message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col font-mono md:flex-row min-h-screen relative">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition z-50"
      >
        ← Back
      </button>
      <div className="w-full  md:w-1/2 bg-cover bg-center flex items-center justify-center px-8 py-16 text-white relative"
        style={{ backgroundImage: "url('/cookies1.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-lg text-center">
          <h1 className="text-4xl font-extrabold uppercase leading-tight mb-4 text-shadow-lg">Get in Touch with Us</h1>
          <p className="text-lg text-gray-200 mb-4 text-shadow-lg">We are here to help you with any inquiries or support you need.</p>
          <div className="mt-8 text-center ">
            <h2 className="font-bold text-lg text-shadow-md">Our Address</h2>
            <p className="text-sm text-gray-300">Debrecen Bármi ..</p>
            <h2 className="font-bold text-lg mt-4 text-shadow-md">Phone</h2>
            <p className="text-sm text-gray-300">+36 ( 30 665 554 7)</p>
            <h2 className="font-bold text-lg mt-4 text-shadow-md">Email</h2>
            <p className="text-sm text-gray-300">support@contact.com</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 text-black p-12 flex items-center justify-center relative"
        style={{ backgroundImage: "url('/cookies1.jpg')" }}>
        <form className="w-full max-w-lg space-y-6 bg-opacity-70 shadow-lg p-8 rounded-lg" onSubmit={handleSubmit}>
          <h2 className="text-5xl font-extrabold mb-6 text-center text-gray-800 text-shadow-md">Contact Us</h2>
          <div>
            <label className="block text-gray-800 text-xl font-bold">Your Name*</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ease-in-out duration-300 bg-opacity-60"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-800 text-xl  font-bold">Email Address*</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ease-in-out duration-300 bg-opacity-60"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-800 text-xl font-bold">Your Message*</label>
            <textarea
              name="message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ease-in-out duration-300 bg-opacity-60"
              required
              value={formData.message}
              onChange={handleChange}
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 uppercase font-bold rounded-lg hover:opacity-80 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-lg text-gray-800">{message}</p>}
        <Chatbot />
      </div>
    </div>
  );
}
