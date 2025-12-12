# Complete script to reorder commits: Chapters 1-5 before 6-13
# Run this script: powershell -ExecutionPolicy Bypass -File reorder-chapters.ps1

Write-Host "Starting commit reordering process..."

# Step 1: Abort any ongoing rebase
Write-Host "Step 1: Aborting any ongoing rebase..."
git rebase --abort 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "No rebase to abort (this is OK)"
}

# Step 2: Create backup branch
Write-Host "Step 2: Creating backup branch..."
git branch backup-main-$(Get-Date -Format "yyyyMMdd-HHmmss") 2>$null

# Step 3: Get current HEAD commit (should be chapter 5)
$currentHead = git rev-parse HEAD
Write-Host "Current HEAD: $currentHead"

# Step 4: Create a new branch from initial commit and cherry-pick in order
Write-Host "Step 3: Creating reordered branch..."

# Commit hashes in desired order
$commits = @(
    "f0215ef",  # Chapter 1
    "92a44ba",  # Chapter 2
    "63d5e24",  # Chapter 3
    "e25fa6c",  # Chapter 4
    "509d299",  # Chapter 5
    "792611d",  # Chapter 6
    "d0198a8",  # Chapter 7
    "7b27ff0",  # Chapter 8
    "aabdc64",  # Chapter 9
    "f13a27a",  # Chapter 10
    "fcfd656",  # Chapter 11
    "c7555cd",  # Chapter 12
    "cce9fa0"   # Chapter 13
)

# Start from initial commit
git checkout -b temp-reordered 243be03

# Cherry-pick each commit
foreach ($commit in $commits) {
    Write-Host "Cherry-picking $commit..."
    git cherry-pick $commit
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error cherry-picking $commit. You may need to resolve conflicts manually."
        Write-Host "Run: git cherry-pick --continue after resolving conflicts"
        exit 1
    }
}

# Step 5: Replace main branch with reordered branch
Write-Host "Step 4: Updating main branch..."
git checkout main
git reset --hard temp-reordered
git branch -d temp-reordered

Write-Host "`nSuccess! Commits have been reordered."
Write-Host "Chapters 1-5 now come before chapters 6-13."
Write-Host "Run 'git log --oneline' to verify."





