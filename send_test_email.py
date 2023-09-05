import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')
django.setup()

from django.core.mail import send_mail

subject = 'Hello from Django'
message = 'This is a test email sent from Django using django-sendgrid-v5.'
from_email = 'manzarimakesmusic@gmail.com'
recipient_list = ['claudiowudang@gmail.com']

try:
    send_mail(subject, message, from_email, recipient_list)
    print('Test email sent successfully!')
except Exception as e:
    print(f'Failed to send email. Error: {e}')
