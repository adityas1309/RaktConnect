# 🩸 RaktConnect - Smart Blood Donation Platform

RaktConnect is a **MERN + AI-powered** blood donation platform that connects **hospitals, donors, and patients**. It helps hospitals manage **blood inventory**, donors track **donation history**, and patients request **blood efficiently**.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Features

### 🏥 **Hospital Segment**
- 📊 **Real-time Blood Inventory** (View available blood units)
- 🔮 **AI-based Blood Demand Forecasting** (Predict future shortages)
- 📋 **Manage Blood Requests** (Prioritize urgent cases)
- 📈 **Hospital Dashboard** (Analytics & Reports)

### 🩸 **Donor Segment**
- 🔄 **Donor Registration & Profile Management**
- 📆 **Donation History Tracking**
- 🔔 **AI-based Donation Reminders**
- 📊 **Donor Eligibility Insights (Chart-based)**

### 🚑 **Patient Segment**
- 🏥 **Blood Request System** (Submit & Track Requests)
- 🔄 **Match with Nearest Donors/Hospitals**
- 📝 **Medical History & Profile Management**
- 📊 **Blood Request Status Dashboard**

---

## 🛠 Tech Stack

| **Technology**      | **Purpose** |
|---------------------|------------|
| **MongoDB**        | Database for storing users, donors, and blood inventory |
| **Express.js**     | Backend framework for API handling |
| **React.js**       | Frontend framework for the user interface |
| **Node.js**        | Server-side runtime environment |
| **Recharts** | Data visualization for reports & analytics |
| **Tailwind CSS**   | Modern UI design framework |
| **Python**   | For AI data predictions |

---

## 📌 Installation & Setup

### **1️⃣ Clone the Repository**

In root folder
```
npm install
```

### Start client and server separately
```
cd client
npm run dev
```
```
cd server
npm run dev
```
### Start client and server together
In root
```
npm run dev
```

### **2️⃣ Docker Setup**
1. **For Client** 
- **Build**
```
docker build -t raktconnect-client .
```
- **Run**
```
docker run -p 5173:5173 raktconnect-client
```
2. **For Server** 
- **Build**
```
docker build -t raktconnect-server .
```
- **Run**
```
docker run -p 3000:3000 raktconnect-server
```

3. **For whole project**
```
docker-compose up --build
```


## 📝 License

This project is licensed under the [MIT License](LICENSE).



