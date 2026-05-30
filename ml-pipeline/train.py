import os
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
from typing import Tuple, Dict, Any


class DataPreprocessor:
    """Handles all data ingestion."""
    
    def __init__(self, target_column: str):
        self.target_column = target_column

    def load_and_clean(self, filepath: str) -> pd.DataFrame:
        """Loads raw CSV and applies cleaning transformations."""
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Dataset not found at {filepath}")
            
        print(f"Loading and cleaning data from: {filepath}")
        df = pd.read_csv(filepath)
        
        # Convert object columns to 'category' for XGBoost categorical feature support
        for col in df.select_dtypes(include=["object"]).columns:
            if col != self.target_column:
                df[col] = df[col].astype("category")
            
        return df

    def split_data(self, df: pd.DataFrame, test_size: float = 0.2) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
        """Splits the dataframe into stratified training and testing sets."""
        X = df.drop(columns=[self.target_column])
        y = df[self.target_column]
        return train_test_split(X, y, test_size=test_size, random_state=42, stratify=y)


class ChurnModel:
    """Encapsulates the XGBoost algorithm, hyperparameters, and evaluation logic."""
    
    def __init__(self, model_params: Dict[str, Any] = None):
        """Initializes the model with default or custom parameters."""
        default_params = {
            "objective": "binary:logistic",
            "eval_metric": "auc",
            "tree_method": "hist",
            "enable_categorical": True,
            "learning_rate": 0.05,
            "max_depth": 5,
            "n_estimators": 500,
            "early_stopping_rounds": 20,
            "random_state": 42
        }
        self.params = model_params if model_params else default_params
        self.model = xgb.XGBClassifier(**self.params)
        self.is_trained = False

    def train(self, X_train: pd.DataFrame, y_train: pd.Series, X_val: pd.DataFrame, y_val: pd.Series):
        """Fits the model using early stopping to prevent overfitting."""
        
        # Automatically handle class imbalance
        imbalance_ratio = (y_train == 0).sum() / (y_train == 1).sum()
        self.model.set_params(scale_pos_weight=imbalance_ratio)
        
        self.model.fit(
            X_train, y_train,
            eval_set=[(X_val, y_val)],
            verbose=False
        )
        self.is_trained = True

    def evaluate(self, X_test: pd.DataFrame, y_test: pd.Series):
        """Generates performance metrics for the trained model."""
        if not self.is_trained:
            raise RuntimeError("Model must be trained before evaluation.")
            
        y_pred = self.model.predict(X_test)
        y_prob = self.model.predict_proba(X_test)[:, 1]
        
        print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.4f}")
        print("-" * 30)
        print(classification_report(y_test, y_pred))

    def save(self, output_path: str):
        """Exports the binary model file."""
        if not self.is_trained:
            raise RuntimeError("Cannot save an untrained model.")
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        self.model.save_model(output_path)


class PipelineOrchestrator:
    """The central controller that ties data processing and modeling together."""
    
    def __init__(self, data_path: str, model_output_path: str, target_column: str = "Churn"):
        self.data_path = data_path
        self.model_output_path = model_output_path
        
        # Inject dependencies
        self.preprocessor = DataPreprocessor(target_column=target_column)
        self.classifier = ChurnModel()

    def run(self):
        """Executes the end-to-end machine learning lifecycle."""
        try:
            # 1. Prepare Data
            df = self.preprocessor.load_and_clean(self.data_path)
            X_train, X_test, y_train, y_test = self.preprocessor.split_data(df)
            
            # 2. Train Model
            self.classifier.train(X_train, y_train, X_val=X_test, y_val=y_test)
            
            # 3. Evaluate Results
            self.classifier.evaluate(X_test, y_test)
            
            # 4. Save Artifact
            self.classifier.save(self.model_output_path)
            
        except Exception as e:
            print(f"Pipeline failed: {str(e)}")


if __name__ == "__main__":
    # Define exact paths relative to the script's directory and execute
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DATA_FILE = os.path.join(BASE_DIR, "data", "cleaned_customer_churn.csv")
    MODEL_DESTINATION = os.path.join(os.path.dirname(BASE_DIR), "models", "xgboost_churn_model.json")
    
    pipeline = PipelineOrchestrator(
        data_path=DATA_FILE, 
        model_output_path=MODEL_DESTINATION
    )
    pipeline.run()