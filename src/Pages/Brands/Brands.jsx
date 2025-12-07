import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import amazon from "../../assets/brands/amazon.png";
import amazonVector from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import monstar from "../../assets/brands/moonstar.png";
import restad from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import starPeople from "../../assets/brands/start_people.png";

const Brands = () => {
  const brandsLogo = [
    amazon,
    amazonVector,
    casio,
    monstar,
    restad,
    star,
    starPeople,
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 my-10">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          We Work With
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm sm:text-base">
          Trusted by top brands across industries
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true, // dynamic spacing
        }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={false} // remove arrows
      >
        {brandsLogo.map((logo, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center p-4"
          >
            <div className="w-full h-full flex items-center justify-center bg-white/80 dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="max-h-16 sm:max-h-20 md:max-h-24 object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
