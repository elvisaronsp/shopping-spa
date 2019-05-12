import { FieldsOptions } from './../../../../Common/fields-options';
const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
          maxlength: 255
        }
      },
      active: {
        id: 'active',
        label: 'Ativo'
      }
};

export default fieldsOptions;
