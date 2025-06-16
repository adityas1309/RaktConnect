import React from "react";
import "./Blog.css";

const Blog = () => {
  return (
    <div className="blog-container">
      <h1>RaktConnect Blog</h1>
      <section className="blog-section">
        <h2>Donor Stories</h2>
        <p>Read inspiring stories from donors and recipients who have been helped by RaktConnect. Their journeys highlight the impact of every donation and the power of community.</p>
      </section>
      <section className="blog-section">
        <h2>Blood Donation Facts</h2>
        <ul>
          <li>Donating blood can save up to three lives with a single donation.</li>
          <li>Learn about eligibility, health tips, and debunk common myths about blood donation.</li>
        </ul>
      </section>
      <section className="blog-section">
        <h2>Campaign Recaps</h2>
        <p>Catch up on our recent blood drives and community events. Stay tuned for upcoming campaigns and find out how you can participate!</p>
      </section>
      <section className="blog-section">
        <h2>Behind the Scenes</h2>
        <p>Discover how RaktConnect leverages technology, including AI, to efficiently match donors with recipients and streamline the donation process.</p>
      </section>
      <section className="blog-section">
        <h2>How-To Guides</h2>
        <ul>
          <li>Step-by-step guides on registering, requesting blood, and becoming a volunteer.</li>
          <li>Tips for first-time donors and frequently asked questions.</li>
        </ul>
      </section>
    </div>
  );
};

export default Blog;
