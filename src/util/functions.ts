export const dateValidation = (date: string) => {
  const regex = /^((([0-2][0-9])|([3][01]))[/](([0][1-9])|([1][0-2]))[/]([1-2][0-9]{3}))$/;
  return regex.test(date);
};

export const phoneValidation = (phone: string) => {
  const regex = /^([9][0-9]{8})$/;
  return regex.test(phone);
}

export const documentValidation = (document: string, type: string) => {
  const dniRegex = /^([0-9]{8})$/;
  const ceRegex = /^([0-9]{12})$/;
  if (type === 'dni') {
    return dniRegex.test(document)
  } else if (type === 'ce') {
    return ceRegex.test(document)
  }
}