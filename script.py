import csv
import json

with open('contratos2024.csv', mode='r', newline='', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file, delimiter=';')
    dados = list(csv_reader)

with open('new_contratos2024.json', mode='w', encoding='utf-8') as file:
    json.dump(dados, file, indent=4, ensure_ascii=False)

print("convertido com sucesso!")
