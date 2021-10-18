<template>
  <Breadcrumb :historial="bread"/>
  <div class="card">
    <div class="card-header">
      <span>Formulario</span>
    </div>
    <div class="card-body">
      <form @submit.prevent="subirFormulario">
      <InputVehiculo :datos="vehiculo"/>
      </form> 
    </div>
  </div>
</template>

<script>
import InputVehiculo from '../../components/Vehiculos/InputVehiculo';
import { computed } from 'vue'
import {obtenerVehiculo, actualizarVehiculo} from '@/services/vehiculo'
import { useRoute } from "vue-router";
import router from '../../router'
import Breadcrumb from '@/components/BreadCrumb'
export default {
    name: 'RegistroVehiculos',
    components: {
        InputVehiculo, Breadcrumb
    },
    mounted(){
        this.sobreescribir()
    },
    data() {
        return {
            vehiculo: {
                id: null,
                tipoVehiculo: 'Automóvil',
                marca: { valor: '', max: 15},
                modelo:  { valor: '', max: 20},
                matricula:  { valor: '', max: 10},
                seguro:  { valor: '', max: 10},
                color:  'Azul',
                tipoAutomovil: 'Familiar',
            },
            bread: [
                {direccion: 'Estacionamiento Unifranz', ruta:'/'},
                {direccion: 'Lista de Vehículos Registrados', ruta:'/vehiculos'},
                {direccion:'Modificar vehículo',ruta:'/'}
            ]

        }
    },
  methods: {
    async sobreescribir(){   
        const route = useRoute()
        const idActual = computed(() => route.params.id)
        const recibir = await obtenerVehiculo(idActual.value)
        this.vehiculo.id = idActual._value;
        this.vehiculo.tipoVehiculo = recibir.tipoVehiculo;
        this.vehiculo.marca.valor = recibir.marca;
        this.vehiculo.modelo.valor = recibir.modelo;
        this.vehiculo.matricula.valor = recibir.matricula;
        this.vehiculo.seguro.valor = recibir.seguro;
        this.vehiculo.color = recibir.color;
        this.vehiculo.tipoAutomovil = recibir.tipoAutomovil;
    },
    async subirFormulario(){
        
        if(this.vehiculo.tipoVehiculo == 'Automovil'){
            await actualizarVehiculo(this.vehiculo.id, {
                tipoVehiculo: this.vehiculo.tipoVehiculo, 
                marca: this.vehiculo.marca.valor, 
                modelo: this.vehiculo.modelo.valor, 
                matricula: this.vehiculo.matricula.valor, 
                seguro: this.vehiculo.seguro.valor, 
                color: this.vehiculo.color, 
                tipoAutomovil: this.vehiculo.tipoAutomovil
            })
        } else {
            await actualizarVehiculo(this.vehiculo.id, {
                tipoVehiculo: this.vehiculo.tipoVehiculo, 
                marca: this.vehiculo.marca.valor, 
                modelo: this.vehiculo.modelo.valor, 
                matricula: this.vehiculo.matricula.valor, 
                seguro: this.vehiculo.seguro.valor, 
                color: this.vehiculo.color, 
            })
        }
        router.push("/vehiculos")
    },
  }
}
</script>