# Swami Dayanand Saraswati Sr. Sec. School — Website

A static website. No build step, no Node.js, no npm install required —
just plain HTML, CSS and JavaScript. Tailwind CSS is loaded from a CDN
directly inside `index.html`.

## Files

```
index.html          The whole page (navbar, hero, notices, contact, footer)
css/style.css        A few custom animations/transitions Tailwind can't do alone
js/main.js           Notice board data + rendering, navbar scroll/menu behaviour
images/              Put your campus photo here (see images/README.txt)
```

## 1. Add your photo

Put a real photo of the school at:

```
images/campus-hero.jpg
```

## 2. Edit the content

- **Contact details / address / phone**: search `index.html` for the
  address and phone number and edit them directly.
- **Notices**: open `js/main.js` and edit the `ANNOUNCEMENTS` array near
  the top — each notice has a `title`, `excerpt`, `date`, and `category`.
  Add, remove, or edit entries freely.
- **Office hours**: also in `index.html`, marked with a `TODO` comment.

## 3. Put it on GitHub

1. Create a new repository on GitHub (e.g. `sds-school-website`).
2. On your computer, unzip this folder, then run inside it:
   ```
   git init
   git add .
   git commit -m "First version of the school website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
   (Or, if you don't want to use the command line: on the GitHub repo page,
   click **Add file → Upload files**, then drag in every file/folder from
   this project and click **Commit changes**.)

## 4. Host it for free with GitHub Pages

1. In your repository on GitHub, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/ (root)`, then click **Save**.
4. Wait a minute, then refresh the page — GitHub will show your live URL,
   something like:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO/
   ```

That's it — no build tools, no server needed. Any time you edit a file and
push again, the live site updates automatically in a minute or two.

## Optional: custom domain

If you buy a domain (e.g. `sdsschoolbolni.in`), you can point it at this
GitHub Pages site — GitHub's docs: *Settings → Pages → Custom domain*.
