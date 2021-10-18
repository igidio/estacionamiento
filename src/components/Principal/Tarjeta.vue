<template>
    <div class="col-6">
        <div class="card border-primary mb-3">
            <div class="card-header">
                <strong>Espacio {{informacion.id}}</strong>                
                <span class="badge badge-danger float-right m-2" v-if="expirado">Estado: A sobrehora</span>
                <span class="badge badge-primary float-right m-2" v-else-if="estaActivo">Estado: Activo</span>
                <span class="badge badge-warning float-right m-2" v-else>Estado: Disponible</span>

            </div>
            <div class="card-body">
                <div v-if="estaActivo">
                    <div class="mt-2"><b>Ocupado por: </b> {{informacion.nombres}}</div>
                    <div class="mt-2"><b>Cargo del personal: </b> {{informacion.cargo}}</div>
                    <div class="mt-2"><b>Nombres: </b> {{informacion.nombres}}</div>
                    <div class="mt-2"><b>Vehículo utilizado: </b> {{informacion.placa}}</div>
                    <div class="mt-2"><b>Hora de ingreso: </b> {{informacion.h_ingreso}}</div>
                    <div class="mt-2"><b>Hora de salida: </b> {{informacion.h_salida}}</div>
                </div>
                <div v-else>
                    <div class="jumbotron">Este espacio aún no fue asignado, puedes asignar uno pulsando el botón de abajo</div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row" v-if="estaActivo">
                    <div class="col">
                        <!-- <BotonModificar :texto="'Modificar'" :id="informacion.id" :nombres="informacion.nombres" :docenteDisponible="docenteDisponible"/> -->
                        <ModalLimpiar :datos="informacion"/>
                    </div>
                    <div class="col-10">
                        <ModalFinalizar :texto="'Completar ciclo'" :datos="informacion"/>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col">
                        <BotonModificar :texto="'Asignar'" :id="informacion.id" :docenteDisponible="docenteDisponible"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BotonModificar from '@/components/Principal/Boton_modificar'
import ModalFinalizar from '@/components/Principal/Modal_finalizar'
import ModalLimpiar from '@/components/Principal/Modal_limpiar'
export default {
    props: {
        informacion: Object,
        docenteDisponible: Boolean
    },
    data() {
        return {
            horaDeAhora: '',
            expirado: false
        }
    },
    components: {
        BotonModificar, ModalFinalizar, ModalLimpiar
    },
    created() {
        setInterval(() => {
            this.obtenerHoraDeAhora();
        }, 1000)
    },
    methods: {
        obtenerHoraDeAhora(){
            var ahora = new Date();
            var horaActual = ahora.getHours();
            horaActual = ("0" + horaActual).slice(-2);

            var minutoActual = ahora.getMinutes();
            minutoActual = ("0" + minutoActual).slice(-2);

            ahora = horaActual + ':' + minutoActual
            this.horaDeAhora = ahora
            this.compararHora(this.horaDeAhora, this.informacion.h_salida)
        },

        compararHora(ahora, horaLimite){
            if(horaLimite != ""){

                var fecha = "01/01/2021"

                var hActual = new Date(fecha + " " + ahora);
                var hLimite = new Date(fecha + " " + horaLimite);
                if(hActual >= hLimite ){
                    this.expirado = true
                    //alert("Ya es hora");
                }
            }
        }
    },
    computed: {
        estaActivo(){
            return this.informacion.nombres != '' ? true : false
        },

    }
}
</script>