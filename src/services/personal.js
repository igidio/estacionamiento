import * as Fire from '@/services/firebaseDB'
import { ref, onUnmounted } from 'vue'

const collection = Fire.db.collection('personal')

export const insertarPersonal = miembroPersonal => {
    return collection.add(miembroPersonal)
}
export const obtenerPersonal = async id => {
    const miembroPersonal = await collection.doc(id).get()
    return miembroPersonal.exists ? miembroPersonal.data() : null
}
export const actualizarPersonal = (id,miembroPersonal) => {
    return collection.doc(id).update(miembroPersonal)
}
export const eliminarPersonal = id => {
    return collection.doc(id).delete()
}
export const cargarPersonal = () => {
    const personal = ref([])
    const close = collection.onSnapshot(snapshot => {
        personal.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return personal
}