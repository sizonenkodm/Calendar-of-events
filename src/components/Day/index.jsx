import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from 'App';
import styles from './Day.module.scss';

const Day = (props) => {
    const {
        num,
        dayOfWeek,
        numOfDay,
        tasks,
        isCurrentDay,
        isSelectedMonth
    } = props;

    const { setOpenForm, setTaskForUpdate } = useContext(Context);

    tasks.sort((a, b) => Date.parse(`${a.date} ${a.time}`) > Date.parse(`${b.date} ${b.time}`) ? 1 : -1);

    return (
        <div
            className={
                isSelectedMonth
                    ? isCurrentDay
                        ? styles.day__current
                        : (numOfDay === 0 || numOfDay === 6)
                            ? styles.day__weekend
                            : styles.day
                    : styles.day__fromNotSelectedMonth
            }
        >
            <div>
                <div className={styles.day__header}>
                    <span>{num}</span>
                    <span>{dayOfWeek.slice(0, 2)}</span>
                </div>
            </div>
            <ul className={styles.day__taskList}>
                {
                    tasks.map(task => (
                        <li className={styles.day__task} key={task.id}>
                            <button
                                className={styles.day__task_btn}
                                onClick={() => {
                                    setTaskForUpdate(task);
                                    setOpenForm(true);
                                }}
                            >
                                <span>{task.time} - {task.title}</span>
                            </button>
                        </li>
                    ))
                }
            </ul >
        </div>
    );
};

Day.propTypes = {
    num: PropTypes.string.isRequired,
    dayOfWeek: PropTypes.string.isRequired,
    numOfDay: PropTypes.number.isRequired,
    tasks: PropTypes.array,
    isCurrentDay: PropTypes.bool.isRequired,
    isSelectedMonth: PropTypes.bool.isRequired
}

Day.defaultProps = {
    tasks: []
}

export default Day;