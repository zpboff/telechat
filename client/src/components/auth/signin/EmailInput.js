import React from 'react';
import FormInput from '../../shared/FormInput';

export default function EmailInput({ email, onChange }) {
	return (
        <FormInput 
            type="text" 
            name="email" 
            placeholder="Email" 
            title="Email" 
            value={email} 
            onStateChange={onChange} 
        />
	);
}
