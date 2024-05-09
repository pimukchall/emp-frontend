import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _52596b8e = () => interopDefault(import('../pages/admin/customer/index.vue' /* webpackChunkName: "pages/admin/customer/index" */))
const _3631867c = () => interopDefault(import('../pages/admin/department/index.vue' /* webpackChunkName: "pages/admin/department/index" */))
const _4e1b33b4 = () => interopDefault(import('../pages/admin/equipment/index.vue' /* webpackChunkName: "pages/admin/equipment/index" */))
const _0a94b462 = () => interopDefault(import('../pages/admin/home/index.vue' /* webpackChunkName: "pages/admin/home/index" */))
const _3bbeeaa5 = () => interopDefault(import('../pages/admin/location/index.vue' /* webpackChunkName: "pages/admin/location/index" */))
const _bf346bac = () => interopDefault(import('../pages/admin/log/index.vue' /* webpackChunkName: "pages/admin/log/index" */))
const _1dcbf54b = () => interopDefault(import('../pages/admin/notebook/index.vue' /* webpackChunkName: "pages/admin/notebook/index" */))
const _6b070e72 = () => interopDefault(import('../pages/admin/store/index.vue' /* webpackChunkName: "pages/admin/store/index" */))
const _7f14e5bb = () => interopDefault(import('../pages/admin/user/index.vue' /* webpackChunkName: "pages/admin/user/index" */))
const _23459122 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _7006f70d = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _5154fe8a = () => interopDefault(import('../pages/auth/register-user.vue' /* webpackChunkName: "pages/auth/register-user" */))
const _378b9c4e = () => interopDefault(import('../pages/guest/department/index.vue' /* webpackChunkName: "pages/guest/department/index" */))
const _5e99bfbd = () => interopDefault(import('../pages/guest/equipment/index.vue' /* webpackChunkName: "pages/guest/equipment/index" */))
const _5c4ff826 = () => interopDefault(import('../pages/guest/home/index.vue' /* webpackChunkName: "pages/guest/home/index" */))
const _6eab8d08 = () => interopDefault(import('../pages/guest/location/index.vue' /* webpackChunkName: "pages/guest/location/index" */))
const _aa9177bc = () => interopDefault(import('../pages/guest/notebook/index.vue' /* webpackChunkName: "pages/guest/notebook/index" */))
const _c7a71d60 = () => interopDefault(import('../pages/guest/store/index.vue' /* webpackChunkName: "pages/guest/store/index" */))
const _1115503c = () => interopDefault(import('../pages/super/customer/index.vue' /* webpackChunkName: "pages/super/customer/index" */))
const _9a8d37d4 = () => interopDefault(import('../pages/super/department/index.vue' /* webpackChunkName: "pages/super/department/index" */))
const _4c7cd1e0 = () => interopDefault(import('../pages/super/equipment/index.vue' /* webpackChunkName: "pages/super/equipment/index" */))
const _7dbcdc23 = () => interopDefault(import('../pages/super/home/index.vue' /* webpackChunkName: "pages/super/home/index" */))
const _3e4a520e = () => interopDefault(import('../pages/super/location/index.vue' /* webpackChunkName: "pages/super/location/index" */))
const _11970d54 = () => interopDefault(import('../pages/super/log/index.vue' /* webpackChunkName: "pages/super/log/index" */))
const _7a303cc2 = () => interopDefault(import('../pages/super/notebook/index.vue' /* webpackChunkName: "pages/super/notebook/index" */))
const _af47e61a = () => interopDefault(import('../pages/super/store/index.vue' /* webpackChunkName: "pages/super/store/index" */))
const _021c1c0f = () => interopDefault(import('../pages/super/user/index.vue' /* webpackChunkName: "pages/super/user/index" */))
const _2498e208 = () => interopDefault(import('../pages/user/department/index.vue' /* webpackChunkName: "pages/user/department/index" */))
const _8c829b8c = () => interopDefault(import('../pages/user/equipment/index.vue' /* webpackChunkName: "pages/user/equipment/index" */))
const _5ed2ab89 = () => interopDefault(import('../pages/user/home/index.vue' /* webpackChunkName: "pages/user/home/index" */))
const _cbe2f942 = () => interopDefault(import('../pages/user/location/index.vue' /* webpackChunkName: "pages/user/location/index" */))
const _7c1b8e05 = () => interopDefault(import('../pages/user/notebook/index.vue' /* webpackChunkName: "pages/user/notebook/index" */))
const _2bffab66 = () => interopDefault(import('../pages/user/store/index.vue' /* webpackChunkName: "pages/user/store/index" */))
const _208850f0 = () => interopDefault(import('../pages/admin/customer/create.vue' /* webpackChunkName: "pages/admin/customer/create" */))
const _8065d2b0 = () => interopDefault(import('../pages/admin/customer/profile/index.vue' /* webpackChunkName: "pages/admin/customer/profile/index" */))
const _4096b388 = () => interopDefault(import('../pages/admin/department/create.vue' /* webpackChunkName: "pages/admin/department/create" */))
const _c600e4ec = () => interopDefault(import('../pages/admin/equipment/create.vue' /* webpackChunkName: "pages/admin/equipment/create" */))
const _39214e64 = () => interopDefault(import('../pages/admin/equipment/profile/index.vue' /* webpackChunkName: "pages/admin/equipment/profile/index" */))
const _63d2b4b9 = () => interopDefault(import('../pages/admin/location/create.vue' /* webpackChunkName: "pages/admin/location/create" */))
const _7932025a = () => interopDefault(import('../pages/admin/notebook/create.vue' /* webpackChunkName: "pages/admin/notebook/create" */))
const _0f2c9365 = () => interopDefault(import('../pages/admin/notebook/profile/index.vue' /* webpackChunkName: "pages/admin/notebook/profile/index" */))
const _a6722a52 = () => interopDefault(import('../pages/admin/store/create.vue' /* webpackChunkName: "pages/admin/store/create" */))
const _a313d856 = () => interopDefault(import('../pages/admin/user/profile/index.vue' /* webpackChunkName: "pages/admin/user/profile/index" */))
const _3909cbd7 = () => interopDefault(import('../pages/guest/equipment/profile/index.vue' /* webpackChunkName: "pages/guest/equipment/profile/index" */))
const _3f39c988 = () => interopDefault(import('../pages/guest/notebook/profile/index.vue' /* webpackChunkName: "pages/guest/notebook/profile/index" */))
const _1ee9ef1c = () => interopDefault(import('../pages/super/customer/create.vue' /* webpackChunkName: "pages/super/customer/create" */))
const _529d2208 = () => interopDefault(import('../pages/super/customer/profile/index.vue' /* webpackChunkName: "pages/super/customer/profile/index" */))
const _67b12d30 = () => interopDefault(import('../pages/super/department/create.vue' /* webpackChunkName: "pages/super/department/create" */))
const _6ad1b4de = () => interopDefault(import('../pages/super/equipment/create.vue' /* webpackChunkName: "pages/super/equipment/create" */))
const _add3ea0c = () => interopDefault(import('../pages/super/equipment/profile/index.vue' /* webpackChunkName: "pages/super/equipment/profile/index" */))
const _623452e5 = () => interopDefault(import('../pages/super/location/create.vue' /* webpackChunkName: "pages/super/location/create" */))
const _7c6ec602 = () => interopDefault(import('../pages/super/notebook/create.vue' /* webpackChunkName: "pages/super/notebook/create" */))
const _2610ebb9 = () => interopDefault(import('../pages/super/notebook/profile/index.vue' /* webpackChunkName: "pages/super/notebook/profile/index" */))
const _ea4c47aa = () => interopDefault(import('../pages/super/store/create.vue' /* webpackChunkName: "pages/super/store/create" */))
const _505bb629 = () => interopDefault(import('../pages/super/user/profile/index.vue' /* webpackChunkName: "pages/super/user/profile/index" */))
const _4686f154 = () => interopDefault(import('../pages/user/equipment/profile/index.vue' /* webpackChunkName: "pages/user/equipment/profile/index" */))
const _0a1cd21f = () => interopDefault(import('../pages/user/notebook/profile/index.vue' /* webpackChunkName: "pages/user/notebook/profile/index" */))
const _951280e2 = () => interopDefault(import('../pages/user/user/profile/index.vue' /* webpackChunkName: "pages/user/user/profile/index" */))
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
    path: "/admin/customer",
    component: _52596b8e,
    name: "admin-customer"
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
    path: "/admin/log",
    component: _bf346bac,
    name: "admin-log"
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
    path: "/auth/register-user",
    component: _5154fe8a,
    name: "auth-register-user"
  }, {
    path: "/guest/department",
    component: _378b9c4e,
    name: "guest-department"
  }, {
    path: "/guest/equipment",
    component: _5e99bfbd,
    name: "guest-equipment"
  }, {
    path: "/guest/home",
    component: _5c4ff826,
    name: "guest-home"
  }, {
    path: "/guest/location",
    component: _6eab8d08,
    name: "guest-location"
  }, {
    path: "/guest/notebook",
    component: _aa9177bc,
    name: "guest-notebook"
  }, {
    path: "/guest/store",
    component: _c7a71d60,
    name: "guest-store"
  }, {
    path: "/super/customer",
    component: _1115503c,
    name: "super-customer"
  }, {
    path: "/super/department",
    component: _9a8d37d4,
    name: "super-department"
  }, {
    path: "/super/equipment",
    component: _4c7cd1e0,
    name: "super-equipment"
  }, {
    path: "/super/home",
    component: _7dbcdc23,
    name: "super-home"
  }, {
    path: "/super/location",
    component: _3e4a520e,
    name: "super-location"
  }, {
    path: "/super/log",
    component: _11970d54,
    name: "super-log"
  }, {
    path: "/super/notebook",
    component: _7a303cc2,
    name: "super-notebook"
  }, {
    path: "/super/store",
    component: _af47e61a,
    name: "super-store"
  }, {
    path: "/super/user",
    component: _021c1c0f,
    name: "super-user"
  }, {
    path: "/user/department",
    component: _2498e208,
    name: "user-department"
  }, {
    path: "/user/equipment",
    component: _8c829b8c,
    name: "user-equipment"
  }, {
    path: "/user/home",
    component: _5ed2ab89,
    name: "user-home"
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
    path: "/admin/customer/create",
    component: _208850f0,
    name: "admin-customer-create"
  }, {
    path: "/admin/customer/profile",
    component: _8065d2b0,
    name: "admin-customer-profile"
  }, {
    path: "/admin/department/create",
    component: _4096b388,
    name: "admin-department-create"
  }, {
    path: "/admin/equipment/create",
    component: _c600e4ec,
    name: "admin-equipment-create"
  }, {
    path: "/admin/equipment/profile",
    component: _39214e64,
    name: "admin-equipment-profile"
  }, {
    path: "/admin/location/create",
    component: _63d2b4b9,
    name: "admin-location-create"
  }, {
    path: "/admin/notebook/create",
    component: _7932025a,
    name: "admin-notebook-create"
  }, {
    path: "/admin/notebook/profile",
    component: _0f2c9365,
    name: "admin-notebook-profile"
  }, {
    path: "/admin/store/create",
    component: _a6722a52,
    name: "admin-store-create"
  }, {
    path: "/admin/user/profile",
    component: _a313d856,
    name: "admin-user-profile"
  }, {
    path: "/guest/equipment/profile",
    component: _3909cbd7,
    name: "guest-equipment-profile"
  }, {
    path: "/guest/notebook/profile",
    component: _3f39c988,
    name: "guest-notebook-profile"
  }, {
    path: "/super/customer/create",
    component: _1ee9ef1c,
    name: "super-customer-create"
  }, {
    path: "/super/customer/profile",
    component: _529d2208,
    name: "super-customer-profile"
  }, {
    path: "/super/department/create",
    component: _67b12d30,
    name: "super-department-create"
  }, {
    path: "/super/equipment/create",
    component: _6ad1b4de,
    name: "super-equipment-create"
  }, {
    path: "/super/equipment/profile",
    component: _add3ea0c,
    name: "super-equipment-profile"
  }, {
    path: "/super/location/create",
    component: _623452e5,
    name: "super-location-create"
  }, {
    path: "/super/notebook/create",
    component: _7c6ec602,
    name: "super-notebook-create"
  }, {
    path: "/super/notebook/profile",
    component: _2610ebb9,
    name: "super-notebook-profile"
  }, {
    path: "/super/store/create",
    component: _ea4c47aa,
    name: "super-store-create"
  }, {
    path: "/super/user/profile",
    component: _505bb629,
    name: "super-user-profile"
  }, {
    path: "/user/equipment/profile",
    component: _4686f154,
    name: "user-equipment-profile"
  }, {
    path: "/user/notebook/profile",
    component: _0a1cd21f,
    name: "user-notebook-profile"
  }, {
    path: "/user/user/profile",
    component: _951280e2,
    name: "user-user-profile"
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
