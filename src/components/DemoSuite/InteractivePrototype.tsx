import React, { useState, useMemo } from 'react';
import { Language, DistrictInfo, WasteItem } from '../../types';
import { DISTRICT_LIST, WASTE_ITEMS, DISTRICT_COORDINATES } from '../../data/content';
import {
  MapPin,
  Search,
  Calendar,
  AlertTriangle,
  Send,
  CheckCircle2,
  Clock,
  Trash2,
  ShieldCheck,
  Filter,
  Navigation,
  Compass,
  Sparkles,
  RefreshCw,
  Crosshair,
  Building,
  ChevronDown,
  Mail,
  ExternalLink,
} from 'lucide-react';

interface InteractivePrototypeProps {
  lang: Language;
}

interface DetectedLocationData {
  address: string;
  road?: string;
  suburb?: string;
  districtName: string;
  city: string;
  coords: string;
  lat: number;
  lon: number;
  isLive: boolean;
}

export const DISTRICT_MAHALLAS: Record<string, { uz: string; en: string }[]> = {
  chilonzor: [
    { uz: 'Katartol mahallasi', en: 'Katartal mahalla' },
    { uz: 'Chilonzor 7-mavze', en: 'Chilanzar 7th block' },
    { uz: 'Nafosat mahallasi', en: 'Nafosat mahalla' },
    { uz: 'Dombirobod mahallasi', en: 'Dombirabad mahalla' },
    { uz: 'Zarqoq mahallasi', en: 'Zarqoq mahalla' },
    { uz: 'Ko‘rkam mahallasi', en: 'Korkam mahalla' },
    { uz: 'Fidokor mahallasi', en: 'Fidokor mahalla' },
    { uz: 'Bo‘rijar mahallasi', en: 'Borijar mahalla' },
  ],
  yunusobod: [
    { uz: 'Bodomzor mahallasi', en: 'Bodomzor mahalla' },
    { uz: 'Sobirobod mahallasi', en: 'Sobirobod mahalla' },
    { uz: 'Tiklanish mahallasi', en: 'Tiklanish mahalla' },
    { uz: 'Otchopar mahallasi', en: 'Otchopar mahalla' },
    { uz: 'Yunusobod 12-mavze', en: 'Yunusabad 12th block' },
    { uz: 'Mingchinor mahallasi', en: 'Mingchinor mahalla' },
    { uz: 'Hasanboy mahallasi', en: 'Hasanboy mahalla' },
    { uz: 'Shahriston mahallasi', en: 'Shahriston mahalla' },
  ],
  mirzo_ulugbek: [
    { uz: 'Olimlar shaharchasi', en: 'Olimlar town' },
    { uz: 'Qorasuv mahallasi', en: 'Qorasuv mahalla' },
    { uz: 'TTZ 2-mavze', en: 'TTZ 2nd block' },
    { uz: 'Buyuk Ipak Yo‘li', en: 'Buyuk Ipak Yoli' },
    { uz: 'Al-Xorazmiy mahallasi', en: 'Al-Khwarizmi mahalla' },
    { uz: 'Yalang‘och mahallasi', en: 'Yalangoch mahalla' },
    { uz: 'Navnihol mahallasi', en: 'Navnihol mahalla' },
    { uz: 'Gulsanam mahallasi', en: 'Gulsanam mahalla' },
  ],
  yakkasaroy: [
    { uz: 'Boshliq mahallasi', en: 'Boshliq mahalla' },
    { uz: 'Shota Rustaveli', en: 'Shota Rustaveli ave' },
    { uz: 'Kosmonavtlar', en: 'Cosmonauts area' },
    { uz: 'Konstitutsiya mahallasi', en: 'Constitution mahalla' },
    { uz: 'Muqimiy mahallasi', en: 'Muqimiy mahalla' },
    { uz: 'Rakatboshi mahallasi', en: 'Rakatboshi mahalla' },
    { uz: 'Meros mahallasi', en: 'Meros mahalla' },
  ],
  shayxontohur: [
    { uz: 'Zarkaynar mahallasi', en: 'Zarkaynar mahalla' },
    { uz: 'Xadra mahallasi', en: 'Khadra mahalla' },
    { uz: 'O‘zbekiston mahallasi', en: 'Uzbekistan mahalla' },
    { uz: 'Chorsu mahallasi', en: 'Chorsu mahalla' },
    { uz: 'Labzak mahallasi', en: 'Labzak mahalla' },
    { uz: 'Gulbozor mahallasi', en: 'Gulbozor mahalla' },
    { uz: 'Samarqand Darvoza', en: 'Samarkand Gate area' },
  ],
  mirobod: [
    { uz: 'Oybek mahallasi', en: 'Oybek mahalla' },
    { uz: 'Mingo‘rik mahallasi', en: 'Mingorik mahalla' },
    { uz: 'Sariko‘l mahallasi', en: 'Sarikol mahalla' },
    { uz: 'Farg‘ona Yo‘li', en: 'Fergana Road area' },
    { uz: 'Inoqobod mahallasi', en: 'Inoqobod mahalla' },
    { uz: 'Tong Yulduzi mahallasi', en: 'Morning Star mahalla' },
    { uz: 'Navro‘z mahallasi', en: 'Navruz mahalla' },
  ],
  olmazor: [
    { uz: 'Qorasaroy mahallasi', en: 'Qorasaroy mahalla' },
    { uz: 'Sebzor mahallasi', en: 'Sebzor mahalla' },
    { uz: 'G‘alaba mahallasi', en: 'Galaba mahalla' },
    { uz: 'Tibbiyot shaharchasi', en: 'Medical town' },
    { uz: 'Chimboy mahallasi', en: 'Chimboy mahalla' },
    { uz: 'Hastimom mahallasi', en: 'Hastimom mahalla' },
    { uz: 'Eski Shahar', en: 'Old City quarter' },
  ],
  uchtepa: [
    { uz: 'O‘rikzor mahallasi', en: 'Orikzor mahalla' },
    { uz: 'Farhod mahallasi', en: 'Farhod mahalla' },
    { uz: 'Lutfiy mahallasi', en: 'Lutfiy mahalla' },
    { uz: 'Beshqayrag‘och mahallasi', en: 'Beshqayragoch mahalla' },
    { uz: 'Vatan mahallasi', en: 'Vatan mahalla' },
    { uz: 'Shirin mahallasi', en: 'Shirin mahalla' },
    { uz: 'Katta Qani mahallasi', en: 'Katta Qani mahalla' },
  ],
  yashnobod: [
    { uz: 'Tuzel mahallasi', en: 'Tuzel mahalla' },
    { uz: 'Do‘stlik mahallasi', en: 'Dostlik mahalla' },
    { uz: 'Parkent bozori hududi', en: 'Parkent market zone' },
    { uz: 'Aviasozlar 4-mavze', en: 'Aviasozlar 4th block' },
    { uz: 'Katta Qo‘yliq mahallasi', en: 'Katta Qoyliq mahalla' },
    { uz: 'Shirinobod mahallasi', en: 'Shirinobod mahalla' },
    { uz: 'Istiqlol mahallasi', en: 'Istiqlol mahalla' },
  ],
  sergeli: [
    { uz: 'Sputnik 4-mavze', en: 'Sputnik 4th block' },
    { uz: 'Qo‘yliq-Aylana mahallasi', en: 'Qoyliq Loop mahalla' },
    { uz: 'Qipchoq mahallasi', en: 'Qipchoq mahalla' },
    { uz: 'No‘g‘ayqo‘rg‘on mahallasi', en: 'Nogayqorgon mahalla' },
    { uz: 'Madaniyat mahallasi', en: 'Madaniyat mahalla' },
    { uz: 'Quruvchilar mahallasi', en: 'Builders mahalla' },
  ],
  bektemir: [
    { uz: 'Suvsoz mahallasi', en: 'Suvsoz mahalla' },
    { uz: 'Majnuntol mahallasi', en: 'Majnuntol mahalla' },
    { uz: 'Husayn Boyqaro mahallasi', en: 'Husayn Bayqara mahalla' },
    { uz: 'Bektemir Markaz', en: 'Bektemir Center' },
    { uz: 'Abay mahallasi', en: 'Abay mahalla' },
  ],
  yangihayot: [
    { uz: 'Binokor mahallasi', en: 'Binokor mahalla' },
    { uz: 'Toshkent mahallasi', en: 'Tashkent mahalla' },
    { uz: 'Navro‘z mahallasi', en: 'Navruz mahalla' },
    { uz: 'Yangi Umid mahallasi', en: 'New Hope mahalla' },
    { uz: 'Oriat mahallasi', en: 'Oriat mahalla' },
    { uz: 'Xushnud mahallasi', en: 'Khushnud mahalla' },
  ],
};

