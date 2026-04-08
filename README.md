# Banking App

A full-stack banking application built with **Spring Boot** (backend) and **HTML/CSS/JavaScript** (frontend).

## 📁 Project Structure

```
banking-app/
├── src/
│   ├── main/
│   │   ├── java/net/bank/banking/
│   │   │   ├── BankingAppApplication.java
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── mapper/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   └── resources/
│   │       ├── application.properties (ignored)
│   │       ├── application.properties.template
│   │       └── static/                    (Frontend files)
│   │           ├── index.html
│   │           ├── css/style.css
│   │           └── js/api.js, app.js
│   └── test/
│       └── java/...
├── pom.xml
├── mvnw / mvnw.cmd               (Maven wrapper)
├── .gitignore
├── GITHUB_SETUP.md
└── README.md                     (this file)
```

## 🚀 Quick Start

### 1. Backend Setup

#### Install Dependencies
```bash
# Using Maven Wrapper (Windows)
.\mvnw clean install

# Or using local Maven
mvn clean install
```

#### Configure Database
```bash
# Copy the template
cp src/main/resources/application.properties.template src/main/resources/application.properties

# Edit with your database credentials
# application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/banking_app
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

#### Run the Application
```bash
# Windows
.\mvnw spring-boot:run

# Or run the JAR
java -jar target/banking-app-0.0.1-SNAPSHOT.jar
```

The app will be available at: **http://localhost:8080**

### 2. Frontend Features

**Integrated in the backend at `/static`**

- 📊 **View All Accounts** - List all bank accounts
- 🔍 **Find Account by ID** - Search specific account
- 💰 **Deposit Money** - Add funds to account
- 💳 **Withdraw Money** - Deduct funds from account
- 🗑️ **Delete Account** - Remove account from system

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Spring Boot 4.0.5 |
| Database | MySQL 8.0 |
| ORM | Hibernate 7.2.7 |
| Frontend | HTML5, CSS3, JavaScript |
| Java Version | 21 |
| Build Tool | Maven |

## 📡 API Endpoints

```
GET  /api/accounts/getAllAccounts      - Get all accounts
GET  /api/accounts/{id}                - Get account by ID
POST /api/accounts                     - Create new account
PUT  /api/accounts/{id}/deposit        - Deposit money
PUT  /api/accounts/{id}/withdraw       - Withdraw money
DELETE /api/accounts/{id}              - Delete account
```

## 🔐 Security

### Before Pushing to GitHub

⚠️ **Never commit `application.properties` with real credentials!**

- ✅ Only `application.properties.template` is in git
- ✅ Real `application.properties` is in `.gitignore`
- ✅ Database passwords are hidden
- ✅ No API keys or secrets in code

See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed security guidelines.

## 📦 Build & Deploy

### Local Build
```bash
.\mvnw clean package
```

### Run Built JAR
```bash
java -jar target/banking-app-0.0.1-SNAPSHOT.jar
```

### Maven Commands
```bash
.\mvnw clean              # Clean build directory
.\mvnw compile            # Compile source code
.\mvnw test              # Run tests
.\mvnw package           # Build JAR
.\mvnw install           # Install locally
```

## 🧪 Testing

```bash
.\mvnw test
```

Tests are in `src/test/java/`

## 📝 Configuration Files

- **pom.xml** - Maven dependencies and build configuration
- **application.properties.template** - Configuration template
- **.gitignore** - Files excluded from version control
- **GITHUB_SETUP.md** - GitHub setup & security guidelines

## 🐛 Troubleshooting

### Java not found
```bash
# Verify Java 21 is installed
java -version

# Path to JDK
echo %JAVA_HOME%
```

### MySQL Connection Error
```
Check if MySQL is running and credentials are correct in application.properties
```

### Port 8080 already in use
```bash
# Run on different port
java -jar -Dserver.port=8081 target/banking-app-0.0.1-SNAPSHOT.jar
```

## 📧 Contact

For questions or issues, contact: **pankajsahu8775226@gmail.com**

---

**Happy Banking! 🏦**
