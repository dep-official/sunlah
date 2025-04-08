'use client';

export function ContactForm() {
  return (
    <section className="mt-20">
      <h2 className="text-xl mb-8">Enquiry</h2>
      <form className="space-y-6">
        <div>
          <input 
            type="text" 
            placeholder="Name"
            className="w-full border-b border-black p-2 outline-none"
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email"
            className="w-full border-b border-black p-2 outline-none"
          />
        </div>
        <div>
          <textarea 
            placeholder="Message"
            className="w-full border-b border-black p-2 outline-none resize-none h-32"
          />
        </div>
        <button 
          type="submit"
          className="text-lg hover:opacity-70 transition-opacity"
        >
          Send
        </button>
      </form>
    </section>
  );
} 