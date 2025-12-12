# Commit Order for Assignment

Since we're having file locking issues with Windows, here's the commit order for your assignment:

## Current Commit Order (after reordering needed):

1. **243be03** - Initial commit from Create Next App
2. **f0215ef** - Chapter 1: Initial Next.js project setup  
3. **92a44ba** - Chapter 2: Set up Tailwind CSS styling
4. **63d5e24** - Chapter 3: Optimize fonts using next/font (Inter font)
5. **e25fa6c** - Chapter 4: Create dashboard layout and pages
6. **509d299** - Chapter 5: Implement navigation between pages using Link component
7. **792611d** - Chapter 6: setup database and seeding
8. **d0198a8** - Chapter 7: fetching data for dashboard
9. **7b27ff0** - Chapter 8: static and dynamic rendering setup
10. **aabdc64** - Chapter 9: streaming and loading skeletons
11. **f13a27a** - Chapter 10: search and pagination for invoices
12. **fcfd656** - Chapter 11: mutating data with server actions
13. **c7555cd** - Chapter 12: error boundaries and not-found pages
14. **cce9fa0** - Chapter 13: accessibility and form validation
15. **85722eb** - Security: Update Next.js to 16.0.7 to fix CVE-2025-66478

## Manual Reordering Instructions

If you want to reorder manually, you can use this command sequence in a new terminal (outside Cursor):

```bash
cd "C:\Users\aariy\OneDrive\Documentos\Full stack web dev\Lab-8\nextjs-dashboard"

# Create backup
git branch backup-main

# Start interactive rebase from initial commit
git rebase -i 243be03
```

In the editor that opens, reorder the commits so chapters 1-5 come before 6-13.




