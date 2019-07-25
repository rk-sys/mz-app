module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import '@/styles/_abstract.scss';
        `,
      },
    },
  },
};
