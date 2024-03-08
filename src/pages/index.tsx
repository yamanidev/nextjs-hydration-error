import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'language']))
    }
  };
};

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const changeTo = router.locale === 'en' ? 'fr' : 'en';

  return (
      <p lang={changeTo}>
        {t('available_in', { lng: changeTo })}{' '}
        <Link href="/" locale={changeTo}>
          {t(changeTo === 'en' ? 'english' : 'french', { ns: 'language', lng: changeTo })}
        </Link>
      </p>
    );
}
