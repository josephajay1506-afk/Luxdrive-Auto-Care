const mongoose = require("mongoose");
require("dotenv").config();

const Service = require("./models/Service");

/* ================= SERVICE DATA ================= */

const services = [

//* ================= 🔧 General Maintenance & Inspection ================= */

{
  name: "Basic Health Check & Diagnostics",
  minPrice: 3500,
  maxPrice: 5500,
  description:
    "Complete multi-point inspection with computerized scanning to detect hidden faults and performance issues early.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Full Vehicle Inspection Report",
  minPrice: 6500,
  maxPrice: 9000,
  description:
    "Detailed condition report covering engine, suspension, brakes, electronics, and safety systems with expert recommendations.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Premium Engine Oil + Filter (Synthetic)",
  minPrice: 14000,
  maxPrice: 22000,
  description:
    "Drain and refill with manufacturer-approved synthetic oil, including genuine filter replacement for maximum engine protection.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Air Filter Replacement",
  minPrice: 4500,
  maxPrice: 7000,
  description:
    "Removal of clogged intake filter and installation of a new unit to restore clean airflow and engine efficiency.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Cabin Filter Replacement",
  minPrice: 3500,
  maxPrice: 6500,
  description:
    "Replacement of interior air filtration system to improve airflow, odor control, and cabin air quality.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Spark Plug Replacement",
  minPrice: 12000,
  maxPrice: 24000,
  description:
    "Precision replacement of spark plugs to ensure smooth ignition, improved efficiency, and stable engine performance.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Coolant Flush & Refill",
  minPrice: 8500,
  maxPrice: 13000,
  description:
    "Complete drainage of old coolant, system cleaning, and refill with correct-grade coolant to prevent overheating.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Brake Fluid Replacement",
  minPrice: 6500,
  maxPrice: 10500,
  description:
    "Full system flush and refill with fresh brake fluid to maintain consistent pedal feel and braking safety.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Transmission Fluid Service",
  minPrice: 22000,
  maxPrice: 36000,
  description:
    "Replacement of transmission fluid and inspection to maintain smooth gear shifts and transmission longevity.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Differential Oil Service",
  minPrice: 14000,
  maxPrice: 22000,
  description:
    "Drain and refill of differential fluid to ensure smooth torque distribution and reduced drivetrain wear.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Battery Health Check",
  minPrice: 2000,
  maxPrice: 3500,
  description:
    "Load testing and voltage analysis to assess battery condition and prevent unexpected breakdowns.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Wheel Alignment + Balancing (Laser)",
  minPrice: 5500,
  maxPrice: 8500,
  description:
    "Precision laser alignment and wheel balancing to improve steering accuracy, tire life, and driving stability.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Engine Mount Inspection & Replacement",
  minPrice: 18000,
  maxPrice: 45000,
  description:
    "Inspection and replacement of worn engine mounts to reduce vibration and restore driving comfort.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Drive Belt & Tensioner Replacement",
  minPrice: 12000,
  maxPrice: 28000,
  description:
    "Replacement of worn drive belts and tensioners to ensure reliable power transfer across engine components.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Cooling System Pressure Test",
  minPrice: 6500,
  maxPrice: 12599,
  description:
    "System pressure testing to identify leaks and ensure proper cooling system integrity.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "PCV System Service",
  minPrice: 8599,
  maxPrice: 18599,
  description:
    "Inspection and servicing of crankcase ventilation system to maintain engine efficiency and reduce emissions.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Throttle Body Cleaning & Adaptation",
  minPrice: 9500,
  maxPrice: 18000,
  description:
    "Removal of carbon deposits and recalibration to restore smooth throttle response and stable idle.",
  category: "🔧 General Maintenance & Inspection",
},

{
  name: "Fuel Filter Replacement",
  minPrice: 6500,
  maxPrice: 12000,
  description:
    "Installation of new fuel filter to maintain clean fuel flow and protect injection components.",
  category: "🔧 General Maintenance & Inspection",
},

{ 
  name: "Comprehensive Underbody Inspection", 
  minPrice: 7500, 
  maxPrice: 15000, 
  description: 
  "Detailed inspection of suspension, exhaust, and structural components beneath the vehicle.", 
  category: "🔧 General Maintenance & Inspection" 
},

{ 
  name: "Luxury Annual Preventive Maintenance Package", 
  minPrice: 38000, 
  maxPrice: 85000, 
  description: "Complete annual service covering fluids, filters, diagnostics, and system checks tailored for premium vehicles.", 
  category: "🔧 General Maintenance & Inspection" 
},

/* ================= 🔋 Electrical & Battery ================= */

{
  name: "AGM Battery Replacement",
  minPrice: 22000,
  maxPrice: 38000,
  description:
    "Installation of manufacturer-approved AGM battery with system reset and charging performance verification.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Alternator Repair/Replacement",
  minPrice: 35000,
  maxPrice: 85000,
  description:
    "Diagnosis and restoration of the vehicle’s charging system to ensure stable electrical output.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Starter Motor Replacement",
  minPrice: 28000,
  maxPrice: 55000,
  description:
    "Replacement of faulty starter assembly to restore smooth and reliable engine ignition.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Fuse & Relay Replacement",
  minPrice: 3500,
  maxPrice: 6500,
  description:
    "Identification and replacement of damaged electrical protection components for safe circuit operation.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Wiring Diagnostics",
  minPrice: 10000,
  maxPrice: 28000,
  description:
    "Advanced electrical tracing to locate shorts, connectivity faults, and hidden wiring issues.",
  category: "🔋 Electrical & Battery",
},

{
  name: "ECU Scan & Reset",
  minPrice: 5500,
  maxPrice: 9500,
  description:
    "Computerized fault code scan with controlled reset to restore system functionality.",
  category: "🔋 Electrical & Battery",
},

{
  name: "ECU Software Update",
  minPrice: 18000,
  maxPrice: 30000,
  description:
    "Manufacturer-level software update to enhance performance, stability, and system compatibility.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Sensor Replacement",
  minPrice: 14000,
  maxPrice: 32000,
  description:
    "Precision replacement of faulty sensors to restore accurate vehicle monitoring and control.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Advanced Electrical Fault Tracing",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Deep diagnostics of complex electrical networks using professional-grade testing equipment.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Battery Management System Calibration",
  minPrice: 16000,
  maxPrice: 36000,
  description:
    "Recalibration of battery control module to ensure optimal charging efficiency and lifespan.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Control Module Coding & Programming",
  minPrice: 28000,
  maxPrice: 75999,
  description:
    "Specialized coding and programming of control units for proper integration and functionality.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Luxury Headlamp / Matrix Light Module Repair",
  minPrice: 42000,
  maxPrice: 110000,
  description:
    "Diagnosis and repair of advanced lighting systems to restore precision illumination.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Battery Drain Diagnostic (Parasitic Draw Test)",
  minPrice: 9500,
  maxPrice: 18000,
  description:
    "Comprehensive testing to detect abnormal battery drain and hidden electrical consumption.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Smart Key Programming & Coding",
  minPrice: 22000,
  maxPrice: 65000,
  description:
    "Secure programming and synchronization of smart keys with vehicle security systems.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Comfort Access System Repair",
  minPrice: 18000,
  maxPrice: 48000,
  description:
    "Repair and recalibration of keyless entry and convenience access systems.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Digital Instrument Cluster Repair",
  minPrice: 28000,
  maxPrice: 75000,
  description:
    "Restoration of digital display units for accurate vehicle data and system alerts.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Infotainment Control Module Replacement",
  minPrice: 38000,
  maxPrice: 120000,
  description:
    "Replacement and configuration of infotainment module for seamless multimedia performance.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Power Window & Module Repair",
  minPrice: 14000,
  maxPrice: 32000,
  description:
    "Repair of window motors and control modules to restore smooth operation.",
  category: "🔋 Electrical & Battery",
},

{
  name: "Electric Tailgate Module Service",
  minPrice: 18000,
  maxPrice: 48000,
  description:
    "Diagnosis and servicing of powered tailgate systems for smooth and secure functionality.",
  category: "🔋 Electrical & Battery",
},

{
  name: "High-Voltage Cable Inspection",
  minPrice: 22000,
  maxPrice: 52000,
  description:
    "Comprehensive safety inspection of high-voltage cables in hybrid and EV systems.",
  category: "🔋 Electrical & Battery",
},

/* ================= 🛑 Brake System ================= */

{
  name: "Brake Pad Replacement",
  minPrice: 18000,
  maxPrice: 32000,
  description:
    "Removal of worn brake pads and installation of high-quality replacements for reliable stopping power.",
  category: "🛑 Brake System",
},

{
  name: "Brake Disc Replacement",
  minPrice: 38000,
  maxPrice: 85000,
  description:
    "Replacement of worn or warped brake discs to restore smooth and consistent braking.",
  category: "🛑 Brake System",
},

{
  name: "Brake Caliper Repair",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Inspection and restoration of caliper mechanism to ensure even brake pressure distribution.",
  category: "🛑 Brake System",
},

{
  name: "Brake Line Service",
  minPrice: 12000,
  maxPrice: 20000,
  description:
    "Inspection and servicing of brake lines to maintain hydraulic integrity and safety.",
  category: "🛑 Brake System",
},

{
  name: "ABS Repair",
  minPrice: 18000,
  maxPrice: 85000,
  description:
    "Diagnosis and repair of Anti-lock Braking System to maintain stability under hard braking.",
  category: "🛑 Brake System",
},

{
  name: "Complete Brake Overhaul",
  minPrice: 70000,
  maxPrice: 130000,
  description:
    "Comprehensive servicing of pads, discs, fluid, and braking components for maximum safety.",
  category: "🛑 Brake System",
},

{
  name: "Brake Fluid Performance Flush",
  minPrice: 8500,
  maxPrice: 14000,
  description:
    "Full system flush and refill with high-performance brake fluid for consistent braking feel.",
  category: "🛑 Brake System",
},

{
  name: "Electronic Parking Brake Service",
  minPrice: 12000,
  maxPrice: 28000,
  description:
    "Diagnosis and servicing of electronic parking brake mechanisms and actuators.",
  category: "🛑 Brake System",
},

{
  name: "Brake Booster Repair",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Repair of brake booster unit to restore optimal pedal assist and stopping efficiency.",
  category: "🛑 Brake System",
},

{
  name: "ABS Module Coding",
  minPrice: 18000,
  maxPrice: 40000,
  description:
    "Professional coding and calibration of ABS control module for system synchronization.",
  category: "🛑 Brake System",
},

{
  name: "Carbon Ceramic Brake Service",
  minPrice: 95000,
  maxPrice: 240000,
  description:
    "Specialized inspection and servicing of high-performance carbon ceramic brake systems.",
  category: "🛑 Brake System",
},

{
  name: "Track Brake Bedding & Setup",
  minPrice: 22000,
  maxPrice: 48000,
  description:
    "Professional bedding-in procedure and setup for optimal track braking performance.",
  category: "🛑 Brake System",
},

{
  name: "Brake Pressure Sensor Replacement",
  minPrice: 14000,
  maxPrice: 32000,
  description:
    "Replacement of faulty pressure sensors to maintain accurate braking feedback.",
  category: "🛑 Brake System",
},

{
  name: "Hydraulic Brake System Flush",
  minPrice: 9500,
  maxPrice: 16000,
  description:
    "Complete hydraulic system flush to remove contaminants and restore braking efficiency.",
  category: "🛑 Brake System",
},

{
  name: "Brake Pedal Assembly Service",
  minPrice: 22000,
  maxPrice: 48000,
  description:
    "Inspection and servicing of pedal assembly components for smooth operation.",
  category: "🛑 Brake System",
},

{
  name: "Performance Brake Cooling Kit Installation",
  minPrice: 385999,
  maxPrice: 955999,
  description:
    "Installation of performance cooling ducts to reduce brake fade during high-speed driving.",
  category: "🛑 Brake System",
},

{
  name: "Master Cylinder Replacement",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Replacement of master cylinder to restore proper hydraulic pressure control.",
  category: "🛑 Brake System",
},

{
  name: "Brake Hose Replacement (Stainless Upgrade Option)",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Replacement of brake hoses with optional stainless-steel upgrade for improved response.",
  category: "🛑 Brake System",
},

{
  name: "Electronic Stability Control (ESC) Calibration",
  minPrice: 18000,
  maxPrice: 38000,
  description:
    "Recalibration of stability control system to maintain traction and driving safety.",
  category: "🛑 Brake System",
},

{
  name: "Track-Grade Brake Fluid Upgrade",
  minPrice: 12000,
  maxPrice: 22000,
  description:
    "Upgrade to high-temperature brake fluid designed for demanding performance conditions.",
  category: "🛑 Brake System",
},

/* ================= 🛞 Suspension & Steering ================= */

{
  name: "Shock Absorber Replacement",
  minPrice: 38000,
  maxPrice: 85000,
  description:
    "Removal of worn dampers and installation of new units to restore ride comfort, stability, and road control.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Air Suspension Repair",
  minPrice: 95000,
  maxPrice: 220000,
  description:
    "Diagnosis and repair of air springs, valves, and control systems to restore adaptive ride height and comfort.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Power Steering Service",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Inspection and servicing of steering fluid and components to maintain smooth and effortless steering response.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Steering Rack Replacement",
  minPrice: 65000,
  maxPrice: 135000,
  description:
    "Replacement of worn steering rack assembly to restore precise handling and directional stability.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Control Arm Replacement",
  minPrice: 32000,
  maxPrice: 55000,
  description:
    "Installation of new control arms to correct suspension geometry and eliminate uneven tire wear.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Bushings",
  minPrice: 18000,
  maxPrice: 32000,
  description:
    "Replacement of suspension bushings to reduce noise, vibration, and unwanted movement.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Wheel Bearing",
  minPrice: 15000,
  maxPrice: 28000,
  description:
    "Replacement of worn wheel bearings to eliminate noise and restore smooth wheel rotation.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Adaptive Suspension Calibration",
  minPrice: 22000,
  maxPrice: 48000,
  description:
    "Recalibration of electronically controlled suspension to optimize ride comfort and performance settings.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Laser Wheel Alignment (Performance Spec)",
  minPrice: 8500,
  maxPrice: 16000,
  description:
    "Precision alignment using laser equipment tailored to performance driving specifications.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Dynamic Ride Height Calibration",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Adjustment and recalibration of ride height systems to maintain balance and vehicle stance.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Air Suspension Compressor Replacement",
  minPrice: 75000,
  maxPrice: 165000,
  description:
    "Replacement of air suspension compressor unit to restore proper system pressure and functionality.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Track Handling & Corner Balance Setup",
  minPrice: 42000,
  maxPrice: 110000,
  description:
    "Professional corner-weight balancing and setup for improved grip and track precision.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Active Roll Stabilization Service",
  minPrice: 65000,
  maxPrice: 180000,
  description:
    "Servicing of active anti-roll systems to enhance cornering stability and control.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Steering Angle Sensor Calibration",
  minPrice: 12000,
  maxPrice: 28000,
  description:
    "Calibration of steering angle sensor to ensure accurate stability and traction system response.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Suspension Geometry Optimization",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Fine-tuning of suspension angles to maximize tire contact and driving precision.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Subframe Bushing Replacement",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Replacement of subframe mounts to restore structural rigidity and handling stability.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Performance Lowering Spring Installation",
  minPrice: 385999,
  maxPrice: 955999,
  description:
    "Installation of precision lowering springs to enhance stance, aerodynamics, and cornering response.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Hydraulic Steering Pump Replacement",
  minPrice: 42000,
  maxPrice: 95000,
  description:
    "Replacement of steering pump assembly to restore hydraulic assist and smooth maneuverability.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Tie Rod End Replacement",
  minPrice: 14000,
  maxPrice: 32000,
  description:
    "Replacement of worn tie rod ends to eliminate steering play and improve control.",
  category: "🛞 Suspension & Steering",
},

{
  name: "Four-Corner Air Suspension Rebuild",
  minPrice: 140000,
  maxPrice: 350000,
  description:
    "Complete overhaul of air suspension components across all four corners for balanced performance.",
  category: "🛞 Suspension & Steering",
},

/* ================= 🏎️ Engine & Performance ================= */

{
  name: "Engine Tune-Up",
  minPrice: 18000,
  maxPrice: 32000,
  description:
    "Comprehensive ignition, fuel, and system inspection to restore peak engine efficiency.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Carbon Cleaning",
  minPrice: 28000,
  maxPrice: 48000,
  description:
    "Removal of carbon deposits from intake valves and combustion chambers for improved airflow.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Injector Cleaning",
  minPrice: 12000,
  maxPrice: 22000,
  description:
    "Precision cleaning of fuel injectors to restore optimal spray pattern and combustion efficiency.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Turbo Repair",
  minPrice: 100000,
  maxPrice: 300000,
  description:
    "Inspection and restoration of turbocharger components to regain boost pressure and power delivery.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Timing Belt/Chain Replacement",
  minPrice: 75000,
  maxPrice: 210000,
  description:
    "Replacement of timing components to maintain precise engine synchronization and prevent failure.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Partial Engine Overhaul",
  minPrice: 220000,
  maxPrice: 500000,
  description:
    "Selective rebuilding of worn engine components to restore performance and reliability.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Full Engine Overhaul",
  minPrice: 570000,
  maxPrice: 950000,
  description:
    "Complete disassembly and rebuilding of engine with precision component replacement.",
  category: "🏎️ Engine & Performance",
},

{
  name: "ECU Performance Tune",
  minPrice: 45000,
  maxPrice: 110000,
  description:
    "Custom calibration of engine control unit to optimize power, torque, and throttle response.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Performance Exhaust Upgrade",
  minPrice: 75000,
  maxPrice: 200000,
  description:
    "Installation of high-flow exhaust system to enhance sound, airflow, and performance output.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Performance Intake System Upgrade",
  minPrice: 38000,
  maxPrice: 95000,
  description:
    "Upgrade to high-efficiency intake system for improved airflow and engine breathing.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Engine Dyno Testing & Power Run",
  minPrice: 38000,
  maxPrice: 95000,
  description:
    "Controlled dynamometer testing to measure horsepower, torque, and performance metrics.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Supercharger Service & Inspection",
  minPrice: 120000,
  maxPrice: 320000,
  description:
    "Inspection and servicing of supercharger system to ensure consistent boost performance.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Fuel System Pressure Calibration",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Adjustment and calibration of fuel delivery pressure for optimized engine combustion.",
  category: "🏎️ Engine & Performance",
},

{
  name: "High-Performance Cooling Upgrade",
  minPrice: 65000,
  maxPrice: 180000,
  description:
    "Installation of upgraded cooling components to manage heat under demanding conditions.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Launch Control Calibration",
  minPrice: 28000,
  maxPrice: 72000,
  description:
    "Precision tuning of launch control parameters for controlled high-performance acceleration.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Performance Camshaft Installation",
  minPrice: 955999,
  maxPrice: 2459999,
  description:
    "Installation of high-performance camshaft to increase valve lift and engine output.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Engine Mount Performance Upgrade",
  minPrice: 28000,
  maxPrice: 85000,
  description:
    "Upgrade to reinforced mounts to reduce engine movement during aggressive driving.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Crankshaft & Piston Inspection Service",
  minPrice: 85000,
  maxPrice: 220000,
  description:
    "Precision inspection of internal rotating components to ensure structural integrity.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Stage 2 Performance Upgrade Package",
  minPrice: 180000,
  maxPrice: 450000,
  description:
    "Comprehensive hardware and software upgrade package for significant power enhancement.",
  category: "🏎️ Engine & Performance",
},

{
  name: "Track Performance Preparation Package",
  minPrice: 95000,
  maxPrice: 250000,
  description:
    "Complete track-readiness preparation including inspection, tuning, and safety checks.",
  category: "🏎️ Engine & Performance",
},

/* ================= ❄️ AC & Climate ================= */

{
  name: "AC Gas Refill",
  minPrice: 7500,
  maxPrice: 14000,
  description:
    "Precision refrigerant refill with pressure balancing to restore optimal cooling performance.",
  category: "❄️ AC & Climate",
},

{
  name: "Compressor Replacement",
  minPrice: 48000,
  maxPrice: 97000,
  description:
    "Replacement of faulty AC compressor to restore powerful and consistent cabin cooling.",
  category: "❄️ AC & Climate",
},

{
  name: "Cooling Coil Replacement",
  minPrice: 38000,
  maxPrice: 75000,
  description:
    "Installation of new evaporator coil to ensure efficient heat exchange and airflow.",
  category: "❄️ AC & Climate",
},

{
  name: "Climate Diagnostics",
  minPrice: 5500,
  maxPrice: 9000,
  description:
    "Advanced system scan to detect airflow, sensor, or temperature control faults.",
  category: "❄️ AC & Climate",
},

{
  name: "Cooling Optimization",
  minPrice: 12000,
  maxPrice: 20000,
  description:
    "System recalibration and airflow tuning for faster and more efficient cooling.",
  category: "❄️ AC & Climate",
},

{
  name: "Dual-Zone Climate Module Repair",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Repair of independent temperature control system for balanced cabin comfort.",
  category: "❄️ AC & Climate",
},

{
  name: "AC Condenser Replacement",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Replacement of condenser unit to improve heat dissipation and cooling efficiency.",
  category: "❄️ AC & Climate",
},

{
  name: "Blower Motor Replacement",
  minPrice: 18000,
  maxPrice: 38000,
  description:
    "Replacement of blower motor to restore strong and even cabin airflow.",
  category: "❄️ AC & Climate",
},

{
  name: "Cabin Climate Sensor Replacement",
  minPrice: 9500,
  maxPrice: 18000,
  description:
    "Replacement of faulty cabin sensors for accurate temperature regulation.",
  category: "❄️ AC & Climate",
},

{
  name: "Heater Core Service",
  minPrice: 32000,
  maxPrice: 72000,
  description:
    "Inspection and servicing of heater core to ensure effective heating performance.",
  category: "❄️ AC & Climate",
},

{
  name: "Rear AC System Service",
  minPrice: 14000,
  maxPrice: 28000,
  description:
    "Comprehensive servicing of rear climate units for uniform cooling across all rows.",
  category: "❄️ AC & Climate",
},

{
  name: "Luxury Cabin Air Purification Upgrade",
  minPrice: 22000,
  maxPrice: 48000,
  description:
    "Upgrade to advanced filtration system for cleaner and healthier cabin air.",
  category: "❄️ AC & Climate",
},

{
  name: "Climate Control ECU Programming",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Software programming of climate control unit for optimized performance and response.",
  category: "❄️ AC & Climate",
},

{
  name: "AC Pressure Leak Test",
  minPrice: 8500,
  maxPrice: 18000,
  description:
    "High-precision leak detection test to identify refrigerant loss or system faults.",
  category: "❄️ AC & Climate",
},

{
  name: "High-Performance AC Upgrade Kit",
  minPrice: 48000,
  maxPrice: 125000,
  description:
    "Installation of upgraded cooling components for enhanced high-temperature performance.",
  category: "❄️ AC & Climate",
},

{
  name: "Luxury Cabin Fragrance System Service",
  minPrice: 12000,
  maxPrice: 26000,
  description:
    "Servicing and refilling of integrated fragrance system for premium cabin ambiance.",
  category: "❄️ AC & Climate",
},

{
  name: "Rear Climate Zone Calibration",
  minPrice: 14000,
  maxPrice: 28000,
  description:
    "Calibration of rear temperature controls for accurate passenger comfort.",
  category: "❄️ AC & Climate",
},

{
  name: "Evaporator Cleaning & Disinfection",
  minPrice: 9500,
  maxPrice: 18000,
  description:
    "Deep cleaning and sanitization of evaporator core to remove odor and bacteria.",
  category: "❄️ AC & Climate",
},

{
  name: "Climate Vent Motor Repair",
  minPrice: 14000,
  maxPrice: 32000,
  description:
    "Repair of airflow vent motors to restore precise air distribution.",
  category: "❄️ AC & Climate",
},

{
  name: "Complete Climate System Overhaul",
  minPrice: 85000,
  maxPrice: 220000,
  description:
    "Comprehensive rebuild of AC and heating system for factory-level performance.",
  category: "❄️ AC & Climate",
},

/* ================= 🎨 Detailing & Paint ================= */

{
  name: "Full Wash + Wax",
  minPrice: 4500,
  maxPrice: 7000,
  description:
    "Thorough exterior wash with protective wax layer for enhanced shine and protection.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Premium Detailing",
  minPrice: 18000,
  maxPrice: 32000,
  description:
    "Complete interior and exterior detailing for showroom-level finish.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Interior Leather Detailing",
  minPrice: 12000,
  maxPrice: 24000,
  description:
    "Deep cleaning, conditioning, and protection of premium leather surfaces.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Ceramic Coating",
  minPrice: 45000,
  maxPrice: 125000,
  description:
    "Application of long-lasting ceramic layer for superior gloss and paint protection.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Graphene Coating",
  minPrice: 75000,
  maxPrice: 175000,
  description:
    "Advanced graphene-based protection for enhanced durability and hydrophobic effect.",
  category: "🎨 Detailing & Paint",
},

{
  name: "PPF Full",
  minPrice: 150000,
  maxPrice: 415000,
  description:
    "Full-body paint protection film application to guard against chips and scratches.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Scratch Polish",
  minPrice: 12000,
  maxPrice: 28000,
  description:
    "Precision polishing to reduce visible scratches and restore surface clarity.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Full Repaint",
  minPrice: 300000,
  maxPrice: 700000,
  description:
    "Complete vehicle repaint using high-quality paint systems for factory finish.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Alloy Polish",
  minPrice: 9000,
  maxPrice: 16000,
  description:
    "Refinement and polishing of alloy wheels to restore original brilliance.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Headlight Restore",
  minPrice: 6500,
  maxPrice: 11000,
  description:
    "Restoration of headlight clarity for improved visibility and aesthetics.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Multi-Stage Paint Correction",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Advanced correction process to eliminate swirl marks and restore depth of gloss.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Engine Bay Detailing",
  minPrice: 12000,
  maxPrice: 22000,
  description:
    "Professional cleaning and dressing of engine bay components for a pristine finish.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Showroom Concours Detailing",
  minPrice: 65000,
  maxPrice: 180000,
  description:
    "Elite-level detailing tailored for show cars and concours events.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Wet Sanding & Mirror Finish Correction",
  minPrice: 48000,
  maxPrice: 140000,
  description:
    "Precision wet sanding process for flawless mirror-like paint finish.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Ceramic Maintenance Top-Up",
  minPrice: 18000,
  maxPrice: 32000,
  description:
    "Reinforcement of existing ceramic layer to maintain gloss and protection.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Wheel-Off Deep Detailing",
  minPrice: 22555,
  maxPrice: 48555,
  description:
    "Detailed cleaning with wheel removal for full access and perfection.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Interior Steam Sanitization",
  minPrice: 8500,
  maxPrice: 18000,
  description:
    "High-temperature steam cleaning to disinfect and refresh interior surfaces.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Convertible Roof Treatment",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Specialized cleaning and protection treatment for fabric or soft-top roofs.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Glass Ceramic Coating",
  minPrice: 12000,
  maxPrice: 28000,
  description:
    "Hydrophobic glass coating for improved visibility and water repellency.",
  category: "🎨 Detailing & Paint",
},

{
  name: "Luxury Detailing Annual Package",
  minPrice: 85000,
  maxPrice: 220000,
  description:
    "Comprehensive yearly detailing program to maintain showroom condition.",
  category: "🎨 Detailing & Paint",
},

/* ================= 🛋️ Interior & Comfort ================= */

{
  name: "Seat Leather Restore",
  minPrice: 22000,
  maxPrice: 48000,
  description:
    "Restoration and conditioning of worn leather seats to revive texture and finish.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Dashboard Repair",
  minPrice: 14000,
  maxPrice: 30000,
  description:
    "Repair and refinishing of dashboard surfaces to eliminate cracks and wear.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Seat Motor Repair",
  minPrice: 18000,
  maxPrice: 48000,
  description:
    "Diagnosis and repair of seat adjustment motors for smooth functionality.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Roof Liner Replacement",
  minPrice: 38000,
  maxPrice: 75000,
  description:
    "Replacement of sagging or damaged headliner with premium finish materials.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Steering Wrap",
  minPrice: 14000,
  maxPrice: 28000,
  description:
    "Custom wrapping of steering wheel for enhanced grip and refined aesthetics.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Ambient Lighting Installation",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Installation of customizable ambient lighting to elevate cabin ambiance.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Infotainment Upgrade",
  minPrice: 55000,
  maxPrice: 150000,
  description:
    "Upgrade to advanced multimedia system with enhanced connectivity and display.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Premium Sound System Upgrade",
  minPrice: 75000,
  maxPrice: 240000,
  description:
    "Installation of high-fidelity audio components for immersive sound experience.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Ventilated Seat Repair",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Repair of seat ventilation system to restore cooling comfort.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Massage Seat System Service",
  minPrice: 38000,
  maxPrice: 95000,
  description:
    "Servicing of massage seat mechanisms for full comfort functionality.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Door Trim Restoration",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Refinishing and restoration of door panels for premium appearance.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Custom Interior Trim Upgrade",
  minPrice: 55000,
  maxPrice: 180000,
  description:
    "Upgrade to bespoke trim materials including wood, aluminum, or carbon accents.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Bespoke Leather Re-Trim",
  minPrice: 120000,
  maxPrice: 350000,
  description:
    "Complete re-trimming of interior using premium custom leather materials.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Carbon Fiber Interior Conversion",
  minPrice: 150000,
  maxPrice: 420000,
  description:
    "Conversion of interior trim to authentic carbon fiber finish.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Luxury Sound Deadening Treatment",
  minPrice: 38000,
  maxPrice: 95000,
  description:
    "Installation of advanced insulation materials for quieter cabin experience.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Executive Rear Seat Upgrade",
  minPrice: 180000,
  maxPrice: 480000,
  description:
    "Upgrade rear seating with enhanced comfort, controls, and premium features.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Digital Cluster Upgrade",
  minPrice: 65000,
  maxPrice: 185555,
  description:
    "Installation of upgraded digital instrument cluster with enhanced display features.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Interior Ambient Recalibration",
  minPrice: 12000,
  maxPrice: 28000,
  description:
    "Recalibration of interior lighting and ambiance settings for precision control.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Luxury Fragrance System Installation",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Installation of integrated fragrance system for refined cabin atmosphere.",
  category: "🛋️ Interior & Comfort",
},

{
  name: "Complete Interior Restoration Package",
  minPrice: 220000,
  maxPrice: 650000,
  description:
    "Comprehensive interior rebuild restoring luxury finish, comfort, and elegance.",
  category: "🛋️ Interior & Comfort",
},

/* ================= 🛡️ Safety & Security ================= */

{
  name: "Airbag Diagnostics",
  minPrice: 12000,
  maxPrice: 22000,
  description:
    "Advanced system scan to detect airbag faults, sensor issues, and safety module errors.",
  category: "🛡️ Safety & Security",
},

{
  name: "Airbag Replacement",
  minPrice: 125000,
  maxPrice: 255000,
  description:
    "Professional replacement of deployed or faulty airbags with system reset and testing.",
  category: "🛡️ Safety & Security",
},

{
  name: "ADAS Calibration",
  minPrice: 35000,
  maxPrice: 105000,
  description:
    "Precision calibration of advanced driver assistance systems for accurate real-time safety response.",
  category: "🛡️ Safety & Security",
},

{
  name: "Blind Spot Sensor Replacement",
  minPrice: 32000,
  maxPrice: 75000,
  description:
    "Replacement and alignment of blind spot sensors to restore monitoring accuracy.",
  category: "🛡️ Safety & Security",
},

{
  name: "Parking Sensor Replacement",
  minPrice: 10000,
  maxPrice: 18000,
  description:
    "Installation of new parking sensors for improved obstacle detection.",
  category: "🛡️ Safety & Security",
},

{
  name: "Reverse Camera Installation & Repair",
  minPrice: 18000,
  maxPrice: 38000,
  description:
    "Installation or repair of rear-view camera for enhanced parking visibility.",
  category: "🛡️ Safety & Security",
},

{
  name: "Dash Cam Installation",
  minPrice: 14000,
  maxPrice: 26000,
  description:
    "Professional installation of high-definition dash camera with secure wiring integration.",
  category: "🛡️ Safety & Security",
},

{
  name: "GPS Tracker Installation",
  minPrice: 18000,
  maxPrice: 32000,
  description:
    "Secure installation of GPS tracking system for real-time vehicle location monitoring.",
  category: "🛡️ Safety & Security",
},

{
  name: "Anti-Theft Upgrade",
  minPrice: 32000,
  maxPrice: 65000,
  description:
    "Upgrade of vehicle security system with enhanced immobilization and alert features.",
  category: "🛡️ Safety & Security",
},

{
  name: "360° Camera Calibration & Repair",
  minPrice: 28000,
  maxPrice: 72000,
  description:
    "Calibration and repair of surround-view camera system for accurate spatial awareness.",
  category: "🛡️ Safety & Security",
},

{
  name: "Radar / LiDAR Sensor Alignment",
  minPrice: 42000,
  maxPrice: 110000,
  description:
    "Precision alignment of radar and LiDAR sensors for reliable autonomous safety functions.",
  category: "🛡️ Safety & Security",
},

{
  name: "Secure Smart Key Programming",
  minPrice: 22000,
  maxPrice: 65000,
  description:
    "Secure coding and synchronization of smart keys with encrypted vehicle systems.",
  category: "🛡️ Safety & Security",
},

{
  name: "Lane Assist System Calibration",
  minPrice: 28000,
  maxPrice: 75000,
  description:
    "Calibration of lane departure and assist systems for accurate steering support.",
  category: "🛡️ Safety & Security",
},

{
  name: "Adaptive Cruise Control Calibration",
  minPrice: 32000,
  maxPrice: 85000,
  description:
    "Fine-tuning of adaptive cruise sensors to maintain safe following distance.",
  category: "🛡️ Safety & Security",
},

{
  name: "Driver Monitoring System Repair",
  minPrice: 28000,
  maxPrice: 72000,
  description:
    "Repair of driver alertness monitoring systems for enhanced occupant safety.",
  category: "🛡️ Safety & Security",
},

{
  name: "Collision Avoidance System Programming",
  minPrice: 35000,
  maxPrice: 95000,
  description:
    "Software programming of collision mitigation systems for real-time hazard response.",
  category: "🛡️ Safety & Security",
},

{
  name: "Night Vision System Repair",
  minPrice: 65000,
  maxPrice: 185555,
  description:
    "Restoration of night vision systems for improved low-light driving visibility.",
  category: "🛡️ Safety & Security",
},

{
  name: "Immobilizer System Repair",
  minPrice: 18000,
  maxPrice: 48000,
  description:
    "Diagnosis and repair of immobilizer modules to secure vehicle ignition control.",
  category: "🛡️ Safety & Security",
},

{
  name: "Armored Vehicle System Inspection",
  minPrice: 75000,
  maxPrice: 220000,
  description:
    "Comprehensive inspection of armored protection systems and structural integrity.",
  category: "🛡️ Safety & Security",
},

{
  name: "Security System Health Audit",
  minPrice: 14000,
  maxPrice: 28000,
  description:
    "Complete audit of vehicle security features to ensure optimal protection.",
  category: "🛡️ Safety & Security",
},

/* ================= ⚡ Hybrid & EV ================= */

{
  name: "EV Battery Health",
  minPrice: 12000,
  maxPrice: 20000,
  description:
    "Comprehensive analysis of battery performance, capacity, and charge cycles.",
  category: "⚡ Hybrid & EV",
},

{
  name: "EV Battery Replace",
  minPrice: 400000,
  maxPrice: 1200000,
  description:
    "Replacement of high-voltage battery pack with certified installation and system calibration.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Charging Port Repair / Replacement",
  minPrice: 38000,
  maxPrice: 85000,
  description:
    "Repair or replacement of charging interface for reliable energy transfer.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Inverter Repair",
  minPrice: 140000,
  maxPrice: 320000,
  description:
    "Diagnosis and repair of inverter system for stable power conversion.",
  category: "⚡ Hybrid & EV",
},

{
  name: "EV Software Update",
  minPrice: 12000,
  maxPrice: 28000,
  description:
    "Installation of latest EV firmware updates to enhance performance and efficiency.",
  category: "⚡ Hybrid & EV",
},

{
  name: "High-Voltage System Diagnostics",
  minPrice: 22000,
  maxPrice: 48000,
  description:
    "Advanced testing of high-voltage components to ensure safe system operation.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Hybrid Battery Cooling System Service",
  minPrice: 22000,
  maxPrice: 48000,
  description:
    "Servicing of battery cooling circuits to maintain optimal operating temperature.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Regenerative Braking System Service",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Inspection and calibration of regenerative braking for efficient energy recovery.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Electric Drive Motor Diagnostics",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Precision diagnostics of electric drive motor for smooth and efficient performance.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Onboard Charger Repair",
  minPrice: 85000,
  maxPrice: 220000,
  description:
    "Repair of onboard charging unit to restore reliable charging capability.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Battery Pack Balancing & Conditioning",
  minPrice: 48000,
  maxPrice: 140000,
  description:
    "Cell balancing and conditioning process to extend battery life and efficiency.",
  category: "⚡ Hybrid & EV",
},

{
  name: "EV Thermal Management Service",
  minPrice: 28000,
  maxPrice: 72000,
  description:
    "Service of cooling and heating systems regulating battery and motor temperature.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Hybrid Control Unit Programming",
  minPrice: 32000,
  maxPrice: 78000,
  description:
    "Programming and calibration of hybrid control systems for optimized power delivery.",
  category: "⚡ Hybrid & EV",
},

{
  name: "DC Fast Charging Module Repair",
  minPrice: 95000,
  maxPrice: 240000,
  description:
    "Repair and testing of DC fast charging modules for high-speed energy transfer.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Drive Motor Bearing Service",
  minPrice: 75000,
  maxPrice: 185555,
  description:
    "Inspection and servicing of motor bearings to ensure smooth rotation and longevity.",
  category: "⚡ Hybrid & EV",
},

{
  name: "EV Power Distribution Module Service",
  minPrice: 48000,
  maxPrice: 125555,
  description:
    "Maintenance of high-voltage power distribution systems for stable energy flow.",
  category: "⚡ Hybrid & EV",
},

{
  name: "High-Voltage Cable Replacement",
  minPrice: 65555,
  maxPrice: 185555,
  description:
    "Replacement of high-voltage cables with secure insulation and safety testing.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Hybrid Transmission Service",
  minPrice: 85000,
  maxPrice: 220000,
  description:
    "Servicing of hybrid transmission components for seamless power transfer.",
  category: "⚡ Hybrid & EV",
},

{
  name: "Battery Thermal Sensor Replacement",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Replacement of thermal sensors to ensure accurate battery temperature monitoring.",
  category: "⚡ Hybrid & EV",
},

{
  name: "EV Annual System Health Audit",
  minPrice: 32000,
  maxPrice: 75000,
  description:
    "Comprehensive yearly inspection of all EV systems for safety and performance assurance.",
  category: "⚡ Hybrid & EV",
},

/* ================= 👑 Premium Service Packages ================= */

{
  name: "Essential",
  minPrice: 6999,
  maxPrice: 9999,
  description:
    "Comprehensive basic maintenance package covering essential inspections and fluid checks.",
  category: "👑 Premium Service Packages",
},

{
  name: "Prime Plus",
  minPrice: 13999,
  maxPrice: 17999,
  description:
    "Enhanced service package including detailed diagnostics and preventive maintenance.",
  category: "👑 Premium Service Packages",
},

{
  name: "Grand Signature",
  minPrice: 22999,
  maxPrice: 28999,
  description:
    "Premium all-inclusive package combining inspection, performance checks, and detailing benefits.",
  category: "👑 Premium Service Packages",
},

{
  name: "Ultimate Elite",
  minPrice: 30999,
  maxPrice: 39999,
  description:
    "Top-tier luxury package delivering complete vehicle care with priority service support.",
  category: "👑 Premium Service Packages",
},

/* =============== 🚀 Performance Tuning =================== */

{
  name: "Stage 1 – OEM + Performance Optimization",
  minPrice: 45000,
  maxPrice: 85000,
  description:
    "ECU software optimization designed to safely increase engine performance while retaining stock hardware. Improves throttle response, horsepower and torque without affecting reliability.",
  category: "🚀 Performance Tuning Stages",
},

{
  name: "Stage 2 – Hardware + ECU Performance Package",
  minPrice: 125000,
  maxPrice: 220000,
  description:
    "Advanced tuning stage that includes upgraded intake, exhaust components and ECU remapping. Delivers significant gains in power, torque and driving dynamics.",
  category: "🚀 Performance Tuning Stages",
},

{
  name: "Stage 3 – Full Performance Build",
  minPrice: 450000,
  maxPrice: 850000,
  description:
    "Complete high-performance engine build including turbo upgrades, fuel system enhancements and full ECU calibration. Designed for extreme power output and track-level performance.",
  category: "🚀 Performance Tuning Stages",
},

/* ================= 🧾 Diagnostic Packages ================= */

{
  name: "Basic Diagnostic",
  minPrice: 4500,
  maxPrice: 6500,
  description:
    "Computerized scan to identify common faults and warning light issues.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Premium Diagnostic",
  minPrice: 14000,
  maxPrice: 17000,
  description:
    "Advanced multi-system diagnostic with detailed digital fault reporting.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Luxury Inspection",
  minPrice: 28000,
  maxPrice: 33000,
  description:
    "Comprehensive inspection covering mechanical, electrical, and performance systems.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Pre-Owned Check",
  minPrice: 18000,
  maxPrice: 22000,
  description:
    "Thorough evaluation of vehicle condition before resale or purchase.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Track Check",
  minPrice: 42000,
  maxPrice: 54000,
  description:
    "High-performance inspection to ensure track-readiness and safety compliance.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Advanced Electronic Deep Scan",
  minPrice: 22000,
  maxPrice: 27000,
  description:
    "In-depth electronic module scan detecting hidden and intermittent faults.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Full Vehicle Health Audit",
  minPrice: 32000,
  maxPrice: 42000,
  description:
    "Complete vehicle systems audit with comprehensive performance report.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Supercar Pre-Purchase Audit",
  minPrice: 52000,
  maxPrice: 95000,
  description:
    "Elite-level inspection tailored for high-performance and exotic vehicles.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Performance Health Check",
  minPrice: 28000,
  maxPrice: 48000,
  description:
    "Performance-focused inspection evaluating engine output and drivetrain efficiency.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Luxury Annual Vehicle Audit",
  minPrice: 42000,
  maxPrice: 72000,
  description:
    "Yearly comprehensive evaluation ensuring long-term reliability and value retention.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "NVH Analysis",
  minPrice: 28000,
  maxPrice: 52000,
  description:
    "Noise, vibration, and harshness analysis to identify comfort-impacting issues.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Post-Repair Validation Scan",
  minPrice: 8500,
  maxPrice: 14000,
  description:
    "Final system scan to confirm successful repair and fault clearance.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Pre-Tuning Health Inspection",
  minPrice: 12000,
  maxPrice: 22000,
  description:
    "Pre-modification inspection ensuring engine and systems are tuning-ready.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Comprehensive Electrical Audit",
  minPrice: 18000,
  maxPrice: 38000,
  description:
    "Full electrical system inspection detecting wiring, module, and power issues.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Chassis & Suspension Analysis",
  minPrice: 22000,
  maxPrice: 48000,
  description:
    "Detailed assessment of suspension geometry and chassis integrity.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Brake System Diagnostic Audit",
  minPrice: 18000,
  maxPrice: 38555,
  description:
    "Comprehensive braking performance evaluation for maximum safety assurance.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Thermal Imaging Inspection",
  minPrice: 28000,
  maxPrice: 65000,
  description:
    "Infrared thermal scanning to detect overheating and hidden component stress.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Dyno Pre & Post Validation Test",
  minPrice: 38000,
  maxPrice: 95000,
  description:
    "Performance measurement before and after modifications to verify gains.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Warranty Compliance Inspection",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Inspection ensuring vehicle meets manufacturer warranty standards.",
  category: "🧾 Diagnostic Packages",
},

{
  name: "Collection Vehicle Inspection",
  minPrice: 45000,
  maxPrice: 110000,
  description:
    "Specialized inspection designed for collector and rare vehicles.",
  category: "🧾 Diagnostic Packages",
},

/* ================= ➕ Extra High-End Services ================= */

{
  name: "Luxury Paint Correction",
  minPrice: 38000,
  maxPrice: 85000,
  description:
    "Advanced multi-stage correction restoring deep gloss and flawless finish.",
  category: "➕ Extra High-End Services",
},

{
  name: "PPF Partial (Front Only)",
  minPrice: 65000,
  maxPrice: 120000,
  description:
    "Front-section paint protection film application against chips and road damage.",
  category: "➕ Extra High-End Services",
},

{
  name: "Transmission Rebuild",
  minPrice: 250000,
  maxPrice: 500000,
  description:
    "Complete transmission overhaul restoring smooth shifting and reliability.",
  category: "➕ Extra High-End Services",
},

{
  name: "Turbo Upgrade Kit",
  minPrice: 200000,
  maxPrice: 600000,
  description:
    "High-performance turbo system upgrade for increased power output.",
  category: "➕ Extra High-End Services",
},

{
  name: "Performance Brake Kit",
  minPrice: 120000,
  maxPrice: 300000,
  description:
    "Installation of high-performance braking system for enhanced stopping power.",
  category: "➕ Extra High-End Services",
},

{
  name: "Supercharger System Service & Rebuild",
  minPrice: 220000,
  maxPrice: 550000,
  description:
    "Complete servicing and rebuild of supercharger for consistent boost delivery.",
  category: "➕ Extra High-End Services",
},

{
  name: "Exotic Car Annual Maintenance Program",
  minPrice: 180000,
  maxPrice: 420000,
  description:
    "Dedicated yearly maintenance program tailored for exotic vehicles.",
  category: "➕ Extra High-End Services",
},

{
  name: "Enclosed Vehicle Transport",
  minPrice: 28000,
  maxPrice: 95000,
  description:
    "Secure enclosed transport ensuring safe and damage-free vehicle relocation.",
  category: "➕ Extra High-End Services",
},

{
  name: "Concierge Pickup & Delivery",
  minPrice: 8500,
  maxPrice: 18000,
  description:
    "Doorstep pickup and delivery service for ultimate convenience.",
  category: "➕ Extra High-End Services",
},

{
  name: "Track Day Technical Support",
  minPrice: 65000,
  maxPrice: 180000,
  description:
    "On-site technical assistance and setup support during track events.",
  category: "➕ Extra High-End Services",
},

{
  name: "Luxury Vehicle Storage & Conditioning",
  minPrice: 22000,
  maxPrice: 65000,
  description:
    "Climate-controlled storage with battery maintenance and periodic inspection.",
  category: "➕ Extra High-End Services",
},

{
  name: "Bespoke Performance Build Consultation",
  minPrice: 18000,
  maxPrice: 42000,
  description:
    "Personalized consultation for custom performance enhancement projects.",
  category: "➕ Extra High-End Services",
},

{
  name: "Full Custom Performance Build Project",
  minPrice: 350000,
  maxPrice: 1200000,
  description:
    "End-to-end custom build project tailored to performance goals and specifications.",
  category: "➕ Extra High-End Services",
},

{
  name: "Private Collection Fleet Maintenance",
  minPrice: 220000,
  maxPrice: 650000,
  description:
    "Comprehensive maintenance program for private multi-vehicle collections.",
  category: "➕ Extra High-End Services",
},

{
  name: "Luxury Vehicle Export Preparation",
  minPrice: 38000,
  maxPrice: 95000,
  description:
    "Preparation and compliance checks for secure international vehicle export.",
  category: "➕ Extra High-End Services",
},

{
  name: "Track-Ready Setup Package",
  minPrice: 95000,
  maxPrice: 250000,
  description:
    "Complete mechanical and safety setup optimized for track performance.",
  category: "➕ Extra High-End Services",
},

{
  name: "Carbon Fiber Aero Kit Installation",
  minPrice: 120000,
  maxPrice: 350000,
  description:
    "Professional installation of carbon fiber aerodynamic components.",
  category: "➕ Extra High-End Services",
},

{
  name: "Full Interior Bespoke Conversion",
  minPrice: 250000,
  maxPrice: 800000,
  description:
    "Complete custom interior transformation using premium materials.",
  category: "➕ Extra High-End Services",
},

{
  name: "Concours Show Preparation Package",
  minPrice: 120000,
  maxPrice: 320000,
  description:
    "Elite detailing and mechanical preparation for concours-level presentation.",
  category: "➕ Extra High-End Services",
},

{
  name: "Hypercar Technical Inspection Program",
  minPrice: 150000,
  maxPrice: 450000,
  description:
    "Comprehensive technical inspection tailored for hypercar-grade engineering.",
  category: "➕ Extra High-End Services",
},

];

/* ================= SEED ================= */

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Mongo Connected");

    await Service.deleteMany({});
    console.log("🗑 Cleared old services");

    await Service.insertMany(services);
    console.log(`🚀 Inserted ${services.length} services`);

    await mongoose.disconnect();
    console.log("🔌 Done");

    process.exit(0);

  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
