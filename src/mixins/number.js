export default {
  methods: {
    formatPhoneNumber(value) {
      const phoneNumber = value.replace(/\D/g, '');
      if (phoneNumber.length > 9) {
        return value.substring(0, value.length - 1);
      }

      const formatValue = phoneNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '($1)$2-$3-$4');

      return formatValue;
    }
  }
};
