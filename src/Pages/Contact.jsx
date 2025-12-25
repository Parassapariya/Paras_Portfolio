import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= AOS ================= */
  useEffect(() => {
    AOS.init({ once: true, duration: 900, easing: "ease-out-cubic" });
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending message...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      background: "#030014",
      color: "#fff",
    });

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/ekizulfarrachman@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _template: "table",
            _captcha: "false",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed");

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out. I’ll respond shortly.",
        confirmButtonColor: "#6366f1",
        background: "#030014",
        color: "#fff",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#6366f1",
        background: "#030014",
        color: "#fff",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      {/* HEADER */}
      <div className="text-center mt-12 mb-6 px-[5%]">
        <h2
          data-aos="fade-down"
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Contact Me
        </h2>
        <p
          data-aos="fade-up"
          className="text-gray-400 max-w-2xl mx-auto mt-2"
        >
          Have a project idea, collaboration, or opportunity?  
          Let’s connect.
        </p>
      </div>

      <section
        id="Contact"
        className="py-12 flex justify-center px-[5%]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 max-w-7xl w-full">

          {/* FORM */}
          <div
            data-aos="fade-right"
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/10"
          >
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white">
                  Get in Touch
                </h3>
                <p className="text-gray-400 mt-1">
                  I’m always open to discussing new ideas.
                </p>
              </div>
              <Share2 className="w-9 h-9 text-indigo-400 opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <div className="relative">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  aria-label="Name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-indigo-500/40 outline-none"
                />
              </div>

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  aria-label="Email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-indigo-500/40 outline-none"
                />
              </div>

              {/* MESSAGE */}
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="message"
                  aria-label="Message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full h-36 resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-indigo-500/40 outline-none"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 py-4 rounded-xl font-semibold text-white hover:scale-[1.02] transition disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
              <SocialLinks />
            </div>
          </div>

          {/* COMMENTS */}
          <div
            data-aos="fade-left"
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/10"
          >
            <Komentar />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
