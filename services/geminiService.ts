import type { Prediction } from '../types';

export const fetchStockPrediction = async (ticker: string, timeframe:string): Promise<Prediction> => {
    try {
        // Llama a la función serverless de Netlify en lugar de directamente a la API de Gemini.
        const response = await fetch('/.netlify/functions/get-prediction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticker, timeframe }),
        });

        if (!response.ok) {
            // Intenta obtener un mensaje de error más detallado del cuerpo de la respuesta.
            const errorData = await response.json().catch(() => ({ error: `Error del servidor: ${response.statusText}` }));
            throw new Error(errorData.error || `Error del servidor: ${response.status}`);
        }

        const predictionData = await response.json();
        return predictionData;

    } catch (error) {
        console.error("Error al obtener la predicción desde la función serverless:", error);
        if (error instanceof Error) {
             // Re-lanza el mensaje de error para que el componente de la UI pueda mostrarlo.
             throw new Error(error.message);
        }
        throw new Error("Ocurrió un error inesperado al procesar la predicción.");
    }
};
