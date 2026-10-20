# Au Fil des Truffes

Site vitrine d'Emma, éducatrice canine et pet-sitter dans l'Embrunais (05). Site statique généré avec [Eleventy](https://www.11ty.dev/) et publié sur GitHub Pages.

## Développer

```sh
npm install
npm start          # http://localhost:8080
```

## Changer un prix

1. Modifier la valeur dans `src/_data/tarifs.json` (aucun prix n'est écrit ailleurs).
2. Commit et push sur `main`.
3. Le site est à jour environ 1 minute plus tard (onglet *Actions* pour vérifier).

## Repères

- `src/css/theme.css` : couleurs et polices (palette provisoire), seul fichier à modifier quand l'identité visuelle arrive.
- `src/_data/site.json` : nom, téléphone, horaires, menu.
- `src/images/` : photos d'origine, redimensionnées en WebP + JPEG au build.
- Le logo est provisoire (`base.njk`, `favicon.svg`).
- `.github/workflows/deploy.yml` : construit à chaque push et publie sur Pages, seulement si le dépôt est public.
