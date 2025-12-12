# Final script to reorder commits properly
# This will create a new branch with commits in the correct order

Write-Host "Starting commit reordering..."

# Create backup
git branch backup-before-reorder-final

# Get the security update commit (we'll add it at the end)
$securityCommit = "85722eb"

# Start from initial commit
Write-Host "Creating new branch from initial commit..."
git checkout -b reordered-main 243be03

# Cherry-pick commits in the correct order (excluding security update for now)
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

foreach ($commit in $commits) {
    Write-Host "Cherry-picking $commit..."
    git cherry-pick $commit --no-edit
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error with commit $commit. Aborting."
        git cherry-pick --abort
        git checkout main
        git branch -D reordered-main
        exit 1
    }
}

# Add security update at the end
Write-Host "Adding security update commit..."
git cherry-pick $securityCommit --no-edit

# Switch back to main and replace it
Write-Host "Updating main branch..."
git checkout main
git reset --hard reordered-main
git branch -d reordered-main

Write-Host "`nSuccess! Commits have been reordered."
Write-Host "Chapters 1-5 now come before chapters 6-13."
Write-Host "Run 'git log --oneline' to verify."




