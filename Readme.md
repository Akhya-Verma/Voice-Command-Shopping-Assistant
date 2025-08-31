# 🛒 Voice Command Shopping Assistant  

A full-stack web app that lets users manage their shopping list using **voice commands 🎙**, with smart suggestions, product search, and **MongoDB persistence**.  

---

## 🚀 Features  
- 🎙 **Voice Input** → Add/Remove items hands-free using speech recognition  
- 🛍 **Shopping List** → Items grouped by category (🥦 Produce, 🥛 Dairy, etc.)  
- ✨ **Smart Suggestions** → Recommended items based on shopping history  
- 🔎 **Product Search** → Search products by name, category, brand, or price  
- 🗂 **Persistence** → Items saved in **MongoDB Atlas (cloud database)**  
- 📱 **Mobile-First UI** → Responsive design with **TailwindCSS**  
- 🌐 **Deployed** → Backend on **Render**, Frontend on **Vercel**  

---

## 📂 Project Structure  

```
Voice-Command-Shopping-Assistant/
│── backend/             # Express.js + MongoDB backend
│   ├── app.js           # Main server
│   ├── models/Item.js   # Mongoose schema
│   ├── services/        # NLP, search, suggestions
│   ├── data/            # (if using JSON persistence)
│   └── package.json
│
│── frontend/            # React + Tailwind frontend
│   ├── src/
│   │   ├── components/  # VoiceInput, ShoppingList, Suggestions, Search
│   │   ├── api.js       # API calls
│   │   └── App.js       # Main UI
│   └── package.json
│
│── README.md
```

---

## ⚙ Tech Stack  

- **Frontend**: React, TailwindCSS, react-hot-toast  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas (via Mongoose)  
- **Deployment**:  
  - Backend → Render  
  - Frontend → Vercel  

---

## 🔧 Setup Instructions  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/<your-username>/Voice-Command-Shopping-Assistant.git
cd Voice-Command-Shopping-Assistant
```

### 2️⃣ Setup Backend  
```bash
cd backend
npm install
```

Create a `.env` file inside **backend/** with:  
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shoppingAssistant
```

Run backend:  
```bash
npm run dev
```
👉 Backend runs on: **http://localhost:5000**

---

### 3️⃣ Setup Frontend  
```bash
cd frontend
npm install
```

Update **frontend/src/api.js**:  
```js
const API_URL = "http://localhost:5000"; // or your Render URL after deployment
```

Run frontend:  
```bash
npm start
```
👉 Frontend runs on: **http://localhost:3000**

---

## 🌍 Deployment  

### 🔹 Backend (Render)  
1. Push **backend** folder to GitHub  
2. On Render → New Web Service → connect repo  
3. **Build Command**: `npm install`  
4. **Start Command**: `npm start`  
5. Add environment variable:  
   ```
   MONGO_URI=your-mongo-atlas-uri
   ```  
6. Deploy → Get backend URL (e.g. `https://voice-shopping-backend.onrender.com`)  

---

### 🔹 Frontend (Render)  
1. Push **frontend** folder to GitHub  
2. On Vercel → New Project → connect repo  
3. **Build Command**: `npm run build`  
4. **Output Directory**: `build`  
5. Deploy → Get frontend URL (e.g. `https://voice-command-shopping-assistant-1-7qwl.onrender.com`)  

---

## 🎯 Example Voice Commands  

- **“Add two apples”** → adds 2 apples under *Produce*  
- **“Remove milk”** → removes *milk*  
- **“Find dairy under 10”** → searches dairy products below $10  

---

## 📸 Screenshots
<img src="https://github.com/Akhya-Verma/Voice-Command-Shopping-Assistant/blob/main/Screenshot%202025-09-01%20at%203.20.38%E2%80%AFAM.png" alt="Home Page" width="600"/>
<img src="https://github.com/Akhya-Verma/Voice-Command-Shopping-Assistant/blob/main/Screenshot%202025-09-01%20at%203.20.52%E2%80%AFAM.png" alt="Home Page" width="600"/>
<img src="https://github.com/Akhya-Verma/Voice-Command-Shopping-Assistant/blob/main/Screenshot%202025-09-01%20at%203.20.46%E2%80%AFAM.png" alt="Home Page" width="600"/>

---

## 👩‍💻 Author  
Developed by Akhya Verma❤️✨  
