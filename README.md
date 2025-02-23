# 📌 CloudHive Feature Idea Portal

A proof-of-concept (PoC) **Next.js 15** web application for submitting, voting, and exploring feature ideas.

---

## 🚀 Getting Started

### **Prerequisites**  
Ensure you have the following installed:  
- **Node.js 18+**  
- **pnpm** (package manager)  

### **Installation & Running Locally**  
Clone the repository and install dependencies:  
```bash
git clone https://github.com/parchanp/Cloudhive-feature-portal.git
cd Cloudhive-feature-portal
pnpm install
pnpm run dev
```
The application will be available at **[http://localhost:3000](http://localhost:3000)**.  

---

## ⚙️ Design Constraints

### **Frontend-Only Architecture**  
- The app does not use a traditional database.  
- Data is stored in **JSON files** instead of a database.  
- **Server Actions** are used for handling data.  

### **Tech Stack**  
- **Next.js 15 (App Router)**  
- **React 19 + TypeScript**  
- **TailwindCSS** for styling  
- **pnpm** for package management  
- **react-hook-form** for form management  
- **TanStack Query** for client-side state management  


### **Scalability Constraints**  
- JSON file storage is **not suitable for large-scale applications**.  
- There is **no authentication** (assumed for internal use).  
- Server Actions should be **efficiently managed** for read/write operations.  

### **UI/UX Constraints**  
- **Pagination & Search** are required for idea exploration.  
- **Voting system** for ranking feature ideas.  
- The UI should be **minimal, fast, and user-friendly**.  

---

## 📌 Assumptions

- This project is an **internal tool** and does **not** require authentication.  
- Ideas are stored as **JSON objects**, which means data does **not persist** after server redeployments.  
- The UI follows a **simple and intuitive design** for ease of use.
- Any user can delete the idea from the list.

---

## 🚀 Future Enhancements

✅ **Database Integration** – Replace JSON storage with a database (e.g., PostgreSQL, MongoDB).  
✅ **Authentication & Authorization** – Implement user authentication and role-based access.  
✅ **Sorting & Filtering** – Improve idea exploration with better search and filter options.  
✅ **Improved UI/UX** – Add animations, themes, and mobile responsiveness enhancements.  

---


