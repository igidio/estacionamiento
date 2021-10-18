<template>
    <!-- {{tareas}} -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Matricula</th>
                <th scope="col">Póliza de seguro</th>
                <th scope="col">Color</th>
                <th scope="col">Tipo de vehículo</th>
                <th scope="col">Acciones</th>
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
            <tr v-for=" {id, marca, color, modelo, matricula, seguro, tipoVehiculo} in vehiculos" :key="id">
                <td>{{marca}}</td>
                <td>{{modelo}}</td>
                <td>{{matricula}}</td>
                <td>{{seguro}}</td>
                <td>{{color}}</td>
                <td>{{tipoVehiculo}}</td>
                <td>
                    <router-link :to="`/vehiculos/modificar/${id}`">
                        <button class="btn btn-warning mr-2">Editar</button>
                    </router-link>
                    <ModalEliminar texto="Eliminar" :id="id"/>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {cargarVehiculos} from '@/services/vehiculo'
import ModalEliminar from '@/components/Vehiculos/ModalEliminar'
export default {
    setup() {
        const vehiculos = cargarVehiculos()
        return {vehiculos}
    },
    components: {
        ModalEliminar
    }
}
</script>