import {format} from 'date-fns-tz';

const getCurrentDate = () =>
  format(new Date(), 'dd/MM/yyyy', {
    timeZone: 'America/Sao_Paulo',
  });

const getCurrentTime = () =>
  format(new Date(), 'HH:mm', {
    timeZone: 'America/Sao_Paulo',
  });

const getCurrentSecond = () =>
  format(new Date(), 'ss', {
    timeZone: 'America/Sao_Paulo',
  });

export {getCurrentDate, getCurrentTime, getCurrentSecond};
