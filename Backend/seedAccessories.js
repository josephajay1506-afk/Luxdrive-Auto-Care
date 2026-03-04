const mongoose = require("mongoose");
require("dotenv").config();

const Accessory = require("./models/Accessory");

/* ================= ACCESSORY DATA ================= */

const accessories = [

/* ================= 🧰 Essential Accessories ================= */

{ name: "All-Weather Car Body Cover", description: "Heavy-duty weather resistant outdoor protection cover.", minPrice: 2500, maxPrice: 12000, category: "🧰 Essential Accessories" },
{ name: "Indoor Dust Protection Cover", description: "Soft stretch indoor dust protection cover.", minPrice: 3500, maxPrice: 18000, category: "🧰 Essential Accessories" },
{ name: "Magnetic Sun Shades", description: "Custom-fit UV protection magnetic sun shades.", minPrice: 2500, maxPrice: 9500, category: "🧰 Essential Accessories" },
{ name: "Anti-Slip Dashboard Mat", description: "Premium anti-slip dashboard surface protector.", minPrice: 1200, maxPrice: 4500, category: "🧰 Essential Accessories" },
{ name: "Trunk Organizer System", description: "Modular heavy-duty trunk storage organizer.", minPrice: 2500, maxPrice: 15000, category: "🧰 Essential Accessories" },
{ name: "Collapsible Storage Box", description: "Foldable premium storage box for boot organization.", minPrice: 1500, maxPrice: 8500, category: "🧰 Essential Accessories" },
{ name: "Emergency Triangle Kit", description: "Reflective roadside emergency warning triangle kit.", minPrice: 800, maxPrice: 3500, category: "🧰 Essential Accessories" },
{ name: "Fire Extinguisher (Automotive Grade)", description: "Compact automotive fire safety extinguisher.", minPrice: 1800, maxPrice: 8500, category: "🧰 Essential Accessories" },
{ name: "First Aid Medical Kit", description: "Comprehensive automotive first aid safety kit.", minPrice: 1200, maxPrice: 6500, category: "🧰 Essential Accessories" },
{ name: "Tyre Inflator (Portable Digital)", description: "Digital air compressor with pressure display.", minPrice: 2500, maxPrice: 12500, category: "🧰 Essential Accessories" },
{ name: "Puncture Repair Kit", description: "Complete tubeless tyre repair kit.", minPrice: 800, maxPrice: 4500, category: "🧰 Essential Accessories" },
{ name: "Car Vacuum Cleaner", description: "High suction portable car vacuum system.", minPrice: 2500, maxPrice: 22000, category: "🧰 Essential Accessories" },
{ name: "Microfiber Cleaning Kit", description: "Premium microfiber detailing cleaning kit.", minPrice: 900, maxPrice: 5500, category: "🧰 Essential Accessories" },
{ name: "Seat Belt Cushions", description: "Comfort padding for seat belt straps.", minPrice: 600, maxPrice: 3500, category: "🧰 Essential Accessories" },
{ name: "Armrest Cushion Pad", description: "Premium memory foam armrest comfort pad.", minPrice: 1200, maxPrice: 6500, category: "🧰 Essential Accessories" },
{ name: "Door Handle Scratch Protector", description: "Transparent protective film for door handles.", minPrice: 800, maxPrice: 4500, category: "🧰 Essential Accessories" },
{ name: "Scratch Guard Film for Door Cups", description: "Anti-scratch protection film for door cups.", minPrice: 1200, maxPrice: 6500, category: "🧰 Essential Accessories" },
{ name: "Fuel Cap Cover (Carbon Finish)", description: "Carbon fiber styled fuel cap enhancement.", minPrice: 1500, maxPrice: 7500, category: "🧰 Essential Accessories" },
{ name: "Rain Repellent Windshield Treatment", description: "Hydrophobic windshield water repellent coating.", minPrice: 1500, maxPrice: 6500, category: "🧰 Essential Accessories" },
{ name: "Window Chrome Garnish", description: "Premium chrome window trim garnish set.", minPrice: 3500, maxPrice: 18500, category: "🧰 Essential Accessories" },

/* ================= ✨ Interior Luxury Enhancements ================= */

{ name: "Custom Nappa Leather Seats", description: "Handcrafted premium Nappa leather upholstery.", minPrice: 125000, maxPrice: 450000, category: "✨ Interior Luxury Enhancements" },
{ name: "Diamond Stitch Upholstery", description: "Luxury diamond stitched seat customization.", minPrice: 85000, maxPrice: 325000, category: "✨ Interior Luxury Enhancements" },
{ name: "Suede / Alcantara Steering Wrap", description: "Premium suede steering wheel wrap upgrade.", minPrice: 15000, maxPrice: 65000, category: "✨ Interior Luxury Enhancements" },
{ name: "Carbon Fiber Interior Panels", description: "Real carbon fiber interior trim replacement.", minPrice: 45000, maxPrice: 225000, category: "✨ Interior Luxury Enhancements" },
{ name: "Brushed Aluminum Interior Trim", description: "OEM-style brushed aluminum interior finish.", minPrice: 35000, maxPrice: 165000, category: "✨ Interior Luxury Enhancements" },
{ name: "Wooden Luxury Trim Upgrade", description: "Premium wood interior trim conversion.", minPrice: 45000, maxPrice: 225000, category: "✨ Interior Luxury Enhancements" },
{ name: "Ambient Dashboard LED Strip", description: "Multi-color ambient dashboard lighting system.", minPrice: 18000, maxPrice: 85000, category: "✨ Interior Luxury Enhancements" },
{ name: "Multi-Zone Ambient Lighting Controller", description: "Advanced ambient lighting control module.", minPrice: 25000, maxPrice: 125000, category: "✨ Interior Luxury Enhancements" },
{ name: "Illuminated AC Vents", description: "Premium LED illuminated air vent upgrade.", minPrice: 35000, maxPrice: 145000, category: "✨ Interior Luxury Enhancements" },
{ name: "Custom Gear Knob (Crystal / Carbon)", description: "Luxury crystal or carbon gear selector upgrade.", minPrice: 15000, maxPrice: 85000, category: "✨ Interior Luxury Enhancements" },
{ name: "Electronic Parking Brake Retrofit", description: "OEM-style electronic parking brake system.", minPrice: 65000, maxPrice: 225000, category: "✨ Interior Luxury Enhancements" },
{ name: "Premium Roof Lining Conversion", description: "Alcantara or suede roof liner customization.", minPrice: 45000, maxPrice: 185000, category: "✨ Interior Luxury Enhancements" },
{ name: "Sound Insulation Damping Package", description: "Full cabin noise reduction insulation kit.", minPrice: 35000, maxPrice: 165000, category: "✨ Interior Luxury Enhancements" },
{ name: "Luxury Curtain System (Rear)", description: "Motorized premium rear curtain system.", minPrice: 45000, maxPrice: 185000, category: "✨ Interior Luxury Enhancements" },
{ name: "Rear Center Console Upgrade", description: "Luxury rear center console enhancement.", minPrice: 65000, maxPrice: 285000, category: "✨ Interior Luxury Enhancements" },
{ name: "Executive Folding Tables", description: "Rear executive folding work tables.", minPrice: 45000, maxPrice: 185000, category: "✨ Interior Luxury Enhancements" },
{ name: "Rear Seat Refrigerator Console", description: "Integrated luxury cooling refrigerator unit.", minPrice: 85000, maxPrice: 285000, category: "✨ Interior Luxury Enhancements" },
{ name: "VIP Lounge Seat Conversion", description: "Full executive rear lounge conversion.", minPrice: 285000, maxPrice: 950000, category: "✨ Interior Luxury Enhancements" },
{ name: "Memory Seat Retrofit", description: "OEM memory seat electronic integration.", minPrice: 65000, maxPrice: 225000, category: "✨ Interior Luxury Enhancements" },
{ name: "Soft Touch Dashboard Refinish", description: "Premium soft-touch dashboard refinishing.", minPrice: 35000, maxPrice: 165000, category: "✨ Interior Luxury Enhancements" },
{ name: "Crystal Interior Control Knobs", description: "Luxury crystal-finish interior control upgrades.", minPrice: 25000, maxPrice: 125000, category: "✨ Interior Luxury Enhancements" },
{ name: "Illuminated Speaker Grilles", description: "Ambient illuminated premium speaker grilles.", minPrice: 45000, maxPrice: 185000, category: "✨ Interior Luxury Enhancements" },
{ name: "Premium Starlight Roof (Custom Pattern)", description: "Custom fiber-optic starlight headliner installation.", minPrice: 95000, maxPrice: 325000, category: "✨ Interior Luxury Enhancements" },
{ name: "Personalized Embroidered Headrests", description: "Custom embroidered logo headrests.", minPrice: 15000, maxPrice: 65000, category: "✨ Interior Luxury Enhancements" },
{ name: "Customized Seat Belts (Color Match)", description: "Custom colored premium seat belt conversion.", minPrice: 25000, maxPrice: 95000, category: "✨ Interior Luxury Enhancements" },
{ name: "Custom Interior Branding Package", description: "Complete bespoke interior branding customization.", minPrice: 45000, maxPrice: 185000, category: "✨ Interior Luxury Enhancements" },
{ name: "VIP Privacy Partition System", description: "Luxury motorized rear privacy partition.", minPrice: 285000, maxPrice: 950000, category: "✨ Interior Luxury Enhancements" },
{ name: "Electric Rear Sunblind System", description: "Motorized rear sunblind retrofit system.", minPrice: 45000, maxPrice: 185000, category: "✨ Interior Luxury Enhancements" },
{ name: "Rear Seat Massage Upgrade", description: "Premium rear seat massage function retrofit.", minPrice: 85000, maxPrice: 325000, category: "✨ Interior Luxury Enhancements" },
{ name: "EV Interior Digital Theme Customization", description: "Digital instrument and UI theme customization for EVs.", minPrice: 18000, maxPrice: 85000, category: "✨ Interior Luxury Enhancements" },
{ name: "Bespoke Interior Leather Re-Trim", description: "Full cabin bespoke leather re-trim with custom stitching.", minPrice: 285000, maxPrice: 1250000, category: "✨ Interior Luxury Enhancements" },
{ name: "Executive Rear Lounge Console Upgrade", description: "Luxury executive rear console with digital controls.", minPrice: 185000, maxPrice: 650000, category: "✨ Interior Luxury Enhancements" },

/* ================= 🚀 Performance & Engine Bay ================= */

{ name: "Performance Air Filter Element", description: "High-flow reusable performance air filter upgrade.", minPrice: 3500, maxPrice: 18000, category: "🚀 Performance & Engine Bay" },
{ name: "High-Flow Panel Filter", description: "Drop-in high-flow panel filter for improved airflow.", minPrice: 2500, maxPrice: 12000, category: "🚀 Performance & Engine Bay" },
{ name: "Performance Spark Plug Set", description: "Iridium high-performance spark plug kit.", minPrice: 4500, maxPrice: 25000, category: "🚀 Performance & Engine Bay" },
{ name: "Performance Ignition Coils", description: "Upgraded high-output ignition coil pack.", minPrice: 12000, maxPrice: 65000, category: "🚀 Performance & Engine Bay" },
{ name: "Cold Air Induction System", description: "Performance cold air intake system for power gains.", minPrice: 18000, maxPrice: 95000, category: "🚀 Performance & Engine Bay" },
{ name: "Turbo Heat Shield", description: "Heat-resistant turbo shielding for thermal control.", minPrice: 8500, maxPrice: 35000, category: "🚀 Performance & Engine Bay" },
{ name: "Oil Breather System", description: "Performance crankcase ventilation upgrade.", minPrice: 6500, maxPrice: 35000, category: "🚀 Performance & Engine Bay" },
{ name: "Catch Can Installation", description: "Oil catch can system for cleaner engine performance.", minPrice: 12000, maxPrice: 55000, category: "🚀 Performance & Engine Bay" },
{ name: "Performance Timing Kit", description: "Upgraded high-strength timing system kit.", minPrice: 25000, maxPrice: 125000, category: "🚀 Performance & Engine Bay" },
{ name: "Lightweight Crank Pulley", description: "Reduced rotational mass pulley upgrade.", minPrice: 18000, maxPrice: 85000, category: "🚀 Performance & Engine Bay" },
{ name: "ECU Stage 1 Calibration", description: "Optimized ECU remap for improved power and torque.", minPrice: 25000, maxPrice: 65000, category: "🚀 Performance & Engine Bay" },
{ name: "ECU Stage 2 Calibration", description: "Advanced ECU tuning with supporting hardware upgrades.", minPrice: 55000, maxPrice: 145000, category: "🚀 Performance & Engine Bay" },
{ name: "ECU Stage 3 Custom Tune", description: "Fully custom dyno-tuned high-performance calibration.", minPrice: 125000, maxPrice: 325000, category: "🚀 Performance & Engine Bay" },
{ name: "TCU Transmission Tune", description: "Performance transmission shift optimization tuning.", minPrice: 35000, maxPrice: 125000, category: "🚀 Performance & Engine Bay" },
{ name: "Exhaust Valve Controller", description: "Electronic exhaust valve control module.", minPrice: 25000, maxPrice: 95000, category: "🚀 Performance & Engine Bay" },
{ name: "High-Performance Radiator", description: "Upgraded aluminum radiator for improved cooling.", minPrice: 45000, maxPrice: 185000, category: "🚀 Performance & Engine Bay" },
{ name: "Upgraded Cooling Fans", description: "High-output performance cooling fan system.", minPrice: 25000, maxPrice: 125000, category: "🚀 Performance & Engine Bay" },
{ name: "Performance Engine Oil Upgrade", description: "Premium high-performance synthetic oil service.", minPrice: 6500, maxPrice: 25000, category: "🚀 Performance & Engine Bay" },
{ name: "Synthetic Racing Fluids", description: "High-temperature racing-grade fluid replacement.", minPrice: 8500, maxPrice: 35000, category: "🚀 Performance & Engine Bay" },
{ name: "Engine Bay Carbon Dress-Up Kit", description: "Carbon fiber aesthetic engine bay enhancement kit.", minPrice: 35000, maxPrice: 165000, category: "🚀 Performance & Engine Bay" },
{ name: "Drive Mode Selector Retrofit", description: "Multiple driving mode electronic integration.", minPrice: 45000, maxPrice: 165000, category: "🚀 Performance & Engine Bay" },
{ name: "Performance Throttle Controller", description: "Throttle response enhancement controller.", minPrice: 18000, maxPrice: 65000, category: "🚀 Performance & Engine Bay" },
{ name: "Digital Lap Timer Display", description: "Performance lap timing digital display system.", minPrice: 25000, maxPrice: 125000, category: "🚀 Performance & Engine Bay" },
{ name: "Launch Control Hardware Integration", description: "Launch control activation and hardware setup.", minPrice: 65000, maxPrice: 225000, category: "🚀 Performance & Engine Bay" },
{ name: "Short Shifter Kit", description: "Reduced throw manual short shifter kit.", minPrice: 25000, maxPrice: 125000, category: "🚀 Performance & Engine Bay" },
{ name: "Performance Differential Upgrade", description: "Upgraded limited-slip differential system.", minPrice: 125000, maxPrice: 485000, category: "🚀 Performance & Engine Bay" },
{ name: "Torque Vectoring Retrofit", description: "Advanced torque vectoring system integration.", minPrice: 185000, maxPrice: 650000, category: "🚀 Performance & Engine Bay" },
{ name: "Lightweight Racing Battery", description: "Ultra lightweight performance battery upgrade.", minPrice: 35000, maxPrice: 165000, category: "🚀 Performance & Engine Bay" },
{ name: "Racing Telemetry System", description: "Professional racing data logging telemetry system.", minPrice: 125000, maxPrice: 485000, category: "🚀 Performance & Engine Bay" },
{ name: "Performance ECU Flash", description: "Custom ECU flash tuning for optimized performance.", minPrice: 25000, maxPrice: 125000, category: "🚀 Performance & Engine Bay" },
{ name: "Hybrid Turbo Upgrade Kit", description: "High-output hybrid turbocharger performance kit.", minPrice: 285000, maxPrice: 950000, category: "🚀 Performance & Engine Bay" },
{ name: "Forged Engine Internal Upgrade Package", description: "Forged pistons and rods for high horsepower builds.", minPrice: 450000, maxPrice: 1800000, category: "🚀 Performance & Engine Bay" },

/* ================= 🔊 Exhaust & Sound Systems ================= */

{ name: "Valvetronic Exhaust System", description: "Electronically controlled performance exhaust system.", minPrice: 95000, maxPrice: 425000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Axle-Back Exhaust Upgrade", description: "Performance axle-back exhaust enhancement.", minPrice: 65000, maxPrice: 285000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Cat-Back Exhaust System", description: "Full cat-back stainless steel exhaust upgrade.", minPrice: 85000, maxPrice: 385000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Titanium Performance Exhaust", description: "Ultra-lightweight titanium exhaust system.", minPrice: 185000, maxPrice: 850000, category: "🔊 Exhaust & Sound Systems" },
{ name: "High-Flow Catalytic Converter", description: "Performance high-flow catalytic converter.", minPrice: 45000, maxPrice: 185000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Straight Pipe Conversion", description: "Full straight pipe exhaust configuration.", minPrice: 35000, maxPrice: 165000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Muffler Upgrade", description: "Performance sound-enhancing muffler system.", minPrice: 18000, maxPrice: 95000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Resonator Delete Kit", description: "Resonator removal kit for aggressive sound.", minPrice: 15000, maxPrice: 65000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Carbon Exhaust Tips", description: "Premium carbon fiber exhaust tip upgrade.", minPrice: 12000, maxPrice: 65000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Quad Tip Conversion", description: "Dual to quad exhaust tip conversion.", minPrice: 35000, maxPrice: 145000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Active Sound Booster Module", description: "Electronic engine sound enhancement module.", minPrice: 45000, maxPrice: 165000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Exhaust Heat Wrap", description: "Thermal resistant exhaust heat insulation wrap.", minPrice: 8500, maxPrice: 35000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Electronic Exhaust Valve Controller", description: "Remote-controlled exhaust valve module.", minPrice: 25000, maxPrice: 95000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Performance Exhaust Manifold", description: "High-flow performance exhaust manifold upgrade.", minPrice: 125000, maxPrice: 485000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Custom Exhaust Fabrication", description: "Bespoke custom exhaust system design and fabrication.", minPrice: 185000, maxPrice: 850000, category: "🔊 Exhaust & Sound Systems" },
{ name: "Custom Titanium Downpipe", description: "High-performance titanium downpipe for maximum exhaust flow.", minPrice: 85000, maxPrice: 325000, category: "🔊 Exhaust & Sound Systems" },


/* ================= 🛞 Suspension & Braking ================= */

{ name: "Adjustable Coilover Kit", description: "Height adjustable performance coilover suspension.", minPrice: 75000, maxPrice: 285000, category: "🛑 Suspension & Braking" },
{ name: "Air Suspension System", description: "Full electronic adjustable air ride system.", minPrice: 185000, maxPrice: 650000, category: "🛑 Suspension & Braking" },
{ name: "Lowering Spring Set", description: "Performance lowering springs for improved stance.", minPrice: 25000, maxPrice: 95000, category: "🛑 Suspension & Braking" },
{ name: "Adaptive Suspension Retrofit", description: "OEM adaptive suspension control integration.", minPrice: 125000, maxPrice: 425000, category: "🛑 Suspension & Braking" },
{ name: "Performance Shock Absorbers", description: "High-performance upgraded shock absorber set.", minPrice: 45000, maxPrice: 185000, category: "🛑 Suspension & Braking" },
{ name: "Polyurethane Bushings", description: "Durable polyurethane suspension bushing kit.", minPrice: 18000, maxPrice: 85000, category: "🛑 Suspension & Braking" },
{ name: "Adjustable Control Arms", description: "Precision adjustable suspension control arms.", minPrice: 35000, maxPrice: 165000, category: "🛑 Suspension & Braking" },
{ name: "Camber Kit Installation", description: "Performance camber adjustment kit setup.", minPrice: 25000, maxPrice: 125000, category: "🛑 Suspension & Braking" },
{ name: "Big Brake Kit (6/8 Piston)", description: "High-performance multi-piston brake system.", minPrice: 125000, maxPrice: 650000, category: "🛑 Suspension & Braking" },
{ name: "Ceramic Brake Pads", description: "Low-dust high-performance ceramic brake pads.", minPrice: 15000, maxPrice: 65000, category: "🛑 Suspension & Braking" },
{ name: "Performance Brake Discs", description: "Slotted and drilled performance brake rotors.", minPrice: 35000, maxPrice: 185000, category: "🛑 Suspension & Braking" },
{ name: "Stainless Steel Brake Lines", description: "Braided stainless steel brake line upgrade.", minPrice: 15000, maxPrice: 65000, category: "🛑 Suspension & Braking" },
{ name: "Electronic Brake Upgrade", description: "Advanced electronic brake performance module.", minPrice: 65000, maxPrice: 225000, category:"🛑 Suspension & Braking" },
{ name:"Handbrake Performance Kit", description:"Upgraded performance handbrake system.", minPrice:25000, maxPrice:125000, category:"🛑 Suspension & Braking"},
{ name:"Carbon Ceramic Brake Upgrade", description:"High-performance carbon ceramic braking system.", minPrice:64000, maxPrice:2400000, category:"🛑 Suspension & Braking"},
{ name:"Track Brake Cooling Ducts", description:"High-efficiency brake cooling duct system.", minPrice:34000, maxPrice:144000, category:"🛑 Suspension & Braking"},
{ name: "Suspension Geometry Alignment", description: "Precision performance suspension alignment service.", minPrice: 15000, maxPrice: 65000, category: "🛑 Suspension & Braking" },
{name: "Adjustable Sway Bar Kit", description: "Performance adjustable anti-roll sway bar system.", minPrice: 45000, maxPrice: 185000, category: "🛑 Suspension & Braking" },
{ name: "Hydraulic Handbrake System", description: "Motorsport-grade hydraulic handbrake conversion.", minPrice: 65000, maxPrice: 225000, category: "🛑 Suspension & Braking" },
{ name: "Forged Suspension Arms Upgrade", description: "Lightweight forged suspension arm replacement set.", minPrice: 85000, maxPrice: 325000, category: "🛑 Suspension & Braking" },


/* ================= 🎨 Exterior Styling ================= */

{ name: "Carbon Fiber Front Lip", description: "Premium carbon fiber aerodynamic front lip.", minPrice: 35000, maxPrice: 145000, category: "🎨 Exterior Styling" },
{ name: "Front Splitter Extension", description: "Extended aerodynamic front splitter upgrade.", minPrice: 25000, maxPrice: 95000, category: "🎨 Exterior Styling" },
{ name: "Side Skirt Extensions", description: "Sporty side skirt aerodynamic extensions.", minPrice: 35000, maxPrice: 125000, category: "🎨 Exterior Styling" },
{ name: "Rear Diffuser Upgrade", description: "Aggressive rear diffuser styling enhancement.", minPrice: 45000, maxPrice: 185000, category: "🎨 Exterior Styling" },
{ name: "GT Style Rear Wing", description: "Track-inspired GT rear wing installation.", minPrice: 65000, maxPrice: 325000, category:"🎨 Exterior Styling"},
{ name:"Lip Spoiler (Gloss / Carbon)", description:"Gloss black or carbon trunk lip spoiler.", minPrice:25000, maxPrice:85000, category:"🎨 Exterior Styling"},
{ name: "Custom Front Grille", description: "Premium custom front grille replacement.", minPrice: 25000, maxPrice: 145000, category: "🎨 Exterior Styling" },
{ name: "Honeycomb Mesh Grille", description: "Sport honeycomb mesh grille upgrade.", minPrice: 18000, maxPrice: 95000, category: "🎨 Exterior Styling" },
{ name: "LED Logo Projection", description: "Illuminated LED logo projection system.", minPrice: 8500, maxPrice: 45000, category: "🎨 Exterior Styling" },
{ name: "Smoked Headlight Film", description: "High-quality smoked headlight tint film.", minPrice: 4500, maxPrice: 25000, category: "🎨 Exterior Styling" },
{ name: "Smoked Taillight Film", description: "Premium smoked taillight film wrap.", minPrice: 4500, maxPrice: 25000, category: "🎨 Exterior Styling" },
{ name: "Roof Spoiler Extension", description: "Sport roof spoiler aerodynamic extension.", minPrice: 18000, maxPrice: 85000, category: "🎨 Exterior Styling" },
{ name: "Shark Fin Antenna Upgrade", description: "Stylish shark fin antenna conversion.", minPrice: 6500, maxPrice: 35000, category: "🎨 Exterior Styling" },
{ name: "Black Roof Wrap", description: "Gloss black panoramic roof wrap finish.", minPrice: 18000, maxPrice: 85000, category: "🎨 Exterior Styling" },
{ name: "Satin / Matte Body Wrap", description: "Premium satin or matte finish body wrap.", minPrice: 85000, maxPrice: 225000, category: "🎨 Exterior Styling" },
{ name: "Full Color Change Wrap", description: "Complete premium body wrap color conversion.", minPrice: 95000, maxPrice: 285000, category: "🎨 Exterior Styling" },
{ name: "Paint Protection Film", description: "Self-healing high-gloss PPF protection.", minPrice: 145000, maxPrice: 485000, category: "🎨 Exterior Styling" },
{ name: "Chrome Delete Package", description: "Complete exterior chrome blackout package.", minPrice: 25000, maxPrice: 95000, category: "🎨 Exterior Styling" },
{ name: "Window Trim Blackout", description: "Blackout conversion for window trims.", minPrice: 18000, maxPrice: 75000, category: "🎨 Exterior Styling" },
{ name: "Electric Sunroof Retrofit", description: "OEM-style electric sunroof installation.", minPrice: 85000, maxPrice: 225000, category: "🎨 Exterior Styling" },
{ name: "Flat Bottom Racing Steering Conversion", description: "Sport flat-bottom steering wheel upgrade.", minPrice: 45000, maxPrice: 185000, category: "🎨 Exterior Styling" },
{ name: "Carbon Paddle Shifters", description: "Extended carbon fiber paddle shifter set.", minPrice: 15000, maxPrice: 65000, category: "🎨 Exterior Styling" },
{ name: "Adjustable Rear Wing", description: "Track-ready adjustable rear wing system.", minPrice: 65000, maxPrice: 325000, category: "🎨 Exterior Styling" },
{ name: "Motorsport Tow Strap", description: "High-strength racing tow strap installation.", minPrice: 8500, maxPrice: 35000, category: "🎨 Exterior Styling" },
{ name: "Custom Vinyl Decals", description: "Premium custom vinyl decal design and installation.", minPrice: 15000, maxPrice: 75000, category: "🎨 Exterior Styling" },
{ name: "Full Carbon Fiber Body Kit", description: "Complete carbon fiber exterior body transformation.", minPrice: 285000, maxPrice: 1500000, category: "🎨 Exterior Styling" },
{ name: "Active Aerodynamic Spoiler System", description: "Electronically adjustable aerodynamic spoiler.", minPrice: 185000, maxPrice: 650000, category: "🎨 Exterior Styling" },
{ name: "Bespoke Custom Paint Finish", description: "Ultra-premium multi-layer pearl or candy paint finish.", minPrice: 350000, maxPrice: 1800000, category: "🎨 Exterior Styling" },

/* ================= 🛞 Wheels & Tyre Enhancements ================= */

{ name: "Forged Alloy Wheels", description: "Lightweight forged premium alloy wheel set.", minPrice: 125000, maxPrice: 650000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Flow-Form Wheels", description: "Flow-formed lightweight alloy wheels.", minPrice: 85000, maxPrice: 325000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Deep Dish Wheels", description: "Deep dish aggressive stance alloy wheels.", minPrice: 95000, maxPrice: 385000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Concave Wheel Setup", description: "Sport concave alloy wheel configuration.", minPrice: 95000, maxPrice: 425000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Staggered Wheel Setup", description: "Wider rear staggered wheel configuration.", minPrice: 125000, maxPrice: 485000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Performance Tyres", description: "Ultra high-performance tyre upgrade.", minPrice: 35000, maxPrice: 185000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Run-Flat Tyres", description: "Premium run-flat tyre installation.", minPrice: 45000, maxPrice: 225000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Wheel Spacer Kit", description: "Precision wheel spacer widening kit.", minPrice: 15000, maxPrice: 65000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Wheel Stud Conversion", description: "Stud conversion kit for wheel performance setup.", minPrice: 18000, maxPrice: 85000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Locking Wheel Nuts", description: "Anti-theft locking wheel nut set.", minPrice: 3500, maxPrice: 15000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Alloy Refurbishment", description: "Premium alloy wheel restoration service.", minPrice: 8500, maxPrice: 45000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Caliper Custom Branding", description: "Custom brake caliper paint and branding.", minPrice: 12000, maxPrice: 45000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Tire Lettering Customization", description: "Custom performance tyre sidewall lettering.", minPrice: 8500, maxPrice: 35000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Carbon Fiber Wheel Caps", description: "Premium carbon fiber center caps upgrade.", minPrice: 8500, maxPrice: 35000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Performance Wheel Alignment (Track Spec)", description: "Precision performance wheel alignment setup.", minPrice: 8500, maxPrice: 25000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Wheel Ceramic Coating", description: "Heat-resistant ceramic protection for wheels.", minPrice: 8500, maxPrice: 35000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "TPMS Sensor Upgrade", description: "Advanced tyre pressure monitoring sensor installation.", minPrice: 18000, maxPrice: 85000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Performance Wheel Bearing Upgrade", description: "High-performance reinforced wheel bearing installation.", minPrice: 25000, maxPrice: 125000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Custom Forged Monoblock Wheels", description: "Ultra-lightweight custom forged monoblock wheel set.", minPrice: 285000, maxPrice: 1200000, category: "🛞 Wheels & Tyre Enhancements" },
{ name: "Performance Tyre Pressure Management System", description: "Advanced real-time performance TPMS upgrade.", minPrice: 45000, maxPrice: 165000, category: "🛞 Wheels & Tyre Enhancements" },


/* ================= 💡 Lighting & Visibility ================= */

{ name: "Bi-LED Projector Upgrade", description: "High-performance bi-LED projector headlight conversion.", minPrice: 25000, maxPrice: 125000, category: "💡 Lighting & Visibility" },
{ name: "Laser Headlight Retrofit", description: "Advanced laser headlight technology upgrade.", minPrice: 185000, maxPrice: 650000, category: "💡 Lighting & Visibility" },
{ name: "Matrix Headlight Retrofit", description: "Adaptive matrix LED headlight retrofit.", minPrice: 125000, maxPrice: 485000, category: "💡 Lighting & Visibility" },
{ name: "Sequential Indicator Kit", description: "Dynamic sequential LED indicator upgrade.", minPrice: 12000, maxPrice: 65000, category: "💡 Lighting & Visibility" },
{ name: "LED Fog Lamp Upgrade", description: "High-lumen LED fog light installation.", minPrice: 8500, maxPrice: 45000, category: "💡 Lighting & Visibility" },
{ name: "LED Interior Bulb Upgrade", description: "Full cabin LED interior lighting upgrade.", minPrice: 4500, maxPrice: 25000, category: "💡 Lighting & Visibility" },
{ name: "Footwell Lighting Kit", description: "Ambient footwell lighting enhancement.", minPrice: 8500, maxPrice: 45000, category: "💡 Lighting & Visibility" },
{ name: "Welcome Puddle Lights", description: "Door-mounted welcome projection lights.", minPrice: 6500, maxPrice: 35000, category: "💡 Lighting & Visibility" },
{ name: "Underbody Lighting System", description: "RGB underglow lighting system installation.", minPrice: 25000, maxPrice: 125000, category: "💡 Lighting & Visibility" },
{ name: "Dynamic DRL Installation", description: "Advanced dynamic daytime running lights.", minPrice: 18000, maxPrice: 95000, category: "💡 Lighting & Visibility" },
{ name: "Headlight Leveling Module", description: "Automatic headlight leveling system.", minPrice: 25000, maxPrice: 125000, category: "💡 Lighting & Visibility" },
{ name: "High-Lumen Reverse Lights", description: "Ultra-bright reverse light upgrade.", minPrice: 4500, maxPrice: 25000, category: "💡 Lighting & Visibility" },
{ name: "Adaptive Cornering Light Retrofit", description: "Dynamic cornering light activation upgrade.", minPrice: 45000, maxPrice: 185000, category: "💡 Lighting & Visibility" },
{ name: "Ambient Exterior Underglow Premium Kit", description: "Advanced multi-zone RGB exterior lighting system.", minPrice: 35000, maxPrice: 145000, category: "💡 Lighting & Visibility" },
{ name: "Tail Light Sequential Upgrade", description: "Dynamic rear sequential LED upgrade.", minPrice: 18000, maxPrice: 85000, category: "💡 Lighting & Visibility" },
{ name: "Fog Light Projector Conversion", description: "Premium fog projector lens conversion.", minPrice: 15000, maxPrice: 65000, category: "💡 Lighting & Visibility" },
{ name: "Interior Ambient Multi-Color Controller", description: "Full cabin RGB lighting controller upgrade.", minPrice: 25000, maxPrice: 125000, category: "💡 Lighting & Visibility" },
{ name: "High-Performance HID Conversion Kit", description: "High-intensity discharge headlight conversion.", minPrice: 18000, maxPrice: 85000, category: "💡 Lighting & Visibility" },
{ name: "Laser Fog Lamp Conversion", description: "High-intensity laser fog light retrofit system.", minPrice: 65000, maxPrice: 225000, category: "💡 Lighting & Visibility" },
{ name: "Digital Matrix Pixel Headlight Retrofit", description: "Advanced digital matrix pixel LED headlight system with adaptive beam shaping and glare-free high beam technology.", minPrice: 185000, maxPrice: 650000, category: "💡 Lighting & Visibility" },


/* ================= 🎵 Audio & Infotainment ================= */

{ name: "Android Touchscreen Head Unit", description: "Premium large display Android infotainment system.", minPrice: 25000, maxPrice: 125000, category: "🎵 Audio & Infotainment" },
{ name: "OEM Screen Upgrade", description: "Larger OEM-style display upgrade.", minPrice: 45000, maxPrice: 185000, category: "🎵 Audio & Infotainment" },
{ name: "Wireless Apple CarPlay Activation", description: "Wireless Apple CarPlay system activation.", minPrice: 15000, maxPrice: 65000, category: "🎵 Audio & Infotainment" },
{ name: "Android Auto Activation", description: "Android Auto software integration.", minPrice: 15000, maxPrice: 65000, category: "🎵 Audio & Infotainment" },
{ name: "Premium Component Speakers", description: "High-end component speaker upgrade.", minPrice: 25000, maxPrice: 185000, category: "🎵 Audio & Infotainment" },
{ name: "Subwoofer Box Installation", description: "Custom subwoofer enclosure installation.", minPrice: 18000, maxPrice: 125000, category: "🎵 Audio & Infotainment" },
{ name: "Amplifier Upgrade", description: "High-performance amplifier installation.", minPrice: 25000, maxPrice: 165000, category: "🎵 Audio & Infotainment" },
{ name: "DSP Sound Tuning", description: "Professional digital sound processor tuning.", minPrice: 18000, maxPrice: 85000, category: "🎵 Audio & Infotainment" },
{ name: "Sound Deadening Treatment", description: "Premium cabin sound insulation treatment.", minPrice: 35000, maxPrice: 165000, category: "🎵 Audio & Infotainment" },
{ name: "Rear Entertainment Screens", description: "Rear seat entertainment display system.", minPrice: 45000, maxPrice: 285000, category: "🎵 Audio & Infotainment" },
{ name: "Digital TV Tuner Installation", description: "In-car digital television integration.", minPrice: 25000, maxPrice: 125000, category: "🎵 Audio & Infotainment" },
{ name: "360 Camera Recording System", description: "Full surround view camera recording setup.", minPrice: 45000, maxPrice: 165000, category: "🎵 Audio & Infotainment" },
{ name: "Wireless Charging Dock", description: "Integrated wireless smartphone charging dock.", minPrice: 8500, maxPrice: 45000, category: "🎵 Audio & Infotainment" },
{ name: "Premium Surround Sound System", description: "Full 12+ speaker surround sound upgrade.", minPrice: 125000, maxPrice: 485000, category: "🎵 Audio & Infotainment" },
{ name: "Head-Up Display Retrofit", description: "Windshield projected digital head-up display system.", minPrice: 45000, maxPrice: 185000, category: "🎵 Audio & Infotainment" },
{ name: "Digital Instrument Cluster Upgrade", description: "Fully digital customizable instrument cluster.", minPrice: 95000, maxPrice: 385000, category:"🎵 Audio & Infotainment" },
{ name: "Voice Command Activation", description: "Advanced voice assistant activation integration.", minPrice: 15000, maxPrice: 65000, category: "🎵 Audio & Infotainment" },
{ name: "Premium Microphone Upgrade", description: "High-clarity cabin microphone enhancement.", minPrice: 8500, maxPrice: 35000, category: "🎵 Audio & Infotainment" },
{ name: "Premium Surround Sound Upgrade (OEM+)", description: "High-end multi-channel surround sound system with custom tuning.", minPrice: 125000, maxPrice: 485000, category: "🎵 Audio & Infotainment" },
{ name: "Active Noise Cancellation System", description: "Cabin noise reduction system with adaptive sound balancing.", minPrice: 85000, maxPrice: 325000, category: "🎵 Audio & Infotainment" },

/* ================= 🛡 Safety & Security ================= */

{ name: "Dashcam (Front & Rear)", description: "Full HD dual channel front and rear dash camera system.", minPrice: 8500, maxPrice: 45000, category: "🛡 Safety & Security" },
{ name: "GPS Live Tracking System", description: "Real-time vehicle tracking and monitoring system.", minPrice: 12000, maxPrice: 45000, category: "🛡 Safety & Security" },
{ name: "Anti-Theft Alarm System", description: "Advanced anti-theft security alarm integration.", minPrice: 15000, maxPrice: 65000, category: "🛡 Safety & Security" },
{ name: "Steering Lock System", description: "High-security mechanical steering lock system.", minPrice: 3500, maxPrice: 15000, category: "🛡 Safety & Security" },
{ name: "Immobilizer Retrofit", description: "Electronic engine immobilizer security system.", minPrice: 18000, maxPrice: 85000, category: "🛡 Safety & Security" },
{ name: "Smart Key Upgrade", description: "Advanced smart key proximity upgrade system.", minPrice: 25000, maxPrice: 125000, category: "🛡 Safety & Security" },
{ name: "Remote Start System", description: "Remote engine start integration module.", minPrice: 25000, maxPrice: 95000, category: "🛡 Safety & Security" },
{ name: "Blind Spot Detection Retrofit", description: "OEM-style blind spot monitoring system.", minPrice: 65000, maxPrice: 185000, category: "🛡 Safety & Security" },
{ name: "Lane Assist Activation", description: "Lane keeping assist system activation.", minPrice: 65000, maxPrice: 225000, category: "🛡 Safety & Security" },
{ name: "Adaptive Cruise Control Retrofit", description: "Intelligent adaptive cruise control integration.", minPrice: 125000, maxPrice: 425000, category: "🛡 Safety & Security" },
{ name: "Parking Assist Retrofit", description: "Automated parking assist system retrofit.", minPrice: 85000, maxPrice: 325000, category: "🛡 Safety & Security" },
{ name: "Child Lock Safety Upgrade", description: "Enhanced electronic child safety lock system.", minPrice: 8500, maxPrice: 35000, category: "🛡 Safety & Security" },
{ name: "Digital Key Activation", description: "Smartphone-based digital vehicle key system.", minPrice: 45000, maxPrice: 165000, category: "🛡 Safety & Security" },
{ name: "Smartphone App Vehicle Control", description: "Remote vehicle control mobile app integration.", minPrice: 35000, maxPrice: 145000, category: "🛡 Safety & Security" },
{ name: "Auto Park Assist Retrofit", description: "Automated self-parking system retrofit.", minPrice: 125000, maxPrice: 425000, category: "🛡 Safety & Security" },
{ name: "Gesture Control Activation", description: "Gesture-based infotainment control activation.", minPrice: 45000, maxPrice: 165000, category: "🛡 Safety & Security" },
{ name: "Auto Folding Mirror Module", description: "Automatic folding mirror integration module.", minPrice: 15000, maxPrice: 65000, category: "🛡 Safety & Security" },
{ name: "Auto Dimming Mirror Retrofit", description: "Electrochromic auto-dimming mirror system.", minPrice: 25000, maxPrice: 95000, category: "🛡 Safety & Security" },
{ name: "Rain Sensing Wiper Activation", description: "Automatic rain-sensing wiper system activation.", minPrice: 18000, maxPrice: 75000, category: "🛡 Safety & Security" },
{ name: "Auto Headlight Activation", description: "Automatic headlight control activation.", minPrice: 15000, maxPrice: 65000, category: "🛡 Safety & Security" },
{ name: "Dynamic Steering Assist", description: "Advanced dynamic steering assist system.", minPrice: 125000, maxPrice: 485000, category: "🛡 Safety & Security" },
{ name: "Traffic Sign Recognition Activation", description: "Traffic sign recognition software activation.", minPrice: 65000, maxPrice: 225000, category: "🛡 Safety & Security" },
{ name: "360° Impact Recording System", description: "Advanced multi-camera impact detection recording setup.", minPrice: 65000, maxPrice: 225000, category: "🛡 Safety & Security" },
{ name: "Vehicle Anti-Hijack System", description: "High-security anti-hijack immobilization module.", minPrice: 45000, maxPrice: 165000, category: "🛡 Safety & Security" },

/* ================= 🧼 Detailing & Preservation ================= */

{ name: "Stage 1 Paint Enhancement", description: "Single-stage paint gloss enhancement detailing.", minPrice: 8500, maxPrice: 35000, category: "🧼 Detailing & Preservation" },
{ name: "Multi-Stage Paint Correction", description: "Professional multi-stage swirl and scratch removal.", minPrice: 18000, maxPrice: 75000, category: "🧼 Detailing & Preservation" },
{ name: "9H Ceramic Coating", description: "High-durability hydrophobic ceramic coating.", minPrice: 25000, maxPrice: 85000, category: "🧼 Detailing & Preservation" },
{ name: "Graphene Coating", description: "Advanced graphene-based paint protection coating.", minPrice: 35000, maxPrice: 125000, category: "🧼 Detailing & Preservation" },
{ name: "Full Body PPF", description: "Complete self-healing paint protection film coverage.", minPrice: 185000, maxPrice: 650000, category: "🧼 Detailing & Preservation" },
{ name: "Interior Leather Protection", description: "Premium leather conditioning and protection treatment.", minPrice: 8500, maxPrice: 35000, category: "🧼 Detailing & Preservation" },
{ name: "Fabric Guard Treatment", description: "Hydrophobic fabric protection treatment.", minPrice: 6500, maxPrice: 25000, category: "🧼 Detailing & Preservation" },
{ name: "Alloy Ceramic Protection", description: "Ceramic coating for alloy wheel protection.", minPrice: 8500, maxPrice: 35000, category: "🧼 Detailing & Preservation" },
{ name: "Engine Bay Detailing", description: "Deep engine compartment cleaning and restoration.", minPrice: 8500, maxPrice: 25000, category: "🧼 Detailing & Preservation" },
{ name: "Convertible Roof Cleaning", description: "Specialized soft-top roof cleaning and protection.", minPrice: 12000, maxPrice: 45000, category: "🧼 Detailing & Preservation" },
{ name: "Headlight Polishing", description: "Headlight clarity restoration and UV protection.", minPrice: 3500, maxPrice: 15000, category: "🧼 Detailing & Preservation" },
{ name: "Glass Nano Coating", description: "Hydrophobic nano coating for all glass surfaces.", minPrice: 6500, maxPrice: 25000, category: "🧼 Detailing & Preservation" },
{ name: "PPF Partial Coverage (Front End)", description: "Front bumper, hood, and mirror self-healing PPF protection.", minPrice: 65000, maxPrice: 185000, category: "🧼 Detailing & Preservation" },
{ name: "Interior Deep Steam Sanitization", description: "Full cabin steam disinfection and odor removal treatment.", minPrice: 8500, maxPrice: 35000, category: "🧼 Detailing & Preservation" },
{ name: "Leather Recoloring & Restoration", description: "Professional leather dye correction and restoration service.", minPrice: 25000, maxPrice: 125000, category: "🧼 Detailing & Preservation" },
{ name: "Underbody Anti-Rust Coating", description: "High-durability anti-corrosion underbody treatment.", minPrice: 18000, maxPrice: 75000, category: "🧼 Detailing & Preservation" },
{ name: "Premium Interior Detailing (Executive)", description: "Full executive interior detailing and conditioning package.", minPrice: 15000, maxPrice: 65000, category: "🧼 Detailing & Preservation" },
{ name: "Paint Sealant Protection", description: "High-gloss synthetic paint sealant for long-term protection.", minPrice: 12000, maxPrice: 45000, category: "🧼 Detailing & Preservation" },
{ name: "Interior Ceramic Protection Package", description: "Ceramic coating for dashboard, leather, plastics and trims.", minPrice: 25000, maxPrice: 95000, category: "🧼 Detailing & Preservation" },
{ name: "Paint Sealant Protection Treatment", description: "High-gloss polymer paint sealant for long-term shine.", minPrice: 15000, maxPrice: 65000, category: "🧼 Detailing & Preservation" },

/* ================= 🏕 Off-Road & Utility Accessories ================= */

{ name: "Roof Rack System", description: "Heavy-duty roof rack cargo system.", minPrice: 25000, maxPrice: 125000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Roof Cargo Box", description: "Aerodynamic rooftop cargo storage box.", minPrice: 45000, maxPrice: 185000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Off-Road LED Light Bar", description: "High-output off-road LED lighting bar.", minPrice: 15000, maxPrice: 85000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Bull Bar Installation", description: "Heavy-duty front bull bar protection system.", minPrice: 35000, maxPrice: 165000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Skid Plate Protection", description: "Underbody skid plate protection system.", minPrice: 25000, maxPrice: 125000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Snorkel Kit", description: "Raised air intake snorkel system for water crossings.", minPrice: 35000, maxPrice: 165000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Winch Installation", description: "Heavy-duty recovery winch installation.", minPrice: 45000, maxPrice: 225000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Tow Hitch System", description: "Rear towing hitch and wiring integration.", minPrice: 25000, maxPrice: 125000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Side Step Installation", description: "Heavy-duty side step running boards.", minPrice: 25000, maxPrice: 125000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Heavy Duty Mud Tyres", description: "All-terrain heavy-duty mud tyre upgrade.", minPrice: 45000, maxPrice: 225000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Lift Kit Installation", description: "Suspension lift kit for increased ground clearance.", minPrice: 65000, maxPrice: 285000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Roll Cage Installation", description: "Motorsport-grade roll cage safety installation.", minPrice: 125000, maxPrice: 485000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Off-Road Recovery Kit", description: "Comprehensive off-road recovery gear kit.", minPrice: 15000, maxPrice: 75000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Underbody Armor Kit", description: "Full heavy-duty steel underbody armor protection.", minPrice: 65000, maxPrice: 225000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Off-Road Suspension Reinforcement Kit", description: "Heavy-duty suspension strengthening system for rugged terrain.", minPrice: 85000, maxPrice: 285000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Auxiliary Off-Road Battery System", description: "Secondary battery setup for camping and overlanding use.", minPrice: 45000, maxPrice: 165000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Off-Road Communication Radio System", description: "Professional long-range off-road communication module.", minPrice: 25000, maxPrice: 125000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Portable Air Compressor System", description: "Heavy-duty onboard air compressor for tyre inflation.", minPrice: 18000, maxPrice: 85000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Heavy-Duty Off-Road Suspension Kit", description: "Long-travel heavy-duty off-road suspension system.", minPrice: 185000, maxPrice: 650000, category: "🏕 Off-Road & Utility Accessories" },
{ name: "Underbody Rock Slider Protection", description: "Heavy-duty rock slider side underbody protection.", minPrice: 65000, maxPrice: 285000, category: "🏕 Off-Road & Utility Accessories" },

/* ================= 📦 Bundled Packages ================= */

{ name: "Silver Package – Essential Enhancement", description: "Includes 7D Floor Mats, Reverse Camera Installation, Dashcam (Front), LED Interior Light Upgrade, Basic Exterior Detailing, Wheel Alignment & Balancing, Partial Chrome Delete, and Car Perfume System. Ideal for new car owners wanting clean protection and comfort.", minPrice: 45000, maxPrice: 95000, category: "📦 Bundled Packages" },
{ name: "Gold Package – Premium Upgrade", description: "Includes Ambient Lighting System, Android/CarPlay Activation, Subwoofer Installation, Full Body Ceramic Coating, Caliper Painting, Gloss Black Styling Package, Premium Custom Seat Covers, and Reverse Camera with Sensors. Perfect for daily luxury drivers.", minPrice: 95000, maxPrice: 185000, category: "📦 Bundled Packages" },
{ name: "Platinum Package – Performance & Luxury", description: "Includes Stage 1 ECU Tuning, Cold Air Intake Upgrade, Valvetronic Exhaust System, Forged Alloy Wheels, Big Brake Kit, Carbon Fiber Lip & Diffuser, Multi-Color Ambient Lighting, 9H Ceramic Coating, and Interior Sound Insulation. Designed for enthusiasts who want presence and power.", minPrice: 285000, maxPrice: 650000, category: "📦 Bundled Packages" },
{ name: "Signature Package – Elite Executive", description: "Includes Starlight Roof Installation, Custom Nappa Leather Upholstery, Digital Cluster Upgrade, Heads-Up Display, Power Tailgate Retrofit, 360° Camera System, Full Chrome Delete, Graphene Coating, and VIP Rear Seat Conversion. Built for high-end luxury segment clients.", minPrice: 650000, maxPrice: 1500000, category: "📦 Bundled Packages" },
{ name: "Track Beast Package", description: "Includes Stage 2 ECU Tune, Performance Downpipe, Titanium Exhaust, Adjustable Coilovers, Carbon Ceramic Brakes, Lightweight Wheels, Racing Bucket Seats, Motorsport Harness, and Data Logging System. Built for performance-focused drivers.", minPrice: 750000, maxPrice: 2500000, category: "📦 Bundled Packages" },
{ name: "Off-Road Dominator Package", description: "Includes Lift Kit Installation, All-Terrain Tyres, Roof Rack System, LED Light Bar, Skid Plate Protection, Snorkel Kit, Tow Hook Setup, and Underbody Protection Coating. Perfect for SUVs and adventure builds.", minPrice: 185000, maxPrice: 650000, category: "📦 Bundled Packages" },
{ name: "EV Luxury Package", description: "Includes Fast Charging Station Installation, Ambient Interior Upgrade, Premium Screen Upgrade, 360 Camera System, Graphene Coating, Interior Leather Protection, and Digital Custom Theme Setup. Designed for premium EV owners.", minPrice: 185000, maxPrice: 485000, category: "📦 Bundled Packages" },
{ name: "Ultimate Performance & Luxury Package", description: "Complete build including Stage 2+ Tune, Hybrid Turbo, Forged Wheels, Big Brake Kit, Full Carbon Kit, Starlight Roof, Premium Audio, and Graphene Coating.", minPrice: 1500000, maxPrice: 5000000, category: "📦 Bundled Packages" }

];

/* ================= SEED FUNCTION ================= */

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Mongo Connected");

    await Accessory.deleteMany({});
    console.log("🗑 Cleared old accessories");

    await Accessory.insertMany(accessories);
    console.log(`🚀 Inserted ${accessories.length} accessories`);

    await mongoose.disconnect();
    console.log("🔌 Done");

    process.exit(0);

  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
