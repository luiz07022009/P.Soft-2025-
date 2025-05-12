from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import json
from datetime import datetime
import os

app = Flask(__name__, 
    static_url_path='',
    static_folder='static',
    template_folder='templates'
)
CORS(app)  # Permite requisições de diferentes origens

# Garante que o diretório data existe
data_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
if not os.path.exists(data_dir):
    print(f"Criando diretório: {data_dir}")
    os.makedirs(data_dir)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_data', methods=['POST'])
def save_data():
    try:
        # Recebe os dados do formulário
        data = request.get_json()
        print(f"Dados recebidos: {data}")
        
        # Adiciona timestamp ao registro
        data['timestamp'] = datetime.now().isoformat()
        
        # Define o caminho do arquivo
        file_path = os.path.join(data_dir, 'agendamentos.json')
        print(f"Caminho do arquivo: {file_path}")
        
        # Lê os dados existentes ou cria uma nova lista
        if os.path.exists(file_path):
            print("Arquivo existente encontrado, lendo dados...")
            with open(file_path, 'r', encoding='utf-8') as f:
                agendamentos = json.load(f)
        else:
            print("Arquivo não encontrado, criando nova lista...")
            agendamentos = []
        
        # Adiciona o novo agendamento
        agendamentos.append(data)
        
        # Salva os dados atualizados
        print("Salvando dados no arquivo...")
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(agendamentos, f, ensure_ascii=False, indent=4)
        
        print("Dados salvos com sucesso!")
        return jsonify({'status': 'success', 'message': 'Dados salvos com sucesso!'})
    
    except Exception as e:
        print(f"Erro ao salvar dados: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    print(f"Diretório de dados: {data_dir}")
    print(f"Diretório estático: {app.static_folder}")
    print(f"Diretório de templates: {app.template_folder}")
    app.run(debug=True) 