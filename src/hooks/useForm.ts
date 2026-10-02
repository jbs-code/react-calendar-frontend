import { useEffect, useMemo, useState, type ChangeEvent } from "react";

export const useForm = (
    initialForm: Record<string, any> = {},
    formValidations: Record<string, [(value: any) => boolean, string]> = {},
) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState<
        Record<string, string | null>
    >({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation]);

    const onInputChange = ({
        target,
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckedValues: Record<string, string | null> = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField])
                ? null
                : errorMessage;
        }

        setFormValidation(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    };
};
