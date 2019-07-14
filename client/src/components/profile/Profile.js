import React, { Component } from "react";
import Croppie from "croppie";
import "croppie/croppie.css";
import { croppieOptions, croppieArguments } from "../../constants/consts";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            croppieWasInitialize: false,
            error: "",
            avatar: "",
            photo: ""
        };
        this.originalImage = React.createRef();
    }

    componentDidUpdate() {
        if (!this.state.croppieWasInitialize && this.originalImage.current) {
            this.cropper = new Croppie(
                this.originalImage.current,
                croppieOptions
            );
        }
    }

    getCroppedImage = () => {
        this.cropper.result(croppieArguments).then(value => {
            this.setState({ avatar: value });
        });
    };

    uploadImage = event => {
        var { files } = event.target;
        if (files && files[0]) {
            this.setState({ photo: files[0] });
        }
    };

    render() {
        const { photo, avatar } = this.state;
        return (
            <div className="profile-page">
                {photo && (
                    <div className="avatar-wrapper">
                        <img
                            ref={this.originalImage}
                            src={this.state.photo}
                            alt="preview"
                        />
                    </div>
                )}
                <div className="btn-group">
                    {photo && (
                        <div className="btn-wrapper">
                            <button
                                type="button"
                                onClick={this.getCroppedImage}
                            >
                                Сохранить
                            </button>
                        </div>
                    )}
                    <div className="file-input">
                        <input type="file" onChange={this.uploadImage} />
                        Загрузить
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
