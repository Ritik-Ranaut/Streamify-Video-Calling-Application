@echo off
REM Quick MongoDB Atlas Setup for Streamify
REM This script helps you set up MongoDB Atlas and configure your .env file

echo.
echo =====================================
echo MongoDB Atlas Setup for Streamify
echo =====================================
echo.
echo This will take 2-3 minutes.
echo.
echo Step 1: Go to https://mongodb.com/cloud/atlas
echo Step 2: Click "Sign Up" and create a free account
echo Step 3: Create a free M0 cluster
echo Step 4: Create a database user
echo Step 5: Get your connection string
echo.
echo Your connection string should look like:
echo mongodb+srv://username:password@cluster.mongodb.net/streamify?retryWrites=true
echo.
echo.
pause

echo.
echo Please enter your MongoDB Atlas connection string:
set /p MONGO_URI="MONGO_URI="

REM Update the .env file
powershell -Command "(Get-Content 'backend\.env') -replace 'MONGO_URI=.*', 'MONGO_URI=%MONGO_URI%' | Set-Content 'backend\.env'"

echo.
echo ✅ Updated backend\.env with your MongoDB Atlas connection
echo.
echo Now restart the backend with: npm run dev
echo.
pause
