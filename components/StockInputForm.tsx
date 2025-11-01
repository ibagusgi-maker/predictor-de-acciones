import React, { useState } from 'react';

interface StockInputFormProps {
  onPredict: (ticker: string, timeframe: string) => void;
  isLoading: boolean;
}

const timeframes = [
    { value: '5 minutos', label: '5 Minutos' },
    { value: '15 minutos', label: '15 Minutos' },
    { value: '1 hora', label: '1 Hora' },
    { value: '4 horas', label: '4 Horas' },
    { value: '1 día', label: '1 Día' },
    { value: '1 semana', label: '1 Semana' },
    { value: '1 mes', label: '1 Mes' },
];

export const StockInputForm: React.FC<StockInputFormProps> = ({ onPredict, isLoading }) => {
  const [ticker, setTicker] = useState('');
  const [timeframe, setTimeframe] = useState(timeframes[4].value); // Default to '1 día'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPredict(ticker.toUpperCase(), timeframe);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Ingrese Símbolo (ej. GOOGL)"
        className="flex-grow w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-200 placeholder-gray-500 transition-shadow"
        disabled={isLoading}
        aria-label="Símbolo Bursátil"
      />
      <select
        value={timeframe}
        onChange={(e) => setTimeframe(e.target.value)}
        disabled={isLoading}
        className="w-full sm:w-auto px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-200 transition-shadow"
        aria-label="Seleccionar Temporalidad"
      >
        {timeframes.map((tf) => (
          <option key={tf.value} value={tf.value}>
            {tf.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center shrink-0"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Prediciendo...
          </>
        ) : 'Predecir Precio'}
      </button>
    </form>
  );
};