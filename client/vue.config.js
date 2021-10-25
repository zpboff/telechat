module.exports = {
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            sass: {
                additionalData: `@import "~@/assets/scss/colors.scss";`
            }
        }
    },
    devServer: {
        disableHostCheck: true
    }
};