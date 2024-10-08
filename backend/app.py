# File: app.py
import os
from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__, static_folder='build')
CORS(app)

# Configurazione del Database (utilizzeremo SQLite per semplicità)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///festival.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modello per gli Artisti
class Artista(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    genere = db.Column(db.String(50), nullable=False)
    richieste = db.relationship('Richiesta', backref='artista', lazy=True)
    eventi = db.relationship('Evento', backref='artista', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'genere': self.genere,
            'richieste': [richiesta.to_dict() for richiesta in self.richieste],
            'eventi': [evento.to_dict() for evento in self.eventi]
        }

# Modello per le Richieste degli Artisti
class Richiesta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artista_id = db.Column(db.Integer, db.ForeignKey('artista.id'), nullable=False)
    categoria = db.Column(db.String(100), nullable=False)
    descrizione = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'categoria': self.categoria,
            'descrizione': self.descrizione,
            'artista': self.artista.nome
        }

# Modello per gli Eventi
class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titolo = db.Column(db.String(100), nullable=False)
    descrizione = db.Column(db.Text, nullable=True)
    data_inizio = db.Column(db.DateTime, nullable=False)
    data_fine = db.Column(db.DateTime, nullable=False)
    artista_id = db.Column(db.Integer, db.ForeignKey('artista.id'), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'titolo': self.titolo,
            'descrizione': self.descrizione,
            'data_inizio': self.data_inizio.isoformat(),
            'data_fine': self.data_fine.isoformat(),
            'artista': self.artista.nome if self.artista else None
        }

# Endpoint per aggiungere un artista
@app.route('/api/artisti', methods=['POST'])
def aggiungi_artista():
    dati = request.get_json()
    nuovo_artista = Artista(
        nome=dati['nome'],
        genere=dati['genere']
    )
    db.session.add(nuovo_artista)
    db.session.commit()
    return jsonify(nuovo_artista.to_dict()), 201

# Endpoint per ottenere tutti gli artisti
@app.route('/api/artisti', methods=['GET'])
def ottieni_artisti():
    artisti = Artista.query.all()
    return jsonify([artista.to_dict() for artista in artisti])

# Endpoint per aggiungere una richiesta per un artista
@app.route('/api/richieste', methods=['POST'])
def aggiungi_richiesta():
    dati = request.get_json()
    nuova_richiesta = Richiesta(
        artista_id=dati['artista_id'],
        categoria=dati['categoria'],
        descrizione=dati['descrizione']
    )
    db.session.add(nuova_richiesta)
    db.session.commit()
    return jsonify(nuova_richiesta.to_dict()), 201

# Endpoint per ottenere tutte le richieste
@app.route('/api/richieste', methods=['GET'])
def ottieni_richieste():
    richieste = Richiesta.query.all()
    return jsonify([richiesta.to_dict() for richiesta in richieste])

# Endpoint per aggiungere un evento
@app.route('/api/eventi', methods=['POST'])
def aggiungi_evento():
    dati = request.get_json()
    nuovo_evento = Evento(
        titolo=dati['titolo'],
        descrizione=dati.get('descrizione', ''),
        data_inizio=datetime.fromisoformat(dati['data_inizio']),
        data_fine=datetime.fromisoformat(dati['data_fine']),
        artista_id=dati.get('artista_id')
    )
    db.session.add(nuovo_evento)
    db.session.commit()
    return jsonify(nuovo_evento.to_dict()), 201

# Endpoint per ottenere tutti gli eventi
@app.route('/api/eventi', methods=['GET'])
def ottieni_eventi():
    eventi = Evento.query.all()
    return jsonify([evento.to_dict() for evento in eventi])

# Servire il frontend React
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
