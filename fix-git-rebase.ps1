# Script to forcefully remove the rebase-merge directory
# This handles Windows file locking issues

Write-Host "Attempting to remove rebase-merge directory..."

# First, try to stop any git processes that might be locking files
Get-Process | Where-Object {$_.ProcessName -like "*git*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment for processes to release locks
Start-Sleep -Seconds 2

# Try to remove the directory
$rebasePath = ".git\rebase-merge"
if (Test-Path $rebasePath) {
    try {
        # Force remove with retries
        $maxRetries = 5
        $retryCount = 0
        $removed = $false
        
        while ($retryCount -lt $maxRetries -and -not $removed) {
            try {
                Remove-Item -Path $rebasePath -Recurse -Force -ErrorAction Stop
                $removed = $true
                Write-Host "Successfully removed rebase-merge directory!" -ForegroundColor Green
            } catch {
                $retryCount++
                if ($retryCount -lt $maxRetries) {
                    Write-Host "Attempt $retryCount failed. Retrying in 1 second..." -ForegroundColor Yellow
                    Start-Sleep -Seconds 1
                } else {
                    Write-Host "Failed to remove directory after $maxRetries attempts." -ForegroundColor Red
                    Write-Host "You may need to close VS Code/Cursor and try again, or restart your computer." -ForegroundColor Yellow
                }
            }
        }
    } catch {
        Write-Host "Error: $_" -ForegroundColor Red
    }
} else {
    Write-Host "rebase-merge directory doesn't exist. Git should be working now." -ForegroundColor Green
}

# Verify git status
Write-Host "`nChecking git status..."
git status





