import React, { useContext, useState } from 'react';
import moment from 'moment';
import { Fab } from '@mui/material';
import { Add, CalendarMonth } from '@mui/icons-material';
import { Context } from 'App';
import Form from 'components/Form/index';
import DatePickerForm from 'components/DatePickerForm/index';
import styles from './CalendarPanel.module.scss';

const CalendarPanel = () => {
    const { setOpenForm, setToday, today } = useContext(Context);
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    return (
        <div className={styles.panel}>
            <div className={styles.container}>
                <Fab
                    size="small"
                    color='error'
                    aria-label="add"
                    onClick={() => setOpenForm(true)}>
                    <Add />
                </Fab>
                <Form />
                <div className={styles.panel__monthSwitch}>
                    <button className={styles.panel__button} onClick={() => setToday(moment())}>Now</button>
                    <div className={styles.panel__monthSwitch_container}>
                        <button className={styles.panel__button_switch} onClick={() => setToday(prev => prev.clone().subtract(1, 'month'))}>&lt;</button>
                        <h3>
                            <span>{today.format('MMMM')}</span>
                            <span>&nbsp;{today.format('YYYY')}</span>
                        </h3>
                        <button className={styles.panel__button_switch} onClick={() => setToday(prev => prev.clone().add(1, 'month'))}>&gt;</button>
                    </div>
                    <div className={styles.panel__datePicker}>
                        <CalendarMonth
                            fontSize='large'
                            color='error'
                            onClick={() => setDatePickerOpen(true)}
                        />
                    </div>
                    <DatePickerForm
                        datePickerOpen={datePickerOpen}
                        setDatePickerOpen={setDatePickerOpen}
                    />
                </div>
            </div>
        </div >
    );
};

export default CalendarPanel;