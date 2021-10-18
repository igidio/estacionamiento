import * as Fire from '@/services/firebaseDB'
import { ref, onUnmounted } from 'vue'

const collection = Fire.db.collection('vehiculos')

export const insertarVehiculo = vehiculo => {
    return collection.add(vehiculo)
}
export const obtenerVehiculo = async id => {
    const vehiculo = await collection.doc(id).get()
    return vehiculo.exists ? vehiculo.data() : null
}
export const actualizarVehiculo = (id,vehiculo) => {
    return collection.doc(id).update(vehiculo)
}
export const eliminarVehiculo = id => {
    return collection.doc(id).delete()
}
export const cargarVehiculos = () => {
    const vehiculos = ref([])
    const close = collection.onSnapshot(snapshot => {
        vehiculos.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return vehiculos
}