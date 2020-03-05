import React, { useState } from "react";
// import SnoozeIcon from "@material-ui/icons/Snooze";
// import AlarmIcon from "@material-ui/icons/AddAlarm";
// import { IconButton, InputAdornment } from "@material-ui/core";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import { InputAdornment, IconButton } from "@material-ui/core";
import AlarmIcon from '@material-ui/icons/Alarm';

export interface IDateTimeInputProps {
  label: string;
  currentDate?: number | null;
  handleCurrentDateChange?: (value: number | null) => void;
}
function DateTimeInput(props: IDateTimeInputProps) {
  const {label, currentDate = null, handleCurrentDateChange} = props;
  // const [currentDate, handlecurrentDateChange] = useState<Date | null>(null);
  const now: number = new Date().getTime();

  const minimumDueDate: number = !!currentDate && currentDate < now ? currentDate : now;
  return (
      <DateTimePicker
        clearable
        value={currentDate}
        onChange={value => !!handleCurrentDateChange && handleCurrentDateChange(value?.getTime() || null)}
        label={label}
        minDate={minimumDueDate}
        // format="yyyy/MM/dd hh:mm a"
        format="MMM dd, yyyy hh:mm a"
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <AlarmIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        // helperText="Clear Initial State"
      />
  );
}

export default DateTimeInput;