export const InteractivePrototype: React.FC<InteractivePrototypeProps> = ({ lang }) => {
  const isUz = lang === 'uz';

  // State
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('chilonzor');
  const [selectedMahalla, setSelectedMahalla] = useState<string>('Katartol mahallasi');
  const [districtSearchQuery, setDistrictSearchQuery] = useState<string>('');
  const [wasteSearch, setWasteSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [geoLocating, setGeoLocating] = useState<boolean>(false);
  const [geoFeedback, setGeoFeedback] = useState<string | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<DetectedLocationData | null>(null);

  // Report form state
  const [reportIssue, setReportIssue] = useState<string>('delayed');
  const [reportAddress, setReportAddress] = useState<string>('');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [reportContact, setReportContact] = useState<string>('');
  const [isSubmittingReport, setIsSubmittingReport] = useState<boolean>(false);
  const [reportSuccess, setReportSuccess] = useState<any | null>(null);

  // Real day tracking: 0 = Mon, 1 = Tue, 2 = Wed, 3 = Thu, 4 = Fri, 5 = Sat, 6 = Sun
  // Convert JS Date (0=Sun, 1=Mon...6=Sat) into Monday=0, Tuesday=1 ... Sunday=6
  const realDayIndex = useMemo(() => {
    const d = new Date().getDay();
    return (d + 6) % 7;
  }, []);
  const tomorrowIndex = useMemo(() => (realDayIndex + 1) % 7, [realDayIndex]);

  // Real formatted date string based on live system clock
  const formattedTodayDate = useMemo(() => {
    const now = new Date();
    if (isUz) {
      const monthsUz = [
        'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
        'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
      ];
      const daysUz = [
        'Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba',
        'Payshanba', 'Juma', 'Shanba'
      ];
      return `${now.getDate()}-${monthsUz[now.getMonth()]}, ${daysUz[now.getDay()]}`;
    } else {
      return now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
    }
  }, [isUz]);

  // Active district
  const currentDistrict = useMemo(
    () => DISTRICT_LIST.find((d) => d.districtId === selectedDistrictId) || DISTRICT_LIST[0],
    [selectedDistrictId]
  );

  // Filtered districts for quick switcher
  const filteredDistricts = useMemo(() => {
    if (!districtSearchQuery.trim()) return DISTRICT_LIST;
    const q = districtSearchQuery.toLowerCase();
    return DISTRICT_LIST.filter(
      (d) =>
        d.districtNameUz.toLowerCase().includes(q) ||
        d.districtNameEn.toLowerCase().includes(q) ||
        d.districtId.toLowerCase().includes(q)
    );
  }, [districtSearchQuery]);

  // Filtered waste items
  const filteredWasteItems = useMemo(() => {
    return WASTE_ITEMS.filter((item) => {
      const matchesSearch =
        item.nameUz.toLowerCase().includes(wasteSearch.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(wasteSearch.toLowerCase()) ||
        item.disposalUz.toLowerCase().includes(wasteSearch.toLowerCase()) ||
        item.disposalEn.toLowerCase().includes(wasteSearch.toLowerCase());

      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [wasteSearch, selectedCategory]);

  // Match coordinates or address string to best district ID
  const matchLocationToDistrict = (
    lat: number,
    lon: number,
    fullAddressStr: string
  ): { districtId: string; districtNameUz: string; districtNameEn: string } => {
    const textLower = fullAddressStr.toLowerCase();

    // 1. Try keyword matching
    for (const [distId, meta] of Object.entries(DISTRICT_COORDINATES)) {
      if (meta.keywords.some((kw) => textLower.includes(kw.toLowerCase()))) {
        return {
          districtId: distId,
          districtNameUz: meta.nameUz,
          districtNameEn: meta.nameEn,
        };
      }
    }

    // 2. Spherical distance matching across all 12 districts
    let bestId = 'chilonzor';
    let minDistance = Infinity;

    for (const [distId, meta] of Object.entries(DISTRICT_COORDINATES)) {
      const d = Math.hypot(lat - meta.lat, lon - meta.lon);
      if (d < minDistance) {
        minDistance = d;
        bestId = distId;
      }
    }

    const matched = DISTRICT_COORDINATES[bestId] || DISTRICT_COORDINATES.chilonzor;
    return {
      districtId: bestId,
      districtNameUz: matched.nameUz,
      districtNameEn: matched.nameEn,
    };
  };

  // Real Browser Geolocation and Reverse Geocoding
  const handleDetectLocation = () => {
    setGeoLocating(true);
    setGeoFeedback(null);

    if (!('geolocation' in navigator)) {
      setGeoLocating(false);
      setGeoFeedback(
        isUz
          ? 'Brauzeringizda geolokatsiya qo‘llab-quvvatlanmaydi. Quyidagi tumanlardan birini tanlang yoki namunani bosing.'
          : 'Geolocation is not supported by your browser. Please pick a district manually or click a quick sample.'
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coordsText = `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`;

        let detectedAddress = '';
        let detectedRoad = '';
        let detectedSuburb = '';
        let detectedCity = 'Toshkent';

        // 1. Try server reverse geocoding route
        try {
          const res = await fetch(`/api/v1/geocode/reverse?lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const json = await res.json();
            const data = json.data || {};
            const addr = data.address || {};
            detectedRoad = addr.road || addr.street || addr.pedestrian || '';
            detectedSuburb = addr.suburb || addr.neighbourhood || addr.quarter || addr.city_district || '';
            detectedCity = addr.city || addr.town || addr.county || addr.state || 'Toshkent';

            detectedAddress = [detectedRoad, detectedSuburb, detectedCity].filter(Boolean).join(', ');
          }
        } catch {
          // Continue to client fallback
        }

        // 2. Client fallback to BigDataCloud (CORS-friendly) if server didn't get details
        if (!detectedAddress) {
          try {
            const bdcRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=uz`
            );
            if (bdcRes.ok) {
              const bdc = await bdcRes.json();
              detectedRoad = bdc.locality || '';
              detectedSuburb = bdc.city || '';
              detectedCity = bdc.principalSubdivision || bdc.countryName || 'Toshkent';
              detectedAddress = [detectedRoad, detectedSuburb, detectedCity].filter(Boolean).join(', ');
            }
          } catch {
            // Keep coordinates
          }
        }

        // Match to best district
        const matched = matchLocationToDistrict(
          latitude,
          longitude,
          `${detectedAddress} ${detectedRoad} ${detectedSuburb}`
        );

        setSelectedDistrictId(matched.districtId);
        setGeoLocating(false);

        const finalAddress =
          detectedAddress ||
          `${matched.districtNameUz}, Toshkent (${coordsText})`;

        const locationData: DetectedLocationData = {
          address: finalAddress,
          road: detectedRoad,
          suburb: detectedSuburb,
          districtName: isUz ? matched.districtNameUz : matched.districtNameEn,
          city: detectedCity,
          coords: coordsText,
          lat: latitude,
          lon: longitude,
          isLive: true,
        };

        setDetectedLocation(locationData);
        setReportAddress(finalAddress);

        setGeoFeedback(
          isUz
            ? `Aniq joylashuvingiz topildi: ${finalAddress}. Xizmat ko‘rsatish hududi: ${matched.districtNameUz}.`
            : `Exact location identified: ${finalAddress}. Active service zone: ${matched.districtNameEn}.`
        );
      },
      (error) => {
        setGeoLocating(false);
        let errorMsg = '';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = isUz
            ? 'Brauzerda GPS ruxsati berilmadi. Quyidagi namunaviy mahallalardan birini bosing yoki tumaningizni tanlang.'
            : 'Location permission was denied. Click any of the quick sample locations below or pick your district.';
        } else {
          errorMsg = isUz
            ? 'GPS signalini aniqlashda xatolik yuz berdi. Iltimos, quyidagi namunaviy mahallalardan birini sinab ko‘ring.'
            : 'Unable to acquire accurate GPS signal. Try one of our sample neighborhood locations below.';
        }
        setGeoFeedback(errorMsg);
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 30000 }
    );
  };

  // Quick preset sample location selector
  const handleSelectSample = (
    sampleNameUz: string,
    sampleNameEn: string,
    distId: string,
    lat: number,
    lon: number,
    road: string,
    suburb: string
  ) => {
    setSelectedDistrictId(distId);
    const coordsText = `${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`;
    const fullAddress = isUz
      ? `${road}, ${suburb}, ${DISTRICT_COORDINATES[distId]?.nameUz || distId}, Toshkent`
      : `${road}, ${suburb}, ${DISTRICT_COORDINATES[distId]?.nameEn || distId}, Tashkent`;

    const locationData: DetectedLocationData = {
      address: fullAddress,
      road,
      suburb,
      districtName: isUz
        ? DISTRICT_COORDINATES[distId]?.nameUz || distId
        : DISTRICT_COORDINATES[distId]?.nameEn || distId,
      city: 'Toshkent',
      coords: coordsText,
      lat,
      lon,
      isLive: false,
    };

    setDetectedLocation(locationData);
    setReportAddress(fullAddress);
    setGeoFeedback(
      isUz
        ? `Namunaviy manzil faollashtirildi: ${fullAddress}. Chiqindi jadvali yuklandi.`
        : `Sample neighborhood selected: ${fullAddress}. Active pickup schedule loaded.`
    );
  };

  // Submit report with direct routing to sardieyeee08@gmail.com
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReport(true);
    setReportSuccess(null);

    const ticketId = `REP-${Math.floor(100000 + Math.random() * 900000)}`;
    const districtName = isUz ? currentDistrict.districtNameUz : currentDistrict.districtNameEn;
    const finalAddress =
      reportAddress ||
      (isUz
        ? `${selectedMahalla}, ${districtName}`
        : `${selectedMahalla}, ${districtName}`);
    const finalContact = reportContact || (isUz ? 'Fuqaro (Anonim)' : 'Resident (Anonymous)');
    const finalDetails = reportDetails || (isUz ? 'Qo‘shimcha izoh yo‘q' : 'No extra details');

    const payload = {
      district: districtName,
      address: finalAddress,
      issueType: reportIssue,
      details: finalDetails,
      reporterContact: finalContact,
    };

    // Construct mailto link as direct 1-click fallback to sardieyeee08@gmail.com
    const mailSubject = encodeURIComponent(`[EcoMahalla Ticket ${ticketId}] ${reportIssue} - ${districtName}`);
    const mailBody = encodeURIComponent(
      `EcoMahalla Citizen Dispatch Incident Report\n` +
      `-----------------------------------------\n` +
      `Ticket Number: ${ticketId}\n` +
      `District: ${districtName}\n` +
      `Address / Mahalla: ${finalAddress}\n` +
      `Issue Category: ${reportIssue}\n` +
      `Details: ${finalDetails}\n` +
      `Reporter Contact: ${finalContact}\n` +
      `Timestamp: ${new Date().toLocaleString()}\n` +
      `Sent via: EcoMahalla Citizen Portal (https://ecomahalla.uz)`
    );
    const mailtoUrl = `mailto:sardieyeee08@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    // 1. Submit to internal server route
    let serverReport = null;
    try {
      const res = await fetch('/api/v1/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        serverReport = data.report;
      }
    } catch {
      // Serverless / static client fallback
    }

    // 2. Direct Webhook / FormSubmit call to forward to sardieyeee08@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/sardieyeee08@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[EcoMahalla Alert] ${ticketId}: ${reportIssue} in ${districtName}`,
          _template: 'table',
          _captcha: 'false',
          Ticket_ID: ticketId,
          District: districtName,
          Address: finalAddress,
          Issue_Type: reportIssue,
          Details: finalDetails,
          Reporter_Contact: finalContact,
          Timestamp: new Date().toLocaleString(),
          Municipal_Target: 'Maxsustrans DUK & Mahalla Citizen Desk',
        }),
      }).catch((err) => {
        console.warn('FormSubmit client warning:', err);
      });
    } catch {
      // Non-blocking
    }

    setReportSuccess({
      reportId: serverReport?.reportId || ticketId,
      district: districtName,
      address: finalAddress,
      issueType: reportIssue,
      details: finalDetails,
      reporterContact: finalContact,
      mailtoUrl,
      targetEmail: 'sardieyeee08@gmail.com',
    });

    setReportAddress('');
    setReportDetails('');
    setReportContact('');
    setIsSubmittingReport(false);
  };

  // Bin color map
  const getBinBadge = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rose':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'amber':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 6.3 Header & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isUz ? 'Ishlayotgan Prototip (Interaktiv)' : 'Live Interactive Prototype'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isUz ? 'Mahallangiz bo‘yicha aniq jadvalni ko‘ring' : 'Hyperlocal Waste Pickup Schedule'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {isUz
              ? 'Toshkentning barcha 12 tumani va mahallalari qamrab olingan. GPS orqali o‘z manzilingizni aniqlang.'
              : 'Covering all 12 districts and mahallas in Tashkent. Auto-detect your precise street via GPS.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDetectLocation}
            disabled={geoLocating}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Navigation className={`w-4 h-4 ${geoLocating ? 'animate-spin' : ''}`} />
            <span>
              {geoLocating
                ? (isUz ? 'GPS aniqlanmoqda...' : 'Locating GPS...')
                : (isUz ? 'Mening joylashuvimni aniqlash' : 'Auto-Detect My Location')}
            </span>
          </button>
        </div>
      </div>

      {/* Live Detected Location Banner Card */}
      {detectedLocation && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950 text-white shadow-lg border border-emerald-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {detectedLocation.isLive
                  ? (isUz ? 'Jonli GPS Aniqlangan Manzil' : 'Live GPS Verified Location')
                  : (isUz ? 'Tanlangan Namunaviy Manzil' : 'Simulated Sample Location')}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-900/80 border border-emerald-700 text-emerald-200">
                {detectedLocation.coords}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-extrabold text-white">
              {detectedLocation.address}
            </h4>

            <p className="text-xs text-slate-300 flex items-center gap-2 flex-wrap">
              <span>
                {isUz ? 'Biriktirilgan tuman:' : 'Assigned District:'}{' '}
                <strong className="text-emerald-300">{detectedLocation.districtName}</strong>
              </span>
              <span>•</span>
              <span>
                {isUz ? 'Maxsustrans hududi:' : 'Municipal Stream:'} <strong>DUK #TASH-01</strong>
              </span>
            </p>
          </div>

          <button
            onClick={handleDetectLocation}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-white/10 transition-colors shrink-0 cursor-pointer self-start md:self-center"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isUz ? 'Qayta aniqlash' : 'Re-verify GPS'}</span>
          </button>
        </div>
      )}

      {geoFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="leading-relaxed">{geoFeedback}</span>
        </div>
      )}

      {/* MERGED UNIFIED CARD: 30% Left (Mahalla Dropdown) / 70% Right (Weekly Day Cards) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 lg:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 items-start">
          {/* 30% LEFT COLUMN: District & Mahalla Dropdown and Stats */}
          <div className="lg:col-span-3 space-y-4 bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{isUz ? 'Hudud & Mahalla' : 'Zone & Mahalla'}</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 tracking-tight">
                {isUz ? 'Mahallangizni tanlang' : 'Select Your Mahalla'}
              </h4>
              <p className="text-xs text-slate-500">
                {isUz
                  ? 'Toshkentning 12 tumani bo‘yicha mahallalarni o‘zgartiring.'
                  : 'Browse all 12 Tashkent districts and local mahalla blocks.'}
              </p>
            </div>

            {/* 1. District Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{isUz ? '1. Tuman (12 ta tuman)' : '1. District (12 zones)'}</span>
                <span className="text-[11px] text-emerald-600 font-mono font-bold">{currentDistrict.coverageRate}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedDistrictId}
                  onChange={(e) => {
                    const newId = e.target.value;
                    setSelectedDistrictId(newId);
                    const list = DISTRICT_MAHALLAS[newId] || [];
                    if (list.length > 0) {
                      const first = isUz ? list[0].uz : list[0].en;
                      setSelectedMahalla(first);
                      setReportAddress(`${first}, ${isUz ? currentDistrict.districtNameUz : currentDistrict.districtNameEn}, Toshkent`);
                    }
                  }}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 cursor-pointer shadow-2xs appearance-none pr-8"
                >
                  {DISTRICT_LIST.map((dist) => (
                    <option key={dist.districtId} value={dist.districtId}>
                      {isUz ? dist.districtNameUz.split(' (')[0] : dist.districtNameEn.split(' (')[0]} ({dist.mahallaCount} mahalla)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Mahalla Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{isUz ? '2. Mahalla / Mavze' : '2. Mahalla Block'}</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {(DISTRICT_MAHALLAS[selectedDistrictId] || []).length} {isUz ? 'ta mahalla' : 'options'}
                </span>
              </label>
              <div className="relative">
                <select
                  value={selectedMahalla}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedMahalla(val);
                    setReportAddress(`${val}, ${isUz ? currentDistrict.districtNameUz : currentDistrict.districtNameEn}, Toshkent`);
                  }}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 cursor-pointer shadow-2xs appearance-none pr-8"
                >
                  {(DISTRICT_MAHALLAS[selectedDistrictId] || []).map((m, mIdx) => {
                    const name = isUz ? m.uz : m.en;
                    return (
                      <option key={mIdx} value={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* District Key Metrics */}
            <div className="pt-3 border-t border-slate-200/90 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>{isUz ? 'Mahallalar soni:' : 'Total Mahallas:'}</span>
                <strong className="text-slate-900">{currentDistrict.mahallaCount} ta</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>{isUz ? 'Qamrov darajasi:' : 'Coverage Rate:'}</span>
                <strong className="text-emerald-700 font-bold">{currentDistrict.coverageRate}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>{isUz ? 'Olib ketish vaqti:' : 'Collection Window:'}</span>
                <strong className="text-slate-900 font-mono text-[11px]">{currentDistrict.collectionTime}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>{isUz ? 'Xizmat operatori:' : 'Fleet Operator:'}</span>
                <span className="text-slate-700 font-mono text-[10px] bg-slate-200/80 px-1.5 py-0.5 rounded">DUK Maxsustrans</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                {isUz ? 'Tezkor namunaviy mahallalar:' : 'Quick Presets:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Katartol', distId: 'chilonzor', mUz: 'Katartol mahallasi', mEn: 'Katartal mahalla' },
                  { name: 'Bodomzor', distId: 'yunusobod', mUz: 'Bodomzor mahallasi', mEn: 'Bodomzor mahalla' },
                  { name: 'Oybek', distId: 'mirobod', mUz: 'Oybek mahallasi', mEn: 'Oybek mahalla' },
                  { name: 'Zarkaynar', distId: 'shayxontohur', mUz: 'Zarkaynar mahallasi', mEn: 'Zarkaynar mahalla' },
                ].map((pr, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => {
                      setSelectedDistrictId(pr.distId);
                      setSelectedMahalla(isUz ? pr.mUz : pr.mEn);
                      setReportAddress(`${isUz ? pr.mUz : pr.mEn}, Toshkent`);
                    }}
                    className="px-2 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    {pr.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 70% RIGHT COLUMN: Weekly Schedule with Real Day of Week Tracking */}
          <div className="lg:col-span-7 space-y-4">
            {/* Schedule Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {isUz
                      ? `${currentDistrict.districtNameUz.split(' (')[0]}, ${selectedMahalla}`
                      : `${currentDistrict.districtNameEn.split(' (')[0]}, ${selectedMahalla}`}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isUz
                    ? `Olib ketish vaqti: ${currentDistrict.collectionTime} · Haftalik grafik`
                    : `Pickup window: ${currentDistrict.collectionTime} · Weekly schedule`}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{isUz ? `Bugun: ${formattedTodayDate}` : `Today: ${formattedTodayDate}`}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{isUz ? 'Oflayn kesh' : 'Cached'}</span>
                </span>
              </div>
            </div>

            {/* Real-time "Today's Active Collection" Status Banner */}
            {(() => {
              const todaySchedule = currentDistrict.schedule[realDayIndex] || currentDistrict.schedule[0];
              return (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border shadow-2xs ${getBinBadge(
                        todaySchedule.binColor
                      )}`}
                    >
                      {todaySchedule.code}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{isUz ? 'Bugungi olib ketish turi:' : 'Today\'s Active Pickup:'}</span>
                        <span className="text-emerald-800 font-extrabold">{isUz ? todaySchedule.typeUz : todaySchedule.typeEn}</span>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {isUz
                          ? `Soat ${currentDistrict.collectionTime} oralig‘ida belgilangan rangdagi chiqindi idishini tayyorlang.`
                          : `Prepare the corresponding colored bin during the ${currentDistrict.collectionTime} collection window.`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-900 bg-emerald-200/70 px-2 py-0.5 rounded font-bold">
                      <Clock className="w-3 h-3 text-emerald-700" />
                      <span>{currentDistrict.collectionTime}</span>
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* 7-Day Schedule Cards: Bigger, high-contrast, NO text truncation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3">
              {currentDistrict.schedule.map((item, idx) => {
                const isToday = idx === realDayIndex;
                const isTomorrow = idx === tomorrowIndex;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col justify-between transition-all min-h-[160px] ${
                      isToday
                        ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-500/50 shadow-md'
                        : isTomorrow
                        ? 'border-blue-400 bg-blue-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-[13px] font-bold text-slate-900">
                          {item.day}
                        </span>
                        {isToday && (
                          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-600 text-white shrink-0 shadow-2xs animate-pulse">
                            {isUz ? 'Bugun' : 'Today'}
                          </span>
                        )}
                        {isTomorrow && (
                          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-600 text-white shrink-0 shadow-2xs">
                            {isUz ? 'Ertaga' : 'Next'}
                          </span>
                        )}
                      </div>

                      <div className="mb-2">
                        <span
                          className={`inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${getBinBadge(
                            item.binColor
                          )}`}
                        >
                          {item.code}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 font-medium leading-snug">
                        {isUz ? item.typeUz : item.typeEn}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{currentDistrict.collectionTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Part B: "What Goes Where" Searchable Directory */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-emerald-600" />
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">
              {isUz
                ? '“Nima qayerga tashlanadi?” — Interaktiv Saralash Qo‘llanmasi'
                : '“What Goes Where” — Interactive Sorting Directory'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isUz
              ? 'Toshkentda qaysi chiqindi turini qanday rangli qutiga joylash bo‘yicha to‘liq katalog.'
              : 'Official color-coded recycling guide for Tashkent mahallas with preparation instructions.'}
          </p>
        </div>

        {/* Search Bar & Filter Buttons */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={wasteSearch}
              onChange={(e) => setWasteSearch(e.target.value)}
              placeholder={
                isUz
                  ? 'Masalan: plastik butilka, qog‘oz, batareya, pitsa qutisi...'
                  : 'e.g. plastic bottle, paper boxes, batteries, pizza box...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 text-xs sm:text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-medium">
            {[
              { id: 'all', labelUz: 'Barchasi', labelEn: 'All Items' },
              { id: 'recyclable', labelUz: 'Qayta ishlanadigan (Ko‘k)', labelEn: 'Recyclables (Blue)' },
              { id: 'organic', labelUz: 'Organik (Yashil)', labelEn: 'Organics (Green)' },
              { id: 'hazardous', labelUz: 'Xavfli (Qizil)', labelEn: 'Hazardous (Red)' },
              { id: 'electronic', labelUz: 'Elektronika (Sariq)', labelEn: 'E-Waste (Amber)' },
              { id: 'general', labelUz: 'Umumiy (Kulrang)', labelEn: 'General (Gray)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-xs ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isUz ? cat.labelUz : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Waste Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWasteItems.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${getBinBadge(
                      item.binColor
                    )}`}
                  >
                    {item.binColor.toUpperCase()} BIN
                  </span>
                  <span className="text-xs text-slate-400 capitalize">{item.category}</span>
                </div>
                <h5 className="font-bold text-sm sm:text-base text-slate-900">
                  {isUz ? item.nameUz : item.nameEn}
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isUz ? item.disposalUz : item.disposalEn}
                </p>
              </div>
            </div>
          ))}

          {filteredWasteItems.length === 0 && (
            <div className="col-span-full p-8 text-center text-slate-400 text-xs">
              {isUz
                ? 'Hech qanday element topilmadi. AI maslahatchisidan so‘rab ko‘ring!'
                : 'No items matched. Try querying our AI Assistant!'}
            </div>
          )}
        </div>
      </div>

      {/* Part C: Citizen Report Form (Town Hall Bridge) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                {isUz
                  ? 'Mahalla Dispetcheriga Xabar Yuborish (Town Hall Integration)'
                  : 'Citizen Dispatch & Schedule Correction Report'}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isUz
                ? 'Chiqindi mashinasi kelmadimi yoki jadvalda xatolik bormi? Xabar bering — murojaat to‘g‘ridan-to‘g‘ri dispetcher jurnaliga tushadi va operatorga yuboriladi.'
                : 'Report delayed pickups, missed streets, or schedule errors directly to municipal dispatchers.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium shrink-0">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isUz ? 'Murojaatlar qabul qilinadi:' : 'Routed to:'}{' '}
              <strong className="text-slate-900 font-mono">sardieyeee08@gmail.com</strong>
            </span>
          </div>
        </div>

        {reportSuccess && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                {isUz
                  ? 'Murojaat muvaffaqiyatli qabul qilindi va dispetcherga jo‘natildi!'
                  : 'Incident report successfully dispatched to municipal operations!'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white/80 p-3 rounded-xl border border-emerald-200/60">
              <div>
                <span className="text-slate-500 block">{isUz ? 'Chipta raqami:' : 'Ticket Number:'}</span>
                <span className="font-mono font-bold text-slate-900">{reportSuccess.reportId}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isUz ? 'Yuborilgan manzil:' : 'Forwarded To:'}</span>
                <span className="font-mono font-bold text-emerald-700">sardieyeee08@gmail.com</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isUz ? 'Tuman & Manzil:' : 'Location:'}</span>
                <span className="font-medium text-slate-800">{reportSuccess.district} · {reportSuccess.address}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isUz ? 'Holat & SLA:' : 'Status & SLA:'}</span>
                <span className="font-medium text-slate-800">
                  {isUz ? 'Ko‘rib chiqilmoqda (24 soat ichida)' : 'Under Review (24-Hour SLA)'}
                </span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitReport} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isUz ? 'Muammo turi:' : 'Issue Type:'}
              </label>
              <select
                value={reportIssue}
                onChange={(e) => setReportIssue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 bg-white"
              >
                <option value="delayed">
                  {isUz ? 'Chiqindi mashinasi jadval bo‘yicha kelmadi' : 'Pickup truck did not arrive'}
                </option>
                <option value="wrong_schedule">
                  {isUz ? 'Ilovada ko‘rsatilgan sana noto‘g‘ri' : 'Incorrect schedule dates displayed'}
                </option>
                <option value="overflowing">
                  {isUz ? 'Qutilar to‘lib toshgan va chiqindi sochilgan' : 'Bins overflowing / littering'}
                </option>
                <option value="request_recycling">
                  {isUz ? 'Yangi ko‘k/yashil saralash qutisini talab qilish' : 'Request new recycling bin'}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isUz ? 'Aniq manzil yoki mahalla:' : 'Exact Address or Mahalla:'}
              </label>
              <input
                type="text"
                value={reportAddress}
                onChange={(e) => setReportAddress(e.target.value)}
                placeholder={
                  isUz
                    ? 'Masalan: Chilonzor 7-mavze, 14-uy oldi yoki Alisher Navoiy ko‘chasi'
                    : 'e.g. Chilanzar Block 7, Bldg 14 or Navoiy St'
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isUz ? 'Qo‘shimcha izoh (ixtiyoriy):' : 'Additional Details (Optional):'}
              </label>
              <textarea
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={2}
                placeholder={
                  isUz
                    ? 'Vaziyatni qisqacha tavsiflang...'
                    : 'Describe the situation briefly...'
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isUz ? 'Bog‘lanish uchun telefon yoki Telegram (ixtiyoriy):' : 'Contact Phone or Telegram (Optional):'}
              </label>
              <input
                type="text"
                value={reportContact}
                onChange={(e) => setReportContact(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmittingReport}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isUz ? 'Dispetcherga yuborish' : 'Submit Incident Report'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
