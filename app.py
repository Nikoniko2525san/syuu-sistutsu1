from flask import Flask, render_template, request, redirect, jsonify
import sqlite3
from datetime import datetime, timedelta

app = Flask(__name__)
DB = 'data.db'
YOUTUBE_ID = 'FtutLA63Cp8'  # 例： 'dQw4w9WgXcQ'

def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('''
      CREATE TABLE IF NOT EXISTS expenses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        item TEXT,
        amount INTEGER
      )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('index.html', youtube_id=YOUTUBE_ID)

@app.route('/api/expenses', methods=['GET', 'POST', 'DELETE'])
def expenses_api():
    conn = sqlite3.connect(DB)
    c = conn.cursor()

    if request.method == 'POST':
        data = request.get_json()
        c.execute('INSERT INTO expenses(date,item,amount) VALUES (?, ?, ?)',
                  (data['date'], data['item'], data['amount']))
        conn.commit()
        conn.close()
        return jsonify(success=True)

    if request.method == 'DELETE':
        id = request.get_json()['id']
        c.execute('DELETE FROM expenses WHERE id=?', (id,))
        conn.commit()
        conn.close()
        return jsonify(success=True)

    # GET：取得＆フィルタ処理
    params = request.args
    mode = params.get('mode', 'all')
    start = params.get('start')
    end = params.get('end')
    now = datetime.now()

    if mode == 'all':
        c.execute('SELECT * FROM expenses ORDER BY date DESC')
    elif mode == '1month':
        since = now - timedelta(days=30)
        c.execute('SELECT * FROM expenses WHERE date>=? ORDER BY date DESC', (since.date().isoformat(),))
    elif mode == '1week':
        since = now - timedelta(days=7)
        c.execute('SELECT * FROM expenses WHERE date>=? ORDER BY date DESC', (since.date().isoformat(),))
    elif mode == 'custom' and start and end:
        c.execute('SELECT * FROM expenses WHERE date>=? AND date<=? ORDER BY date DESC', (start, end))
    else:
        return jsonify([])

    rows = c.fetchall()
    conn.close()
    return jsonify([{'id': r[0], 'date': r[1], 'item': r[2], 'amount': r[3]} for r in rows])

if __name__ == '__main__':
    app.run(debug=True)
