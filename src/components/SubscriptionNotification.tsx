import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const DEFAULT_EXPIRY = '2026-09-01';

function getExpiryDate(): Date {
  const stored = localStorage.getItem('subscription_notif_expiry');
  const dateStr = stored && stored.length > 0 ? stored : DEFAULT_EXPIRY;
  return new Date(dateStr + 'T00:00:00');
}

function getExpiryDisplay(): string {
  const stored = localStorage.getItem('subscription_notif_expiry');
  const dateStr = stored && stored.length > 0 ? stored : DEFAULT_EXPIRY;
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(expiry: Date): TimeLeft {
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const SubscriptionNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [expiryDate, setExpiryDate] = useState(getExpiryDate());
  const [expiryDisplay, setExpiryDisplay] = useState(getExpiryDisplay());

  useEffect(() => {
    const enabled = localStorage.getItem('subscription_notif_enabled');
    if (enabled === 'false') return;

    const expiry = getExpiryDate();
    setExpiryDate(expiry);
    setExpiryDisplay(getExpiryDisplay());

    const now = new Date();
    if (expiry.getTime() <= now.getTime()) {
      setIsExpired(true);
    }

    setVisible(true);

    const updateTimer = () => {
      const left = calcTimeLeft(expiry);
      setTimeLeft(left);
      if (left.days === 0 && left.hours === 0 && left.minutes === 0 && left.seconds === 0) {
        setIsExpired(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    if (isExpired) return;
    setVisible(false);
  };

  if (!visible) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header gradient */}
        <div className={`px-6 py-5 ${isExpired ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-amber-500 to-orange-600'}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">
                {isExpired ? 'Langganan Webhost Telah Berakhir' : 'Peringatan Langganan Webhost'}
              </h2>
              <p className="text-white/80 text-xs mt-0.5">
                {isExpired ? 'Segera lakukan perpanjangan' : 'Segera lakukan perpanjangan'}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {isExpired
              ? `Langganan webhost Anda telah berakhir pada ${expiryDisplay}. Segera lakukan perpanjangan untuk dapat selalu mengakses web Anda.`
              : `Langganan Webhost akan berakhir pada ${expiryDisplay}. Segera lakukan perpanjangan untuk dapat selalu mengakses web Anda.`}
          </p>

          {/* Countdown */}
          {!isExpired ? (
            <div className="mb-5">
              <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Sisa Waktu
              </p>
              <div className="flex justify-center gap-2">
                <CountdownUnit value={timeLeft.days} label="Hari" />
                <CountdownUnit value={pad(timeLeft.hours)} label="Jam" />
                <CountdownUnit value={pad(timeLeft.minutes)} label="Menit" />
                <CountdownUnit value={pad(timeLeft.seconds)} label="Detik" />
              </div>
            </div>
          ) : (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-center">
              <p className="text-red-700 font-semibold text-sm">
                Akses ke web ini tidak tersedia lagi sampai perpanjangan dilakukan.
              </p>
            </div>
          )}

          {/* Oke button */}
          <button
            onClick={handleDismiss}
            disabled={isExpired}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              isExpired
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 active:scale-[0.98] shadow-lg'
            }`}
          >
            {isExpired ? 'Tidak Dapat Ditutup' : 'Oke, Mengerti'}
          </button>

          {isExpired && (
            <p className="text-center text-xs text-red-500 mt-2">
              Notifikasi ini tidak dapat ditutup karena langganan telah berakhir.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CountdownUnit: React.FC<{ value: number | string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-14 h-14 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-md">
      <span className="text-white font-bold text-xl tabular-nums">{value}</span>
    </div>
    <span className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">{label}</span>
  </div>
);

export default SubscriptionNotification;
