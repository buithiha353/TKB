import pandas as pd  
df = pd.read_excel('TKB.xls', header=None)  
print(df.head(40).to_markdown())  
