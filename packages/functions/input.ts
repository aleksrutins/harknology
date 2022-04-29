import { ChangeEvent, useState } from "react";

export function useInput<S>(startValue: S): [S, (event: ChangeEvent) => void] {
    const [state, setState] = useState<S>(startValue);
    return [
        state,
        event => {
            const target = event.target as HTMLInputElement;
            const value = target.type === 'checkbox' ? target.checked : target.value;

            setState(value as unknown as S);
        }
    ]
}