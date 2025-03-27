// src/components/AvailableWorkers.jsx
import { Hammer, Wrench, Zap, Truck } from "lucide-react";
import plum from '../../assets/plum.webp';
import ele from '../../assets/elec.webp';
import jcb from '../../assets/jcb.webp';
import carp from '../../assets/carp.webp';
import Card from "./Card";
const AvailableWorkers = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-2xl font-bold mb-8">Available Workers</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card name="Carpenters" desc="Expert woodworkers for all your furniture and fitting needs." btntxt="Find Carpenters" img={carp} />
        <Card name="Plumbers" desc="Professional plumbers for all your pipe and fitting works." btntxt="Find Plumbers" img={plum} />
        <Card name="Electricians" desc="Skilled electricians for all electrical installations and repairs." btntxt="Find Electricians" img={ele} />
        <Card name="Vehicles & Equipment" desc="Various construction vehicles and equipment for rent." btntxt="Find Vehicles" img={jcb} />
      </div>
    </section>
  );
};

export default AvailableWorkers;
