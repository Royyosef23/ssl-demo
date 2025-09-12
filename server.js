const express = require('express');
const https = require('https');
const app = express();
const PORT = 3000;

// הגשת קבצים סטטיים
app.use(express.static('.'));
app.use(express.json());

// פונקציה לקבלת מזג אוויר אמיתי מ-APIs חינמיים
function getRealWeather(cityName, callback) {
    // מיפוי שמות ערים עבריות לקורדינטות
    const cityCoords = {
        'תל-אביב': { lat: 32.0853, lon: 34.7818, name: 'תל אביב יפו' },
        'ירושלים': { lat: 31.7683, lon: 35.2137, name: 'ירושלים' }, 
        'חיפה': { lat: 32.7940, lon: 34.9896, name: 'חיפה' },
        'באר-שבע': { lat: 31.2518, lon: 34.7915, name: 'באר שבע' },
        'אילת': { lat: 29.5581, lon: 34.9482, name: 'אילת' }
    };
    
    const coords = cityCoords[cityName] || cityCoords['תל-אביב'];
    
    // שימוש ב-Open-Meteo API - חינמי לחלוטין ללא רישום!
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia%2FJerusalem&forecast_days=1`;
    
    console.log(` מבקש נתונים  עבור ${coords.name} מ-Open-Meteo...`);
    
    https.get(url, (apiRes) => {
        let data = '';
        
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        
        apiRes.on('end', () => {
            try {
                if (apiRes.statusCode === 200) {
                    const weatherData = JSON.parse(data);
                    const current = weatherData.current;
                    
                    // מיפוי קודי מזג אוויר לתיאור בעברית
                    const weatherDescriptions = {
                        0: 'בהיר',
                        1: 'בהיר בעיקר',
                        2: 'חלקית מעונן',
                        3: 'מעונן',
                        45: 'ערפל',
                        48: 'ערפל קפוא',
                        51: 'טפטוף קל',
                        53: 'טפטוף בינוני',
                        55: 'טפטוף כבד',
                        61: 'גשם קל',
                        63: 'גשם בינוני',
                        65: 'גשם כבד',
                        80: 'ממטרי גשם',
                        95: 'סופת רעמים'
                    };
                    
                    const description = weatherDescriptions[current.weather_code] || 'לא ידוע';
                    
                    callback(null, {
                        city: coords.name,
                        temperature: Math.round(current.temperature_2m),
                        description: description,
                        humidity: current.relative_humidity_2m,
                        windSpeed: Math.round(current.wind_speed_10m),
                        time: new Date().toLocaleString('he-IL'),
                        source: 'Open-Meteo (  מקור !)',
                        coordinates: `${coords.lat}, ${coords.lon}`,
                        isReal: true
                    });
                    
                    console.log(`✅ נתונים אמיתיים התקבלו עבור ${coords.name}: ${Math.round(current.temperature_2m)}°C`);
                } else {
                    throw new Error('API Error');
                }
            } catch (error) {
                console.error('❌ שגיאה בעיבוד נתונים:', error);
                callback(null, getFallbackWeather(cityName));
            }
        });
        
    }).on('error', (error) => {
        console.error('❌ שגיאת רשת:', error);
        callback(null, getFallbackWeather(cityName));
    });
}

// נתונים מדומים למקרה של שגיאה
function getFallbackWeather(city) {
    // נתונים אמיתיים בערך לערים בישראל
    const fallbackData = {
        'תל-אביב': { temp: 28, humidity: 65, wind: 12, desc: 'חם ולח' },
        'ירושלים': { temp: 24, humidity: 45, wind: 8, desc: 'נעים וצח' },
        'חיפה': { temp: 26, humidity: 70, wind: 15, desc: 'חם עם רוח ים' }
    };
    
    const data = fallbackData[city] || fallbackData['תל-אביב'];
    
    return {
        city: city,
        temperature: data.temp + Math.round(Math.random() * 4 - 2), // וריאציה קטנה
        description: data.desc,
        humidity: data.humidity + Math.round(Math.random() * 10 - 5),
        windSpeed: data.wind + Math.round(Math.random() * 6 - 3),
        time: new Date().toLocaleString('he-IL'),
        source: '⚠️ נתונים מדומים (צריך API key אמיתי)'
    };
}

// הגשת קבצים סטטיים
app.use(express.static('.'));
app.use(express.json());

// דף הבית
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API למזג אוויר - נתונים אמיתיים
app.get('/api/weather/:city', (req, res) => {
    const city = req.params.city;
    
    console.log(`🌤️ מבקש מזג אוויר עבור: ${city}`);
    
    getRealWeather(city, (error, weatherData) => {
        if (error) {
            console.error('❌ שגיאה בקבלת מזג אוויר:', error);
            return res.status(500).json({
                error: 'שגיאה בקבלת מזג אוויר',
                city: city
            });
        }
        
        console.log(`✅ נתוני מזג אוויר התקבלו עבור ${city}: ${weatherData.temperature}°C`);
        res.json(weatherData);
    });
});

// מידע על האפליקציה
app.get('/api/info', (req, res) => {
    res.json({
        name: 'אפליקציית מזג אוויר פשוטה',
        version: '1.0.0',
        author: 'המפתח שלי'
    });
});

app.listen(PORT, () => {
    console.log(` שרת פועל על http://localhost:${PORT}`);
    console.log(' פתח את הדפדפן וגש לכתובת למעלה');
});
