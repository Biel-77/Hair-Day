import{hoursLoad} from '../form/hours-load.js'
import { schedulesShow } from '../schedules/show.js'
import{SchedulesFetchByDay} from '../../services/schedule-fetch-by-day.js'
const selectedDate = document.getElementById('date')

export async function schedulesDay() {
    const date = selectedDate.value 

    //busca na api os agendamentos
    const dailySchedules = await SchedulesFetchByDay({date})

    //metodo para exibir os agendamentos
    schedulesShow({dailySchedules})
    //carrega as horas disponiveis
    hoursLoad({date, dailySchedules})
}