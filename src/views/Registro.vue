<template>

    <h1 class="my-3 font-weight-bold">Registro de Usuarios <hr></h1>
    <div class="card">
        <div class="card-header">
            Llene los campos indicados abajo
        </div>
        <form @submit.prevent="procesarFormulario">
        <div class="card-body">
            <div class="form-group">
                <label for="email" class="font-weight-bold">Correo Electrónico</label>
                <input id="email" type="email" placeholder="Acá va el correo electrónico" class="form-control my-2" v-model.trim="email" autofill="off">
            </div>

            <div class="form-group">
                <label for="pass1" class="font-weight-bold">Contraseña</label>
                <input id="pass1" type="password" placeholder="Acá va la contraseña" class="form-control my-2" v-model.trim="pass1" autocomplete="new-password">
            </div>
            <div class="form-group">
                <label for="pass1" class="font-weight-bold">Repetir contraseña</label>
                <input type="password" placeholder="Vuelva a colocar la contreseña" class="form-control my-2" v-model.trim="pass2" autocomplete="new-password">
            </div>
        </div>
        <div class="card-footer">
            <button type="submit" class="btn btn-primary btn-block mb-3" :disabled="bloquear">Registrar</button>
            <div class="text-center">
                <span>¿Ya dispones de una cuenta?, puedes <router-link :to="'/ingreso'">iniciar sesión</router-link></span>
            </div>
        </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    computed: {
        bloquear(){
            if(!this.email.includes('@')){
                return true
            }
            if(this.pass1.length > 5 && this.pass1 === this.pass2){
                return false
            }
            return true
        }
    },
    methods: {
        ...mapActions(['registrarUsuario']),
        procesarFormulario(){
            this.registrarUsuario({email: this.email, password: this.pass1})
            this.email = '';
            this.pass1 = '';
            this.pass2 = '';
        }
    }
}
</script>