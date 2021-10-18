import * as Fire from '@/services/firebaseDB'
import { ref, onUnmounted } from 'vue'

const collection = Fire.db.collection('registros').orderBy("fhregistro", "desc")

export const cargarRegistros = () => {
    var registros = ref([])
    const close = collection.onSnapshot(snapshot => {
        registros.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })

    onUnmounted(close)
    return registros
}