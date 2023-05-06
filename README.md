<!-- Tailwind -->
<!-- install using npm install tailwindcss -->
<!-- initialize using npx tailwindcss init -->

<!--  PostCSS (like babel it converts modern css into browser old version/ targeted browser) plugin is the most seamless way to integrate it with build tools like webpack, Rollup, Vite, and Parcel.  -->

<!-- Material Ui -->
<!-- Install using npm install @materialui-core -->
<!-- fisrt create a theme using createTheme -->
<!-- every styles under pallete should have mai property -->
<!-- Create a theme context and wrap the Themeprovider (by mui core) under this the wrap the app under the theme provider -->
<!-- create an value as object {theme:"", setTheme:(theme)=>setTheme(theme)} and pass it as contxt value -->
<!-- Using below code you can modify body/html style -->

---

    createStyles({
        "@global": {
            body: {
                backgroundColor: theme.palette.background.main
            }
        }
    })

---
