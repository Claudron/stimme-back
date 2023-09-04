"""
WSGI config for main project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import tempfile
import json
import os
from django.core.wsgi import get_wsgi_application

# Convert the key content into a temporary file and set GOOGLE_APPLICATION_CREDENTIALS
key_dict = json.loads(os.environ.get("GS_CREDENTIALS"))
with tempfile.NamedTemporaryFile(delete=False) as temp:
    temp.write(json.dumps(key_dict).encode('utf-8'))
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp.name

# Set default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings.dev')

# Initialize the Django application
application = get_wsgi_application()
