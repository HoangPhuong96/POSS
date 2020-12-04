export const CHANGE_MODE = 'CHANGE_MODE';

export const changeAppModeAction =  (input) => {
  return {
    type: CHANGE_MODE,
    data: input,
  };
};
