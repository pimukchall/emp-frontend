import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _eb867db0 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _340df168 = () => interopDefault(import('..\\pages\\admin\\department\\index.vue' /* webpackChunkName: "pages/admin/department/index" */))
const _991d39b0 = () => interopDefault(import('..\\pages\\admin\\equipment\\index.vue' /* webpackChunkName: "pages/admin/equipment/index" */))
const _dba3dac2 = () => interopDefault(import('..\\pages\\admin\\home\\index.vue' /* webpackChunkName: "pages/admin/home/index" */))
const _0f6f4c09 = () => interopDefault(import('..\\pages\\admin\\location\\index.vue' /* webpackChunkName: "pages/admin/location/index" */))
const _6f039623 = () => interopDefault(import('..\\pages\\admin\\notebook\\index.vue' /* webpackChunkName: "pages/admin/notebook/index" */))
const _87c39816 = () => interopDefault(import('..\\pages\\admin\\store\\index.vue' /* webpackChunkName: "pages/admin/store/index" */))
const _cc925f9a = () => interopDefault(import('..\\pages\\admin\\user\\index.vue' /* webpackChunkName: "pages/admin/user/index" */))
const _727d5854 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _1a0c2d46 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _64894daa = () => interopDefault(import('..\\pages\\user\\department\\index.vue' /* webpackChunkName: "pages/user/department/index" */))
const _5cafd90a = () => interopDefault(import('..\\pages\\user\\equipment\\index.vue' /* webpackChunkName: "pages/user/equipment/index" */))
const _3a91f77d = () => interopDefault(import('..\\pages\\user\\home\\index.vue' /* webpackChunkName: "pages/user/home/index" */))
const _677991e7 = () => interopDefault(import('..\\pages\\user\\location\\index.vue' /* webpackChunkName: "pages/user/location/index" */))
const _71e447fe = () => interopDefault(import('..\\pages\\user\\notebook\\index.vue' /* webpackChunkName: "pages/user/notebook/index" */))
const _2036ead7 = () => interopDefault(import('..\\pages\\user\\store\\index.vue' /* webpackChunkName: "pages/user/store/index" */))
const _421ab511 = () => interopDefault(import('..\\pages\\user\\user\\index.vue' /* webpackChunkName: "pages/user/user/index" */))
const _00dc2cf2 = () => interopDefault(import('..\\pages\\admin\\department\\create.vue' /* webpackChunkName: "pages/admin/department/create" */))
const _3b2166d4 = () => interopDefault(import('..\\pages\\admin\\equipment\\create.vue' /* webpackChunkName: "pages/admin/equipment/create" */))
const _062e7fd5 = () => interopDefault(import('..\\pages\\admin\\location\\create.vue' /* webpackChunkName: "pages/admin/location/create" */))
const _cdb90e0a = () => interopDefault(import('..\\pages\\admin\\notebook\\create.vue' /* webpackChunkName: "pages/admin/notebook/create" */))
const _2146d52e = () => interopDefault(import('..\\pages\\admin\\store\\create.vue' /* webpackChunkName: "pages/admin/store/create" */))
const _0507a4a7 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _eb867db0,
    name: "home"
  }, {
    path: "/admin/department",
    component: _340df168,
    name: "admin-department"
  }, {
    path: "/admin/equipment",
    component: _991d39b0,
    name: "admin-equipment"
  }, {
    path: "/admin/home",
    component: _dba3dac2,
    name: "admin-home"
  }, {
    path: "/admin/location",
    component: _0f6f4c09,
    name: "admin-location"
  }, {
    path: "/admin/notebook",
    component: _6f039623,
    name: "admin-notebook"
  }, {
    path: "/admin/store",
    component: _87c39816,
    name: "admin-store"
  }, {
    path: "/admin/user",
    component: _cc925f9a,
    name: "admin-user"
  }, {
    path: "/auth/login",
    component: _727d5854,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _1a0c2d46,
    name: "auth-register"
  }, {
    path: "/user/department",
    component: _64894daa,
    name: "user-department"
  }, {
    path: "/user/equipment",
    component: _5cafd90a,
    name: "user-equipment"
  }, {
    path: "/user/home",
    component: _3a91f77d,
    name: "user-home"
  }, {
    path: "/user/location",
    component: _677991e7,
    name: "user-location"
  }, {
    path: "/user/notebook",
    component: _71e447fe,
    name: "user-notebook"
  }, {
    path: "/user/store",
    component: _2036ead7,
    name: "user-store"
  }, {
    path: "/user/user",
    component: _421ab511,
    name: "user-user"
  }, {
    path: "/admin/department/create",
    component: _00dc2cf2,
    name: "admin-department-create"
  }, {
    path: "/admin/equipment/create",
    component: _3b2166d4,
    name: "admin-equipment-create"
  }, {
    path: "/admin/location/create",
    component: _062e7fd5,
    name: "admin-location-create"
  }, {
    path: "/admin/notebook/create",
    component: _cdb90e0a,
    name: "admin-notebook-create"
  }, {
    path: "/admin/store/create",
    component: _2146d52e,
    name: "admin-store-create"
  }, {
    path: "/",
    component: _0507a4a7,
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
