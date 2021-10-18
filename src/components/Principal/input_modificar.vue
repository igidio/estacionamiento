<template>
<div class="alert alert-danger" v-if="disponibleDocentes == 0  && disponibleDocentes !== null">No se pueden agregar más miembros del tipo "Plantel docente"</div>
<div class="card mt-4">
    <div class="card-header">
        <span class="font-weight-bold">Formulario (Espacio {{datos.id}})</span>
    </div>
    <div class="card-body">
    
        <form @submit.prevent="subirFormulario">        
            <div class="row">
                <div class="col-12">
                    <CampoLabel :nombre="'Miembro del personal'"/>
                    <div class="form-group">
                        <div class="input-group">
                            <select name="datos" class="form-control" v-model="datos.informacion.personal" @change="obtenerCargo(datos.informacion.personal)">
                                <option value="" disabled>-- Selecciona una opción --</option>
                                <option v-for="{id,nombres, apellidos} in personal" :key="id" :value="nombres + ' ' + apellidos">{{nombres + ' ' + apellidos}}</option>
                            </select>
                        </div>
                        {{datos.informacion.cargo}}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <CampoLabel :nombre="'Vehiculo'"/>
                    <div class="form-group">
                        <div class="input-group">
                            <select name="datos"  class="form-control" v-model="datos.informacion.vehiculo">
                                <option value="" disabled selected>-- Selecciona una opción --</option>
                                <option v-for="{id,matricula, marca, modelo} in vehiculos" :key="id" :value="matricula">{{matricula}} {{matricula}} {{"(" + marca + ", " + modelo + ")"}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <CampoLabel :nombre="'Hora de finalización'"/>
                    <div class="row">
                        <div class="col-3">
                            <CampoLabel :nombre="'Hora límite'"/>
                            <div class="form-group">
                                <div class="input-group">
                                    <select name="datos" class="form-control" v-model="datos.horalimite">
                                        <option value="" disabled selected>--</option>
                                        <option :value="nuevaHora(n)" v-for="n in horaLimite()" :key="n">{{ nuevaHora(n) }}</option>                                    
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <CampoLabel :nombre="'Minuto límite'"/>
                            <div class="form-group">
                                <div class="input-group">
                                    <select name="datos" class="form-control" v-model="datos.minutoslimite">
                                        <option value="" disabled selected>--</option>
                                        <option value="00">00</option>
                                        <option value="05">05</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="25">25</option>
                                        <option value="30">30</option>
                                        <option value="35">35</option>
                                        <option value="40">40</option>
                                        <option value="45">45</option>
                                        <option value="50">50</option>
                                        <option value="50">50</option>
                                        <option value="55">55</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <CampoLabel :nombre="'Rango de horas seleccionado'"/>
                    <br>
                    <div class="h3" v-if="(datos.horalimite == '') || (datos.minutoslimite == '')">
                        {{horaActual() + ' - ' + 'Definir hora de finalización'}}
                    </div>
                    <div class="h3" v-else>
                        {{horaActual() + ' - ' + datos.horalimite + ':' + datos.minutoslimite}}
                    </div>
                    
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-primary btn-block" type="submit" :disabled="bloquear" @click="toast">Modificar</button>
                </div>
            </div>
        </form>
    </div>
</div>

</template>

<script>
import { computed } from 'vue'
import { useRoute } from "vue-router";
import {cargarPersonal,cargarVehiculos,cargarEspacios} from '@/services/espacios'
import {actualizarEspacio} from '@/services/espacios'
import CampoLabel from '../../components/formulario/CampoLabel'
import router from '../../router'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
export default {
    setup() {
        var espacios = cargarEspacios()
        var personal = cargarPersonal()
        var vehiculos = cargarVehiculos()

        var executing = (espacios) => {
            console.log(espacios.value)
        }

        executing(espacios)

        const toast = () => {
            createToast('Datos introducidos correctamente', {
                    toastBackgroundColor: 'gray'
                }
            );
        }
        return {personal,vehiculos,espacios,toast}
    },
    props: {
        texto: String,
        //docenteDisponible: Boolean,
    },
    mounted(){        
        this.sobreescribir()
    },
    components: {
        CampoLabel
    },
    data() {
        return {            
            datos: {
                informacion: {
                    personal: '',
                    vehiculo: '',
                    cargo: '',
                    matricula: '',
                },
                ahora: '',
                horalimite: '',
                minutoslimite: '',
                id: '',
                disponibleDocentes: null,
            },
            vehiculosExistentes: [],
            personalExistentes: [],
            datosCambiados: false
        }
    },
    updated(){        
        this.obtenerEspaciosDisponibles()
        this.listaExistentes()
        if(!this.datosCambiados && this.vehiculos.length != 0 && this.personal.length != 0){
            this.cortarDisponibles(this.vehiculos, this.personal)
        }        
    },
    methods: {
        listaExistentes(){
            this.vehiculosExistentes = []
            this.personalExistentes = []
            
            this.espacios.forEach(espacio => {
                if(espacio.placa != ""){
                this.vehiculosExistentes.push(espacio.placa)
                }
            });

            this.espacios.forEach(espacio => {
                if(espacio.nombres != ""){
                this.personalExistentes.push(espacio.nombres)
                }
            });
        },
        cortarDisponibles(vehiculos, personal){
            this.vehiculosExistentes.forEach(veh => {
                for (let index = 0; index < this.vehiculos.length; index++) {
                    if (veh == this.vehiculos[index].matricula) {
                        //console.log(this.vehiculos[index].matricula)                            
                        this.vehiculos.splice(index, 1); 
                    }
                }
            })

            this.personalExistentes.forEach(per => {
                for (let index = 0; index < this.personal.length; index++) {
                    if (per == this.personal[index].nombres + ' ' + this.personal[index].apellidos) {
                        //console.log(this.vehiculos[index].matricula)                            
                        this.personal.splice(index, 1); 
                    }
                }
            })

            this.datosCambiados = true
        },
        obtenerEspaciosDisponibles(){
            this.disponibleDocentes = parseInt(this.espacios.length * 0.6) - this.espacios.filter(espacio => espacio.cargo == "Plantel docente").length
        },
        sobreescribir(){
            const route = useRoute()
            const idActual = computed(() => route.params.id)
            this.datos.id=idActual
        },
        horaActual() {
            var hoy = new Date();
            var horaActual = hoy.getHours();
            horaActual = ("0" + horaActual).slice(-2);
            var minutosActual = hoy.getMinutes();
            minutosActual = ("0" + minutosActual).slice(-2);

            var total = horaActual + ':' + minutosActual
            this.datos.ahora = total;
            return total;
        },
        nuevaHora(sumar){
            var hoy = new Date();
            var adicionar = new Date(hoy.setHours(hoy.getHours() + sumar));
            var hora = adicionar.getHours();
            return hora
        },
        horaLimite(){
            var horas = 0;

            var hoy = new Date();
            var adicionar = new Date(hoy.setHours(hoy.getHours() + 1));
            var hora = adicionar.getHours();
            while(hora <= 22){
                adicionar = new Date(hoy.setHours(hoy.getHours() + 1));
                hora = adicionar.getHours();
                horas++;
            }
            return horas;
        },
        async subirFormulario(){
            await actualizarEspacio(this.datos.id, {
                nombres: this.datos.informacion.personal,
                placa: this.datos.informacion.vehiculo,
                h_ingreso: this.datos.ahora,
                h_salida: this.datos.horalimite + ':' + this.datos.minutoslimite,
                estado: 'Activo',
                cargo: this.datos.informacion.cargo,
            })
            router.push("/")
        },
        obtenerCargo(nombre){
            this.personal.forEach(element => {
                if(nombre == (element.nombres + ' ' + element.apellidos) ){
                    this.datos.informacion.cargo = element.tipo
                    return element;
                }
            });
        },
    },
    computed: {
        bloquear(){
            if(
                this.datos.informacion.personal.trim() != "" &&
                this.datos.informacion.vehiculo.trim() != "" &&
                this.datos.horalimite != "" &&
                this.datos.minutoslimite != ""            
            ){
                if(this.disponibleDocentes === 0 && this.datos.informacion.cargo == 'Plantel docente'){
                    return true;
                } else {
                    return false;
                }
            } else {                
                return true;
            } 
        },
        comprobarDocentes(){
            if (this.disponibleDocentes > 0){
                this.boolDisponibilidad = false;
                return true;
            } else if(this.disponibleDocentes === 0) {
                this.boolDisponibilidad = true;
                return false;

            }
        }
    }
}
</script>