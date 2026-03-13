# Student Management

# backend of project

### folder structure

```pgsql

│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── note.routes.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── note.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── utils/
│   │   └── token.js
│   │
│   └── app.js
│
├── server.js
├── .env
└── package.json
```

### file structure

```pgsql


frontend/
│
├── index.html              # Entry point (redirect to login)
│
├── pages/
│   ├── login.html          # Login page
│   ├── register.html       # Register page
│   └── dashboard.html      # Dashboard (protected)
│
├── css/
│   └── style.css           # Global styles, theme, fonts
│
├── js/
│   ├── auth.js             # Login & Register logic
│   ├── dashboard.js        # Dashboard logic
│   └── utils.js            # Helper functions (JWT, redirect)
│
├── assets/
│   ├── images/             # Logos, icons, illustrations
│   └── icons/              # SVG icons (optional)
│
└── README.md               # Frontend documentation

```

### project flow

```

START
  |
  v
Login Page
  |
  |-- success --> Save JWT
  |
  v
Dashboard
  |
  |-- View Notes --> Notes List Page
  |       |
  |       |-- Add --> Add/Edit Page
  |       |
  |       |-- Edit --> Add/Edit Page
  |       |
  |       |-- Delete --> Refresh List
  |
  |-- Profile --> Profile Page
  |
  |-- Logout --> Clear JWT --> Login Page
```
