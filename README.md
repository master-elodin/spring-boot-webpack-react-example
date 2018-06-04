# Spring Boot with Webpack UI using Gradle

To run:

```
$ ./gradlew :service:run
```

Visit localhost:8080 to see your results!

## Details of how it works

### Initial Spring Boot
Super basic Spring Boot app with a single endpoint that returns a greeting message. Follow instructions on the offical [Spring Boot Page](https://spring.io/guides/gs/spring-boot/)

* One tweak: adding the `application` plugin to the service `build.gradle` 
    * Prevents the need for calling `$ ./gradlew build && jar && java -jar build/libs/spring-boot-webpack-example-1.0.0.jar`

```groovy
apply plugin: 'application'

mainClassName = 'org.stickman.springbootexample.Application'
```

### Webpack
Basic Webpack configuration:

1. For Webpack itself: `$ npm install webpack webpack-command --save-dev`
2. For generating an index.html: `$ npm install html-webpack-plugin --save-dev`
3. For processing Sass: `$ npm install node-sass style-loader css-loader sass-loader --save-dev`
4. For making a request from the UI to the Spring Boot server: `$ npm install jquery-ajax --save`

File organization:

```
+-- src
| +-- index.js
| +-- index.html
| +-- styles
|   | +-- styles.scss
|   | +-- _colors.scss
+-- package.json
+-- webpack.config.js
+-- .babelrc
```

#### Add Gradle to :ui

1. Add `webpack` task

```groovy
task webpack(type: Exec) {
    // set 'inputs' and 'outputs' so the compiler knows when the webpack task is up-to-date
    inputs.file("package-lock.json") 
    inputs.file("webpack.config.js") 
    inputs.dir("src")

    outputs.dir("dist")

    // windows needs .cmd at the end to run properly
    def osName = System.getProperty("os.name").toLowerCase();
    def location = osName.contains("windows") ? project.file('node_modules/.bin/webpack.cmd') : project.file('node_modules/.bin/webpack')

    // runs the following:
    // node_modules/bin/webpack --config webpack.config.js
    commandLine "${location}", '--config', 'webpack.config.js'
}
```

2. Add `clean` task

```groovy
task clean << {
  delete "${projectDir}/dist/"
}
```

### Tying them together!
Since a default static content (HTML, CSS, JS, etc) path for Spring Boot is `src/main/webapp`, copy the output of `:ui` into that location in `:service`

```groovy
task copyUi(type: Copy) {
    // set 'inputs' and 'outputs' so the compiler knows when the webpack task is up-to-date
    inputs.dir "$rootDir/ui"
    outputs.dir 'src/main/webapp'

    // make sure :ui:webpack has been completed before attempting to copy its output
    dependsOn ':ui:webpack'

    // tell Gradle where to copy from and to
    from project(':ui').file('dist')
    into file('src/main/webapp')
}
// if running the default Spring Boot way (gradle build && java -jar blahblah...), depend on copyUi
jar.dependsOn copyUi
// if using the 'application' plugin (gradle run), depend on copyUi
run.dependsOn copyUi
// make sure clean will also clean the static content
clean.dependsOn ':ui:clean'
```

### Continuous updates of static content to the running Spring Boot application
`$ gradle -t copyUi`
