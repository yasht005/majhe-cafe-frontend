import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

function Menu() {
  const [menu, setMenu] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sortBy, setSortBy] = useState("default");

  const [selectedItem, setSelectedItem] = useState(null);

  const [rating, setRating] = useState(0);

  const [quantity, setQuantity] = useState(1);

  /* FETCH MENU */

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu`);

      setMenu(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* LOAD MENU */

  useEffect(() => {
    const loadMenu = async () => {
      await fetchMenu();
    };

    loadMenu();
  }, []);

  /* CATEGORIES */

  const categories = [

  "All",

  ...new Set(

    menu
      .map((item) => item.category)
      .filter(Boolean)

  ),

];
  /* FILTER */

  let filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ? true : item.category === category;

    return matchesSearch && matchesCategory;
  });

  /* SORT */

  if (sortBy === "low-high") {
    filteredMenu.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high-low") {
    filteredMenu.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "a-z") {
    filteredMenu.sort((a, b) => a.name.localeCompare(b.name));
  }

  /* ADD TO CART */

  const addToCart = (item, qty = 1) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemExists = existingCart.find(
      (cartItem) => cartItem._id === item._id,
    );

    let updatedCart;

    if (itemExists) {
      updatedCart = existingCart.map((cartItem) =>
        cartItem._id === item._id
          ? {
              ...cartItem,

              quantity: cartItem.quantity + qty,
            }
          : cartItem,
      );
    } else {
      updatedCart = [
        ...existingCart,

        {
          ...item,

          quantity: Number(qty) || 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",

      JSON.stringify(updatedCart),
    );

    toast.success(`${item.name} added to cart`);
  };

  /* SUBMIT RATING */

  const submitRating = async () => {
    try {
      if (!rating) {
        alert("Please select rating");

        return;
      }

      if (!selectedItem?._id) {
        alert("Item not selected");

        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/menu/rate/${selectedItem._id}`,

        {
          rating: Number(rating),
        },
      );

      setMenu((prevMenu) =>
        prevMenu.map((item) =>
          item._id === selectedItem._id ? response.data : item,
        ),
      );

      toast.success("Thanks for rating!");

      setRating(0);
    } catch (error) {
      console.log(error);

      toast.error("Rating failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f1e7] to-[#ead7c3] dark:from-[#121212] dark:to-[#1b1b1b] pt-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-[#5b3b22] dark:text-white">
            Our Menu
          </h1>
        </div>

        {/* SEARCH + SORT */}

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-5 rounded-3xl bg-white dark:bg-[#1f1f1f] shadow-xl outline-none text-lg dark:text-white"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-5 rounded-3xl bg-white dark:bg-[#1f1f1f] shadow-xl outline-none text-lg dark:text-white"
          >
            <option value="default">Sort By</option>

            <option value="low-high">Price Low → High</option>

            <option value="high-low">Price High → Low</option>

            <option value="a-z">A → Z</option>
          </select>
        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-lg font-semibold transition-all ${
                category === cat
                  ? "bg-[#5b3b22] text-white"
                  : "bg-white dark:bg-[#1f1f1f] dark:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MENU ITEMS */}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-[#1f1f1f] rounded-[35px] overflow-hidden shadow-2xl animate-pulse"
              >
                <div className="w-full h-72 bg-gray-300 dark:bg-[#2a2a2a]" />

                <div className="p-8">
                  <div className="h-8 bg-gray-300 dark:bg-[#2a2a2a] rounded w-2/3 mb-6" />

                  <div className="h-4 bg-gray-300 dark:bg-[#2a2a2a] rounded mb-3" />

                  <div className="h-4 bg-gray-300 dark:bg-[#2a2a2a] rounded w-5/6 mb-8" />

                  <div className="flex justify-between items-center">
                    <div className="h-10 w-24 bg-gray-300 dark:bg-[#2a2a2a] rounded" />

                    <div className="h-12 w-36 bg-gray-300 dark:bg-[#2a2a2a] rounded-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredMenu.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{
                  y: -10,
                }}
                onClick={() => {
                  setSelectedItem(item);

                  setQuantity(1);
                }}
                className="bg-white dark:bg-[#1f1f1f] rounded-[35px] overflow-hidden shadow-2xl cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white">
                      {item.name}
                    </h2>

                    <span className="bg-[#5b3b22] text-white px-4 py-2 rounded-xl text-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* RATING */}

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">⭐</span>

                    <p className="font-semibold dark:text-white">
                      {item.averageRating?.toFixed(1) || "0.0"}
                    </p>

                    <p className="text-gray-500">
                      ({item.totalReviews} reviews)
                    </p>
                  </div>

                  <p className="mt-5 text-gray-500">{item.description}</p>

                  <div className="mt-8 flex justify-between items-center">
                    <h1 className="text-4xl font-extrabold text-[#5b3b22] dark:text-white">
                      ₹{item.price}
                    </h1>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        addToCart(item);
                      }}
                      className="bg-[#5b3b22] text-white px-6 py-3 rounded-2xl"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* FOOD DETAILS MODAL */}

      <AnimatePresence>
        {selectedItem && (
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
              className="bg-white dark:bg-[#1f1f1f] w-full max-w-5xl rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2">
                {/* IMAGE */}

                <div className="overflow-hidden">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}

                <div className="p-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-5xl font-extrabold text-[#5b3b22] dark:text-white">
                        {selectedItem.name}
                      </h1>

                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-yellow-500 text-2xl">⭐</span>

                        <p className="text-xl font-semibold dark:text-white">
                          {selectedItem.averageRating?.toFixed(1) || "0.0"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedItem(null);

                        setRating(0);
                      }}
                      className="text-3xl text-gray-500"
                    >
                      ×
                    </button>
                  </div>

                  <p className="mt-8 text-lg leading-relaxed text-gray-500">
                    {selectedItem.description}
                  </p>

                  <div className="mt-10 space-y-4 text-lg">
                    <p className="dark:text-white">🔥 Medium Roast</p>

                    <p className="dark:text-white">🥛 Fresh Ingredients</p>

                    <p className="dark:text-white">☕ Premium Quality</p>
                  </div>

                  <div className="mt-10 flex items-center gap-6">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="bg-[#5b3b22] text-white w-12 h-12 rounded-full text-2xl"
                    >
                      -
                    </button>

                    <span className="text-3xl font-bold dark:text-white">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-[#5b3b22] text-white w-12 h-12 rounded-full text-2xl"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-10">
                    <h1 className="text-5xl font-extrabold text-[#5b3b22] dark:text-white">
                      ₹{selectedItem.price * quantity}
                    </h1>
                  </div>

                  <div className="flex gap-3 mt-10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-5xl ${
                          rating >= star ? "text-yellow-500" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-10">
                    <button
                      onClick={() =>
                        addToCart(
                          selectedItem,

                          quantity,
                        )
                      }
                      className="flex-1 bg-[#5b3b22] text-white py-5 rounded-2xl text-xl font-semibold"
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={submitRating}
                      className="flex-1 border border-[#5b3b22] text-[#5b3b22] dark:text-white py-5 rounded-2xl text-xl font-semibold"
                    >
                      Submit Rating
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
