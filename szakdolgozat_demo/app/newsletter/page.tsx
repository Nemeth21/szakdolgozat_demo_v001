"use client";

import { useState } from "react";
import Chatbot from "../components/Chatbot";
import { useRouter } from "next/navigation";

export default function NewsletterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dob: { ...prev.dob, [name]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMessage("successful signup!");
      setFormData({ email: "", firstName: "", lastName: "", gender: "", dob: { day: "", month: "", year: "" } });
    } else {
      setMessage("error signing up. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex font-inter font-mono flex-col md:flex-row min-h-screen relative">
      
      <button
  onClick={() => router.push("/")}
  className="fixed top-6 left-6 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition z-50"
>
  ← Back to Home
</button>
      <div className="w-full md:w-1/2 relative flex flex-col justify-center px-12 py-16 text-white"
        style={{ backgroundImage: "url('/newsletter.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-lg">
        <h1 className="text-5xl font-extrabold uppercase leading-tight">
  HEY, WANT <span className="text-orange-500">EMAILS</span> <br /> YOU’LL ACTUALLY READ?
</h1>
<p className="mt-4 text-lg text-gray-200">
  Here’s why joining the community will be the  
  <span className="text-orange-500 font-bold"> best decision </span>  
  you’ve made since you landed on our website.
</p>
          <div className="mt-8 grid grid-cols-2 gap-4">

  <div className="bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-4 rounded-lg shadow-lg">
    <h2 className="font-bold text-lg flex items-center"> - EVENTS</h2>
    <p className="text-sm text-gray-300">
      Be the first to know about exclusive events at GSLC, our Lift events, and others.
    </p>
  </div>
  <div className="bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-4 rounded-lg shadow-lg">
    <h2 className="font-bold text-lg flex items-center"> - PRODUCT DROPS</h2>
    <p className="text-sm text-gray-300">
      Get early details on new product launches so you can mark your calendars.
    </p>
  </div>
  <div className="bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-4 rounded-lg shadow-lg">
    <h2 className="font-bold text-lg flex items-center"> - EXCLUSIVE CONTENT</h2>
    <p className="text-sm text-gray-300">
      Unlock promotions, discover what makes your favorite brands great.
    </p>
  </div>
  <div className="bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-4 rounded-lg shadow-lg">
    <h2 className="font-bold text-lg flex items-center"> - 10% OFF</h2>
    <p className="text-sm text-gray-300">
      Sign up for the first time and get 10% off your first order.
    </p>
</div>
</div>

        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-12 relative">
        <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-800 font-bold">Email Address*</label>
            <input 
              type="email" 
              name="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition" 
              required 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label className="block text-gray-800 font-bold">First Name*</label>
            <input 
              type="text" 
              name="firstName" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition" 
              required 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label className="block text-gray-800 font-bold">Last Name*</label>
            <input 
              type="text" 
              name="lastName" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition" 
              required 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </div>
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              id="privacyPolicy" 
              className="w-5 h-5 text-black border border-gray-300 rounded focus:ring-black focus:ring-2" 
              required 
            />
            <label htmlFor="privacyPolicy" className="text-gray-600 text-sm">
              By submitting this form, you agree to receive emails about our products, apps, sales, exclusive content and more.  
              See our <a href="#" className="underline text-orange-500">Privacy Policy</a> and <a href="#" className="underline text-orange-500">California Notice</a>.
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full bg-black text-white p-3 uppercase font-bold rounded-lg hover:opacity-80 transition disabled:opacity-50" 
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
        <Chatbot />
      </div>
    </div>
  );
}
