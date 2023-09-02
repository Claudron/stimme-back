# Use a slim version of Python
FROM python:3.9-slim

# Create the app group and user to run the app
RUN addgroup app && adduser --disabled-password --gecos "" --ingroup app app

# Set environment variables to ensure Python outputs everything to terminal and doesn't create .pyc files
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set the working directory
WORKDIR /app

# Switch to the app user
USER app

# Copy requirements.txt first to leverage Docker cache
COPY --chown=app:app requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project files
COPY --chown=app:app . .

# This command runs your Django development server.
# Remember: This is for testing/development purposes only!
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


