import dayjs from 'dayjs';
import{ apiConfig } from './api-config.js'

export async function SchedulesFetchByDay({date}) {
    try {
        const response = await fetch(`${apiConfig.baseURL}/schedules`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.warn('API response is not an array:', data);
            return [];
        }

        const dailySchedules = data.filter((schedule) => 
            dayjs(date).isSame(schedule.when, 'day')
        );
        return dailySchedules;
    } catch (error) {
        alert("Erro ao buscar agendamentos: " + error.message);
        return [];
    }
}