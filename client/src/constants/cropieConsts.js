export const croppieOptions = {    
    enableZoom: true,
    viewport: {
        width: 250,
        height: 250,
        type: 'circle'
    }
}

export const croppieArguments = {
    type: "base64",
    size: "viewport",
    format: "webp",
    quality: 1,
    circle: true
};