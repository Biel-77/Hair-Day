import { apiConfig } from "./api-config.js";

export async function SchedulesNew({id, name, when}) {
    try {
        const url = `${apiConfig.baseURL}/schedules`;
        const payload = { id, name, when: when.format() };
        console.log('POST:', url, payload);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const error = await response.text();
            console.error('Erro na resposta:', error);
            throw new Error(`HTTP ${response.status}: ${error}`);
        }

        const data = await response.json();
        console.log('Agendamento criado:', data);
        alert("Agendamento criado com sucesso!");
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        throw error;
    }
}


