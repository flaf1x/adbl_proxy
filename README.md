# ABDL Proxy Manager

[English](#english) | [Русский](#russian)

---

<a name="english"></a>
## 🌐 English

### Description

**ABDL Proxy Manager** is a modern Chrome extension for convenient proxy server management with Material Design interface. The extension allows you to quickly switch between proxy configurations, manage whitelist of sites that bypass proxy, and customize the interface appearance.

### ✨ Features

- 🎯 **Quick Proxy Switching** - easily switch between saved configurations
- 📋 **Whitelist Management** - add sites that should work without proxy
- 🎨 **Material Design** - modern and beautiful interface
- 🌓 **Theme Support** - system, light and dark themes
- 🌍 **Multilingual** - Russian and English interface
- 📊 **IP Display** - view your current IP address and location
- ⚡ **Quick Add** - add current site to whitelist in one click

### 🚀 Installation

1. Download or clone the repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension is ready to use!

### 📖 How to Use

#### Adding a Proxy Configuration

1. Open the extension popup
2. Go to "Proxy Configs" tab
3. Click the "+" button
4. Fill in the fields:
   - **Name** - configuration name (e.g., "My Proxy")
   - **Host** - proxy server address
   - **Port** - proxy server port
   - **Protocol** - select HTTP, HTTPS, SOCKS4 or SOCKS5
5. Click "Save"

#### Managing Whitelist

**Quick Add (current site):**
1. Open the extension on the site you want to add
2. Click "Add to Whitelist" on the home tab

**Manual Add:**
1. Go to "Whitelist" tab
2. Click "Add Manually"
3. Enter the domain (e.g., `vk.ru`)
4. Click "Add"

**Note:** Only domains with Latin letters, numbers, dots and hyphens are allowed.

#### Settings

In the "Settings" tab you can:
- Choose interface theme (System/Light/Dark)
- Change language (System/Russian/English)
- Enable/disable IP address hiding under spoiler

### 🛠️ Technologies

- **Manifest V3** - latest Chrome Extensions API
- **Vanilla JavaScript** - no external dependencies
- **Material Design 3** - modern design system
- **Chrome Proxy API** - for proxy management
- **Chrome Storage API** - for saving settings

### 📝 Project Structure

```
ABDL_Proxy/
├── manifest.json          # Extension manifest
├── background.js          # Background service worker
├── popup.html             # Main interface
├── popup.js               # Interface logic
├── styles.css             # Styles
├── translations.js        # Localization
├── icons/                 # Extension icons
└── README.md              # Documentation
```

### 🤖 Development

Most of the code in this project was written with the assistance of **GitHub Copilot** (Claude Sonnet 4.5) AI assistant, which helped create a modern, functional and user-friendly extension for proxy management.

### 📄 License

This project is distributed under the MIT license.

---

<a name="russian"></a>
## 🌐 Русский

### Описание

**ABDL Proxy Manager** - это современное расширение для Chrome, предназначенное для удобного управления прокси-серверами с интерфейсом в стиле Material Design. Расширение позволяет быстро переключаться между конфигурациями прокси, управлять белым списком сайтов, которые обходят прокси, а также настраивать внешний вид интерфейса.

### ✨ Возможности

- 🎯 **Быстрое переключение прокси** - легко переключайтесь между сохраненными конфигурациями
- 📋 **Управление вайтлистом** - добавляйте сайты, которые должны работать без прокси
- 🎨 **Material Design** - современный и красивый интерфейс
- 🌓 **Поддержка тем** - системная, светлая и темная темы
- 🌍 **Мультиязычность** - русский и английский интерфейс
- 📊 **Отображение IP** - просмотр текущего IP-адреса и местоположения
- ⚡ **Быстрое добавление** - добавляйте текущий сайт в вайтлист одним кликом

### 🚀 Установка

1. Скачайте или клонируйте репозиторий
2. Откройте Chrome и перейдите на `chrome://extensions/`
3. Включите "Режим разработчика" в правом верхнем углу
4. Нажмите "Загрузить распакованное расширение" и выберите папку с расширением
5. Расширение готово к использованию!

### 📖 Как использовать

#### Добавление конфигурации прокси

1. Откройте всплывающее окно расширения
2. Перейдите на вкладку "Конфиги прокси"
3. Нажмите кнопку "+"
4. Заполните поля:
   - **Название** - имя конфигурации (например, "Мой прокси")
   - **Хост** - адрес прокси-сервера
   - **Порт** - порт прокси-сервера
   - **Протокол** - выберите HTTP, HTTPS, SOCKS4 или SOCKS5
5. Нажмите "Сохранить"

#### Управление вайтлистом

**Быстрое добавление (текущий сайт):**
1. Откройте расширение на сайте, который хотите добавить
2. Нажмите "Добавить в вайтлист" на вкладке "Главная"

**Ручное добавление:**
1. Перейдите на вкладку "Вайтлист"
2. Нажмите "Добавить вручную"
3. Введите домен (например, `vk.ru`)
4. Нажмите "Добавить"

**Примечание:** Разрешены только домены с латинскими буквами, цифрами, точками и дефисами.

#### Настройки

На вкладке "Настройки" вы можете:
- Выбрать тему интерфейса (Системная/Светлая/Тёмная)
- Изменить язык (Системный/Русский/English)
- Включить/отключить скрытие IP-адреса под спойлером

### 🛠️ Технологии

- **Manifest V3** - новейший API расширений Chrome
- **Vanilla JavaScript** - без внешних зависимостей
- **Material Design** - современная система дизайна
- **Chrome Proxy API** - для управления прокси
- **Chrome Storage API** - для сохранения настроек

### 📝 Структура проекта

```
ABDL_Proxy/
├── manifest.json          # Манифест расширения
├── background.js          # Фоновый service worker
├── popup.html             # Основной интерфейс
├── popup.js               # Логика интерфейса
├── styles.css             # Стили
├── translations.js        # Локализация
├── icons/                 # Иконки расширения
└── README.md              # Документация
```

### 🤖 Разработка

Большая часть кода в этом проекте была написана с помощью AI-ассистента **GitHub Copilot** (Claude Sonnet 4.5), который помог создать современное, функциональное и удобное расширение для управления прокси.

### 📄 Лицензия

Этот проект распространяется под лицензией MIT.
