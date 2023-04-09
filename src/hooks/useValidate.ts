import { useEffect, useState } from 'react';

import { useController } from '@hooks/useController';
import { ValidateTypes } from '@services/ValidateService';

export const useValidate = (value: string, type: ValidateTypes) => {
    const [error, setError] = useState<string>('');

    const { validateService } = useController();

    useEffect(() => {
        if (!value) {
            return;
        }
        switch (type) {
            case ValidateTypes.PASSWORD:
                setError(validateService.checkPassword(value));
                break;
            case ValidateTypes.UNKNOWN:
                setError(validateService.checkUnknown());
                break;
        }
    }, [type, validateService, value]);

    return error;
};
