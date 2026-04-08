
# Upgrade Plan: banking-app (20260408100737)

- **Generated**: 2026-04-08 10:07
- **HEAD Branch**: N/A
- **HEAD Commit ID**: N/A

## Available Tools

| Tool | Status | Notes |
| ---- | ------ | ----- |
| JDK 25.0.2 | Available | Path: C:\Users\Pankaj\.jdks\openjdk-25.0.2\bin |
| Maven Wrapper | 3.9.14 | Present in project and verified with JDK 25 startup |

## Guidelines

- Upgrade the project's Java runtime to the latest LTS available.
- Preserve the current Spring Boot 4.0.5 dependency unless the runtime upgrade requires a secondary change.
- Apply the smallest functional change set needed to achieve Java 25 compatibility.
- The workspace is not version-controlled; changes will be local only.

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred.

## Options

- Working branch: appmod/java-upgrade-20260408100737
- Run tests before and after the upgrade: true

## Upgrade Goals

- Upgrade Java from 21 to 25 (latest LTS available in local environment)

### Technology Stack

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| --------------------- | ------- | -------------- | ---------------- |
| Java | 21 | 25 | User requested the latest LTS runtime upgrade |
| Spring Boot | 4.0.5 | 4.0.5 | Already on a Spring Boot 4.x baseline expected to support Java 25 |
| Maven Wrapper | 3.9.14 | 3.9.14 | Verified with JDK 25 startup; watch for build-time Java 25 compatibility |
| maven-compiler-plugin | inherited from parent | 3.11.0 | Required for Java 21+ compilation; Spring Boot 4.x parent should provide a compatible version |
| Lombok | optional | current | No runtime-level change required for this Java version bump |

### Derived Upgrades

- Verify Maven wrapper/plugin compatibility with Java 25 during validation; upgrade wrapper to Maven 4.x only if required by build failure.
- No additional runtime dependency upgrades are necessary for the Java runtime target itself.

## Upgrade Steps

- **Step 1: Setup Environment**
  - **Rationale**: Confirm the target JDK and build wrapper are available before modifying project configuration.
  - **Changes to Make**:
    - [ ] Confirm JDK 25.0.2 is accessible at `C:\Users\Pankaj\.jdks\openjdk-25.0.2\bin`.
    - [ ] Confirm the Maven wrapper is executable and starts under JDK 25.
    - [ ] Document that Git version control is unavailable for this workspace.
  - **Verification**:
    - Command: `set JAVA_HOME=C:\Users\Pankaj\.jdks\openjdk-25.0.2 && .\mvnw.cmd -q -version`
    - Expected: Wrapper starts successfully and reports Maven 3.9.14.

- **Step 2: Setup Baseline**
  - **Rationale**: Capture current build and test behavior before changing the runtime setting.
  - **Changes to Make**:
    - [ ] Run baseline compilation and tests with the current `java.version` value.
    - [ ] Record any existing compile or test failures prior to the upgrade.
  - **Verification**:
    - Command: `set JAVA_HOME=C:\Users\Pankaj\.jdks\openjdk-25.0.2 && .\mvnw.cmd clean test -q`
    - Expected: Baseline compile and tests complete, with any failures documented for comparison.

- **Step 3: Upgrade Java Runtime Version**
  - **Rationale**: Apply the requested Java runtime upgrade while keeping the dependency set stable.
  - **Changes to Make**:
    - [ ] Change `<java.version>` in `pom.xml` from `21` to `25`.
    - [ ] Retain Spring Boot 4.0.5 unless validation reveals compatibility issues.
    - [ ] If build issues appear, add explicit `maven.compiler.release` set to `25`.
  - **Verification**:
    - Command: `set JAVA_HOME=C:\Users\Pankaj\.jdks\openjdk-25.0.2 && .\mvnw.cmd clean test-compile -q`
    - Expected: Project compiles successfully under Java 25.

- **Step 4: Final Validation**
  - **Rationale**: Confirm the runtime upgrade is complete and the application still passes all tests.
  - **Changes to Make**:
    - [ ] Resolve any compile-time issues introduced by Java 25.
    - [ ] Resolve any failing tests after the runtime upgrade.
    - [ ] Ensure `pom.xml` reflects `java.version` 25 across the module.
  - **Verification**:
    - Command: `set JAVA_HOME=C:\Users\Pankaj\.jdks\openjdk-25.0.2 && .\mvnw.cmd clean test -q`
    - Expected: Compilation success and 100% test pass rate.

## Key Challenges

- **Build-tool compatibility with Java 25**
  - **Challenge**: Maven Wrapper 3.9.14 is currently present, and Java 25 may expose unsupported build-time behavior.
  - **Strategy**: Validate the wrapper with JDK 25 and only upgrade to Maven 4.x if build-time errors occur.

- **Minimal-change runtime upgrade**
  - **Challenge**: The goal is a small, safe change, but Java 25 may reveal hidden API incompatibilities or stricter compiler checks.
  - **Strategy**: Perform a baseline build first, then apply only the runtime property update and resolve issues in a focused final validation step.
