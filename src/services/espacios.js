import * as Fire from '@/services/firebaseDB'
import { ref, onUnmounted } from 'vue'

const collection = Fire.db.collection('espacios')
const registros = Fire.db.collection('registros')

export const obtenerEspacio = async id => {
    const espacio = await collection.doc(id).get()
    return espacio.exists ? espacio.data() : null
}
export const actualizarEspacio = (id,espacio) => {
    return collection.doc(id).update(espacio)
}
export const registrarEspacio = (id, espacio) => {
    registros.add(espacio)
}
export const cargarEspacios = () => {
    const col = Fire.db.collection('espacios').orderBy('estado', 'asc')
    const espacios = ref([])
    const close = col.onSnapshot(snapshot => {
        espacios.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return espacios
}

export const cargarPersonal = () => {
    var col = Fire.db.collection('personal')
    const personal = ref([])
    const close = col.onSnapshot(snapshot => {
        personal.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return personal
}

export const cargarVehiculos = () => {
    const col = Fire.db.collection('vehiculos')
    const vehiculos = ref([])
    const close = col.onSnapshot(snapshot => {
        vehiculos.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return vehiculos
}
