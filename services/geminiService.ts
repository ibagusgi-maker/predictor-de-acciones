import { GoogleGenAI, Type } from "@google/genai";
import type { Prediction } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    // This error is for the developer, to ensure the environment variable is set.
    throw new Error("La variable de entorno API_KEY no está configurada.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const predictionSchema = {
  type: Type.OBJECT,
  properties: {
    ticker: { type: Type.STRING },
    company_name: { type: Type.STRING },
    predicted_price: { type: Type.NUMBER },
    confidence_score: { type: Type.NUMBER },
    rationale: { type: Type.STRING },
    potential_risks: { type: Type.STRING },
  },
  required: ['ticker', 'company_name', 'predicted_price', 'confidence_score', 'rationale', 'potential_risks'],
};

export const fetchStockPrediction = async (ticker: string, timeframe: string): Promise<Prediction> => {
    try {
        const prompt = `
          Actúa como un analista financiero experto creando un indicador simulado de precios de acciones.
          Analiza la acción con el símbolo: "${ticker}".
          El plazo para tu predicción es de los próximos "${timeframe}".
          Proporciona una predicción de precio futuro plausible basada en una síntesis de las tendencias generales del mercado, patrones de rendimiento históricos (sin usar datos en tiempo real) y análisis del sentimiento público, todo enfocado en el plazo especificado.
          Esta es una simulación para una herramienta de indicador técnico. No proporciones asesoramiento financiero.
          Tu análisis debe ser completo pero hipotético y relevante para el plazo de "${timeframe}".
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              responseSchema: predictionSchema,
              temperature: 0.5,
            },
        });

        const jsonText = response.text.trim();
        const predictionDataFromModel = JSON.parse(jsonText);
        
        return { ...predictionDataFromModel, timeframe };

    } catch (error) {
        console.error("Error al obtener la predicción desde la API de Gemini:", error);
        if (error instanceof Error) {
             throw new Error(`Error al obtener la predicción: ${error.message}`);
        }
        throw new Error("Ocurrió un error inesperado al procesar la predicción.");
    }
};
