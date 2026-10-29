"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("2 BHK");
  const [enquiryStatus, setEnquiryStatus] = useState<"idle" | "success">("idle");

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const words = document.querySelectorAll(".hero-word span");
    words.forEach((w, i) => {
      gsap.to(w, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.15, ease: "power3.out" });
    });

    gsap.to(".hero-video", { scale: 1, duration: 2, ease: "power2.out" });

    const stats = document.querySelectorAll(".stat-value");
    stats.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0");
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(el, { innerText: target, duration: 2, snap: { innerText: 1 }, ease: "power2.out" });
        },
      });
    });

    ScrollTrigger.create({
      trigger: ".timeline",
      start: "top 70%",
      end: "bottom 30%",
      scrub: true,
      onUpdate: (self) => {
        const line = document.querySelector(".timeline-line") as HTMLElement;
        if (line) line.style.height = `${self.progress * 100}%`;
      },
    });

    return () => { lenis.destroy(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "test" }) });
    setEnquiryStatus("success");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-[family-name:var(--font-playfair)] text-xl">{siteConfig.brand}</span>
          <div className="hidden md:flex gap-8">
            {["Projects", "Amenities", "Location", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-[#f5f0e8]/70 hover:text-[#C9A24B] transition-colors">{l}</a>
            ))}
          </div>
          <a href="#contact" className="px-5 py-2 bg-[#C9A24B] text-[#0a0a0a] rounded-full text-sm font-semibold">Enquire Now</a>
        </div>
      </nav>

      <section className="hero" ref={heroRef}>
        <video className="hero-video" autoPlay muted loop playsInline poster="/media/hero-poster.jpg" style={{ transform: "scale(1.1)" }}>
          <source src="/media/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            {"Spaces That Rise Above".split(" ").map((w, i) => (
              <span key={i} className="hero-word inline-block overflow-hidden align-bottom mr-3">
                <span className="inline-block translate-y-full opacity-0">{w}</span>
              </span>
            ))}
          </h1>
          <p>Premium residences crafted for those who seek more than a home — a legacy.</p>
          <button className="hero-cta">Book a Site Visit</button>
        </div>
      </section>

      <section className="section">
        <div className="stats-grid">
          {siteConfig.stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-value" data-target={s.value}>0</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-full" id="projects">
        <div className="section">
          <h2 className="section-title">Featured Projects</h2>
        </div>
        <div className="projects-scroll">
          {siteConfig.projects.map((p, i) => (
            <div key={i} className="project-card">
              <img src={p.image} alt={p.name} width={420} height={300} />
              <div className="project-info">
                <div className="project-name">{p.name}</div>
                <div className="project-loc">{p.location} · {p.config}</div>
                <div className="project-price">{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="amenities">
        <h2 className="section-title">World-Class Amenities</h2>
        <div className="amenities-grid">
          {siteConfig.amenities.map((a, i) => (
            <div key={i} className="amenity">
              <div className="amenity-icon">✦</div>
              <div className="amenity-name">{a.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Floor Plans</h2>
        <div className="tabs">
          {Object.keys(siteConfig.floorPlans).map((t) => (
            <button key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>
        <img src={siteConfig.floorPlans[activeTab as keyof typeof siteConfig.floorPlans]} alt={activeTab} className="floorplan-img" />
      </section>

      <section className="section" id="location">
        <h2 className="section-title">Location Advantage</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {siteConfig.locations.map((l, i) => (
            <div key={i} className="text-center p-4 border border-[#f5f0e8]/10 rounded-lg">
              <div className="text-2xl mb-2">{l.icon}</div>
              <div className="text-sm">{l.name}</div>
              <div className="text-[#C9A24B] text-sm mt-1">{l.distance}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Construction Progress</h2>
        <div className="timeline mt-8">
          <div className="timeline-line" />
          {siteConfig.timeline.map((t, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">{t.year}</div>
              <div className="timeline-event">{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">What Our Residents Say</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {siteConfig.testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <h2 className="section-title">Enquire Now</h2>
        <div className="enquiry-grid mt-8">
          <div className="bg-[#f5f0e8]/5 rounded-lg h-64 md:h-auto flex items-center justify-center text-[#f5f0e8]/30">
            Image placeholder
          </div>
          <form className="enquiry-form" onSubmit={handleEnquiry}>
            <input type="text" placeholder="Your Name" required />
            <input type="tel" placeholder="Phone Number" required />
            <input type="email" placeholder="Email Address" required />
            <select><option>Interested In</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option></select>
            <textarea placeholder="Message" rows={4} />
            <button type="submit">Send Enquiry</button>
            {enquiryStatus === "success" && <p className="text-[#C9A24B] mt-2 text-sm">Thank you! We'll contact you soon.</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">{siteConfig.brand}</div>
            <p className="footer-text">{siteConfig.address}</p>
            <p className="footer-text mt-2">{siteConfig.phone} · {siteConfig.email}</p>
          </div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Projects</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">RERA: {siteConfig.rera}</a>
          </div>
        </div>
        <p className="footer-disclaimer">RERA Registration No: {siteConfig.rera}. This is not an offer. Prices subject to change. Images are artistic impressions.</p>
      </footer>
    </>
  );
}