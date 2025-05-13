interface PageTitleProps {
  title: string;
  description: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
    </div>
  );
}
