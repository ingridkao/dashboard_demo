import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import MapView from '@/views/Mapview.vue'

Vue.use(VueRouter)

// Solve Avoided redundant navigation to current location error
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   	return originalPush.call(this, location).catch(err => err)
// }

const userRouter = [
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: '/MapView',
		name: 'MapView',
		component: MapView
	},
	{
		path: '*'
	}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: userRouter
})

export default router
