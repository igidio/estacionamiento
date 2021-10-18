<template>
  <div class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">          
          <span style="color: orange" class="font-weight-bold">Estacionamiento Unifranz</span>
      </router-link>
      <div class="d-flex">
          <router-link 
            class="btn btn-dark mx-2" 
            to="/"
            v-if="usuarioAutenticado"
            >
            <i class="fas fa-bullseye"></i> Espacios
          </router-link>
          <router-link 
            class="btn btn-dark mx-2" 
            to="/ingreso"
            v-if="!usuarioAutenticado"
            >
            Ingresar
          </router-link>
          <router-link 
            class="btn btn-dark mx-2" 
            to="/registro"
            v-if="!usuarioAutenticado"
            >
            Registrar
          </router-link>
          <router-link 
            class="btn btn-dark mx-2" 
            to="/Vehiculos"
            v-if="usuarioAutenticado"
            >
            <i class="fas fa-car"></i> Vehículos
          </router-link>
          <router-link 
            class="btn btn-dark mx-2" 
            to="/Personal"
            v-if="usuarioAutenticado"
            >
            <i class="fas fa-users"></i> Personal
          </router-link>
          <button
            class="btn btn-light mx-2"
            v-if="usuarioAutenticado"
            @click="cerrarSesion"
          >
            <i class="fas fa-power-off"></i> Cerrar Sesión
          </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters(['usuarioAutenticado'])
  },
  methods: {
    ...mapActions(['cerrarSesion'])
  }
}
</script>

