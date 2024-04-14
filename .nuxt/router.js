import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4a6b6fb9 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _0e344c5b = () => interopDefault(import('..\\pages\\admin\\department\\index.vue' /* webpackChunkName: "pages/admin/department/index" */))
const _757c7f8e = () => interopDefault(import('..\\pages\\admin\\equipment\\index.vue' /* webpackChunkName: "pages/admin/equipment/index" */))
const _756be224 = () => interopDefault(import('..\\pages\\admin\\home\\index.vue' /* webpackChunkName: "pages/admin/home/index" */))
const _208688d8 = () => interopDefault(import('..\\pages\\admin\\location\\index.vue' /* webpackChunkName: "pages/admin/location/index" */))
const _ffca5a1c = () => interopDefault(import('..\\pages\\admin\\notebook\\index.vue' /* webpackChunkName: "pages/admin/notebook/index" */))
const _26fc7cf4 = () => interopDefault(import('..\\pages\\admin\\store\\index.vue' /* webpackChunkName: "pages/admin/store/index" */))
const _665a66fc = () => interopDefault(import('..\\pages\\admin\\user\\index.vue' /* webpackChunkName: "pages/admin/user/index" */))
const _f21ffb32 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _db0eadd6 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _7659aabb = () => interopDefault(import('..\\pages\\user\\department\\index.vue' /* webpackChunkName: "pages/user/department/index" */))
const _6dc715d9 = () => interopDefault(import('..\\pages\\user\\equipment\\index.vue' /* webpackChunkName: "pages/user/equipment/index" */))
const _12edb54e = () => interopDefault(import('..\\pages\\user\\home\\index.vue' /* webpackChunkName: "pages/user/home/index" */))
const _0d2fff38 = () => interopDefault(import('..\\pages\\user\\location\\index.vue' /* webpackChunkName: "pages/user/location/index" */))
const _6cc44952 = () => interopDefault(import('..\\pages\\user\\notebook\\index.vue' /* webpackChunkName: "pages/user/notebook/index" */))
const _5352e726 = () => interopDefault(import('..\\pages\\user\\store\\index.vue' /* webpackChunkName: "pages/user/store/index" */))
const _3fecec7a = () => interopDefault(import('..\\pages\\admin\\department\\create.vue' /* webpackChunkName: "pages/admin/department/create" */))
const _0aaa91a5 = () => interopDefault(import('..\\pages\\admin\\equipment\\create.vue' /* webpackChunkName: "pages/admin/equipment/create" */))
const _6ea884b2 = () => interopDefault(import('..\\pages\\admin\\equipment\\profile\\index.vue' /* webpackChunkName: "pages/admin/equipment/profile/index" */))
const _17fedce6 = () => interopDefault(import('..\\pages\\admin\\location\\create.vue' /* webpackChunkName: "pages/admin/location/create" */))
const _aa1853e8 = () => interopDefault(import('..\\pages\\admin\\notebook\\create.vue' /* webpackChunkName: "pages/admin/notebook/create" */))
const _ea131bce = () => interopDefault(import('..\\pages\\admin\\notebook\\profile\\index.vue' /* webpackChunkName: "pages/admin/notebook/profile/index" */))
const _692a8c10 = () => interopDefault(import('..\\pages\\admin\\store\\create.vue' /* webpackChunkName: "pages/admin/store/create" */))
const _74763a89 = () => interopDefault(import('..\\pages\\admin\\user\\profile\\index.vue' /* webpackChunkName: "pages/admin/user/profile/index" */))
const _c78cf9dc = () => interopDefault(import('..\\pages\\user\\equipment\\profile\\index.vue' /* webpackChunkName: "pages/user/equipment/profile/index" */))
const _421c27b9 = () => interopDefault(import('..\\pages\\user\\notebook\\profile\\index.vue' /* webpackChunkName: "pages/user/notebook/profile/index" */))
const _01865810 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _4a6b6fb9,
    name: "home"
  }, {
    path: "/admin/department",
    component: _0e344c5b,
    name: "admin-department"
  }, {
    path: "/admin/equipment",
    component: _757c7f8e,
    name: "admin-equipment"
  }, {
    path: "/admin/home",
    component: _756be224,
    name: "admin-home"
  }, {
    path: "/admin/location",
    component: _208688d8,
    name: "admin-location"
  }, {
    path: "/admin/notebook",
    component: _ffca5a1c,
    name: "admin-notebook"
  }, {
    path: "/admin/store",
    component: _26fc7cf4,
    name: "admin-store"
  }, {
    path: "/admin/user",
    component: _665a66fc,
    name: "admin-user"
  }, {
    path: "/auth/login",
    component: _f21ffb32,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _db0eadd6,
    name: "auth-register"
  }, {
    path: "/user/department",
    component: _7659aabb,
    name: "user-department"
  }, {
    path: "/user/equipment",
    component: _6dc715d9,
    name: "user-equipment"
  }, {
    path: "/user/home",
    component: _12edb54e,
    name: "user-home"
  }, {
    path: "/user/location",
    component: _0d2fff38,
    name: "user-location"
  }, {
    path: "/user/notebook",
    component: _6cc44952,
    name: "user-notebook"
  }, {
    path: "/user/store",
    component: _5352e726,
    name: "user-store"
  }, {
    path: "/admin/department/create",
    component: _3fecec7a,
    name: "admin-department-create"
  }, {
    path: "/admin/equipment/create",
    component: _0aaa91a5,
    name: "admin-equipment-create"
  }, {
    path: "/admin/equipment/profile",
    component: _6ea884b2,
    name: "admin-equipment-profile"
  }, {
    path: "/admin/location/create",
    component: _17fedce6,
    name: "admin-location-create"
  }, {
    path: "/admin/notebook/create",
    component: _aa1853e8,
    name: "admin-notebook-create"
  }, {
    path: "/admin/notebook/profile",
    component: _ea131bce,
    name: "admin-notebook-profile"
  }, {
    path: "/admin/store/create",
    component: _692a8c10,
    name: "admin-store-create"
  }, {
    path: "/admin/user/profile",
    component: _74763a89,
    name: "admin-user-profile"
  }, {
    path: "/user/equipment/profile",
    component: _c78cf9dc,
    name: "user-equipment-profile"
  }, {
    path: "/user/notebook/profile",
    component: _421c27b9,
    name: "user-notebook-profile"
  }, {
    path: "/",
    component: _01865810,
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
