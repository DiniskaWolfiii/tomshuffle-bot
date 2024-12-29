FROM python:3.12.8-slim-bookworm
LABEL title="tomshuffle-bot"
LABEL authors="Wolfiii"
LABEL version="1.0.0"

COPY . /bot

WORKDIR /bot

RUN pip install -r requirements.txt
ENV DOCKER=true

VOLUME ["/db"]

ENTRYPOINT ["python", "bot.py"]