<template>
    <CampoLabel :nombre="'Tipo de vehículo'"/><CampoObligatorio/>    
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input
                name="vehiculo"
                type="radio"
                id="radio-1"
                class="form-check-input"
                value="Automóvil"
                checked="true"
                v-model="datos.tipoVehiculo"
                autocomplete="off"
            >
            <label for="radio-1" class="form-check-label">Es un automóvil</label>
        </div>
        <div class="form-check form-check-inline">
            <input
                name="vehiculo"
                type="radio"
                id="radio-2"
                class="form-check-input"
                value="Motocicleta"
                v-model="datos.tipoVehiculo"
                autocomplete="off"
            >
            <label for="radio-2" class="form-check-label">Es una motocicleta</label>
        </div>
    </div>

    <div class="row">
        <div class="col-6">
            <CampoLabel :nombre="'Marca'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <input 
                        id="marca"
                        type="text"
                        class="form-control my-2"
                        placeholder="Marca"
                        v-model="datos.marca.valor"
                        :maxlength="datos.marca.max"
                        @keypress="nombres($event)"
                        autocomplete="off"
                    >
                    <div class="input-group-text my-2" v-text="(datos.marca.max - datos.marca.valor.length)"></div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <CampoLabel :nombre="'Modelo'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <input 
                        id="marca"
                        type="text"
                        class="form-control my-2"
                        placeholder="Marca"
                        v-model="datos.modelo.valor"
                        :maxlength="datos.modelo.max"
                        autocomplete="off"
                    >
                    <div class="input-group-text my-2" v-text="(datos.modelo.max - datos.modelo.valor.length)"></div>
                </div>
            </div>    
        </div>
    </div>

    <div class="row">
        <div class="col-6">
            <CampoLabel :nombre="'Matricula'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <input 
                        id="matricula"
                        type="text"
                        class="form-control my-2"
                        v-model="datos.matricula.valor"
                        :maxlength="datos.matricula.max"
                        @keypress="matricula($event)"
                        autocomplete="off"
                    >
                    <div class="input-group-text my-2" v-text="(datos.matricula.max - datos.matricula.valor.length)"></div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <CampoLabel :nombre="'P. de Seguro'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <input 
                        id="matricula"
                        type="text"
                        class="form-control my-2"
                        v-model="datos.seguro.valor"
                        :maxlength="datos.seguro.max"
                        autocomplete="off"
                    >
                    <div class="input-group-text my-2" v-text="(datos.seguro.max - datos.seguro.valor.length)"></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-6">
            <CampoLabel :nombre="'Color'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <select name="datos" v-model="datos.color" class="form-control">
                        <option value="Azul">Azul</option>
                        <option value="Rojo">Rojo</option>
                        <option value="Negro">Negro</option>
                        <option value="Blanco">Blanco</option>
                        <option value="Cromado">Cromado</option>
                        <option value="Gris">Gris</option>
                        <option value="Verde">Verde</option>
                        <option value="Naranja">Naranja</option>
                        <option value="Amarillo">Amarillo</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-6" v-show="isMoto">
            <CampoLabel :nombre="'Tipo de Vehículo'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <select name="datos" v-model="datos.tipoAutomovil" class="form-control">
                        <option value="Familiar">Familiar</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Camioneta">Camioneta</option>
                        <option value="Van">Van</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <button class="btn btn-primary mt-2 btn-block" type="submit" :disabled="bloquear" @click="toast">Introducir</button>
</template>

<script>
import formularioMixins from "@/mixins/formularioMixins";
import CampoObligatorio from '../../components/formulario/CampoObligatorio'
import CampoLabel from '../../components/formulario/CampoLabel'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
export default {
    mixins: [formularioMixins],
    components: {
        CampoObligatorio, CampoLabel
    },
    setup(){
        const toast = () => {
            createToast('Datos introducidos correctamente', {
                    toastBackgroundColor: 'gray'
                }
            );
        }
        return {toast}
    },
    props: {
        datos: Object
    },
    computed: {
        bloquear(){
            if( 
                this.datos.marca.valor.trim() != "" &&
                this.datos.modelo.valor.trim() != "" &&
                this.datos.matricula.valor.trim() != "" &&
                this.datos.seguro.valor.trim() != "" &&
                this.datos.tipoVehiculo != ""
            ){ return false; } else { return true; } 
        },
        isMoto(){
            if(this.datos.tipoVehiculo != 'Automóvil'){ 
                return false;
            } else { 
                return true; 
            }
        }
    }
}
</script>