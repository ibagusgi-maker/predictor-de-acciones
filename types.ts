
export interface Prediction {
  ticker: string;
  company_name: string;
  predicted_price: number;
  confidence_score: number;
  timeframe: string;
  rationale: string;
  potential_risks: string;
}

