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

# Conditionally import and use dotenv if it's available
try:
    import dotenv
    dotenv_path = os.path.join(os.path.dirname(
        os.path.abspath(__file__)), '.env')
    dotenv.load_dotenv(dotenv_path)
except ImportError:
    pass

GS_CREDENTIALS_CONTENT = os.environ.get('GS_CREDENTIALS')

# Convert the key content into a temporary file and set GOOGLE_APPLICATION_CREDENTIALS only if GS_CREDENTIALS is set
if GS_CREDENTIALS_CONTENT:
    key_dict = json.loads(GS_CREDENTIALS_CONTENT)
    with tempfile.NamedTemporaryFile(delete=False) as temp:
        temp.write(json.dumps(key_dict).encode('utf-8'))
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp.name

# Set default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings.dev')

# Initialize the Django application
application = get_wsgi_application()
