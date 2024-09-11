import moment from 'moment';

// Calcular el estado del cumpleaños
export const getBirthdayStatus = (birthday) => {
  const today = moment();
  const birthdayDate = moment(birthday, 'YYYY-MM-DD');
  const thisYearBirthday = birthdayDate.year(today.year());

  if (today.isSame(thisYearBirthday, 'day')) {
    return { status: 'Hoy Cumpleaños', color: '#4CAF50' }; // Verde para hoy
  } else if (today.isAfter(thisYearBirthday, 'day')) {
    return { status: 'Pasado', color: '#F44336' }; // Rojo para pasado
  } else {
    const daysUntilBirthday = thisYearBirthday.diff(today, 'days');
    return {
      status: `${daysUntilBirthday} días`,
      color: '#2196F3', // Azul para futuro
      daysUntilBirthday,
    };
  }
};
