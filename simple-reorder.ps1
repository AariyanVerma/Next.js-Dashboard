# Simple approach: Use git rebase with GIT_SEQUENCE_EDITOR to avoid file locks
# This sets an environment variable to use a script instead of interactive editor

Write-Host "Setting up rebase todo file..."

# Create the rebase todo content
$rebaseTodo = @"
pick f0215ef Chapter 1: Initial Next.js project setup
pick 92a44ba Chapter 2: Set up Tailwind CSS styling
pick 63d5e24 Chapter 3: Optimize fonts using next/font (Inter font)
pick e25fa6c Chapter 4: Create dashboard layout and pages
pick 509d299 Chapter 5: Implement navigation between pages using Link component
pick 792611d Complete chapter 6 - setup database and seeding
pick d0198a8 Complete chapter 7 - fetching data for dashboard
pick 7b27ff0 Complete chapter 8 - static and dynamic rendering setup
pick aabdc64 Complete chapter 9 - streaming and loading skeletons
pick f13a27a Complete chapter 10 - search and pagination for invoices
pick fcfd656 Complete chapter 11 - mutating data with server actions
pick c7555cd Complete chapter 12 - error boundaries and not-found pages
pick cce9fa0 Complete chapter 13 - accessibility and form validation
pick 85722eb Security: Update Next.js to 16.0.7 to fix CVE-2025-66478
"@

# Create a script that will write this todo file
$editorScript = @'
#!/bin/sh
cat > "$1" << 'EOF'
pick f0215ef Chapter 1: Initial Next.js project setup
pick 92a44ba Chapter 2: Set up Tailwind CSS styling
pick 63d5e24 Chapter 3: Optimize fonts using next/font (Inter font)
pick e25fa6c Chapter 4: Create dashboard layout and pages
pick 509d299 Chapter 5: Implement navigation between pages using Link component
pick 792611d Complete chapter 6 - setup database and seeding
pick d0198a8 Complete chapter 7 - fetching data for dashboard
pick 7b27ff0 Complete chapter 8 - static and dynamic rendering setup
pick aabdc64 Complete chapter 9 - streaming and loading skeletons
pick f13a27a Complete chapter 10 - search and pagination for invoices
pick fcfd656 Complete chapter 11 - mutating data with server actions
pick c7555cd Complete chapter 12 - error boundaries and not-found pages
pick cce9fa0 Complete chapter 13 - accessibility and form validation
pick 85722eb Security: Update Next.js to 16.0.7 to fix CVE-2025-66478
EOF
'@

Write-Host "For Windows, the easiest way is to use interactive rebase manually."
Write-Host "Run this command in a new terminal:"
Write-Host ""
Write-Host "git rebase -i 243be03"
Write-Host ""
Write-Host "Then in the editor, reorder the commits so chapters 1-5 come first."




