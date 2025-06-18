from flask import Flask, render_template, request, redirect
import pandas as pd
import os
from datetime import datetime

app = Flask(__name__)
DATA_FILE = 'data.csv'

# 初期化（データファイルがなければ作成）
if not os.path.exists(DATA_FILE):
    df = pd.DataFrame(columns=['date', 'item', 'amount'])
    df.to_csv(DATA_FILE, index=False)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        date = request.form['date']
        item = request.form['item']
        amount = int(request.form['amount'])

        # 追加
        new_data = pd.DataFrame([[date, item, amount]], columns=['date', 'item', 'amount'])
        df = pd.read_csv(DATA_FILE)
        df = pd.concat([df, new_data])
        df.to_csv(DATA_FILE, index=False)
        return redirect('/')

    # 表示用データ読み込み
    df = pd.read_csv(DATA_FILE)
    df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
    total = df['amount'].sum()
    table_data = df.to_dict(orient='records')

    return render_template('index.html', table=table_data, total=total)

if __name__ == '__main__':
    app.run(debug=True)
