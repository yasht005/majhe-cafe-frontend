function Reservation() {

  return (

    <div className="min-h-screen bg-[#f8f1e7] pt-40 px-6">

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">

        <h1 className="text-5xl font-bold text-center text-[#5b3b22] mb-10">
          Reserve Your Table
        </h1>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none"
          />

          <input
            type="date"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none"
          />

          <input
            type="time"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none"
          />

          <select
            className="w-full border border-gray-300 p-4 rounded-xl outline-none"
          >

            <option>
              Number Of Guests
            </option>

            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5+ Guests</option>

          </select>

          <textarea
            placeholder="Special Request"
            rows="4"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none"
          ></textarea>

          <button
            className="w-full bg-[#5b3b22] text-white py-4 rounded-xl text-lg hover:opacity-90 transition"
          >
            Book Reservation
          </button>

        </form>

      </div>

    </div>

  )
}

export default Reservation