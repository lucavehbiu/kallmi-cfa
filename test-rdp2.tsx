import React from 'react';
import { DayPicker, DayButton } from 'react-day-picker';
export const Test = () => {
    return <DayPicker components={{
        DayButton: (props) => {
            console.log(props.day.date);
            return <DayButton {...props} />
        }
    }} />
};
