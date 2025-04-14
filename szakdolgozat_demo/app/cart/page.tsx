"use client";
 import { useRouter } from "next/navigation";
 import Image from "next/image";
 import { useState } from "react";
 import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
 
 const CartPage = () => {
   const router = useRouter();
   const [chatOpen, setChatOpen] = useState(false);
   const [messages, setMessages] = useState([
     { sender: "bot", text: "Hi! How can I help you today?" },
   ]);
   const [userInput, setUserInput] = useState("");
   const cartItems: any[] = []; 
   const handleSendMessage = () => {
     if (!userInput.trim()) return;
     const newMessages = [...messages, { sender: "user", text: userInput }];
     setMessages(newMessages);
     setUserInput("");
     setTimeout(() => {
       const botReply = "I'm here to assist you. You can ask about products, shipping, or anything else!";
       setMessages([...newMessages, { sender: "bot", text: botReply }]);
     }, 1000);
   };
   return (
     <div className="flex flex-col font-inter font-mono items-center justify-center min-h-screen bg-white text-black p-6">
       <button
         onClick={() => router.back()}
         className="absolute top-6 left-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
       >
         ← Back
       </button>
       {cartItems.length === 0 ? (
         <div className="flex flex-col items-center text-center">
           <div className="w-32 h-32 relative mb-6">
             <Image
               src="/empty-bag.png" 
               alt="Empty Bag"
               layout="fill"
               objectFit="contain"
             />
           </div>
           <h1 className="text-2xl font-bold">YOUR BAG IS EMPTY</h1>
           <p className="text-gray-600 mt-2">There are no products in your bag</p>
 
           <div className="mt-6 space-y-3 w-full max-w-sm">
             <button
               className="w-full bg-black text-white py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition"
               onClick={() => router.push("/mens")}
             >
               SHOP MENS
             </button>
             <button
               className="w-full bg-black text-white py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition"
               onClick={() => router.push("/womens")}
             >
               SHOP WOMENS
             </button>
           </div>
         </div>
       ) : (
         <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
           <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
           <p className="text-gray-600 text-center">Kosár tartalma itt fog megjelenni...</p>
         </div>
       )}
       <div className="fixed bottom-6 right-6">
         {!chatOpen ? (
           <button
             className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
             onClick={() => setChatOpen(true)}
           >
             <FaRobot size={28} />
           </button>
         ) : (
           <div className="w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
             <div className="flex justify-between items-center border-b pb-2">
               <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
               <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700">
                 <FaTimes size={20} />
               </button>
             </div>
             <div className="h-56 overflow-y-auto mt-2 space-y-3">
               {messages.map((msg, index) => (
                 <div
                   key={index}
                   className={`p-2 rounded-md ${
                     msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"
                   }`}
                 >
                   {msg.text}
                 </div>
               ))}
             </div>
             <div className="flex items-center mt-3 border-t pt-3">
               <input
                 type="text"
                 className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                 placeholder="Type your message..."
                 value={userInput}
                 onChange={(e) => setUserInput(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
               />
               <button
                 className="ml-2 bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800 transition"
                 onClick={handleSendMessage}
               >
                 <FaPaperPlane />
               </button>
             </div>
           </div>
         )}
       </div>
     </div>
   );
 };
 
 export default CartPage;