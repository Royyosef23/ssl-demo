# SSL Demo - Modern Web Application

אפליקציית ווב מתקדמת הבנויה עם **Node.js**, **TypeScript** ו-**Express.js**. האפליקציה כוללת שרת RESTful API מלא, frontend מודרני, ותיעוד API אינטראקטיבי.

##  תכונות עיקריות

-  **TypeScript** - פיתוח בטוח יותר עם type checking
-  **Express.js** - שרת ווב מהיר ומינימליסטי
-  **Security middleware** - Helmet, CORS ואמצעי אבטחה נוספים
-  **RESTful APIs** - APIs מובנים למזג אוויר ומידע מערכת
- **Modern Frontend** - HTML5, CSS3 ו-JavaScript ES6+
-  **Responsive Design** - מתאים לכל המכשירים
-  **RTL Support** - תמיכה מלאה בעברית
-  **API Documentation** - תיעוד אינטראקטיבי במובנה

##  מבנה הפרויקט

```
ssl-demo/
├── src/                    # קוד TypeScript
│   ├── server.ts          # שרת ראשי
│   └── routes/            # נתיבי API
│       ├── api.ts         # API כללי
│       └── weather.ts     # API מזג אוויר
├── public/                # קבצים סטטיים
│   ├── index.html        # דף ראשי
│   ├── styles.css        # עיצוב
│   └── app.js           # JavaScript צד לקוח
├── dist/                 # קוד מקומפל (נוצר אוטומטית)
├── package.json          # תלויות ו-scripts
├── tsconfig.json        # הגדרות TypeScript
├── .env                 # משתני סביבה
└── README.md           # המדריך הזה
```

## 🚀 התקנה והרצה

### דרישות מוקדמות
- Node.js (גרסה 16 ומעלה)
- npm או yarn

### התקנה
```bash
# Clone the repository
git clone <repository-url>
cd ssl-demo

# התקן תלויות
npm install

# בנה את הפרויקט
npm run build
```

### הרצה
```bash
# Development mode (עם watch)
npm run dev

# Production mode
npm start

# Build only
npm run build

# Build with watch mode
npm run build:watch
```

השרת יפעל על: http://localhost:3000

## 🔗 API Endpoints

### מידע כללי
- `GET /health` - בדיקת תקינות השרת
- `GET /api/info` - מידע על האפליקציה
- `GET /api/status` - סטטוס מערכת מפורט

### מזג אוויר
- `GET /api/weather` - רשימת ערים זמינות
- `GET /api/weather/:city` - מזג אוויר עבור עיר ספציפית
- `POST /api/weather/forecast` - תחזית מורחבת

### יצירת קשר
- `POST /api/contact` - שליחת הודעת יצירת קשר

### דוגמאות שימוש

```javascript
// קבלת מידע מערכת
fetch('/api/status')
  .then(response => response.json())
  .then(data => console.log(data));

// קבלת מזג אוויר לתל אביב
fetch('/api/weather/tel-aviv')
  .then(response => response.json())
  .then(data => console.log(data));

// שליחת הודעת יצירת קשר
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'שם',
    email: 'email@example.com',
    message: 'הודעה'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🛠️ פיתוח

### Scripts זמינים
```bash
npm run dev        # פיתוח עם hot reload
npm run build      # בנייה לפרודקשן
npm run start      # הרצה בפרודקשן
npm run lint       # בדיקת lint
npm run format     # עיצוב קוד
```

### הוספת features חדשים
1. **API חדש**: הוסף קובץ ב-`src/routes/`
2. **Frontend**: ערוך `public/index.html`, `public/app.js`, `public/styles.css`
3. **Types**: הוסף הגדרות TypeScript לפי הצורך

### Environment Variables
ערוך את קובץ `.env`:
```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3000
```

## 🔧 טכנולוגיות בשימוש

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Superset של JavaScript
- **Express.js** - Web framework
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **JavaScript ES6+** - Modern JavaScript features
- **Google Fonts** - Typography (Inter font)

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server with auto-restart
- **Concurrently** - Run multiple commands

## 📱 תכונות Frontend

- **Navigation מודרני** עם hamburger menu למובייל
-  **Weather widget** אינטראקטיבי
- **API testing interface** מובנה
- **Contact form** עם validation
- **Real-time system info** display
-  **Responsive design** לכל המכשירים
-  **Smooth animations** ו-transitions
-  **Error handling** מקיף
- **Loading states** ו-feedback למשתמש
## Deploy לפרודקשן

### Heroku
```bash
# התקן Heroku CLI
npm install -g heroku

# Login ויצירת אפליקציה
heroku login
heroku create your-app-name

# הגדרת משתני סביבה
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

##  אבטחה

האפליקציה כוללת:
- **Helmet.js** - הגנה מפני vulnerabilities נפוצים
- **CORS** - בקרת access ממקורות חיצוניים
- **Input validation** - בדיקת נתונים נכנסים
- **Error handling** - מניעת חשיפת מידע רגיש
- **Environment variables** - הסתרת keys רגישים

##  רישיון

MIT License - ראה קובץ LICENSE לפרטים

##  מפתח

נוצר על ידי GitHub Copilot כדוגמה לאפליקציית ווב מודרנית ומקצועית.

## תרומה

PRs מתקבלים בברכה! אנא:
1. Fork את הפרויקט
2. צור branch חדש לתכונה שלך
3. Commit את השינויים
4. פתח Pull Request

---

**נהנית מהפרויקט? תן כוכב! ⭐**