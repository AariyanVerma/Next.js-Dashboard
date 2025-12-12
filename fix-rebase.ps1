# Abort any ongoing rebase
git rebase --abort 2>$null

# Now let's get all commit hashes
Write-Host "Getting commit information..."

# The commits we need in order:
# Initial: 243be03
# Ch1: f0215ef
# Ch2: 92a44ba  
# Ch3: 63d5e24
# Ch4: e25fa6c
# Ch5: 509d299
# Ch6: 792611d
# Ch7: d0198a8
# Ch8: 7b27ff0
# Ch9: aabdc64
# Ch10: f13a27a
# Ch11: fcfd656
# Ch12: c7555cd
# Ch13: cce9fa0

Write-Host "Rebase aborted. Ready to proceed with reordering."





