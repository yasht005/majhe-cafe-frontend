import { useState } from "react";

import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

import { CheckCircle2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  /* CART */

  const [cart, setCart] = useState(() => {

    return JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  });

  const [showPayment, setShowPayment] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("Card");

  const [loading, setLoading] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  /* TOTAL */

  const totalPrice = cart.reduce(

    (total, item) =>

      total +
      item.price *
      item.quantity,

    0

  );

  /* UPDATE QUANTITY */

  const updateQuantity = (
    id,
    type
  ) => {

    const updatedCart =
      cart.map((item) => {

        if (item._id === id) {

          return {

            ...item,

            quantity:

              type === "increase"

                ? item.quantity + 1

                : Math.max(
                    1,
                    item.quantity - 1
                  ),

          };

        }

        return item;

      });

    setCart(updatedCart);

    localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)

    );

  };

  /* REMOVE ITEM */

  const removeItem = (id) => {

    const updatedCart =
      cart.filter(

        (item) =>
          item._id !== id

      );

    setCart(updatedCart);

    localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)

    );

  };

  /* PLACE ORDER */

  const placeOrder = async () => {

    try {

      setLoading(true);

      await axios.post(

        `${import.meta.env.VITE_API_URL}/api/orders`,

        {

          items: cart,

          totalPrice,

          paymentMethod,

        }

      );

      setTimeout(() => {

        localStorage.removeItem(
          "cart"
        );

        setCart([]);

        setShowPayment(false);

        setLoading(false);

        setShowSuccess(true);

      }, 2500);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#f8f1e7] to-[#ead7c3] dark:from-[#121212] dark:to-[#1b1b1b] pt-40 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-20">

          <h1 className="text-6xl font-extrabold text-[#5b3b22] dark:text-white">

            Your Cart

          </h1>

          <p className="mt-5 text-xl text-[#7a5a40] dark:text-gray-300">

            Premium cafe checkout experience

          </p>

        </div>

        {cart.length === 0 ? (

          <div className="bg-white dark:bg-[#1f1f1f] p-16 rounded-[40px] shadow-2xl text-center max-w-2xl mx-auto">

            <div className="text-8xl mb-8">

              🛒

            </div>

            <h2 className="text-5xl font-extrabold text-[#5b3b22] dark:text-white">

              Your Cart Feels Lonely

            </h2>

            <p className="mt-6 text-xl text-gray-500 leading-relaxed">

              Looks like you haven’t added anything yet.
              Explore our premium menu and discover
              freshly brewed luxury ☕

            </p>

            <button
              onClick={() =>
                navigate("/menu")
              }
              className="mt-10 bg-[#5b3b22] hover:bg-[#6d4728] text-white px-10 py-5 rounded-2xl text-xl font-semibold transition hover:scale-105 shadow-xl"
            >

              Explore Menu

            </button>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            {/* ITEMS */}

            <div className="lg:col-span-2 space-y-8">

              {cart.map((item) => (

                <motion.div
                  key={item._id}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="bg-white dark:bg-[#1f1f1f] rounded-[35px] p-8 shadow-2xl flex flex-col md:flex-row gap-8"
                >

                  {/* IMAGE */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-56 h-56 object-cover rounded-3xl"
                  />

                  {/* CONTENT */}

                  <div className="flex-1 flex flex-col justify-between">

                    <div>

                      <h2 className="text-4xl font-bold text-[#5b3b22] dark:text-white">

                        {item.name}

                      </h2>

                      <p className="mt-4 text-gray-500">

                        {item.description}

                      </p>

                    </div>

                    {/* QUANTITY */}

                    <div className="mt-8 flex items-center justify-between flex-wrap gap-6">

                      <div className="flex items-center gap-5">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              "decrease"
                            )
                          }
                          className="bg-[#5b3b22] text-white w-12 h-12 rounded-full text-2xl"
                        >

                          -

                        </button>

                        <span className="text-3xl font-bold dark:text-white">

                          {item.quantity}

                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              "increase"
                            )
                          }
                          className="bg-[#5b3b22] text-white w-12 h-12 rounded-full text-2xl"
                        >

                          +

                        </button>

                      </div>

                      <h1 className="text-4xl font-extrabold text-[#5b3b22] dark:text-white">

                        ₹
                        {item.price *
                          item.quantity}

                      </h1>

                    </div>

                    {/* REMOVE */}

                    <button
                      onClick={() =>
                        removeItem(
                          item._id
                        )
                      }
                      className="mt-6 bg-red-500 text-white py-3 rounded-2xl text-lg"
                    >

                      Remove Item

                    </button>

                  </div>

                </motion.div>

              ))}

            </div>

            {/* SUMMARY */}

            <div className="bg-white dark:bg-[#1f1f1f] rounded-[40px] p-10 shadow-2xl h-fit sticky top-32">

              <h1 className="text-4xl font-bold text-[#5b3b22] dark:text-white">

                Order Summary

              </h1>

              <div className="mt-10 space-y-6">

                <div className="flex justify-between">

                  <p className="text-xl text-gray-500">

                    Items

                  </p>

                  <p className="text-xl font-bold dark:text-white">

                    {cart.length}

                  </p>

                </div>

                <div className="flex justify-between">

                  <p className="text-xl text-gray-500">

                    Delivery

                  </p>

                  <p className="text-xl font-bold dark:text-white">

                    Free

                  </p>

                </div>

                <div className="border-t pt-6 flex justify-between">

                  <p className="text-2xl font-bold dark:text-white">

                    Total

                  </p>

                  <p className="text-3xl font-extrabold text-[#5b3b22] dark:text-white">

                    ₹{totalPrice}

                  </p>

                </div>

              </div>

              {/* CHECKOUT */}

              <button
                onClick={() =>
                  setShowPayment(true)
                }
                className="w-full mt-10 bg-[#5b3b22] text-white py-5 rounded-2xl text-xl font-semibold"
              >

                Proceed To Checkout

              </button>

            </div>

          </div>

        )}

      </div>

      {/* PAYMENT MODAL */}

      <AnimatePresence>

        {showPayment && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-6"
          >

            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              className="bg-white dark:bg-[#1f1f1f] w-full max-w-2xl rounded-[40px] p-10 shadow-2xl"
            >

              <div className="flex justify-between items-center">

                <h1 className="text-5xl font-bold text-[#5b3b22] dark:text-white">

                  Checkout

                </h1>

                <button
                  onClick={() =>
                    setShowPayment(false)
                  }
                  className="text-4xl text-gray-500"
                >

                  ×

                </button>

              </div>

              {/* METHODS */}

              <div className="grid grid-cols-3 gap-5 mt-10">

                {[

                  {

                    name: "Card",

                    icon: "💳",

                  },

                  {

                    name: "UPI",

                    icon: "📱",

                  },

                  {

                    name: "Cash",

                    icon: "💵",

                  },

                ].map((method) => (

                  <motion.button
                    key={method.name}
                    whileHover={{
                      y: -5,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() =>
                      setPaymentMethod(
                        method.name
                      )
                    }
                    className={`p-6 rounded-3xl border-2 transition-all ${
                      paymentMethod ===
                      method.name

                        ? "border-[#5b3b22] bg-[#5b3b22] text-white shadow-2xl"

                        : "border-gray-200 dark:border-[#2b2b2b] bg-gray-100 dark:bg-[#2b2b2b] dark:text-white"
                    }`}
                  >

                    <div className="text-5xl">

                      {method.icon}

                    </div>

                    <p className="mt-4 text-xl font-bold">

                      {method.name}

                    </p>

                  </motion.button>

                ))}

              </div>

              {/* PAY */}

              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full mt-10 bg-[#5b3b22] text-white py-5 rounded-2xl text-2xl font-semibold"
              >

                {loading

                  ? "Processing Payment..."

                  : `Pay ₹${totalPrice}`}

              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* SUCCESS */}

      <AnimatePresence>

        {showSuccess && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-6"
          >

            <motion.div
              initial={{
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.7,
                opacity: 0,
              }}
              className="bg-white dark:bg-[#1f1f1f] max-w-lg w-full rounded-[40px] p-12 text-center shadow-2xl"
            >

              <CheckCircle2
                size={120}
                className="mx-auto text-green-500"
              />

              <h1 className="mt-8 text-5xl font-extrabold text-[#5b3b22] dark:text-white">

                Payment Successful

              </h1>

              <p className="mt-6 text-xl text-gray-500">

                Your order has been placed successfully 🎉

              </p>

              <button
                onClick={() => {

                  setShowSuccess(false);

                  navigate(
                    "/track-orders"
                  );

                }}
                className="w-full mt-10 bg-[#5b3b22] text-white py-5 rounded-2xl text-2xl font-semibold"
              >

                Track Order

              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

}

export default Cart;