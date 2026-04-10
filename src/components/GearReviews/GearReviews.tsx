import { useEffect } from "react";
import "./styles/gearStyle.css";

import logitechImg from "../../assets/images/amazon/logitech_g502.jpg";
import deathadderImg from "../../assets/images/amazon/razer_deathadder.jpg";
import redragonImg from "../../assets/images/amazon/red_dragon.jpg";
import corsairImg from "../../assets/images/amazon/corsair.jpg";
import hyperXImg from "../../assets/images/amazon/hyper_x.jpg";
import krakenImg from "../../assets/images/amazon/razer_kraken.jpg";
import aocImg from "../../assets/images/amazon/aoc.jpg";
import asusImg from "../../assets/images/amazon/asus.jpg";
import homallImg from "../../assets/images/amazon/homall.jpg";
import officeChairImg from "../../assets/images/amazon/officechair.jpg";

interface GearItem {
    id: number;
    name: string;
    category: "mouse" | "keyboard" | "headset" | "monitor" | "chair";
    description: string;
    price: string;
    amazonUrl: string;
    imageUrl: string;
}

const GEAR_ITEMS: GearItem[] = [
    {
        id: 1,
        name: "Logitech G502 HERO",
        category: "mouse",
        description: "Affordable wired mouse with HERO 25K sensor. Customizable weights and programmable buttons.",
        price: "$39.99",
        amazonUrl: "https://amzn.to/4vlrPpf",
        imageUrl: logitechImg
    },
    {
        id: 2,
        name: "Razer DeathAdder Elite",
        category: "mouse",
        description: "Classic ergonomic design with 16K DPI optical sensor. Durable switches rated for 50M clicks.",
        price: "$49.99",
        amazonUrl: "https://amzn.to/48CgSWy",
        imageUrl: deathadderImg
    },
    {
        id: 3,
        name: "Redragon K552 Mechanical Keyboard",
        category: "keyboard",
        description: "Compact TKL with Outemu blue switches. RGB backlighting and durable ABS keycaps.",
        price: "$29.99",
        amazonUrl: "https://amzn.to/4tJcj5b",
        imageUrl: redragonImg
    },
    {
        id: 4,
        name: "Corsair K55 RGB PRO",
        category: "keyboard",
        description: "Quiet membrane keys with RGB backlighting. Dedicated macro keys and media controls.",
        price: "$49.99",
        amazonUrl: "https://amzn.to/3Qu2ERq",
        imageUrl: corsairImg
    },
    {
        id: 5,
        name: "HyperX Cloud Stinger Core",
        category: "headset",
        description: "Lightweight wireless headset with 7.1 surround sound. Memory foam ear cushions.",
        price: "$39.99",
        amazonUrl: "https://amzn.to/4t4J6Sg",
        imageUrl: hyperXImg
    },
    {
        id: 6,
        name: "Razer Kraken X Lite",
        category: "headset",
        description: "Lightweight wired headset with 40mm drivers. Flexible cardioid mic with in-line controls.",
        price: "$29.99",
        amazonUrl: "https://amzn.to/4slIA0P",
        imageUrl: krakenImg
    },
    {
        id: 7,
        name: "AOC 24G2 144Hz Monitor",
        category: "monitor",
        description: "24\" 1080p 144Hz IPS panel with 1ms response time. FreeSync compatible.",
        price: "$149.99",
        amazonUrl: "https://amzn.to/4sVVIei",
        imageUrl: aocImg
    },
    {
        id: 8,
        name: "ASUS VP248QGL 75Hz Monitor",
        category: "monitor",
        description: "24\" 1080p 75Hz with 1ms response. Adaptive-Sync for smooth gameplay.",
        price: "$129.99",
        amazonUrl: "https://amzn.to/4tCuR6U",
        imageUrl: asusImg
    },
    {
        id: 9,
        name: "Homall Gaming Chair",
        category: "chair",
        description: "Ergonomic racing style chair with lumbar pillow. Adjustable armrests and reclining back.",
        price: "$159.99",
        amazonUrl: "https://amzn.to/4ty7dZb",
        imageUrl: homallImg
    },
    {
        id: 10,
        name: "BestOffice PC Gaming Chair",
        category: "chair",
        description: "Affordable with thick padding and sturdy base. 360° swivel and adjustable height.",
        price: "$139.99",
        amazonUrl: "https://amzn.to/3Q04MAh",
        imageUrl: officeChairImg
    }
];

const CATEGORIES = ["all", "mouse", "keyboard", "headset", "monitor", "chair"] as const;

export function GearReviews() {
    useEffect(() => {
        document.title = "LiveLoLScore — Affordable Gaming Gear | Best Budget Gaming Peripherals 2025";
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaDescription) metaDescription.setAttribute("content", "Discover the best affordable & budget & affordable gaming gear under $200 for League of Legends. Affordable gaming mice, keyboards, headsets, monitors, and chairs reviewed and recommended.");
        if (metaKeywords) metaKeywords.setAttribute("content", "affordable gaming gear, cheap gaming mouse, affordable gaming keyboard, budget gaming headset, budget gaming monitor, gaming chair under 200");
    }, []);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "mouse":
                return "🖱️";
            case "keyboard":
                return "⌨️";
            case "headset":
                return "🎧";
            case "monitor":
                return "🖥️";
            case "chair":
                return "🪑";
            default:
                return "⚙️";
        }
    };

    return (
        <div className="gear-container">
            <div className="gear-header">
                <h1 className="gear-title">Affordable Gaming Gear</h1>
                <p className="gear-subtitle">Best affordable gaming gear under $200 for League of Legends</p>
            </div>

            <div className="gear-grid">
                {GEAR_ITEMS.map((item) => (
                    <a
                        key={item.id}
                        href={item.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="gear-card-link"
                    >
                        <div className="gear-card">
                            <div className="gear-card-badge">
                                {getCategoryIcon(item.category)}
                            </div>
                            <div className="gear-card-image">
                                <img src={item.imageUrl} alt={item.name} />
                            </div>
                            <div className="gear-card-content">
                                <h3 className="gear-card-title">{item.name}</h3>
                                <p className="gear-card-description">{item.description}</p>
                                <div className="gear-card-footer">
                                    <span className="gear-price">{item.price}</span>
                                    <span className="gear-buy-btn">View on Amazon</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="gear-disclaimer">
                <p>
                    As an Amazon Associate, we earn from qualifying purchases. 
                    Prices and availability subject to change.
                </p>
            </div>
        </div>
    );
}
