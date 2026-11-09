// TwinDesk — Copyright (C) 2026 inukaasith. GPL-3.0, see LICENSE.
// English source messages are keys; untranslated pages and platforms keep their English text.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
<<<<<<< HEAD
    module.exports = factory({
      en: require('./lang/en.js'), 'zh-CN': require('./lang/zh-CN.js'),
      ru: require('./lang/ru.js'), tr: require('./lang/tr.js'),
    });
  } else {
    root.TwinDeskI18n = factory(root.TwinDeskLanguages || {});
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (bundled) {
  'use strict';
  const LANGUAGES = ['en', 'zh-CN', 'ru', 'tr'];
=======
    // Only the language in use is read (each catalog is about 200 KB); English is the fallback.
    const cache = {};
    const FILES = { en: './lang/en.js', 'zh-CN': './lang/zh-CN.js', ru: './lang/ru.js', tr: './lang/tr.js', 'pt-BR': './lang/pt-BR.js' };
    module.exports = factory((locale) => cache[locale] || (FILES[locale] ? (cache[locale] = require(FILES[locale])) : null));
  } else {
    // A window loads English and the chosen language only (shared/lang/pick.js).
    root.TwinDeskI18n = factory((locale) => (root.TwinDeskLanguages || {})[locale] || null);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (load) {
  'use strict';
  const LANGUAGES = ['en', 'zh-CN', 'ru', 'tr', 'pt-BR'];
>>>>>>> 2c2344fdb4bebb9003a4cd7bfc9d6801dcdd3a6b
  const own = (obj, key) => obj && Object.prototype.hasOwnProperty.call(obj, key);
  const savedLanguage = (value) => LANGUAGES.includes(value) ? value : '';

  function resolveLanguage(preference, systemLanguage) {
    if (savedLanguage(preference)) return preference;
    const system = typeof systemLanguage === 'string' ? systemLanguage.replace(/_/g, '-').toLowerCase() : '';
    if (/^(zh|zh-cn|zh-sg|zh-hans(?:-[a-z]+)?)$/.test(system)) return 'zh-CN';
    if (/^ru(-|$)/.test(system)) return 'ru';
    if (/^tr(-|$)/.test(system)) return 'tr';
<<<<<<< HEAD
    return 'en';
  }

  function create(language, catalogs = bundled) {
=======
    // Every Portuguese locale (pt-BR, pt-PT, pt-AO…) reads Brazilian Portuguese better than English.
    if (/^pt(-|$)/.test(system)) return 'pt-BR';
    return 'en';
  }

  function create(language, catalogs) {
>>>>>>> 2c2344fdb4bebb9003a4cd7bfc9d6801dcdd3a6b
    const locale = savedLanguage(language) || 'en';
    const get = catalogs ? (l) => catalogs[l] : load;
    const messages = get(locale) || {};
    const english = get('en') || {};
    const textAt = (dict, key) => own(dict, key) && typeof dict[key] === 'string' && dict[key] ? dict[key] : '';
    return {
      locale,
      t(key, vars) {
        const text = textAt(messages, key) || textAt(english, key) || key;
        // A single pass preserves literal dollars, markup and braces in names or paths.
        return String(text).replace(/\{(\w+)\}/g, (match, name) => own(vars, name) ? String(vars[name]) : match);
      },
    };
  }

  return { LANGUAGES, savedLanguage, resolveLanguage, create };
});
