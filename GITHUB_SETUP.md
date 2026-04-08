# Banking App Setup Guide

## ⚠️ Before Pushing to GitHub

### 1. **Files to HIDE (Added to .gitignore)**
✅ `application.properties` - Contains DB credentials
✅ `.env` files - Any environment variables
✅ `*.log` - Log files
✅ `target/` - Build outputs
✅ IDE files - `.idea/`, `.vscode/`, `.project`

### 2. **How to Setup Locally**

1. Copy the template file:
   ```bash
   cp src/main/resources/application.properties.template src/main/resources/application.properties
   ```

2. Update with your actual credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/banking_app
   spring.datasource.username=root
   spring.datasource.password=YOUR_ACTUAL_PASSWORD
   ```

3. **DO NOT COMMIT** `application.properties`

### 3. **For Team Members**
- They'll copy the `.template` file
- Fill in their own database credentials
- Never commit the actual `application.properties`

### 4. **Production Setup**
Use environment variables:
```bash
export SPRING_DATASOURCE_USERNAME=produser
export SPRING_DATASOURCE_PASSWORD=prodpassword
export SPRING_DATASOURCE_URL=jdbc:mysql://prod-db:3306/banking_app
```

### 5. **Push to GitHub Safely**
```bash
git add .
git status  # Verify application.properties is NOT included
git commit -m "Add banking app"
git push origin main
```

---

## Checklist Before Pushing

- [ ] `application.properties` is in `.gitignore`
- [ ] `application.properties` is not tracked (`git rm --cached src/main/resources/application.properties`)
- [ ] `.template` file is committed instead
- [ ] No database credentials in any committed files
- [ ] No API keys or secrets in code
- [ ] `.env` files are ignored

Run before push:
```bash
git ls-files | grep application.properties
# Should return nothing - if it returns the file, remove it!
git rm --cached src/main/resources/application.properties
git commit -m "Remove sensitive application.properties"
```
