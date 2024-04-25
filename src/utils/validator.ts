export const validatorId = (id: string): boolean => {
  return id.length >= 4;
};

export const validatorEmail = (id: string): boolean => {
  return id.length >= 4;
};

export const validatorPassword = (password: string): boolean => {
  return password.length >= 4;
};
