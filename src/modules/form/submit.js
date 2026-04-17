import dayjs from 'dayjs';

import { SchedulesNew } from '../../services/schedule-new.js';
import { schedulesDay } from '../schedules/load.js';
import { SchedulesFetchByDay } from '../../services/schedule-fetch-by-day.js';

const form = document.querySelector('form');
const selectedDate = document.getElementById('date');
const clientName = document.getElementById('client');

const inputToday = dayjs(new Date()).format('YYYY-MM-DD');
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async event => {
  event.preventDefault();

  try {
    const name = clientName.value.trim();
    if (!name) return alert('Informe o nome do cliente!');

    const hourSelected = document.querySelector('.hour-selected');
    if (!hourSelected) return alert('Selecione a hora.');

    const date = selectedDate.value;
    const dailySchedules = await SchedulesFetchByDay({ date });

    const clientExists = dailySchedules.some(schedule => 
      schedule.name.toLowerCase() === name.toLowerCase()
    );

    if (clientExists) {
      return alert(`${name} já possui um agendamento no dia ${dayjs(date).format('DD/MM/YYYY')}.`);
    }

    const [hour] = hourSelected.innerText.split(':');
    const when = dayjs(date).add(hour, 'hour');
    const id = new Date().getTime();

    console.log('Enviando agendamento:', { id: String(id), name, when });
    await SchedulesNew({ id: String(id), name, when });
    await schedulesDay();
    clientName.value = '';
  } catch (error) {
    console.error('Erro ao agendar:', error);
    alert('Erro: ' + (error.message || 'Não foi possível realizar o agendamento.'));
  }
};