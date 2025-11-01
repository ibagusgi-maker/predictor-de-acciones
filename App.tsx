import React, { useState } from 'react';
import type { Prediction } from './types';
import { Header } from './components/Header';
import { StockInputForm } from './components/StockInputForm';
import { PredictionCard } from './components/PredictionCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Disclaimer } from './components/Disclaimer';
import { fetchStockPrediction } from './services/geminiService';


const App: React.FC = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (ticker: string, timeframe: string) => {
    if (!ticker) {
        setError('Por favor, ingrese un símbolo bursátil.');
        return;
    }
    setIsLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const result = await fetchStockPrediction(ticker, timeframe);
      setPrediction(result);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Ocurrió un error inesperado.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
             <StockInputForm onPredict={handlePredict} isLoading={isLoading} />
          </div>

          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {prediction && <PredictionCard prediction={prediction} />}
          </div>
        </main>
        <Disclaimer />
      </div>
    </div>
  );
};

export default App;
