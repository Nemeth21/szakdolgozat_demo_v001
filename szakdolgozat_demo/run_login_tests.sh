#!/bin/bash

# 1. Az login-logs könyvtár létrehozása, ha még nem létezik
LOGIN_LOG_DIR="./app/api/login/login-logs"
mkdir -p "$LOGIN_LOG_DIR"

# 2. Dátum és idő kinyerése a fájl nevéhez
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOGIN_LOG_DIR/test_log_$DATE.txt"

# 3. A login teszt futtatása és a kimenet mentése a log fájlba
# Itt az `npm run test` parancsot feltételezzük, hogy a Jest-et futtatjuk
# Ha más parancsot használsz, cseréld ki.
npm run test > "$LOG_FILE" 2>&1

# 4. Kimenet kiírása a konzolra, hogy tudjuk mi történt
echo "Teszt lefutott. A log a következő fájlban található: $LOG_FILE"
