import { Sliders, ShieldCheck, BarChart3 } from "lucide-react";
import CardSimple from "./CardSimple";

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 bg-[#E9F1FA] text-center">
      <h2 className="text-[27px] font-bold mb-8">Why Choose Us</h2>
      <p className="mb-10 text-lg text-gray-600">
        Experience the future of digital innovation
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CardSimple
          icon={Sliders}
          name="Smart Automation"
          desc="Streamline your workflow with intelligent automation tools."
        />
        <CardSimple
          icon={ShieldCheck}
          name="Enhanced Security"
          desc="Advanced protection for your sensitive data and privacy."
        />
        <CardSimple
          icon={BarChart3}
          name="Real-time Analytics"
          desc="Get instant insights with powerful analytics tools."
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;
