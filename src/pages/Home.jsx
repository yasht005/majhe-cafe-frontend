import {

  motion,

} from 'framer-motion'

import {

  Coffee,
  Star,
  Clock3,
  Quote,

} from 'lucide-react'

function Home() {

  const testimonials = [

    {

      name: 'Yash',

      review:
        'Best cafe experience ever. The UI and coffee both feel premium ☕',

    },

    {

      name: 'Tejas',

      review:
        'Amazing ambience and super fast delivery service 🔥',

    },

    {

      name: 'Harsh',

      review:
        'Absolutely loved the luxury vibe and smooth ordering experience ✨',

    },

  ]

  return (

    <div className="overflow-hidden bg-gradient-to-b from-[#f8f1e7] to-[#ead7c3] dark:from-[#121212] dark:to-[#1b1b1b]">

      {/* HERO */}

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32">

        {/* GLOW */}

        <div className="absolute top-20 left-10 w-72 h-72 bg-[#c08b5c] opacity-20 blur-[120px] rounded-full" />

        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#5b3b22] opacity-20 blur-[120px] rounded-full" />

        {/* FLOATING ICON */}

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="absolute top-32 right-20 hidden lg:block"
        >

          <Coffee
            size={180}
            className="text-[#5b3b22] dark:text-white opacity-10"
          />

        </motion.div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
          >

            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight text-[#5b3b22] dark:text-white">

              Freshly
              <br />

              Brewed
              <br />

              Luxury ☕

            </h1>

            <p className="mt-8 text-xl text-[#7a5a40] dark:text-gray-300 leading-relaxed max-w-xl">

              Experience premium coffee,
              delicious meals and luxury
              cafe vibes with Majhe Cafe.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-6 mt-10">

              <button className="bg-[#5b3b22] hover:bg-[#6d4728] text-white px-10 py-5 rounded-2xl text-xl font-semibold shadow-2xl transition hover:scale-105">

                Explore Menu

              </button>

              <button className="border-2 border-[#5b3b22] dark:border-white text-[#5b3b22] dark:text-white px-10 py-5 rounded-2xl text-xl font-semibold transition hover:scale-105">

                Order Now

              </button>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-8 mt-16">

              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="bg-white dark:bg-[#1f1f1f] p-6 rounded-3xl shadow-2xl text-center"
              >

                <Star
                  className="mx-auto text-yellow-500"
                  size={36}
                />

                <h1 className="mt-4 text-3xl font-bold text-[#5b3b22] dark:text-white">

                  4.9

                </h1>

                <p className="text-gray-500">

                  Rating

                </p>

              </motion.div>

              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="bg-white dark:bg-[#1f1f1f] p-6 rounded-3xl shadow-2xl text-center"
              >

                <Coffee
                  className="mx-auto text-[#5b3b22]"
                  size={36}
                />

                <h1 className="mt-4 text-3xl font-bold text-[#5b3b22] dark:text-white">

                  50+

                </h1>

                <p className="text-gray-500">

                  Drinks

                </p>

              </motion.div>

              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="bg-white dark:bg-[#1f1f1f] p-6 rounded-3xl shadow-2xl text-center"
              >

                <Clock3
                  className="mx-auto text-[#5b3b22]"
                  size={36}
                />

                <h1 className="mt-4 text-3xl font-bold text-[#5b3b22] dark:text-white">

                  24/7

                </h1>

                <p className="text-gray-500">

                  Service

                </p>

              </motion.div>

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="relative"
          >

            <div className="absolute inset-0 bg-[#c08b5c] opacity-20 blur-[120px] rounded-full" />

            <motion.img
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop"
              alt="Coffee"
              className="relative z-10 rounded-[50px] shadow-2xl object-cover w-full h-[700px]"
            />

          </motion.div>

        </div>

      </section>

      {/* BEST SELLERS */}

      <section className="py-32 px-6">

        <div className="max-w-7xl mx-auto">

          {/* TITLE */}

          <div className="text-center mb-20">

            <h1 className="text-6xl font-extrabold text-[#5b3b22] dark:text-white">

              Best Sellers

            </h1>

            <p className="mt-6 text-xl text-gray-500">

              Customer favorites loved everyday ☕🔥

            </p>

          </div>

          {/* CARDS */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {[

              {

                name: 'Caramel Latte',

                image:
                  'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200&auto=format&fit=crop',

                price: '₹249',

              },

              {

                name: 'Chocolate Pancakes',

                image:
                  'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200&auto=format&fit=crop',

                price: '₹349',

              },

              {

                name: 'Cold Brew Special',

                image:
                  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',

                price: '₹299',

              },

            ].map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -12,
                }}
                className="bg-white/70 dark:bg-[#1f1f1f]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
              >

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover transition duration-500 hover:scale-110"
                  />

                </div>

                <div className="p-8">

                  <div className="flex justify-between items-center">

                    <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white">

                      {item.name}

                    </h2>

                    <span className="bg-[#5b3b22] text-white px-4 py-2 rounded-xl">

                      Bestseller

                    </span>

                  </div>

                  <div className="flex gap-2 mt-5">

                    {[1,2,3,4,5].map((star) => (

                      <Star
                        key={star}
                        size={22}
                        className="fill-yellow-400 text-yellow-400"
                      />

                    ))}

                  </div>

                  <p className="mt-6 text-gray-500 leading-relaxed">

                    Freshly crafted premium cafe delight made
                    with luxury ingredients and signature taste.

                  </p>

                  <div className="mt-8 flex justify-between items-center">

                    <h1 className="text-4xl font-extrabold text-[#5b3b22] dark:text-white">

                      {item.price}

                    </h1>

                    <button className="bg-[#5b3b22] text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">

                      Order Now

                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="py-32 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h1 className="text-6xl font-extrabold text-[#5b3b22] dark:text-white">

              What Customers Say

            </h1>

            <p className="mt-6 text-xl text-gray-500">

              Trusted by coffee lovers ☕

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {testimonials.map(
              (
                testimonial,
                index
              ) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      index * 0.2,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="bg-white/70 dark:bg-[#1f1f1f]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[40px] p-10 shadow-2xl"
                >

                  <Quote
                    size={50}
                    className="text-[#5b3b22] dark:text-white opacity-20"
                  />

                  <div className="flex gap-2 mt-6">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <Star
                          key={star}
                          size={24}
                          className="fill-yellow-400 text-yellow-400"
                        />

                      )
                    )}

                  </div>

                  <p className="mt-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">

                    "
                    {
                      testimonial.review
                    }
                    "

                  </p>

                  <div className="mt-10">

                    <h2 className="text-2xl font-bold text-[#5b3b22] dark:text-white">

                      {
                        testimonial.name
                      }

                    </h2>

                    <p className="text-gray-500">

                      Verified Customer

                    </p>

                  </div>

                </motion.div>

              )
            )}

          </div>

        </div>

      </section>

    </div>

  )
}

export default Home