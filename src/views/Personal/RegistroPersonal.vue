<template>
  <Breadcrumb :historial="bread"/>
  <div class="card">
    <div class="card-header">
      <span>Formulario</span>
    </div>
    <div class="card-body">
      <form @submit.prevent="subirFormulario">
        <InputPersonal :datos="miembroPersonal"/>
      </form>  
    </div>    
  </div>
</template>

<script>
import InputPersonal from '../../components/Personal/InputPersonal'
import {insertarPersonal} from '@/services/personal'
import { useRoute } from "vue-router";
import router from '../../router'
import Breadcrumb from '@/components/BreadCrumb'
export default {
  name: 'RegistroPersonal',
  components: { InputPersonal, Breadcrumb },
  data() {
    return {
      miembroPersonal: {
        id: { valor: '', max: 8 },
        nombres: { valor: '', max: 36 },
        apellidos: { valor: '', max: 36 },
        ci: { valor: '', max: 8 },
        cid:  'LP',
        licencia:  { valor: '', max: 8 },
        telefono:  { valor: '', max: 8 },
        tipo: 'Miembro del personal administrativo'
      },
      bread: [
        {direccion: 'Estacionamiento Unifranz', ruta:'/'},
        {direccion: 'Lista del Personal', ruta:'/personal'},
        {direccion:'Registro de personal',ruta:'/'}
      ]
    }
  },
  methods: {
    async subirFormulario(){
        await insertarPersonal({
            nombres: this.miembroPersonal.nombres.valor, 
            apellidos: this.miembroPersonal.apellidos.valor, 
            ci: this.miembroPersonal.ci.valor, 
            cid: this.miembroPersonal.cid,
            licencia: this.miembroPersonal.licencia.valor, 
            telefono: this.miembroPersonal.telefono.valor, 
            tipo: this.miembroPersonal.tipo, 
        })
        router.push("/personal")
    },
  }
}
</script>