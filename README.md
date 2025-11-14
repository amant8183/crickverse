# 🏏 Crickverse  
**A modern fantasy cricket web app built with React, TypeScript, and Tailwind CSS**  

Create your own fantasy teams, pick players under credit and role constraints, assign Captain & Vice-Captain, and compete in matches — all within a clean, responsive interface.  

---

## 🚀 Features
- View upcoming cricket matches  
- Create multiple teams per match  
- Player selection with credit & role restrictions  
- Choose Captain and Vice-Captain  
- View, edit, and manage all created teams  
- Responsive and user-friendly interface  

---

## 🧠 Tech Stack
| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **State Management** | React Context API |
| **API Data** | JSON endpoints (LeagueX mock APIs) |
| **Version Control** | Git + GitHub |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/crickverse.git
cd crickverse
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add:
```bash
VITE_APP_NAME=Crickverse
VITE_API_MATCHES_URL=https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_upcoming_Matches.json
VITE_API_PLAYERS_URL=https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 📁 Folder Structure
```
crickverse/
├── public/                 # Static assets
├── src/
│   ├── api/                # API handlers
│   ├── components/         # Reusable UI components
│   │   └── common/         # Buttons, modals, loaders, etc.
│   ├── context/            # Global state management
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout and navbar
│   ├── pages/              # App pages (UpcomingMatches, PickPlayers, etc.)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Helpers, constants, validation logic
│   ├── styles/             # Global Tailwind styles
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts       # Vite environment type declarations
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔗 API Endpoints
- **Upcoming Matches:**  
  `https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_upcoming_Matches.json`

- **Players List:**  
  `https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json`

---

## 🧩 Functional Requirements (Summary)
- Users can select upcoming matches  
- Create multiple fantasy teams per match  
- Select 11 players under these conditions:
  - Max **7 players** from one real team  
  - Total **100 credits** per team  
  - Role restrictions:  
    - 3–7 Batsmen  
    - 1–5 Wicket Keepers  
    - 0–4 All Rounders  
    - 3–7 Bowlers  
- Choose **Captain** and **Vice-Captain**  
- View, edit, and manage saved teams  

---

## 💅 UI & Design Notes
- Responsive layout built with Tailwind CSS  
- Clean typography and spacing using Tailwind utilities  
- Grid layout for player selection and filters  
- Sticky bottom bar showing credits left, player count, and selected roles  
- Navigation using React Router  

---

## 🧑‍💻 Author
**Aman Tiwari**  
💼 [GitHub](https://github.com/amant8183) • [LinkedIn](https://www.linkedin.com/in/aman-tiwari-4a329627b/)  

---

## 📜 License
This project is licensed under the **MIT License** — feel free to use, modify, and distribute with credit.  

---

## 🌟 Repository Description
> 🏏 A modern fantasy cricket web app built with React, TypeScript, and Tailwind CSS — create teams, pick players, and play your own Crickverse.
