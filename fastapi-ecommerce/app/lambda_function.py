import boto3
from openpyxl import Workbook
from datetime import datetime
import os
from botocore.client import Config

def lambda_handler(event, context):
    # Parâmetros para o bucket e o nome do arquivo
    bucket_name = 'relatorio-tcc'
    report_filename = f"relatorio_produtos_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"

    # Gera o relatório e salva no bucket S3
    try:
        # Gera o relatório
        file_path = generate_report(report_filename)
        
        # Salva o relatório no S3
        upload_to_s3(bucket_name, file_path, report_filename)
        
        # Remove o arquivo local temporário (no ambiente Lambda, use '/tmp')
        os.remove(file_path)
        
        return {
            'statusCode': 200,
            'body': f'Relatório gerado e salvo no bucket S3: {bucket_name}/{report_filename}'
        }
    except Exception as e:
        print(f"Erro ao gerar ou salvar o relatório: {str(e)}")
        return {
            'statusCode': 500,
            'body': 'Erro ao gerar ou salvar o relatório.'
        }

def generate_report(filename):
    # Cria um arquivo Excel (XLSX)
    wb = Workbook()
    ws = wb.active
    ws.title = "Relatório de Produtos"

    # Exemplo de dados - cabeçalhos e algumas linhas
    ws.append(["ID", "Nome do Produto", "Tipo", "Preço", "Descrição", "URL da Imagem"])
    produtos = [
        (1, "Produto A", "Categoria 1", "R$100", "Descrição do produto A", "https://url.com/img1"),
        (2, "Produto B", "Categoria 2", "R$200", "Descrição do produto B", "https://url.com/img2"),
    ]

    for produto in produtos:
        ws.append(produto)

    # Salva o arquivo temporariamente em '/tmp'
    file_path = f"/tmp/{filename}"
    wb.save(file_path)
    return file_path

def upload_to_s3(bucket_name, file_path, s3_key):
    # Configura o cliente S3 para o LocalStack com credenciais e região fictícias
    s3_client = boto3.client(
        's3',
        region_name='us-east-1',  # Região padrão para LocalStack
        aws_access_key_id='',  # Credenciais fictícias para o LocalStack
        aws_secret_access_key='',
    )
    
    # Faz o upload do arquivo para o bucket S3
    s3_client.upload_file(file_path, bucket_name, s3_key)
    print(f"Arquivo {s3_key} enviado para o bucket {bucket_name} com sucesso.")

