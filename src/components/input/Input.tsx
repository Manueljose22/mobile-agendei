import { Controller } from 'react-hook-form';
import { KeyboardTypeOptions, TextInput } from "react-native";


type InputProps = {
    name: string;
    control: any;
    placeholder?: string;
    rules?: object;
    error?: string;
    KeyboardType: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    onFocus: () => void
    blur: () => void
    className: string
}



export const Input = ({ placeholder,className, KeyboardType, control, name, error, rules, secureTextEntry, onFocus, blur }: InputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}

            render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                    className={className}
                    placeholder={placeholder}
                    onBlur={blur}
                    onChangeText={onChange}
                    value={value}
                    onFocus={onFocus}
                    keyboardType={KeyboardType}
                    secureTextEntry={secureTextEntry}
                />
            )}

        />
    )
}
