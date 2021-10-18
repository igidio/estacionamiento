<template>
  <Breadcrumb :historial="bread"/>

  <div class="alert alert-success" :class="[tope ? activeClass:'alert alert-danger', 'alert alert-success']">
    <h4 class="alert-heading"><strong>Información del estacionamiento</strong></h4>
    <div class="alert-body">
      <ul>
        <li v-if="disponibleDocentes != null">Espacios disponibles: <strong>{{disponibleDocentes}}</strong></li>
        <li v-if="actualVehiculos != 0 && vehiculos.length != 0">Vehiculos: <strong>{{actualVehiculos}} utilizados / {{vehiculos.length}} registrados</strong></li>
        <li v-if="actualPersonal != 0 && personal.length != 0">Personal: <strong>{{actualPersonal}} utilizados / {{personal.length}} registrados</strong></li>
      </ul>
      
      <div v-if="comprobarDocentes"><hr>La cantidad de espacios que pueden disponer el personal profesional es del 60%, ese porcentaje es equivalente a <strong>{{disponibleDocentes}}</strong></div>
      <div v-else-if="disponibleDocentes === 0"><hr>No se pueden agregar más miembros del tipo "Plantel docente"</div>
      <div v-if="!tope" class="font-weight-bold"><i class="fas fa-exclamation-triangle"></i> Límite de datos alcanzado, limpia/completa los espacios del estacionamiento o agrega nuevos miembros del personal, vehículos</div>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <router-link :to="'/historial'" class="btn btn-info btn-block mb-3">
        <i class="fas fa-history"></i> Ver registro de vehiculos
      </router-link>
    </div>
  </div>

  <div class="row">
    <div class="card-deck">
      <Tarjeta :informacion="espacio" v-for="espacio in espacios" :key="espacio" :docenteDisponible="boolDisponibilidad"/>
    </div>
  </div>
</template>

<script>
import Tarjeta from '../components/Principal/Tarjeta'
import {cargarEspacios,cargarPersonal,cargarVehiculos} from '@/services/espacios'
import Breadcrumb from '@/components/BreadCrumb'

export default {
  name: 'Home',
  components: {
    Tarjeta, Breadcrumb
  },
  data() {
    return {
      bread: [
          {direccion: 'Estacionamiento Unifranz', ruta:'/'}
      ],
      disponibleDocentes: null,
      boolDisponibilidad: false,      
    }
  },
  setup() {
    const espacios = cargarEspacios()
    var personal = cargarPersonal()
    var vehiculos = cargarVehiculos()
    return {espacios,personal,vehiculos}
  },
  updated(){
    this.obtenerEspaciosDisponibles()
    this.obtenerDatos()
  },
  methods: {
    obtenerEspaciosDisponibles(){
      this.disponibleDocentes = parseInt(this.espacios.length * 0.6) - this.espacios.filter(espacio => espacio.cargo == "Plantel docente").length
    },
    obtenerDatos(){
      console.log(this.personal)
      console.log(this.vehiculos)      
      
      //Obtener todos los miembros del personal
      //console.log("Personal actual: " + this.personal.length)
      //Obtener miembros de personal ocupando espacio
      this.actualPersonal =  this.espacios.filter(espacio => espacio.nombres != "").length
      //Obtener todos los vehiculos
      //console.log("Vehiculos: " + this.vehiculos.length)
      //Obtener vehiculos ocupando un espacio
      this.actualVehiculos = this.espacios.filter(espacio => espacio.placa != "").length

    },
    horaObtener(){
      var ahora = new Date();
      var horaActual = ahora.getHours();
      horaActual = ("0" + horaActual).slice(-2);

      var minutoActual = ahora.getMinutes();
      minutoActual = ("0" + minutoActual).slice(-2);

      var fecha = "01/01/2021"

      var fecha1 = new Date(fecha + " 11:30");
      var fecha2 = new Date(fecha + " 10:30");

      if(fecha1 >= fecha2 ){
          console.log("fecha1");
      }else{
          console.log("fecha2");
      }
    },
  },
  computed: {
    comprobarDocentes(){
      if (this.disponibleDocentes > 0){
        this.boolDisponibilidad = false;
        return true;
      } else if(this.disponibleDocentes === 0) {
        this.boolDisponibilidad = true;
        return false;

      }
    },
    tope(){
      if(this.actualVehiculos === this.vehiculos.length || this.actualPersonal === this.personal.length){
        return false
      } else {
        return true
      }
    }
  }
}
</script>
