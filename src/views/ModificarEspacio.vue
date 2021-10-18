<template>
    <Breadcrumb :historial="bread"/>
    <InputModificar/>
</template>

<script>
import InputModificar from "@/components/Principal/input_modificar";
import Breadcrumb from '@/components/BreadCrumb'
export default {
    components: {
        InputModificar, Breadcrumb
    },
    data(){
        return{
            bread: [
                {direccion: 'Estacionamiento Unifranz', ruta:'/'},
                {direccion:'Modificar Información',ruta:'/'}
            ]
        }
    }
}
</script>