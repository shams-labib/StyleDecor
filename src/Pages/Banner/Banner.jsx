import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const Banner = () => {
  const banners = [
    "https://i.ibb.co.com/pv719WZ5/pexels-pixabay-276724.jpg",
    "https://i.ibb.co.com/qvsD6jN/toa-heftiba-GHIL2-Yy-Oh-Dg-unsplash.jpg",
    "https://i.ibb.co.com/5WD2098G/pexels-emrecan-2079246.jpg",
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4500}
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
        stopOnHover={false}
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full">
            {/* IMAGE ZOOM ANIMATION */}
            <motion.img
              src={banner}
              alt="banner"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="w-full h-[270px] sm:h-[350px] md:h-[500px] object-cover"
            />

            {/* GLASS OVERLAY + ANIMATION */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-6 md:px-16 py-10 space-y-4">
              {/* TITLE */}
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-xl"
              >
                Make Your Event Beautiful ✨
              </motion.h2>

              {/* SUBTEXT */}
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-white/90 text-sm sm:text-lg md:text-xl max-w-xl"
              >
                Professional decoration services to make your moments
                unforgettable.
              </motion.p>

              {/* CTA BUTTON */}
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-white rounded-lg shadow-xl font-semibold w-max
                hover:bg-primary/90 transition text-sm sm:text-base"
              >
                Book Decoration Service
              </motion.button>
            </div>
          </div>
        ))}
      </Carousel>

      {/* SPOTLIGHT GLOW EFFECT */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent)]"></div>
    </div>
  );
};

export default Banner;
