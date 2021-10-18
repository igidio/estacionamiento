<template>
    <h1 class="my-3 font-weight-bold">{{historialLast.direccion}}<hr></h1>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="{direccion,index,ruta} in historial" :key="index"><router-link :to="ruta">{{direccion}}</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{historialLast.direccion}}</li>
        </ol>
    </nav>
</template>

<script setup>
    import { defineProps } from "vue";
    const props = defineProps({
        titulo: String,
        historial: Object
    });

    var historial
    const init = async () => {
        historial = props.historial
        return props.historial;
    }
    init()
    var historialLast = historial[historial.length-1]
    historial.pop()
    
</script>