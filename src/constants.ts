import { Guide, Part } from "./types";

export const MOCK_GUIDES: Guide[] = [
  {
    id: "145677",
    name: "MacBook Pro 14\" 2021 Battery Replacement",
    device: "MacBook Pro 14\"",
    category: "Computers",
    difficulty: "Difficult",
    time: "2-3 hours",
    score: 6,
    steps: [],
    tools: ["P5 Pentalobe", "T5 Torx", "Suction Handle"],
    parts: ["MacBook Pro 14\" Battery"]
  },
  {
    id: "135702",
    name: "iPhone 12 Screen Replacement",
    device: "iPhone 12",
    category: "Mobile",
    difficulty: "Moderate",
    time: "1-2 hours",
    score: 8,
    steps: [],
    tools: ["P2 Pentalobe", "Tri-point Y000", "Phillips #000"],
    parts: ["iPhone 12 Screen Assembly"]
  },
  {
    id: "104033",
    name: "Nintendo Switch Battery Replacement",
    device: "Nintendo Switch",
    category: "Consoles",
    difficulty: "Easy",
    time: "30-45 minutes",
    score: 9,
    steps: [],
    tools: ["JIS 000", "Phillips #00", "Spudger"],
    parts: ["Switch Replacement Battery"]
  },
  {
    id: "149254",
    name: "Steam Deck SSD Replacement",
    device: "Steam Deck",
    category: "Consoles",
    difficulty: "Moderate",
    time: "20-30 minutes",
    score: 9,
    steps: [],
    tools: ["Phillips #1", "Tweezers", "Spudger"],
    parts: ["M.2 2230 NVMe SSD"]
  }
];

export const MOCK_PARTS: Part[] = [];

export const CATEGORIES = ["Farming Equipment", "Mobile & Electronics", "Consumer Durables", "Automobile Equipment"];
