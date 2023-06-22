import React from "react";

const Help = () => {
  const faqItems = [
    {
      question: "How do I track audits?",
      answer:
        "To track audits, navigate to the 'Audits' section and click on 'Track Audit'. You can then enter the relevant details and save the audit for tracking.",
    },
    {
      question: "What is the upcoming audits feature?",
      answer:
        "The upcoming audits feature allows you to view and manage audits that are scheduled to take place in the future. It helps you stay organized and prepared for upcoming audit events.",
    },
    {
      question: "Can I customize the tracking platform?",
      answer:
        "Yes, you can customize the tracking platform to suit your needs. You can modify the interface, add custom fields, and configure settings according to your requirements.",
    },
    // Add more FAQs here
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Help</h1>
      <div className="accordion" id="faqAccordion">
        <h2 className="mb-4">Frequently Asked Questions</h2>
        {faqItems.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h3 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faqCollapse${index}`}
                aria-expanded="false"
                aria-controls={`faqCollapse${index}`}
              >
                {item.question}
              </button>
            </h3>
            <div
              id={`faqCollapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`faqHeading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h2>Additional Resources</h2>
        <ul>
          <li>
            <a href="/user-guide">User Guide</a>: Learn how to navigate and use
            the features of the tracking platform.
          </li>
          <li>
            <a href="/contact-us">Contact Us</a>: Reach out to our support team
            for further assistance or inquiries.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
