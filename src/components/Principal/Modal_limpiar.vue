<template>
<button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#limpiar' + datos.id">
  <i class="fas fa-broom"></i>
</button>

<!-- Modal -->
<div class="modal fade" :id="'limpiar' + datos.id" tabindex="-1" role="dialog" :aria-labelledby="'limpiar' + datos.id" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <strong class="modal-title" id="exampleModalLabel">Limpiar información</strong>                
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <p class="font-weight-bold">¿Seguro desea limpiar estos campos?</p>
                <p>Al limpiarlos se borrará toda información presente en este campo.</p>        

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="limpiar(datos.id)">Limpiar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CampoLabel from '../../components/formulario/CampoLabel'
import {actualizarEspacio,registrarEspacio} from '@/services/espacios'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
export default {
    props: {
        datos: Object,
        texto: String
    },
    components: {
        CampoLabel
    },
    setup(){
        const toast = () => {
            createToast('Datos registrados y limpiados', {
                    toastBackgroundColor: 'gray'
                }
            );
        }
        return {toast}
    },
    methods: {
        async registrar(id){
            await registrarEspacio(id, {
                nombres: this.datos.nombres,
                placa: this.datos.placa,
                h_ingreso: this.datos.h_ingreso,
                h_salida: this.datos.h_salida,
                cargo: this.datos.cargo,
                fhregistro: this.horaActualAhora()
            })
            this.toast()
            
            this.limpiar(id)
        },
        async limpiar(id){            
            await actualizarEspacio(id, {
                nombres: '',
                placa: '',
                h_ingreso: '',
                h_salida: '',
                estado: 'Disponible',
                cargo: '',
            })
        },
        horaActualAhora(){
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

            var horaActual = date.getHours();
            horaActual = ("0" + horaActual).slice(-2);
            var minutosActual = date.getMinutes();
            minutosActual = ("0" + minutosActual).slice(-2);

            output = output + ' ' + horaActual + ':' + minutosActual

            return output
        }
    }
}
</script>