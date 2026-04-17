import{hoursLoad} from '../form/hours-load.js'
import { schedulesShow } from '../schedules/show.js'
import{SchedulesFetchByDay} from '../../services/schedule-fetch-by-day.js'
const selectedDate = document.getElementById('date')

export async function schedulesDay() {
    const date = selectedDate.value;
    const dailySchedules = await SchedulesFetchByDay({date});
    schedulesShow({dailySchedules});
    hoursLoad({date, dailySchedules});
}