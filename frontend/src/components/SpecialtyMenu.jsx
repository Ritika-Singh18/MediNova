const specialities = [

  {
    name: "General Physician",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
  },

  {
    name: "Gynecologist",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f"
  },

  {
    name: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
  },

  {
    name: "Pediatrician",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309"
  },

  {
    name: "Neurologist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7"
  },

  {
    name: "Gastroenterologist",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
  },

  {
    name: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d"
  },

  {
    name: "Orthopedic",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514"
  },

  {
    name: "ENT Specialist",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99"
  },

  {
    name: "Psychiatrist",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
  },

  {
    name: "Urologist",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54"
  },

  {
    name: "Ophthalmologist",
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322"
  }

]

function SpecialtyMenu() {

  return (

    <section className="relative overflow-hidden py-24 bg-[#F5F7FF]">

      {/* Background Glow Effects */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}

        <h1 className="text-5xl font-bold text-center text-slate-800">

          Explore Medical Specialities

        </h1>

        <p className="text-center text-slate-500 mt-5 text-lg max-w-3xl mx-auto leading-relaxed">

          Connect with experienced healthcare specialists
          across multiple medical fields and book
          appointments seamlessly.

        </p>

        {/* Speciality Grid */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mt-20">

          {
            specialities.map((item, index) => (

              <div
                key={index}
                className="group bg-white/80 backdrop-blur-lg border border-white/20 p-5 rounded-[30px] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-500 cursor-pointer"
              >

                {/* Image */}

                <div className="overflow-hidden rounded-full w-28 h-28 mx-auto border-4 border-indigo-100 shadow-md">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                </div>

                {/* Title */}

                <h2 className="mt-6 text-center font-semibold text-slate-700 text-lg leading-snug">

                  {item.name}

                </h2>

              </div>

            ))
          }

        </div>

      </div>

    </section>

  )

}

export default SpecialtyMenu