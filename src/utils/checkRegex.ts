export const checkInputRegex = (value: string, type: string) => {
   switch (type) {
      case 'number':
         return /^[0-9]+$/.test(value) ? value : value.replace(/[^0-9]/gi, '');
   }
};
