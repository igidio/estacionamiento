<template>
  <Breadcrumb :historial="bread"/>
  <BotonInsertar :direccion="'/personal/registro/'"/>
  <ListaPersonal />
</template>

<script>
import ListaPersonal from '../../components/Personal/ListaPersonal'
import BotonInsertar from '../../components/listas/BotonInsertar'
import Breadcrumb from '@/components/BreadCrumb'
export default {
  name: 'Personal',
  components: { ListaPersonal, BotonInsertar, Breadcrumb },
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
        {direccion: 'Lista del Personal', ruta:'/'},
      ]
    }
  },
}
</script>
