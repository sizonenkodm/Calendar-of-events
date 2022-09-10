import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Context } from 'App';
import Day from 'components/Day/index';
import styles from './Month.module.scss';

const Month = (props) => {
    moment.updateLocale('en', { week: { dow: 1 } });

    const {
        startDay,
        endDay,
        tasks
    } = props;

    const { today } = useContext(Context);

    const month = [];
    const day = startDay.clone();

    while (!day.isAfter(endDay)) {
        month.push(day.clone());
        day.add(1, 'day');
    }

    const isCurrentDay = (day) => {
        return moment().isSame(day, 'day');
    }

    const isSelectedMonth = (month) => {
        return today.isSame(month, 'month');
    }

    return (
        <div className={styles.container}>
            <div className={styles.month}>
                {
                    month.map(el => (
                        <Day
                            key={el.format('DDMMYYYY')}
                            num={el.format('D')}
                            dayOfWeek={el.format('dddd')}
                            numOfDay={el.day()}
                            tasks={tasks.filter(task => (task.sort >= el.format('x') && task.sort <= el.clone().endOf('day').format('x')))}
                            isCurrentDay={isCurrentDay(el)}
                            isSelectedMonth={isSelectedMonth(el)}
                        />
                    ))
                }
            </div>
        </div>
    );
};

Month.propTypes = {
    startDay: PropTypes.object.isRequired,
    endDay: PropTypes.object.isRequired,
    tasks: PropTypes.array
}

Month.defaultProps = {
    tasks: []
}

export default Month;