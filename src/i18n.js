import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ElementLocale from 'element-ui/lib/locale'
// set locale messages
import messages from './locales'

Vue.use(VueI18n)

// set locale
const locale = process.env.VUE_APP_I18N_LOCALE || 'en'
const i18n = new VueI18n({
    locale,
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

// Web tab title
document.title = messages[locale]['AppTitle']

export default i18n