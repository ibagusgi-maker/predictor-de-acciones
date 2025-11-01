import React from 'react';
import type { Prediction } from '../types';

interface PredictionCardProps {
  prediction: Prediction;
}

const InfoItem: React.FC<{ label: string; value: React.ReactNode; className?: string }> = ({ label, value, className = '' }) => (
    <div className={`py-3 ${className}`}>
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-200">{value}</p>
    </div>
);


const Section: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; }> = ({ title, children, icon }) => (
    <div className="mt-6">
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h3 className="text-xl font-bold text-emerald-400">{title}</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{children}</p>
    </div>
);

const RationaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const RiskIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);


export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const confidencePercentage = (prediction.confidence_score * 100).toFixed(0);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 pb-4 mb-4">
            <div>
                <h2 className="text-2xl font-bold text-white">{prediction.company_name}</h2>
                <p className="text-lg font-mono text-cyan-400">{prediction.ticker}</p>
            </div>
             <div className="text-sm font-semibold bg-gray-700 text-gray-300 px-3 py-1 rounded-full mt-2 sm:mt-0">
                {prediction.timeframe}
            </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2">
            <InfoItem 
                label="Precio Previsto" 
                value={`$${prediction.predicted_price.toFixed(2)}`}
            />
            <InfoItem
                label="Confianza"
                value={
                    <div className="flex items-center gap-2">
                         <span>{confidencePercentage}%</span>
                         <div className="w-full bg-gray-600 rounded-full h-2.5">
                             <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${confidencePercentage}%` }}></div>
                         </div>
                    </div>
                }
            />
        </div>
        
        <Section title="Justificación" icon={<RationaleIcon />}>
            {prediction.rationale}
        </Section>
        
        <Section title="Riesgos Potenciales" icon={<RiskIcon />}>
            {prediction.potential_risks}
        </Section>
    </div>
  );
};
