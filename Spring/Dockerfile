# FROM openjdk:11.0.16-oracle
FROM openjdk:11.0.14.1
ARG JAR_FILE=target/*.jar
COPY $pwd/build/libs/test-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 80
ENTRYPOINT [ "java", "-jar", "/app.jar" ]