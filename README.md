# Napata

Ein Angular-Projekt für die Napata-Website mit modernem, modularem Aufbau und standalone Komponenten-Architektur.

## 🚀 Entwicklungsumgebung

Zum Starten des lokalen Entwicklungsservers:

```bash
pnpm start
```

Die Anwendung ist dann unter `http://localhost:4200/` verfügbar. Änderungen am Code werden automatisch neu geladen.

## 🏗️ Projektstruktur

Das Projekt verwendet eine modulare Architektur:

- **`src/app/components/`** – Hauptkomponenten (main, contact, about-us, program, etc.)
- **`src/app/shared/`** – Geteilte Services und Komponenten (Header, Footer, Parallax-Service)
- **`src/app/core/`** – Kern-Strategien (z.B. Template Title Strategy)
- **`src/styles/`** – Globale SCSS-Styles und Variablen

### Architektur-Highlights

- **Standalone Components**: Keine NgModules, moderne Angular-Architektur
- **Signal-basierte Services**: Reactive State Management mit Angular Signals
- **Routing**: Konfiguriert in `app.routes.ts` mit Scroll-Restoration und Anchor-Scrolling
- **Parallax-Effekte**: Service-basierte Scroll-Offset-Tracking
- **Custom Scroll-Container**: Siehe `app.component.ts` für scrollable Container-Logik

## 🛠️ Verfügbare Befehle

```bash
# Entwicklungsserver starten
pnpm start

# Projekt bauen
pnpm build

# Build mit Watch-Modus
pnpm run watch

# Unit-Tests ausführen
pnpm test
```

## 🎨 Styling-Konventionen

- SCSS-Variablen für Farben und Schriftarten in `src/styles/_variables.scss`
- Feature-basierte SCSS-Organisation
- Globale Styles in `src/styles/styles.scss`
- Semantisches HTML für Accessibility

## 📦 Komponenten erstellen

Neue Komponenten mit Angular CLI generieren:

```bash
ng generate component path/to/component
```

## 🔧 Wichtige Dateien

- `src/app/app.component.ts` – Haupt-Layout und Scroll-Logik
- `src/app/app.routes.ts` – Routing-Konfiguration
- `src/app/app.config.ts` – Router-Konfiguration
- `src/app/shared/services/parallax.ts` – Parallax-Service
- `src/styles/_variables.scss` – Globale SCSS-Variablen

## 🌐 Backend (PHP Mail)

Der PHP-Mail-Service befindet sich in `public/mail.php`. Zum Testen lokal:

```bash
cd public
php -S localhost:8000
```

## 📝 Weitere Ressourcen

- [Angular CLI Dokumentation](https://angular.dev/tools/cli)
- [Angular Signals](https://angular.dev/guide/signals)
- [Standalone Components](https://angular.dev/guide/components/importing)
