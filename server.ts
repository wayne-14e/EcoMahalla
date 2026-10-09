import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Mock database for civic schedules and reports
const DISTRICT_SCHEDULES: Record<string, any> = {
  chilonzor: {
    districtId: 'chilonzor',
    districtNameUz: 'Chilonzor tumani',
    districtNameEn: 'Chilanzar District',
    mahallaCount: 54,
    coverageRate: '98.4%',
    collectionTime: '07:00 - 10:30',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Organik chiqindilar', typeEn: 'Organic Waste', binColor: 'green', code: 'ORG' },
      { day: 'Seshanba / Tuesday', typeUz: 'Aralash qattiq maishiy chiqindi', typeEn: 'General Household Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Qayta ishlanadigan plastik & metall', typeEn: 'Recyclable Plastic & Metals', binColor: 'blue', code: 'REC' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Qog‘oz, karton & shisha', typeEn: 'Paper, Cardboard & Glass', binColor: 'blue', code: 'PAP' },
      { day: 'Shanba / Saturday', typeUz: 'Katta hajmli & Elektronika (maxsus)', typeEn: 'Bulky & E-Waste Pickup', binColor: 'amber', code: 'ELC' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni (Sanitar tozalash)', typeEn: 'Sanitary Maintenance Day', binColor: 'slate', code: 'OFF' },
    ],
  },
  yunusobod: {
    districtId: 'yunusobod',
    districtNameUz: 'Yunusobod tumani',
    districtNameEn: 'Yunusabad District',
    mahallaCount: 63,
    coverageRate: '99.1%',
    collectionTime: '06:30 - 10:00',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Seshanba / Tuesday', typeUz: 'Qayta ishlanadigan plastik & qog‘oz', typeEn: 'Plastics & Paper', binColor: 'blue', code: 'REC' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Organik chiqindilar', typeEn: 'Organic Waste', binColor: 'green', code: 'ORG' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Shisha idishlar & metall', typeEn: 'Glass & Metals', binColor: 'blue', code: 'REC' },
      { day: 'Shanba / Saturday', typeUz: 'Xavfli chiqindilar (batareya, lampalar)', typeEn: 'Hazardous Drop-off', binColor: 'rose', code: 'HAZ' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni', typeEn: 'No Collection', binColor: 'slate', code: 'OFF' },
    ],
  },
  mirzo_ulugbek: {
    districtId: 'mirzo_ulugbek',
    districtNameUz: 'Mirzo Ulug‘bek tumani',
    districtNameEn: 'Mirzo Ulugbek District',
    mahallaCount: 58,
    coverageRate: '97.9%',
    collectionTime: '07:00 - 11:00',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Organik & oziq-ovqat chiqindisi', typeEn: 'Organic & Food Waste', binColor: 'green', code: 'ORG' },
      { day: 'Seshanba / Tuesday', typeUz: 'Qayta ishlanadigan barcha toifalar', typeEn: 'All Recyclables (Dual Stream)', binColor: 'blue', code: 'REC' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Aralash chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Payshanba / Thursday', typeUz: 'Qog‘oz va qadoqlar', typeEn: 'Paper & Packaging', binColor: 'blue', code: 'PAP' },
      { day: 'Juma / Friday', typeUz: 'Organik chiqindilar', typeEn: 'Organic Waste', binColor: 'green', code: 'ORG' },
      { day: 'Shanba / Saturday', typeUz: 'Katta o‘lchamli mebel va jihozlar', typeEn: 'Bulky Items', binColor: 'amber', code: 'BLK' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni', typeEn: 'No Collection', binColor: 'slate', code: 'OFF' },
    ],
  },
  yakkasaroy: {
    districtId: 'yakkasaroy',
    districtNameUz: 'Yakkasaroy tumani',
    districtNameEn: 'Yakkasaray District',
    mahallaCount: 41,
    coverageRate: '99.5%',
    collectionTime: '07:30 - 10:30',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Qayta ishlanadigan chiqindilar', typeEn: 'Recyclables', binColor: 'blue', code: 'REC' },
      { day: 'Seshanba / Tuesday', typeUz: 'Organik chiqindi', typeEn: 'Organic Waste', binColor: 'green', code: 'ORG' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Payshanba / Thursday', typeUz: 'Plastik va plyonkalar', typeEn: 'Plastics & Film', binColor: 'blue', code: 'REC' },
      { day: 'Juma / Friday', typeUz: 'Aralash chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Shanba / Saturday', typeUz: 'Elektronika & Batareyalar', typeEn: 'E-Waste & Batteries', binColor: 'rose', code: 'HAZ' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni', typeEn: 'No Collection', binColor: 'slate', code: 'OFF' },
    ],
  },
  shayxontohur: {
    districtId: 'shayxontohur',
    districtNameUz: 'Shayxontohur tumani',
    districtNameEn: 'Shaykhontohur District',
    mahallaCount: 51,
    coverageRate: '98.7%',
    collectionTime: '06:30 - 10:00',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Household Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Seshanba / Tuesday', typeUz: 'Qayta ishlanadigan qog‘oz & plastik', typeEn: 'Paper & Plastic Recyclables', binColor: 'blue', code: 'REC' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Organik & bozor qoldiqlari', typeEn: 'Organics & Food Scraps', binColor: 'green', code: 'ORG' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Shisha idishlar & qadoqlar', typeEn: 'Glass & Beverage Packaging', binColor: 'blue', code: 'REC' },
      { day: 'Shanba / Saturday', typeUz: 'Elektronika & xavfli chiqindi', typeEn: 'E-Waste & Hazardous Drop', binColor: 'rose', code: 'HAZ' },
      { day: 'Yakshanba / Sunday', typeUz: 'Sanitar tozalash kuni', typeEn: 'Sanitary Day', binColor: 'slate', code: 'OFF' },
    ],
  },
  mirobod: {
    districtId: 'mirobod',
    districtNameUz: 'Mirobod tumani',
    districtNameEn: 'Mirobod District',
    mahallaCount: 39,
    coverageRate: '99.2%',
    collectionTime: '07:00 - 10:30',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Qayta ishlanadigan quruq chiqindi', typeEn: 'Dry Recyclables', binColor: 'blue', code: 'REC' },
      { day: 'Seshanba / Tuesday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Organik oziq-ovqat chiqindisi', typeEn: 'Organic Food Waste', binColor: 'green', code: 'ORG' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Plastik (PET/HDPE) & alyuminiy', typeEn: 'Plastics & Cans', binColor: 'blue', code: 'REC' },
      { day: 'Shanba / Saturday', typeUz: 'E-chiqindi va batareyalar', typeEn: 'E-Waste & Batteries', binColor: 'amber', code: 'ELC' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni', typeEn: 'Rest Day', binColor: 'slate', code: 'OFF' },
    ],
  },
  olmazor: {
    districtId: 'olmazor',
    districtNameUz: 'Olmazor tumani',
    districtNameEn: 'Almazar District',
    mahallaCount: 64,
    coverageRate: '97.5%',
    collectionTime: '06:30 - 10:30',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Organik & kompost chiqindilari', typeEn: 'Organics & Compost', binColor: 'green', code: 'ORG' },
      { day: 'Seshanba / Tuesday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Plastik, karton & qog‘oz', typeEn: 'Plastics & Cardboard', binColor: 'blue', code: 'REC' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Shisha idishlar & metall', typeEn: 'Glass & Metals', binColor: 'blue', code: 'REC' },
      { day: 'Shanba / Saturday', typeUz: 'Katta o‘lchamli chiqindilar', typeEn: 'Bulky Waste Pickup', binColor: 'amber', code: 'BLK' },
      { day: 'Yakshanba / Sunday', typeUz: 'Sanitar tozalash kuni', typeEn: 'Sanitary Day', binColor: 'slate', code: 'OFF' },
    ],
  },
  uchtepa: {
    districtId: 'uchtepa',
    districtNameUz: 'Uchtepa tumani',
    districtNameEn: 'Uchtepa District',
    mahallaCount: 60,
    coverageRate: '98.1%',
    collectionTime: '07:00 - 11:00',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Seshanba / Tuesday', typeUz: 'Organik chiqindi', typeEn: 'Organics', binColor: 'green', code: 'ORG' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Qayta ishlanadigan barcha toifalar', typeEn: 'Recyclables Stream', binColor: 'blue', code: 'REC' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Makulatura & plastik butilkalar', typeEn: 'Paper & PET Bottles', binColor: 'blue', code: 'REC' },
      { day: 'Shanba / Saturday', typeUz: 'Xavfli chiqindi & batareyalar', typeEn: 'Hazardous Materials', binColor: 'rose', code: 'HAZ' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni', typeEn: 'No Pickup', binColor: 'slate', code: 'OFF' },
    ],
  },
  yashnobod: {
    districtId: 'yashnobod',
    districtNameUz: 'Yashnobod tumani',
    districtNameEn: 'Yashnabad District',
    mahallaCount: 59,
    coverageRate: '98.3%',
    collectionTime: '07:00 - 10:30',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Organik & oziq-ovqat chiqindisi', typeEn: 'Organic Waste', binColor: 'green', code: 'ORG' },
      { day: 'Seshanba / Tuesday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Qayta ishlanadigan plastik & metall', typeEn: 'Plastic & Metals', binColor: 'blue', code: 'REC' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Qog‘oz, karton & shisha', typeEn: 'Paper & Glass', binColor: 'blue', code: 'REC' },
      { day: 'Shanba / Saturday', typeUz: 'Elektronika & maishiy texnika', typeEn: 'E-Waste & Appliances', binColor: 'amber', code: 'ELC' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni', typeEn: 'No Pickup', binColor: 'slate', code: 'OFF' },
    ],
  },
  sergeli: {
    districtId: 'sergeli',
    districtNameUz: 'Sergeli tumani',
    districtNameEn: 'Sergeli District',
    mahallaCount: 45,
    coverageRate: '98.8%',
    collectionTime: '07:30 - 11:00',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Qayta ishlanadigan quruq materiallar', typeEn: 'Dry Recyclables', binColor: 'blue', code: 'REC' },
      { day: 'Seshanba / Tuesday', typeUz: 'Organik chiqindi', typeEn: 'Organic Scraps', binColor: 'green', code: 'ORG' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Payshanba / Thursday', typeUz: 'Plastik va plyonka qadoqlar', typeEn: 'Plastics & Film Packaging', binColor: 'blue', code: 'REC' },
      { day: 'Juma / Friday', typeUz: 'Aralash chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Shanba / Saturday', typeUz: 'Qurilish va katta hajmli chiqindilar', typeEn: 'Bulky & Construction Drop', binColor: 'amber', code: 'BLK' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni', typeEn: 'No Pickup', binColor: 'slate', code: 'OFF' },
    ],
  },
  bektemir: {
    districtId: 'bektemir',
    districtNameUz: 'Bektemir tumani',
    districtNameEn: 'Bektemir District',
    mahallaCount: 22,
    coverageRate: '96.9%',
    collectionTime: '08:00 - 11:30',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Aralash maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Seshanba / Tuesday', typeUz: 'Qayta ishlanadigan chiqindilar', typeEn: 'Recyclables', binColor: 'blue', code: 'REC' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Organik chiqindi', typeEn: 'Organics', binColor: 'green', code: 'ORG' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Sanoat & ikkilamchi xomashyo', typeEn: 'Secondary Raw Materials', binColor: 'blue', code: 'REC' },
      { day: 'Shanba / Saturday', typeUz: 'Maxsus yig‘uv (e-chiqindi)', typeEn: 'Special Pickup', binColor: 'rose', code: 'HAZ' },
      { day: 'Yakshanba / Sunday', typeUz: 'Sanitar tozalash kuni', typeEn: 'Sanitary Day', binColor: 'slate', code: 'OFF' },
    ],
  },
  yangihayot: {
    districtId: 'yangihayot',
    districtNameUz: 'Yangihayot tumani',
    districtNameEn: 'Yangikhayot District',
    mahallaCount: 30,
    coverageRate: '98.5%',
    collectionTime: '07:00 - 10:30',
    schedule: [
      { day: 'Dushanba / Monday', typeUz: 'Organik & oziq-ovqat chiqindilari', typeEn: 'Organics & Food Scraps', binColor: 'green', code: 'ORG' },
      { day: 'Seshanba / Tuesday', typeUz: 'Aralash qattiq maishiy chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Chorshanba / Wednesday', typeUz: 'Plastik (PET) va karton', typeEn: 'PET Bottles & Cardboard', binColor: 'blue', code: 'REC' },
      { day: 'Payshanba / Thursday', typeUz: 'Aralash chiqindi', typeEn: 'General Waste', binColor: 'gray', code: 'GEN' },
      { day: 'Juma / Friday', typeUz: 'Shisha idishlar & metall', typeEn: 'Glass & Beverage Cans', binColor: 'blue', code: 'REC' },
      { day: 'Shanba / Saturday', typeUz: 'E-chiqindi va akkumulyatorlar', typeEn: 'E-Waste & Batteries', binColor: 'rose', code: 'HAZ' },
      { day: 'Yakshanba / Sunday', typeUz: 'Dam olish kuni', typeEn: 'Rest Day', binColor: 'slate', code: 'OFF' },
    ],
  },
};

// Reverse Geocoding Proxy Endpoint
app.get('/api/v1/geocode/reverse', async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    res.status(400).json({ error: 'Latitude and longitude parameters are required' });
    return;
  }

  // 1. Try Nominatim with legitimate User-Agent header from backend
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    const geoRes = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'EcoMahalla-Civic-App/1.0 (sardor@ecomahalla.uz; Tashkent)',
        'Accept-Language': 'uz,ru,en',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (geoRes.ok) {
      const data: any = await geoRes.json();
      res.json({
        status: 'success',
        source: 'nominatim',
        data,
      });
      return;
    }
  } catch (err) {
    // Continue to fallback
  }

  // 2. Fallback to BigDataCloud
  try {
    const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=uz`;
    const bdcRes = await fetch(bdcUrl);
    if (bdcRes.ok) {
      const bdcData: any = await bdcRes.json();
      res.json({
        status: 'success',
        source: 'bigdatacloud',
        data: {
          display_name: [bdcData.locality, bdcData.city, bdcData.principalSubdivision, bdcData.countryName]
            .filter(Boolean)
            .join(', '),
          address: {
            road: bdcData.locality || '',
            suburb: bdcData.city || '',
            city_district: bdcData.city || '',
            city: bdcData.principalSubdivision || bdcData.city || 'Toshkent',
            country: bdcData.countryName || 'O‘zbekiston',
          },
        },
      });
      return;
    }
  } catch (err) {
    // Continue
  }

  res.status(502).json({ error: 'Failed to reverse geocode coordinates' });
});

const WASTE_ITEMS_DB = [
  { id: '1', nameUz: 'Plastik suv shishalari (PET 1)', nameEn: 'Plastic PET Bottles', category: 'recyclable', binColor: 'blue', disposalUz: 'Yuvib, siqib, ko‘k rangli qayta ishlash idishiga tashlang.', disposalEn: 'Rinse, crush, and place in the blue recycling bin.' },
  { id: '2', nameUz: 'Karton va qog‘oz qutilar', nameEn: 'Cardboard & Paper Boxes', category: 'recyclable', binColor: 'blue', disposalUz: 'Yoyib, tekislab, quruq holda ko‘k idishga soling.', disposalEn: 'Flatten and keep dry, place in blue paper bin.' },
  { id: '3', nameUz: 'Oziq-ovqat va meva po‘stloqlari', nameEn: 'Food Scraps & Peelings', category: 'organic', binColor: 'green', disposalUz: 'Yashil organik chiqindi idishiga soling yoki kompost qiling.', disposalEn: 'Place in the green compost/organic waste bin.' },
  { id: '4', nameUz: 'Litiy-ion va oddiy batareyalar', nameEn: 'Batteries (AA, AAA, Li-ion)', category: 'hazardous', binColor: 'rose', disposalUz: 'Umumiy chiqindiga tashlamang! Mahalla maxsus e-qutisiga topshiring.', disposalEn: 'Hazardous! Never toss in general bin; drop at e-waste bins.' },
  { id: '5', nameUz: 'Shisha butilkalar va bankalar', nameEn: 'Glass Bottles & Jars', category: 'recyclable', binColor: 'blue', disposalUz: 'Ichini chayib, qopqog‘ini ajratib ko‘k idishga soling.', disposalEn: 'Rinse cleanly, remove lids, put in glass/recycling bin.' },
  { id: '6', nameUz: 'Eski smartfon va zaryadlovchilar', nameEn: 'Old Phones & Cables', category: 'electronic', binColor: 'amber', disposalUz: 'Shanba kungi elektronika qabul punktlariga bering.', disposalEn: 'Bring to Saturday municipal e-waste collection points.' },
  { id: '7', nameUz: 'Yog‘li pitsa qutisi', nameEn: 'Greasy Pizza Box', category: 'general', binColor: 'gray', disposalUz: 'Yog‘langan qog‘oz qayta ishlanmaydi. Kulrang umumiy qutiga tashlang.', disposalEn: 'Soiled paper cannot be recycled. Place in gray general waste.' },
  { id: '8', nameUz: 'Yaroqlilik muddati o‘tgan dorilar', nameEn: 'Expired Medicines', category: 'hazardous', binColor: 'rose', disposalUz: 'Kanalizatsiyaga oqizmang. Dorixonalardagi maxsus utilizatsiya qutisiga topshiring.', disposalEn: 'Never flush. Return to participating pharmacy return points.' },
];

const CITIZEN_REPORTS: any[] = [];

// API Endpoints
app.get('/api/v1/schedule/:district', (req: Request, res: Response) => {
  const districtKey = (req.params.district || 'chilonzor').toLowerCase().replace(/[^a-z_]/g, '');
  const data = DISTRICT_SCHEDULES[districtKey] || DISTRICT_SCHEDULES.chilonzor;
  res.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    dataSource: 'Toshkent shahar Maxsustrans DUK & Mahalla GIS Integration',
    data,
  });
});

app.get('/api/v1/waste-guide', (req: Request, res: Response) => {
  const q = typeof req.query.q === 'string' ? req.query.q.toLowerCase() : '';
  const filtered = q
    ? WASTE_ITEMS_DB.filter(item =>
        item.nameUz.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
    : WASTE_ITEMS_DB;

  res.json({
    status: 'success',
    count: filtered.length,
    items: filtered,
  });
});

app.post('/api/v1/reports', async (req: Request, res: Response) => {
  const { district, address, issueType, details, reporterContact } = req.body;
  const newReport = {
    reportId: `REP-${Date.now().toString().slice(-6)}`,
    district: district || 'Chilonzor',
    address: address || 'Noma\'lum manzil',
    issueType: issueType || 'delayed_pickup',
    details: details || '',
    reporterContact: reporterContact || 'Anonim',
    createdAt: new Date().toISOString(),
    status: 'received',
    estimatedResolution: '24 soat ichida / within 24h',
    forwardedTo: 'sardieyeee08@gmail.com',
  };
  CITIZEN_REPORTS.unshift(newReport);

  console.log(`[EcoMahalla Dispatch] Forwarding ticket ${newReport.reportId} (${newReport.issueType} in ${newReport.district}) to sardieyeee08@gmail.com`);

  // Asynchronously dispatch email notification to Sardor's email
  try {
    fetch('https://formsubmit.co/ajax/sardieyeee08@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `[EcoMahalla Dispatch] New Incident #${newReport.reportId} (${newReport.district})`,
        _template: 'table',
        _captcha: 'false',
        ticketId: newReport.reportId,
        district: newReport.district,
        address: newReport.address,
        issueType: newReport.issueType,
        details: newReport.details || 'No additional details provided',
        reporterContact: newReport.reporterContact,
        timestamp: newReport.createdAt,
        system: 'EcoMahalla Tashkent Municipal Prototype',
      }),
    }).catch((err) => {
      console.warn('[EcoMahalla Dispatch] FormSubmit background warning:', err?.message || err);
    });
  } catch (err) {
    // Non-blocking for client response
  }

  res.status(201).json({
    status: 'success',
    message: 'Hisobot qabul qilindi va tuman dispetcheriga (sardieyeee08@gmail.com) yuborildi',
    report: newReport,
  });
});

