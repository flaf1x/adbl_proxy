chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['configs', 'currentConfig', 'whitelist', 'proxyEnabled', 'bypassLocal'], (result) => {
    const defaults = {};
    if (!result.configs) {
      defaults.configs = [];
    }
    if (!result.whitelist) {
      defaults.whitelist = [];
    }
    if (result.proxyEnabled === undefined) {
      defaults.proxyEnabled = false;
    }
    if (!result.currentConfig) {
      defaults.currentConfig = null;
    }
    if (result.bypassLocal === undefined) {
      defaults.bypassLocal = true;
    }
    if (Object.keys(defaults).length > 0) {
      chrome.storage.sync.set(defaults);
    }
  });
});

async function applyProxySettings() {
  try {
    const data = await chrome.storage.sync.get(['proxyEnabled', 'configs', 'currentConfig', 'whitelist', 'bypassLocal']);
    console.log('=== PROXY SETTINGS ===');
    console.log('Enabled:', data.proxyEnabled);
    console.log('Bypass Local:', data.bypassLocal);
    console.log('Whitelist:', data.whitelist);
    
    await chrome.proxy.settings.clear({scope: 'regular'});
    
    if (!data.proxyEnabled) {
      console.log('Proxy disabled - using direct connection');
      return;
    }
    
    const currentConfig = data.configs?.find(c => c.id === data.currentConfig);
    if (!currentConfig) {
      console.error('Current config not found');
      return;
    }
    
    console.log('Current config:', currentConfig);
    
    const bypassLocal = data.bypassLocal !== false;
    const whitelist = data.whitelist || [];
    
    const pacScript = generatePacScript(currentConfig, whitelist, bypassLocal);
    console.log('Generated PAC script:', pacScript);
    
    const config = {
      mode: 'pac_script',
      pacScript: {
        data: pacScript
      }
    };
    
    console.log('Applying PAC config');
    
    await chrome.proxy.settings.set({
      value: config,
      scope: 'regular'
    });
    
    const verifyConfig = await chrome.proxy.settings.get({});
    console.log('Verified config:', verifyConfig.value.mode);
    
    console.log('Proxy settings applied successfully');
  } catch (error) {
    console.error('Error applying proxy:', error);
  }
}

function generatePacScript(proxyConfig, whitelist, bypassLocal) {
  const proxyString = `${proxyConfig.scheme.toUpperCase()} ${proxyConfig.host}:${proxyConfig.port}`;
  
  let script = `function FindProxyForURL(url, host) {
  // Remove port from host if present
  host = host.split(':')[0];
  
`;

  if (bypassLocal) {
    script += `  // Bypass local addresses
  if (isPlainHostName(host)) return "DIRECT";
  if (host === "localhost" || host === "127.0.0.1") return "DIRECT";
  
  // Check if IP address is in private range
  if (/^127\\./.test(host)) return "DIRECT";
  if (/^10\\./.test(host)) return "DIRECT";
  if (/^192\\.168\\./.test(host)) return "DIRECT";
  if (/^172\\.(1[6-9]|2[0-9]|3[0-1])\\./.test(host)) return "DIRECT";
  if (/^169\\.254\\./.test(host)) return "DIRECT";
  
  // Check for .local domains
  if (/\\.local$/.test(host)) return "DIRECT";
  
`;
  }
  
  if (whitelist && whitelist.length > 0) {
    script += `  // Whitelist patterns\n`;
    whitelist.forEach(pattern => {
      const regexPattern = pattern
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.*');
      script += `  if (/^${regexPattern}$/.test(host)) return "DIRECT";\n`;
    });
    script += `\n`;
  }
  
  script += `  // Use proxy for everything else
  return "${proxyString}";
}`;
  
  return script;
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.proxyEnabled || changes.currentConfig || changes.whitelist || changes.bypassLocal) {
      applyProxySettings();
    }
  }
});

chrome.proxy.onProxyError.addListener((details) => {
  console.error('=== PROXY ERROR ===');
  console.error('Error:', details.error);
  console.error('Details:', details.details);
  console.error('Fatal:', details.fatal);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCurrentTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        try {
          const url = new URL(tabs[0].url);
          sendResponse({ hostname: url.hostname, url: tabs[0].url });
        } catch (e) {
          sendResponse({ hostname: null, url: null });
        }
      } else {
        sendResponse({ hostname: null, url: null });
      }
    });
    return true;
  }
  
  if (request.action === 'applyProxy') {
    applyProxySettings().then(() => {
      sendResponse({ success: true });
    }).catch((error) => {
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }
  
  if (request.action === 'debugProxy') {
    chrome.proxy.settings.get({}, (config) => {
      console.log('=== CURRENT PROXY CONFIG ===');
      console.log(JSON.stringify(config, null, 2));
      sendResponse({ config: config });
    });
    return true;
  }
});

applyProxySettings();
