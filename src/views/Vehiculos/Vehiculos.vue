<template>
  <h1 class="my-3 font-weight-bold"><hr></h1>
  <Breadcrumb :historial="bread"/>
  <BotonInsertar :direccion="'/vehiculos/registro'" />
  <ListaVehiculos />
</template>

<script>
import ListaVehiculos from '../../components/Vehiculos/ListaVehiculos'
import BotonInsertar from '../../components/listas/BotonInsertar'
import Breadcrumb from '@/components/BreadCrumb'
export default {
  name: 'Personal',
  components: {
    ListaVehiculos,
    BotonInsertar, 
    Breadcrumb
  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      },
      bread: [
        {direccion: 'Estacionamiento Unifranz', ruta:'/'},
        {direccion:'Lista de Vehículos Registrados',ruta:'/'}
      ]
    }
  },                    
}
</script>
