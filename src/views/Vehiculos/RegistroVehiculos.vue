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
import {insertarVehiculo} from '@/services/vehiculo'
import router from '../../router'
import Breadcrumb from '@/components/BreadCrumb'
export default {
  name: 'RegistroVehiculos',
  components: {
    InputVehiculo, Breadcrumb
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
        {direccion:'Registro de vehículos',ruta:'/'}
      ]
    }
  },
  methods: {
    async subirFormulario(){
      if(this.vehiculo.tipoVehiculo == 'Automóvil'){
        await insertarVehiculo({
            tipoVehiculo: this.vehiculo.tipoVehiculo, 
            marca: this.vehiculo.marca.valor, 
            modelo: this.vehiculo.modelo.valor, 
            matricula: this.vehiculo.matricula.valor, 
            seguro: this.vehiculo.seguro.valor, 
            color: this.vehiculo.color, 
            tipoAutomovil: this.vehiculo.tipoAutomovil
        })
      } else if (this.vehiculo.tipoVehiculo == 'Motocicleta') {
        await insertarVehiculo({
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