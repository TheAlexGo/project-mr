import { useEffect, useState } from 'react';

import { useController } from '@hooks/useController';
import { ValidateTypes } from '@services/ValidateService';

export const useValidate = (
    type: ValidateTypes,
    firstValue: string,
    secondValue?: string,
    needValidate = true
): string | null => {
    const [error, setError] = useState<string | null>(null);

    const { validateService } = useController();

    useEffect(() => {
        if (!needValidate) {
            return;
        }
        switch (type) {
            case ValidateTypes.PASSWORD:
                setError(validateService.checkPassword(firstValue));
                break;
            case ValidateTypes.PASSWORD_MATCH:
                if (secondValue === undefined) {
                    break;
                }
                setError(validateService.checkPasswordMatch(firstValue, secondValue));
                break;
            case ValidateTypes.EMAIL:
                setError(validateService.checkEmail(firstValue));
                break;
            case ValidateTypes.UNKNOWN:
                setError(validateService.checkUnknown());
                break;
        }
    }, [type, validateService, firstValue, secondValue, needValidate]);

    return error;
};
