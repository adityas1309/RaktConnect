from prophet import Prophet
import pandas as pd
import matplotlib.pyplot as plt
import os

def forecast_demand(csv_file="blood_demand_data.csv", days=7):
    df = pd.read_csv(csv_file)

    if 'date' in df.columns and 'demand' in df.columns:
        df.rename(columns={"date": "ds", "demand": "y"}, inplace=True)
    else:
        raise ValueError("Expected columns 'date' and 'demand' not found.")

    model = Prophet(
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False
    )
    model.fit(df)

    future = model.make_future_dataframe(periods=days)
    forecast = model.predict(future)

    # Output paths
    output_csv = os.path.join(os.path.dirname(__file__), "forecast_output.csv")
    output_plot = os.path.join(os.path.dirname(__file__), "forecast_plot.png")

    # Save forecast and plot
    forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_csv(output_csv, index=False)
    model.plot(forecast)
    plt.savefig(output_plot)

    print(f"✅ Forecasting complete!")
    print(f"📄 Saved forecast data to: {output_csv}")
    print(f"🖼️  Saved forecast plot to: {output_plot}")

if __name__ == "__main__":
    forecast_demand()
