@echo off
echo Installing packages...
call npm install
echo finished installing packages
echo Building files...
call npm run postinstall
cd dist
echo Output built files to %cd%
cd ..
echo Finished building
echo press any key to exit...
pause >nul