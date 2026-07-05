@echo off
setlocal

set "VCVARS=%ProgramFiles(x86)%\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat"
if not exist "%VCVARS%" (
  echo Visual Studio Build Tools with the C++ workload was not found.
  echo Install it, then run this command again.
  exit /b 1
)

call "%VCVARS%" >nul
set "PATH=%USERPROFILE%\.cargo\bin;%PATH%"

npm.cmd run desktop:build
