from django.core.management.base import BaseCommand
from django.core.mail import send_mail

class Command(BaseCommand):
    help = 'Sends a test email using django-sendgrid-v5'

    def handle(self, *args, **kwargs):
        subject = 'Hello from Django'
        message = 'This is a test email sent from Django using django-sendgrid-v5.'
        from_email = 'manzarimakesmusic@gmail.com'  # Replace with your 'from' email address
        recipient_list = ['claudiowudang@gmail.com']  # Replace with the recipient's email address

        try:
            send_mail(subject, message, from_email, recipient_list)
            self.stdout.write(self.style.SUCCESS('Test email sent successfully!'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Failed to send email. Error: {e}'))
