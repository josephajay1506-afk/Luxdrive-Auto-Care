import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import { getUser } from "../utils/auth";
import Toast from "../components/Toast";
import API from "../api/axios";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Dashboard = ({ user, setUser }) => {
  const User = getUser();
  const navigate = useNavigate();
   /* Logout */

  const handleLogout = () => {
    logout();           // clear localStorage
    setUser(null);      // clear React state
    navigate("/login", { replace: true });
  };

  const [latestNotification, setLatestNotification] = useState(null);
  
  const fetchLatestNotification = async () => {
    try {
      const res = await API.get("/notifications/latest");
      setLatestNotification(res.data);
    } catch {
      console.log("No new notifications");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatestNotification();
    }, 10000); // every 10s

    return () => {
      clearInterval(interval);
    };
  }, []);

  // simple fade-in on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [toast, setToast] = useState("");
  const [lastChecked, setLastChecked] = useState(
  localStorage.getItem("lastChecked") || new Date().toISOString());

  useEffect(() => {
  const checkNewNotifications = async () => {
    try {
      const res = await API.get("/notifications/unread-latest");

      if (res.data && res.data.createdAt > lastChecked) {
        setToast(res.data.message);
        setLastChecked(res.data.createdAt);
        localStorage.setItem("lastChecked", res.data.createdAt);

        setTimeout(() => setToast(""), 3000);
      }
    } catch (err) {
      console.log("Error checking new notifications", err);
    }
  };

  const interval = setInterval(checkNewNotifications, 10000);
  return () => clearInterval(interval);}, [lastChecked]);

  // =============== FETCH USER ===================
  useEffect(() => {

  const fetchUser = async () => {
    try {

      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setUser(res.data);

    } catch (err) {

      console.error("User fetch error:", err);

    }
  };

  fetchUser();

});

// ================= MEMBERSHIP BADGE =================

const getBadge = (membership) => {

  if (!membership) return null;

  // support both string and object membership
  const plan =
    typeof membership === "string"
      ? membership
      : membership.plan;

  if (!plan) return null;

  if (plan.includes("Imperial")) return "🥇";
  if (plan.includes("Prestige")) return "🥈";
  if (plan.includes("Select")) return "🥉";

  return null;
};

const badge = getBadge(user?.membership);

const sectionAnim = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] // smooth luxury easing
    }
  }
};

