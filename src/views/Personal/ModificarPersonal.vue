<template>
  <Breadcrumb :historial="bread"/>
  <div class="card">
    <div class="card-header">
      <span>Formulario</span>
    </div>
    <form @submit.prevent="subirFormulario">
    <div class="card-body">
        <InputPersonal :datos="miembroPersonal"/>
    </div>    
    </form>  
  </div>
</template>

<script>
import InputPersonal from '../../components/Personal/InputPersonal'
import { computed } from 'vue'
import {obtenerPersonal, actualizarPersonal} from '@/services/personal'
import { useRoute } from "vue-router";
import router from '../../router'
import Breadcrumb from '@/components/BreadCrumb'
export default {
  name: 'RegistroPersonal',
  components: { InputPersonal, Breadcrumb},
  mounted(){
    this.sobreescribir()
  },
  data() {
    return {
      miembroPersonal: {
        id: { valor: '', max: 8 },
        nombres: { valor: '', max: 36 },
        apellidos: { valor: '', max: 36 },
        ci: { valor: '', max: 8 },
        cid:  '',
        licencia:  { valor: '', max: 8 },
        telefono:  { valor: '', max: 8 },
        tipo: 'Miembro del personal administrativo'
      },
      bread: [
        {direccion: 'Estacionamiento Unifranz', ruta:'/'},
        {direccion: 'Lista del Personal', ruta:'/personal'},
        {direccion:'Modificar miembro del personal',ruta:'/'}
      ]
    }
  },
  methods: {
    async sobreescribir(){   
      const route = useRoute()
      const idActual = computed(() => route.params.id)
      const recibir = await obtenerPersonal(idActual.value)
      this.miembroPersonal.id = idActual._value;
      this.miembroPersonal.nombres.valor = recibir.nombres;
      this.miembroPersonal.apellidos.valor = recibir.apellidos;
      this.miembroPersonal.ci.valor = recibir.ci;
      this.miembroPersonal.cid = recibir.cid;
      this.miembroPersonal.licencia.valor = recibir.licencia;
      this.miembroPersonal.telefono.valor = recibir.telefono;
      this.miembroPersonal.tipo = recibir.tipo;
    },
    async subirFormulario(){        
      await actualizarPersonal(this.miembroPersonal.id, {
        nombres: this.miembroPersonal.nombres.valor, 
        apellidos: this.miembroPersonal.apellidos.valor, 
        ci: this.miembroPersonal.ci.valor, 
        cid: this.miembroPersonal.cid, 
        licencia: this.miembroPersonal.licencia.valor, 
        telefono: this.miembroPersonal.telefono.valor, 
        tipo: this.miembroPersonal.tipo
      })
    router.push("/personal")
    },
  }
}
</script>