// Gemini AI Assistant Endpoint for Waste Sorting
app.post('/api/gemini/waste-advisor', async (req: Request, res: Response) => {
  const { question, language } = req.body;
  const lang = language === 'en' ? 'en' : 'uz';

  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'Question is required' });
    return;
  }

  // If Gemini API is available and configured
  if (ai) {
    try {
      const systemInstruction = lang === 'en'
        ? `You are EcoMahalla AI, an intelligent hyperlocal waste management and recycling expert for Tashkent and Central Asian municipalities.
Explain accurately which bin or facility to use (Blue for Recyclables/Dry, Green for Organics/Compost, Gray for General Waste, Red/Amber for Hazardous/E-Waste).
Provide actionable, polite, and practical advice. Keep the response concise (2-4 paragraphs or crisp bullet points).`
        : `Siz EcoMahalla AI — Toshkent mahallalari va shahar kommunal xizmatlari bo‘yicha chiqindilarni to‘g‘ri saralash bo‘yicha sun'iy intellekt maslahatchisisiz.
Savol beruvchiga chiqindini qaysi idishga (Ko‘k — Qayta ishlanadigan plastik/qog‘oz/shisha, Yashil — Organik/oziq-ovqat, Kulrang — Aralash maishiy, Qizil/Sariq — Xavfli/Elektronika) tashlash kerakligini tushuntiring.
Javobingiz o‘zbek tilida, aniq, amaliy va rag‘batlantiruvchi bo‘lsin. 2-3 qisqa xatboshi yoki punktlar bilan yozing.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      res.json({
        answer: text,
        source: 'gemini-3.8-flash',
        timestamp: new Date().toISOString(),
      });
      return;
    } catch (err: any) {
      console.warn('Gemini API call failed, using smart local rule advisor fallback:', err?.message);
    }
  }

  // Smart fallback when offline or no API key configured
  const qLower = question.toLowerCase();
  let fallbackAnswer = '';

  if (lang === 'en') {
    if (qLower.includes('battery') || qLower.includes('phone') || qLower.includes('laptop') || qLower.includes('electronic')) {
      fallbackAnswer = `🔋 Batteries and electronics are classified as **Hazardous & E-Waste**. Never place them in ordinary household trash, as heavy metals can leach into groundwater. Please deposit them at designated municipal e-waste collection boxes available at your local Mahalla center or every Saturday collection station.`;
    } else if (qLower.includes('plastic') || qLower.includes('bottle') || qLower.includes('pet')) {
      fallbackAnswer = `🧴 Plastic bottles (PET 1, HDPE 2) belong in the **Blue Recycling Bin**. Make sure to rinse off any residual liquid, crush the bottle to save volume, and keep caps attached. In Tashkent, recyclable plastics are collected every Wednesday and Saturday.`;
    } else if (qLower.includes('glass') || qLower.includes('jar')) {
      fallbackAnswer = `🫙 Glass bottles and jars are 100% recyclable! Place them in the **Blue Recycling Stream** after a quick water rinse. Avoid throwing broken window glass or mirrors in the recycling bin, as their melting point differs.`;
    } else if (qLower.includes('food') || qLower.includes('bread') || qLower.includes('organic') || qLower.includes('peel')) {
      fallbackAnswer = `🌱 Food scraps, vegetable peelings, and tea leaves go into the **Green Organics Bin**. In Uzbek culture, bread (non) is treated with great respect—please separate dry bread scraps for livestock feed or designated bread collection bins.`;
    } else if (qLower.includes('assalam') || qLower.includes('hello') || qLower.includes('hi') || qLower.includes('hey')) {
      fallbackAnswer = `👋 **Wa Alaykum Assalam! Welcome to EcoMahalla.**\n\nI am your municipal waste sorting advisor. You can ask me how to dispose of any item (e.g. plastics, electronics, organic food, glass), or check pickup schedules for your district!`;
    } else {
      fallbackAnswer = `♻️ **EcoMahalla Guidance:** For "${question}", separate clean dry materials (paper, plastics, metal) into the **Blue Bin**. Organic waste goes into the **Green Bin**, and non-recyclable remnants into the **Gray General Bin**. Check your district schedule in the demo tab!`;
    }
  } else {
    if (qLower.includes('batareya') || qLower.includes('telefon') || qLower.includes('akkumulyator') || qLower.includes('elektron')) {
      fallbackAnswer = `🔋 Batareyalar va elektronika **Xavfli va E-chiqindi** toifasiga kiradi. Ularni hech qachon umumiy qutiga tashlamang, chunki og‘ir metallar tuproq va yerosti suvlarini zaharlaydi. Ularni mahallangizdagi maxsus e-qutilarga yoki har shanba kungi qabul punktlariga topshiring.`;
    } else if (qLower.includes('plastik') || qLower.includes('baklajka') || qLower.includes('shisha') || qLower.includes('idish')) {
      fallbackAnswer = `🧴 Plastik butilkalar (baklajkalar) **Ko‘k rangli Qayta ishlash qutisi**ga tashlanadi. Iltimos, idishni chayib, hajmini qisqartirish uchun oyoq bilan yoki qo‘lda ezib tashlang. Chilonzor va Yunusobod tumanlarida plastiklar haftaning chorshanba va shanba kunlari saralab olib ketiladi.`;
    } else if (qLower.includes('non') || qLower.includes('ovqat') || qLower.includes('meva') || qLower.includes('organik')) {
      fallbackAnswer = `🍞 Quruq non qoldiqlarini xalqimiz odatiga binoan umumiy chiqindiga aralashtirmasdan, alohida qog‘oz xaltachada quruq holda topshirish yoki chorva egalariga berish tavsiya etiladi. Meva-sabzavot po‘stloqlari esa **Yashil Organik quti**ga tushadi.`;
    } else if (qLower.includes('qog\'oz') || qLower.includes('quti') || qLower.includes('karton')) {
      fallbackAnswer = `📦 Quruq qog‘oz va karton qutilar **Ko‘k Qayta ishlash qutisi**ga yig‘iladi. Ularni tekislab, ixchamlashtirib qo‘ying. Yog‘ tushgan pitsa qutilari esa qayta ishlanmaydi, ularni umumiy qutiga solish lozim.`;
    } else if (qLower.includes('assalom') || qLower.includes('salom') || qLower.includes('assalam')) {
      fallbackAnswer = `👋 **Vaalaykum assalom! EcoMahallaga xush kelibsiz.**\n\nMen Toshkent mahallalari bo‘yicha chiqindilarni to‘g‘ri saralash AI yordamchisiman. Menga istalgan buyum (masalan: plastik baklajka, eski batareya, oziq-ovqat qoldiqlari, shisha) haqida savol bering yoki mahallangiz jadvalini tekshiring!`;
    } else {
      fallbackAnswer = `♻️ **EcoMahalla Tavsiyasi:** "${question}" bo‘yicha: toza va quruq mahsulotlarni **Ko‘k quti**ga, oziq-ovqat qoldiqlarini **Yashil quti**ga, qayta ishlanmaydigan qoldiqlarni esa **Kulrang quti**ga joylashtiring. Ilovamizdagi jadval orqali mahallangizning aniq olib ketish vaqtini tekshiring!`;
    }
  }

  res.json({
    answer: fallbackAnswer,
    source: 'knowledge-base-advisor',
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite in Dev or Static Serving in Production
export async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EcoMahalla server is running on http://0.0.0.0:${PORT}`);
  });
}

// Start listener unless running in Vercel serverless environment
if (process.env.VERCEL !== '1') {
  startServer();
}

export default app;
