import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      brand: "Islamic City Builders",
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        gallery: "Gallery",
        videos: "Videos",
        smart: "Smart Features",
        isma: "ISMA Ecosystem",
        contact: "Contact",
      },
      hero: {
        eyebrow: "Bangladesh • Islamic Smart City",
        title1: "Where Faith",
        title2: "Meets the Future.",
        subtitle:
          "Bangladesh's first modern Islamic smart city — an ethical, secure, and serene future of urban living, engineered with world-class precision.",
        ctaPrimary: "Free Consultation",
        ctaSecondary: "Explore Projects",
        scroll: "Scroll to explore",
      },
      stats: {
        projects: "Mega Projects",
        flats: "Flat Plans",
        features: "Smart Features",
        partners: "Sub-Brands",
      },
      why: {
        eyebrow: "Why Islamic Smart City",
        title: "A home is not just walls —\nit's an ethical way of life.",
        body: "A rare union of Islamic values and advanced technology, designed for families who refuse to compromise on either.",
        items: [
          { t: "Islamic Environment", d: "Mosques, mokteb, and a way of life designed around prayer." },
          { t: "Planned Living", d: "Master-planned communities with future-ready infrastructure." },
          { t: "Safe Residency", d: "24/7 security, surveillance and family-first architecture." },
          { t: "Smart Amenities", d: "Connected utilities, automation, and high-speed networks." },
          { t: "Separate Gyms", d: "Dedicated wellness facilities for men and women." },
          { t: "Library & Mokteb", d: "Education and learning at the heart of community." },
          { t: "Green Corridors", d: "Tree-lined boulevards, rooftop gardens, reflecting pools." },
          { t: "Family Security", d: "Gated, monitored, and built for generations." },
        ],
      },
      vision: {
        eyebrow: "Our Vision",
        title: "An Islamic Urban Life Model — built to last.",
        body: "Sustainable, modern, peaceful residency that holds Islamic values without ever sacrificing comfort.",
        points: [
          "Smart cities at every gateway to Dhaka",
          "Expansion across every division",
          "International brand vision",
          "Family-friendly environment",
          "Islamic Urban Life Model",
        ],
      },
      projects: {
        eyebrow: "Featured Projects",
        title: "Our Mega Projects",
        body: "Modern Islamic smart cities under construction across Bangladesh.",
        view: "View Details",
        items: {
          pisc: {
            tag: "PISC",
            name: "PUSP Islamic Smart City",
            location: "Shologhor, Sreenagar, Munshiganj",
            specs: [
              "Total area: 823 Katha",
              "22 Buildings",
              "2,360 Flats",
              "1,025 / 1,500 / 1,850 Sqft",
              "2 Basement + Ground + 15 Floors",
              "Separate gyms (Men / Women)",
              "Rooftop gardens",
              "Mokteb, library, prayer spaces",
            ],
          },
          mrisc: {
            tag: "MRISC",
            name: "Mirpur Islamic Smart City",
            location: "Mirpur, Dhaka",
            specs: [
              "Premium location",
              "Modern smart features",
              "Family-friendly design",
              "Islamic environment",
              "24/7 security",
              "Community center",
              "Rooftop garden",
              "Mosque & mokteb",
            ],
          },
        },
      },
      isma: {
        eyebrow: "Partner Ecosystem",
        title: "ISMA — Islamic Smart Marketing Agency",
        body: "Bangladesh's first Islamic smart marketing ecosystem. Ten sub-brands forming a complete Islamic way-of-life network.",
        brands: ["Smart City", "Education", "Media", "Technology", "Logistics", "Food", "Welfare", "Health", "Properties", "Science & Tech"],
      },
      cta: {
        eyebrow: "Limited Early-Booking Offer",
        title: "Book now at 30% discount",
        body: "Reserve your future home in the first wave. Our investment relations team will respond within 24 hours.",
        primary: "Free Consultation",
        secondary: "Download Brochure",
      },
      footer: {
        tagline: "Where faith meets the future.",
        rights: "All rights reserved.",
      },
    },
  },
  bn: {
    translation: {
      brand: "ইসলামিক সিটি বিল্ডার্স",
      nav: {
        home: "হোম",
        about: "পরিচিতি",
        projects: "প্রজেক্টস",
        gallery: "গ্যালারি",
        videos: "ভিডিও",
        smart: "স্মার্ট ফিচার",
        isma: "ISMA ইকোসিস্টেম",
        contact: "যোগাযোগ",
      },
      hero: {
        eyebrow: "বাংলাদেশ • ইসলামিক স্মার্ট সিটি",
        title1: "যেখানে ঈমান",
        title2: "ভবিষ্যতের সাথে মিলিত।",
        subtitle:
          "বাংলাদেশের প্রথম আধুনিক ইসলামিক স্মার্ট সিটি — একটি নৈতিক, নিরাপদ ও শান্তিপূর্ণ বসবাসের ভবিষ্যৎ।",
        ctaPrimary: "ফ্রি কনসালটেশন",
        ctaSecondary: "প্রজেক্ট দেখুন",
        scroll: "স্ক্রল করুন",
      },
      stats: {
        projects: "মেগা প্রজেক্ট",
        flats: "ফ্ল্যাট প্ল্যান",
        features: "স্মার্ট ফিচার",
        partners: "সাব-ব্র্যান্ড",
      },
      why: {
        eyebrow: "কেন ইসলামিক স্মার্ট সিটি",
        title: "বাড়ি শুধু দেয়াল নয় —\nএকটি নৈতিক জীবনব্যবস্থার কেন্দ্র।",
        body: "ইসলামিক মূল্যবোধ ও আধুনিক প্রযুক্তির এক অনন্য মেলবন্ধন।",
        items: [
          { t: "ইসলামিক পরিবেশ", d: "মসজিদ, মক্তব ও নামাজকেন্দ্রিক জীবনধারা।" },
          { t: "পরিকল্পিত জীবনব্যবস্থা", d: "মাস্টার প্ল্যান করা কমিউনিটি ও ফিউচার-রেডি অবকাঠামো।" },
          { t: "নিরাপদ আবাসন", d: "২৪/৭ সিকিউরিটি ও পরিবারকেন্দ্রিক ডিজাইন।" },
          { t: "স্মার্ট সুবিধা", d: "কানেক্টেড ইউটিলিটি, অটোমেশন ও হাই-স্পিড নেটওয়ার্ক।" },
          { t: "আলাদা জিম", d: "নারী ও পুরুষের জন্য ডেডিকেটেড ওয়েলনেস ফ্যাসিলিটি।" },
          { t: "লাইব্রেরি ও মক্তব", d: "কমিউনিটির কেন্দ্রে শিক্ষা ও জ্ঞানচর্চা।" },
          { t: "গ্রীন করিডোর", d: "গাছে ঘেরা পথ, রুফটপ গার্ডেন ও জলাশয়।" },
          { t: "পারিবারিক নিরাপত্তা", d: "গেটেড, মনিটরড ও প্রজন্মের জন্য নির্মিত।" },
        ],
      },
      vision: {
        eyebrow: "আমাদের ভিশন",
        title: "ইসলামিক আরবান লাইফ মডেল — দীর্ঘস্থায়ী।",
        body: "ইসলামিক মূল্যবোধ বজায় রেখে টেকসই, আধুনিক, আরামদায়ক ও শান্তিপূর্ণ আবাসন।",
        points: [
          "ঢাকার বিভিন্ন প্রবেশমুখে স্মার্ট সিটি",
          "প্রতিটি বিভাগে এক্সপ্যানশন",
          "আন্তর্জাতিক ব্র্যান্ড ভিশন",
          "পরিবারবান্ধব পরিবেশ",
          "Islamic Urban Life Model",
        ],
      },
      projects: {
        eyebrow: "ফিচার্ড প্রজেক্ট",
        title: "আমাদের মেগা প্রজেক্ট",
        body: "বাংলাদেশজুড়ে নির্মাণাধীন আধুনিক ইসলামিক স্মার্ট সিটি।",
        view: "বিস্তারিত দেখুন",
        items: {
          pisc: {
            tag: "PISC",
            name: "PUSP ইসলামিক স্মার্ট সিটি",
            location: "ষোলঘর, শ্রীনগর, মুন্সিগঞ্জ",
            specs: [
              "মোট এলাকা: ৮২৩ কাঠা",
              "ভবন: ২২টি",
              "ফ্ল্যাট: ২৩৬০",
              "১০২৫ / ১৫০০ / ১৮৫০ Sqft",
              "২ বেজমেন্ট + গ্রাউন্ড + ১৫ তলা",
              "জিম (নারী–পুরুষ আলাদা)",
              "রুফটপ গার্ডেন",
              "মক্তব, লাইব্রেরি, নামাজের স্থান",
            ],
          },
          mrisc: {
            tag: "MRISC",
            name: "মিরপুর ইসলামিক স্মার্ট সিটি",
            location: "মিরপুর, ঢাকা",
            specs: [
              "প্রিমিয়াম লোকেশন",
              "আধুনিক স্মার্ট ফিচার",
              "ফ্যামিলি-ফ্রেন্ডলি ডিজাইন",
              "ইসলামিক পরিবেশ",
              "২৪/৭ সিকিউরিটি",
              "কমিউনিটি সেন্টার",
              "রুফটপ গার্ডেন",
              "মসজিদ ও মক্তব",
            ],
          },
        },
      },
      isma: {
        eyebrow: "পার্টনার ইকোসিস্টেম",
        title: "ISMA — ইসলামিক স্মার্ট মার্কেটিং এজেন্সি",
        body: "বাংলাদেশের প্রথম ইসলামিক স্মার্ট মার্কেটিং ইকোসিস্টেম। ১০টি সাব-ব্র্যান্ড মিলে পূর্ণাঙ্গ ইসলামিক জীবনব্যবস্থা।",
        brands: ["স্মার্ট সিটি", "শিক্ষা", "মিডিয়া", "টেকনোলজি", "লজিস্টিক্স", "ফুড", "ওয়েলফেয়ার", "হেলথ", "প্রপার্টিজ", "সায়েন্স ও টেক"],
      },
      cta: {
        eyebrow: "সীমিত আর্লি-বুকিং অফার",
        title: "৩০% ডিসকাউন্টে বুকিং দিন",
        body: "প্রথম তরঙ্গে আপনার ভবিষ্যৎ বাসস্থান সংরক্ষণ করুন। আমাদের টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।",
        primary: "ফ্রি কনসালটেশন",
        secondary: "ব্রোশিওর ডাউনলোড",
      },
      footer: {
        tagline: "যেখানে ঈমান ভবিষ্যতের সাথে মিলিত।",
        rights: "সকল অধিকার সংরক্ষিত।",
      },
    },
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: resources as never,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
