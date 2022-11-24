from time import sleep

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/fragment/instant-load-sloth')
def fragment_instant_load_sloth():
    return render_template('fragment_sloth.html')


@app.route('/fragment/sloth')
def fragment_sloth():
    sleep(2)
    return render_template('fragment_sloth.html')


@app.route('/fragment/table')
def fragment_table():
    return render_template('fragment_table.html')


if __name__ == '__main__':
    app.run()
