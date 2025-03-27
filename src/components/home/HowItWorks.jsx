import { UserPlus, Briefcase, Star } from "lucide-react";
import CardSimple from "./CardSimple";

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-white text-center">
      <h2 className="text-[27px] font-bold mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CardSimple
          name="Register & Complete Profile"
          desc="Create your account and complete your profile to start connecting with opportunities."
          icon={UserPlus}
        />
        <CardSimple
          name="Connect & Apply"
          desc="Browse through available jobs or post your requirements. Connect with the right people."
          icon={Briefcase}
        />
        <CardSimple
          name="Work & Get Rated"
          desc="Complete jobs successfully and build your reputation through ratings and reviews."
          icon={Star}
        />
      </div>
    </section>
  );
};

export default HowItWorks;
