import React, { useState, useEffect, createContext } from 'react';
import moment from 'moment';
import { getTasks } from 'utils/axios_utils';
import Header from 'components/Header/index';
import Month from 'components/Month/index';
import CalendarPanel from 'components/CalendarPanel/index';


export const Context = createContext(null);

function setDefaultCalendarValue() {
	const todaySaved = localStorage.getItem('today');
	return (
		todaySaved ? moment(JSON.parse(todaySaved)) : moment()
	);
}

function App() {
	moment.updateLocale('en', { week: { dow: 1 } });

	const [today, setToday] = useState(setDefaultCalendarValue());
	const [tasks, setTasks] = useState([]);
	const [taskForUpdate, setTaskForUpdate] = useState({});
	const [openForm, setOpenForm] = useState(false);
	const [updatingTasks, setUpdatingTasks] = useState(false);

	const startDay = today.clone().startOf('month').startOf('week');
	const endDay = today.clone().endOf('month').endOf('week');

	const startDayQuery = startDay.clone().format('x');
	const endDayQuery = endDay.clone().format('x');

	useEffect(() => {
		getTasks(startDayQuery, endDayQuery)
			.then(response => {
				setTasks(response.data);
				console.log(response.data);
			});
		localStorage.setItem('today', JSON.stringify(today));
	}, [today, updatingTasks]);

	return (
		<div className='container'>
			<Header />
			<Context.Provider value={{
				openForm,
				setOpenForm,
				today,
				setToday,
				taskForUpdate,
				setTaskForUpdate,
				setTasks,
				setUpdatingTasks
			}}>
				<CalendarPanel />
				<Month
					startDay={startDay}
					endDay={endDay}
					tasks={tasks}
				/>
			</Context.Provider>
		</div>
	);
}

export default App;
