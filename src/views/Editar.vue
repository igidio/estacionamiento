<template>
  <h1 class="my-5">Formularios con Vue.js</h1>
  <form @submit.prevent="procesarFormulario">
  </form>
  <hr>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  created(){
    this.cargarLocalStorage()
  }

}
</script>
