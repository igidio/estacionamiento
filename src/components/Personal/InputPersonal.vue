<template>
    <div class="row">
        <div class="col-6">
            <CampoLabel :nombre="'Nombres'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <input 
                        id="nombres"
                        type="text"
                        class="form-control my-2"
                        placeholder="Nombre1 Nombre2"
                        v-model="datos.nombres.valor"
                        @keypress="nombres($event)"
                        :maxlength="datos.nombres.max"
                        autocomplete="off"
                    >
                    <div class="input-group-text my-2" v-text="(datos.nombres.max - datos.nombres.valor.length)"></div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <CampoLabel :nombre="'Apellidos'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <input 
                        id="apellido"
                        type="text"
                        class="form-control my-2"
                        placeholder="Apellido1 Apellido2"
                        v-model="datos.apellidos.valor"
                        @keypress="nombres($event)"
                        :maxlength="datos.apellidos.max"
                        autocomplete="off"
                    >
                    <div class="input-group-text my-2" v-text="(datos.apellidos.max - datos.apellidos.valor.length)"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <CampoLabel :nombre="'CI'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-text my-2" v-text="(datos.ci.max - datos.ci.valor.length)"></div>
                    <input 
                        id="ci"
                        type="text"
                        placeholder="Ej. 12345678"
                        class="form-control my-2"
                        v-model="datos.ci.valor"
                        v-on:keypress="numeros($event)"
                        :maxlength="datos.ci.max"
                        autocomplete="off"
                    >
                    <div class="input-group-append">
                        <select class="form-control my-2" id="cid" v-model="datos.cid">
                            <option value="LP">LP</option>
                            <option value="SC">SC</option>
                            <option value="CB">CB</option>
                            <option value="PT">PT</option>
                            <option value="OR">OR</option>
                            <option value="TJ">TJ</option>
                            <option value="CH">CH</option>
                            <option value="BE">BE</option>
                            <option value="PD">PD</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-4">
            <CampoLabel :nombre="'Licencia de conducir'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <input 
                        id="licencia"
                        type="text"
                        placeholder="Ej. 12345678"
                        class="form-control my-2"
                        v-model="datos.licencia.valor"
                        v-on:keypress="numeros($event)"
                        :maxlength="datos.licencia.max"
                        autocomplete="off"
                    >        
                    <div class="input-group-text my-2" v-text="(datos.licencia.max - datos.licencia.valor.length)"></div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <CampoLabel :nombre="'Número telefónico'"/><CampoObligatorio/>
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-text my-2">+591</div>
                    <input 
                        id="telefono"
                        type="text"
                        placeholder="Ej. 76543210"
                        class="form-control my-2"
                        v-model="datos.telefono.valor"
                        v-on:keypress="numeros($event)"
                        :maxlength="datos.telefono.max"
                        autocomplete="off"
                    >        
                    <div class="input-group-text my-2" v-text="(datos.telefono.max - datos.telefono.valor.length)"></div>
                </div>
            </div>
        </div>        
    </div>
        
    <CampoLabel :nombre="'Tipo de personal'"/><CampoObligatorio/>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input
                name="tipo-personal"
                type="radio"
                id="radio-1"
                class="form-check-input"
                value="Miembro del personal administrativo"
                checked="true"
                v-model="datos.tipo"
            >
            <label for="radio-1" class="form-check-label">Miembro del personal administrativo</label>
        </div>
        <div class="form-check form-check-inline">
            <input
                name="tipo-personal"
                type="radio"
                id="radio-2"
                class="form-check-input"
                value="Plantel docente"
                v-model="datos.tipo"
            >
            <label for="radio-2" class="form-check-label">Plantel docente</label>
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
                this.datos.nombres.valor.trim() != "" &&
                this.datos.apellidos.valor.trim() != "" &&
                this.datos.ci.valor != 0 &&
                this.datos.licencia.valor != 0 &&
                this.datos.telefono.valor != ""
            ){
                return false; } else { return true; } 
        },        
    }
}

</script>