from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from prophet import Prophet
from pymongo import MongoClient
from datetime import datetime, timedelta
import random
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["RaktConnect"]
collection = db["blood_demand"]


def get_historical_data():
    historical_data = list(collection.find({}, {"_id": 0, "date": 1, "demand": 1}))

 
    csv_file = "blood_demand_data.csv" 
    if os.path.exists(csv_file):
        df_csv = pd.read_csv(csv_file)
        df_csv["date"] = pd.to_datetime(df_csv["date"])
        csv_data = df_csv.to_dict(orient="records")
        historical_data.extend(csv_data) 

    if not historical_data:
        print("No data in MongoDB or CSV. Using mock data for testing.")
        start_date = datetime(2024, 1, 1)
        for i in range(24):
            date = start_date + timedelta(days=i * 30)
            base_demand = 400 + (i * random.randint(-5, 10))  # Upward trend with randomness
            seasonal_variation = 150 * ((i % 6) - 3)  # Seasonal effect (wave pattern)
            random_spike = random.randint(-150, 150)  # Unexpected fluctuations
            demand = max(100, base_demand + seasonal_variation + random_spike)  # Avoid negative demand
            historical_data.append({"date": date.isoformat(), "demand": demand})
    
    return historical_data

@app.get("/predict/bloodDemand")
def predict_blood_demand():
    historical_data = get_historical_data()
    if not historical_data:
        return {"error": "No data available"}
    
    df = pd.DataFrame(historical_data)
    df["date"] = pd.to_datetime(df["date"])
    df.rename(columns={"date": "ds", "demand": "y"}, inplace=True)
    
    model = Prophet()
    model.fit(df)
    
    future = model.make_future_dataframe(periods=6, freq='M')
    forecast = model.predict(future)
    
    predictions = forecast[["ds", "yhat"]].tail(6).to_dict(orient="records")
    return {"predictions": predictions}
