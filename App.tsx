import React, { useState, useCallback } from 'react';
import { StockInputForm } from './components/StockInputForm';
import { PredictionCard } from './components/PredictionCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { Disclaimer } from './components/Disclaimer';
import { fetchStockPrediction } from './services/geminiService';
import type { Prediction } from './types';

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = useCallback(async (ticker: string, timeframe: string) => {
    if (!ticker) {
      setError('Por favor, ingrese un símbolo bursátil.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await fetchStockPrediction(ticker, timeframe);
      setPrediction(result);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No se pudo obtener la predicción. El símbolo puede ser inválido o la API no está disponible.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main>
          <StockInputForm onPredict={handlePredict} isLoading={isLoading} />
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {prediction && <PredictionCard prediction={prediction} />}
            {!isLoading && !prediction && !error && (
              <div className="text-center text-gray-400 p-8 bg-gray-800 rounded-xl">
                <p>Ingrese un símbolo bursátil (ej. GOOGL, AAPL, MSFT) y seleccione una temporalidad para obtener una predicción de precio impulsada por IA.</p>
              </div>
            )}
          </div>
        </main>
        <Disclaimer />
      </div>
    </div>
  );
};

export default App;