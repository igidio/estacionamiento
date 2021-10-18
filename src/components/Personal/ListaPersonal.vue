<template>
    <!-- {{tareas}} -->
    <table class="table">
        <thead>
            <tr>
                <!-- <th scope="col">#</th> -->
                <th scope="col">Nombre completo</th>
                <th scope="col">CI</th>
                <th scope="col">Licencia de conducir</th>
                <th scope="col">Tipo de personal</th>
                <th scope="col">Número Telefónico</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>            
            <tr v-if="personal == ''">
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                
            </tr>
            <tr v-for=" {id, nombres, apellidos, ci, cid, licencia, telefono, tipo} in personal" :key="id">
                <!-- <td>{{id}}</td> -->
                <td>{{nombres}} {{apellidos}}</td>
                <td>{{ci}} {{cid}}</td>
                <td>{{licencia}}</td>
                <td>{{tipo}}</td>
                <td>{{telefono}}</td>
                <td>
                    <router-link :to="`/personal/modificar/${id}`">
                        <button class="btn btn-warning mr-2">Editar</button>
                    </router-link>
                    <ModalEliminar :texto="'Eliminar'" :id="id"/>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {cargarPersonal} from '@/services/personal'
import ModalEliminar from '@/components/Personal/ModalEliminar'
export default {
    setup() {
        const personal = cargarPersonal()
        return {personal}
    },
    components: {
        ModalEliminar
    }
}
</script>