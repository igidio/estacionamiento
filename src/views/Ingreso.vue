<template>
    <div class="text-center">
        <img src="29751.png" alt="Imagen parkeo" class="float-center" height="250">
        <hr>
        <span style="font-weight-bold">Bienvenidos al</span><br>
        <span class="mb-3" style="font-weight: bold; font-size: 32px">Estacionamiento <span style="color: orange">UNIFRANZ</span></span>
    </div>

    <form @submit.prevent="procesarFormulario">
        <div class="card">
            <div class="card-header font-weight-bold">Ingreso de Usuarios</div>
            <div class="card-body">
                <label for="email">Correo electrónico</label>
                <input 
                    type="email" 
                    id="email"
                    placeholder="email"
                    class="form-control my-2"
                    v-model.trim="email"
                >
                <label for="email">Contraseña</label>
                <input 
                    type="password" 
                    placeholder="password"
                    class="form-control my-2"
                    v-model.trim="pass1"
                >
            </div>
                        
            <div class="card-footer">
                <button type="submit" class="btn btn-primary btn-lg btn-block mb-2" :disabled="bloquear">
                    Ingresar
                </button>
                <div class="text-center">
                    <p>No dispones de una cuenta, puedes <router-link :to="'/registro'">registrarte</router-link></p>
                </div>
            </div>
        </div>
    </form>

</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            email: '',
            pass1: '',
        }
    },
    computed: {
        bloquear(){
            if(!this.email.includes('@')){
                return true
            }
            if(this.pass1.length > 5){
                return false
            }
            return true
        }
    },
    methods: {
        ...mapActions(['ingresoUsuario']),
        procesarFormulario(){
            this.ingresoUsuario({email: this.email, password: this.pass1})
            this.email = '';
            this.pass1 = '';
        }
    }
}
</script>