const containerAnim = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const cardAnim = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

  return (
    <div className="bg-black"> 
    {/* ================= PREMIUM NAVBAR ================= */} 
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-black/95 backdrop-blur-xl 
    border-b border-white/10 h-20 flex items-center justify-between px-2 py-2 mb-10 pt-4 pb-2 shadow-lg"> 
    <div className="max-w-9xl mx-auto w-full md:w-auto px-6 py-3 flex items-center justify-between"> 
      {/* LEFT: BRAND */} 
      <div className="flex items-center gap-4 mb-2 py-4 mr-5"> 
        <h1 className="text-lg md:text-2xl gap-4 font-semibold text-white whitespace-nowrap hover:text-yellow-400 transition">
          LuxDrive Auto Care 
        </h1>
      </div> 
      {/* CENTER NAV */} 
      <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-300"> 
        {[{ label : "Notifications 🔔", path: "/notifications" }, 
          { label : "Invoices 📄", path: "/invoices" }, 
          { label : "Membership 💎", path: "/membership" }, 
          { label : "Service Packages 🛠️", path: "/services" }, 
          { label : "Service Catalog 📑", path: "/service-catalog" }, 
          { label : "Offers 🎁", path: "/offers" }, 
          { label : "Tuning Stages⚡", path: "/tuning-stages" },
          { label : "Contact 📞", path: "/contact-us" }, 
          ].map((item) => ( <button key={item.path} onClick={() => navigate(item.path)} 
          className="relative group hover:text-white transition duration-300" > {item.label} 
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-orange-500 
          transition-all duration-300 group-hover:w-full">
          </span> 
        </button> ))} 
        {user?.role === "admin" && ( <button onClick={() => navigate("/admin")} 
        className="text-yellow-400 font-semibold hover:text-yellow-300 transition" > 
        Admin Panel 
        </button> )} 
        </nav> 
        {/* RIGHT USER */}
<div className="flex items-center gap-4 px-6 py-4">

  <div className="hidden sm:block text-right leading-tight">
    <p className="text-md text-gray-400">
      Welcome
    </p>

    <p className="text-white text-md font-semibold whitespace-nowrap">
      {user?.name}
    </p>
  </div>

{/* MEMBERSHIP BADGE */}
  {user?.membership.plan && (
    <span className="text-xl">
      {badge}
    </span>
  )}

  {/* PROFILE BUTTON */}
  <button
    onClick={() => navigate("/profile")}
    className="w-9 h-9 bg-white/10 hover:bg-white/20
    transition rounded-full flex items-center justify-center"
  >
    👤
  </button>

  {/* LOGOUT */}
  <button
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-md font-medium transition"
  >
    Logout
  </button>
</div>
</div>
                </header>

{toast && <Toast message={toast} />}

{latestNotification && !latestNotification.read && (
  <div className="bg-blue-900 text-white w-full md:w-auto px-6 py-3 rounded-lg mb-4 shadow animate-pulse">
    🔔 {latestNotification.message}
  </div>
)}

{/* HERO SECTION */}

<section
  variants={sectionAnim}
  initial="hidden"
  animate="visible"
  className="relative min-h-screen flex items-center justify-center text-center"
  style={{
    backgroundImage: "url('/luxury-car-bg.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

  <div className="absolute inset-0 bg-black/10"></div>

  <div className="relative z-10 w-full h-full flex items-center">

    <Motion.div
      variants={containerAnim}
      initial="hidden"
      animate="visible"
      className="text-left text-white w-full md:w-auto px-6 sm:px-10 md:px-8 lg:px-47 max-w-none md:max-w-xl lg:max-w-2xl py-32"
    >

      <Motion.h1
        variants={cardAnim}
        className="text-3xl sm:text-4xl md:text-4xl font-bold leading-tight whitespace-nowrap"
      >
        Exceptional Care for Exceptional Cars
      </Motion.h1>

      <Motion.p
        variants={cardAnim}
        className="mt-5 text-2xl sm:text-3xl font-semibold whitespace-nowrap"
      >
        Handled by Certified Luxury Car Experts
      </Motion.p>

      <Motion.p
        variants={cardAnim}
        className="mt-5 text-2xl sm:text-3xl font-semibold whitespace-nowrap"
      >
        Experience the Difference Today
      </Motion.p>

      <Motion.p
        variants={cardAnim}
        className="mt-6 text-base sm:text-lg text-gray-300 max-w-md whitespace-nowrap"
      >
        Premium service experience crafted exclusively for high-end luxury vehicles.
      </Motion.p>

      <Motion.div
        variants={cardAnim}
        className="mt-8 flex gap-4"
      >
        <button
          onClick={() => navigate("/add-booking")}
          className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition hover:scale-105"
        >
          Book Service
        </button>

        <button
          onClick={() => navigate("/service-catalog")}
          className="border border-white w-full md:w-auto px-6 py-3 rounded-lg hover:bg-white hover:text-black transition hover:scale-105"
        >
          Explore Services
        </button>
      </Motion.div>

    </Motion.div>

  </div>

</section>

{/* PARTNERS & BRANDS SECTION */}

<Motion.section
  variants={sectionAnim}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="bg-black py-20 w-full md:w-auto px-6"
>

  <div className="max-w-7xl mx-auto text-white">

    {/* PARTNERS TITLE */}

    <Motion.div variants={cardAnim} className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-3">Our Signature Partnerships</h2>
      <p className="text-gray-400">
        An exclusive service collaboration with leading luxury automobile brands
      </p>
    </Motion.div>


    {/* PARTNER LOGOS */}

    <Motion.div
      variants={containerAnim}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20"
    >

      {[
        "/logos/bmw.png",
        "/logos/audi.png",
        "/logos/mercedes.png",
        "/logos/vw.png"
      ].map((logo, index) => (

        <Motion.div
          key={index}
          variants={cardAnim}
          whileHover={{ scale: 1.06 }}
          className="min-w-[220px] bg-white/10 backdrop-blur-lg border border-white/10 
          rounded-2xl p-10 flex items-center justify-center 
          shadow-xl hover:shadow-white/50 hover:border-white transition"
        >

          <img
            src={logo}
            alt="Partner Logo"
            className="h-20 w-auto object-contain"
          />

        </Motion.div>

      ))}
    </Motion.div>


    {/* BRANDS WE SERVICE */}

    <Motion.div variants={cardAnim} className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-3">Brands We Master</h2>
      <p className="text-gray-400">
        Expertise across the world’s most prestigious automobile manufacturers
      </p>
    </Motion.div>


    <Motion.div
      variants={containerAnim}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8"
    >

      {[
        "/logos/bentley.png",
        "/logos/lamborghini.png",
        "/logos/porsche.png",
        "/logos/ferrari.png",
        "/logos/landrover.png",
        "/logos/jaguar.png",
        "/logos/volvo.png",
        "/logos/lexus.png",
        "/logos/honda.png",
        "/logos/toyota.png",
        "/logos/hyundai.png",
        "/logos/mini.png",
        "/logos/jeep.png",
        "/logos/kia.png",
        "/logos/skoda.png",
        "/logos/ford.png",
      ].map((logo, index) => (

        <Motion.div
          key={index}
          variants={cardAnim}
          whileHover={{ scale: 1.06 }}
          className="min-w-[220px] bg-white/10 backdrop-blur-lg border border-white/10 
          rounded-2xl p-10 flex items-center justify-center 
          shadow-xl hover:shadow-white/50 hover:border-white transition"
        >

          <img
            src={logo}
            alt="Brand Logo"
            className="h-20 w-auto object-contain"
          />

        </Motion.div>

      ))}

    </Motion.div>

  </div>

</Motion.section>

{/* ================= SEO LANDING SECTION ================= */}

<Motion.section
  variants={sectionAnim}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="relative z-10 px-6 py-14 text-white bg-black"
>

<div className="max-w-7xl mx-auto">

{/* SECTION TITLE */}

<Motion.div
  variants={cardAnim}
  className="text-center mb-10"
>

<h2 className="text-3xl md:text-4xl font-bold mb-6">
The <span className="text-blue-400">LuxDrive</span> Advantage
</h2>

<p className="text-gray-400 max-w-3xl mx-auto text-md">
Precision Diagnostics. Performance Engineering. Expert Craftsmanship. Luxury Care.
</p>

</Motion.div>


{/* FEATURES GRID */}

<Motion.div
  variants={containerAnim}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
>


{/* OUR EXPERTISE */}

<Motion.div
  variants={cardAnim}
  whileHover={{ scale: 1.06 }}
  className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl transition hover:shadow-white/50 hover:border-white"
>

<h3 className="text-xl font-semibold mb-4">Our Expertise</h3>

<p className="text-gray-400 text-md leading-relaxed">
Our team specializes in servicing high-end luxury vehicles including
BMW, Mercedes-Benz, Audi, Porsche, and other premium brands with
precision engineering and advanced diagnostics.
</p>

</Motion.div>


{/* LUXURY WORKSHOP */}

<Motion.div
  variants={cardAnim}
  whileHover={{ scale: 1.06 }}
  className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl transition hover:shadow-white/50 hover:border-white"
>

<h3 className="text-xl font-semibold mb-4">Luxury Workshop</h3>

<p className="text-gray-400 text-md leading-relaxed">
Our state-of-the-art luxury workshop is equipped with modern diagnostic
equipment, advanced service bays, and dedicated detailing areas built
to handle the world’s most prestigious vehicles.
</p>

</Motion.div>


{/* CERTIFIED TECHNICIANS */}

<Motion.div
  variants={cardAnim}
  whileHover={{ scale: 1.06 }}
  className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl transition hover:shadow-white/50 hover:border-white"
>

<h3 className="text-xl font-semibold mb-4">Certified Technicians</h3>

<p className="text-gray-400 text-md leading-relaxed">
Our certified technicians undergo continuous training to stay ahead
of modern automotive technology, ensuring every service meets
manufacturer-level standards.
</p>

</Motion.div>


{/* GENUINE PARTS */}

<Motion.div
  variants={cardAnim}
  whileHover={{ scale: 1.06 }}
  className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl transition hover:shadow-white/50 hover:border-white"
>

<h3 className="text-xl font-semibold mb-4">Genuine Parts</h3>

<p className="text-gray-400 text-md leading-relaxed">
We use only genuine OEM parts and premium accessories to maintain
the performance, safety, and long-term reliability of your luxury
vehicle.
</p>

</Motion.div>


{/* SERVICE WARRANTY */}

<Motion.div
  variants={cardAnim}
  whileHover={{ scale: 1.06 }}
  className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl transition hover:shadow-white/50 hover:border-white"
>

<h3 className="text-xl font-semibold mb-4">Service Warranty & Quality Guarantee</h3>

<p className="text-gray-400 text-md leading-relaxed">
All services and replacement parts at LuxDrive 
come with a comprehensive warranty and quality 
guarantee for complete peace of mind.
</p>

</Motion.div>


{/* PERFORMANCE ENGINEERING */}

<Motion.div
  variants={cardAnim}
  whileHover={{ scale: 1.06 }}
  className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl transition hover:shadow-white/50 hover:border-white"
>

<h3 className="text-xl font-semibold mb-4">Performance Engineering</h3>

<p className="text-gray-400 text-md leading-relaxed">
From ECU tuning and performance upgrades to precision optimization,
our specialists enhance power, responsiveness, and driving experience
for luxury and performance vehicles.
</p>

</Motion.div>


</Motion.div>

</div>

</Motion.section>

{/* ================= REVIEWS SECTION ================= */}

<Motion.section
  variants={sectionAnim}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="bg-black py-6 w-full md:w-auto px-6"
>
  <div className="max-w-7xl mx-auto text-white">

    {/* Section Title */}
    <Motion.div variants={cardAnim} className="text-center mb-14">
      <h2 className="text-4xl font-bold mb-3">
        A Legacy of Trust & Satisfaction
      </h2>
      <p className="text-gray-400">
        Where excellence meets customer satisfaction.
      </p>
    </Motion.div>


    {/* Reviews Grid */}

    <Motion.div
      variants={sectionAnim}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >

{/* Review Card 1 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-yellow-400 text-xl mb-4">★★★★★</div>

<p className="text-gray-200 mb-4">
Exceptional service and professional staff. Now my BMW feels brand new again.
</p>

<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
A
</div>

<div>
<p className="font-semibold">Arjun Ramesh</p>
<p className="text-sm text-gray-400">BMW X5</p>
</div>
</div>
</Motion.div>


{/* Review Card 2 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-yellow-400 text-xl mb-4">★★★★★</div>

<p className="text-gray-200 mb-4">
Luxury service at its best. Pick-up and drop facility is super convenient.
</p>

<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
S
</div>

<div>
<p className="font-semibold">Neha Samuel</p>
<p className="text-sm text-gray-400">Audi A6</p>
</div>
</div>
</Motion.div>


{/* Review Card 3 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-yellow-400 text-xl mb-4">★★★★★</div>

<p className="text-gray-200 mb-4">
Highly skilled technicians with transparent pricing and timely delivery.
</p>

<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold">
R
</div>

<div>
<p className="font-semibold">Rahul</p>
<p className="text-sm text-gray-400">Mercedes-Benz C Class</p>
</div>
</div>
</Motion.div>


{/* Review Card 4 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-yellow-400 text-xl mb-4">★★★★★</div>

<p className="text-gray-200 mb-4">
Best luxury car workshop with professionally trained staff and genuine parts.
</p>

<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">
K
</div>

<div>
<p className="font-semibold">Sanjana</p>
<p className="text-sm text-gray-400">Jaguar XF</p>
</div>
</div>
</Motion.div>


{/* Review Card 5 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-yellow-400 text-xl mb-4">★★★★★</div>

<p className="text-gray-200 mb-4">
Impressed with their diagnostics and detailing service. Clean workshop.
</p>

<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center font-bold">
P
</div>

<div>
<p className="font-semibold">Karthick</p>
<p className="text-sm text-gray-400">Porsche Macan</p>
</div>
</div>
</Motion.div>


{/* Review Card 6 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-yellow-400 text-xl mb-4">★★★★★</div>

<p className="text-gray-200 mb-4">
From booking to delivery everything was smooth. Customer service is top-class.
</p>

<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center font-bold">
M
</div>

<div>
<p className="font-semibold">Priyadharshini</p>
<p className="text-sm text-gray-400">Volvo XC60</p>
</div>
</div>
</Motion.div>

</Motion.div>
</div>
</Motion.section>


{/* ================= TRUST & GOOGLE REVIEWS ================= */}

<Motion.section
variants={sectionAnim}
initial="hidden"
whileInView="visible"
viewport={{ once: true }}
className="bg-black py-16 w-full md:w-auto px-6"
>

<div className="max-w-7xl mx-auto text-center text-white">

<Motion.div variants={cardAnim} className="text-yellow-400 text-3xl mb-4">
★★★★★
</Motion.div>

<Motion.h2 variants={cardAnim} className="text-3xl font-bold mb-2">
Highly Rated by Verified Luxury Car Owners
</Motion.h2>

<Motion.p variants={cardAnim} className="text-gray-400 mb-10">
Admired by satisfied luxury car owners across the city.
</Motion.p>


{/* Google Badge */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.08 }}
className="flex justify-center mb-12"
>

<div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-6 py-3 shadow-lg hover:shadow-white/50 hover:border-white">

<img
src="/images/google.png"
alt="Google Reviews"
className="w-10 h-10"
/>

<div className="text-left">
<p className="font-semibold">Google Reviews</p>
<p className="text-yellow-400">★★★★★ 4.8 Rating</p>
</div>

</div>
</Motion.div>


{/* Trust Badges */}

<Motion.div
variants={sectionAnim}
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
>

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-4xl mb-4">🏅</div>
<h3 className="text-xl font-semibold mb-2">ISO Certified</h3>
<p className="text-gray-400">
Certified workshop following international quality standards.
</p>
</Motion.div>


<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-4xl mb-4">⏳</div>
<h3 className="text-xl font-semibold mb-2">10+ Years Experience</h3>
<p className="text-gray-400">
Over a decade of luxury car servicing expertise.
</p>
</Motion.div>


<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<div className="text-4xl mb-4">🚨</div>
<h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
<p className="text-gray-400">
Emergency support and roadside assistance anytime.
</p>
</Motion.div>

</Motion.div>

</div>
</Motion.section>

{/* ================= LUXURY SERVICES SECTION ================= */}

<Motion.section
  variants={sectionAnim}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="bg-black px-12 py-16"
>

<div className="max-w-7xl mx-auto">

{/* SECTION HEADER */}

<Motion.div
variants={cardAnim}
className="text-center mb-16"
>

<h2 className="text-4xl font-bold text-gray-300 mb-4">
LuxDrive's Automotive Services
</h2>

<p className="text-lg text-gray-300">
Performance. Comfort. Excellence —— Perfected.
</p>

<p className="text-gray-400 text-center mt-4">
Premium automotive care designed to maintain performance, enhance comfort,
and preserve the luxury of your vehicle.
</p>

</Motion.div>


{/* SERVICES GRID */}

<Motion.div
variants={sectionAnim}
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
>

{/* Card 1 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">🛠️ Complete Car Servicing</h3>
<p className="text-gray-300">
Comprehensive maintenance using OEM approved parts and advanced diagnostics to ensure peak vehicle performance.
</p>
</Motion.div>


{/* Card 2 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">💻 Advanced Diagnostics & Coding</h3>
<p className="text-gray-300">
State-of-the-art computerized fault detection, ECU scanning, software updates, and luxury vehicle coding.
</p>
</Motion.div>


{/* Card 3 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">🎨 Dent & Paint Restoration</h3>
<p className="text-gray-300">
Precision dent removal and color matched paintwork restoring your vehicle’s flawless factory finish.
</p>
</Motion.div>


{/* Card 4 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">❄️ A/C Maintenance & Repair</h3>
<p className="text-gray-300">
Complete air conditioning diagnostics, gas refill, and cooling optimization for superior cabin comfort.
</p>
</Motion.div>


{/* Card 5 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">✨ Interior & Exterior Detailing</h3>
<p className="text-gray-300">
Deep interior cleaning, leather conditioning, polishing, and engine bay detailing for showroom finish.
</p>
</Motion.div>


{/* Card 6 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">💡 Lighting & Infotainment</h3>
<p className="text-gray-300">
LED lighting upgrades, ambient lighting customization, and infotainment enhancements.
</p>
</Motion.div>


{/* Card 7 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">🛡️ Ceramic Coating & PPF</h3>
<p className="text-gray-300">
Durable ceramic coatings and paint protection film preserving gloss and paint quality.
</p>
</Motion.div>


{/* Card 8 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">🏎 Performance Upgrades & Tuning</h3>
<p className="text-gray-300">
Engine tuning, exhaust upgrades, and performance calibration for enhanced driving experience.
</p>
</Motion.div>


{/* Card 9 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">🛞 Brake & Suspension Service</h3>
<p className="text-gray-300">
Brake servicing, suspension tuning, and precision alignment for safety and handling.
</p>
</Motion.div>


{/* Card 10 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">🧰 Accessories & Customization</h3>
<p className="text-gray-300">
Premium accessories and styling upgrades enhancing luxury and comfort.
</p>
</Motion.div>


{/* Card 11 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">🔋 Battery & Electrical Systems</h3>
<p className="text-gray-300">
Battery replacement with coding, sensor calibration, and electrical diagnostics.
</p>
</Motion.div>


{/* Card 12 */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-xl font-semibold mb-3">🚗 Pickup, Drop & Concierge</h3>
<p className="text-gray-300">
Convenient vehicle pickup and delivery with real time service updates.
</p>
</Motion.div>

</Motion.div>

</div>
</Motion.section>

{/* ================= USER DASHBOARD ================= */}

<Motion.section
  variants={sectionAnim}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="bg-black py-24 px-24"
>

<div className="max-w-7xl mx-auto">

{/* SECTION HEADER */}

<Motion.div
variants={cardAnim}
className="text-center"
>

<h2 className="text-4xl font-bold text-gray-300 mb-2">
Your Luxury Service Hub
</h2>

<p className="text-lg text-gray-300 mt-4">
Vehicles. Services. Privileges — Unified.
</p>

<p className="text-lg text-gray-400 mt-2">
All your vehicles, services, and privileges — perfectly organized in one place.
</p>

</Motion.div>


{/* DASHBOARD GRID */}

<Motion.div
variants={sectionAnim}
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 py-6"
>


{/* My Garage */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">My Garage 🚗</h3>
<p className="text-gray-300 mb-4">
View and manage your registered cars.
</p>
<button
onClick={() => navigate("/vehicles")}
className="text-blue-400 font-medium hover:underline"
>
View Vehicles →
</button>
</Motion.div>


{/* Service Bookings */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Service Bookings 📋</h3>
<p className="text-gray-300 mb-4">
Track your service appointments.
</p>
<button
onClick={() => navigate("/bookings")}
className="text-blue-400 font-medium hover:underline"
>
View Service Bookings →
</button>
</Motion.div>


{/* My Profile */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">My Profile 👤</h3>
<p className="text-gray-300 mb-4">
View and update your account details.
</p>
<button
onClick={() => navigate("/profile")}
className="text-blue-400 font-medium hover:underline"
>
View Profile →
</button>
</Motion.div>


{/* Register Vehicle */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Register Vehicle ➕</h3>
<p className="text-gray-300 mb-4">
Register a new vehicle to your account.
</p>
<button
onClick={() => navigate("/add-vehicle")}
className="text-blue-400 font-medium hover:underline"
>
Add Vehicle →
</button>
</Motion.div>


{/* Book Service */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Book Service 🛠️</h3>
<p className="text-gray-300 mb-4">
Book a new service for your vehicle.
</p>
<button
onClick={() => navigate("/add-booking")}
className="text-blue-400 font-medium hover:underline"
>
Add Service Booking →
</button>
</Motion.div>


{/* Invoices */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Invoices 🧾</h3>
<p className="text-gray-300 mb-4">
Download and manage your service invoices.
</p>
<button
onClick={() => navigate("/invoices")}
className="text-blue-400 font-medium hover:underline"
>
View Invoices →
</button>
</Motion.div>


{/* Notifications */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Notifications 🔔</h3>
<p className="text-gray-300 mb-4">
Stay updated with service alerts and reminders.
</p>
<button
onClick={() => navigate("/notifications")}
className="text-blue-400 font-medium hover:underline"
>
View Notifications →
</button>
</Motion.div>


{/* Membership */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Membership 💎</h3>
<p className="text-gray-300 mb-4">
Explore our exclusive membership plans.
</p>
<button
onClick={() => navigate("/membership")}
className="text-blue-400 font-medium hover:underline"
>
View Membership →
</button>
</Motion.div>

{/* Service Packages */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Service Packages 📦</h3>
<p className="text-gray-300 mb-4">
Explore our signature service packages.
</p>
<button
onClick={() => navigate("/services")}
className="text-blue-400 font-medium hover:underline"
>
View Service Packages→
</button>
</Motion.div>


{/* Service Catalog */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Service Catalog 📑</h3>
<p className="text-gray-300 mb-4">
Explore our exclusive service catalog.
</p>
<button
onClick={() => navigate("/service-catalog")}
className="text-blue-400 font-medium hover:underline"
>
View Catalog →
</button>
</Motion.div>


{/* Accessories */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Accessories 🛠️</h3>
<p className="text-gray-300 mb-4">
Explore our premium accessories collection.
</p>
<button
onClick={() => navigate("/accessories")}
className="text-blue-400 font-medium hover:underline"
>
View Accessories →
</button>
</Motion.div>

{/* Tuning Stages */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Tuning Stages 🏎️</h3>
<p className="text-gray-300 mb-4">
Explore our performance tuning stages.
</p>
<button
onClick={() => navigate("/tuning-stages")}
className="text-blue-400 font-medium hover:underline"
>
View Tuning Stages →
</button>
</Motion.div>

{/* Service History */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Service History 📄</h3>
<p className="text-gray-300 mb-4">
View all your vehicles and their service history.
</p>
<button
onClick={() => navigate("/service-history")}
className="text-blue-400 font-medium hover:underline"
>
View History →
</button>
</Motion.div>


{/* Offers */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">Offers 🎁</h3>
<p className="text-gray-300 mb-4">
Exclusive discounts & seasonal deals.
</p>
<button
onClick={() => navigate("/offers")}
className="text-blue-400 font-medium hover:underline"
>
View Offers →
</button>
</Motion.div>


{/* About Us */}

<Motion.div
variants={cardAnim}
whileHover={{ scale: 1.06 }}
className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:shadow-white/50 hover:border-white"
>
<h3 className="text-lg font-semibold mb-2">About Us 🌟</h3>
<p className="text-gray-300 mb-4">
Discover our commitment to luxury excellence.
</p>
<button
onClick={() => navigate("/about-us")}
className="text-blue-400 font-medium hover:underline"
>
About Us →
</button>
</Motion.div>


</Motion.div>

</div>
</Motion.section>

{/* ================= CONTACT US SECTION ================= */}

<Motion.section
  variants={sectionAnim}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="bg-black py-6 px-4"
>
  <div className="max-w-7xl mx-auto text-center text-white">

    {/* Section Title */}

    <Motion.div variants={cardAnim}>
      <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
      <p className="text-gray-400 mb-10">
        We are here to assist you with premium luxury car services
      </p>
    </Motion.div>

    {/* Contact Grid */}

    <Motion.div
      variants={sectionAnim}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >

      {/* Phone */}

      <Motion.div
        variants={cardAnim}
        whileHover={{ scale: 1.06 }}
        className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
      >
        <div className="text-4xl mb-3">📞</div>
        <h3 className="text-xl font-semibold mb-2">Phone</h3>
        <p className="text-gray-300">+91 97891 82816</p>
        <p className="text-gray-500 text-sm mt-1">
          Mon - Sat (9AM to 8PM)
        </p>
      </Motion.div>

      {/* Email */}

      <Motion.div
        variants={cardAnim}
        whileHover={{ scale: 1.06 }}
        className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
      >
        <div className="text-4xl mb-3">📧</div>
        <h3 className="text-xl font-semibold mb-2">Email</h3>
        <p className="text-gray-300">support@luxdriveautocare.com</p>
        <p className="text-gray-500 text-sm mt-1">
          24/7 Online Support
        </p>
      </Motion.div>

      {/* Location */}

      <Motion.div
        variants={cardAnim}
        whileHover={{ scale: 1.06 }}
        className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white"
      >
        <div className="text-4xl mb-3">📍</div>
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <p className="text-gray-300">Chennai, Tamil Nadu</p>
        <p className="text-gray-500 text-sm mt-1">
          Premium Service Center
        </p>
      </Motion.div>

    </Motion.div>

    {/* Footer */}

    <Motion.p
      variants={cardAnim}
      className="mt-12 text-gray-500 text-sm"
    >
      © {new Date().getFullYear()} LuxDrive Signature Auto Care. All rights reserved.
    </Motion.p>

  </div>
</Motion.section>

</div>

  );
};

export default Dashboard;
