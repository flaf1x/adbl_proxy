const translations = {
  ru: {
    appTitle: "ABDL Proxy Manager",
    statusEnabled: "Включен",
    statusDisabled: "Отключен",
    yourIpAddress: "Ваш IP адрес",
    loading: "Загрузка...",
    failedToGetIp: "Не удалось получить IP",
    copyIp: "Копировать IP",
    ipCopied: "IP скопирован!",
    locationUnknown: "Местоположение неизвестно",
    locationUnavailable: "Местоположение недоступно",
    failedToDetermine: "Не удалось определить",
    quickAdd: "Быстрое добавление",
    addToWhitelist: "Добавить в вайтлист",
    tabHome: "Главная",
    tabWhitelist: "Вайтлист",
    tabConfigs: "Конфиги прокси",
    tabSettings: "Настройки",
    activeConfig: "Активный конфиг",
    noConfigs: "Нет конфигураций",
    clickPlusToAdd: "Создайте конфиг во вкладке \"Конфиги прокси\" нажав на \"+\"",
    selectConfig: "Выберите конфигурацию",
    sitesWithoutProxy: "Сайты без прокси",
    addManually: "Добавить вручную",
    listEmpty: "Список пуст",
    configManagement: "Управление конфигурациями",
    addConfig: "Добавить конфиг",
    extensionSettings: "Настройки расширения",
    themeTitle: "Тема оформления",
    themeDescription: "Выберите цветовую схему интерфейса",
    themeSystem: "Системная",
    themeLight: "Светлая",
    themeDark: "Тёмная",
    languageTitle: "Язык интерфейса",
    languageDescription: "Выберите язык расширения",
    languageSystem: "Системный",
    languageRussian: "Русский",
    languageEnglish: "English",
    hideIpTitle: "Скрывать IP адрес",
    hideIpDescription: "Включить скрытие IP и местоположения под спойлером",
    bypassLocalTitle: "Обходить локальную сеть",
    bypassLocalDescription: "Не использовать прокси для локальных адресов",
    newConfig: "Новый конфиг",
    editConfig: "Редактировать конфиг",
    configName: "Название",
    configHost: "Хост",
    configPort: "Порт",
    configScheme: "Протокол",
    configNamePlaceholder: "Мой прокси",
    cancel: "Отмена",
    save: "Сохранить",
    addToWhitelistTitle: "Добавить в вайтлист",
    domainOrPattern: "Домен или паттерн",
    domainPlaceholder: "example.com",
    domainHint: "Примеры: example.com, *.example.com, 192.168.1.1",
    add: "Добавить",
    enterDomain: "Введите домен",
    invalidDomainChars: "Домен может содержать только латинские буквы, цифры, точки и дефисы",
    domainInvalidChars: "Домен содержит недопустимые символы",
    deleteConfigTitle: "Удалить конфигурацию?",
    deleteConfigMessage: "Вы уверены, что хотите удалить конфигурацию",
    cannotUndo: "Это действие нельзя отменить.",
    delete: "Удалить",
    edit: "Редактировать",
    close: "Закрыть",
    http: "HTTP",
    https: "HTTPS",
    socks4: "SOCKS4",
    socks5: "SOCKS5",
    credits: "Благодарности",
    creditsText: "Создано с <3 для удобного управления прокси🍼",
    githubRepo: "GitHub расширения",
    creatorSite: "Сайт флафикса :3",
    secondSite: "бебебе"
  },
  en: {
    appTitle: "ABDL Proxy Manager",
    statusEnabled: "Enabled",
    statusDisabled: "Disabled",
    yourIpAddress: "Your IP Address",
    loading: "Loading...",
    failedToGetIp: "Failed to get IP",
    copyIp: "Copy IP",
    ipCopied: "IP copied!",
    locationUnknown: "Location unknown",
    locationUnavailable: "Location unavailable",
    failedToDetermine: "Failed to determine",
    quickAdd: "Quick Add",
    addToWhitelist: "Add to Whitelist",
    tabHome: "Home",
    tabWhitelist: "Whitelist",
    tabConfigs: "Proxy Configs",
    tabSettings: "Settings",
    activeConfig: "Active Config",
    noConfigs: "No Configurations",
    clickPlusToAdd: "Create a config in \"Proxy Configs\" tab by clicking \"+\"",
    selectConfig: "Select Configuration",
    sitesWithoutProxy: "Sites Without Proxy",
    addManually: "Add Manually",
    listEmpty: "List is Empty",
    configManagement: "Configuration Management",
    addConfig: "Add Config",
    extensionSettings: "Extension Settings",
    themeTitle: "Theme",
    themeDescription: "Select interface color scheme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    languageTitle: "Interface Language",
    languageDescription: "Select extension language",
    languageSystem: "System",
    languageRussian: "Русский",
    languageEnglish: "English",
    hideIpTitle: "Hide IP Address",
    hideIpDescription: "Enable IP and location hiding under spoiler",
    bypassLocalTitle: "Bypass Local Network",
    bypassLocalDescription: "Don't use proxy for local addresses",
    newConfig: "New Config",
    editConfig: "Edit Config",
    configName: "Name",
    configHost: "Host",
    configPort: "Port",
    configScheme: "Protocol",
    configNamePlaceholder: "My Proxy",
    cancel: "Cancel",
    save: "Save",
    addToWhitelistTitle: "Add to Whitelist",
    domainOrPattern: "Domain or Pattern",
    domainPlaceholder: "example.com",
    domainHint: "Examples: example.com, *.example.com, 192.168.1.1",
    add: "Add",
    enterDomain: "Enter domain",
    invalidDomainChars: "Domain can only contain Latin letters, numbers, dots and hyphens",
    domainInvalidChars: "Domain contains invalid characters",
    deleteConfigTitle: "Delete Configuration?",
    deleteConfigMessage: "Are you sure you want to delete configuration",
    cannotUndo: "This action cannot be undone.",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    http: "HTTP",
    https: "HTTPS",
    socks4: "SOCKS4",
    socks5: "SOCKS5",
    credits: "Credits",
    creditsText: "Created with <3 for convenient proxy management🍼",
    githubRepo: "GitHub extension",
    creatorSite: "Flaf1x Website :3",
    secondSite: "bebebe"
  }
};
function getCurrentLanguage() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['language'], (result) => {
      const language = result.language || 'system';
      if (language === 'system') {
        const systemLang = navigator.language || navigator.userLanguage;
        const langCode = systemLang.split('-')[0]; // 'ru-RU' -> 'ru'
        resolve(translations[langCode] ? langCode : 'en');
      } else {
        resolve(language);
      }
    });
  });
}
function t(key) {
  const lang = document.documentElement.lang || 'ru';
  return translations[lang]?.[key] || translations['en']?.[key] || key;
}
async function setLanguage(lang) {
  let targetLang = lang;
  if (lang === 'system') {
    const systemLang = navigator.language || navigator.userLanguage;
    const langCode = systemLang.split('-')[0];
    targetLang = translations[langCode] ? langCode : 'en';
  }
  document.documentElement.lang = targetLang;
  await updateAllTranslations();
}
async function updateAllTranslations() {
  const lang = document.documentElement.lang;
  const trans = translations[lang];
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (trans[key]) {
      element.textContent = trans[key];
    }
  });
  
  const title = document.querySelector('.title');
  if (title) title.textContent = trans.appTitle;
  const statusText = document.getElementById('statusText');
  if (statusText) {
    const isEnabled = statusText.textContent.includes('Enabled') || statusText.textContent.includes('Включен');
    statusText.textContent = isEnabled ? trans.statusEnabled : trans.statusDisabled;
  }
  const ipLabel = document.querySelector('.ip-label span:last-child');
  if (ipLabel) ipLabel.textContent = trans.yourIpAddress;
  const copyIpBtn = document.getElementById('copyIpBtn');
  if (copyIpBtn) copyIpBtn.title = trans.copyIp;
  const quickAddHeader = document.querySelector('.quick-add-header span:last-child');
  if (quickAddHeader) quickAddHeader.textContent = trans.quickAdd;
  const addToWhitelistBtn = document.querySelector('#addToWhitelistBtn span:last-child');
  if (addToWhitelistBtn) addToWhitelistBtn.textContent = trans.addToWhitelist;
  const navTabs = document.querySelectorAll('.nav-tab');
  if (navTabs[0]) navTabs[0].querySelector('span:last-child').textContent = trans.tabHome;
  if (navTabs[1]) navTabs[1].querySelector('span:last-child').textContent = trans.tabWhitelist;
  if (navTabs[2]) navTabs[2].querySelector('span:last-child').textContent = trans.tabConfigs;
  if (navTabs[3]) navTabs[3].querySelector('span:last-child').textContent = trans.tabSettings;
  const proxyTitle = document.querySelector('#proxy-panel .panel-title');
  if (proxyTitle) proxyTitle.textContent = trans.activeConfig;
  const whitelistTitle = document.querySelector('#whitelist-panel .panel-title');
  if (whitelistTitle) whitelistTitle.textContent = trans.sitesWithoutProxy;
  const configsTitle = document.querySelector('#configs-panel .panel-title');
  if (configsTitle) configsTitle.textContent = trans.configManagement;
  const settingsTitle = document.querySelector('#settings-panel .panel-title');
  if (settingsTitle) settingsTitle.textContent = trans.extensionSettings;
  
  const configNameLabel = document.querySelector('label[for="configName"]');
  if (configNameLabel) configNameLabel.textContent = trans.configName;
  const configHostLabel = document.querySelector('label[for="configHost"]');
  if (configHostLabel) configHostLabel.textContent = trans.configHost;
  const configPortLabel = document.querySelector('label[for="configPort"]');
  if (configPortLabel) configPortLabel.textContent = trans.configPort;
  const configSchemeLabel = document.querySelector('label[for="configScheme"]');
  if (configSchemeLabel) configSchemeLabel.textContent = trans.configScheme;
  const configNameInput = document.getElementById('configName');
  if (configNameInput) configNameInput.placeholder = trans.configNamePlaceholder;
  const whitelistDomainInput = document.getElementById('whitelistDomain');
  if (whitelistDomainInput) whitelistDomainInput.placeholder = trans.domainPlaceholder;
  const cancelBtns = document.querySelectorAll('.btn-secondary');
  cancelBtns.forEach(btn => {
    if (btn.textContent.includes('Отмена') || btn.textContent.includes('Cancel')) {
      btn.textContent = trans.cancel;
    }
  });
  const saveBtn = document.getElementById('saveConfig');
  if (saveBtn) saveBtn.textContent = trans.save;
  const saveWhitelistBtn = document.getElementById('saveWhitelist');
  if (saveWhitelistBtn) saveWhitelistBtn.textContent = trans.add;
  const confirmDeleteBtn = document.getElementById('confirmDelete');
  if (confirmDeleteBtn) confirmDeleteBtn.textContent = trans.delete;
  const whitelistModalTitle = document.querySelector('#whitelistModal h2');
  if (whitelistModalTitle) whitelistModalTitle.textContent = trans.addToWhitelistTitle;
  const deleteModalTitle = document.querySelector('#deleteConfirmModal h2');
  if (deleteModalTitle) deleteModalTitle.textContent = trans.deleteConfigTitle;
  const domainLabel = document.querySelector('label[for="whitelistDomain"]');
  if (domainLabel) domainLabel.textContent = trans.domainOrPattern;
  const domainHint = document.querySelector('.hint');
  if (domainHint) domainHint.textContent = trans.domainHint;
  const addWhitelistManual = document.getElementById('addWhitelistManual');
  if (addWhitelistManual) addWhitelistManual.title = trans.addManually;
  const addConfigBtn = document.getElementById('addConfigBtn');
  if (addConfigBtn) addConfigBtn.title = trans.addConfig;
  
  if (window.updateUI) {
    await window.updateUI();
  }
}
