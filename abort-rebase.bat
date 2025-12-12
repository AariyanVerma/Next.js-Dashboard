@echo off
echo Aborting ongoing rebase...
git rebase --abort
if %errorlevel% equ 0 (
    echo Rebase aborted successfully!
    echo.
    echo You can now run git commands normally.
) else (
    echo Failed to abort rebase. Trying to clean up...
    rmdir /s /q .git\rebase-merge 2>nul
    echo Cleanup attempted. Please check git status.
)
pause





