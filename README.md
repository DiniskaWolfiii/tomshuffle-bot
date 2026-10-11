# Tomshuffle Discord Bot 🤖

Ein Discord-Bot für die Tomshuffle-Community, entwickelt mit [py-cord](https://pycord.dev/).

## ✨ Features

- **Karma-System**: Erfassen und Belohnen von Nutzer-Aktivität mit automatischer Rollenvergabe (aiosqlite).
- **Temporäre Sprachkanäle (Temp-Voice)**: Erstellen und Verwalten von dynamischen Sprachkanälen inklusive Admin- & Member-Interface.
- **Fun-Befehle**: Unterhaltsame Slash-Commands.
- **Status-Server & Monitoring**: Integrierter Flask-Endpunkt (`/tomshuffle-bot-ping`) für Uptime-Überwachung.
- **Docker-Ready**: Vollständig containerisiert und als One-File-Lösung über Docker Compose ausführbar.

---

## 🚀 Schnellstart: One-File-Lösung (Docker Compose)

Du kannst diesen Bot auf jedem Server (VPS, Raspberry Pi, Portainer, Dockge, etc.) betreiben, **ohne** das Repository klonen oder Python installieren zu müssen.

### 1. `docker-compose.yml` erstellen

Erstelle einen neuen Ordner und lege darin eine `docker-compose.yml` an:

```bash
mkdir tomshuffle-bot && cd tomshuffle-bot
```

Speichere folgenden Inhalt als `docker-compose.yml`:

```yaml
services:
  tomshuffle-bot:
    container_name: tomshuffle-bot
    image: ghcr.io/diniskawolfiii/tomshuffle-bot:latest
    restart: unless-stopped

    environment:
      - ENVIRONMENT=PROD
      - PROD_TOKEN=DEIN_DISCORD_BOT_TOKEN_HIER
      - STATUS_UPDATE_PORT=5000

    volumes:
      - ./db:/db
      - ./temp-voice-ids:/app/temp-voice/temp-voice-ids

    ports:
      - "5000:5000"
```

*(Ersetze `DEIN_DISCORD_BOT_TOKEN_HIER` mit deinem tatsächlichen Bot-Token aus dem Discord Developer Portal).*

### 2. Bot starten

```bash
docker compose up -d
```

Der Bot lädt automatisch das aktuelle Image von der GitHub Container Registry herunter, erstellt die Datenordner (`./db` und `./temp-voice-ids`) und startet den Container im Hintergrund.

---

## 🛠️ Ausführung aus dem Quellcode (Lokaler Build)

Wenn du das Repository geklont hast und den Bot aus dem Quellcode laufen lassen oder anpassen möchtest:

### 1. Repository klonen & vorbereiten
```bash
git clone https://github.com/DiniskaWolfiii/tomshuffle-bot.git
cd tomshuffle-bot
```

### 2. Konfigurationsdatei anlegen
Kopiere die Vorlage `.env.example` nach `.env`:
```bash
cp .env.example .env
```
Füge deinen Discord-Bot-Token in die `.env` ein:
```dotenv
ENVIRONMENT=PROD
PROD_TOKEN=dein_discord_bot_token_hier
STATUS_UPDATE_PORT=5000
```

### 3. Container bauen und starten
In [docker-compose.yml](file:///e:/tomshuffle-bot/docker-compose.yml) kannst du den lokalen Build aktivieren (die Zeilen `build: context: .` einkommentieren) oder direkt mit folgendem Befehl bauen:

```bash
docker compose up -d --build
```

---

## ⚙️ Umgebungsvariablen (Konfiguration)

| Variable | Beschreibung | Standardwert / Erforderlich |
| :--- | :--- | :--- |
| `ENVIRONMENT` | Modus des Bots (`PROD` oder `DEV`) | `PROD` |
| `PROD_TOKEN` | Discord Bot Token, wenn `ENVIRONMENT=PROD` | **Erforderlich** für Produktion |
| `DEV_TOKEN` | Discord Bot Token, wenn `ENVIRONMENT=DEV` | Erforderlich für Entwicklungsmodus |
| `STATUS_UPDATE_PORT` | Port für den Flask-Status-/Ping-Server | `5000` |

---

## 💾 Persistente Daten (Volumes)

Der Bot speichert Zustandsdaten lokal über gemountete Verzeichnisse:

- `./db:/db`
  - Enthält die SQLite-Datenbanken `karma.db` (Nutzer-Karma) und `rewards.db` (Rollen-Belohnungen).
- `./temp-voice-ids:/app/temp-voice/temp-voice-ids`
  - Speichert temporäre Sprachkanal-Zuordnungen, damit diese auch nach einem Container-Neustart verwaltet werden können.

> **Tipp für Backups**: Sichere einfach den Ordner `./db`, um alle Karma- und Rollenstände zu sichern.

---

## 📋 Nützliche Docker-Befehle

- **Logs in Echtzeit ansehen:**
  ```bash
  docker compose logs -f
  ```
- **Bot neu starten:**
  ```bash
  docker compose restart
  ```
- **Bot stoppen:**
  ```bash
  docker compose down
  ```
- **Auf das neueste Image aktualisieren:**
  ```bash
  docker compose pull
  docker compose up -d
  ```

---

## 🔄 CI/CD Automation

Dieses Repository verfügt über eine GitHub Action ([docker-publish.yml](file:///e:/tomshuffle-bot/.github/workflows/docker-publish.yml)). Bei jedem Push in den `main`-Branch wird automatisch ein neues Docker-Image gebaut und auf GitHub Packages (GHCR) veröffentlicht:
`ghcr.io/diniskawolfiii/tomshuffle-bot:latest`
