import React from 'react';
import FormInput from './FormInput';

export default function EmailInput({ email, onChange }) {
	return (
        <FormInput 
            type="text" 
            name="email" 
            placeholder="Введите email"
            title="Email" 
            value={email} 
            onStateChange={onChange} 
        />
	);
}
