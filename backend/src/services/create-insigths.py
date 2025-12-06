import json
from typing import Dict, Any
import pandas as pd

class AutoInsights:
    
    def __init__(self, archive: any, params: Dict[str, Any]=None):
        
        self.archive = archive
        self.params = params
        self.df = None

    def __setup_file(self):
        file = self.archive

        if isinstance(file, str):
            if file.endswith(".csv"):
                self.df = pd.read_csv(file)
            elif file.endswith('.xlsx') or file.endswith('.xls'):
                self.df = pd.read_excel(file)
            elif file.endswith('.json'):
                self.df = pd.read_json(file)
            else:
                raise ValueError(f"Formato de arquivo nao suportado: {file}")
        elif isinstance(file, pd.DataFrame):
            self.df = file
        else:
            raise ValueError("Arquivo deve ser um caminho (string) ou DataFrame")

        return self.df

    def __columns(self):
        if self.df is None:
            self.__setup_file()

        columns = {
            "rows": int(self.df.shape[0]),
            "total_columns": int(self.df.shape[1]),
            "columns": {}
        }

        for col in self.df.columns:
            col_info = {
                "data_type": str(self.df[col].dtype),
                "non_null_count": int(self.df[col].notna().sum()),
                "null_count": int(self.df[col].isna().sum()),
                "null_percentage": round((self.df[col].isna().sum() / len(self.df)) * 100, 2),
                "unique_values": int(self.df[col].nunique()),
            }
            
            if pd.api.types.is_numeric_dtype(self.df[col]):
                col_info["statistics"] = {
                    "mean": float(self.df[col].mean()) if not self.df[col].isna().all() else None,
                    "median": float(self.df[col].median()) if not self.df[col].isna().all() else None,
                    "min": float(self.df[col].min()) if not self.df[col].isna().all() else None,
                    "max": float(self.df[col].max()) if not self.df[col].isna().all() else None,
                    "std": float(self.df[col].std()) if not self.df[col].isna().all() else None,
                }
            
            unique_sample = self.df[col].value_counts().head(10)
            col_info["top_values"] = {
                str(k): int(v) for k, v in unique_sample.items()
            }
            
            columns["columns"][col] = col_info
        
        return columns

    def get_insights_json(self):
        analysis = self.__columns()
        return json.dumps(analysis, indent=2, ensure_ascii=False)

    def get_insights_dict(self):
        return self.__columns()
    
