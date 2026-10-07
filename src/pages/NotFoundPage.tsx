import Button from "@/components/Button";
import { siteData } from "@/data/siteData";
import usePageSeo from "@/hooks/usePageSeo";

export default function NotFoundPage() {
  usePageSeo({ title: `Страница не найдена — ${siteData.master.name}`, path: "/404" });

  return (
    <section className="page flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <span className="eyebrow">404</span>
      <h1 className="display-lg mt-6 text-primary">Страница не найдена</h1>
      <p className="body-lg mt-5 max-w-md">
        Похоже, такой страницы не существует. Вернитесь на главную и посмотрите работы.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button to="/" arrow>
          На главную
        </Button>
        <Button to="/gallery" variant="outline">
          Посмотреть работы
        </Button>
      </div>
    </section>
  );
}
