import React from 'react';
import {getReadableDateFormat} from "../../../utils";

interface ITimestampGroupItem {
  created_at: string | Date,
  updated_at: string | Date
}

const TimestampGroupItem = ({created_at, updated_at}: ITimestampGroupItem) => {
  return (
    <div className="list-group-item">
      <small className="text-muted">Создано: <br/>
        {getReadableDateFormat(created_at)}, <br/>
        Последний раз обновлено: <br/>
        {getReadableDateFormat(updated_at)}
      </small>
    </div>
  );
};

export default TimestampGroupItem;