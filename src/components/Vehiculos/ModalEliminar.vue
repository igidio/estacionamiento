<template>

<button class="btn btn-danger" data-toggle="modal" :data-target="'#Eliminar' + id">
    Eliminar
</button>

<!-- Modal -->
<div class="modal fade" :id="'Eliminar' + id" tabindex="-1" role="dialog" :aria-labelledby="'Eliminar' + id" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <strong class="modal-title" id="exampleModalLabel">{{texto}}</strong>                
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">          
                <p class="font-weight-bold">¿Seguro desea eliminar este dato? (Vehículo)</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="toast(id)">Eliminar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {eliminarVehiculo} from '@/services/vehiculo'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
export default {
    props: {
        id: String,
        texto: String
    },
    setup() {
        const toast = (id) => {
            eliminarVehiculo(id)
            createToast('Datos eliminados correctamente', {
                    toastBackgroundColor: 'gray'
                }                
            );
        }
        return {eliminarVehiculo,toast}
    },
}
</script>