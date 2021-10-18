<template>
    <!-- {{tareas}} -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col">F. y hora de registro</th>
                <th scope="col">Nombre de personal</th>
                <th scope="col">Matrícula</th>
                <th scope="col">Hora de Ingreso</th>
                <th scope="col">Hora de Salida</th>
                <th scope="col">Cargo de personal</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="vehiculos == ''">
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
            </tr>
            <tr v-for=" {id, nombres, placa, h_ingreso, h_salida, cargo, fhregistro} in registros" :key="id">
                <td>{{fhregistro}}</td>
                <td>{{nombres}}</td>
                <td>{{placa}}</td>
                <td>{{h_ingreso}}</td>
                <td>{{h_salida}}</td>
                <td> 
                    <span class="badge badge-pill badge-primary" v-if="cargo == 'Plantel docente'">·</span> 
                    <span class="badge badge-pill badge-warning" v-if="cargo == 'Miembro del personal administrativo'">·</span>
                    {{cargo}}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {cargarRegistros} from '@/services/registros'
export default {
    setup() {
        var registros = cargarRegistros()
        return {registros}
    }
}
</script>