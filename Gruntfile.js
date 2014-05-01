 module.exports = function(grunt) {
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     concat: {
         options: {
             separator: ';',
             stripBanners: true
         },
         dist: {
             src: [
                 "public/javascripts/index.js",
                 "public/javascripts/infoSlider.js",
                 "public/javascripts/jquery-scrollto.js",
                 "public/javascripts/jssor.core.js",
                 "public/javascripts/jssor.slider.js",
                 "public/javascripts/jssor.utils.js",
                 "public/javascripts/loadXMLpaper.js",
                 "public/javascripts/loadXMLData.js",
                 "public/javascripts/loadXMLauthor.js",
                 "public/javascripts/map.js",
                 "public/javascripts/phototouch.js",
                 "public/javascripts/setCSStrick.js",
                 "public/javascripts/slider.js",
                 "public/javascripts/storageMyProgram.js"

             ],
             dest: "public/javascripts/default.js"
         }
     },
     uglify: {
         options: {
         },
         dist: {
             files: {
                 'public/javascripts/default.min.js': 'public/javascripts/default.js'
             }
         }
     },
     cssmin: {
         options: {
             keepSpecialComments: 0
         },
         compress: {
             files: {
                 'public/stylesheets/default.css': [
                     "public/stylesheets/slider.css",
                     "public/stylesheets/style.css"
                 ]
             }
         }
     }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
 
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}