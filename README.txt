Romeo A. Guillermo III - Portfolio Site

# Git & GitHub Quick Cheat Sheet

## 1. Initial Setup (One-Time)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## 2. Connect to GitHub (One-Time)

```powershell
git init
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git branch -M main
git push -u origin main
```

## 3. Everyday Workflow (MOST IMPORTANT)

Use these whenever you update your project:

```powershell
git status
git add .
git commit -m "Describe your changes"
git push
```

Example commit messages:

```powershell
git commit -m "Update portfolio design"
git commit -m "Add new projects"
git commit -m "Fix responsive layout"
```

## 4. Get Updates from GitHub

```powershell
git pull origin main
```

Or, to rebase your local commits on top of remote changes:

```powershell
git pull --rebase origin main
```

## 5. Check Changes and History

```powershell
git status
git diff
git log --oneline
git remote -v
git branch
```

## 6. Fix Merge/Rebase Conflicts

1. Check the problem:
```powershell
git status
```

2. Open the conflicted file and resolve the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

3. Stage the resolved file:
```powershell
git add .
```

4. If you're in a rebase:
```powershell
git rebase --continue
```

5. Push after the rebase finishes:
```powershell
git push
```

## REMEMBER

| Command | Purpose |
|---|---|
| `git add .` | Stage all changes |
| `git commit -m "message"` | Save changes locally |
| `git push` | Upload commits to GitHub |
| `git pull` | Get remote changes |
| `git status` | Check repository status |
| `git log --oneline` | View commit history |
| `git diff` | View file changes |

**My everyday routine:**

```powershell
git add .
git commit -m "Update"
git push
```