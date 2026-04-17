import {apiConfig} from './api-config.js'

export async function scheduleCancel(id){
    try {
        const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        alert("Agendamento cancelado com sucesso.")
    } catch (error) {
        alert("Não foi possível cancelar o agendamento: " + error.message);
    }
}