import dayjs from 'dayjs';
import{ apiConfig } from './api-config.js'

export async function SchedulesFetchByDay({date}) {
    try {
        const url = `${apiConfig.baseURL}/schedules`;
        console.log('GET:', url, 'Date:', date);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const error = await response.text();
            console.error('Erro na resposta:', error);
            throw new Error(`HTTP ${response.status}: ${error}`);
        }

        const data = await response.json();
        console.log('Agendamentos recebidos:', data);

        if (!Array.isArray(data)) {
            console.warn('API response is not an array:', data);
            return [];
        }

        const dailySchedules = data.filter((schedule) => 
            dayjs(date).isSame(schedule.when, 'day')
        );
        console.log('Agendamentos do dia:', dailySchedules);
        return dailySchedules;
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        alert("Erro ao buscar agendamentos: " + error.message);
        return [];
    }
}