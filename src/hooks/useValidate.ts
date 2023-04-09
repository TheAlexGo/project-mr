import { useEffect, useState } from 'react';

import { useController } from '@hooks/useController';
import { ValidateTypes } from '@services/ValidateService';

export const useValidate = (value: string, type: ValidateTypes): string | null => {
    const [error, setError] = useState<string | null>(null);

    const { validateService } = useController();

    useEffect(() => {
        switch (type) {
            case ValidateTypes.PASSWORD:
                setError(validateService.checkPassword(value));
                break;
            case ValidateTypes.EMAIL:
                setError(validateService.checkEmail(value));
                break;
            case ValidateTypes.UNKNOWN:
                setError(validateService.checkUnknown());
                break;
        }
    }, [type, validateService, value]);

    return error;
};
