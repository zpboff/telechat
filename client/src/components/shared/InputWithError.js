import React from "react";

const InputWithError = props => {
    const { id, label, type, value, inputError, handleInputChange } = props;

    if (inputError) {
        return (
            <div className="inline-text-field-container">
                <div className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon mdc-text-field--invalid">
                    <i
                        aria-hidden="true"
                        className="material-icons mdc-text-field__icon"
                    />
                    <input
                        className="mdc-text-field__input"
                        autocorrect="off"
                        autocomplete="off"
                        spellcheck="false"
                        id={id}
                        minLength=""
                        required="true"
                        pattern=""
                    />

                    <div className="mdc-notched-outline mdc-notched-outline--upgraded">
                        <div className="mdc-notched-outline__leading" />
                        <div className="mdc-notched-outline__notch">
                            <label
                                for="demo-mdc-text-field"
                                className="mdc-floating-label"
                            />
                        </div>
                        <div className="mdc-notched-outline__trailing" />
                    </div>
                </div>
                <div className="mdc-text-field-helper-line">
                    <div
                        className="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
                        role="alert"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="inline-text-field-container">
            <div className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
                <i
                    aria-hidden="true"
                    className="material-icons mdc-text-field__icon"
                />

                <input
                    className="mdc-text-field__input"
                    autocorrect="off"
                    autocomplete="off"
                    spellcheck="false"
                    id="demo-mdc-text-field"
                    maxlength="20"
                />

                <div className="mdc-notched-outline mdc-notched-outline--upgraded">
                    <div className="mdc-notched-outline__leading" />
                    <div className="mdc-notched-outline__notch">
                        <label
                            for="demo-mdc-text-field"
                            className="mdc-floating-label"
                        />
                    </div>
                    <div className="mdc-notched-outline__trailing" />
                </div>
            </div>
            <div className="mdc-text-field-helper-line">
                <div className="mdc-text-field-character-counter">0 / 20</div>
            </div>
        </div>
    );
};

export default InputWithError;
