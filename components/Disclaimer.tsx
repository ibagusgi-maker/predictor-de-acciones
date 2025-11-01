import React from 'react';

export const Disclaimer: React.FC = () => {
    return (
        <footer className="mt-12 text-center text-xs text-gray-500">
            <p>
                <strong>Descargo de responsabilidad:</strong> Esta herramienta proporciona predicciones generadas por IA únicamente con fines informativos y de entretenimiento. 
                No constituye asesoramiento financiero. Todas las inversiones conllevan riesgos y debe consultar con un profesional financiero calificado antes de tomar cualquier decisión de inversión.
            </p>
        </footer>
    );
}