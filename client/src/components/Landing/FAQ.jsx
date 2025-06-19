import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('donors');

  const faqCategories = {
    donors: {
      title: "For Donors",
      faqs: [
        {
          question: " Eligibility",
          answer: "",
          isCategory: true
        },
        {
          question: "Can I donate if I have a tattoo or piercing?",
          answer: "Yes, you can donate if the tattoo or piercing was done using sterile needles and has healed fully, typically after 6 months."
        },
        {
          question: "Can people with diabetes donate blood?",
          answer: "Yes, if your diabetes is well controlled and you are otherwise healthy."
        },
        {
          question: "Can I donate if I'm on medication?",
          answer: "It depends on the medication. Consult with the donation center for a complete list of restricted drugs."
        },
        {
          question: " Donation Frequency",
          answer: "",
          isCategory: true
        },
        {
          question: "How often can I donate whole blood?",
          answer: "Every 56 days (8 weeks)."
        },
        {
          question: "How often can I donate platelets or plasma?",
          answer: "Platelets: Every 7 days, up to 24 times a year.\nPlasma: Every 28 days."
        },
        {
          question: " During Donation",
          answer: "",
          isCategory: true
        },
        {
          question: "How long does the blood donation process take?",
          answer: "The entire process takes about 30 to 45 minutes, with the actual donation taking 8–10 minutes."
        },
        {
          question: "Is blood donation painful?",
          answer: "Only a slight pinch is felt when the needle is inserted — most donors report minimal discomfort."
        },
        {
          question: " After Donation",
          answer: "",
          isCategory: true
        },
        {
          question: "What should I do after donating blood?",
          answer: "Rest for a few minutes, drink fluids, and avoid heavy physical activity for the rest of the day."
        },
        {
          question: "Can I drive after donating blood?",
          answer: "Yes, but rest for 10–15 minutes post-donation before doing so."
        }
      ]
    },
    patients: {
      title: "For Patients",
      faqs: [
        {
          question: "How can I request blood?",
          answer: "You can request blood through your hospital or directly on our platform by creating a blood request"
        },
        {
          question: "What information do I need to provide?",
          answer: "You'll need to provide your blood type, required units, hospital details, and contact information"
        },
        {
          question: "How long does it take to find a donor?",
          answer: "Response time varies, but our system prioritizes urgent cases and typically finds matches within 24-48 hours"
        }
      ]
    },
    hospitals: {
      title: "For Hospitals",
      faqs: [
        {
          question: "How can my hospital register?",
          answer: "Hospitals can register through our platform by providing necessary documentation and verification"
        },
        {
          question: "What verification is required?",
          answer: "We require hospital registration certificates, blood bank licenses, and other relevant medical certifications"
        },
        {
          question: "How do we manage blood inventory?",
          answer: "Our platform provides real-time inventory management tools and automated alerts for low stock"
        }
      ]
    },
    organizers: {
      title: "For Campaign Organizers",
      faqs: [
        {
          question: "How do I organize a blood drive?",
          answer: "Register as an organizer, set up your campaign details, and use our tools to manage donors and logistics"
        },
        {
          question: "What support do you provide?",
          answer: "We provide promotional materials, donor management tools, and technical support for your campaign"
        },
        {
          question: "Can I track campaign progress?",
          answer: "Yes, our platform provides real-time analytics and tracking tools for your blood drive"
        }
      ]
    }
  };

  return (
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: "var(--bg-main)",
        color: "var(--text-main)"
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-4xl font-bold mb-8 text-center mt-12"
          style={{ color: "var(--accent)" }}
        >
          Frequently Asked Questions
        </h1>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(faqCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors font-medium ${
                activeCategory === category
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-red-50'
              }`}
            >
              {faqCategories[category].title}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqCategories[activeCategory].faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg shadow-sm ${
                faq.isCategory
                  ? 'bg-red-50 border-red-200'
                  : ''
              }`}
              style={{
                background: faq.isCategory ? "var(--bg-surface)" : "var(--bg-main)",
                borderColor: faq.isCategory
                  ? "rgba(255,0,0,0.09)"
                  : "rgba(200,200,200,0.13)",
                color: "var(--text-main)"
              }}
            >
              <button
                className={`w-full p-4 text-left flex justify-between items-center ${
                  faq.isCategory ? 'cursor-default' : ''
                }`}
                onClick={() =>
                  !faq.isCategory && setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span
                  className={`font-medium ${
                    faq.isCategory
                      ? 'text-red-700 text-lg'
                      : ''
                  }`}
                  style={{
                    color: faq.isCategory
                      ? "var(--accent)"
                      : "var(--text-main)"
                  }}
                >
                  {faq.question}
                </span>
                {!faq.isCategory &&
                  (activeIndex === index ? <FiChevronUp /> : <FiChevronDown />)}
              </button>
              {!faq.isCategory && activeIndex === index && (
                <div
                  className="p-4 pt-0 border-t"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "rgba(200,200,200,0.13)"
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="mt-12 rounded-lg p-6 text-center"
          style={{
            background: "var(--bg-surface)"
          }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--accent)" }}
          >
            Still have questions?
          </h2>
          <button
            className="px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            style={{
              background: "var(--accent)",
              color: "#fff"
            }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;