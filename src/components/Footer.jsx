import {

  motion,

} from 'framer-motion'

import {

  Coffee,

  Globe,

  MapPin,

  Phone,

  Clock3,

} from 'lucide-react'

function Footer() {

  return (

    <footer className="relative overflow-hidden bg-gradient-to-b from-[#ead7c3] to-[#d8bea7] dark:from-[#181818] dark:to-[#101010] pt-28 pb-10 px-6">

      {/* GLOW */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-[#c08b5c] opacity-20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#5b3b22] opacity-20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}

          <div>

            <motion.h1
              whileHover={{
                scale: 1.03,
              }}
              className="text-5xl font-extrabold text-[#5b3b22] dark:text-white"
            >

              Majhe Cafe ☕

            </motion.h1>

            <p className="mt-6 text-lg leading-relaxed text-[#7a5a40] dark:text-gray-400">

              Premium coffee experience
              with luxury ambience,
              delicious food and fast
              delivery service.

            </p>

            {/* SOCIALS */}

            <div className="flex gap-5 mt-8">

              {[
                Coffee,
                Globe,
              ].map(
                (
                  Icon,
                  index
                ) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                    }}
                    className="bg-white dark:bg-[#1f1f1f] p-4 rounded-2xl shadow-xl cursor-pointer"
                  >

                    <Icon
                      size={24}
                      className="text-[#5b3b22] dark:text-white"
                    />

                  </motion.div>

                )
              )}

            </div>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white">

              Quick Links

            </h2>

            <div className="mt-8 flex flex-col gap-5 text-lg">

              {[
                'Home',
                'Menu',
                'Cart',
                'My Orders',
              ].map((item) => (

                <motion.a
                  key={item}
                  whileHover={{
                    x: 8,
                  }}
                  href="/"
                  className="text-[#7a5a40] dark:text-gray-400 hover:text-[#5b3b22] dark:hover:text-white transition"
                >

                  {item}

                </motion.a>

              ))}

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white">

              Contact

            </h2>

            <div className="mt-8 space-y-6">

              <div className="flex gap-4 items-start">

                <MapPin
                  className="text-[#5b3b22] dark:text-white"
                />

                <p className="text-[#7a5a40] dark:text-gray-400">

                  Pen, Maharashtra,
                  India

                </p>

              </div>

              <div className="flex gap-4 items-center">

                <Phone
                  className="text-[#5b3b22] dark:text-white"
                />

                <p className="text-[#7a5a40] dark:text-gray-400">

                  +91 9876543210

                </p>

              </div>

            </div>

          </div>

          {/* HOURS */}

          <div>

            <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white">

              Opening Hours

            </h2>

            <div className="mt-8 space-y-6">

              <div className="flex gap-4 items-center">

                <Clock3
                  className="text-[#5b3b22] dark:text-white"
                />

                <div>

                  <p className="font-semibold text-[#5b3b22] dark:text-white">

                    Monday - Friday

                  </p>

                  <p className="text-[#7a5a40] dark:text-gray-400">

                    8:00 AM - 11:00 PM

                  </p>

                </div>

              </div>

              <div className="flex gap-4 items-center">

                <Clock3
                  className="text-[#5b3b22] dark:text-white"
                />

                <div>

                  <p className="font-semibold text-[#5b3b22] dark:text-white">

                    Saturday - Sunday

                  </p>

                  <p className="text-[#7a5a40] dark:text-gray-400">

                    9:00 AM - 1:00 AM

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-black/10 dark:border-white/10 mt-20 pt-8 text-center">

          <p className="text-lg text-[#7a5a40] dark:text-gray-400">

            © 2026 Majhe Cafe. All rights reserved.

          </p>

        </div>

      </div>

    </footer>

  )
}

export default Footer