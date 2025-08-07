import React from "react";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "Saving Lives with Every Drop",
    date: "June 1, 2025",
    excerpt:
      "When time is critical, RaktConnect delivered, Read how a young thalassemia patient received life-saving blood within 30 minutes, thanks to our smart donor-matching system that leverages geolocation, real-time notifications, and AI-backed prioritization.",
  },
  {
    title: "5 Common Myths About Blood Donation – Busted!",
    date: "May 24, 2025",
    excerpt:
      "Think donating blood makes you weak or you can't donate if you're on medication? These myths hold back thousands of potential donors. Let’s set the record straight and empower more people to step up and save lives.",
  },
  {
    title: "Behind the Scenes: How RaktConnect Works",
    date: "May 10, 2025",
    excerpt:
      "Have you ever wondered what powers our life-saving tech? Dive into the architecture of RaktConnect – from AI models analyzing blood demand patterns to real-time mobile alerts that connect donors to recipients in under a minute.",
  },
  {
    title: "Why Young Donors Are the Future",
    date: "April 28, 2025",
    excerpt:
      "Gen Z is not just tech-savvy, they're socially responsible too. Learn how this generation is stepping up to donate blood regularly, organizing campus drives, and building a culture of giving through social media influence.",
  },
  {
    title: "The Journey of a Blood Bag: From Donor to Recipient",
    date: "April 14, 2025",
    excerpt:
      "Follow the fascinating journey of a single unit of blood — from the moment it’s donated to the hands of the patient who needs it. Learn about testing, separation into components, cold-chain logistics, and hospital protocols.",
  },
  {
    title: "How to Prepare for Your First Blood Donation",
    date: "April 2, 2025",
    excerpt:
      "Thinking of donating for the first time? Here's a quick guide to help you prepare — what to eat, what to expect during the process, and how to care for yourself afterward. Your confidence starts here.",
  },
  {
    title: "The Role of Technology in Modern Blood Donation",
    date: "March 20, 2025",
    excerpt:
      "From blockchain-backed donor tracking to AI-matched blood needs, technology is revolutionizing the way we donate and receive blood. Here's how platforms like RaktConnect are leading the charge in tech-driven health solutions.",
  },
  {
    title: "Emergency Response: How RaktConnect Helped During a City-wide Crisis",
    date: "March 5, 2025",
    excerpt:
      "During the recent metro train accident, blood demand skyrocketed. Discover how RaktConnect coordinated with donors and hospitals to deliver over 300 units in 4 hours — a testament to what community and technology can achieve together.",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-red-400 mb-16 tracking-wide"
        >
          🩸 RaktConnect Blog
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0d1627] border border-red-500/30 rounded-2xl shadow-md p-8 hover:shadow-red-500/30 transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-red-300 mb-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-400 mb-4">{blog.date}</p>
              <p className="text-gray-300 leading-relaxed">{blog.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
