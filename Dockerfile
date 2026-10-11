FROM python:3.12.8-slim-bookworm
LABEL title="tomshuffle-bot"
LABEL authors="Wolfiii"
LABEL version="1.0.0"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Verzeichnis für SQLite-Datenbanken anlegen und als Volume definieren
RUN mkdir -p /db
VOLUME ["/db"]

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Flask Ping/Status-Port (Standard 5000)
EXPOSE 5000

CMD ["python", "bot.py"]