import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {rutaProtegida: true}
  },
  { path: '/historial',
    name: 'Historial',
    component: () => import(/* webpackChunkName: "about" */ '../views/Historial.vue'),
    meta: {rutaProtegida: true}
  },
  { path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue'),
    meta: {rutaProtegida: true}
  },
  { path: '/registro',
    name: 'Registro',
    meta: {noIniciarSesion: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  { path: '/ingreso',
    name: 'Ingreso',
    meta: {noIniciarSesion: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
  },
  {
    path: '/vehiculos',
    name: 'Vehiculos',
    meta: {rutaProtegida: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Vehiculos/Vehiculos.vue')
  },
  {
    path: '/vehiculos/registro',
    name: 'RegistroVehiculos',
    meta: {rutaProtegida: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Vehiculos/RegistroVehiculos.vue')
  },
  {
    path: '/vehiculos/modificar/:id',
    name: 'ModificarVehiculos',
    props: true,
    meta: {rutaProtegida: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Vehiculos/ModificarVehiculos.vue')
  },
  {
    path: '/personal',
    name: 'Personal',
    meta: {rutaProtegida: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Personal/Personal.vue')
  },
  {
    path: '/personal/registro',
    name: 'RegistroPersonal',
    meta: {rutaProtegida: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Personal/RegistroPersonal.vue')
  },
  {
    path: '/personal/modificar/:id',
    name: 'ModificarPersonal',
    meta: {rutaProtegida: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Personal/ModificarPersonal.vue')
  },
  {
    path: '/modificar/:id/',
    name: 'ModificarEspacio',
    meta: {rutaProtegida: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/ModificarEspacio.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to.meta.rutaProtegida)
  if (to.meta.rutaProtegida) {
    if (store.getters.usuarioAutenticado) {
      next()
    } else {
      next('/ingreso')
    }
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  // console.log(to.meta.rutaProtegida)
  if (to.meta.noIniciarSesion) {
    if (!store.getters.usuarioAutenticado) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
