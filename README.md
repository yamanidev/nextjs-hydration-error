## About
This is a reproduction of a hydration error encountered when using `i18next-next`. You can read more about this in the [issue](https://github.com/i18next/next-i18next/issues/2265) I opened in the [`i18next-next` repository](https://github.com/i18next/next-i18next/).

## Running locally
- Install dependencies: `pnpm install`
- Run development server: `pnpm dev`

## Observations
- Error: `Uncaught Error: Text content does not match server-rendered HTML.` 
- Warning: `Warning: Text content did not match. Server: "Le site web est aussi disponible en" Client: "The website is also available in"`
- The warning and error above are only raised when `lng` is `en` (`localhost:3000`), while when `lng` is `fr` (`localhost:3000/fr`) everything works fine.

## Explanation and fix
The website supports two locales, English and French. I wanted to show some content in the other locale (i.e French when the website's locale is English and vice versa). However, given how `serverSideTranslations` was called, only one locale was loaded, resulting in failed translation, so the content is shown in the default fallback language (which is English), giving us the content mismatch between server/client. 

To fix this, we load both locales on the client by declaring them in the last argument of `serverSideTranslations` in `getStaticProps`:
```ts
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'language'], null, ['en', 'fr']))
    }
  };
};
```

## Credits
Thanks to [@adrai](https://github.com/adrai) for helping me with this issue.