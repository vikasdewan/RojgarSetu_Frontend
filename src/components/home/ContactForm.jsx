// src/components/ContactForm.jsx

const ContactForm = () => {
    return (
      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>
        <form className="max-w-xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Name" className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <input type="email" placeholder="Email" className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <input type="text" placeholder="Subject" className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          <textarea placeholder="Message" rows="4" className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Send Message</button>
        </form>
      </section>
    );
  };
  
  export default ContactForm;
  