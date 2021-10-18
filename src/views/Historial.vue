<template>    
    <Breadcrumb :historial="bread"/>
    <ListaRegistros/>
</template>
<script>
import ListaRegistros from '@/components/Principal/ListaRegistros'
import Breadcrumb from '@/components/BreadCrumb'
export default {
    components: {
        ListaRegistros, Breadcrumb
    },
    data(){
        return{
            bread: [
                {direccion: 'Estacionamiento Unifranz', ruta:'/'},
                {direccion:'Historial de registros del Estacionamiento',ruta:'/historial'}
            ]
        }
    }
}
</script>