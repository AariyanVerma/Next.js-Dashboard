# Script to reorder commits so chapters 1-5 come before 6-13
# This will create a new branch and cherry-pick commits in the correct order

# Get current branch name
$currentBranch = git branch --show-current

# Create a backup branch
git branch backup-before-reorder

# Get commit hashes in the order we want them
# Initial commit
$initial = "243be03"
# Chapters 1-5
$ch1 = "f0215ef"
$ch2 = "92a44ba"
$ch3 = "63d5e24"
$ch4 = "e25fa6c"
$ch5 = "509d299"
# Chapters 6-13
$ch6 = "792611d"
$ch7 = "d0198a8"
$ch8 = "7b27ff0"
$ch9 = "aabdc64"
$ch10 = "f13a27a"
$ch11 = "fcfd656"
$ch12 = "c7555cd"
$ch13 = "cce9fa0"

# Create a new branch from initial commit
git checkout -b reordered-commits $initial

# Cherry-pick commits in order
git cherry-pick $ch1
git cherry-pick $ch2
git cherry-pick $ch3
git cherry-pick $ch4
git cherry-pick $ch5
git cherry-pick $ch6
git cherry-pick $ch7
git cherry-pick $ch8
git cherry-pick $ch9
git cherry-pick $ch10
git cherry-pick $ch11
git cherry-pick $ch12
git cherry-pick $ch13

# Switch back to main and reset to the reordered branch
git checkout $currentBranch
git reset --hard reordered-commits

Write-Host "Commits have been reordered. Chapters 1-5 now come before chapters 6-13."
Write-Host "A backup branch 'backup-before-reorder' has been created."





