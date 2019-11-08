module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import '@/assets/styles/_abstract.scss';
        @import '@/assets/styles/_mixins.scss';
        `,
      },
    },
  },
};
