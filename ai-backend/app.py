from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from prophet import Prophet
from pymongo import MongoClient
from datetime import datetime, timedelta
import random
import os
import joblib
import numpy as np
from dotenv import load_dotenv
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier


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



data = pd.read_csv("haemoglobin_data.csv")


label_encoders = {}
for column in ['gender', 'dietary_habits', 'medical_history']:
    label_encoders[column] = LabelEncoder()
    data[column] = label_encoders[column].fit_transform(data[column])

# Split the data into features and target
X = data.drop("haemoglobin", axis=1)
y = data["haemoglobin"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
score = model.score(X_test, y_test)
print(f"Model R^2 Score: {score}")

# Save the model and label encoders
joblib.dump(model, "haemoglobin_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")

# Load the trained model and label encoders
model = joblib.load("haemoglobin_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")

class DonorData(BaseModel):
    age: int
    gender: str
    weight: float
    height: float
    dietary_habits: str
    medical_history: str
    previous_haemoglobin: float

def provide_advice(haemoglobin: float):
    if haemoglobin < 12.0:
        return "Your haemoglobin level is low. Consider eating iron-rich foods or taking iron supplements."
    elif haemoglobin > 17.0:
        return "Your haemoglobin level is high. Please consult a healthcare provider."
    else:
        return "Your haemoglobin level is normal. Keep up the good work!"

@app.post("/predict/haemoglobin")
def predict_haemoglobin(donor_data: DonorData):
    # Preprocess the input data
    input_data = np.array([[
        donor_data.age,
        label_encoders['gender'].transform([donor_data.gender])[0],
        donor_data.weight,
        donor_data.height,
        label_encoders['dietary_habits'].transform([donor_data.dietary_habits])[0],
        label_encoders['medical_history'].transform([donor_data.medical_history])[0],
        donor_data.previous_haemoglobin
    ]])

    # Make prediction
    predicted_haemoglobin = model.predict(input_data)[0]


    advice = provide_advice(predicted_haemoglobin)

    return {"predicted_haemoglobin": predicted_haemoglobin, "advice": advice}





data = pd.read_csv("dataset.csv")
data.fillna('', inplace=True)
data['symptoms'] = data.apply(lambda row: ' '.join(row.dropna().astype(str)), axis=1)
mlb = MultiLabelBinarizer()
symptom_matrix = mlb.fit_transform(data['symptoms'].str.split())

X_train, X_test, y_train, y_test = train_test_split(symptom_matrix, data['Disease'], test_size=0.2, random_state=42)

# Train disease prediction model
disease_model = RandomForestClassifier(n_estimators=100, random_state=42)
disease_model.fit(X_train, y_train)

# Save the model and encoder
joblib.dump(disease_model, "disease_model.pkl")
joblib.dump(mlb, "mlb.pkl")

# Load the trained model and encoder
disease_model = joblib.load("disease_model.pkl")
mlb = joblib.load("mlb.pkl")

class SymptomData(BaseModel):
    symptoms: list

@app.post("/predict/disease")
def predict_disease(symptom_data: SymptomData):
    symptoms_vectorized = mlb.transform([symptom_data.symptoms])
    prediction = disease_model.predict(symptoms_vectorized)
    return {"predicted_disease": prediction[0]}
