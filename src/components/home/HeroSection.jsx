import { motion } from "framer-motion";
import heroimg from "../../assets/heroimg1.jpg";
const HeroSection = () => {
  return (
    <section className="bg-[#E9F1FA] py-34 px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-60 items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Connect with Skilled <br /> Workers & Service Providers
        </h1>
        <p className="text-gray-600 mb-6">
          Your one-stop platform connecting contractors with skilled workers and vehicle/instrument owners. Get your work done efficiently and reliably.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Find Workers</button>
          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded hover:bg-blue-600 hover:text-white">Post a Job</button>
        </div>
      </div>
      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        height={400}
        width={450}
        src={heroimg}
        alt="Workers Hero"
        className="rounded shadow-md"
      />
    </section>
  );
};

export default HeroSection;
