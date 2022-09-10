import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextField, DialogContent, DialogActions, Button, MenuItem } from '@mui/material';
import { Context } from 'App';

const monthes = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October', },
    { value: 11, label: 'November', },
    { value: 12, label: 'December', },
];

const DatePickerForm = (props) => {
    const {
        datePickerOpen,
        setDatePickerOpen
    } = props;

    const { setToday, today } = useContext(Context);

    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);

    const handleChangeDate = () => {
        const monthDifference = selectedMonth - today.format('M');
        const yearDifference = selectedYear - today.format('YYYY');

        if (monthDifference) setToday(prev => prev.clone().add(monthDifference, 'month'));
        if (yearDifference) setToday(prev => prev.clone().add(yearDifference, 'year'));

        setTimeout(() => {
            setDatePickerOpen(false);
        }, 300);
    }

    useEffect(() => {
        setSelectedMonth(today.format('M'));
        setSelectedYear(today.format('YYYY'));
    }, [today]);

    return (
        <Dialog
            open={datePickerOpen}
            onClose={() => { setDatePickerOpen(false) }}
        >
            <DialogContent>
                <TextField
                    id="month"
                    label="Month"
                    select
                    value={selectedMonth}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => setSelectedMonth(event.target.value)}
                >
                    {monthes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="year"
                    label="Year"
                    type="text"
                    value={selectedYear}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => setSelectedYear(event.target.value)}
                    onInput={(event) => event.target.value = event.target.value.replace(/[^\d]/, '')}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setDatePickerOpen(false) }}>Cancel</Button>
                <Button onClick={handleChangeDate}>Select</Button>
            </DialogActions>
        </Dialog>
    );
};

DatePickerForm.propTypes = {
    datePickerOpen: PropTypes.bool.isRequired,
    setDatePickerOpen: PropTypes.func.isRequired
}

export default DatePickerForm;