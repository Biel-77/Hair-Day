import { apiConfig } from "./api-config.js";

export async function SchedulesNew({id, name, when}) {
    try {
        await fetch(`${apiConfig.baseURL}/schedules`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, when: when.format() }),
        });
        alert("Agendamento criado com sucesso!")
    }catch (error) {
        alert("Erro ao criar novo agendamento: " + error.message)
    }
}


