#!/bin/bash

# 1. Az auth-logs könyvtár létrehozása, ha még nem létezik
AUTH_LOG_DIR="./app/auth/auth-logs"
mkdir -p "$AUTH_LOG_DIR"

# 2. Az login-logs könyvtár létrehozása, ha még nem létezik
LOGIN_LOG_DIR="./app/api/login/login-logs"
mkdir -p "$LOGIN_LOG_DIR"

# 3. Az register-logs könyvtár létrehozása, ha még nem létezik
REGISTER_LOG_DIR="./app/api/register/register-logs"
mkdir -p "$REGISTER_LOG_DIR"

# 4. Az accessibility-statement/statement-logs könyvtár létrehozása, ha még nem létezik
STATEMENT_LOG_DIR="./app/accessibility-statement/statement-logs"
mkdir -p "$STATEMENT_LOG_DIR"

# 5. Az cookie-policy/cookie-policy-logs könyvtár létrehozása, ha még nem létezik
COOKIE_POLICY_LOG_DIR="./app/cookie-policy/cookie-policy-logs"
mkdir -p "$COOKIE_POLICY_LOG_DIR"

# 6. Az dashboard-logs könyvtár létrehozása, ha még nem létezik
DASHBOARD_LOG_DIR="./app/dashboard/dashboard-logs"
mkdir -p "$DASHBOARD_LOG_DIR"

# 7. Az newsletter-logs könyvtár létrehozása, ha még nem létezik
NEWSLETTER_LOG_DIR="./app/newsletter/newsletter-logs"
mkdir -p "$NEWSLETTER_LOG_DIR"

# 8. Az terms-and-conditions könyvtár létrehozása, ha még nem létezik
TERMS_LOG_DIR="./app/terms-and-conditions/terms-logs"
mkdir -p "$TERMS_LOG_DIR"

# 9. Az terms-of-use könyvtár létrehozása, ha még nem létezik
TERMS_USE_LOG_DIR="./app/terms-of-use/terms-use-logs"
mkdir -p "$TERMS_USE_LOG_DIR"

# 10. Az cart könyvtár létrehozása, ha még nem létezik
CART_LOG_DIR="./app/cart/cart-logs"
mkdir -p "$CART_LOG_DIR"

# 7. Dátum és idő kinyerése a fájl nevéhez
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# 8. Külön log fájlok a négy mappához
AUTH_LOG_FILE="$AUTH_LOG_DIR/test_log_$DATE.txt"
LOGIN_LOG_FILE="$LOGIN_LOG_DIR/test_log_$DATE.txt"
REGISTER_LOG_FILE="$REGISTER_LOG_DIR/test_log_$DATE.txt"
STATEMENT_LOG_FILE="$STATEMENT_LOG_DIR/test_log_$DATE.txt"
COOKIE_POLICY_LOG_FILE="$COOKIE_POLICY_LOG_DIR/test_log_$DATE.txt"
DASHBOARD_LOG_FILE="$DASHBOARD_LOG_DIR/test_log_$DATE.txt"
NEWSLETTER_LOG_FILE="$NEWSLETTER_LOG_DIR/test_log_$DATE.txt"
TERMS_LOG_FILE="$TERMS_LOG_DIR/test_log_$DATE.txt"
TERMS_USE_LOG_FILE="$TERMS_USE_LOG_DIR/test_log_$DATE.txt"
CART_LOG_FILE="$CART_LOG_DIR/test_log_$DATE.txt"

# 9. Az auth teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: auth teszt..."
# Teszt futtatása csak az auth-hoz
npm run test -- --testPathPattern=auth > "$AUTH_LOG_FILE" 2>&1
echo "Teszt lefutott. A log az auth-logs mappában található: $AUTH_LOG_FILE"

# 10. A login teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: login teszt..."
# Teszt futtatása csak a login-hoz
npm run test -- --testPathPattern=login > "$LOGIN_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a login-logs mappában található: $LOGIN_LOG_FILE"

# 11. A register teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: register teszt..."
# Teszt futtatása csak a register-hez
npm run test -- --testPathPattern=register > "$REGISTER_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a register-logs mappában található: $REGISTER_LOG_FILE"

# 12. Az accessibility-statement teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: accessibility-statement teszt..."
# Teszt futtatása csak az accessibility-statement-hoz
npm run test -- --testPathPattern=accessibility-statement > "$STATEMENT_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a statement-logs mappában található: $STATEMENT_LOG_FILE"

# 13. A cookie-policy teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: cookie-policy teszt..."
# Teszt futtatása csak a cookie-policy-hoz
npm run test -- --testPathPattern=cookie-policy > "$COOKIE_POLICY_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a cookie-policy-logs mappában található: $COOKIE_POLICY_LOG_FILE"

# 14. A dashboard teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: dashboard teszt..."
# Teszt futtatása csak a dashboard-hoz
npm run test -- --testPathPattern=dashboard > "$DASHBOARD_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a dashboard-logs mappában található: $DASHBOARD_LOG_FILE"

# 15. Az newsletter teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: newsletter teszt..."
# Teszt futtatása csak a newsletter-hez
npm run test -- --testPathPattern=newsletter > "$NEWSLETTER_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a newsletter-logs mappában található: $NEWSLETTER_LOG_FILE"


# 18. A terms-and-conditions teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: terms-and-conditions teszt..."
# Teszt futtatása csak a terms-and-conditions-hoz
npm run test -- --testPathPattern=terms-and-conditions > "$TERMS_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a terms-logs mappában található: $TERMS_LOG_FILE"

# 20. A terms-of-use teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: terms-of-use teszt..."
# Teszt futtatása csak a terms-of-use-hoz
npm run test -- --testPathPattern=terms-of-use > "$TERMS_USE_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a terms-use-logs mappában található: $TERMS_USE_LOG_FILE"

# 16. Az cart teszt futtatása és a kimenet mentése a log fájlba
echo "Futtatás: cart teszt..."
# Teszt futtatása csak a cart-hoz
npm run test -- --testPathPattern=cart > "$CART_LOG_FILE" 2>&1
echo "Teszt lefutott. A log a cart-logs mappában található: $CART_LOG_FILE"