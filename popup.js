let currentEditingConfigId = null;
let currentDeletingConfigId = null;
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await loadSettings();
  await applyLanguage();
  await applyTheme();
  await updateUI();
  await loadCurrentTab();
  await fetchRealIP();
});
function setupEventListeners() {
  const proxyToggle = document.getElementById('proxyToggle');
  if (proxyToggle) {
    proxyToggle.addEventListener('change', toggleProxy);
  }
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
  const addToWhitelistBtn = document.getElementById('addToWhitelistBtn');
  if (addToWhitelistBtn) {
    addToWhitelistBtn.addEventListener('click', addCurrentSiteToWhitelist);
  }
  const addConfigBtn = document.getElementById('addConfigBtn');
  if (addConfigBtn) {
    addConfigBtn.addEventListener('click', () => openConfigModal());
  }
  const closeModal = document.getElementById('closeModal');
  if (closeModal) {
    closeModal.addEventListener('click', closeConfigModal);
  }
  const cancelModal = document.getElementById('cancelModal');
  if (cancelModal) {
    cancelModal.addEventListener('click', closeConfigModal);
  }
  const saveConfig = document.getElementById('saveConfig');
  if (saveConfig) {
    saveConfig.addEventListener('click', saveConfigFromModal);
  }
  const addWhitelistManual = document.getElementById('addWhitelistManual');
  if (addWhitelistManual) {
    addWhitelistManual.addEventListener('click', openWhitelistModal);
  }
  const closeWhitelistModalBtn = document.getElementById('closeWhitelistModal');
  if (closeWhitelistModalBtn) {
    closeWhitelistModalBtn.addEventListener('click', closeWhitelistModal);
  }
  const cancelWhitelistModalBtn = document.getElementById('cancelWhitelistModal');
  if (cancelWhitelistModalBtn) {
    cancelWhitelistModalBtn.addEventListener('click', closeWhitelistModal);
  }
  const saveWhitelist = document.getElementById('saveWhitelist');
  if (saveWhitelist) {
    saveWhitelist.addEventListener('click', saveWhitelistFromModal);
  }
  const closeDeleteModal = document.getElementById('closeDeleteModal');
  if (closeDeleteModal) {
    closeDeleteModal.addEventListener('click', closeDeleteConfirmModal);
  }
  const cancelDelete = document.getElementById('cancelDelete');
  if (cancelDelete) {
    cancelDelete.addEventListener('click', closeDeleteConfirmModal);
  }
  const confirmDelete = document.getElementById('confirmDelete');
  if (confirmDelete) {
    confirmDelete.addEventListener('click', confirmDeleteConfig);
  }
  const hideIpToggle = document.getElementById('hideIpToggle');
  if (hideIpToggle) {
    hideIpToggle.addEventListener('change', async (e) => {
      const hideIp = e.target.checked;
      await storageSet({ hideIp: hideIp });
      await applyIpVisibility();
    });
  }
  
  const themeOptions = document.querySelectorAll('input[name="theme"]');
  themeOptions.forEach(radio => {
    radio.addEventListener('change', async (e) => {
      const theme = e.target.value;
      await storageSet({ theme: theme });
      await applyTheme();
    });
  });
  const languageOptions = document.querySelectorAll('input[name="language"]');
  languageOptions.forEach(radio => {
    radio.addEventListener('change', async (e) => {
      const language = e.target.value;
      await storageSet({ language: language });
      await applyLanguage();
    });
  });
  const copyIpBtn = document.getElementById('copyIpBtn');
  if (copyIpBtn) {
    copyIpBtn.addEventListener('click', async () => {
      const ipElement = document.getElementById('ipAddress');
      const ipText = ipElement.textContent.trim();
      const loadingText = t('loading');
      const failedText = t('failedToGetIp');
      if (ipText && ipText !== loadingText && ipText !== failedText) {
        try {
          await navigator.clipboard.writeText(ipText);
          const icon = copyIpBtn.querySelector('.material-symbols-outlined');
          const originalIcon = icon.textContent;
          icon.textContent = 'check';
          copyIpBtn.style.color = 'var(--md-sys-color-success)';
          setTimeout(() => {
            icon.textContent = originalIcon;
            copyIpBtn.style.color = '';
          }, 1500);
        } catch (err) {
        }
      }
    });
  }
  const ipAddress = document.getElementById('ipAddress');
  if (ipAddress) {
    ipAddress.addEventListener('click', async () => {
      const ipElement = document.getElementById('ipAddress');
      const locationElement = document.getElementById('ipLocation');
      if (ipElement.classList.contains('blurred')) {
        ipElement.classList.remove('blurred');
        locationElement.classList.remove('blurred');
      } else {
        const data = await loadSettings();
        if (data.hideIp) {
          ipElement.classList.add('blurred');
          locationElement.classList.add('blurred');
        }
      }
    });
  }
  const ipLocation = document.getElementById('ipLocation');
  if (ipLocation) {
    ipLocation.addEventListener('click', async () => {
      const ipElement = document.getElementById('ipAddress');
      const locationElement = document.getElementById('ipLocation');
      if (locationElement.classList.contains('blurred')) {
        ipElement.classList.remove('blurred');
        locationElement.classList.remove('blurred');
      } else {
        const data = await loadSettings();
        if (data.hideIp) {
          ipElement.classList.add('blurred');
          locationElement.classList.add('blurred');
        }
      }
    });
  }
}
function storageGet(keys) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (result) => {
      resolve(result);
    });
  });
}
function storageSet(data) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(data, () => {
      resolve();
    });
  });
}
async function loadSettings() {
  const data = await storageGet(['proxyEnabled', 'configs', 'currentConfig', 'whitelist', 'hideIp', 'theme', 'language']);
  if (data.hideIp === undefined) {
    data.hideIp = false;
    await storageSet({ hideIp: false });
  }
  if (data.theme === undefined) {
    data.theme = 'system';
    await storageSet({ theme: 'system' });
  }
  if (data.language === undefined) {
    data.language = 'system';
    await storageSet({ language: 'system' });
  }
  return data;
}
async function updateUI() {
  const data = await loadSettings();
  const proxyToggle = document.getElementById('proxyToggle');
  if (proxyToggle) {
    proxyToggle.checked = data.proxyEnabled || false;
  }
  const hideIpToggle = document.getElementById('hideIpToggle');
  if (hideIpToggle) {
    hideIpToggle.checked = data.hideIp || false;
  }
  
  const theme = data.theme || 'system';
  const themeRadio = document.querySelector(`input[name="theme"][value="${theme}"]`);
  if (themeRadio) {
    themeRadio.checked = true;
  }
  const language = data.language || 'system';
  const languageRadio = document.querySelector(`input[name="language"][value="${language}"]`);
  if (languageRadio) {
    languageRadio.checked = true;
  }
  const statusBadge = document.getElementById('statusBadge');
  const statusText = document.getElementById('statusText');
  if (statusBadge && statusText) {
    if (data.proxyEnabled) {
      statusBadge.classList.add('active');
      statusText.textContent = t('statusEnabled');
    } else {
      statusBadge.classList.remove('active');
      statusText.textContent = t('statusDisabled');
    }
  }
  updateConfigsList(data.configs || [], data.currentConfig);
  updateProxyConfigs(data.configs || [], data.currentConfig);
  updateWhitelist(data.whitelist || []);
}
async function toggleProxy(event) {
  const enabled = event.target.checked;
  await storageSet({ proxyEnabled: enabled });
  chrome.runtime.sendMessage({ action: 'applyProxy' }, (response) => {
    if (response && response.success) {
    }
  });
  await updateUI();
  await fetchRealIP();
}
function switchTab(tabName) {
  document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active', 'animating');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  const activePanel = document.getElementById(`${tabName}-panel`);
  activePanel.classList.add('active');
  setTimeout(() => {
    activePanel.classList.add('animating');
  }, 10);
}
async function loadCurrentTab() {
  chrome.runtime.sendMessage({ action: 'getCurrentTab' }, (response) => {
    if (response && response.hostname) {
      document.getElementById('currentSite').textContent = response.hostname;
      document.getElementById('quickAddCard').style.display = 'block';
    } else {
      document.getElementById('quickAddCard').style.display = 'none';
    }
  });
}
async function addCurrentSiteToWhitelist() {
  const siteElement = document.getElementById('currentSite');
  const site = siteElement.textContent;
  if (!site) return;
  if (!/^[a-zA-Z0-9.-]+$/.test(site)) {
    showNotification(t('domainInvalidChars'), 'error');
    return;
  }
  const data = await loadSettings();
  const whitelist = data.whitelist || [];
  if (!whitelist.includes(site)) {
    whitelist.push(site);
    await storageSet({ whitelist });
    await updateUI();
    showNotification('Сайт добавлен в вайтлист', 'success');
  } else {
    showNotification('Сайт уже в вайтлисте', 'info');
  }
}
function updateWhitelist(whitelist) {
  const list = document.getElementById('whitelistList');
  if (whitelist.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined">inbox</span>
        <p>${t('listEmpty')}</p>
      </div>
    `;
    return;
  }
  list.innerHTML = whitelist.map(domain => `
    <div class="whitelist-item">
      <span class="whitelist-domain">${domain}</span>
      <button class="btn-icon small danger btn-remove-whitelist" data-domain="${domain}">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  `).join('');
  list.querySelectorAll('.btn-remove-whitelist').forEach(btn => {
    btn.addEventListener('click', async () => {
      const domain = btn.dataset.domain;
      const data = await loadSettings();
      const whitelist = data.whitelist || [];
      const index = whitelist.indexOf(domain);
      if (index > -1) {
        whitelist.splice(index, 1);
        await storageSet({ whitelist });
        await updateUI();
      }
    });
  });
}
function updateConfigsList(configs, currentConfigId) {
  const list = document.getElementById('configsList');
  if (!configs || configs.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined">dns</span>
        <p>${t('noConfigs')}</p>
        <small style="margin-top: 8px;">${t('clickPlusToAdd')}</small>
      </div>
    `;
    return;
  }
  list.innerHTML = configs.map(config => `
    <div class="config-item" data-config-id="${config.id}">
      <div class="config-header">
        <span class="config-name">${config.name}</span>
        <div class="config-actions">
          <button class="btn-icon small btn-edit-config" data-config-id="${config.id}" title="Редактировать">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="btn-icon small danger btn-delete-config" data-config-id="${config.id}" title="Удалить">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      <div class="config-details">
        ${config.scheme}://${config.host}:${config.port}
      </div>
    </div>
  `).join('');
  list.querySelectorAll('.btn-edit-config').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const configId = btn.dataset.configId;
      openConfigModal(configId);
    });
  });
  list.querySelectorAll('.btn-delete-config').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const configId = btn.dataset.configId;
      const data = await loadSettings();
      const config = data.configs.find(c => c.id === configId);
      if (config) {
        openDeleteConfirmModal(configId, config.name);
      }
    });
  });
}
function updateProxyConfigs(configs, currentConfigId) {
  const container = document.getElementById('proxyConfigs');
  if (!configs || configs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined">dns</span>
        <p>${t('noConfigs')}</p>
        <small style="margin-top: 8px;">${t('clickPlusToAdd')}</small>
      </div>
    `;
    return;
  }
  container.innerHTML = configs.map(config => {
    const isSelected = config.id === currentConfigId;
    return `
      <div class="proxy-config-card ${isSelected ? 'selected' : ''}" data-config-id="${config.id}">
        <div class="proxy-config-header">
          <div class="proxy-config-info">
            <div class="proxy-config-name">
              <span class="material-symbols-outlined">dns</span>
              <span>${config.name}</span>
            </div>
            <div class="proxy-config-details">
              <span>${config.host}:${config.port}</span>
              <span class="proxy-config-badge">${config.scheme.toUpperCase()}</span>
            </div>
          </div>
          <div class="proxy-config-radio"></div>
        </div>
      </div>
    `;
  }).join('');
  container.querySelectorAll('.proxy-config-card').forEach(card => {
    card.addEventListener('click', () => {
      const configId = card.dataset.configId;
      selectConfig(configId);
    });
  });
}
window.selectConfig = async function(configId) {
  const data = await loadSettings();
  const previousConfig = data.currentConfig;
  await storageSet({ currentConfig: configId });
  await updateUI();
  if (previousConfig !== configId || !data.proxyEnabled) {
    if (!data.proxyEnabled) {
      await storageSet({ proxyEnabled: true });
      const proxyToggle = document.getElementById('proxyToggle');
      if (proxyToggle) {
        proxyToggle.checked = true;
      }
      await updateUI();
    }
    chrome.runtime.sendMessage({ action: 'applyProxy' }, (response) => {
      if (response && response.success) {
      }
    });
    await fetchRealIP();
  }
};
function openConfigModal(configId = null) {
  currentEditingConfigId = configId;
  const modal = document.getElementById('configModal');
  if (configId) {
    loadSettings().then(data => {
      const config = data.configs.find(c => c.id === configId);
      if (config) {
        document.getElementById('modalTitle').textContent = t('editConfig');
        document.getElementById('configName').value = config.name;
        document.getElementById('configHost').value = config.host;
        document.getElementById('configPort').value = config.port;
        document.getElementById('configScheme').value = config.scheme || 'http';
      }
    });
  } else {
    document.getElementById('modalTitle').textContent = t('newConfig');
    document.getElementById('configName').value = '';
    document.getElementById('configHost').value = '';
    document.getElementById('configPort').value = '8080';
    document.getElementById('configScheme').value = 'http';
  }
  modal.classList.add('show');
}
function closeConfigModal() {
  document.getElementById('configModal').classList.remove('show');
  currentEditingConfigId = null;
}
async function saveConfigFromModal() {
  const name = document.getElementById('configName').value.trim();
  const host = document.getElementById('configHost').value.trim();
  const port = document.getElementById('configPort').value.trim();
  const scheme = document.getElementById('configScheme').value;
  if (!name || !host || !port) {
    showNotification('Заполните все поля', 'error');
    return;
  }
  const data = await loadSettings();
  const configs = data.configs || [];
  let newCurrentConfig = data.currentConfig;
  if (currentEditingConfigId) {
    const index = configs.findIndex(c => c.id === currentEditingConfigId);
    if (index > -1) {
      configs[index] = { 
        id: currentEditingConfigId, 
        name, 
        host, 
        port: parseInt(port), 
        scheme 
      };
    }
  } else {
    const newConfig = {
      id: 'config_' + Date.now(),
      name,
      host,
      port: parseInt(port),
      scheme
    };
    configs.push(newConfig);
    if (configs.length === 1 || !newCurrentConfig) {
      newCurrentConfig = newConfig.id;
    }
  }
  await storageSet({ configs, currentConfig: newCurrentConfig });
  if (data.proxyEnabled) {
    chrome.runtime.sendMessage({ action: 'applyProxy' });
  }
  closeConfigModal();
  await updateUI();
  showNotification('Конфиг сохранен', 'success');
}
function openWhitelistModal() {
  document.getElementById('whitelistDomain').value = '';
  document.getElementById('whitelistModal').classList.add('show');
}
function closeWhitelistModal() {
  document.getElementById('whitelistModal').classList.remove('show');
}
async function saveWhitelistFromModal() {
  const domain = document.getElementById('whitelistDomain').value.trim();
  if (!domain) {
    showNotification(t('enterDomain'), 'error');
    return;
  }
  if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
    showNotification(t('invalidDomainChars'), 'error');
    return;
  }
  const data = await loadSettings();
  const whitelist = data.whitelist || [];
  if (!whitelist.includes(domain)) {
    whitelist.push(domain);
    await storageSet({ whitelist });
    closeWhitelistModal();
    await updateUI();
    showNotification('Домен добавлен в вайтлист', 'success');
  } else {
    showNotification('Домен уже в вайтлисте', 'info');
  }
}
function openDeleteConfirmModal(configId, configName) {
  currentDeletingConfigId = configId;
  document.getElementById('deleteConfigName').textContent = configName;
  document.getElementById('deleteConfirmModal').classList.add('show');
}
function closeDeleteConfirmModal() {
  currentDeletingConfigId = null;
  document.getElementById('deleteConfirmModal').classList.remove('show');
}
async function confirmDeleteConfig() {
  if (!currentDeletingConfigId) return;
  const data = await loadSettings();
  const configs = data.configs || [];
  const index = configs.findIndex(c => c.id === currentDeletingConfigId);
  if (index > -1) {
    configs.splice(index, 1);
    let currentConfig = data.currentConfig;
    if (currentConfig === currentDeletingConfigId && configs.length > 0) {
      currentConfig = configs[0].id;
    } else if (configs.length === 0) {
      currentConfig = null;
    }
    await storageSet({ configs, currentConfig });
    closeDeleteConfirmModal();
    await updateUI();
    if (data.proxyEnabled) {
      chrome.runtime.sendMessage({ action: 'applyProxy' });
    }
  }
}
async function fetchRealIP() {
  const ipElement = document.getElementById('ipAddress');
  const locationElement = document.getElementById('ipLocation');
  if (!ipElement || !locationElement) {
    return;
  }
  const settings = await loadSettings();
  if (settings.hideIp) {
    ipElement.classList.add('blurred');
    locationElement.classList.add('blurred');
  }
  ipElement.textContent = t('loading');
  locationElement.textContent = '';
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    if (data.ip) {
      ipElement.textContent = data.ip;
      try {
        const geoResponse = await fetch(`https://ipwho.is/${data.ip}`);
        const geoData = await geoResponse.json();
        if (geoData && geoData.location) {
          const city = geoData.location.city;
          const country = geoData.location.country;
          if (city && country) {
            locationElement.textContent = `${city}, ${country}`;
          } else if (country) {
            locationElement.textContent = country;
          } else {
            locationElement.textContent = 'Местоположение неизвестно';
          }
        } else {
          try {
            const altResponse = await fetch(`https://ipwho.is/${data.ip}`);
            const altData = await altResponse.json();
            if (altData.success && altData.city && altData.country) {
              locationElement.textContent = `${altData.city}, ${altData.country}`;
            } else if (altData.country) {
              locationElement.textContent = altData.country;
            } else {
              locationElement.textContent = 'Местоположение недоступно';
            }
          } catch (altError) {
            locationElement.textContent = 'Местоположение недоступно';
          }
        }
      } catch (geoError) {
        locationElement.textContent = 'Местоположение недоступно';
      }
      await applyIpVisibility();
    }
  } catch (error) {
    ipElement.textContent = t('failedToGetIp');
    locationElement.textContent = '';
  }
}
async function applyIpVisibility() {
  const data = await loadSettings();
  const ipElement = document.getElementById('ipAddress');
  const locationElement = document.getElementById('ipLocation');
  if (!ipElement || !locationElement) {
    return;
  }
  if (data.hideIp) {
    ipElement.classList.add('blurred');
    locationElement.classList.add('blurred');
  } else {
    ipElement.classList.remove('blurred');
    locationElement.classList.remove('blurred');
  }
}
function showNotification(message, type = 'info') {
  let notification = document.getElementById('toast-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'toast-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #323232;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 10000;
      display: none;
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      font-size: 14px;
    `;
    document.body.appendChild(notification);
  }
  const colors = {
    success: '#4CAF50',
    error: '#F44336',
    info: '#2196F3'
  };
  notification.style.background = colors[type] || colors.info;
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}
async function applyTheme() {
  const data = await loadSettings();
  const theme = data.theme || 'system';
  const body = document.body;
  body.classList.remove('theme-light', 'theme-dark', 'theme-system');
  if (theme === 'light') {
    body.classList.add('theme-light');
  } else if (theme === 'dark') {
    body.classList.add('theme-dark');
  } else {
    body.classList.add('theme-system');
  }
}
async function applyLanguage() {
  const data = await loadSettings();
  const language = data.language || 'system';
  await setLanguage(language);
}
