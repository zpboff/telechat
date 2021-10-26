module.exports = {
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "~@/assets/scss/_colors.scss";
                    @import "~@/assets/scss/_buttons.scss";
                `
            }
        }
    },
    devServer: {
        disableHostCheck: true
    }
};
