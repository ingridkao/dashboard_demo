import Vue from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'

import axios from 'axios'
import api_method, {postFormData} from '@/assets/js/api_method'
import i18n from './i18n'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios = axios
Vue.prototype.$api_method = api_method
Vue.prototype.$postFormData = postFormData

Vue.use(ElementUI)

Vue.config.productionTip = false

import Keyword from '@/components/template/Keyword.vue'
import AlarmBar from '@/components/template/AlarmBar.vue'
import CountPie from '@/components/template/CountPie.vue'
import StatisticLine from '@/components/template/StatisticLine.vue'
import ComplexMsg from '@/components/template/ComplexMsg.vue'
import KeyFigures from '@/components/template/KeyFigures.vue'
import Gauge from '@/components/template/Gauge.vue'
import TreeMap from '@/components/template/TreeMap.vue'
import VerticalBar from '@/components/template/VerticalBar.vue'
import StackedBar from '@/components/template/StackedBar.vue'
import CountChart from '@/components/template/CountChart.vue'
import Proportion from '@/components/template/Proportion.vue'
import MapDisplay from '@/components/template/MapDisplay.vue'

Vue.component('Keyword', Keyword)
Vue.component('AlarmBar', AlarmBar)
Vue.component('CountPie', CountPie)
Vue.component('StatisticLine', StatisticLine)
Vue.component('ComplexMsg', ComplexMsg)
Vue.component('KeyFigures', KeyFigures)
Vue.component('Gauge', Gauge)
Vue.component('TreeMap', TreeMap)
Vue.component('VerticalBar', VerticalBar)
Vue.component('StackedBar', StackedBar)
Vue.component('CountChart', CountChart)
Vue.component('Proportion', Proportion)
Vue.component('MapDisplay', MapDisplay)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')

