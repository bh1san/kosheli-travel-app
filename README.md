# Firebase Studio

This is a NextJS starter project for Kosheli Travel & Tourism, built in Firebase Studio.

## Running the Project Locally

To get started, install the dependencies and run the development server:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:9002`.

## Creating Restore Points (Snapshots)

Using version control is the best way to create restore points. This allows you to save the current state of your project and revert back to it if you ever run into issues with future changes. You can do this from your command line terminal.

### 1. Check the Status

See all the files that have been changed since your last restore point.

```bash
git status
```

### 2. Add All Changes

Tell git you want to include all the current changes in your snapshot.

```bash
git add .
```

### 3. Save the Snapshot (Commit)

Save the snapshot with a descriptive message. This is your restore point.

```bash
git commit -m "Project is stable, all features working."
```

Now your project is saved at this stable point. If you ever need to revert, you can use the `git log` and `git checkout` commands.

## Connecting to GitHub

To connect this project to a GitHub repository and upload your code for safekeeping, follow these steps from your command line terminal.

### 1. Initialize Git

If you haven't already, initialize a Git repository in your project's root folder:

```bash
git init -b main
```

### 2. Add and Commit Files

Stage all your current files and commit them as the first version of your project:

```bash
git add .
git commit -m "Initial commit of Kosheli Travel project"
```

### 3. Create a GitHub Repository

Go to [GitHub.com](https://github.com) and create a new, empty repository. **Do not** initialize it with a README, .gitignore, or license file, as these already exist in the project.

### 4. Link to GitHub

After creating the repository, GitHub will provide you with a URL. Use it to link your local repository to the remote one on GitHub. Replace the example URL with your own:

```bash
git remote add origin https://github.com/your-username/your-repository-name.git
```

### 5. Push Your Code

Finally, push your committed code to GitHub:

```bash
git push -u origin main
```

Now all your project files are safely stored on GitHub.
