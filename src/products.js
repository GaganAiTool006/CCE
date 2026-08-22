export const products = [
  {
    id: "p1",
    title: {
      en: "Aura Watch Ultra Titanium",
      hi: "ऑरा वॉच अल्ट्रा टाइटेनियम"
    },
    category: "electronics",
    priceUSD: 299.99,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    badgeType: "hot",
    image: "/images/smartwatch.jpg",
    description: {
      en: "Advanced aerospace-grade titanium smartwatch with real-time biometric tracking, dual-frequency GPS, and up to 7-day battery life.",
      hi: "एयरोस्पेस ग्रेड टाइटेनियम स्मार्टवॉच, बायोमेट्रिक ट्रैकिंग, डुअल-फ्रीक्वेंसी GPS और 7 दिनों की बैटरी लाइफ के साथ।"
    },
    specs: [
      "Material: Titanium Alloy Grade 5",
      "Display: 1.96\" AMOLED Retina, 2000 nits",
      "Battery: 520 mAh (Up to 7 Days)",
      "Water Resistance: 10 ATM (100m)",
      "Sensors: ECG, SpO2, Heart Rate, Temperature"
    ],
    inStock: true,
    colors: ["#1e293b", "#e2e8f0", "#ea580c"],
    sizes: ["44mm", "49mm"]
  },
  {
    id: "p2",
    title: {
      en: "Apex Pro Wireless ANC Headphones",
      hi: "एपेक्स प्रो वायरलेस हेडफोन"
    },
    category: "electronics",
    priceUSD: 199.99,
    rating: 4.8,
    reviewsCount: 98,
    badge: "Sale 20% OFF",
    badgeType: "sale",
    image: "/images/headphones.jpg",
    description: {
      en: "Immersive spatial audio with hybrid active noise cancellation (ANC), custom 40mm beryllium drivers, and 40-hour playback.",
      hi: "हाइब्रिड एक्टिव नॉइज़ कैंसिलेशन, 40mm बेरिलियम ड्राइवरों और 40 घंटे के प्लेबैक के साथ इमर्सिव स्पेशल ऑडियो।"
    },
    specs: [
      "ANC level: -45dB Hybrid Active Noise Cancelling",
      "Driver size: 40mm Custom Beryllium",
      "Bluetooth: v5.4 with LDAC & aptX Lossless",
      "Battery: 40 Hours (ANC ON), Fast Charging (10m = 5h)"
    ],
    inStock: true,
    colors: ["#0f172a", "#94a3b8", "#7c3aed"],
    sizes: ["Standard"]
  },
  {
    id: "p3",
    title: {
      en: "CyberRunner Futuristic Sneakers",
      hi: "साइबर-रनर फ्यूचरिस्टिक स्नीकर्स"
    },
    category: "fashion",
    priceUSD: 149.50,
    rating: 4.7,
    reviewsCount: 86,
    badge: "New Arrival",
    badgeType: "new",
    image: "/images/sneakers.jpg",
    description: {
      en: "Ergonomic mesh sneakers with shock-absorbing nitrogen-infused soles, responsive recoil bounce, and breathable futuristic pattern.",
      hi: "नाइट्रोजन-इन्फ्यूज्ड सोल्स, रेस्पॉन्सिव रिकॉइल बाउंस और फ्यूचरिस्टिक डिज़ाइन के साथ एर्गोनॉमिक स्नीकर्स।"
    },
    specs: [
      "Sole: Nitrogen-infused Kinetic Cushion",
      "Upper: 3D Printed Recycled Breathable Mesh",
      "Weight: 280g per shoe",
      "Lacing: Quick-lock dial lacing system"
    ],
    inStock: true,
    colors: ["#06b6d4", "#3b82f6", "#111827"],
    sizes: ["US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "p4",
    title: {
      en: "NeonGlide RGB Mechanical Keyboard",
      hi: "नियोन-ग्लाइड आरजीबी मैकेनिकल कीबोर्ड"
    },
    category: "gaming",
    priceUSD: 129.00,
    rating: 4.9,
    reviewsCount: 215,
    badge: "Top Rated",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description: {
      en: "Gasket-mounted hot-swappable mechanical gaming keyboard with per-key RGB backlighting, custom lubricated linear switches, and aluminum body.",
      hi: "गैस्केट-माउंटेड हॉट-स्वैपेबल मैकेनिकल गेमिंग कीबोर्ड, आरजीबी बैकलाइटिंग और एल्युमिनियम बॉडी के साथ।"
    },
    specs: [
      "Layout: 75% Compact (82 Keys)",
      "Switches: Pre-lubed Linear Custom Crystal Switches",
      "Connectivity: Tri-Mode (2.4Ghz Wireless, Bluetooth 5.2, Type-C)",
      "Battery: 4000mAh"
    ],
    inStock: true,
    colors: ["#111827", "#8b5cf6", "#ec4899"],
    sizes: ["75% Layout"]
  },
  {
    id: "p5",
    title: {
      en: "Luminary Minimalist Desk Lamp",
      hi: "लुमिनरी मिनिमलिस्ट डेस्क लैंप"
    },
    category: "home",
    priceUSD: 79.99,
    rating: 4.6,
    reviewsCount: 64,
    badge: "Trending",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: {
      en: "Ultra-sleek aluminum LED desk lamp featuring wireless phone charging pad, stepless dimming, and optical eye-protection technology.",
      hi: "वायरलेस फोन चार्जिंग पैड, स्टेपलेस डिमिंग और आई-प्रोटेक्शन तकनीक के साथ ऑल-एल्युमिनियम एलइडी डेस्क लैंप।"
    },
    specs: [
      "Power: 15W LED + 15W Qi Fast Wireless Charger",
      "Color Temp: 2700K - 6500K (Warm to Cool White)",
      "Material: Anodized Matte Aluminum",
      "Controls: Touch sensor bar & remote app"
    ],
    inStock: true,
    colors: ["#0f172a", "#f8fafc", "#eab308"],
    sizes: ["Standard"]
  },
  {
    id: "p6",
    title: {
      en: "VaporPulse Ergonomic Gaming Chair",
      hi: "वेपर-पल्स एर्गोनॉमिक गेमिंग चेयर"
    },
    category: "gaming",
    priceUSD: 349.00,
    rating: 4.8,
    reviewsCount: 178,
    badge: "Sale 15% OFF",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80",
    description: {
      en: "Professional esports gaming chair with magnetic memory foam lumbar support, 4D adjustable armrests, and 165° tilt recline.",
      hi: "मैग्नेटिक मेमोरी फोम सपोर्ट, 4D आर्मरेस्ट और 165 डिग्री रीक्लाइन के साथ प्रोफेशनल गेमिंग चेयर।"
    },
    specs: [
      "Material: Breathable Softweave Fabric & PU Leather",
      "Base: Heavy Duty Class 4 Gas Lift Hydraulic Steel",
      "Max Load: 150 kg (330 lbs)",
      "Recline Angle: 90° - 165°"
    ],
    inStock: true,
    colors: ["#0f172a", "#ef4444", "#3b82f6"],
    sizes: ["Large", "XL"]
  },
  {
    id: "p7",
    title: {
      en: "Nomad Urban Waterproof Backpack",
      hi: "नोमैड अर्बन वाटरप्रूफ बैकपैक"
    },
    category: "fashion",
    priceUSD: 89.99,
    rating: 4.7,
    reviewsCount: 112,
    badge: "Bestseller",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: {
      en: "Weatherproof roll-top tech backpack with hidden anti-theft pockets, USB-C pass-through charging port, and 16-inch laptop compartment.",
      hi: "एंटी-थेफ्ट पॉकेट्स, 16-इंच लैपटॉप कम्पार्टमेन्ट और USB-C चार्जिंग पोर्ट के साथ वाटरप्रूफ बैकपैक।"
    },
    specs: [
      "Capacity: 25L - 32L Expandable",
      "Laptop Fit: Up to 16.5 inch MacBook Pro",
      "Fabric: 900D Waterproof Cordura Nylon",
      "Weight: 950g"
    ],
    inStock: true,
    colors: ["#18181b", "#475569", "#15803d"],
    sizes: ["25L"]
  },
  {
    id: "p8",
    title: {
      en: "AeroSound Mini Portable Speaker",
      hi: "एयरो-साउंड मिनी पोर्टेबल स्पीकर"
    },
    category: "electronics",
    priceUSD: 59.99,
    rating: 4.5,
    reviewsCount: 54,
    badge: "Popular",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    description: {
      en: "IPX7 waterproof outdoor Bluetooth speaker delivering 360-degree punchy bass, party sync link up to 100 units, and 18h battery.",
      hi: "IPX7 वाटरप्रूफ आउटडोर ब्लूटूथ स्पीकर, 360-डिग्री बास और 18 घंटे बैटरी बैकअप के साथ।"
    },
    specs: [
      "Output: 20W Peak RMS Audio Output",
      "Waterproof Rating: IPX7 Submersible",
      "Battery Life: Up to 18 Hours",
      "Weight: 420g"
    ],
    inStock: true,
    colors: ["#0284c7", "#e11d48", "#16a34a"],
    sizes: ["Compact"]
  }
];

export const coupons = {
  "DISCOUNT10": 0.10,
  "FLASH20": 0.20,
  "WELCOME15": 0.15,
  "SPECIAL50": 0.50
};
