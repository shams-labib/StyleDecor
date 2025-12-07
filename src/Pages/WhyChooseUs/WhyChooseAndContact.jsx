import React from "react";
import { CheckCircle } from "lucide-react";

const WhyChooseAndContact = () => {
  const features = [
    "100% On-time Delivery",
    "Professional Decoration Team",
    "Affordable & Transparent Pricing",
    "Custom Theme & Design Options",
    "High Quality Materials Guaranteed",
    "24/7 Support & Quick Response",
  ];

  return (
    <div className="w-full space-y-20 py-16">
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Choose <span className="text-primary">Us?</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group p-6 bg-white dark:bg-gray-900 cursor-pointer 
              shadow-xl rounded-2xl flex items-start gap-4 border
              hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              {/* Animated Icon */}
              <CheckCircle
                className="text-primary w-8 h-8 transition-all duration-300 
                group-hover:rotate-12 group-hover:scale-125"
              />

              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyChooseAndContact;
