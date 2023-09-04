"""
WSGI config for main project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Add the print statement here
print(os.environ.get("GS_CREDENTIALS"))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings.dev')

application = get_wsgi_application()
