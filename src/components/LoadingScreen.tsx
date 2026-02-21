import React from 'react';
import { Sprout, Leaf, Moon, Star } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ramadhan-subtle">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-30"></div>
      
      {/* Animated background elements - stars and moon */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Star className="h-3 w-3 text-amber-300 opacity-60" />
          </div>
        ))}
        
        {/* Floating moon particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`moon-${i}`}
            className="absolute animate-float-leaf"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            <div className="w-2 h-2 bg-amber-200 rounded-full opacity-40"></div>
          </div>
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Planting Animation */}
        <div className="mb-8 relative">
          <div className="relative w-40 h-40 mx-auto">
            {/* Soil base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-amber-600 to-yellow-700 rounded-full opacity-80"></div>
            
            {/* Growing plant stem */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3 bg-gradient-to-t from-green-600 to-green-500 rounded-t-sm animate-grow-up origin-bottom" style={{
              height: '40px',
              animationDuration: '1.5s',
              animationFillMode: 'forwards'
            }}></div>
            
            {/* First leaves - appear after stem */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-fade-in-scale" style={{
              animationDelay: '1.5s',
              animationDuration: '0.8s',
              animationFillMode: 'forwards',
              opacity: 0
            }}>
              <div className="relative">
                <Leaf className="h-8 w-8 text-green-500 transform -rotate-45" />
                <Leaf className="absolute top-0 left-4 h-8 w-8 text-green-400 transform rotate-45" />
              </div>
            </div>
            
            {/* Second set of leaves */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-fade-in-scale" style={{
              animationDelay: '2.2s',
              animationDuration: '0.8s',
              animationFillMode: 'forwards',
              opacity: 0
            }}>
              <div className="relative">
                <Leaf className="h-6 w-6 text-green-600 transform -rotate-30" />
                <Leaf className="absolute top-0 left-3 h-6 w-6 text-green-500 transform rotate-30" />
              </div>
            </div>

            {/* Floating seeds/particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-leaf"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 30}%`,
                  animationDelay: `${2 + Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-70"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          {/* Arabic greeting */}
          <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-2xl md:text-3xl font-arabic font-bold text-amber-800 mb-2" style={{ fontFamily: 'Amiri, Cairo, serif' }}>
              بسم الله الرحمن الرحيم
            </p>
            <p className="text-lg md:text-xl font-arabic text-amber-700" style={{ fontFamily: 'Amiri, Cairo, serif' }}>
              في شهر رمضان المبارك
            </p>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent mb-3 animate-pulse">
            🌱 Menanam Kebaikan di Bulan Suci
          </h2>
          <p className="text-amber-700 text-lg font-medium animate-fade-in" style={{
            animationDelay: '0.5s'
          }}>
            Memuat Portal Ramadhan Trees4Trees Citanduy...
          </p>
          
          {/* Progress bar with Ramadhan theme */}
          <div className="w-64 h-3 bg-amber-100 rounded-full mx-auto overflow-hidden shadow-inner border border-amber-200">
            <div className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-amber-500 rounded-full animate-progress shadow-sm"></div>
          </div>
          
          {/* Loading dots with moon theme */}
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce shadow-sm"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Decorative elements with Ramadhan theme */}
        <div className="absolute top-8 left-8">
          <Moon className="h-10 w-10 text-amber-400 animate-pulse shadow-ramadhan-glow" />
        </div>
        <div className="absolute top-8 right-8">
          <div className="relative">
            <Star className="h-8 w-8 text-amber-300 animate-pulse" />
            <Star className="absolute top-2 left-2 h-6 w-6 text-amber-200 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-4">
            <Leaf className="h-6 w-6 text-green-400 animate-leaf-dance" />
            <Moon className="h-6 w-6 text-amber-500 animate-gentle-sway" />
            <Sprout className="h-6 w-6 text-emerald-400 animate-gentle-sway" />
            <Leaf className="h-6 w-6 text-green-500 animate-leaf-dance" style={{
              animationDelay: '1s'
            }} />
          </div>
        </div>
      </div>

      {/* Bottom gradient with Ramadhan theme */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 via-green-50 to-transparent opacity-60"></div>
    </div>
  );
};

export default LoadingScreen;