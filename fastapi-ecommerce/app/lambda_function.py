import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from openpyxl import Workbook
from datetime import datetime
import os

def lambda_handler(event, context):
    # Pega o e-mail do evento recebido
    try:
        email = event.get('email', None)

        if not email:
            return {
                'statusCode': 400,
                'body': json.dumps('Email não fornecido.')
            }
        
        # Gerar o relatório XLSX dos produtos anunciados (exemplo com dados fictícios)
        report_filename = generate_report()

        # Enviar o e-mail com o relatório
        send_email_with_report(email, report_filename)

        return {
            'statusCode': 200,
            'body': json.dumps(f'Relatório gerado e enviado para {email}')
        }
    except Exception as e:
        print(f'O erro e: {e.__traceback__}')
        return {
            'statusCode': 500,
            'body': json.dumps(f'Ocorreu um erro: {e}')
        }

def generate_report():
    try:
    # Crie um arquivo Excel (XLSX)
        wb = Workbook()
        ws = wb.active
        ws.title = "Relatório de Produtos Anunciados"

        # Adicionar cabeçalhos e dados fictícios
        ws.append(["ID", "Nome do Produto", "Tipo", "Preço", "Descrição", "URL da Imagem"])
        produtos = [
            (1, "Produto A", "Categoria 1", "R$100", "Descrição do produto A", "https://url.com/img1"),
            (2, "Produto B", "Categoria 2", "R$200", "Descrição do produto B", "https://url.com/img2"),
        ]

        for produto in produtos:
            ws.append(produto)

        # Salvar o arquivo com um nome baseado na data atual
        report_filename = f"/tmp/relatorio_produtos_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
        wb.save(report_filename)

        return report_filename
    except Exception as e:
        print(f'O erro e: {e.__traceback__}')

def send_email_with_report(receiver_email, report_filename):
    sender_email = "tcc_icmc_usp@outlook.com"
    password = "123t4c5c"

    # Configura o e-mail
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = "Relatório de Produtos Anunciados"

    body = "Segue em anexo o relatório dos produtos anunciados."
    msg.attach(MIMEText(body, 'plain'))

    # Anexa o arquivo
    attachment = open(report_filename, "rb")
    part = MIMEBase('application', 'octet-stream')
    part.set_payload((attachment).read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', f"attachment; filename= {os.path.basename(report_filename)}")
    msg.attach(part)

    # Envia o e-mail usando SMTP
    try:
        server = smtplib.SMTP('smtp.office365.com', 587)  # Ajuste para o servidor de e-mail correto
        server.starttls()
        server.login(sender_email, password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()
        print(f"E-mail enviado para {receiver_email}")
    except Exception as e:
        print(f"Erro ao enviar o e-mail: {str(e)}")
