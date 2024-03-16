import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _73ab5a62 = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _3631867c = () => interopDefault(import('../pages/admin/department/index.vue' /* webpackChunkName: "pages/admin/department/index" */))
const _4e1b33b4 = () => interopDefault(import('../pages/admin/equipment/index.vue' /* webpackChunkName: "pages/admin/equipment/index" */))
const _0a94b462 = () => interopDefault(import('../pages/admin/home/index.vue' /* webpackChunkName: "pages/admin/home/index" */))
const _3bbeeaa5 = () => interopDefault(import('../pages/admin/location/index.vue' /* webpackChunkName: "pages/admin/location/index" */))
const _1dcbf54b = () => interopDefault(import('../pages/admin/notebook/index.vue' /* webpackChunkName: "pages/admin/notebook/index" */))
const _6b070e72 = () => interopDefault(import('../pages/admin/store/index.vue' /* webpackChunkName: "pages/admin/store/index" */))
const _7f14e5bb = () => interopDefault(import('../pages/admin/user/index.vue' /* webpackChunkName: "pages/admin/user/index" */))
const _23459122 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _7006f70d = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _2498e208 = () => interopDefault(import('../pages/user/department/index.vue' /* webpackChunkName: "pages/user/department/index" */))
const _8c829b8c = () => interopDefault(import('../pages/user/equipment/index.vue' /* webpackChunkName: "pages/user/equipment/index" */))
const _cbe2f942 = () => interopDefault(import('../pages/user/location/index.vue' /* webpackChunkName: "pages/user/location/index" */))
const _7c1b8e05 = () => interopDefault(import('../pages/user/notebook/index.vue' /* webpackChunkName: "pages/user/notebook/index" */))
const _2bffab66 = () => interopDefault(import('../pages/user/store/index.vue' /* webpackChunkName: "pages/user/store/index" */))
const _399c2916 = () => interopDefault(import('../pages/user/user/index.vue' /* webpackChunkName: "pages/user/user/index" */))
const _4096b388 = () => interopDefault(import('../pages/admin/department/create.vue' /* webpackChunkName: "pages/admin/department/create" */))
const _c600e4ec = () => interopDefault(import('../pages/admin/equipment/create.vue' /* webpackChunkName: "pages/admin/equipment/create" */))
const _63d2b4b9 = () => interopDefault(import('../pages/admin/location/create.vue' /* webpackChunkName: "pages/admin/location/create" */))
const _7932025a = () => interopDefault(import('../pages/admin/notebook/create.vue' /* webpackChunkName: "pages/admin/notebook/create" */))
const _a6722a52 = () => interopDefault(import('../pages/admin/store/create.vue' /* webpackChunkName: "pages/admin/store/create" */))
const _17abf7b5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/home",
    component: _73ab5a62,
    name: "home"
  }, {
    path: "/admin/department",
    component: _3631867c,
    name: "admin-department"
  }, {
    path: "/admin/equipment",
    component: _4e1b33b4,
    name: "admin-equipment"
  }, {
    path: "/admin/home",
    component: _0a94b462,
    name: "admin-home"
  }, {
    path: "/admin/location",
    component: _3bbeeaa5,
    name: "admin-location"
  }, {
    path: "/admin/notebook",
    component: _1dcbf54b,
    name: "admin-notebook"
  }, {
    path: "/admin/store",
    component: _6b070e72,
    name: "admin-store"
  }, {
    path: "/admin/user",
    component: _7f14e5bb,
    name: "admin-user"
  }, {
    path: "/auth/login",
    component: _23459122,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _7006f70d,
    name: "auth-register"
  }, {
    path: "/user/department",
    component: _2498e208,
    name: "user-department"
  }, {
    path: "/user/equipment",
    component: _8c829b8c,
    name: "user-equipment"
  }, {
    path: "/user/location",
    component: _cbe2f942,
    name: "user-location"
  }, {
    path: "/user/notebook",
    component: _7c1b8e05,
    name: "user-notebook"
  }, {
    path: "/user/store",
    component: _2bffab66,
    name: "user-store"
  }, {
    path: "/user/user",
    component: _399c2916,
    name: "user-user"
  }, {
    path: "/admin/department/create",
    component: _4096b388,
    name: "admin-department-create"
  }, {
    path: "/admin/equipment/create",
    component: _c600e4ec,
    name: "admin-equipment-create"
  }, {
    path: "/admin/location/create",
    component: _63d2b4b9,
    name: "admin-location-create"
  }, {
    path: "/admin/notebook/create",
    component: _7932025a,
    name: "admin-notebook-create"
  }, {
    path: "/admin/store/create",
    component: _a6722a52,
    name: "admin-store-create"
  }, {
    path: "/",
    component: _17abf7b5,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
