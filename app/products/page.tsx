"use client";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { ShoppingBag } from "lucide-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import { SignedOut, SignInWithMetamaskButton } from "@clerk/clerk-react";
import { getContract } from "../utils/contractUtils";
import SelfieCapture from "../SelfieCapture";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "NoiseGuard Pro X1",
    brand: "SoundMaster",
    description:
      "Experience pure audio bliss with our flagship noise-canceling headphones. Features 40mm premium drivers, 30-hour battery life, and ultra-comfortable memory foam ear cushions.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    price: 299.99,
    rating: 4.5,
    userRating: null as number | null, // Add a field to store the user's rating
  },
  {
    id: 2,
    name: "FitTech Pulse",
    brand: "TechWear",
    description:
      "Advanced fitness tracking smartwatch with continuous heart rate monitoring, GPS, and 20+ sport modes. Water-resistant up to 50m.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    price: 199.99,
    rating: 4.2,
    userRating: null,
  },
  {
    id: 3,
    name: "BrewMaster Elite",
    brand: "HomeBarista",
    description:
      "Professional-grade coffee maker with built-in ceramic burr grinder, 15 grind settings, and programmable brewing schedule. Makes up to 12 cups.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    price: 249.99,
    rating: 4.7,
    userRating: null,
  },
  {
    id: 4,
    name: "AirFlow Pro",
    brand: "TechCool",
    description:
      "Smart portable air purifier with HEPA filter, air quality sensor, and mobile app control. Perfect for rooms up to 500 sq ft.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800",
    price: 179.99,
    rating: 4.4,
    userRating: null,
  },
  {
    id: 5,
    name: "LuxeLight Lamp",
    brand: "ModernHome",
    description:
      "Modern LED desk lamp with wireless charging base, adjustable color temperature, and touch controls. Perfect for home office.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    price: 89.99,
    rating: 4.3,
    userRating: null,
  },
];

const App = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [visibleProductId, setVisibleProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<
    {
      id: number;
      name: string;
      brand: string;
      description: string;
      image: string;
      price: number;
      rating: number;
      userRating: number | null;
    }[]
  >(SAMPLE_PRODUCTS); // Use state to manage products
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const user = useUser();

  const videoConstraints = {
    facingMode: "user", // Use the selfie camera
  };

  const handleRatingUpdate = (productId: number, userRating: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              userRating, // Update the user's rating
              rating: (product.rating + userRating) / 2, // Update the overall rating
            }
          : product
      )
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productId = entry.target.getAttribute("data-product-id");
            if (productId) {
              setVisibleProductId(productId);
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      productRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      {user ? (
        <div className="h-screen mt-15 overflow-y-scroll snap-mandatory snap-y bg-black text-white flex justify-center">
          <div className="w-[375px] relative">
            {products.map((product, index) => (
              <div
                key={product.id}
                data-product-id={product.id}
                ref={(el) => {
                  productRefs.current[index] = el;
                }}
                className="relative snap-center w-full h-screen flex flex-col items-center justify-end bg-black rounded-lg overflow-hidden shadow-lg"
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />

                {/* Webcam Preview */}
                <div className="absolute top-4 right-4 border-2 border-white rounded-lg overflow-hidden shadow-md">
                  <SelfieCapture
                    productId={product.id}
                    shouldCapture={visibleProductId === product.id.toString()}
                    apiKey="AIzaSyDnWNHPBFTPHtPbepgSQwIg0VYC-34arhA"
                    companyAddress="0x4Fa558486d2185cA34DD4708E198d9f3fE6663f8"
                    productIndex={index}
                    onRating={(rating) =>
                      handleRatingUpdate(product.id, rating)
                    } // Pass the rating handler
                  />
                </div>

                {/* Product Details */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black p-6 text-left">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-sm font-light">{product.brand}</p>
                  <p className="text-sm italic line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-yellow-400">
                    ⭐ {product.rating.toFixed(1)}
                  </p>
                  {product.userRating && (
                    <p className="text-green-400">
                      Your Rating: ⭐ {product.userRating}
                    </p>
                  )}
                  <button className="mt-3 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold shadow-md">
                    <ShoppingBag size={18} /> Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen flex items-center justify-center">
          <SignInWithMetamaskButton />
        </div>
      )}
    </>
  );
};

export default App;
