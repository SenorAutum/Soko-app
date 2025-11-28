# ⚡ SOKO: Peer-to-Peer Energy Marketplace

> **Empowering communities to trade surplus solar energy using local payment rails.**

![SOKO Banner](Soko-app/client/public/logo.png)

## 🎯 The Mission
In many African communities, energy access is unreliable, yet solar owners often have surplus power they cannot monetize. **SOKO** bridges this gap by creating a decentralized marketplace where:
1.  **Producers** sell excess solar/biogas energy.
2.  **Consumers** buy affordable power during grid blackouts.
3.  **Communities** track their collective CO2 offset in real-time.

---

## ✨ Key Features (MVP)

### 1. 📊 Real-Time Impact Dashboard
- **Live Analytics:** A dynamic header tracks **CO2 Saved** (kg) and **Active Nodes** on the network in real-time.
- **Visual Feedback:** Pulse animations demonstrate network activity to the user.

### 2. 🔍 Smart Energy Discovery
- **Category Filtering:** Users can instantly toggle between **Solar**, **Grid**, and **Biogas** sources using a responsive filter bar.
- **Geospatial Clustering:** Listings are sorted by relevance and availability.

### 3. ✅ Trust & Verification
- **Verified Badges:** Trusted high-volume producers are marked with a "Verified" blue tick to ensure network safety.
- **Transparent Pricing:** All costs are calculated per kWh with no hidden fees.

### 4. 💳 Seamless Payments (M-Pesa Integration)
- **Instant Settlement:** Simulated integration with **Daraja API (M-Pesa)**.
- **Digital Receipts:** Upon purchase, the system generates a professional, detailed digital receipt overlay with transaction references.

### 5. 🛡️ Resilient Architecture ("Offline Mode")
- **Failsafe Design:** The application includes a robust fallback mode. If the cloud database connection drops (common in low-bandwidth areas), the system automatically switches to a local cached dataset to ensure the UI never breaks.

---

## 🛠️ Tech Stack

**Frontend:**
- **React.js:** Component-based UI architecture.
- **Framer Motion:** High-fidelity animations (page transitions, modal popups).
- **CSS3 Variables:** Custom "Afro-Futurist" Dark Mode theme (`#121212` bg, `#D4AF37` accents).

**Backend:**
- **Node.js & Express:** REST API logic.
- **Serverless Functions:** Deployed via Netlify Functions for infinite scalability and zero idle costs.
- **MongoDB Atlas:** Cloud document store for listings and user profiles.

---

## 🚀 How to Run Locally

This project is optimized for **GitHub Codespaces** and **Netlify Dev**.

1.  **Clone & Install Dependencies**
    ```bash
    npm install
    cd client && npm install && cd ..
    ```

2.  **Start the Development Server**
    (Runs both Frontend and Backend on ports 3000/8888)
    ```bash
    netlify dev
    ```

3.  **View the App**
    Open your browser to the local port (usually `http://localhost:8888`).

---

## 🔮 Future Roadmap

- **Blockchain Settlement:** Integration with **Hedera/USDC** for transparent, cross-border energy trading.
- **IoT Smart Meters:** Hardware integration to automatically log kWh usage and trigger "Pay-as-you-go" transactions.
- **Agent Network:** Onboarding local kiosks to sell energy vouchers for cash.

---

*Built with ❤️*
