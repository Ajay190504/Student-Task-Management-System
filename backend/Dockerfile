# Step 1: Build stage with Maven and Java 21 JDK
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Step 2: Runtime stage with minimal Java 21 JRE
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
